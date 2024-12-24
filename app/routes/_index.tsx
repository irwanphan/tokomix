import type { MetaFunction } from "@remix-run/node";
import { IconDatabase, IconPackage, IconUser } from "@tabler/icons-react";

export const meta: MetaFunction = () => {
  return [
    { title: "TokoMix" },
    { name: "description", content: "Welcome to TokoPro Mix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
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
            <li>
              <a href="/pelanggan" className="flex items-center gap-2">
                <IconUser />
                Pelanggan
              </a>
            </li>
            <li>
              <a href="/connection" className="flex items-center gap-2">
                <IconDatabase />
                Connection
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
