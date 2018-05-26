import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hidePopupModal } from '../../../actions';
import Modal from './Modal';

class Modals extends Component {
    render() {
        const modals = this.props.modals.map((item, i) => <Modal item={item} key={i} onClose={(item) => this.props.dispatch(hidePopupModal(item))} />);
        return (
            <div>
                { modals }
            </div>
        );
    }
}

export default connect(null, { hidePopupModal })(Modals);