/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Placeholder imagery in this build is rendered as inline SVG / gradients,
    // so we do not depend on a remote loader. If you later wire real
    // photography (e.g. an Unsplash/CDN source), allow the host here.
    remotePatterns: [],
  },
};

export default nextConfig;
