let counter = 1;
const total = 2; // ubah sesuai jumlah slide kamu

setInterval(() => {
  document.getElementById('choose_' + counter).checked = true;
  counter++;
  if (counter > total) {
    counter = 1;
  }
}, 3000); // Ganti 3000 jadi 5000 kalau mau 5 detik

const dataProduk = [
  { nama: "Free Fire", publisher: "Garena", img: "bahan/images/ff.png" },
  { nama: "Valorant", publisher: "Riot Games", img: "bahan/images/valorant.jpg" },
  { nama: "Mobile Legends", publisher: "Moonton", img: "bahan/images/mlbb.jpg" },
  { nama: "PUBG Mobile", publisher: "Tencent", img: "bahan/images/pubgm.jpg" },
  { nama: "Higgs Domino", publisher: "Higgs Games", img: "bahan/images/higgs_domino.jpg" }
];

// 2️⃣ Input, tombol, dan hasil pencarian
const inputCari = document.querySelector('input');
const hasilDiv = document.getElementById('hasil-pencarian');
const tombolCari = document.querySelector('button');

// 3️⃣ 🔥 TARUH DI SINI: popupMap dan fungsi bukaPopup()
function bukaPopup(nama) {
  const popupMap = {
    "mobilelegends": "harga-mlbb",
    "pubgmobile": "harga-pubgm",
    "freefire": "harga-ff",
    "valorant": "harga-Valo",
    "higgsdomino": "harga-Hado"
  };

  const idPopup = popupMap[nama] || "harga-" + nama;

  // ubah hash di URL (biar :target CSS aktif)
  window.location.hash = idPopup;
}

// 4️⃣ Fungsi tampilkanHasil() (yang kamu udah punya)
function tampilkanHasil(keyword) {
  const hasil = dataProduk.filter(p =>
    p.nama.toLowerCase().includes(keyword.toLowerCase())
  );

  if (keyword.trim() === "" || hasil.length === 0) {
    hasilDiv.style.display = "none";
    hasilDiv.innerHTML = "";
    return;
  }

  hasilDiv.innerHTML = hasil.map(p => `
    <div class="hasil-item" data-nama="${p.nama.toLowerCase().replace(/\s/g, '')}">
      <img src="${p.img}" alt="${p.nama}">
      <div>
        <p>${p.nama}</p>
        <small>${p.publisher}</small>
      </div>
    </div>
  `).join("");

  hasilDiv.style.display = "block";

  // 5️⃣ Pasang event listener klik hasil pencarian
  document.querySelectorAll('.hasil-item').forEach(item => {
    item.addEventListener('click', () => {
      const nama = item.getAttribute('data-nama');
      bukaPopup(nama);
    });
  });
}

// 6️⃣ Event input & klik tombol cari
tombolCari.addEventListener('click', () => tampilkanHasil(inputCari.value));
inputCari.addEventListener('input', () => tampilkanHasil(inputCari.value));
