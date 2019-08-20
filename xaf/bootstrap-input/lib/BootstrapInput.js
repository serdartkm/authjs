import React from 'react'
import classNames from 'classnames'
const CustomInput = ({ type, placeholder, name, validation, onChange, value, label }) => {
    return (
     <div className="form-group">
        <label forhtml="password">{label}: </label>
        <input className={classNames('form-control', { 'is-invalid': !validation.isValid })} onChange={onChange} value={value} name={name} type={type} placeholder={placeholder} />
        <div className="invalid-feedback">
            {validation.message}</div>
    </div>)
}

export default CustomInput