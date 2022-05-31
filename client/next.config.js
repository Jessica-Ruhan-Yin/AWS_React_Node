/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_NAME: 'NODE-REACT-AWS',
    API: 'http://localhost:8000/api',
    PRODUCTION: false,
    DOMAIN: 'http://localhost:3000',
    FB_APP_ID: 'MNBVW42FT90PO'
  }
}

module.exports = nextConfig

// const withCSS = require('@zeit/next-css');
// module.exports = withCSS({
//   publicRuntimeConfig: {
//     APP_NAME: 'NODE-REACT-AWS',
//     API: 'http://localhost:8000/api',
//     PRODUCTION: false,
//     DOMAIN: 'http://localhost:3000',
//     FB_APP_ID: 'MNBVW42FT90PO'
//   }
// });