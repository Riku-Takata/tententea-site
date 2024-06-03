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
    images: {
        disableStaticImages: true, // import‚µ‚½‰æ‘œ‚ÌŒ^’è‹`İ’è‚ğ–³Œø‚É‚·‚é
    },
};

export default nextConfig;
