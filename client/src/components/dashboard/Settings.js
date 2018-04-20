import React from 'react';
import GoBack from '../basic/GoBack';
import Title from '../../styles/Title';

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
            <a href='/api/logout'>Logout</a>
            <div>Unlink facebook</div>
            <div>Unlink google</div>
            <div>Change password</div>
            <button onClick={() => deleteAccount()}>Delete account</button>
        </div>
    )
}

export default Settings;