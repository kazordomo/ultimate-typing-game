import React, { Component } from 'react';

const Login = () => {
    return(
        <div>
            <div>
                <a href="/auth/google"><i class="fab fa-google-plus-square"></i>LOGIN WITH GOOGLE</a>
            </div>
            <div>
                <a href='/auth/facebook'><i class="fab fa-facebook-square"></i>LOGIN WITH FACEBOOK</a>
            </div>
        </div>
    );
}

export default Login;