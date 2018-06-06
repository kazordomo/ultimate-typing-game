import React from 'react';
import { LineChart, Line, Tooltip } from 'recharts';

export default props => {
    if(!props.data.length)
        return '';
    return (
        <LineChart width={props.width} height={props.height} data={props.data}>
            <Tooltip/>
            <Line type="monotone" dataKey="wpm" stroke="#8884d8" />
        </LineChart>
    )
}

