// src/app/profiles/page.tsx (perlu diubah)

import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton'; // Gunakan import alias jika sudah dikonfigurasi, atau relative path

// ... (sisakan kode getProfiles dan MbtiProfile interface di atas)

export default async function ProfilesListPage() {
  // ... (sisakan try-catch block)
  
  return (
    <Container className="my-5">
        {/* ... (sisakan bagian header dan error) ... */}

      <Row xs={1} md={2} lg={3} className="g-4">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <Col key={profile.id}>
              <Card>
                {/* ... (sisakan Card.Img, Card.Body, Card.Title, Card.Text) ... */}
                <Card.Body>
                    <Card.Title>{profile.name} ({profile.type})</Card.Title>
                    <Card.Text className="text-truncate">{profile.deskripsi}</Card.Text>
                    
                    <div className="d-flex justify-content-between">
                      <Link href={`/profiles/${profile.id}`} passHref>
                        <Button variant="info" size="sm">Lihat Detail</Button>
                      </Link>
                      <Link href={`/profiles/edit/${profile.id}`} passHref>
                        <Button variant="warning" size="sm" className="me-2">Edit</Button>
                      </Link>
                      {/* INTEGRASI TOMBOL DELETE BARU */}
                      <DeleteButton profileId={profile.id} /> 
                    </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
        // ... (sisakan bagian kosong) ...
        )}
      </Row>
    </Container>
  );
}