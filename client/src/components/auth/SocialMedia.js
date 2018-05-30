import React from 'react';
import styled from 'react-emotion';

const Section = styled('div')`
    margin-top: 40px;
`;

const SubTitle = styled('div')`
    color: #B5B2C2;
    text-align: center;
    // font-size: 20px;
`;

const Ahref = styled('a')`
    margin: 0 auto;
    text-decoration: none;
    i {
        color: #B5B2C2;
        font-size: 40px;
    }
`;

const SocialMediaWrapper = styled('div')`
    width: 40%;
    margin: 0 auto;
`;

const Icons = styled('div')`
    display: flex;
    // justify-content: space-around;
    margin-top: 20px;
`;

const SocialMedia = () => {
    return (
        <Section>
            <SubTitle>Social Media Login</SubTitle>
            <SocialMediaWrapper>
                <Icons>
                    <Ahref href='/auth/facebook'><i className='fab fa-facebook-square'></i></Ahref>
                    <Ahref href='/auth/google'><i className='fab fa-google-plus-square'></i></Ahref>
                </Icons>
            </SocialMediaWrapper>
        </Section>
    );
};

export default SocialMedia;