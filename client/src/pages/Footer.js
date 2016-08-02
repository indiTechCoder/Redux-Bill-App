import React, { Component } from 'react';

export default ()=>{
	return(
		<div className="footer-container" id="non-printable">
		<div className="container">
		<div className="footer">
		<span className="visible-lg row visible-md">

			<div style={{marginLeft: '30px'}}
		className='col-md-1 col-sm-6 col-xs-6 col-md-offset-0 override-col-margin'>

		<h4 style={{fontSize: '14px'}} className="footer-nav">Home</h4>
		<ul className="list-unstyled list-unstyled-txtalign">
		<li><a  href=""
		className="btn-link" style={{color: 'white'}}>
		<div className="linkstyle h8">Assigments </div>
		</a></li>
		<li><a 
		className="btn-link" style={{color: 'white'}}>
		<div className="linkstyle h8">Tasks</div>
		</a></li>
		<li><a  href=""
		className="btn-link" style={{color: 'white'}}>
		<div className="linkstyle h8">Settings</div>
		</a></li>
		</ul>

		</div>
		
		<div style={{marginLeft: '30px'}}
		className='col-md-3 col-sm-6 col-xs-6 col-md-offset-0 override-col-margin'>

		<div
		className=" col-md-2  col-sm-6 col-sm-offset-0  col-xs-offset-0  override-col-margin  col-xs-6 ">
		<h4 style={{fontSize: '14px'}} className="footer-nav">Pages</h4>
		<ul className="list-unstyled list-unstyled-txtalign">
		<li><a  href=""
		className="btn-link" style={{color: 'white'}}>
		<div className="linkstyle h8">Home</div>
		</a></li>
		<li><a  href=""
		className="btn-link" style={{color: 'white'}}>
		<div className="linkstyle h8">Settings</div>
		</a></li>
		<li><a  href=""
		className="btn-link" style={{color: 'white'}}>
		<div className="linkstyle h8">Console</div>
		</a></li>
		</ul>
		</div>
		</div>



		</span>
		</div>
		</div>
		</div>


		)
}


