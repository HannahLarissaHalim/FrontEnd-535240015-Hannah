'use client';

import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

interface DeleteButtonProps {
  profileId: number;
}

export default function DeleteButton({ profileId }: DeleteButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm(`Anda yakin ingin menghapus Profil #${profileId}?`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/profiles/${profileId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Gagal menghapus data.');
      }

      // Refresh halaman list setelah sukses menghapus
      router.refresh(); 

    } catch (error) {
      alert(`Error saat menghapus: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="danger" 
      size="sm" 
      onClick={handleDelete} 
      disabled={loading}
    >
      {loading ? 'Menghapus...' : 'Delete'}
    </Button>
  );
}