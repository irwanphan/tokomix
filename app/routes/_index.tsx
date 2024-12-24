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
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">TokoMix</h1>
        </header>
        <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <ul className="flex flex-col gap-4">
            {resources.map(({ href, text, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center gap-2"
                >
                  {icon}
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

const resources = [
  {
    href: "/barang",
    text: "Barang",
    icon: <IconPackage />,
  },
  {
    href: "/pelanggan",
    text: "Pelanggan",
    icon: <IconUser />,
  },
  {
    href: "/connection",
    text: "Connection",
    icon: <IconDatabase />,
  }
];
