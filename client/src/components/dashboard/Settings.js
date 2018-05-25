import React from 'react';
import GoBack from '../basic/GoBack';
import Title from '../../styles/Title';
import styled from 'react-emotion';

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
`;

const Settings = () => {

    function deleteAccount() {
        fetch('/auth/deleteAccount', {
            credentials: 'include',
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        });
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
                onClick={() => deleteAccount()}>
                Delete account
            </Ahref>
        </div>
    )
}

export default Settings;