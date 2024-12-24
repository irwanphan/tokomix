const Barang = () => {
    const barang = [
      { id: 1, nama: "Laptop", stok: 10 },
      { id: 2, nama: "Printer", stok: 5 },
      { id: 3, nama: "Meja", stok: 20 },
    ];
  
    return (
      <div>
        <h1>Daftar Barang</h1>
        <ul>
          {barang.map((item) => (
            <li key={item.id}>
              {item.nama} - Stok: {item.stok}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Barang;
