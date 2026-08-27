/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const OXCODE = "https://www.oxcode.ai";

const nextConfig = {
  reactStrictMode: true,

  webpack: (config) => {
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
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Legal pages live at different paths on oxcode.ai.
      { source: "/privacy-policy", destination: `${OXCODE}/privacy`, permanent: false },
      { source: "/term-of-use", destination: `${OXCODE}/terms`, permanent: false },
      { source: "/data-processing-agreement", destination: `${OXCODE}/dpa`, permanent: false },
      // Root needs its own rule: the catch-all param below cannot match an empty path.
      { source: "/", destination: OXCODE, permanent: false },
      // robots.txt and sitemap.xml stay reachable so crawlers can discover these
      // redirects. api/ holds this site's own route handlers.
      { source: "/:path((?!api/|robots\\.txt|sitemap\\.xml).*)", destination: OXCODE, permanent: false },
    ];
  },

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
