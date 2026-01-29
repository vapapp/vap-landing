// 🛡️ Rate Limiter para proteção contra ataques DoS
// Implementação em memória (para produção, use Redis)

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Limpeza automática a cada minuto
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60000);

export interface RateLimitConfig {
  interval: number; // Intervalo em milissegundos
  uniqueTokenPerInterval: number; // Número máximo de requests no intervalo
}

export class RateLimitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RateLimitError';
  }
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = {
    interval: 60000, // 1 minuto
    uniqueTokenPerInterval: 10, // 10 requests por minuto
  }
): Promise<void> {
  const now = Date.now();
  const resetTime = now + config.interval;

  if (!store[identifier]) {
    store[identifier] = {
      count: 1,
      resetTime,
    };
    return;
  }

  // Se o tempo resetou, reiniciar contador
  if (store[identifier].resetTime < now) {
    store[identifier] = {
      count: 1,
      resetTime,
    };
    return;
  }

  // Incrementar contador
  store[identifier].count++;

  // Verificar se excedeu o limite
  if (store[identifier].count > config.uniqueTokenPerInterval) {
    throw new RateLimitError(
      `Rate limit exceeded. Try again in ${Math.ceil((store[identifier].resetTime - now) / 1000)} seconds.`
    );
  }
}

// Helper para obter identificador único do usuário
export function getIdentifier(request: Request): string {
  // Usar IP + User-Agent como identificador
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const userAgent = request.headers.get('user-agent') || 'unknown';

  return `${ip}:${userAgent}`;
}

// Rate limiter específico para rotas de API sensíveis
export const apiRateLimit = {
  // APIs públicas: 30 requests por minuto
  public: { interval: 60000, uniqueTokenPerInterval: 30 },

  // APIs de admin: 100 requests por minuto
  admin: { interval: 60000, uniqueTokenPerInterval: 100 },

  // APIs de autenticação: 5 tentativas por minuto
  auth: { interval: 60000, uniqueTokenPerInterval: 5 },

  // APIs de email: 3 requests por minuto
  email: { interval: 60000, uniqueTokenPerInterval: 3 },
};
