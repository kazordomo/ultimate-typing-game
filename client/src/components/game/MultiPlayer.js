import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Versus extends Component {
    render() {
        return(
            <div>
                <Link to='/dashboard'>Back to Dashboard</Link>
            </div>
        );
    }
}

export default Versus;