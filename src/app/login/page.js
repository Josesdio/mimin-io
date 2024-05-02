import Image from "next/image";
import style from './page.module.css';
export default function Home() {
return (
    <>
<body style={{background: 'url(plugin/assets/images/backgrounds/1.jpg) center center'}}>
<div className={`${style.row} ${style['h-100']} ${style['d-flex']} ${style['align-items-center']}`}>
<div className={`${style['col-lg-6']} ${style['pr-0']} ${style['d-sm-block']} ${style['d-md-block']} ${style['d-lg-block']}`}>
    <div className={`${style['d-flex']} ${style['flex-column']}`}>
    <div className={style['loginannounce-left']}>
        <div className={`${style['login-box']}`}>
        <div className={style['login-logo']}>
            <a href="#">
            <img
                src="plugin/placeholders/companylogos/companylogo.png"
                alt="Mimin"
                width="250px"
            />
            </a>
        </div>
          {/* /.login-logo */}
        <div className={`${style['login-box-header']} ${style['px-20']} ${style['pt-20']} ${style['pb-10']} ${style['text-center']}`}>
            <h3 className={style['font-size-18']}>
            <b className={`${style['color-cyan']} ${style['font-weight-600']}`}>Masuk</b> ke akun Anda
            </h3>
        </div>
          {/* /.login-box-header */}
        <div className={`${style['login-box-body']} ${style['shadow-none']}`}>
            <form
            id="login-form"
            className={`${style['form-element']}`}
            method="POST"
            action="/login'"
            >
            
            <div className={`form-group has-feedback`}>
                <input
                type="email"
                name="email"
                id="email"
                className={`${style['form-control']}`}
                placeholder="Email"
                required=""
                defaultValue="email"
                />
                <span className={`ion ion-email ${style['form-control-feedback']}`} />
                <span className={style['invalid-feedback']} role="alert">
                <strong>silahkan cek email</strong>
                </span>
            </div>
            <div className={`form-group has-feedback`}>
                <input
                type="password"
                name="password"
                id="password"
                className={style['form-control']}
                placeholder="Kata sandi"
                required=""
                defaultValue="password"
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
                className={style['form-control-feedback']}
                style={{ display: "none" }}
                />
                <span className={style['invalid-feedback']} role="alert">
                <strong>silahkan cek kata sandi</strong>
                </span>
            </div>
            <div className={style.row}>
                <div className={style['col-6']}>
                <div className={`${style.checkbox} ${style['text-link']}`}>
                    <input type="checkbox" id="basic_checkbox_1" />
                    <label className={style['pl-25']} htmlFor="basic_checkbox_1">
                    Tetap masuk
                    </label>
                </div>
                </div>
                {/* /.col */}
                <div className={style['col-6']}>
                <div className={`${style['fog-pwd']} ${style['text-right']}`}>
                    <a
                    href="/forgetPassword"
                    className={style['text-link']}
                    >
                    <i className={`ion ion-locked ${style['pr-1']}`} />
                    Lupa kata sandi?
                    </a>
                    <br />
                </div>
                </div>
                {/* /.col */}
                <div className={`${style['col-12']} ${style['text-center']}`}>
                <button
                    type="submit"
                    id="login"
                    className={`${style.btn} ${style['btn-cyan']} ${style['btn-block']} ${style['margin-top-10']}`}
                    title="Login"
                >
                    LOGIN
                </button>
                </div>
                {/* /.col */}
            </div>
            </form>
            {/* /.social-auth-links */}
            <div className={`${style['margin-top-30']} ${style['text-center']}`}>
            <p>
                Belum punya akun?{" "}
                <a
                href="/register"
                className={`${style['text-link']} ${style['color-primary-red']} m-l-5`}
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
<div className={`${style['col-lg-6']} ${style['pl-0']}`}>
    <div className={`${style['loginannounce-right']}`}>
    <div
        id="carouselExampleIndicators"
        className={`${style['carousel']} slide`}
        data-ride="carousel"
    >
        <ol className={`${style['carousel-indicators']} ${style['align-text-bottom']}`}>
        <li
            data-target="#carouselExampleIndicators"
            data-slide-to={0}
            className={style.active}
        />
        <li data-target="#carouselExampleIndicators" data-slide-to={1} />
        <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className={style['carousel-inner']}>
        <div className={`${style['carousel-item']} ${style.active}`}>
            <img
            className={`${style['d-block']} ${style['w-100']}`}
            src="plugin/assets/images/image-placeholders/background.jpg"
            alt="First slide"
            />
        </div>
        <div className={style['carousel-item']}>
            <img
            className={`${style['d-block']} ${style['w-100']}`}
            src="plugin/assets/images/image-placeholders/background2.jpg"
            alt="Second slide"
            />
        </div>
        <div className={`${style['carousel-item']}`}>
            <img
                className={`${style['d-block']} ${style['w-100']}`}
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