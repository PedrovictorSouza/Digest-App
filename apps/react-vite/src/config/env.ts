import * as z from 'zod';

const createEnv = () => {
  const EnvSchema = z.object({
    API_URL: z.string().optional().default('http://localhost:8000/api'),
    ENABLE_API_MOCKING: z
      .string()
      .refine((s) => s === 'true' || s === 'false')
      .transform((s) => s === 'true')
      .optional()
      .default('false'),
    APP_URL: z.string().optional().default('http://localhost:3000'),
    APP_MOCK_API_PORT: z.string().optional().default('8080'),
  });

  const envVars = Object.entries(import.meta.env).reduce<
    Record<string, string>
  >((acc, curr) => {
    const [key, value] = curr;
    if (key.startsWith('VITE_APP_')) {
      acc[key.replace('VITE_APP_', '')] = value;
    }
    return acc;
  }, {});

  const parsedEnv = EnvSchema.safeParse(envVars);

  if (!parsedEnv.success) {
    console.warn('Usando configurações padrão para variáveis de ambiente');
    return {
      API_URL: 'http://localhost:8000/api',
      ENABLE_API_MOCKING: false,
      APP_URL: 'http://localhost:3000',
      APP_MOCK_API_PORT: '8080',
    };
  }

  return parsedEnv.data;
};

export const env = createEnv();
