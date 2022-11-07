import React from 'react';
import './Select.scss';

const Select = ({ className, value, setValue, options }) => {
    return (
        <div className={`select ${className}`}>
            {options.map((option, i) => (
                <button
                    key={i}
                    className={(option === value) ? 'active' : ''}
                    onClick={() => setValue(option)}
                >{option}</button>
            ))}
        </div>
    );
};

export default Select;