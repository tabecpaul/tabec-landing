import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The old tabec.co.kr ran a MakeShop storefront (shop/board/design paths
    // with hundreds of indexed shopdetail.html?branduid=N product pages).
    // That storefront no longer exists, so send any lingering search/backlink
    // traffic to old paths back to the homepage instead of a bare 404.
    return [
      { source: "/shop/:path*", destination: "/", permanent: true },
      { source: "/board/:path*", destination: "/", permanent: true },
      { source: "/design/:path*", destination: "/", permanent: true },
      { source: "/makeshop/:path*", destination: "/", permanent: true },
      { source: "/flashskin/:path*", destination: "/", permanent: true },
      { source: "/css/:path*", destination: "/", permanent: true },
      { source: "/js/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
