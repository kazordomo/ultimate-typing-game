import { css } from 'react-emotion';

export default css`
    font-size: 18px;
    appearance: none;
    width: 3.5em;
    height: 1.5em;
    background-color: #A3A2A2;
    position: relative;
    cursor: pointer;
    outline: none;
    border-radius: 2px;
    transition: all .2s ease-in-out;

    :checked{
        background-color: #A0C1D1;
    }

    :after{
        position: absolute;
        content: "";
        width: 1.5em;
        height: 1.5em;
        background: #fff;
        box-shadow: 0 0 .25em rgba(0,0,0,.3);
        transform: scale(.7);
        left: 0;
        border-radius: 2px;
        transition: all .2s ease-in-out;
    }

    :checked:after{
        left: calc(100% - 1.5em);
    }

    :after{
        position: absolute;
        content: "";
        width: 1.5em;
        height: 1.5em;
        background: #fff;
        box-shadow: 0 0 .25em rgba(0,0,0,.3);
        transform: scale(.7);
        left: 0;
        -webkit-transition: all .2s ease-in-out;
        transition: all .2s ease-in-out;
    }

    :checked:after{
        left: calc(100% - 1.5em);
    }
`;