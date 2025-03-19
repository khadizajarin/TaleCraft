/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'img.daisyui.com',
        },
        {
            protocol: 'https',
            hostname: 'images.pexels.com',
        },
        {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
        },
    ]
}
};

export default nextConfig;
