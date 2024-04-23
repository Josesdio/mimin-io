// next.config.js

const securityHeaders = [
    {
    source: '/(.*)',
    headers: [
        {
        key: 'Cache-Control',
        value: 'public, max-age=3600, must-revalidate',
        },
    ],
    },
];

module.exports = {
    async headers() {
    return securityHeaders;
    },
};
