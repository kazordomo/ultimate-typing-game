import React from 'react';
import styled, { css } from 'react-emotion';

const loginAhref = css({
    display: 'block',
    width: '100%',
    color: '#000000',
    fontSize: '40px',
    border: '1px solid #FFFFFF',
    borderRadius: '4px',
    textDecoration: 'none'
});

const BrandIcon = styled('i')({
    marginRight: '10px',
    fontSize: '40px'
});


const SocialMedia = () => {
    return (
        <div>
            <div>
                <a href='/auth/google' className={loginAhref}><BrandIcon className='fab fa-google-plus-square'></BrandIcon>Login With Google</a>
            </div>
            <div>
                <a href='/auth/facebook' className={loginAhref}><BrandIcon className='fab fa-facebook-square'></BrandIcon>Login Wih Facebook</a>
            </div>
        </div>
    );
};

export default SocialMedia;