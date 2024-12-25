import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
  } catch (error: unknown) {
    // Log error lengkap
    console.error('Error detail:', error);
    // Throw error dengan informasi lebih detail
    if (error instanceof Error) {
      throw new Error(`Gagal memuat data: ${error.message}`);
    }
    throw new Error('Gagal memuat data: Error tidak diketahui');
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
            <Link to={`/barang/${item.Kode}`} className="block">
              <p>{item.Nama}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
