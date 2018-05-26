import React, { Component } from 'react';
import styled from 'react-emotion';
import Row from '../../../styles/Row';
import { CustomButton } from '../../../styles/Button';

const Container = styled('div')`
    position: relative;
    z-index: 999;
    top: 100px;
    left: 0;
    right: 0;
    width: 350px;
    margin: auto;
    height: 160px;
    padding: 25px 0px;
    position: absolute;
    background-color: #DADFF7;
    color: #FFFFFF;
    text-align: center;
    border-radius: 2px;
`;

const Br = styled('div')`
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
`;

const buttonStyle = {
    width: '180px',
    margin: '10px auto',
    padding: '5px 10px',
}

class Modal extends Component {
    onClose(){
        if(this.props.item.onClose){
            this.props.item.onClose();
            this.props.onClose(this.props.item);
        } else {
            this.props.onClose(this.props.item);
        }
    }
    onConfirm(){
        if(this.props.item.onConfirm){
            this.props.item.onConfirm();
            this.props.onClose(this.props.item);
        }
    }

    render() {
        const { text } = this.props.item;
        return (
            <Container>
                <Br />
                <div>{ text }</div>
                <Row>
                    <CustomButton 
                        {...buttonStyle}
                        color='#000000'
                        backgroundColor='#EDF257'
                        onClick={() => this.onClose()}>
                        Close
                    </CustomButton>
                    <CustomButton 
                        {...buttonStyle}
                        color='#FFFFFF'
                        backgroundColor='#FA2A38'
                        onClick={() => this.onConfirm()}>
                        Confirm
                    </CustomButton>
                </Row>
            </Container>
        );
    }
}

export default Modal;
