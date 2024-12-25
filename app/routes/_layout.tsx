import { Outlet } from "@remix-run/react";
import { IconDatabase, IconPackage } from "@tabler/icons-react";

export default function Layout() {
  return (
    <div className="flex flex-col  h-screen">
      <header className="fixed top-0 left-0 right-0 bg-white flex flex-col gap-4 border-b border-gray-200">
        <div className="flex flex items-center gap-4">
          <nav className="rounded-xl border p-3">
            <ul className="flex gap-4">
              <li>
                <a href="/barang" className="flex items-center gap-1">
                  <IconPackage />
                  Barang
                </a>
              </li>
              <li>
                <a href="/connection" className="flex items-center gap-1">
                  <IconDatabase />
                  Connection
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex p-4 pt-16">
        <Outlet />
      </div>
    </div>
  );
}