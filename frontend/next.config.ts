import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        domains: ['prod-files-secure.s3.us-west-2.amazonaws.com'],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/server/:path*',
    //             destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
    //         },
    //     ]
    // },
}

export default nextConfig
