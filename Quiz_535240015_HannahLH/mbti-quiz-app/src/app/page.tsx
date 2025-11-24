import { Container, Card, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function HomePage() {
  const nama = "Nama Mahasiswa Anda";
  const nim = "NIM Anda";
  const topik = "Aplikasi Web Mini Pengenalan MBTI & Fungsi Kognitif";

  return (
    <div className="bg-light vh-100 d-flex align-items-center">
      <Container>
        <Card className="shadow-lg p-4 text-center">
          <Card.Title className="display-4 fw-bold text-primary mb-3">
            {topik}
          </Card.Title>
          <Card.Body>
            <p className="lead">Dibuat sebagai tantangan **Quiz React Next.js Mini Web Application**.</p>
            <hr className="my-4" />
            
            <div className="mb-4">
              <h5 className="text-muted">Nama: **{nama}**</h5>
              <h5 className="text-muted">NIM: **{nim}**</h5>
            </div>

            <Link href="/profiles" passHref>
              <Button variant="primary" size="lg" className="me-3">
                Lihat Daftar Profil
              </Button>
            </Link>
            <Link href="/explore/cognitive-functions" passHref>
              <Button variant="outline-secondary" size="lg">
                Jelajahi Fungsi Kognitif
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}