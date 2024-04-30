const loginLayouts = () => {
    return(
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
    {"{"} ucfirst(str_replace("-"," ",Request::segment(1))) {"}"}
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
</>
    )
}

export default loginLayouts