# New Asnaf Profiling Form Structure

## Sections Overview

### 1. Peribadi
- Jenis ID (Kad Pengenalan, Foreign ID, Sijil Lahir)
- Nombor ID
- Nama Penuh
- Tarikh Lahir
- Umur (auto-calculated)
- Jantina (Lelaki/Perempuan)
- Agama
- Bangsa
- Warganegara
- No Telefon
- Emel
- Status Perkahwinan
- Bilangan Isteri (if applicable)
- Bilangan Anak

### 2. Alamat
- Alamat 1
- Alamat 2
- Alamat 3
- Poskod
- Bandar
- Daerah
- Negeri (default: Selangor)
- Status Kediaman (Milik Sendiri, Sewa, etc)
- Tapak Rumah
- Jenis Rumah
- Binaan Rumah
- Bilangan Bilik
- Keadaan Rumah

### 3. Pendidikan
- Tahap Pendidikan
- Institusi Pendidikan
- Bidang Pengajian
- Tahun Tamat

### 4. Pengislaman (Muallaf)
- Adakah Muallaf? (Ya/Tidak)
- **Conditional fields (if Ya):**
  - Nama Sebelum Islam
  - Nama Selepas Islam
  - Tarikh Masuk Islam
  - Tempat Masuk Islam
  - Tarikh Masuk KFAM
  - Status KFAM

### 5. Perbankan
- **Adakah anda mempunyai akaun bank?** (Ya/Tidak)
- **Conditional (if Tidak):**
  - **Sebab Tiada Akaun Bank** (dropdown)
    - Bukan Warganegara
    - Sakit Terlantar
    - Lain-lain
- **Conditional (if Ya):**
  - Nama Bank
  - No Akaun Bank
  - Nama Pemegang Akaun

### 6. Kesihatan
- Tahap Kesihatan (Sihat, OKU, Sakit Kronik, Uzur)
- **If OKU:**
  - Jenis Masalah Kesihatan
  - No Kad OKU
  - Kategori OKU
  - Tahap Kecacatan
  - Jumlah Perbelanjaan OKU
  - Upload Dokumen OKU
- **If Sakit Kronik:**
  - Jenis Penyakit
  - Tempoh Sakit
  - Kos Rawatan
  - Upload Dokumen

### 7. Kemahiran
- Kemahiran yang Dimiliki (multi-select)
  - Nelayan
  - Penternakan
  - Pertanian
  - Menjahit
  - Kraftangan
  - Memasak
  - Mengasuh
  - Perkhidmatan
  - Pertukangan
  - Perniagaan
  - Lain-lain

### 8. Pinjaman
- Adakah mempunyai pinjaman? (Ya/Tidak)
- **Conditional (if Ya):**
  - Institusi Pinjaman
  - Jenis Pinjaman
  - Jumlah Pinjaman
  - Bayaran Bulanan
  - Baki Pinjaman
  - Tempoh Bayaran
  - Upload Dokumen Pinjaman

### 9. Pemilikan Aset
#### Aset Cair:
- Wang Simpanan
- Simpanan ASB
- Simpanan Tabung Haji
- Emas (gram)
- Saham

#### Aset Tidak Cair:
- Kenderaan (multi-select: Kereta, Motosikal, Van, Lori)
- Rumah Kedai (unit)
- Tanah (ekar)
- Ternakan
- Perniagaan

### 10. Pekerjaan
- Status Pekerjaan (Bekerja, Tidak Bekerja, Pencen, Pelajar)
- **Conditional (if Bekerja):**
  - Jenis Pekerjaan
  - Nama Majikan
  - Alamat Majikan
  - Jawatan
  - Sektor Pekerjaan
  - Tempoh Bekerja
  - Status Jawatan

### 11. Pendapatan & Perbelanjaan
#### Pendapatan:
- Pendapatan Bulanan
- Pendapatan Pasangan
- Pendapatan Lain
- Sumber Pendapatan Lain
- **Jumlah Pendapatan** (auto-calculated)

#### Perbelanjaan:
- Belanjaan Makanan
- Belanjaan Utiliti
- Belanjaan Pengangkutan
- Belanjaan Perubatan
- Belanjaan Pendidikan
- Belanjaan Sewa
- Belanjaan Lain
- **Jumlah Belanjaan** (auto-calculated)

### 12. Pengesahan
- Hubungan Kekeluargaan dengan LZS? (Ya/Tidak)
- Pengesahan PDPA (Setuju/Tidak Setuju)

### 13. Pengesahan Bermastautin
**Process:**
1. Upload Dokumen Pengesahan Bermastautin (signed by Penolong Amil)
2. Upload Dokumen Pengesahan Pendapatan (signed by Penolong Amil)
3. **After upload, then select:**
   - Nama Pegawai/Penolong Amil yang Mengesahkan
   - Jawatan Pegawai
   - No Telefon Pegawai
   - Tarikh Pengesahan

**Note:** Penolong Amil tidak dibayar untuk pengesahan ini, masih manual process.

## Conditional Logic Summary

1. **Perbankan:**
   - `adaAkaunBank === 'Tidak'` → Show "Sebab Tiada Akaun Bank"
   - `adaAkaunBank === 'Ya'` → Show bank details

2. **Pengislaman:**
   - `isMuallaf === 'Ya'` → Show all Muallaf fields

3. **Kesihatan:**
   - `tahapKesihatan === 'OKU'` → Show OKU fields
   - `tahapKesihatan === 'Sakit Kronik'` → Show chronic illness fields

4. **Pinjaman:**
   - `adaPinjaman === 'Ya'` → Show loan details

5. **Pekerjaan:**
   - `statusPekerjaan === 'Bekerja'` → Show employment details

6. **Pendapatan & Perbelanjaan:**
   - Auto-calculate totals based on individual inputs

7. **Pengesahan Bermastautin:**
   - Document upload first → Then populate pegawai details
