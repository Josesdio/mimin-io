'use client'

import Image from 'next/image';
import { useEffect } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2';
import styles from '@/app/public/plugin/assets/custom_style.module.css';
import styles2 from '@/app/styles/bootstrapgrid.module.css'

// Gunakan variabel imageUrl dengan path relatif atau URL untuk gambar logo
const imageUrl = "/src/app/public/plugin/placeholders/companylogos/companylogo.png";

const Login = () => {

    // Fungsi untuk menampilkan pesan error saat login gagal
    useEffect(() => {
        // Periksa jika terdapat pesan error dari session (misalnya dari backend)
        const errors = sessionStorage.getItem('errors');
        if (errors) {
            Swal.fire({
                icon: 'error',
                title: 'Login Gagal',
                text: errors,
            });
            $('.invalid-feedback').show(); // Tampilkan pesan error pada halaman
            sessionStorage.removeItem('errors'); // Hapus pesan error dari session
        }
    }, []); // Menjalankan hanya sekali setelah render pertama

    // Fungsi untuk menampilkan atau menyembunyikan password
    const togglePassword = () => {
        const passwordInput = $('#password'); // Pilih elemen input kata sandi
        const icon = $('.toggle-password'); // Pilih elemen ikon mata

        // Toggle antara tipe password dan teks
        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            icon.removeClass('ion-eye').addClass('ion-eye-disabled'); // Ganti ikon ke mata terbuka
        } else {
            passwordInput.attr('type', 'password');
            icon.removeClass('ion-eye-disabled').addClass('ion-eye'); // Ganti ikon ke mata tertutup
        }
    };

    return (
    <div className={`${styles['login-box-body']} ${styles['shadow-none']}`} style={{ background: "url(/src/app/plugin/assets/images/backgrounds/1.jpg)" }}>
    
        <div className={`${styles2.row} ${styles['h-100']} ${styles2['d-flex']}  ${styles2['align-items-center']}`}>
            <div className={`${styles2['col-lg-6']} ${styles2['pr-0']} ${styles2['d-sm-block']} ${styles2['d-md-block']} ${styles2['d-lg-block']}`}>
                <div className={`${styles2['d-flex']} ${styles2['flex-column']}`}>
                    <div className={styles['loginannounce-left']}>
                        <div className={styles['login-box']}>
                            <div className={styles['login-logo']}>
                            <Image src="/plugin/placeholders/companylogos/companylogo.png" alt="Mimin" width={250} height={250} />
                            </div>
                            <div className={`${styles['login-box-header']} ${styles2['px-20']} ${styles2['pt-20']} ${styles2['pb-10']} ${styles['text-center']}`}>
                                <h3 className={styles['font-size-18']}><b className={` ${styles['color-cyan']} ${styles['font-weight-600']}`}>Masuk</b> ke akun Anda</h3>
                            </div>
                            <div className={`${styles['login-box-body']} ${styles['shadow-none']}`}>
                                <form id="login-form" className={styles['form-element']} method="post" action="/login">
                                    
                                    <div className={` ${styles['form-group']} ${styles['has-feedback']}`}>
                                        
                                        <span className="ion ion-email form-control-feedback"></span>
                                        <span className="invalid-feedback" role="alert">
                                            <strong>silahkan cek email</strong>
                                        </span>
                                    </div>
                                    <div className={`${styles['form-group']} ${styles['has-feedback']}`}>
                                        <span className="ion ion-eye toggle-password" onClick={togglePassword} style={{ cursor: "pointer", position: "absolute", bottom: "5px", right: "0", width: "34px", height: "24px", textAlign: "center" }}></span>
                                        <span className="invalid-feedback" role="alert">
                                            <strong>silahkan cek kata sandi</strong>
                                        </span>
                                    </div>
                                    <div className={styles2.row}>
                                        <div className={styles2['col-6']}>
                                            <div className={`checkbox ${styles['text-link']}`}>
                                                <input type="checkbox" id="basic_checkbox_1" />
                                                <label className={styles['pl-25']} htmlFor="basic_checkbox_1">Tetap masuk</label>
                                            </div>
                                        </div>
                                        <div className={styles2['col-6']}>
                                            <div className={`${styles['fog-pwd']} ${styles['text-right']}`}>
                                                <a href="/forgot-password" className={styles['text-link']}><i className="ion ion-locked pr-1"></i> Lupa kata sandi?</a><br />
                                            </div>
                                        </div>
                                        <div className={`${styles2['col-12']} ${styles['text-center']}`}>
                                            <button type="submit" id="login" className={` ${styles.btn} ${styles['btn-cyan']} ${styles['btn-block']} ${styles['margin-top-10']}`} title="Login">LOGIN</button>
                                        </div>
                                    </div>
                                </form>
                                <div className={`${styles['margin-top-30']} ${styles['text-center']}`}>
                                    <p>Belum punya akun? <a href="/register" className={`${styles['text-link']} ${styles['color-primary-red']} ${styles['m-l-5']}`}>Daftar</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles2['col-lg-6']} ${styles2['pl-0']}`}>
                <div className={styles['loginannounce-right']}>
                    {/* Carousel untuk gambar latar belakang */}
                    <div id="carouselExampleIndicators" className={`${styles.carousel} ${styles.slide}`} data-ride={styles.carousel}>
                        <ol className={`${styles['carousel-indicators']} ${styles['align-text-bottom']}`}>
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className={styles.active}></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className={styles['carousel-inner']}>
                        <div className={`${styles['carousel-item']} ${styles.active}`}>
                    <img className={`${styles2['d-block']} ${styles['w-100']}`}
                        src="plugin/assets/images/image-placeholders/background.jpg"
                        alt="First slide" width={800} height={600}/>
                </div>
                <div className={`${styles['carousel-item']}  ${styles.active}`}>
                    <img className={`${styles2['d-block']} ${styles['w-100']}`}
                        src="/plugin/assets/images/image-placeholders/background2.jpg"
                        alt="Second slide" width={800} height={600}/>
                </div>
                <div className={`${styles['carousel-item']}  ${styles.active}`}>
                    <img className={`${styles2['d-block']} ${styles['w-100']}`}
                        src="/plugin/assets/images/image-placeholders/background3.jpg"
                        alt="Third slide" width={800} height={600}/>
                </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Login;