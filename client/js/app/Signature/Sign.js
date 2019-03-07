import React, {Component} from 'react';
import './Signature.css';
import SignaturePad from 'react-signature-canvas'

class Sign extends Component {
    constructor(props){
        super(props);
        this.state ={
          signInput:null,
          buttons:{
            sign:false,
            clear:false,
            revoke:false
          }
        };
      }

      bindSignature(e){
        if(this.sigCanvas.isEmpty()) return false;
        let docId = this.props.docId || 1;
          let image = this.sigCanvas.toDataURL(),
              container = document.getElementById('signature_container_'+docId),
              img = document.createElement("img"),
              onClick = (e)=>{ 
                // debugger;
                container.removeChild(e.target);
              };
          
          img.src = image;
          img.alt = "Double Click to Remove Signature";
          $(img).addClass('sign_image')
          $(img).css('margin-top',this.props.t);
          $(img).css('margin-left',this.props.l);
          container.children.length ? container.removeChild(container.children[0]) : null;
          container.appendChild(img);
        //   debugger;
           img.removeEventListener("dblclick",onClick);
          img.addEventListener("dblclick",onClick);
          this.setState({buttons:{revoke:true,clear:true,sign:true}});
      }

      resizeCanvas(e){
        let canvas = React.FindDOMNode(this.refs.signingSurface),
             ratio =  Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d").scale(ratio, ratio);
        
      }

      clearSignature(e){
        // debugger;
        this.sigCanvas.clear();
        //  this.state.signInput.clear();
         this.setState({buttons:{sign:true,clear:true,revoke:false}});
      }

      componentWillUnmount(){
            window.addEventListener("resize",this.resizeCanvas);
      }

    //   componentDidMount(){
    //     let canvas = document.getElementById(this.props.srcElement),
    //     widget =new SignaturePad(canvas,{
    //       minWidth:.2,
    //       maxWidth:3,
    //       onBegin(e){
    //         this.setState({buttons:{sign:true,clear:true,revoke:false}});
    //       },
    //       onEnd(e){
            
    //       },
    //     });
    //     this.setState({signInput:widget}); 
    //     window.addEventListener("resize",this.resizeCanvas);
    //     // debugger;
    //   }

      render() {
        return <div className='container signature-container'>
          <div class='row'>
            <div class='col-md-12'>
            <SignaturePad 
                penColor={this.props.color}
                canvasProps={{width: this.props.w, height: this.props.h, className: 'sigCanvas'}} 
                ref={(ref) => { this.sigCanvas = ref }}
            />
            </div>
              </div>
             <div class='row' ref="btnWrapper" >
               <div class='col-sm-6'>
                    <div ref="btnSign" className='btn btn-success pull-left' onClick={this.bindSignature.bind(this)}>Sign</div> &nbsp;
                    <div ref="btnClear" className='btn btn-warning pull-right' onClick={this.clearSignature.bind(this)}>Clear</div>
               </div>
               </div>
          </div>;
      }
}

export default Sign;