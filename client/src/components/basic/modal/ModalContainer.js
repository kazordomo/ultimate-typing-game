import React from 'react';
import { connect } from 'react-redux';
import Modals from './Modals';

const ModalContainer = connect(
    function mapStateToProps({ popup }) {
        return {
            modals: popup.modals
        };
    },
    function mapDispatchToProps(dispatch) {
        return {
            dispatch
        }
    }
)(Modals);

export default ModalContainer;