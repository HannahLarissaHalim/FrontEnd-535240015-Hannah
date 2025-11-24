import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Link from 'next/link';
// import deletebutton pake relative path karena ada di components/
import DeleteButton from '../../../components/DeleteButton'; 

// interface buat nentuin bentuk data profil mbti kita
interface MbtiProfile {
  id: number;
  type: string;
  name: string;
  deskripsi: string;
  imageUrl: string;
}

// ini fungsi buat ambil data. karena async, ini bakal jalan di server (server component)
async function getProfiles(): Promise<MbtiProfile[]> {
  
  // ambil base url dari .env buat fetch ke api kita sendiri
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // fetching ke /api/profiles yang udah kita bikin
  const res = await fetch(`${apiUrl}/api/profiles`, { 
    cache: 'no-store' // penting! biar datanya selalu fresh, nggak pake cache lama
  });

  if (!res.ok) {
    // kalo responsenya nggak oke (misalnya 500 error), lempar error aja
    throw new Error('gagal ambil data profil dari api. mungkin servernya lagi ngambek.');
  }

  // data diubah ke format json
  return res.json();
}

// komponen utama buat nampilin list profil
export default async function ProfilesListPage() {
  let profiles: MbtiProfile[] = [];
  let error: string | null = null;

  // coba ambil data, kalo gagal nanti errornya disimpen
  try {
    profiles = await getProfiles();
  } catch (err) {
    // ambil pesan errornya
    error = (err as Error).message;
  }
  
  return (
    <Container className="my-5">
      
      {/* ini header section, ada tombol buat nambah item baru (sesuai ketentuan crud) */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>daftar profil mbti kustom</h2>
        {/* link ke halaman create form */}
        <Link href="/profiles/create" passHref>
          <Button variant="primary">tambah profil baru</Button>
        </Link>
      </div>

      {/* kalo ada error dari fetching data, tampilin di sini pake alert bootstrap */}
      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {/* bagian list item, pake row dan col bootstrap buat grid (ketentuan styling) */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {profiles.length > 0 ? (
          // looping data profiles yang udah diambil
          profiles.map((profile) => (
            <Col key={profile.id}>
              <Card className="h-100 shadow-sm">
                
                {/* gambar profil, diambil dari path yang disimpan di database (public folder) */}
                <Card.Img 
                  variant="top" 
                  src={profile.imageUrl || '/default.png'}
                  alt={profile.type}
                  style={{ height: '200px', objectFit: 'cover' }}
                />

                <Card.Body className="d-flex flex-column">
                    <Card.Title>{profile.name} ({profile.type})</Card.Title>
                    <Card.Text className="text-truncate flex-grow-1">{profile.deskripsi}</Card.Text>
                    
                    {/* tombol aksi: detail, edit, delete (ketentuan dynamic routing & crud) */}
                    <div className="d-flex justify-content-start mt-2">
                      {/* link ke halaman detail ([id]/page.tsx) */}
                      <Link href={`/profiles/${profile.id}`} passHref>
                        <Button variant="info" size="sm" className="me-2">lihat detail</Button>
                      </Link>
                      {/* link ke halaman edit ([id]/edit/page.tsx) */}
                      <Link href={`/profiles/edit/${profile.id}`} passHref>
                        <Button variant="warning" size="sm" className="me-2">edit</Button>
                      </Link>
                      
                      {/* tombol delete. ini komponen client sendiri */}
                      <DeleteButton profileId={profile.id} /> 
                    </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          // kalo listnya kosong
          <Col><p className="lead">belum ada profil mbti kustom yang dibuat.</p></Col>
        )}
      </Row>
    </Container>
  );
}