/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                loader: "@svgr/webpack",
                },
            ],
        });
        return config;
    },
    experimental: {
        serverActions: true,
      },
      images: {
        disableStaticImages: true,
        domains: ['xxxx.supabase.co'],
      },
};

export default nextConfig;
