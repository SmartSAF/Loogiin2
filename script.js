document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // Ambil nilai input
    const kodeid = document.getElementById("kodeid").value.trim();
    const password = document.getElementById("password").value.trim();

    if (kodeid === "" || password === "") {
      alert("Kode ID dan Password harus diisi!");
      return;
    }

    // Ganti URL berikut dengan URL Web App Google Apps Script Anda
    const scriptURL = "https://script.google.com/macros/s/AKfycbyqa3H9xysGUj3quFv53palb3a4XErvKmyiJHgTJX2MkmjDhP9do78M3OdSrqBzOT1M/exec";

    // Susun URL dengan parameter action, kodeid, dan password
    const url = scriptURL +
      "?action=login&kodeid=" + encodeURIComponent(kodeid) +
      "&password=" + encodeURIComponent(password);

    console.log("Request URL:", url);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === "success") {
          displayData(data.data);
        } else {
          alert(data.message || "Login gagal!");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Terjadi kesalahan saat koneksi ke server.");
      });
  });

  // Tombol navigasi pada halaman WD
  document.getElementById("btnWithdrawKomisi").addEventListener("click", function() {
    window.location.href = "https://SmartSAF.com/Withdraw";
  });
  document.getElementById("btnWithdrawUD").addEventListener("click", function() {
    window.location.href = "https://SmartSAF.com/Toko";
  });
  document.getElementById("homeBtn").addEventListener("click", function() {
    window.location.href = "https://SmartSAF.com/Dashboard";
  });
});

function displayData(userData) {
  // Sembunyikan kontainer login dan tampilkan kontainer data
  document.getElementById("loginContainer").style.display = "none";
  const dataContainer = document.getElementById("dataContainer");
  dataContainer.style.display = "block";

  // Set judul halaman WD
  document.getElementById("dataTitle").innerText = "Komisi dan Bonus";

  // Buat tabel untuk menampilkan data
  const table = document.createElement("table");
  table.className = "table-data";

  // Urutan field sesuai dengan yang ada di Google Sheet
  const fieldsOrder = [
    "Kode ID",
    "Tgl Bergabung",
    "Nama02",
    "Pengundang",
    "WA Pengundang",
    "Anggota di Generasi 1",
    "Anggota di Generasi 2",
    "Anggota di Generasi 3",
    "Anggota di Generasi 4",
    "Anggota di Generasi 5",
    "Anggota di Generasi 6",
    "Anggota di Generasi 7",
    "Anggota di Generasi 8",
    "Anggota di Generasi 9",
    "Anggota di Generasi 10",
    "Anggota di Generasi 2-10",
    "Komisi Generasi 1",
    "Komisi Generasi 2",
    "Komisi Generasi 3",
    "Komisi Generasi 4",
    "Komisi Generasi 5",
    "Komisi Generasi 6",
    "Komisi Generasi 7",
    "Komisi Generasi 8",
    "Komisi Generasi 9",
    "Komisi Generasi 10",
    "Jumlah Komisi",
    "•Bonus Spesial 1",
    "•Bonus Spesial 2",
    "•Bonus Spesial 3",
    "•Bonus Spesial 4",
    "•Bonus Spesial 5",
    "Jumlah Komisi+Bonus",
    "Komisi+Bonus Rp 80%",
    "Komisi+Bonus UD 20%",
    "Riwayat Withdraw Rp",
    "Jumlah Withdraw Rp",
    "Saldo Komisi+Bonus",
    "Riwayat Withdraw UD",
    "Jumlah Withdraw UD",
    "Saldo UD (Uang Digital)",
    "Bonus Tambahan 1",
    "Bonus Tambahan 2",
    "Bonus Tambahan 3",
  ];

  // Daftar field yang akan diformat sebagai mata uang (jika nilainya berupa angka)
  const currencyFields = [
    "Komisi Generasi 1",
    "Komisi Generasi 2",
    "Komisi Generasi 3",
    "Komisi Generasi 4",
    "Komisi Generasi 5",
    "Komisi Generasi 6",
    "Komisi Generasi 7",
    "Komisi Generasi 8",
    "Komisi Generasi 9",
    "Komisi Generasi 10",
    "Jumlah Komisi",
    "•Bonus Spesial 1",
    "•Bonus Spesial 2",
    "•Bonus Spesial 3",
    "•Bonus Spesial 4",
    "•Bonus Spesial 5",
    "Jumlah Komisi+Bonus",
    "Komisi+Bonus Rp 80%",
    "Komisi+Bonus UD 20%",
    "Jumlah Withdraw Rp",
    "Saldo Komisi+Bonus",
    "Jumlah Withdraw UD",
    "Saldo UD (Uang Digital)",
  ];

  fieldsOrder.forEach(function(field) {
    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.innerText = field;

    const tdColon = document.createElement("td");
    tdColon.innerText = ":";
    tdColon.style.width = "10px";

    const tdValue = document.createElement("td");
    let value = userData[field] || "";

    if (currencyFields.includes(field)) {
      value = formatCurrency(value);
    } else if (field.startsWith("Anggota di Generasi")) {
      // Format angka anggota menggunakan titik sebagai pemisah ribuan
      value = formatNumber(value);
    }

    tdValue.innerText = value;

    tr.appendChild(th);
    tr.appendChild(tdColon);
    tr.appendChild(tdValue);
    table.appendChild(tr);
  });

  const dataContent = document.getElementById("dataContent");
  dataContent.innerHTML = "";
  dataContent.appendChild(table);
}

function formatCurrency(value) {
  let number = parseFloat(value);
  if (isNaN(number)) return value;
  return "Rp " + number.toLocaleString("id-ID");
}

function formatNumber(value) {
  let number = parseFloat(value);
  if (isNaN(number)) return value;
  return number.toLocaleString("id-ID");
}
