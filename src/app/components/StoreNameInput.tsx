import React from 'react';

const StoreInput = () => {
    return (
        <div className="form-group">
            <span id="required-storeName" className="error_message" style={{ display: 'none', color: 'red', fontSize: '12px' }}>
                *Harap diisi!
            </span>
            <input className="form-control datainput" type="text" name="storeName" id="storeName" placeholder="Nama Toko" />
        </div>
    );
};

export default StoreInput;