import React from 'react';
import { reduxForm, Field } from 'redux-form';
import AuthField from './AuthField';
import Button from '../../styles/Button';
import validate from './validateForm';

const LocalRegister = ({ handleSubmit, handleAuthSubmit, getLogin, styles }) => {
    const { I, TextInput, FlexItemLong, FlexItemShort, FlexRow, FlexRowItem, ButtonWrapper, Row } = styles;
    return(
        <form onSubmit={handleSubmit(handleSubmit(handleAuthSubmit))} >
            <TextInput>
                <FlexItemShort>
                    <I className='fas fa-user'></I>
                </FlexItemShort>
                <FlexItemLong>
                    <Field component={AuthField} type='text' label='Username' name='username' />
                </FlexItemLong>
            </TextInput>
            {/* <TextInput>
                <FlexItemShort>
                    <I className='fas fa-user'></I>
                </FlexItemShort>
                <FlexItemLong>
                    <Field component={AuthField} type='email' label='Email' name='email' />
                </FlexItemLong>
            </TextInput> */}
            <TextInput>
                <FlexItemShort>
                    <I className='fas fa-unlock-alt'></I>
                </FlexItemShort>
                <FlexItemLong>
                    <Field component={AuthField} type='password' label='Password' name='password' />                    
                </FlexItemLong>
            </TextInput>
            <TextInput>
                <FlexItemShort>
                    <I className='fas fa-unlock-alt'></I>
                </FlexItemShort>
                <FlexItemLong>
                    <Field component={AuthField} type='password' label='Retype password' name='retypepassword' />                    
                </FlexItemLong>
            </TextInput>
            <Row>
                <Button auth type='submit'>Register</Button>
            </Row>
            <FlexRow>
                <FlexRowItem white onClick={getLogin()}>Already got an account?</FlexRowItem>
            </FlexRow>
        </form>
    );
}

export default reduxForm({
    validate,
    form: 'authForm'
})(LocalRegister);