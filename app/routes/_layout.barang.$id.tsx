import { json, type LoaderFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { runQuery } from "~/lib/utils/db";
import { TypeBarang } from "~/lib/types/barang";

// Loader untuk mengambil detail barang berdasarkan Kode
export const loader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;
  console.log(id);

  if (!id) {
    throw new Error("Kode barang tidak ditemukan.");
  }

  try {
    // Query data barang berdasarkan Kode
    const [item] = await runQuery<TypeBarang>("SELECT * FROM tbbarang WHERE Kode = ?", [id]);

    if (!item) {
      throw new Error(`Barang dengan kode ${id} tidak ditemukan.`);
    }

    return json({ item });
  } catch (error: unknown) {
    console.error("Error detail:", error);
    throw new Error("Gagal memuat data: " + (error instanceof Error ? error.message : "Error tidak diketahui"));
  }
};

export default function DetailBarang() {
  const { item } = useLoaderData<{ item: TypeBarang }>();

  return (
    <div>
      <h2>Detail Barang</h2>
      <p>Kode: {item.Kode}</p>
      <p>Nama: {item.Nama}</p>
      <p>Kode Grup: {item.KodeGrup}</p>
      <p>Kode Merk: {item.KodeMerk}</p>
      <p>Harga Beli: {item.HargaBeli_FBK}</p>
    </div>
  );
}
