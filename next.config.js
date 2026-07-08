/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },

  // Oxcode website 
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/oxcode",
        destination: "https://oxcode-site.vercel.app/",
      },
      {
        source: "/oxcode/:path*",
        destination: "https://oxcode-site.vercel.app/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
  // SEO & AI-discoverability headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
          {
            key: "Link",
            value: '<https://oxlo.ai/llms.txt>; rel="ai-content-declaration"',
          },
        ],
      },
    ];
  },

  // Rewrites for sitemap and clean URL patterns
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml",
      },
    ];
  },
};

module.exports = nextConfig;
