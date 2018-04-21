import React, { Component } from 'react';
import AuthField from './AuthField';
import Button from '../../styles/Button';
import AuthStyles from '../../styles/AuthStyles';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { username: '', password: '' };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleLogin(e) {
        e.preventDefault();
        const { username, password} = this.state;
        this.props._onSubmit('login', { username, password });
    }

    render() {
        const { I, TextInput, FlexItemLong, FlexItemShort, FlexRow, FlexRowItem, Row } = AuthStyles;
        return(
            <form onSubmit={this.handleLogin} >
                <TextInput>
                    <FlexItemShort>
                        <I className='fas fa-user'></I>
                    </FlexItemShort>
                    <FlexItemLong>
                        <AuthField 
                            autoFocus 
                            type='text' 
                            label='Username' 
                            name='username' 
                            value={this.state.username}
                            onChange={this.handleInputChange} />
                    </FlexItemLong>
                </TextInput>
                <TextInput>
                    <FlexItemShort><I className='fas fa-unlock-alt'></I></FlexItemShort>
                    <FlexItemLong>
                        <AuthField 
                            type='password' 
                            label='Password' 
                            name='password' 
                            value={this.state.password}
                            onChange={this.handleInputChange} />
                    </FlexItemLong>
                </TextInput>
                <Row>
                    <Button auth type='submit'>Login</Button>
                </Row>
                <FlexRow>
                    <FlexRowItem white onClick={this.props.getRegister()}>Create Account</FlexRowItem>
                    {/* <FlexRowItem>Forgot Password</FlexRowItem> */}
                </FlexRow>
            </form>
        );
    }
}

export default Login;