import React from 'react';
import { reduxForm, Field } from 'redux-form';
import validate from './validateForm';
import AuthField from './AuthField';
import Button from '../../styles/Button';
import AuthStyles from '../../styles/AuthStyles';

const LocalRegister = ({ handleSubmit, _onSubmit, getLogin, styles }) => {
    const { I, TextInput, FlexItemLong, FlexItemShort, FlexRow, FlexRowItem, Row } = AuthStyles;
    return(
        <form onSubmit={handleSubmit(_onSubmit)} >
            <TextInput>
                <FlexItemShort>
                    <I className='fas fa-user'></I>
                </FlexItemShort>
                <FlexItemLong>
                    <Field component={AuthField} type='text' label='Username' name='username' />
                </FlexItemLong>
            </TextInput>
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
    form: 'authForm'
})(LocalRegister);