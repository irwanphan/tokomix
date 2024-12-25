import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import mysql from 'mysql2/promise';

// Definisikan tipe data untuk item
type Item = {
  id: number;
  nama: string;
  stok: number;
  deskripsi: string;
};

// Tambahkan loader
export const loader: LoaderFunction = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 8889,
      user: 'root',
      password: 'root',
      database: 'tokopro_nja'
    });

    // Tambahkan log untuk debugging
    console.log('Mencoba koneksi ke database...');
    
    const [rows] = await connection.execute('SELECT * FROM tbakun');
    await connection.end();
    
    console.log('Data berhasil diambil:', rows);
    
    return json({ items: rows });
  } catch (error: any) {
    // Log error lengkap
    console.error('Error detail:', error);
    
    // Throw error dengan informasi lebih detail
    throw new Error(`Gagal memuat data: ${error.message}`);
  }
};

export default function Barang() {
  const { items } = useLoaderData<{ items: Item[] }>();

  return (
    <div>
      <h1>Daftar Barang</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <h2>{item.nama}</h2>
            <p>Stok: {item.stok}</p>
            <p>Deskripsi: {item.deskripsi}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
