const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable optimization
  swcMinify: true,
  // Experimental features for better tree-shaking
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-progress', '@radix-ui/react-slider', '@radix-ui/react-slot', '@radix-ui/react-toast', '@radix-ui/react-tooltip']
  }
};

module.exports = withBundleAnalyzer(nextConfig);