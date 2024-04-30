const Layouts = () => {
    return(
        <div>
            <>
<meta charSet="utf-8" />
<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
<meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
/>
<meta name="description" content="" />
<meta name="author" content="" />
<link rel="icon" href="{{ asset('plugin/assets/images/Mimin.png') }}" />
<title>
    Mimin - {"{"}
    {"{"} ucfirst(str_replace('-', ' ', Request::segment(1))) {"}"}
    {"}"}
</title>
{/* Bootstrap 4.3.1*/}
<link
    rel="stylesheet"
    href="{{ asset('plugin/assets/bootstrap-4.3.1/css/bootstrap.min.css') }}"
/>
{/* Bootstrap Extend*/}
<link
    rel="stylesheet"
    href="{{ asset('plugin/assets/additionalplugins/bootstrap-extend.css') }}"
/>
{/* DataTables Extras*/}
<link
    rel="stylesheet"
    href="{{ asset('plugin/assets/additionalplugins/select.dataTables.min.css') }}"
/>
  {/* daterange picker */}
<link
    rel="stylesheet"
    href="{{ asset('plugin/minimallite/assets/vendor_components/bootstrap-daterangepicker/daterangepicker.css') }}"
/>
  {/* date picker */}
<link
    rel="stylesheet"
    href="{{ asset('plugin/minimallite/assets/vendor_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.css') }}"
/>
  {/* glyphicons */}
<link
    rel="stylesheet"
    href="{{ asset('plugin/minimallite/assets/vendor_components/glyphicons/glyphicon.css') }}"
/>
  {/* Bootstrap time Picker */}
<link
    rel="stylesheet"
    href="{{ asset('plugin/minimallite/assets/vendor_plugins/timepicker/bootstrap-timepicker.min.css') }}"
/>
  {/* daterange picker */}
  {/* Select2 */}
<link
    rel="stylesheet"
    href="{{ asset('plugin/minimallite/assets/vendor_components/select2/dist/css/select2.min.css') }}"
/>
  {/* SweetAlert2 */}
  {/* Sortables */}
{/* gridstack*/}
<link
    href="{{ asset('plugin/minimallite/assets/vendor_components/gridstack/gridstack.css') }}"
    rel="stylesheet"
/>
  {/* Nestable CSS */}
<link
    href="{{ asset('plugin/minimallite/assets/vendor_components/nestable/nestable.css') }}"
    rel="stylesheet"
    type="text/css"
/>
<link
    href="{{ asset('plugin/minimallite/assets/vendor_components/jquery-toast-plugin-master/src/jquery.toast.css') }}"
    rel="stylesheet"
/>
  {/* Perfect Scroll (For Horizontal Scroll) */}
<link
    rel="stylesheet"
    href="{{ asset('plugin/assets/additionalplugins/perfect-scrollbar-1.4.0/perfect-scrollbar.css') }}"
/>
  {/* Main Style */}
<link
    rel="stylesheet"
    href="{{ asset('plugin/minimallite/minimallite-admin-main/css/master_style.css') }}"
/>
  {/* MinimalLite Admin skins */}
<link
    rel="stylesheet"
    href="{{ asset('plugin/minimallite/minimallite-admin-main/css/skins/_all-skins.css') }}"
/>
  {/* Custom CSS */}
<link rel="stylesheet" href="{{ asset('plugin/assets/custom_style.css') }}" />
  {/* JQuery */}
{"{"}
{"{"}-- Datatables --{"}"}
{"}"}
<link
    rel="stylesheet"
    href="plugin/minimallite/assets/vendor_components/bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css') }}"
/>
@yield('css')
<div className="wrapper">
    <header className="main-header" id="page-header">
      {/* Logo */}
    <a
        href="{{ url('dashboard') }}"
        className="logo bgcolor-black d-flex flex-row justify-content-center"
    >
        {/* mini logo for sidebar mini 50x50 pixels */}
        <b className="logo-mini">
        <span className="dark-logo">
            <img
            className="img-responsive"
            src="plugin/placeholders/companylogos/logogram.png"
            alt="logo"
            width="50px"
            />
        </span>
        </b>
        {/* logo for regular state and mobile devices */}
        <span className="logo-lg">
        <img
            src="{{ asset('plugin/placeholders/companylogos/mimin-text.png') }}"
            alt="logo"
        />
        </span>
    </a>
      {/* Header Navbar */}
    <nav className="navbar navbar-static-top">
        {/* Sidebar toggle button*/}
        <a
        href="#"
        className="sidebar-toggle"
        data-toggle="push-menu"
        title="Toggle navigasi"
        role="button"
        >
        <span className="sr-only">Toggle navigation</span>
        </a>
        <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
            <li className="dropdown messages-menu">
            <a
                href="#"
                style={{ cursor: "pointer" }}
                className="dropdown-toggle share"
                data-toggle="dropdown modal"
                title="Bagikan Microsite"
                data-placement="top"
                data-username="{{ session('username_global') }}"
            >
                <i className="mdi mdi-share-variant" />
            </a>
            </li>
            <li className="dropdown messages-menu">
            <a
                href="#"
                style={{ cursor: "pointer" }}
                className="dropdown-toggle copy-template"
                data-toggle="dropdown modal"
                data-clipboard-text="{{ session('template') }}"
                title="Salin Template"
                data-placement="top"
            >
                <i className="mdi mdi-content-copy" />
            </a>
            </li>
            {/* User Account */}
            <li className="dropdown user user-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                @if (session('user')-&gt;foto != '')
                <img
                src="data:image/png;base64, {{ session('user')->foto ?? '' }}"
                className="user-image rounded-circle"
                alt="User Image"
                />
                @else
                <img
                src="{{ asset('plugin\assets\images\image-placeholders\placeholder-userprofile.png') }}"
                alt=""
                className="user-image rounded-circle"
                />
                @endif
            </a>
            <ul className="dropdown-menu">
                {/* User image */}
                <li className="user-header">
                @if (session('user')-&gt;foto != '')
                <img
                    src="data:image/png;base64, {{ session('user')->foto ?? '' }}"
                    className="float-left rounded-circle"
                    alt="User Image"
                    style={{ height: 80, width: 80 }}
                />
                @else
                <img
                    src="{{ asset('plugin\assets\images\image-placeholders\placeholder-userprofile.png') }}"
                    alt=""
                    className="float-left rounded-circle"
                />
                @endif
                <p style={{ marginLeft: "-10px", marginBottom: 0 }}>
                    {"{"}
                    {"{"} session('user')-&gt;name {"}"}
                    {"}"}
                    <small className="mb-2" style={{ minWidth: 200 }}>
                    {"{"}
                    {"{"} session('user')-&gt;email {"}"}
                    {"}"}
                    </small>
                    <a
                    href="{{ url('profile') }}"
                    className="btn btn-softgreen btn-sm btn-rounded"
                    title="Tampilkan Profil"
                    >
                    Tampilkan Profil
                    </a>
                </p>
                </li>
                {/* Menu Body */}
                <li className="user-body">
                <div className="row no-gutters">
                    @if (session('user')-&gt;user_status == 'superuser')
                    <div className="col-12 text-left mt-2">
                    <a href="{{ url('account-setting') }}">
                        <i className="ion ion-gear-a" />
                        Pengaturan Akun Toko
                    </a>
                    </div>
                    <div role="separator" className="divider col-12" />
                    @endif
                    <div className="col-12 text-left">
                    <a
                        href="/logout"
                        onClick="event.preventDefault();
                document.getElementById('logout-form').submit();"
                    >
                        <i className="ion ion-log-out" /> Keluar
                    </a>
                    <form
                        id="logout-form"
                        action="{{ url('logout') }}"
                        method="POST"
                        style={{ display: "none" }}
                    >
                        @csrf
                    </form>
                    </div>
                </div>
                  {/* /.row */}
                </li>
            </ul>
            </li>
        </ul>
        </div>
    </nav>
    </header>
    @include('layouts.navigation')
    {/* Content Wrapper. Contains page content */}
    <div className="content-wrapper">@yield('content')</div>
    {/* /.content-wrapper */}
    <footer className="main-footer">
    <div className="pull-right d-none d-sm-inline-block">
        <ul className="nav nav-primary nav-dotted nav-dot-separated justify-content-center justify-content-md-end">
        <li className="nav-item">
            <a className="nav-link" href="https://www.mimin.io/#mimin-faq">
            FAQ
            </a>
        </li>
        <li className="nav-item">
            <a
            className="nav-link"
            href="https://www.mimin.io/utility-pages/terms-conditions"
            >
            Terms &amp; Conditions
            </a>
        </li>
        </ul>
    </div>
    © {"{"}
    {"{"} date('Y') {"}"}
    {"}"} Mimin. All Rights Reserved.
    </footer>
    @yield('modal')
    <div
    className="modal fade modal-barcode"
    role="dialog"
    aria-labelledby="imgModal"
    aria-hidden="true"
    style={{ display: "none" }}
    id="imgProductModal"
    >
    <div className="modal-dialog modal-md">
        <div className="modal-content">
        <div className="modal-header">
            <h4 id="producttitle">Barcode</h4>
            <button
            type="button"
            className="close btn-close"
            data-dismiss="modal"
            title="Tutup"
            aria-hidden="true"
            >
            <i className="ti-close" />
            </button>
        </div>
        <div className="modal-body">
            <div className="row justify-content-center">
            <img src="" className="image-share" />
            </div>
        </div>
        <div className="modal-footer" style={{ display: "inline-flex" }}>
            <a target="_blank" className="btn btn-softgreen mr-auto share-link">
            <i className="fab fa-whatsapp" /> Bagikan
            </a>
            <form
            action="{{ url('templates/download') }}/{{ session('username_global') }}"
            method="post"
            className="mr-auto"
            >
            @csrf
            <button type="submit" className="btn btn-info mr-auto">
                <i className="fas fa-download" />
                Download
            </button>
            </form>
            <a target="_blank" className="btn btn-primary kunjungi-website">
            <i className="fas fa-globe" />
            Website
            </a>
        </div>
        </div>
    </div>
    </div>
</div>
  {/* ./wrapper */}
  {/* jQuery 3 */}
@yield('javascript')
  {/* jQuery UI 1.11.4 */}
  {/* Resolve conflict in jQuery UI tooltip with Bootstrap tooltip */}
  {/* popper */}
{/* Bootstrap 4.3.1*/}
  {/* Sparkline */}
  {/* Slimscroll */}
  {/* FastClick */}
  {/* peity */}
  {/* Vector map JavaScript */}
  {/* This is data table */}
  {/* Draggable-portlet */}
  {/* date-range-picker */}
  {/* bootstrap datepicker */}
  {/* bootstrap time picker */}
  {/* DataTablesExtras */}
  {/* Select2 */}
  {/*Nestable js */}
  {/* Perfect Scroll (For Horizontal Scroll) */}
  {/* MinimalLite Admin App */}
  {/* Basic JS */}
</>

        </div>
    )
}

export default Layouts