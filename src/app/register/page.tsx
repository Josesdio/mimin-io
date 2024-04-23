'use client'

import styles from '/public/css/register.module.css';
import React from 'react';
import RegisterLayout from '../layouts/auth/register';
import Image from 'next/image';
import PhoneInput from '../components/PhoneInput';
import PasswordInput from '../components/PasswordInput';
import PasswordConfirmationInput from '../components/PasswordConfirmationInput';
import StoreInput from '../components/StoreNameInput';
import styles2 from '/public/plugin/bootstrap-4.3.1/css/bootstrap-grid.module.css'
import styles3 from '/public/plugin/assets/custom.module.css'
const RegisterPage = () => {

    return (    
        <body style={{ background: 'url(plugin/assets/images/backgrounds/1.jpg) center center' }}>
            
            <div className={styles2['container-fluid']}>
                <div className={styles2.row}>
                    <div className= {`${styles2['col-11']} ${styles2['col-sm-9']} ${styles2['col-md-7']} ${styles2['col-lg-6']} ${styles2['col-xl-5']}`}>
                        <div className={styles['register-box']}>
                            <div className={styles['register-box-header']}>
                                <a href="#">
                                    <Image src="/plugin/placeholders/companylogos/companylogo.png" alt="Mimin" width={250} height={250} />
                                </a>
                                <h3 className={`${styles['font-size-18']} ${styles['pb-5']}`}><b className={`${styles['color-cyan']} font-weight-600`}>Daftar</b> sebagai member baru</h3>
                            </div>
                            <div className= {styles['register-box-body']}>
                                <form id={styles.msform} className={styles['form-element']}>  
                                    <ul id={styles.progressbar} className={styles2['pb-5']}>
                                        <li className={styles.active} id={styles.satu}><strong>Step 1</strong></li>
                                        <li id={styles.dua}><strong>Step 2</strong></li>
                                        <li id={styles.tiga}><strong>Step 3</strong></li>
                                        <li id={styles.empat}><strong>Step 4</strong></li>
                                    </ul>
                                    <div className={styles.formstyle}>
                                        <fieldset>
                                            <div className={styles['form-card']}>
                                                <div className={`${styles['row-md-3']} ${styles['text-center']}`}>
                                                    <span id={styles['required-name']} className='error_message' style={{display:'none', color: 'red', fontSize:'12px'}}> *Harus diisi !</span>
                                                    <input type="text" name="name" placeholder="Nama" id="name" className="form-input datainput" />
                                                </div>
                                                <div className={styles['row-md-6']}>
                                                    <span id={styles['required-email']} className='error_message' style={{display:'none', color:'red', fontSize:'12px'}}>*Harus diisi !</span>
                                                    <input type="email" name="email" placeholder="Email" id="email" className={`${styles['form-input']} ${styles['datainput']}`} />
                                                </div>
                                                <div className={styles['row-md-6']}>
                                                    <span id='required-phone' className='error_message' style={{display:'none', color:'red', fontSize:'12px'}}>*Harus diisi !</span>
                                                    <PhoneInput />
                                                </div>
                                                <div className={`${styles['row-md-6']}${styles['text-center']}`}>
                                                    <div className={styles['text-link']}>
                                                        <label style={{ fontSize: '70%' }}> Dengan mendaftar, Anda menyetujui
                                                        <a className={`${styles['text-link']} ${styles['color-cyan']}`} href="https://www.mimin.io/utility-pages/terms-conditions"><b> Ketentuan & Kebijakan Privasi</b></a> kami.
                                                    </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" name="next" className={`${styles['box-btn-next']} ${styles['action-button']} ${styles['pt-1']}`} value="LANJUT" data-id="1" title="Lanjut" />
                                        </fieldset>

                                        <fieldset>
                                            <div className={styles['form-card']}>
                                                <div className={`${styles.fieldtitle} ${styles2['row-md-6']} ${styles['pb-5']}`} style={{textAlign: 'center'}}>
                                                <label className={styles2['mb-5']} style={{fontWeight: 500, fontSize: '120%'}}>Aktivasi Akun</label>
                                                </div>
                                                <div className={`${styles2['row-md-6']} ${styles['text-center']}`}>
                                                <input type="radio" value="whatsapp" name="radiobtn" placeholder="" id="send-phone" style={{width: '15px', marginBottom: '5px'}} checked />
                                                <label>Kirim kode via Whatsapp : </label>
                                                <p style={{paddingLeft: '45px', marginBottom: '5px'}} id="data-phone"></p>
                                                <p style={{paddingLeft: '45px', fontSize: '80%'}}><i>(By continuing you will receive a one-time verification code to your phone number by SMS. Message and data rates may apply)</i></p>
                                                </div>
                                            </div>
                                            <button type="button" name="next" className={`${styles['next']} ${styles['action-button']}`} value="LANJUT" data-id="2" id="button-otp" title="Lanjut" />
                                            <input type="button" name="previous" className={`${styles['previous']} ${styles['action-button-previous']}`} value="KEMBALI" title="Kembali" />
                                        </fieldset>

                                        <fieldset>
                                            <div className={styles['form-card']}>
                                                <div className={`${styles['fieldtitle']} ${styles2['row-md-6']}`} style={{textAlign: 'center'}}>
                                                    <label className={styles['pl-25']} style={{fontWeight: 500, fontSize: '120%'}}>Kode OTP sudah dikirimi!</label>
                                                </div>
                                                <div className={styles['row-md-6']}>
                                                    <input type="text" name="otp" id="otp" className="form-control datainput" placeholder="Kode OTP" />
                                                </div>
                                                <div className={`${styles2['row-md-6']} ${styles['text-center']}`}>
                                                    <div className={styles['text-link']}>
                                                        <label className="pl-25 center" style={{fontSize: '90%'}}> Tidak menerima kode?
                                                            <a className= {`${styles['text-link']} ${styles['color-cyan']} ${styles['resend-otp']}`} href='#' id='resend-passcode'>
                                                                <b id='click-here'>Klik disini</b>
                                                            </a>
                                                        untuk mengirim kode lagi</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="button" name='next' className={`${styles['next']} ${styles['action-button']}`}value="LANJUT" data-id='3' title="Lanjut" />
                                            <input type="button" name="previous" className="previous action-button-previous" value="KEMBALI" title="Kembali" />
                                        </fieldset>
                                        <fieldset>
                                            <div className={styles.formCard}>
                                                <div className={`${styles.fieldtitle} row-md-12`} style={{textAlign: 'center'}}>
                                                    <label className='pl-25' style={{fontWeight: 500, fontSize: '120%'}}>Buat kata sandi baru</label>
                                                </div>
                                                <div className='row-md-6'>
                                                    
                                                    <PasswordInput/>
                                                </div>
                                            
                                            <div className='row-md-6'>
                                                <PasswordConfirmationInput/>
                                            </div>
                                        </div>
                                        <input type="button" name="next" className={`next ${styles.actionButton}`} value="LANJUT"data-id="4" title="Lanjut" />
                                        <input type="button" name="previous" className={`previous ${styles.actionButtonPrevious}`} value="KEMBALI " title="Kembali" />
                                        </fieldset>

                                        <fieldset>
                                            <div className={styles.formCard}>
                                                <div className={`${styles.fieldtitle}row-md-6`} style={{textAlign: 'center'}}>
                                                    <label className="pl-25" style={{fontWeight: 500, fontSize: '120%'}}>Buat profil toko Anda</label>
                                                </div>
                                                <div className='row-md-6'>
                                                    <label className="pl-25" style={{fontWeight: 500, fontSize: '120%'}}>Unggah logo toko :</label>
                                                    <input type="file" name="image" id="image" accept='image/*'/>
                                                    <div className='row-md-6'>
                                                        <StoreInput/>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="button" name="submit" className={`next ${styles.actionButton}`} value="SELESAI"data-id="5" title="Lanjut" />
                                            <input type="button" name="previous" className={`previous ${styles.actionButtonPrevious}`} value="KEMBALI " title="Kembali" />
                                        </fieldset>
                                    </div>
                                </form>

                                <div className={styles.tulisan}>
                                    <p style={{fontSize: '14px'}}>Anda sudah punya akun? <a href="/login" className={`${styles.textLink} ${styles['color-primary-red']}`}>Login</a></p>
                                </div>  
                            </div>
                        </div> 
                    </div>
                </div>
                <div className="social-auth-links text-center">
                <div className="g-signin2" data-width="auto" data-height="42" data-longtitle="true" data-onsuccess="onSignIn"data-theme="dark"></div>
        </div>
            </div>
            <RegisterLayout />
        </body>
    );
};

export default RegisterPage;
