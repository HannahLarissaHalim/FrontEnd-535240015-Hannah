import { PrismaClient } from '@prisma/client';

// Deklarasi global untuk menampung instance PrismaClient
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Inisialisasi atau gunakan instance global
const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Opsional: untuk logging SQL queries
});

// Hanya tetapkan instance ke global saat tidak dalam mode produksi
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;