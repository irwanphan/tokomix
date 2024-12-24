const Pelanggan = () => {
    const pelanggan = [
      { id: 1, nama: "Andi" },
      { id: 2, nama: "Budi" },
      { id: 3, nama: "Citra" },
    ];
  
    return (
      <div>
        <h1>Daftar Pelanggan</h1>
        <ul>
          {pelanggan.map((item) => (
            <li key={item.id}>{item.nama}</li>
          ))}
        </ul>
      </div>
    );
  }
  
export default Pelanggan;