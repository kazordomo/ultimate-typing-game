import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './star.css';

export default class Star extends Component {
  render() {
    let nameMap = {
      isDisabled: 'is-disabled',
      isActive: 'is-active',
      isActiveHalf: 'is-active-half',
      willBeActive: 'will-be-active'
    }
    let className = Object.keys(nameMap)
                          .filter(prop => this.props[prop])
                          .map(prop => nameMap[prop])
                          .join(' ')
    return ( 
            <div style={{ fontSize: this.props.active ? '30px' : '18px'}}
                 className={`rater-star ${className}`}>★
            </div>
    );
  }
}

Star.defaultProps = {
  willBeActive: false,
  isActive: false,
  isActiveHalf: false,
  isDisabled: false
}

Star.propTypes = {
  isActive: PropTypes.bool,
  isActiveHalf: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool
}