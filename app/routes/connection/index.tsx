import { Form, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  // Ambil data dari form
  const host = formData.get("host") as string;
  const port = formData.get("port") as string;
  const dbuser = formData.get("dbuser") as string;
  const password = formData.get("password") as string;
  const dbname = formData.get("dbname") as string;

  console.log(host, port, dbuser, password, dbname);

  // Validasi data
  if (!host || !port || !dbuser || !password || !dbname) {
    return { error: "Semua field harus diisi!" };
  }

  // Hash password menggunakan bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan ke localStorage (dikirim ke client-side untuk penyimpanan)
  const settings = {
    host,
    port,
    dbuser,
    password: hashedPassword,
    dbname,
  };

  const settingsJSON = JSON.stringify(settings);

  // Kirim data settings ke client
  return { settingsJSON, success: "Pengaturan berhasil disimpan!" };
}

export default function Connection() {
  const actionData = useActionData();
  const [settings, setSettings] = useState({
    host: "",
    port: "",
    dbuser: "",
    password: "",
    dbname: "",
  });

  // Muat data dari localStorage saat komponen dimuat
  useEffect(() => {
    const savedSettings = localStorage.getItem("db_settings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
    }
  }, []);

  // Simpan data ke localStorage setelah form berhasil dikirim
  useEffect(() => {
    if (actionData?.settingsJSON) {
      localStorage.setItem("db_settings", actionData.settingsJSON);
    }
  }, [actionData]);

  return (
    <div>
      <h1>Pengaturan Koneksi Database</h1>
      <Form method="post">
        <div>
          <label>
            Host:
            <input
              type="text"
              name="host"
              placeholder="Contoh: localhost"
              defaultValue={settings.host}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Port:
            <input
              type="number"
              name="port"
              placeholder="Contoh: 5432"
              defaultValue={settings.port}
              required
            />
          </label>
        </div>
        <div>
          <label>
            User:
            <input
              type="text"
              name="dbuser"
              placeholder="Contoh: admin"
              defaultValue={settings.dbuser}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" required />
          </label>
        </div>
        <div>
          <label>
            Database Name:
            <input
              type="text"
              name="dbname"
              placeholder="Contoh: inventori"
              defaultValue={settings.dbname}
              required
            />
          </label>
        </div>
        <button type="submit">Simpan</button>
      </Form>
      {actionData?.error && <p style={{ color: "red" }}>{actionData.error}</p>}
      {actionData?.success && <p style={{ color: "green" }}>{actionData.success}</p>}
    </div>
  );
}
