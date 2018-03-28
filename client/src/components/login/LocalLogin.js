import React from 'react';
import { reduxForm, Field } from 'redux-form';
import AuthField from './AuthField';
import Button from '../../styles/Button';

const LocalLogin = ({ handleSubmit, handleAuthSubmit, getRegister, styles }) => {
    const { I, TextInput, FlexItemLong, FlexItemShort, FlexRow, FlexRowItem, ButtonWrapper, Row } = styles;
    return(
        <form onSubmit={handleSubmit(handleSubmit(handleAuthSubmit))} >
            <TextInput>
                <FlexItemShort>
                    <I className='fas fa-user'></I>
                </FlexItemShort>
                <FlexItemLong>
                    <Field component={AuthField} autoFocus type='text' label='Username' name='username' />
                </FlexItemLong>
            </TextInput>
            <TextInput>
                <FlexItemShort><I className='fas fa-unlock-alt'></I></FlexItemShort>
                <FlexItemLong>
                    <Field component={AuthField} type='password' label='Password' name='password' />
                </FlexItemLong>
            </TextInput>
            <Row>
                <Button auth type='submit'>Login</Button>
            </Row>
            <FlexRow>
                <FlexRowItem white onClick={getRegister()}>Create Account</FlexRowItem>
                <FlexRowItem>Forgot Password</FlexRowItem>
            </FlexRow>
        </form>
    );
}

export default reduxForm({
    form: 'authForm'
})(LocalLogin);