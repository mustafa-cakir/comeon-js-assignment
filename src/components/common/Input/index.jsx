import React from 'react';
import PropTypes from 'prop-types';
import './Style.scss';

const Input = ({ name, type, defaultValue, placeholder, required, disabled, icon }) => {
    return (
        <div className={`ui input ${icon ? 'icon' : ''}`}>
            <input
                type={type}
                name={name}
                defaultValue={defaultValue}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
            />
            {icon && <i className={`${icon} icon`} />}
        </div>
    );
};

Input.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
};

Input.defaultProps = {
    name: '',
    type: 'text',
    defaultValue: '',
    placeholder: '',
    required: false,
    disabled: false,
    icon: null,
};

export default Input;
