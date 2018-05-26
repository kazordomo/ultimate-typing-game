import styled from 'react-emotion';
import Row from './Row';

export default {
    I: styled('div')`
        color: #5A7D7C;
    `,
    TextInput: styled('div')`
        display: flex;
        margin-top: 20px;
        align-items: baseline;
        border-bottom: 1px solid #5A7D7C;
    `,
    FlexItemLong: styled('div')`
        font-size: 25px;
        flex-basis: 90%;
    `,
    FlexItemShort: styled('div')`
        flex-basis: 10%;
    `,
    Row,
    FlexRow: styled('div')`
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    `,
    FlexRowItem: styled('div')`
        padding: ${ props => props.white ? '0px 5px' : '0px' };
        color: ${props => props.white ? '#FFFFFF' : '#5A7D7C'};
        border-bottom: ${props => props.white ? '2px solid #FFFFFF' : 'none'};
        cursor: pointer;
    `,
};