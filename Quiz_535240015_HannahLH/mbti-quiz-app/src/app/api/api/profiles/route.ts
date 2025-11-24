import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// API ROUTE untuk mengambil semua profil MBTI (GET)
export async function GET() {
  try {
    const profiles = await prisma.mbtiProfile.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(profiles, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: 'Gagal mengambil data profil.' },
      { status: 500 }
    );
  }
}

// API ROUTE untuk membuat profil MBTI baru (POST) - (Kode yang sudah Anda miliki)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, deskripsi, imageUrl } = body;

    if (!type || !name || !deskripsi || !imageUrl) {
      return NextResponse.json(
        { message: 'Semua field wajib diisi.' },
        { status: 400 }
      );
    }

    const newProfile = await prisma.mbtiProfile.create({
      data: {
        type: type as string,
        name: name as string,
        deskripsi: deskripsi as string,
        imageUrl: imageUrl as string,
      },
    });

    return NextResponse.json(newProfile, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { message: 'Gagal memproses permintaan.' },
      { status: 500 }
    );
  }
}