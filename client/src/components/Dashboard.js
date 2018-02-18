import React from 'react';
import styled, { css } from 'react-emotion';

//TODO: CSS GRID
const GridContainer = styled('div')({
    display: 'grid',
    gridGap: '10px',
    backgroundColor: 'purple',
    padding: '10px'
});

const GridItem = styled('div')({
    backgroundColor: 'pink',
    padding: '20px'
});

const item1 = css({
    gridColumn: '1 / span 2',
    gridRow: 2
});


const Dashboard = () => {
    return(
        <GridContainer>
            <GridItem className={item1}></GridItem>
        </GridContainer>
    );
}

export default Dashboard;