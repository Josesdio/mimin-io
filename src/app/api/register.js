const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      referral: ''
    });
    const handleNameChange = (e) => {
      const newName = e.target.value;
      setFormData({ ...formData, name: newName });
    };
    const handleEmailChange = (e) => {
      const newEmail = e.target.value;
      setFormData({ ...formData, email: newEmail });
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
        const response = await fetch('/api/register', {
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
        const otpResponse = await fetch(`/api/auth/otp-email/${data.token}`, {
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
  
          
          $.ajax({
            url: 'api/auth/register',
            type: 'POST',
            data: JSON.stringify(datas),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            success: function (response) {
              $('#data-email').html($('#email').val());
              $('#data-phone').html($('#phone').val());
              $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
              $('#button-otp').attr('data-token', response.token);
              $('#resend-passcode').attr('data-token', response.token);
              next_fs.show();
  
              current_fs.animate({
                opacity: 0
              }, {
                step: function (now) {
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
              });
  
              Swal.close();
            },
            error: function (errors) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: errors.responseJSON.message,
              });
            }
          });
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
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();
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

}