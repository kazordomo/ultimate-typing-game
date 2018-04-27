import styled, { css } from 'react-emotion';

export default {
    GridContainer: styled('div')`
        display: grid;
        grid-template-areas: 'c c d d d d d'
                             'g g g g g g g'
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

    item1: css`
        grid-area: c;
        background-color: rgba(90,125,124, 0.7);
    `,

    item2: css`
        grid-area: d;
        background-color: rgba(218,223,247, 0.7);
        &: hover {
            background-color: rgba(218,223,247, 1); 
        }
    `,

    item3: css`
        grid-area: e;
        background-color: rgba(35,44,51, 0.7); 
        &: hover {
            background-color: rgba(35,44,51, 1); 
        }
    `,

    item4: css`
        grid-area: f;
        background-color: rgba(160,193,209, 0.7);
        &: hover {
            background-color: rgb(160,193,209, 1); 
        }
    `,

    item5: css`
        grid-area: g;
        background-color: rgba(181, 178, 194, 0.7);
        &: hover {
            background-color: rgba(181, 178, 194, 1); 
        }
    `
}