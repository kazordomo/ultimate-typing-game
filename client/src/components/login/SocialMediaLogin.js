import React from 'react';
import styled from 'react-emotion';

const Section = styled('div')`
    margin-bottom: 25px;
`;

const Ahref = styled('a')`
    width: 100%;
    margin: 0px 25px 0px 0px;
    color: #20C20E;
    text-decoration: none;
    i {
        font-size: 60px;
    }
`;

const SocialMedia = () => {
    return (
        <Section>
            <Ahref href='/auth/google'><i className="fab fa-google-plus-square"></i></Ahref>
            <Ahref href='/auth/facebook'><i className="fab fa-facebook"></i></Ahref>
        </Section>
    );
};

export default SocialMedia;