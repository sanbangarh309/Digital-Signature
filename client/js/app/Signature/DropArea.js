import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Draggable.css';
// drop area Component
class DropArea extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        field_lists : { text: { id: 1, isDragging: false, isResizing: false, top:100, left: 50,   width:200, height:100, fontSize:25,isHide:true, type:'text',appendOn:false}, date: { id: 2, isDragging: false, isResizing: false, top:100, left: 50, width:100, height:50, fontSize:20, isHide:true, type:'date',appendOn:false} },
        list: [ 
          { id: 1, isDragging: false, isResizing: false, top:100, left: 50,   width:200, height:100, isHide:true }, 
          { id: 2, isDragging: false, isResizing: false, top:50, left: 200, width:200, height:100, isHide:true }, 
        ],
        show_field: false,
        doc_key: null,
        text_field_count:1,
        date_field_count:1,
        items: []
      };
    }
    onDragOver(e) {
      console.log("DropArea.onDragOver");
      e.preventDefault();
      return false;
    }
    onDrop(e) {
      console.log("DropArea.onDrop");
      
      var obj = JSON.parse(e.dataTransfer.getData('application/json'));
      // let list = this.state.list;
      let list = this.state.field_lists;
      // let index = this.state.list.findIndex((item) => item.id == obj.id);
      list[obj.fieldtype].isDragging = false;
      list[obj.fieldtype].top  = (e.clientY - obj.y);
      list[obj.fieldtype].left = (e.clientX - obj.x);
      
      let newState = Object.assign(
        this.state, {
          field_lists : list
        });
      this.setState(newState);
  
      e.preventDefault();
    }
    updateStateDragging( id, isDragging){
      let list = this.state.field_lists;
      // let index = this.state.field_lists.findIndex((item) => item.id == id);
      list[id].isDragging = isDragging;

      let newState = Object.assign(
        this.state, {
          field_lists : list
        });
        // console.log(list[id])
      this.setState(newState);
    }
    updateStateResizing( id, isResizing){
      let list = this.state.field_lists;
      // let index = this.state.list.findIndex((item) => item.id == id);
      list[id].isResizing = isResizing;
      
      let newState = Object.assign(
        this.state, {
          field_lists : list
        });
        
      this.setState(newState);
    }
    funcResizing(id, clientX, clientY, doc_id=''){
      let element = this.refs[id + doc_id];  
      let list = this.state.field_lists;
      let position = element.refs.node.getBoundingClientRect();
      list[id].width =   clientX - position.left + (16 / 2);
      list[id].height =  clientY - position.top  + (16 / 2);
      list[id].fontSize = parseFloat(list[id].height/2.5);
      // console.log(position)
      console.log(list[id])
      // while(element.refs.node.scrollHeight > element.refs.node.offsetHeight){
      //   list[id].fontSize = parseInt(list[id].fontSize) -1;
      //   console.log(list[id].fontSize); 
      // }
      let newState = Object.assign(
        this.state, {
          field_lists : list
        });
      this.setState(newState);
    }
    pasteSelectedField(e){
      e.preventDefault();
      this.setState((state) => ({ date_field_count: state.date_field_count + 1}));
      let list = this.state.field_lists;
      let position = e.target.getBoundingClientRect();
      var x = e.clientX - position.left; //x position within the element.
      var y = e.clientY - position.top;
      let key___ = this.props.field_type.slice(this.props.field_type.length - 1);
      let doc_id = e.target.id.replace ( /[^\d.]/g, '' ); 
      this.state.items.push(<Draggable 
        ref={key___ +'_'+doc_id+'_'+ this.state.date_field_count}
        key={this.state.date_field_count}
        id={'doc_'+doc_id+'_'+this.state.date_field_count}
        docId={doc_id}
        fieldType={key___}
        top={y}
        left={x}
        width={list[key___].width}
        height={list[key___].height}
        fontSize={list[key___].fontSize}
        isDragging={list[key___].isDragging}
        isResizing={list[key___].isResizing}
        updateStateDragging={this.updateStateDragging.bind(this)}
        updateStateResizing={this.updateStateResizing.bind(this)}
        funcResizing={this.funcResizing.bind(this)}
        removeFieldBox={this.removeFieldBox.bind(this)}
      />)
      this.setState({items:this.state.items});



      
      if(this.props.field_type && !list[key___].appendOn){
        list[key___].top = y;
        list[key___].left = x;
        list[key___].isHide =  false;
        list[key___].appendOn = true;
        // console.log(list[key___])
        // this.setState({show_field:true});
        if(e.target.id && e.target.id !=''){
          this.setState({doc_key:doc_id});
        }
        this.setState({field_lists:list});
      }else{
        console.log('appended already!!')
      }
      // let unique = [...new Set(this.state.fields)];
      // this.setState({fields:unique});
    }

    getPosition = (el) => {
      var xPosition = 0;
      var yPosition = 0;
      
      console.log(el.getBoundingClientRect())
      while (el) {
        if (el.tagName == "BODY") {
          var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
          var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
          xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
          yPosition += (el.offsetTop - yScrollPos + el.clientTop);
        } else {
          xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
          yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        }
        el = el.offsetParent;
      }
      return {
        x: xPosition,
        y: yPosition
      };
    }

    removeFieldBox(id,doc_id){
      let list = this.state.field_lists; 
      // let index = this.state.field_lists.findIndex((item) => item.id == id);
      list[id].isHide = true;
      list[id].type = 'yes';
      list[id].appendOn = false;
      this.setState({doc_key:doc_id});
      this.setState({field_lists:list});
      // let newState = Object.assign(
      //   this.state, {
      //     field_lists : list
      //   });
      // this.setState(newState);
    }

    render() {
      let DropJgah = []
      let key_ = 1; 
      let item = this.state.field_lists;
      console.log(this.state.items)
      this.props.docs.map(doc => { 
        let items = [];
        if(this.state.doc_key == key_){
          for (let field of this.props.field_type) {
            if(item[field].type == 'yes'){
              item[field].isHide = true;
              item[field].appendOn = false;
              item[field].type = field;
              this.setState({field_lists:item});
            }
            if(!item[field].isHide){
              items.push(
                <Draggable 
                  ref={field + item[field].id}
                  key={field+item[field].id}
                  id={item[field].id}
                  docId={key_}
                  fieldType={field}
                  top={item[field].top}
                  left={item[field].left}
                  width={item[field].width}
                  height={item[field].height}
                  fontSize={item[field].fontSize}
                  isDragging={item[field].isDragging}
                  isResizing={item[field].isResizing}
                  updateStateDragging={this.updateStateDragging.bind(this)}
                  updateStateResizing={this.updateStateResizing.bind(this)}
                  funcResizing={this.funcResizing.bind(this)}
                  removeFieldBox={this.removeFieldBox.bind(this)}
                />
              );
            }
          }
        }
        console.log('render items')
        console.log(items)
        console.log('originals items')
        console.log(this.state.items)
        DropJgah.push(<div
          className="drop-area container doc-bg signature_container"
          onDragOver={this.onDragOver.bind(this)}
          id={'signature_container_'+key_}
          onDrop={this.onDrop.bind(this)} 
          style = {{backgroundImage:"url(files/docs/" + doc.name + ")"}}
          onClick={(e) =>{this.pasteSelectedField(e)}}
          >
          {items}
        </div>)
        key_++;
      })
      return (
        <div>
        {DropJgah}
        </div>
      );
    }
  };
  
  
  // draggable Component
  class Draggable extends React.Component {
    constructor(props) {
      super(props);
    }
    onMouseDown(e){
      console.log("Draggable.onMouseDown");
      var elm = document.elementFromPoint(e.clientX, e.clientY);
      if( elm.className != 'resizer' ){
        this.props.updateStateDragging( this.props.fieldType, true );
      }
    }
    onMouseUp(e){
      console.log("Draggable.onMouseUp");
      this.props.updateStateDragging( this.props.fieldType, false );
    }
    onDragStart(e) {
      console.log("Draggable.onDragStart");
      const nodeStyle = this.refs.node.style;
      let fieldtype = this.refs.node.id.replace('_'+this.props.id, '');
      e.dataTransfer.setData( 'application/json', JSON.stringify({
        id: this.props.id,
        fieldtype: fieldtype,
        x: e.clientX - parseInt(nodeStyle.left),
        y: e.clientY - parseInt(nodeStyle.top),
      }));
    }
    onDragEnd(e){
      console.log("Draggable.onDragEnd");
      this.props.updateStateDragging( this.props.fieldType, false );
    }

    removeField(e){
      this.props.removeFieldBox(this.props.fieldType,this.props.docId)
    }

    render() {
      let dateField = ''
      let styles = {
        top:    this.props.top,
        left:   this.props.left,
        width:  this.props.width,
        height: this.props.height,
        fontSize: this.props.fontSize,
      };
      let cusstyle = {
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          maxWidth: '100%',
          background: 'transparent',
          outline: 'none',
          color: '#000',
          padding: '5px',
          margin: '0px',
          resize: 'none',
          overflow: 'hidden',
          fontSize:'100%',
          position:'relative',
          cursor: 'move',
      }
    if(this.props.fieldType == 'date'){
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      dateField = month + '/' + date + '/' + year;
    }
      return (
        <div className="text-field-box item unselectable" 
          ref={"node"}
          draggable={this.props.isDragging}
          id={ this.props.fieldType+'_' + this.props.id }
          fieldtype={this.props.fieldType}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onDragStart={this.onDragStart.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)} style={styles}>
        <textarea className="form-control" defaultValue={dateField} style={cusstyle}></textarea>
        <div className="round-sml btn-removebox1" onClick={this.removeField.bind(this)}>✕</div>
        <div className="round-sml ui-resizable-handle ui-resizable-nw" style={{zIndex: '90'}}></div>
        <div className="round-sml ui-resizable-handle ui-resizable-sw" style={{zIndex: '90'}}></div>
        <div className="round-sml ui-resizable-handle ui-resizable-se" style={{zIndex: '90'}}></div>
        <Resizer
            ref={"resizerNode"}
            id={this.props.id}
            docId={this.props.docId}
            isResizing={this.props.isResizing}
            fieldtype={this.props.fieldType}
            resizerWidth={16}
            resizerHeight={16}
            updateStateResizing={this.props.updateStateResizing}
            funcResizing={this.props.funcResizing} />
      </div>
      );
    }
  };
  Draggable.propTypes = {
      id:         PropTypes.number.isRequired,
      isDragging: PropTypes.bool.isRequired,
      isResizing: PropTypes.bool.isRequired,
      top:        PropTypes.number.isRequired,
      left:       PropTypes.number.isRequired,
      width:      PropTypes.number.isRequired,
      height:     PropTypes.number.isRequired,
      updateStateDragging: PropTypes.func.isRequired,
      updateStateResizing: PropTypes.func.isRequired,
      funcResizing:        PropTypes.func.isRequired,
    };
  
  
  
  // Resizer Component
  class Resizer extends React.Component {
    constructor(props) {
      super(props);
    }
    componentDidMount(){
      const x = document.getElementById("signature_container_"+this.props.docId);
      x.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      x.addEventListener('mouseup', this.onMouseUp.bind(this), false);
      // window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      // window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    }
    componentWillUnmount(){
      const x = document.getElementById("signature_container_"+this.props.docId);
      x.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
      x.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    }
    onMouseDown(e) {
      console.log("Resizer.onMouseDown");
      this.props.updateStateResizing( this.props.fieldtype, true);
    }
    onMouseMove(e) {
      if( this.props.isResizing ){
        console.log("Resizer.onMouseMove");
        this.props.funcResizing( this.props.fieldtype, e.clientX, e.clientY,this.props.id);
      }
    }
    onMouseUp(e) {
      console.log("Resizer.onMouseUp");
      if( this.props.isResizing ){
        this.props.updateStateResizing( this.props.fieldtype, false);
      }
    }
    render() {
      const style = {
        width:  this.props.resizerWidth,
        height: this.props.resizerHeight,
      };
      return (
        <div className="resizer"
              style={style}
              onMouseDown={this.onMouseDown.bind(this)}
          ></div>
      );
    }
  };
  Resizer.propTypes = {
    id:                   PropTypes.number.isRequired,
    isResizing:           PropTypes.bool.isRequired,
    funcResizing:         PropTypes.func.isRequired,
    updateStateResizing:  PropTypes.func.isRequired,
    resizerWidth:         PropTypes.number.isRequired,
    resizerHeight:        PropTypes.number.isRequired
  };
  
  export default DropArea;
  