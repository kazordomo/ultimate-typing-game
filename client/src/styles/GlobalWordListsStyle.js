import styled, { css } from 'react-emotion';

export default {
    linkStyle: css`
        float: right;
        color: #FFFFFF;
        text-decoration: none;
        i {
            margin-left: 10px;
        }
    `,
    textInputStyle: css`
        border: none;
        outline: none;
        background-color: transparent; 
        padding: 0px 10px;
        color: #FFFFFF;
    `,
    ClearFix: styled('div')`
        ::after {
            content: "";
            clear: both;
            display: table;
        }
    `,
    SortFilter: styled('div')`
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 30px 0px;
        border-bottom: 1px solid #5A7D7C;
    `,
    SortButton: styled('button')`
        width: 150px;
        margin: 2px 1px;
        outline: none;
        border: none;
        background-color: ${props => props.active ?
            'rgba(91, 155, 102, 1)' : 
            'rgba(91, 155, 102, 0.1)'
        };
        color: #FFFFFF;
        cursor: pointer;
    `,
    I: styled('i')`
        color: #5A7D7C;
    `,
    ListInnerContainer: styled('div')`
        display: grid;
        grid-gap: 10px;
        grid-template: repeat(8, 1fr) / repeat(3, 1fr);
        grid-auto-flow: row;
    `,
}