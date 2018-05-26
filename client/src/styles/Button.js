import styled from 'react-emotion';

export const CustomButton = styled('button')({
    border: 'none',
    outline: 'none',
    borderRadius: '2px',
    cursor: 'pointer',
    }, (props) => ({
        ...props
    })
);

export const Button = styled('button')`
    width: 100%;
    padding: 10px;
    background-color: #5B9B66;
    color: #FFFFFF;
    border: none;
    border-radius: 2px;
    outline: none;
`;