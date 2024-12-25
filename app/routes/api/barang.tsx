import { json } from "@remix-run/node";
// import type { ActionArgs } from "@remix-run/node";
import mysql from "mysql2/promise";

// Action untuk menangani POST request ke API
export async function action({ request }: any) {
  // Ambil konfigurasi database dari body request
  const formData = await request.formData();
  const host = formData.get("host") as string;
  const port = parseInt(formData.get("port") as string, 10);
  const user = formData.get("dbuser") as string;
  const password = formData.get("plainPassword") as string;
  const database = formData.get("dbname") as string;

  // Validasi input
  if (!host || !port || !user || !password || !database) {
    return json({ error: "Konfigurasi database tidak lengkap." }, { status: 400 });
  }

  try {
    // Buat koneksi ke MySQL
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      database,
    });

    // Query data barang
    const [rows] = await connection.execute(
      "SELECT id, nama, stok, deskripsi FROM tbbarang WHERE tipe = 'barang'"
    );

    // Tutup koneksi
    await connection.end();

    return json({ items: rows });
  } catch (error) {
    console.error("Database error:", error);
    return json({ error: "Gagal terhubung ke database: " + error.message }, { status: 500 });
  }
}
