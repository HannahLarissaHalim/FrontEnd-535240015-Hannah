import { Container, Card, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
import prisma from '../../../../lib/prisma'; // Relative path ke src/lib/prisma.ts
import { notFound } from 'next/navigation';

interface DetailPageProps {
  params: {
    id: string;
  };
}

// Server Component Fetching Data
async function getProfileDetail(id: number) {
  const profile = await prisma.mbtiProfile.findUnique({
    where: { id },
  });
  return profile;
}

export default async function ProfileDetailPage({ params }: DetailPageProps) {
  const id = parseInt(params.id);
  const profile = await getProfileDetail(id);

  if (!profile) {
    notFound(); // Mengarah ke not-found.tsx jika profil tidak ada
  }

  // Contoh sederhana pemetaan fungsi kognitif berdasarkan 4 huruf
  const cognitiveFunctionsMap: Record<string, string> = {
    I: 'Introversion', E: 'Extroversion',
    N: 'Intuition', S: 'Sensing',
    T: 'Thinking', F: 'Feeling',
    J: 'Judging', P: 'Perceiving',
  };
  
  // Tipe MBTI dalam huruf besar
  const typeChars = profile.type.toUpperCase().split('');
  const functions = typeChars.map(char => `${char}: ${cognitiveFunctionsMap[char] || 'Unknown'}`).join(' | ');


  return (
    <Container className="my-5">
      <Card className="shadow-sm">
        <Card.Img 
            variant="top" 
            src={profile.imageUrl} 
            alt={`Gambar ${profile.type}`} 
            style={{ height: '350px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title className="display-5">{profile.name}</Card.Title>
          <Card.Subtitle className="mb-4 text-muted">Tipe: **{profile.type}**</Card.Subtitle>
          
          <p className="fw-bold mt-4">Ringkasan Fungsi Kognitif (Diperluas):</p>
          <Alert variant="info" className="p-2 small">
            {functions}
          </Alert>

          <h5 className="mt-4">Deskripsi Lengkap:</h5>
          <p>{profile.deskripsi}</p>
          
          <hr />
          <Link href="/profiles" passHref>
            <Button variant="secondary">
              &larr; Kembali ke Daftar Profil
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}