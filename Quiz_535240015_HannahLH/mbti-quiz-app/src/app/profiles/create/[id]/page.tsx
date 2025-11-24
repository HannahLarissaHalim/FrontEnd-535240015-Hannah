import { Container, Card, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
// impor prisma client. jalur relatifnya panjang karena dari dynamic route ke lib/
import prisma from '../../../../lib/prisma';
// notfound dari next/navigation, buat ngurusin kalo profilnya nggak ada
import { notFound } from 'next/navigation';

// interface buat nangkep parameter id dari url
interface DetailPageProps {
  params: {
    id: string; // id-nya berupa string dari url, nanti harus diubah ke number
  };
}

// fungsi server buat ambil detail profil pake prisma
async function getProfileDetail(id: number) {
  // cari data unik berdasarkan id
  const profile = await prisma.mbtiProfile.findUnique({
    where: { id },
  });
  return profile;
}

// komponen utama halaman detail. ini server component ya.
export default async function ProfileDetailPage({ params }: DetailPageProps) {
  // ubah id dari string url ke integer
  const id = parseInt(params.id);
  // fetch profilnya
  const profile = await getProfileDetail(id);

  if (!profile) {
    // kalo nggak ketemu di database, langsung arahin ke halaman 404 kita
    notFound(); 
  }

  // peta sederhana buat nampilin ringkasan fungsi kognitif. ini hardcode/custom aja.
  const cognitiveFunctionsMap: Record<string, string> = {
    I: 'introversion', E: 'extroversion',
    N: 'intuition', S: 'sensing',
    T: 'thinking', F: 'feeling',
    J: 'judging', P: 'perceiving',
  };
  
  // pecah tipe mbti (misal 'intj') jadi array ['i', 'n', 't', 'j']
  const typeChars = profile.type.toUpperCase().split('');
  
  // map array karakter tadi ke deskripsi fungsi kognitifnya
  // tambahin (char: string) buat ngilangin error 'implicitly any' dari typescript
  const functions = typeChars.map((char: string) => 
    `${char}: ${cognitiveFunctionsMap[char] || 'unknown'}`
  ).join(' | '); // gabungin lagi jadi string dipisahin ' | '


  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Img 
            variant="top" 
            src={profile.imageUrl} 
            alt={`gambar ${profile.type}`} 
            style={{ height: '350px', objectFit: 'cover' }}
        />
        <Card.Body>
          {/* judul & tipe */}
          <Card.Title className="display-5">{profile.name}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted">tipe: **{profile.type}**</Card.Subtitle>
          
          {/* ringkasan fungsi kognitif yang dibahas */}
          <p className="fw-bold mt-4">ringkasan fungsi kognitif (diperluas):</p>
          <Alert variant="info" className="p-2 small">
            {functions}
          </Alert>

          {/* deskripsi lengkap profil dari database */}
          <h5 className="mt-4">deskripsi lengkap:</h5>
          <p>{profile.deskripsi}</p>
          
          <hr />
          {/* tombol back (ketentuan dynamic routing) */}
          <Link href="/profiles" passHref>
            <Button variant="secondary">
              &larr; kembali ke daftar profil
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}