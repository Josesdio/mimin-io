"use client"

import React, { useState } from 'react';

const PhoneInput = () => {
    const [value, setValue] = useState('');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        setValue(newValue);
    };

    return (
        <input type="text" name="phone" id="phone" className="form-input datainput" placeholder="Nomor Telepon" value={value} onChange={handleInput} />
    );
};

export default PhoneInput;