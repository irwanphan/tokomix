import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import mysql from 'mysql2/promise';
import { TypeBarang } from "../lib/types/barang";

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
    
    const [rows] = await connection.execute('SELECT * FROM tbbarang');
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
  const { items } = useLoaderData<{ items: TypeBarang[] }>();

  return (
    <div>
      <h1>Daftar Barang</h1>
      <ul>
        {items.map((item) => (
          <li key={item.Kode}>
            <p>{item.Nama}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
