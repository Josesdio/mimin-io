import React from 'react';

const RegisterLayout = () => {
    return (
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            <meta name="description" content="" />
            <meta name="author" content="" />
            

            <link rel="stylesheet" href={('/register.module.css')} />
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css" />
            <link rel="stylesheet" href={('plugin/minimallite/assets/vendor_components/select2/dist/css/select2.min.css')} />

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

            {/* Custom CSS */}
            <link rel="stylesheet" href={('plugin/assets/custom_style.css')} />
            <script src={('plugin/minimallite/assets/vendor_components/select2/dist/js/select2.full.js')}></script>
            <script src={('plugin/minimallite/assets/vendor_plugins/cdn/sweetalert.js')}></script>
            {/* <script src={require('js/register.js')}></script> */}
        </head>
    );
};

export default RegisterLayout;