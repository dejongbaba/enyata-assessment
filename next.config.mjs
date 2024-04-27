/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
    },
    typescript: {ignoreBuildErrors: true},
    images: {remotePatterns: [{protocol: "https", hostname: 'via.placeholder.com', pathname: '**/**'}]}
};

export default nextConfig;
