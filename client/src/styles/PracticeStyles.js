import styled, { css } from 'react-emotion';

export default {
    SideBarContainer: styled('div')`
        width: 300px;
        height: 100vh;
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 30px;
        background-color: #232C33;
        color: #FFFFFF;
        transition: all .3s cubic-bezier(0.600, -0.280, 0.735, 0.045);
        box-shadow: -8px -1px 14px -2px rgba(0,0,0,0.65);
    `,
    SubTitle: styled('h1')`
        color: #5A7D7C;
        font-size: 25px;
        text-align: center;
        letter-spacing: 1.2px;
    `,
    linkStyle: css`
        display: block;
        width: 80%;
        margin: 0 auto;
        background-color: #5B9B66;
        color: #FFFFFF;
        text-align: center;
        text-decoration: none;
        border-radius: 2px;
    `,
    ListWrapper: styled('div')`
        height: 40%;
        margin-bottom: 20px;
        overflow: auto;
    `,
    Close: styled('div')`
        color: #FFFFFF;
        font-size: 16px;
        cursor: pointer;
    `,
    Open: styled('div')`
        position: absolute;
        color: #FFFFFF;
        cursor: pointer;
        transition: all .3s cubic-bezier(0.600, -0.280, 0.735, 0.045);
        i {
            font-size: 20px;
            margin-right: 8px;
        }
    `,
    SetClock: styled('div')`
        position: relative;
        i {
            top: 25px;
            position: absolute;
        }
        input[type="number"] {
            width: 75px;
            padding: 10px 10px;
            background: transparent;
            border: none;
            outline: none;
            color: #EDF257;
            font-size: 30px;
            text-align: center;
            ::-webkit-inner-spin-button, 
            ::-webkit-outer-spin-button { 
                -webkit-appearance: none; 
                margin: 0; 
            }
        }
    `,
    GameSettingsWrapper: styled('div')`
        text-align: center;
    `,
}
