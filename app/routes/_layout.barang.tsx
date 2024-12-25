import { Link, Outlet } from "@remix-run/react";

export default function Barang() {
  const barang = [
    { id: 1, nama: "Laptop", stok: 10 },
    { id: 2, nama: "Printer", stok: 5 },
    { id: 3, nama: "Meja", stok: 20 },
  ];

  return (
    <div className="flex flex-col gap-4 ">
      <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
        <h1>Daftar Barang</h1>
        <ul>
          {barang.map((item) => (
            <li key={item.id}>
              <Link to={`/barang/${item.id}`}>
                {item.nama} - Stok: {item.stok}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
        <Outlet />
      </div>
    </div>
  );
}
