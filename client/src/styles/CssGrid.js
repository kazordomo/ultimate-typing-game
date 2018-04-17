import styled, { css } from 'react-emotion';

export default {
    GridContainer: styled('div')`
        display: grid;
        grid-template-areas: 'c c d d d d d'
                             'e e e e f f f';
        grid-auto-rows: minmax(25vh, auto);
        grid-gap: 5px;
        padding: 5px;
    `,

    GridItem: styled('div')`
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color: rgba(26, 27, 28, 0.6);
        border-radius: 4px;
        transition: background-color ease-in-out .2s;
    `,

    item3: css`
        grid-area: c;
        background-color: rgba(90,125,124, 0.7);
    `,

    item4: css`
        grid-area: d;
        background-color: rgba(218,223,247, 0.7);
        &: hover {
            background-color: rgba(218,223,247, 1); 
        }
    `,

    item5: css`
        grid-area: e;
        background-color: rgba(35,44,51, 0.7); 
        &: hover {
            background-color: rgba(35,44,51, 1); 
        }
    `,

    item6: css`
        grid-area: f;
        background-color: rgba(160,193,209, 0.7);
        &: hover {
            background-color: rgb(160,193,209, 1); 
        }
    `,

    item7: css`
        display: grid;
        grid-template-columns: 1fr;
        // grid-gap: 40px;
        align-items: center;
    `
}