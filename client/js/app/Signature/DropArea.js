import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Draggable.css';
// drop area Component
class DropArea extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        field_lists : { text: { id: 1, isDragging: false, isResizing: false, top:100, left: 50,   width:200, height:100, fontSize:25,isHide:true, type:'text',appendOn:false}, date: { id: 2, isDragging: false, isResizing: false, top:100, left: 50, width:100, height:50, fontSize:20, isHide:true, type:'date',appendOn:false} },
        list: [],
        show_field: false,
        doc_key: null,
        field_count:0,
        items: [],
        items_count: [],
        chkduplicacy:[]
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
      let list = this.state.list;
      // let index = this.state.list.findIndex((item) => item.id == obj.id);
      list[obj.id].isDragging = false;
      list[obj.id].top  = (e.clientY - obj.y);
      list[obj.id].left = (e.clientX - obj.x);
      
      let newState = Object.assign(
        this.state, {
          list : list
        });
        console.log(newState)
      this.setState(newState);
      e.preventDefault();
    }
    updateStateDragging( id, isDragging){
      let list = this.state.list;
      // console.log(id)
      // console.log(list)
      // 'doc_'+key_+'_'+field.id
      // let index = this.state.field_lists.findIndex((item) => item.id == id);
      list[id].isDragging = isDragging;

      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }
    updateStateResizing( id, isResizing){
      let list = this.state.list;
      // let index = this.state.list.findIndex((item) => item.id == id);
      list[id].isResizing = isResizing;
      
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }
    funcResizing(id, clientX, clientY, field=''){
      let element = this.refs[field+'_'+ this.state.doc_key+'_'+ id];  
      let list = this.state.list;
      let position = element.refs.node.getBoundingClientRect();
      list[id].width =   clientX - position.left + (16 / 2);
      list[id].height =  clientY - position.top  + (16 / 2);
      list[id].fontSize = parseFloat(list[id].height/2.5);
      // console.log(position)
      console.log(list[id])
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }
    pasteSelectedField(e){
      e.preventDefault();
      let id = 0;
      let h = 200;
      let w = 100;
      let alreday = false;
      let list = this.state.list;
      let key___ = this.props.field_type.slice(this.props.field_type.length - 1);
      this.setState((state) => ({ field_count: state.field_count + 1}));
      if(key___ == 'date'){
        w = 100
        h = 50
      }
      let position = e.target.getBoundingClientRect();
      var x = e.clientX - position.left; //x position within the element.
      var y = e.clientY - position.top;
      let doc_id = e.target.id.replace ( /[^\d.]/g, '' );
      for(let res of list){
        if(res.top == y && res.left == x){
          alreday = true;
        }
      }
      if(!alreday){
        this.state.list.push({ id: this.state.field_count, isDragging: false, isResizing: false, top:y, left: x,   width:w, height:h, fontSize:23,isHide:false, type:key___,appendOn:false,doc_id:doc_id});
        this.setState({show_field:true});
        if(e.target.id && e.target.id !=''){
          this.setState({doc_key:doc_id});
        }
        this.setState({list:this.state.list});
      } 
    }

    removeFieldBox(id,doc_id){
      let list = this.state.list; 
      // let index = this.state.field_lists.findIndex((item) => item.id == id);
      list[id].isHide = true;
      list[id].type = 'yes';
      list[id].appendOn = false;
      this.setState({doc_key:doc_id});
      this.setState({list:list});
      // let newState = Object.assign(
      //   this.state, {
      //     field_lists : list
      //   });
      // this.setState(newState);
    }

    render() {
      let DropJgah = []
      let key_ = 1; 
      let cnt = 0;
      let fields = this.state.list;
      this.props.docs.map(doc => { 
        if(this.state.doc_key == key_){
          fields.map(field => {
            if(!field.isHide){
              if(this.state.chkduplicacy.indexOf(field.id) > -1){

              }else{
                this.state.chkduplicacy.push(field.id);
                this.state.items.push(
                  <Draggable 
                    ref={field.type[0] +'_'+key_+'_'+ field.id}
                    key={field.id}
                    drag_id={field.id}
                    id={'doc_'+key_+'_'+field.id}
                    docId={key_}
                    fieldType={field.type[0]}
                    top={field.top}
                    left={field.left}
                    width={field.width}
                    height={field.height}
                    fontSize={field.fontSize}
                    isDragging={field.isDragging}
                    isResizing={field.isResizing}
                    updateStateDragging={this.updateStateDragging.bind(this)}
                    updateStateResizing={this.updateStateResizing.bind(this)}
                    funcResizing={this.funcResizing.bind(this)}
                    removeFieldBox={this.removeFieldBox.bind(this)}
                  />
                );
              }
            }
          });
          // this.props.field_type.map(field => { 
          //   if(item[field].type == 'yes'){
          //     item[field].isHide = true;
          //     item[field].appendOn = false;
          //     item[field].type = field;
          //     this.setState({field_lists:item});
          //   }
          //   if(!item[field].isHide){
          //     if(field == 'date'){
          //       cnt = this.state.date_field_count
          //     }else{
          //       cnt = this.state.text_field_co
          //     if(this.state.chkduplicacy.indexOf(cnt) > -1){
          //       // continue;
          //     }else{
          //       this.state.chkduplicacy.push(cnt);
          //       this.state.items.push(
          //         <Draggable 
          //           ref={field +'_'+key_+'_'+ cnt}
          //           key={cnt}
          //           id={'doc_'+key_+'_'+cnt}
          //           docId={key_}
          //           fieldType={field}
          //           top={top}
          //           left={left}
          //           width={item[field].width}
          //           height={item[field].height}
          //           fontSize={item[field].fontSize}
          //           isDragging={item[field].isDragging}
          //           isResizing={item[field].isResizing}
          //           updateStateDragging={this.updateStateDragging.bind(this)}
          //           updateStateResizing={this.updateStateResizing.bind(this)}
          //           funcResizing={this.funcResizing.bind(this)}
          //           removeFieldBox={this.removeFieldBox.bind(this)}
          //         />
          //       );
          //     }
          //   }
          // })
        }
        DropJgah.push(<div
          className="drop-area container doc-bg signature_container"
          onDragOver={this.onDragOver.bind(this)}
          id={'signature_container_'+key_}
          onDrop={this.onDrop.bind(this)} 
          style = {{backgroundImage:"url(files/docs/" + doc.name + ")"}}
          onClick={(e) =>{this.pasteSelectedField(e)}}
          >
          {this.state.items}
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
        this.props.updateStateDragging( this.props.drag_id, true );
      }
    }
    onMouseUp(e){
      console.log("Draggable.onMouseUp");
      this.props.updateStateDragging( this.props.drag_id, false );
    }
    onDragStart(e) {
      console.log("Draggable.onDragStart");
      const nodeStyle = this.refs.node.style;
      let fieldtype = this.refs.node.id.replace('_'+this.props.id, '');
      e.dataTransfer.setData( 'application/json', JSON.stringify({
        id: this.props.drag_id,
        fieldtype: this.props.fieldType,
        x: e.clientX - parseInt(nodeStyle.left),
        y: e.clientY - parseInt(nodeStyle.top),
      }));
    }
    onDragEnd(e){
      console.log("Draggable.onDragEnd");
      this.props.updateStateDragging( this.props.drag_id, false );
    }

    removeField(e){
      this.props.removeFieldBox(this.props.drag_id,this.props.docId)
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
            drag_id={this.props.drag_id}
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
      id:         PropTypes.string.isRequired,
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
      this.props.updateStateResizing( this.props.drag_id, true);
    }
    onMouseMove(e) {
      if( this.props.isResizing ){
        console.log("Resizer.onMouseMove");
        this.props.funcResizing( this.props.drag_id, e.clientX, e.clientY,this.props.fieldtype);
      }
    }
    onMouseUp(e) {
      console.log("Resizer.onMouseUp");
      if( this.props.isResizing ){
        this.props.updateStateResizing( this.props.drag_id, false);
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
    id:                   PropTypes.string.isRequired,
    isResizing:           PropTypes.bool.isRequired,
    funcResizing:         PropTypes.func.isRequired,
    updateStateResizing:  PropTypes.func.isRequired,
    resizerWidth:         PropTypes.number.isRequired,
    resizerHeight:        PropTypes.number.isRequired
  };
  
  export default DropArea;
  