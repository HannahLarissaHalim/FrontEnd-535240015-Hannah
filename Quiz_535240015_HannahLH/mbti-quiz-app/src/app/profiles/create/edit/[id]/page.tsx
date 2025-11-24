'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';

interface EditPageProps {
  params: {
    id: string;
  };
}

export default function EditProfilePage({ params }: EditPageProps) {
  const router = useRouter();
  const profileId = params.id;
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    deskripsi: '',
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  // Ambil data profil saat komponen dimuat
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`/api/profiles/${profileId}`);
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Gagal mengambil data untuk diedit.');
        }

        const profileData = await res.json();
        setFormData(profileData);
      } catch (err) {
        setFetchError((err as Error).message);
      } finally {
        setIsFetching(false);
      }
    }
    fetchProfile();
  }, [profileId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFetchError(null);
    setLoading(true);

    try {
      const res = await fetch(`/api/profiles/${profileId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Gagal memperbarui profil.');
      }

      router.push('/profiles');

    } catch (err) {
      setFetchError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  
  if (isFetching) {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">Edit Profil MBTI Kustom #{profileId}</Card.Title>
          
          {fetchError && <Alert variant="danger">{fetchError}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Tipe MBTI</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                maxLength={4}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nama/Julukan Profil</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi Profil</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>URL Gambar</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="warning" type="submit" disabled={loading}>
              {loading ? 'Memperbarui...' : 'Simpan Perubahan'}
            </Button>
            <Button variant="secondary" onClick={() => router.back()} className="ms-2">
                Batal
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}