import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/admin/adminpanel/setting/:path*",
        destination: "/admin/admin-panel/settings/:path*",
      },
      {
        source: "/admin/adminpanel/setting",
        destination: "/admin/admin-panel/settings",
      },
      {
        source: "/admin/admin-panel/setting/:path*",
        destination: "/admin/admin-panel/settings/:path*",
      },
      {
        source: "/admin/admin-panel/setting",
        destination: "/admin/admin-panel/settings",
      },
      {
        source: "/paneladmin/setting/:path*",
        destination: "/admin/admin-panel/settings/:path*",
      },
      {
        source: "/paneladmin/setting",
        destination: "/admin/admin-panel/settings",
      },
      {
        source: "/admin/adminpanel/:path*",
        destination: "/admin/admin-panel/:path*",
      },
      {
        source: "/admin/adminpanel",
        destination: "/admin/admin-panel",
      },
      {
        source: "/paneladmin/:path*",
        destination: "/admin/admin-panel/:path*",
      },
      {
        source: "/paneladmin",
        destination: "/admin/admin-panel",
      },
    ];
  },
};

export default nextConfig;
