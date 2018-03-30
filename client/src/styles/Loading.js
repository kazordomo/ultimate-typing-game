import React from 'react';
import styled from 'react-emotion';

const Loader = styled('div')`
	margin: 0 auto;
	width: 60px;
	height: 50px;
	text-align: center;
	font-size: 10px;
	position: absolute;
	top: 48%;
	left: 50%;
	-webkit-transform: translateY(-50%) translateX(-50%);

  > div {
    height: 100%;
    width: 8px;
    display: inline-block;
    float: left;
    margin-left: 2px;
    -webkit-animation: delay 0.8s infinite ease-in-out;
    animation: delay 0.8s infinite ease-in-out;
  }

  .bar1 {
    background-color: #5A7D7C ;
  }
  .bar2 {
    background-color: #DADFF7;
    -webkit-animation-delay: -0.7s;
    animation-delay: -0.7s;
  }
  .bar3 {
    background-color: #232C33;
    -webkit-animation-delay: -0.6s;
    animation-delay: -0.6s;
  }
  .bar4 {
    background-color: #A0C1D1;
    -webkit-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }
  .bar5 {
    background-color: #B5B2C2;
    -webkit-animation-delay: -0.4s;
    animation-delay: -0.4s;
  }
  .bar6 {
    background-color: #5A7D7C;
    -webkit-animation-delay: -0.3s;
    animation-delay: -0.3s;
  }


  @-webkit-keyframes delay {
	0%, 40%, 100% { -webkit-transform: scaleY(0.05) }  
	20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes delay {
  0%, 40%, 100% { 
    transform: scaleY(0.05);
    -webkit-transform: scaleY(0.05);
  }  20% { 
    transform: scaleY(1.0);
    -webkit-transform: scaleY(1.0);
  }
`

export default () => {
  return (
    <Loader>
		<div className="bar1"></div>
		<div className="bar2"></div>
		<div className="bar3"></div>
		<div className="bar4"></div>
		<div className="bar5"></div>
		<div className="bar6"></div>
    </Loader>
  )
}