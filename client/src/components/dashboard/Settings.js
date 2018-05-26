import React from 'react';
import { connect } from 'react-redux';
import { showPopupModal } from '../../actions';
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
    color: ${props => props.color };
    text-align: center;
    cursor: pointer;
`;

const Settings = props => {

    // function deleteAccount() {
    //     fetch('/auth/deleteAccount', {
    //         credentials: 'include',
    //         method: 'delete',
    //         headers: { 'Content-Type': 'application/json' }
    //     });
    // }

    function deleteAccount() {
        console.log("deleting");
    }
    //TODO: the unlinking should be done when deleting account.

    return (
        <div>   
            <GoBack goTo='/dashboard' />
            <Title>Settings</Title>
            <Ahref 
                backgroundColor='#B5B2C2' 
                color='#000000' 
                href='/api/logout'>
                Logout
            </Ahref>
            <Ahref 
                backgroundColor='#FA2A38' 
                color='#FFFFFF' 
                onClick={() => props.dispatch(showPopupModal({
                    id: 1,
                    text: 'Are you sure?',
                    onClose: () => console.log('closing'),
                    onConfirm: () => deleteAccount(),
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