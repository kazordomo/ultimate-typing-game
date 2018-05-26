import React, { Component } from 'react';
import AuthField from './AuthField';
import { Button } from '../../styles/Button';
import AuthStyles from '../../styles/AuthStyles';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '', retypepassword: '' };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleRegister(e) {
        e.preventDefault();
        const { username, password, retypepassword} = this.state;
        this.props._onSubmit('signup', { username, password, retypepassword });
    }

    render() {
        const { I, TextInput, FlexItemLong, FlexItemShort, FlexRow, FlexRowItem, Row } = AuthStyles;
        
        return(
            <form onSubmit={this.handleRegister} >
                <TextInput>
                    <FlexItemShort>
                        <I className='fas fa-user'></I>
                    </FlexItemShort>
                    <FlexItemLong>
                        <AuthField 
                            type='text' 
                            label='Username' 
                            name='username' 
                            value={this.state.username}
                            onChange={this.handleInputChange} />
                    </FlexItemLong>
                </TextInput>
                <TextInput>
                    <FlexItemShort>
                        <I className='fas fa-unlock-alt'></I>
                    </FlexItemShort>
                    <FlexItemLong>
                        <AuthField 
                            type='password' 
                            label='Password' 
                            name='password' 
                            value={this.state.password}
                            onChange={this.handleInputChange} />                    
                    </FlexItemLong>
                </TextInput>
                <TextInput>
                    <FlexItemShort>
                        <I className='fas fa-unlock-alt'></I>
                    </FlexItemShort>
                    <FlexItemLong>
                        <AuthField 
                            type='password' 
                            label='Retype password' 
                            name='retypepassword' 
                            value={this.state.retypepassword}
                            onChange={this.handleInputChange} />                
                    </FlexItemLong>
                </TextInput>
                <Row>
                    <Button auth type='submit'>Register</Button>
                </Row>
                <FlexRow>
                    <FlexRowItem white onClick={this.props.getLogin()}>Already got an account?</FlexRowItem>
                </FlexRow>
            </form>
        );
    }

}

export default Register;