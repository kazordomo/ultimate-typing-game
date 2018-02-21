import React from 'react';
import styled from 'react-emotion';

const Section = styled('div')`
    margin-bottom: 60px;
`;

const Ahref = styled('a')`
    display: block;
    width: 100%;
    margin-bottom: 25px;
    color: #20C20E;
    text-decoration: none;
`;

const SocialMedia = () => {
    return (
        <Section>
            <div>
                <Ahref href='/auth/google'>Login With Google</Ahref>
            </div>
            <div>
                <Ahref href='/auth/facebook'>Login Wih Facebook</Ahref>
            </div>
        </Section>
    );
};

export default SocialMedia;