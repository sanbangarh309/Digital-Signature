import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Draggable.css';
// drop area Component
class DropArea extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        field_lists : [],
        list: [],
        show_field: false,
        doc_key: null,
        field_count:0,
        items: {},
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
      let list = this.state.items;
      console.log(obj)
      console.log(list)
      // let index = this.state.list.findIndex((item) => item.id == obj.id);
      list[obj.id].isDragging = false;
      list[obj.id].top  = (e.clientY - obj.y);
      list[obj.id].left = (e.clientX - obj.x);

      // this.setState({
      //   items: [
      //      ...this.state.items.slice(0,obj.id),
      //      Object.assign({}, this.state.items[obj.id], {isDragging: false,top: (e.clientY - obj.y),left: (e.clientX - obj.x)}),
      //      ...this.state.items.slice(obj.id+1)
      //   ]
      // });

    
      let newState = Object.assign(
        this.state, {
          items : list
        });

      this.setState(newState);
      e.preventDefault();
    }
    updateStateDragging( id, isDragging){
      let list = this.state.items;
      // let index = this.state.field_lists.findIndex((item) => item.id == id);
      list[id].isDragging = isDragging;   
      let newState = Object.assign(
        this.state, {
          items : list
        });
        // console.log(list[id])
      
      this.setState(newState);
    }
    updateStateResizing( id, isResizing){
      let list = this.state.items;
      // let index = this.state.list.findIndex((item) => item.id == id);
      list[id].isResizing = isResizing;
      
      let newState = Object.assign(
        this.state, {
          items : list
        });
      this.setState(newState);
    }
    funcResizing(id, clientX, clientY, field=''){
      let element = this.refs[field+'_'+ this.state.doc_key+'_'+ id];  
      let list = this.state.items;
      let position = element.refs.node.getBoundingClientRect();
      list[id].width =   clientX - position.left + (16 / 2);
      list[id].height =  clientY - position.top  + (16 / 2);
      list[id].fontSize = parseFloat(list[id].height/2.5);
      // console.log(position)
      console.log(list[id])
      let newState = Object.assign(
        this.state, {
          items : list
        });
      this.setState(newState);
    }
    pasteSelectedField(e){
      e.preventDefault();
      if( !e.target.className.includes('btn-removebox1') && !e.target.className.includes('form-control') && !e.target.className.includes('unselectable') && !e.target.className.includes('sign_image')){
        console.log('new element created')
        let position = e.target.getBoundingClientRect();
        var x = e.clientX - position.left; //x position within the element.
        var y = e.clientY - position.top;
        let doc_id = e.target.id.replace ( /[^\d.]/g, '' );
        let id = 0;
        let h = 100;
        let w = 200;
        let alreday = false;
        let list = this.state.items;
        let key___ = this.props.field_type.slice(this.props.field_type.length - 1);
        if(key___.length <= 0){
          this.props.getSignPosition(y,x,doc_id);
          $('.sign-btn').click();
          return false
        }

        key___ = key___[0];
        this.setState((state) => ({ field_count: state.field_count + 1}));
        if(key___ == 'date'){
          w = 100
          h = 50
        }
        for(let res of Object.keys(list)){
          if(res.top == y && res.left == x){
            alreday = true;
          }
          if(this.state.chkduplicacy.indexOf(this.state.field_count) > -1){
            alreday = true;
          }
          // if(res.isDragging || res.isResizing){
          //   alreday = true;
          // }
        }
        
        if(!alreday){
          let items = []
          this.state.field_lists.push({ id: this.state.field_count, isDragging: false, isResizing: false, top:y, left: x,   width:w, height:h, fontSize:20,isHide:false, type:key___,appendOn:false,doc_id:doc_id});
          let newobj = {};
          Object.assign(newobj, this.state.field_lists); 
          this.setState({show_field:true});
          if(e.target.id && e.target.id !=''){
            this.setState({doc_key:doc_id});
          }
          this.setState({items:newobj});
        }
      }
    }

    removeFieldBox(id,doc_id){
      let list = this.state.items; 
      // let index = this.state.field_lists.findIndex((item) => item.id == id);
      list[id].isHide = true;
      list[id].type = 'yes';
      list[id].appendOn = false;
      this.setState({doc_key:doc_id});
      this.setState({items:list});
      // let newState = Object.assign(
      //   this.state, {
      //     field_lists : list
      //   });
      // this.setState(newState);
    }

    render() {
      let DropJgah = []
      let key_ = 1;
      let fields = this.state.items;
      this.props.docs.map(doc => {
        let items = []; 
        if(this.state.doc_key == key_){ 
          Object.keys(fields).map(key => {
            if(!fields[key].isHide){
                if(this.state.chkduplicacy.includes(fields[key].id)){
                  // delete this.state.list[fields[key].id];
                  $('#doc_'+key_+'_'+fields[key].id).remove();
                  console.log('#doc_'+key_+'_'+fields[key].id);
                }else{
                  this.state.chkduplicacy.push(fields[key].id);
                }
                // console.log('current:key- '+this.state.doc_key);
                // console.log('org:key- '+key_);
                this.state.list.push(
                  <Draggable 
                    ref={fields[key].type +'_'+key_+'_'+ fields[key].id}
                    key={fields[key].id}
                    drag_id={fields[key].id}
                    id={'doc_'+key_+'_'+fields[key].id}
                    docId={key_}
                    fieldType={fields[key].type}
                    top={fields[key].top}
                    left={fields[key].left}
                    width={fields[key].width}
                    height={fields[key].height}
                    fontSize={fields[key].fontSize}
                    isDragging={fields[key].isDragging}
                    isResizing={fields[key].isResizing}
                    updateStateDragging={this.updateStateDragging.bind(this)}
                    updateStateResizing={this.updateStateResizing.bind(this)}
                    funcResizing={this.funcResizing.bind(this)}
                    removeFieldBox={this.removeFieldBox.bind(this)}
                  />
                );
              
            }
          });
          console.log(this.state.list);
          // DropJgah.push(<div className="drop-area container doc-bg signature_container"><img  
          //   src={"files/docs/" + doc.name} 
          //   alt="No Doc" 
          //   ismap
          //   id={'signature_container_'+key_}
          //   onDragOver={this.onDragOver.bind(this)}
          //   onDrop={this.onDrop.bind(this)} 
          //   onClick={(e) =>{this.pasteSelectedField(e)}} />{this.state.list}</div>)
          DropJgah.push(<div
            className="drop-area container doc-bg signature_container"
            onDragOver={this.onDragOver.bind(this)}
            id={'signature_container_'+key_}
            onDrop={this.onDrop.bind(this)} 
            style = {{backgroundImage:"url(files/docs/" + doc.name + ")"}}
            onClick={(e) =>{this.pasteSelectedField(e)}}
            >
            {this.state.list}
          </div>)
        }else{
          // DropJgah.push(<div className="drop-area container doc-bg signature_container"><img  
          //   src={"files/docs/" + doc.name} 
          //   alt="No Doc" 
          //   ismap
          //   id={'signature_container_'+key_}
          //   onDragOver={this.onDragOver.bind(this)}
          //   onDrop={this.onDrop.bind(this)} 
          //   onClick={(e) =>{this.pasteSelectedField(e)}} /></div>)
          DropJgah.push(<div
            className="drop-area container doc-bg signature_container"
            onDragOver={this.onDragOver.bind(this)}
            id={'signature_container_'+key_}
            onDrop={this.onDrop.bind(this)} 
            style = {{backgroundImage:"url(files/docs/" + doc.name + ")"}}
            onClick={(e) =>{this.pasteSelectedField(e)}}
            >
          </div>)
        }
        
        key_++;
      });
      return (
        <div className="right-maintemplate" key="1">
        <div className="pageNumber">Page 1 of 1</div>
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
          draggable="true"
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
  