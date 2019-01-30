import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad-wrapper'
import './Signature.css';

class Signature extends Component {
  constructor(props){
    super(props);
    this.state ={
      page:'signature',
      signInput:null,
      buttons:{
        sign:false,
        clear:false,
        revoke:false
      }
    };
  }
    bindSignature(e){
    if(this.state.signInput.isEmpty()) return false;
      let image = this.state.signInput.toDataURL(),
          container = document.getElementById('sign-location'),
          img = document.createElement("img"),
          onClick = (e)=>{
            debugger;
            container.removeChild(e.target);
          };

      img.src = image;
      img.alt = "Double Click to Remove Signature";
      container.children.length ? container.removeChild(container.children[0]) : null;
      container.appendChild(img);
      debugger;
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
    debugger;
    this.state.signInput.clear();
     this.setState({buttons:{sign:true,clear:true,revoke:false}});
  }
  // componentWillUnmount(){
  //      window.addEventListener("resize",this.resizeCanvas);
  // }

  //   componentDidMount(){
  //     let canvas = document.getElementById('signature-input'),
  //     widget =new SignaturePad(canvas,{
  //       minWidth:.2,
  //       maxWidth:3,
  //       onBegin(e){
  //         this.setState({buttons:{sign:true,clear:true,revoke:false}});
  //       },
  //       onEnd(e){

  //       },
  //     }); 
  //     // this.setState({signInput:widget});
  //     // console.log(this.state.signInput)
  //     // window.addEventListener("resize",this.resizeCanvas);
  //     // debugger;
  //   }
  render() {
    return (
      <div><header>
         <nav className="navbar navbar-expand-lg navbar-light custom-navheader navbar-fixed header-template" id="sroll-className">
      <div className="container">
        <div className="col-md-8 offset-md-2">
          <div className="row">
            <a className="navbar-brand d-lg-block d-md-block" href="index.html"><img src="/assets/img/fina-logo.png" alt=""/></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse navigation-bar2" id="navbarCollapse">
              <ul className="navbar-nav ml-auto custom-nav">
                <li className="nav-item active">
                   <a className="nav-link" href="#"><i className="fa fa-download"></i></a>
                </li>
                <li className="nav-item">
                   <a className="btn btn-done nav-link" href="#">Done</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
         </nav>
      </header>
    <div className="container-fluid main-wrapper">
      <div className="left-sidebar">
        <ul className="btn-list">
          <li>
            <div id="accordion" className="inner-accordian">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Add Content
                    <span className="btn-helper">to document</span>
                  </button>
                </div>
                <div id="collapseOne" className="collapse  show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    <ol className="btn-mainlist">
                      <li><a href="#" className="btn current-btn">Signature</a></li>
                      <li><a href="#" className="btn">Text</a></li>
                      <li><a href="#" className="btn">Date</a></li>
                      <li><a href="#" className="btn">Initials</a></li>
                      <li><a href="#" className="btn">Check</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul className="btn-list">
          <li>
            <div id="accordion" className="inner-accordian">      
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                    Add Fields
                    <span className="btn-helper">for signers</span>
                  </button>
                </div>
                <div id="collapseTwo" className="collapse  show" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div className="card-body">
                  <ol className="btn-mainlist">
                    <li><a href="#" className="btn current-btn">Signature Field</a></li>
                    <li><a href="#" className="btn">Text Field</a></li>
                    <li><a href="#" className="btn">Date Field</a></li>
                    <li><a href="#" className="btn">Initials Field</a></li>
                    <li><a href="#" className="btn">Checkbox Field</a></li>
                    <li><a href="#" className="btn">Radio Fields</a></li>
                    <li><a href="#" className="btn">Attachment</a></li>
                  </ol>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="right-maintemplate">
        <div className="pageNumber">Page 1 of 1</div>
        <SignaturePad options={{minWidth: 5, maxWidth: 10, penColor: 'rgb(66, 133, 244)'}} />
      </div>
    </div></div>)
  }
}

export default Signature;
