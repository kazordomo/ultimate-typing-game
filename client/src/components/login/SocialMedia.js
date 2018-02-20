import React from 'react';
import styled from 'react-emotion';

const Section = styled('div')`
    margin-bottom: 40px;
`;

const Ahref = styled('a')`
    display: block;
    width: 100%;
    color: #20C20E;
    font-size: 30px;
    text-decoration: none;
`;

const BrandIcon = styled('i')`
    margin-right: 10px;
    font-size: 35px;
`;


const SocialMedia = () => {
    return (
        <Section>
            <div>
                <Ahref href='/auth/google'><BrandIcon className='fab fa-google-plus-square'></BrandIcon>Login With Google</Ahref>
            </div>
            <div>
                <Ahref href='/auth/facebook'><BrandIcon className='fab fa-facebook-square'></BrandIcon>Login Wih Facebook</Ahref>
            </div>
        </Section>
    );
};

export default SocialMedia;