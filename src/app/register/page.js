'use client'

import Image from "next/image";
import styles from "./page.module.css";
import ionstyle from '../../../public/plugin/minimallite/assets/vendor_components/Ionicons/css/ionicons.css'
import { useEffect, useState } from "react";
import $ from "jquery";
import Swal from "sweetalert2";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    referral: ''
  });

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormData({ ...formData, email: newEmail });
  };
  
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setFormData({ ...formData, name: newName });
  };
  

  // Fungsi untuk menangani perubahan nilai pada input nomor telepon
  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setFormData({ ...formData, phone: newPhone });
  };

  
  const handleNextClick = async (element) => {
    const { name, email, phone, referral} = formData;

    // Validasi form
    if (!name || !email || !phone) {
      console.log('namaku');
      alert('Semua input harus diisi');
      return;
    }

    try {
      // Kirim data pendaftaran
      const response = await fetch('https://liveapi.mimin.io/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ name, email, phone, referral })
      });
      if (!response.ok) {
        throw new Error('Gagal mendaftar');
      }
      const data = await response.json();
      console.log('Response: ', data);
      // Kirim permintaan OTP ke email
      const otpResponse = await fetch(`https://liveapi.mimin.io/api/v1/auth/otp-email/${data.token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      });
      if (!otpResponse.ok) {
        throw new Error('Gagal mengirimkan OTP ke email');
      }
      const otpData = await otpResponse.json();
      console.log('OTP Response: ', otpData);
      // Update langkah saat ini
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal mendaftar, coba lagi nanti');
    }
    console.log('dah klik!!!!');
    // Animasi perpindahan langkah
    let current_fs = $(element).parent();
    let next_fs = $(element).parent().next();
    let id = $(element).data('id');
    if (id === 1) {
      $('.form-input').each(function () {
        if ($(this).val() === '') {
          $('#required-' + $(this).attr('id')).show();
        } else {
          if ($(this).attr('id') === 'name') {
            var inputResult = /^[a-zA-Z0-9- ]*$/.test($(this).val());
            if (inputResult) {
              $('#required-' + $(this).attr('id')).hide();
            } else {
              $('#required-' + $(this).attr('id')).html('Mohon Untuk Tidak Menggunakan Karakter');
              $('#required-' + $(this).attr('id')).show();
            }
          } else {
            $('#required-' + $(this).attr('id')).hide();
          }
        }
      });
      if (!$('.error_message').is(':visible')) {
        Swal.fire({
          title: 'Memeriksa...',
          text: 'Harap menunggu...',
          imageUrl: '/waiting.gif',
          showConfirmButton: false,
          allowOutsideClick: false,
        });
        let datas = {
          name: $('#name').val(),
          email: $('#email').val(),
          phone: $('#phone').val(),
          referral: ''
        };
        
        
      }
    } else if (id === 2) {
      let otpType = $("input[name='radiobtn']:checked").val();
      let token = $("#button-otp").data('token');
      if (otpType === 'email') {
        Swal.fire({
          title: 'Memeriksa...',
          text: 'Harap menunggu',
          imageUrl: '/waiting.gif',
          showConfirmButton: false,
          allowOutsideClick: false
        });
        let datas={}
        datas.password = $('#password').val();
        $ajax({
          url: "api/auth/new-password/"+token,
          type: "post",
          data: JSON.stringify(datas),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          async:false,
          success: function(response){
            Swal.close();
            $('#empat').addClass('active');
            next_fs.show();
            current_fs.show({
              opacity: 0
            },{
              step: function(now){
                opacity = 1 - now;
                current_fs.css({
                  'display': 'none',
                  'position': 'relative'
                });
                next_fs.css({
                  'opacity': opacity
                });
              },
              duration: 500
            })
          },
          error: function(errors){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errors.responseJSON.message,
            })
        }
        })
      }
    }else if(id === 5){
      if($('#storeName').val() == ''){
        $('#required-storeName').show();
    }else{
        $('#required-storeName').hide();
    }
    if (!$('.error_message').is(':visible')) {
      Swal.fire({
        title: 'Memeriksa...',
        text: 'Harap menunggu...',
        imageUrl: '/waiting.gif',
        showConfirmButton: false,
        allowOutsideClick: false,
      })
      let token = $('#button-otp').data('token');
      let datas = {}
      var fileLength = $('#image').val().length;
      var reader = new FileReader();
      var f = document.getElementById('image').files;
      if (fileLength > 0) {
        reader.onloadend = function () {
          var result = reader.result.replace(/^data:.+;base64,/, "");
          var filename = $('#image').val().split('\\').pop();
          datas.foto.toko = result;
          datas.nama_toko = $('#storeName').val();
          datas.referral = $('#code_referral').val();
          insertAccount(datas, token);
        }
        reader.readAsDataURL(f[0]);
      }else{
        datas.foto.toko = "";
        datas.nama_toko = $('#storeName').val();
        datas.referral = $('#code_referral').val();
        insertAccount(datas, token);
      }
    }
    }
  };
function insertAccount(datas, token) {
  $.ajax({
    url: "api/auth/auth-account/"+token,
    type: "POST",
    data: JSON.stringify(datas),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    async: false,
    success: function (response) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errors.responseJSON.message,
      });
    }
  })
}

const handlePreviousClick = () => {
  let current_fs = $(this).parent();
  let previous_fs = $(this).parent().prev();
  $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
  previous_fs.show();
  current_fs.animate({
    opacity: 0
  },{
    step: function (now) {
      // for making fielset appear animation
      opacity = 1 - now;
      current_fs.css({
          'display': 'none',
          'position': 'relative'
      });
      previous_fs.css({
          'opacity': opacity
      });
  },
  duration: 500
  })
  setCurrentStep(currentStep - 1);
};
const ResendPasscode =({otpType, token, urlApi}) => {
  const [timeleft, setTimeLeft] = useState(30);

  const countdown = () => {
    if (timeleft === -1) {
      clearInterval(timerId);
    }else {
      setTimeLeft((prevTime) => prevTime - 1)
    }
  }

  const handleResendClick = () => {
    Swal.fire({
      title: 'Memeriksa...',
      text: 'Harap menunggu',
      imageUrl: '/waiting.gif',
      showConfirmButton: false,
      allowOutsideClick: false
    })
    $.ajax({
      url: `api/auth/otp-${otpType}/${token}`,
      type: "GET",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      async: false,
      success: function (response) {
        Swal.close();
      },
      error: function (errors) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errors.responseJSON.message,
        });
      }
    })
  }
  useEffect(() => {
    const timerId = setInterval(countdown, 1000);
    return () => {
      clearInterval(timerId);
    }
  },[])
}

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
        <>
  <body style={{ background: 'url(plugin/assets/images/backgrounds/1.jpg) center center' }}>
  <div className={styles['container-fluid']}>
    <div className={styles.row}>
      <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5">
        <div className={styles['register-box']}>
          <div className={styles['register-box-header']}>
            <a href="index.js">
              <img
                src='/plugin/placeholders/companylogos/companylogo.png'
                alt="Mimin"
                width='50%'
                className={styles.center}
              />
            </a>
            <h3 className={`${styles['font-size-18']} pb-5`}>
              <b className={`font-weight-600 ${styles['color-cyan']}`}>Daftar</b> sebagai
              member baru
            </h3>
          </div>
          <div className={styles['register-box-body']}>
            <form id={styles.msform} className={styles['form-element']}>
              <ul id={styles.progressbar} className='pb-5'>
                <li className={styles.active} id={styles.satu}>
                  <strong>Step 1</strong>
                </li>
                <li id={styles.dua}>
                  <strong>Step 2</strong>
                </li>
                <li id={styles.tiga}>
                  <strong>Step 3</strong>
                </li>
                <li id={styles.empat}>
                  <strong>Step 4</strong>
                </li>
              </ul>
              <div className={styles.formstyle}>
                <fieldset style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                  <div className={styles['form-card']}>
                    <div className={`row-md-3 ${styles['text-center']}`}>
                      <span
                        id="required-name"
                        className="error_message"
                        style={{ display: "none", color: "red", fontSize: 12 }}
                      >
                        *Harus diisi !
                      </span>
                      <input
                        type="text"
                        value={formData.name}
                        onChange = {handleNameChange}
                        placeholder="Nama"
                        id="name"
                        className="form-input datainput"
                      />
                    </div>
                    <div className="row-md-6">
                      <span
                        id="required-email"
                        className="error_message"
                        style={{ display: "none", color: "red", fontSize: 12 }}
                      >
                        *Harus diisi !
                      </span>
                      <input
                        type="text"
                        value={formData.email}
                        onChange = {handleEmailChange}
                        placeholder="Email"
                        id="email"
                        className="form-input datainput"
                      />
                    </div>
                    <div className="row-md-6">
                      <span
                        id="required-phone"
                        className="error_message"
                        style={{ display: "none", color: "red", fontSize: 12 }}
                      >
                        *Harus diisi !
                      </span>
                      <input
                      type="text"
                      id="phone"
                      value={formData.phone}
                      className="form-input datainput"
                      placeholder="Nomor Telepon"
                      onChange={handlePhoneChange}
                      />
                    </div>
                    <div className='row-md-6 '> 
                      <div className={styles['text-link']}>
                        <label className='pl-25' htmlFor="basic_checkbox_1" style={{ fontSize: "70%" }}>
                          {" "}
                          Dengan mendaftar, Anda menyetujui
                          <a
                            className={`${styles['text-link']} ${styles['color-cyan']}`}
                            href="https://www.mimin.io/utility-pages/terms-conditions"
                          >
                            <b> Ketentuan & Kebijakan Privasi</b>
                          </a>{" "}
                          kami.
                        </label>
                      </div>
                    </div>
                  </div>
                  <input
                    type="button"
                    name="next"
                    className={`next ${styles['action-button']} pt-1`}
                    defaultValue="LANJUT"
                    data-id={1}
                    title="Lanjut"
                    onClick={handleNextClick}
                    
                  />
                </fieldset>
                <fieldset style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                  <div className={styles['form-card']}>
                    <div
                      className={`${styles.fieldtitle} row-md-6 ${styles['pb-5']}`}
                      style={{ textAlign: "center" }}
                    >
                      <label
                        className={styles['mb-5']}
                        style={{ fontWeight: 500, fontSize: "120%" }}
                      >
                        Aktivasi Akun
                      </label>
                    </div>
                    <div className="row-md-6">
                      <input
                        type="radio"
                        defaultValue="whatsapp"
                        name="radiobtn"
                        placeholder=""
                        id="send-phone"
                        style={{ width: 15, marginBottom: 5 }}
                        defaultChecked=""
                      />
                      <label>Kirim kode via Whatsapp : </label>
                      <p
                        style={{ paddingLeft: 45, marginBottom: 5 }}
                        id="data-phone"
                      />
                      <p style={{ paddingLeft: 45, fontSize: "80%" }}>
                        <i>
                          (By continuing you will receive a one-time
                          verification code to your phone number by SMS. Message
                          and data rates may apply)
                        </i>
                      </p>
                    </div>
                  </div>
                </fieldset>
                <fieldset style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                  <div className={styles['form-card']}>
                    <div
                      className={`${styles.fieldtitle} row-md-6`}
                      style={{ textAlign: "center" }}
                    >
                      <label
                        className={styles['pl-25']}
                        style={{ fontWeight: 500, fontSize: "120%" }}
                      >
                        Kode OTP sudah dikirim!
                      </label>
                    </div>
                    <div className="row-md-6">
                      <input
                        className={`${styles['form-control']} datainput`}
                        type="text"
                        name="otp"
                        id="otp"
                        placeholder="Kode OTP"
                      />
                    </div>
                    <div className={`row-md-6 ${styles['text-center']}`}>
                      <div className={styles['text-link']}>
                        <label
                          className={`${styles['pl-25']} center`}
                          style={{ fontSize: "90%" }}
                        >
                          {" "}
                          Tidak menerima kode?
                          <a
                            className={`${styles['text-link']} ${styles['color-cyan']} resend-otp`}
                            href="#"
                            id="resend-passcode"
                          >
                            <b id="click-here">Klik disini</b>
                          </a>
                          untuk mengirim kode lagi
                        </label>
                      </div>
                    </div>
                  </div>
                  <input
                    type="button"
                    name="next"
                    className={`next ${styles['action-button']}`}
                    defaultValue="LANJUT"
                    data-id={2}
                    title="Lanjut"
                    onClick={handleNextClick}
                  />
                  <input
                    type="button"
                    name="previous"
                    className={`previous ${styles['action-button-previous']}`}
                    defaultValue="KEMBALI"
                    title="Kembali"
                    onClick={handlePreviousClick}
                  />
                </fieldset>
                <fieldset style={{ display: currentStep === 3 ? 'block' : 'none' }}>
                  <div className={styles['form-card']}>
                    <div
                      className={`${styles.fieldtitle} row-12`}
                      style={{ textAlign: "center" }}
                    >
                      <label
                        className={styles['pl-25']}
                        style={{ fontWeight: 500, fontSize: "120%" }}
                      >
                        Buat kata sandi
                      </label>
                    </div>
                    <div className="row-6">
                      <div className={styles['form-group']}>
                        <input
                          className={`${styles['form-control']} datainput`}
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Kata Sandi"
                          onClick={togglePassword}
                        />
                        <span
                          className={`${ionstyle.ion} ${ionstyle['ion-eye']} toggle-password`}
                          toggle="#password"
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: 0,
                            width: 34,
                            height: 24,
                            textAlign: "center",
                            paddingTop: 10
                          }}
                        />
                        <span
                          className={styles['form-control-feedback']}
                          style={{ display: "none" }}
                        />
                        <span className={styles['invalid-feedback']} role="alert">
                          <strong>harap cek kata sandi</strong>
                        </span>
                      </div>
                    </div>
                    <div className="row-6">
                      <div className={styles['form-group']}>
                        <input
                          className={`${styles['form-control']} datainput`}
                          type="password"
                          name="passwordConfirm"
                          id="passwordConfirm"
                          placeholder="Konfirmasi Kata Sandi"
                          onClick={togglePassword}
                        />
                        <span
                          className={`${ionstyle.ion} ${ionstyle['ion-eye']} toggle-password`}
                          toggle="#passwordConfirm"
                          style={{
                            cursor: "pointer",
                            position: "absolute",
                            right: 0,
                            width: 34,
                            height: 24,
                            textAlign: "center",
                            paddingTop: 10
                          }}
                        />
                        <span
                          className={styles['form-control-feedback']}
                          style={{ display: "none" }}
                        />
                        <span className={styles['invalid-feedback']} role="alert">
                          <strong>harap cek kata sandi</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  <input
                    type="button"
                    name="next"
                    className={`next ${styles['action-button']}`}
                    defaultValue="LANJUT"
                    data-id={3}
                    title="Lanjut"
                    onClick={handleNextClick}
                  />
                  <input
                    type="button"
                    name="previous"
                    className={`previous ${styles['action-button-previous']}`}
                    defaultValue="KEMBALI "
                    title="Kembali"
                    onClick={handlePreviousClick}
                  />
                </fieldset>
                <fieldset style={{ display: currentStep === 4 ? 'block' : 'none' }}>
                  <div className={styles['form-card']}>
                    <div
                      className={`${styles.fieldtitle} row-md-6`}
                      style={{ textAlign: "center" }}
                    >
                      <label
                        className={styles['pl-25']}
                        style={{ fontWeight: 500, fontSize: "120%" }}
                      >
                        Buat profil toko Anda
                      </label>
                    </div>
                    <div className="row-md-6">
                      <label className={styles.fieldlabels}>Unggah logo toko :</label>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                      />
                    </div>
                    <div className="row-md-6">
                      <div className={styles["form-group"]}>
                        <span
                          id="required-storeName"
                          className="error_message"
                          style={{
                            display: "none",
                            color: "red",
                            fontSize: 12
                          }}
                        >
                          *Harap diisi !
                        </span>
                        <input
                          className={`${styles['form-control']} datainput`}
                          type="text"
                          name="storeName"
                          id="storeName"
                          placeholder="Nama Toko"
                        />
                      </div>
                    </div>
                    
                    <div className="row-md-6">
                      <label className={styles.fieldlabels}>Code Refferal :</label>
                      <input
                        type="text"
                        name="code_referral"
                        id="code_referral"
                      />
                    </div>{" "}
                    
                  </div>
                  <input
                    type="button"
                    name="submit"
                    className={`next ${styles['action-button']}`}
                    defaultValue="SELESAI"
                    data-id={5}
                    title="Lanjut"
                    onClick={handleNextClick}
                  />
                  <input
                    type="button"
                    name="previous"
                    className={`previous ${styles['action-button-previous']}`}
                    defaultValue="KEMBALI"
                    title="Kembali"
                    onClick={handlePreviousClick}
                  />
                </fieldset>
              </div>
            </form>
            <div className={styles.tulisan}>
              <p style={{ fontSize: 14 }}>
                Sudah punya akun?
                <a
                  href="/login"
                  className={`${styles['text-link']} ${styles['color-primary-red']}`}
                >
                  {" "}
                  Login{" "}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className={`${styles['social-auth-links']} ${styles['text-center']}`}>
      <div
        className="g-signin2"
        data-width="auto"
        data-height={42}
        data-longtitle="true"
        data-onsuccess="onSignIn"
        data-theme="dark"
      />
    </div>
  </div>
  </body>
</>


    )
    
  }

export default Register