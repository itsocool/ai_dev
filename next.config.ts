import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // Dev-only. next dev serves /_next/* to `localhost` alone and answers every
  // other Origin with 403 Unauthorized, which breaks the page when the browser
  // is pointed at 127.0.0.1 instead. Add any other host you open the dev server
  // from here (a LAN IP, a tunnel domain). Ignored by `next build`.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
