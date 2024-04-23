import React, { useState } from 'react';

const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="form-group">
            <input
                className="form-control datainput"
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="Kata Sandi"
            />
            <span
                className="ion ion-eye toggle-password"
                onClick={togglePasswordVisibility}
                style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    right: 0,
                    width: '34px',
                    height: '24px',
                    textAlign: 'center',
                    paddingTop: '10px'
                }}
            ></span>
            <span className="form-control-feedback" style={{ display: 'none' }}></span>
            <span className="invalid-feedback" role="alert">
                <strong>Harap cek kata sandi</strong>
            </span>
        </div>
    );
};

export default PasswordInput;