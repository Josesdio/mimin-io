import Image from "next/image";
import styles from "/public/plugin/assets/custom_style.css";
import masterStyle from '/public/plugin/minimallite/minimallite-admin-main/css/master_style.css'
import bootstyle from '/public/plugin/assets/bootstrap-4.3.1/css/bootstrap-grid.css'
import bootstrap from '/public/plugin/assets/bootstrap-4.3.1/css/bootstrap.css'
import extendStyle from '/public/plugin/minimallite/assets/vendor_components/bootstrap/dist/css/bootstrap-extend.css'
export default function Home() {
return (
    <>
<body style={{background: 'url(plugin/assets/images/backgrounds/1.jpg) center center'}}>
<div className="row d-flex align-items-center">
    <div className="col-lg-6 pr-0 d-sm-block d-md-block d-lg-block">
    <div className="d-flex flex-column">
        <div className="loginannounce-left">
        <div className= "login-box">
            <div className="login-logo">
            <a href="#">
                <img
                src="plugin/placeholders/companylogos/companylogo.png"
                alt="Mimin"
                width="250px"
                />
            </a>
            </div>
            {/* /.login-logo */}
            <div className="login-box-header px-20 pt-20 pb-10 text-center">
            <h3 className= 'font-size-18'>
                <b className="color-cyan font-weight-600">Masuk</b> ke akun Anda
            </h3>
            </div>
            {/* /.login-box-header */}
            <div className="login-box-body shadow-none">
            <form
                id="login-form"
                className='form-element'
                method="POST"
                action="/login"
            >
                <div className="form-group has-feedback">
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    defaultValue=""
                />
                <span className="ion ion-email form-control-feedback"/>
                <span className="invalid-feedback" role="alert">
                    <strong>silahkan cek email</strong>
                </span>
                </div>
                <div className="form-group has-feedback">
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="Kata sandi"
                    required
                    defaultValue=""
                />
                <span
                    className="ion ion-eye toggle-password"
                    toggle="#password"
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
                    className='form-control-feedback'
                    style={{ display: "none" }}
                />
                <span className="invalid-feedback" role="alert">
                    <strong>silahkan cek kata sandi</strong>
                </span>
                </div>
                <div className='row'>
                <div className='col-6'>
                    <div className="checkbox text-link">
                    <input type="checkbox" id="basic_checkbox_1" />
                    <label className="pl-25" htmlFor="basic_checkbox_1">
                        Tetap masuk
                    </label>
                    </div>
                </div>
                  {/* /.col */}
                <div className='col-6'>
                    <div className="fog-pwd text-right">
                    <a
                        href="/forgotPassword"
                        className="text-link"
                    >
                        <i className="ion ion-locked pr-1" />
                        Lupa kata sandi?
                    </a>
                    <br />
                    </div>
                </div>
                  {/* /.col */}
                <div className="col-12 text-center">
                    <button
                    type="submit"
                    id="login"
                    className="btn btn-cyan btn-block margin-top-10"
                    title="Login"
                    >
                    LOGIN
                    </button>
                </div>
                  {/* /.col */}
                </div>
            </form>
              {/* /.social-auth-links */}
            <div className="margin-top-30 text-center">
                <p>
                Belum punya akun?{" "}
                <a
                    href="/register"
                    className="text-link color-primary-red m-l-5"
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
    <div className="col-lg-6 pl-0">
    <div className="loginannounce-right">
        <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
        >
        <ol className="carousel-indicators align-text-buttom">
            <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className="active"
            />
            <li data-target="#carouselExampleIndicators" data-slide-to={1} />
            <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className='carousel-inner'>
            <div className="carousel-item active">
            <img
                className="d-block w-100"
                src="plugin/assets/images/image-placeholders/background.jpg"
                alt="First slide"
            />
            </div>
            <div className='carousel-item'>
            <img
                className="d-block w-100"
                src="plugin/assets/images/image-placeholders/background2.jpg"
                alt="Second slide"
            />
            </div>
            <div className='carousel-item'>
            <img
                className="d-block w-100"
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
}
