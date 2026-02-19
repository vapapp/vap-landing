import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ESLint runs separately; avoids @eslint/eslintrc compat issues at build time
  },

  // 🛡️ PROTEÇÕES DE SEGURANÇA CONTRA DoS

  // Limitar tamanho do body para prevenir ataques de payload massivo
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb', // Limite de 1MB para requisições
    },
  },

  // Headers de segurança
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Prevenir clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Prevenir MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Proteção XSS
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;",
          },
          // Strict Transport Security
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },

  // Otimizações de produção
  poweredByHeader: false, // Remover header "X-Powered-By"
  compress: true, // Habilitar compressão gzip
};

export default nextConfig;
