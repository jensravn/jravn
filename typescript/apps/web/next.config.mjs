/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  async rewrites() {
    return [
      {
        // rewrite all requests to /api to the API server
        source: "/api/:path*",
        // destination: "http://localhost:8080/api/:path*",
        destination: "https://jravn.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
