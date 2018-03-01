import styled, { css } from 'react-emotion';

export default {
    GridContainer: styled('div')`
        display: grid;
        grid-template-areas: 'a a a b'
                             'c c d d'
                             'e e e f';
        grid-auto-rows: minmax(30vh, auto);
        grid-gap: 5px;
        padding: 5px;
    `,

    GridItem: styled('div')`
        background-color: rgba(26, 27, 28, 0.6);
        padding: 20px;
        border-radius: 4px;
    `,

    item1: css`
        grid-area: a;
        background-color: rgba(26, 27, 28, 0.9);
    `,

    item2: css`
        grid-area: b;
    `,

    item3: css`
        grid-area: c;
        background-color: rgba(26, 27, 28, 0.9);    
    `,

    item4: css`
        grid-area: d;
    `,

    item5: css`
        grid-area: e;
        background-color: rgba(26, 27, 28, 0.9); 
    `,

    item6: css`
        grid-area: f;
    `,

    item7: css`
        display: grid;
        grid-template-columns: 1fr;
        // grid-gap: 40px;
        align-items: center;
    `
}