/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  async rewrites() {
    return [
      {
        // rewrite all requests to /api to the API server
        source: "/api/daily-cloud-question/:year/:month/:day",
        destination:
          "http://localhost:8080/api/daily-cloud-question/:year/:month/:day",
      },
    ];
  },
};

export default nextConfig;
