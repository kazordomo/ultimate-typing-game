import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { hidePopupModal } from '../../actions';

const Container = styled('div')`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 250px;
    margin: auto;
    height: 200px;
    position: absolute;
    background-color: blue;
    display: ${props => props.show ? 'block' : 'none'}
`;

const Button = styled('button')`
    width: 180px;
    margin: 0 auto;
    padding: 5px 10px;
`;

//Remake and import button

const DeletePopup = props => {
    return (
        <Container show={props.popup.show}>
            <Button onClick={props.deleteObj}>Delete</Button>
            <Button onClick={props.hidePopupModal}>Cancel</Button>
        </Container>
    )
}

function mapStateToProps({ popup }) {
    return { popup };
}

export default connect(mapStateToProps, { hidePopupModal })(DeletePopup);

