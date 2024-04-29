'use client'

import Image from 'next/image';
import { useEffect } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2';
import styles from "./page.module.css";
import cstyles from '/Users/josesdio/wish-good/mimin-io/public/plugin/assets/custom_style.css'
import ionstyle from '/Users/josesdio/next-html/next-html/public/plugin/minimallite/assets/vendor_components/Ionicons/css/ionicons.css'

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

    const LoginBtn =() => {
        
    }

    return (
        <>
<body className={`${styles['hold-transition']} ${cstyles['login-page']}`} style={{ background: 'url(plugin/assets/images/backgrounds/1.jpg) center center' }}>
<div className={`${styles.row} ${styles['h-100']} ${styles['d-flex']} ${styles['align-items-center']}`}>
    <div className={`${styles['col-lg-6']} ${styles['pr-0']} ${styles['d-sm-block']} ${styles['d-md-block']} ${styles['d-lg-block']}`}>
    <div className={`${styles['d-flex']} ${styles['flex-column']}`}>
        <div className={styles['loginannounce-left']}>
        <div className={styles['login-box']}>
            <div className={styles['login-logo']}>
            <a href="#">
                <img
                src="plugin/placeholders/companylogos/companylogo.png"
                alt="Mimin"
                width="250px"
                />
            </a>
            </div>
            {/* /.login-logo */}
            <div className={`${cstyles['login-box-header']} ${styles['px-20']} ${styles['pt-20']} ${styles['pb-10']} ${styles['text-center']}`}>
            <h3 className={styles['font-size-18']}>
                <b className={`${cstyles['color-cyan']} ${styles['font-weight-600']}`}>Masuk</b> ke akun Anda
            </h3>
            </div>
            {/* /.login-box-header */}
            <div className={`${cstyles['login-box-body']} ${styles['shadow-none']}`}>
            <form
                id="login-form"
                className={cstyles['form-element']}
                method="POST"
                action="/login'"
            >
                
                <div className={`${cstyles['form-group']} ${cstyles['has-feedback']}`}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={cstyles['form-control']}
                    placeholder="Email"
                    required
                    defaultValue="email lama"
                />
                <span className={`${ionstyle.ion} ${ionstyle['ion-email']} ${cstyles['form-control-feedback']}`}/>
                <span className={styles['invalid-feedback']} role="alert">
                    <strong>silahkan cek email</strong>
                </span>
                </div>
                <div className={`${cstyles['form-group']} ${cstyles['has-feedback']}`}>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className={cstyles['form-control']}
                    placeholder="Kata sandi"
                    required
                    defaultValue="password lama"
                />
                <span
                    className={`${ionstyle.ion} ${ionstyle['ion-eye']} toggle-password`}
                    onClick={togglePassword} // Gunakan event onClick untuk menangani toggle
                    style={{
                        cursor: "pointer",
                        position: "absolute",
                        bottom: 5,
                        right: 0,
                        width: 34,
                        height: 24,
                        textAlign: "center"
                    }}
                />
                <span
                    className={cstyles['form-control-feedback']}
                    style={{ display: "none" }}
                />
                <span className={styles['invalid-feedback']} role="alert">
                    <strong>silahkan cek kata sandi</strong>
                </span>
                </div>
                <div className={styles.row}>
                <div className={styles['col-6']}>
                    <div className={`${cstyles.checkbox} ${styles['text-link']}`}>
                    <input type="checkbox" id="basic_checkbox_1" />
                    <label className={styles['pl-25']} htmlFor="basic_checkbox_1">
                        Tetap masuk
                    </label>
                    </div>
                </div>
                  {/* /.col */}
                <div className={styles['col-6']}>
                    <div className={`${styles['fog-pwd']} ${styles['text-right']}`}>
                    <a
                        href="/forgetPassword"
                        className={styles['text-link']}
                    >
                        <i className={`${ionstyle.ion} ${ionstyle['ion-locked']} ${styles['pr-1']}`}/>
                        Lupa kata sandi?
                    </a>
                    <br />
                    </div>
                </div>
                  {/* /.col */}
                <div className={`${styles['col-12']} ${styles['text-center']}`}>
                    <input
                    type="button"
                    name="LOGIN"
                    className={`${cstyles.btn} btn-cyan ${cstyles['btn-block']} ${styles['margin-top-10']}`}
                    defaultValue="SELESAI"
                    data-id={5}
                    title="Lanjut"
                    onClick={LoginBtn}
                />
                    
                </div>
                  {/* /.col */}
                </div>
            </form>
              {/* /.social-auth-links */}
            <div className={`${styles['margin-top-30']} ${styles['text-center']}`}>
                <p>
                Belum punya akun?{" "}
                <a
                    href="./register"
                    className={`${styles['text-link']} ${cstyles['color-primary-red']} m-l-5`}
                >
                    Daftar
                </a>
                </p>
            </div>
            </div>
        </div>
          {/* /.login-box-body */}
        </div>
    </div>
    </div>
    <div className={`${styles['col-lg-6']} ${styles['pl-0']}`}>
    <div className={styles['loginannounce-right']}>
        <div
        id="carouselExampleIndicators"
        className={`${styles.carousel} slide`}
        data-ride="carousel"
        >
        <ol className={`${styles['carousel-indicators']} ${styles['align-text-buttom']}`}>
            <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className={styles.active}
            />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className={styles['carousel-inner']}>
            <div className={`${styles['carousel-item']} ${styles.active}`}>
            <img
                className={`${styles['d-block']} ${styles['w-100']}`}
                src="plugin/assets/images/image-placeholders/background.jpg"
                alt="First slide"
            />
            </div>
            <div className={styles['carousel-item']}>
            <img
                className={`${styles['d-block']} ${styles['w-100']}`}
                src="plugin/assets/images/image-placeholders/background2.jpg"
                alt="Second slide"
            />
            </div>
            <div className={styles['carousel-item']}>
            <img
                className={`${styles['d-block']} ${styles['w-100']}`}
                src="plugin/assets/images/image-placeholders/background3.jpg"
                alt="Third slide"
            />
            </div>
        </div>
        </div>
        </div>
    </div>
    </div>
    </body>
</>

    );
};

export default Login;