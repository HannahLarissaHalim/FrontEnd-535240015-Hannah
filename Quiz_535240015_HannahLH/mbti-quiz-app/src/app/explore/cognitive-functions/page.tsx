import { Container, Card, Row, Col, Alert } from 'react-bootstrap';

// Contoh data 16 Fungsi Kognitif (perlu pembahasan dari Anda)
const cognitiveFunctions = [
    { name: 'Ni', type: 'Introverted Intuition', description: 'Fokus pada pola dan makna jangka panjang.' },
    { name: 'Ne', type: 'Extroverted Intuition', description: 'Menciptakan kemungkinan dan ide baru.' },
    { name: 'Si', type: 'Introverted Sensing', description: 'Mengingat detail dan pengalaman masa lalu.' },
    { name: 'Se', type: 'Extroverted Sensing', description: 'Berfokus pada momen saat ini dan realitas fisik.' },
    { name: 'Ti', type: 'Introverted Thinking', description: 'Mencari keakuratan logis dan kerangka kerja internal.' },
    { name: 'Te', type: 'Extroverted Thinking', description: 'Mengorganisir lingkungan dan sistem secara efisien.' },
    { name: 'Fi', type: 'Introverted Feeling', description: 'Berpegang pada nilai pribadi yang mendalam.' },
    { name: 'Fe', type: 'Extroverted Feeling', description: 'Mencari harmoni dan memenuhi kebutuhan orang lain.' },
];

interface Definition {
  word: string;
  definition: string;
}

// Fetch data dari External Public API (Contoh: Dictionary API)
async function fetchExternalData(): Promise<Definition | null> {
    try {
        // Ganti dengan API yang Anda pilih. Contoh ini mengambil definisi 'Intuition'
        const res = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/Intuition', {
            cache: 'no-store' 
        });

        if (!res.ok) {
            console.error("External API fetch failed");
            return null;
        }

        const data = await res.json();
        const definition = data[0]?.meanings[0]?.definitions[0]?.definition;
        
        return {
            word: 'Intuition',
            definition: definition || 'Definisi tidak tersedia dari API eksternal.',
        };
    } catch (error) {
        console.error("Error fetching external API:", error);
        return null;
    }
}

export default async function CognitiveFunctionsPage() {
    const externalData = await fetchExternalData();

    return (
        <Container className="my-5">
            <h1 className="mb-4">Jelajahi 16 Fungsi Kognitif</h1>
            <p className="lead mb-5">
                Pembahasan mendalam tentang dasar-dasar psikologi di balik setiap tipe MBTI.
            </p>

            <h3 className="mb-3 text-primary">Data dari External API (Contoh: Intuition)</h3>
            <Card className="mb-5 shadow-sm bg-light">
                <Card.Body>
                    {externalData ? (
                        <>
                            <Card.Title className="text-decoration-underline">{externalData.word}</Card.Title>
                            <Card.Text>
                                Definisi (Eksternal): *{externalData.definition}*
                            </Card.Text>
                        </>
                    ) : (
                        <Alert variant="warning">Gagal memuat data dari API Eksternal.</Alert>
                    )}
                </Card.Body>
            </Card>

            <h3 className="mb-3 text-secondary">16 Fungsi Kognitif (Pembahasan Inti)</h3>
            <Row xs={1} md={2} lg={4} className="g-4">
                {cognitiveFunctions.map(func => (
                    <Col key={func.name}>
                        <Card className="h-100 border-secondary">
                            <Card.Body>
                                <Card.Title className="fw-bold">{func.name} ({func.type})</Card.Title>
                                <Card.Text className="small">{func.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}