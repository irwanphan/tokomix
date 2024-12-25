import { useParams } from "@remix-run/react";

export default function BarangDetail() {
  const { id } = useParams();
  const barang = [
    { id: 1, nama: "Laptop", stok: 10, deskripsi: "Laptop gaming terbaru" },
    { id: 2, nama: "Printer", stok: 5, deskripsi: "Printer laser all-in-one" },
    { id: 3, nama: "Meja", stok: 20, deskripsi: "Meja kerja ergonomis" },
  ];

  const selectedBarang = barang.find((item) => item.id === parseInt(id!));

  if (!selectedBarang) {
    return <div>Barang tidak ditemukan</div>;
  }

  return (
    <div>
      <h2>Detail Barang</h2>
      <h3>{selectedBarang.nama}</h3>
      <p>Stok: {selectedBarang.stok}</p>
      <p>Deskripsi: {selectedBarang.deskripsi}</p>
    </div>
  );
}
