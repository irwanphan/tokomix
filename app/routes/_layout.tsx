import { Outlet } from "@remix-run/react";
import { IconDatabase, IconPackage, IconUser } from "@tabler/icons-react";

export default function Layout() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center gap-16 p-6">
        <header className="flex flex-col items-center gap-9">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">TokoMix</h1>
        </header>
        <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <ul className="flex flex-col gap-4">
            <li>
              <a href="/barang" className="flex items-center gap-2">
                <IconPackage />
                Barang
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}