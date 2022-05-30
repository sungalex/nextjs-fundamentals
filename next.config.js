const API_KEY = process.env.API_KEY;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
      // {
      //   source: "/api/movies/image/:id*",
      //   destination: "https://image.tmdb.org/t/p/w500/:id*",
      //   permanent: false,
      // },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies/popular",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/image/:id*",
        destination: "https://image.tmdb.org/t/p/w500/:id*",
      },
    ];
  },
};

module.exports = nextConfig;
