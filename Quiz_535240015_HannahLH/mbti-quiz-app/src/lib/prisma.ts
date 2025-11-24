import { PrismaClient } from '@prisma/client';

// deklarasi tipe global buat nyimpen instance prisclient
// ini penting banget di next.js biar nggak kebanyakan bikin instance prisma waktu hot reloading
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// ambil instance prisma yang udah ada (global.prisma), kalo belum ada ya bikin yang baru
const prisma = global.prisma || new PrismaClient({
  // ini opsional, buat liat query sql di terminal waktu development
  log: ['query', 'info', 'warn', 'error'], 
});

// cuma di mode development (bukan production), kita simpen instance prisma ini ke variabel global.
// tujuannya biar instance-nya reusable, nggak bikin baru terus tiap kali file ini di-load.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// export instance prisma yang udah disiapin
export default prisma;