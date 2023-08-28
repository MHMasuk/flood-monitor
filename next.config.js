/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'aff.india-water.gov.in',
                port: '',
                // pathname: '/my-bucket/**',
            },
        ],
    },
}

module.exports = nextConfig
