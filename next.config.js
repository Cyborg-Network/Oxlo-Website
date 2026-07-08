/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    return config;
  },

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
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml",
      },
    ];
  },
};

module.exports = nextConfig;
