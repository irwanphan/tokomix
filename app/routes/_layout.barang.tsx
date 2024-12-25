import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { runQuery } from "~/lib/utils/db";
import { TypeBarang } from "../lib/types/barang";

// Loader untuk mengambil data barang
export const loader: LoaderFunction = async () => {
  try {
    const items = await runQuery<TypeBarang>("SELECT * FROM tbbarang");
    return json({ items });
  } catch (error: unknown) {
    console.error("Error detail:", error);
    throw new Error("Gagal memuat data: " + (error instanceof Error ? error.message : "Error tidak diketahui"));
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
