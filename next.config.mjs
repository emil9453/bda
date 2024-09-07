/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true,
        after: true,
      },
    distDir: 'out',
};

export default nextConfig;
