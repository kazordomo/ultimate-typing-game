import React from 'react';
import { connect } from 'react-redux';
import { showPopupModal, deleteAccount } from '../../actions';
import GoBack from '../basic/GoBack';
import Title from '../../styles/Title';
import styled from 'react-emotion';
import ModalContainer from '../basic/modal/ModalContainer';

const Ahref = styled('a')`
    display: block;
    width: 250px;
    margin: 20px auto;
    padding: 5px 10px;
    background-color: ${props => props.backgroundColor };
    text-decoration: none;
    border-radius: 2px;
    color: #FFFFFF;
    text-align: center;
    cursor: pointer;
`;

const Settings = props => {

    //TODO: the unlinking should be done when deleting account.

    return (
        <div>   
            <GoBack goTo='/dashboard' />
            <Title>Settings</Title>
            <Ahref 
                backgroundColor='#5B9B66' 
                href='/api/logout'>
                Logout
            </Ahref>
            <Ahref 
                backgroundColor='#FA2A38' 
                onClick={() => props.dispatch(showPopupModal({
                    id: 1,
                    text: 'Delete account?',
                    onConfirm: () => props.dispatch(deleteAccount()),
                }))}>
                Delete account
            </Ahref>
            <ModalContainer />
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(null, mapDispatchToProps)(Settings);