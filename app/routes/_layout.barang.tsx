import { json, type LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData, Outlet } from "@remix-run/react";
import { runQuery } from "~/lib/utils/db";
import { TypeBarang } from "../lib/types/barang";
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register module before use
ModuleRegistry.registerModules([ClientSideRowModelModule]);

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

// Update column definitions with proper typing
const columnDefs: ColDef<TypeBarang>[] = [
  { field: 'Kode', headerName: 'Kode Barang', sortable: true, filter: true },
  { field: 'Nama', headerName: 'Nama Barang', sortable: true, filter: true },
];

export default function Barang() {
  const { items } = useLoaderData<{ items: TypeBarang[] }>();

  return (
    <div className="flex">
      <div className="w-full">
        <h1>Daftar Barang</h1>
        <div className="ag-theme-alpine w-full h-[500px]">
          <AgGridReact
            modules={[ClientSideRowModelModule]}
            rowData={items}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            className="w-full h-[500px]"
          />
        </div>
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
