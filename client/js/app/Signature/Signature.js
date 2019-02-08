import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SignaturePad from 'react-signature-pad-wrapper'
import './Signature.css';

class Signature extends Component {
  constructor(props){
    super(props);
    this.state ={
      page:'signature',
      textInput:null,
      containerClasses:['page','container','doc-bg'],
      type:null,
      buttons:{
        sign:false,
        clear:false,
        revoke:false
      }
    };
  }

  removeSignature(e){
    var signature = this.refs.mySignature;
    signature.clear();
  }

  createTextField(e){
    e.preventDefault();
    $('#signature_container').addClass('hovrcr_text');
  	$('#signature_container').removeClass('hovrcr_date');
  	$('#signature_container').removeClass('hovrcr_initials');
  	$('#signature_container').removeClass('hovrcr_check');
    this.setState({textInput:'text'});
  }

  pasteSelectedField(e){
    e.preventDefault();
    let container = document.getElementById('signature_container');
    let dynamicstyle = {
        left: e.pageX + 'px',
        top: e.pageY + 'px',
        width:'50px',
        height:'50px'
    }
    // let element = React.createElement(this.state.textInput, {style: dynamicstyle})
    // var element = document.createElement('input');
    let cusstyle = {
        height:'50px',
        width:'50px',
        fontSize:'100%'
    }
    var element = <div className="text-field-box" style={dynamicstyle}>
      <textarea className="form-control" style={cusstyle}></textarea>
      <div className="round-sml btn-removebox1">✕</div>
      <div className="round-sml ui-resizable-handle ui-resizable-nw" style={{zIndex: '90'}}></div>
      <div className="round-sml ui-resizable-handle ui-resizable-sw" style={{zIndex: '90'}}></div>
      <div className="round-sml ui-resizable-handle ui-resizable-se" style={{zIndex: '90'}}></div>
    </div>;
    element.type = this.state.textInput;
    // element.style.cssText = 'left:'+e.pageX+'px;top:'+e.pageY+'px;';
    console.log(element)
    container.appendChild(element);
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
    let backImage = {}
    let doc = localStorage.getItem('uploaded_doc') || ''
    console.log(doc)
    if(doc){
      backImage = {
        backgroundImage:"url(" + doc + ")"
      }
    }
    console.log(backImage)
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
                      <li><a href="javascript:void(0)" className="btn sign-btn current-btn"  data-toggle="modal" data-target="#Signfiled">Signature</a></li>
                      <li><a href="javascript:void(0)" className="btn" onClick={this.createTextField.bind(this)}>Text</a></li>
                      <li><a href="javascript:void(0)" className="btn">Date</a></li>
                      <li><a href="javascript:void(0)" className="btn">Initials</a></li>
                      <li><a href="javascript:void(0)" className="btn">Check</a></li>
                      <li><a href="javascript:void(0)" className="btn" onClick={this.removeSignature.bind(this)}>Clear</a></li>
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
        <div className={this.state.containerClasses.join(' ')} id="signature_container" style = {backImage} onClick={this.pasteSelectedField.bind(this)}>

        </div>
      </div>
    </div>
    <div className="modal signmodal" id="Signfiled">
	<div className="modal-dialog modal-lg">
		<div className="modal-content">
			<div className="modal-header">
				<button type="button" className="close" data-dismiss="modal">&times;</button>
				<div className="col-12 p-0 tabnav-top">
					<ul className="nav nav-tabs">
						<li className="nav-item">
							<a className="nav-link active" data-toggle="tab" href="#type">Type</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" data-toggle="tab" href="#draw">Draw</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" data-toggle="tab" href="#upload">Upload</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="modal-body">
				<div className="container-fluid">
					<div className="tab-content">
						<div className="tab-pane active" id="type">
							<div className="col-12 p-0">
								<div className="col-md-12 textinput p-0">
									<input id="signatureTextInput" className="form-control" placeholder="Type your name here"/>
								</div>
								<div className="col-md-12 textinput">
									<ul className="col-list">
										<li className="card prev-box preview cedarville_cursive black-txt">Type your name here</li>
										<li className="card prev-box preview kristi black-txt">Type your name here</li>
										<li className="card prev-box preview mr_dafo black-txt">Type your name here</li>
										<li className="card prev-box preview sacramento black-txt">Type your name here</li>
										<li className="card prev-box preview montez black-txt">Type your name here</li>
										<li className="card prev-box preview reenie_beanie black-txt">Type your name here</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="tab-pane container fade" id="draw">
							<div className="col-12 p-0">
								<div className="signature-area">
									<SignaturePad clearButton="true" ref="mySignature" options={{minWidth: 5, maxWidth: 10, penColor: 'rgb(66, 133, 244)'}} />
									<div className="Close-ico">✕</div>
									<p className="clear-link"><a href="#">clear</a></p>
								</div>
							</div>
						</div>
						<div className="tab-pane container fade" id="upload">
							<div className="col-12 p-0">
								<div className="photo-area" styl="width:100%; height:250px;">
									<div className="col-md-12 text-center imguploadwrapper">
										<p>Upload an image of your signature</p>
										<div className="upload-box">
											<input type="file"/>
											<label><button>Upload Signature</button></label>
										</div>
									</div>
									<p className="clear-link"><a href="#">clear</a></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="modal-footer">
				<div className="row">
					<div className="col-md-6 pl-0">
						<ul className="list-inline color-list">
							<li className="black"><input name="color" type="radio"/><label></label></li>
							<li className="blue"><input name="color" type="radio"/><label></label></li>
							<li className="green"><input name="color" type="radio"/><label></label></li>
						</ul>
					</div>
					<div className="col-md-6">
						<div className="d-flex btn-block pull-right">
							<button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
							<button className="btn btn-primary btn-large" disabled>Sign</button>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </div>)
  }
}

export default Signature;
