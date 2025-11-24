import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Relative path ke src/lib/prisma.ts

interface RouteProps {
  params: {
    id: string;
  };
}

// 1. GET (Read Single Item)
export async function GET(request: Request, { params }: RouteProps) {
  const id = parseInt(params.id);
  
  try {
    const profile = await prisma.mbtiProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      return NextResponse.json({ message: 'Profil tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Gagal mengambil data profil.' }, { status: 500 });
  }
}

// 2. PUT (Update Single Item)
export async function PUT(request: Request, { params }: RouteProps) {
  const id = parseInt(params.id);
  
  try {
    const body = await request.json();
    const { type, name, deskripsi, imageUrl } = body;

    if (!type || !name || !deskripsi || !imageUrl) {
      return NextResponse.json(
        { message: 'Semua field wajib diisi.' },
        { status: 400 }
      );
    }

    const updatedProfile = await prisma.mbtiProfile.update({
      where: { id },
      data: { type, name, deskripsi, imageUrl },
    });

    return NextResponse.json(updatedProfile, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: 'Gagal memperbarui profil.' }, { status: 500 });
  }
}

// 3. DELETE (Delete Single Item)
export async function DELETE(request: Request, { params }: RouteProps) {
  const id = parseInt(params.id);
  
  try {
    await prisma.mbtiProfile.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 }); // 204 No Content

  } catch (error) {
    return NextResponse.json({ message: 'Gagal menghapus profil.' }, { status: 500 });
  }
}