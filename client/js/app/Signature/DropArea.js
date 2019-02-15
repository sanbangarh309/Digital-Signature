import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Draggable.css';
// drop area Component
class DropArea extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        list: [ 
          { id: 1, isDragging: false, isResizing: false, top:100, left: 50,   width:100, height:150, isHide:false }, 
          // { id: 2, isDragging: false, isResizing: false, top:50, left: 200, width:200, height:100 }, 
        ],
        show_field: false,
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
    
      let list = this.state.list;
      let index = this.state.list.findIndex((item) => item.id == obj.id);
      list[index].isDragging = false;
      list[index].top  = (e.clientY - obj.y);
      list[index].left = (e.clientX - obj.x);
      
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
  
      e.preventDefault();
    }
    updateStateDragging( id, isDragging){
      let list = this.state.list;
      let index = this.state.list.findIndex((item) => item.id == id);
      list[index].isDragging = isDragging;
  
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }
    updateStateResizing( id, isResizing){
      let list = this.state.list;
      let index = this.state.list.findIndex((item) => item.id == id);
      list[index].isResizing = isResizing;
      
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }
    funcResizing(id, clientX, clientY){
      let node = this.refs["node_" + id];
      let list = this.state.list;
      // console.log(clientX);
      // console.log(node.refs.node.offsetLeft);
      // console.log(clientY);
      // console.log(node.refs.node.offsetTop);
      let index = this.state.list.findIndex((item) => item.id == id);
      list[index].width =   clientX - node.refs.node.offsetLeft + (16 / 2);
      list[index].height =  clientY - node.refs.node.offsetTop  + (16 / 2);
      
      let newState = Object.assign(
        this.state, {
          list : list
        });
      this.setState(newState);
    }
    pasteSelectedField(e){
      let position = this.getPosition(e.currentTarget);
      let list = this.state.list;
      list[0].top = position.y;
      list[0].left = position.x;
      this.setState({show_field:true});
      this.setState({list:list});
    }

    getPosition = (el) => {
      var xPosition = 0;
      var yPosition = 0;
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

    removeFieldBox = (e,id) => {
      let list = this.state.list;
      let index = this.state.list.findIndex((item) => item.id == id);
      list[index].isHide =  true;
      this.setState({show_field:false});
      this.setState({list:[]});
      console.log(this.state)
    }

    render() {
      let items = [];
      
      if(this.state.show_field){
        for (let item of this.state.list) {
          if(!item.isHide){
            items.push(
              <Draggable 
                ref={"node_" + item.id}
                key={item.id}
                id={item.id}
                top={item.top}
                left={item.left}
                width={item.width}
                height={item.height}
                isDragging={item.isDragging}
                isResizing={item.isResizing}
                updateStateDragging={this.updateStateDragging.bind(this)}
                updateStateResizing={this.updateStateResizing.bind(this)}
                funcResizing={this.funcResizing.bind(this)}
                removeFieldBox={this.removeFieldBox.bind(this)}
              />
            );
          }
        }
      }
      let DropJgah = []
      this.props.docs.map(doc => { 
        DropJgah.push(<div
          className="drop-area container doc-bg signature_container"
          onDragOver={this.onDragOver.bind(this)}
          onDrop={this.onDrop.bind(this)} 
          style = {{backgroundImage:"url(files/docs/" + doc.name + ")"}}
          onClick={(e) =>{this.pasteSelectedField(e)}}
          >
          {items}
        </div>)
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
        this.props.updateStateDragging( this.props.id, true );
      }
    }
    onMouseUp(e){
      console.log("Draggable.onMouseUp");
      this.props.updateStateDragging( this.props.id, false );
    }
    onDragStart(e) {
      console.log("Draggable.onDragStart");
  
      const nodeStyle = this.refs.node.style;
      e.dataTransfer.setData( 'application/json', JSON.stringify({
        id: this.props.id,
        x: e.clientX - parseInt(nodeStyle.left),
        y: e.clientY - parseInt(nodeStyle.top),
      }));
    }
    onDragEnd(e){
      console.log("Draggable.onDragEnd");
      
      this.props.updateStateDragging( this.props.id, false );
    }

    render() {
      const styles = {
        top:    this.props.top,
        left:   this.props.left,
        width:  this.props.width,
        height: this.props.height,
      };
      const cusstyle = {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
        background: 'transparent',
        outline: 'none',
        color: '#000',
        padding: '0px',
        margin: '0px',
        resize: 'none',
        overflow: 'hidden',
        fontSize:'100%',
        position:'relative',
        cursor: 'move',
    }
      return (
        <div className="text-field-box item unselectable page" 
          ref={"node"}
          draggable={this.props.isDragging}
          id={ 'item_' + this.props.id }
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onDragStart={this.onDragStart.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)} style={styles}>
        <textarea className="form-control" style={cusstyle}></textarea>
        <div className="round-sml btn-removebox1" onClick={(e) =>{this.props.removeFieldBox(e,this.props.id)}}>✕</div>
        <div className="round-sml ui-resizable-handle ui-resizable-nw" style={{zIndex: '90'}}></div>
        <div className="round-sml ui-resizable-handle ui-resizable-sw" style={{zIndex: '90'}}></div>
        <div className="round-sml ui-resizable-handle ui-resizable-se" style={{zIndex: '90'}}></div>
        <Resizer
            ref={"resizerNode"}
            id={this.props.id}
            isResizing={this.props.isResizing}
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
      window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
      window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    }
    componentWillUnmount(){
      window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
      window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    }
    onMouseDown(e) {
      console.log("Resizer.onMouseDown");
  
      this.props.updateStateResizing( this.props.id, true);
    }
    onMouseMove(e) {
      if( this.props.isResizing ){
        console.log("Resizer.onMouseMove");
        this.props.funcResizing( this.props.id, e.clientX, e.clientY);
      }
    }
    onMouseUp(e) {
      console.log("Resizer.onMouseUp");
      if( this.props.isResizing ){
        this.props.updateStateResizing( this.props.id, false);
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
  