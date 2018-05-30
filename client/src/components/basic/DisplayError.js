import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cleanError } from '../../actions';
import styled from 'react-emotion';

const Div = styled('div')`
    width: 100%;
    margin: 10px 0px;
    color: #FA2A38;
    i {
        margin-right: 5px;
    }
`;

class DisplayError extends Component {

    componentWillUnmount() {
        this.props.cleanError();
    }

    render() {
        return (
            <Div>
                <i className="fas fa-exclamation-circle"></i>
                <span>{this.props.errorMsg}</span>
            </Div>
        );
    }
}

export default connect(null, { cleanError })(DisplayError);