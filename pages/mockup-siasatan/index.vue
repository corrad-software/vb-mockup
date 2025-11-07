<script setup>
definePageMeta({
  title: "Maklumat Siasatan Asnaf",
  middleware: ["auth"],
  requiresAuth: true,
  breadcrumb: [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Tugasan",
      path: "/tugasan",
    },
    {
      name: "Siasatan",
      path: "/mockup-siasatan",
    },
  ],
})

// State management
const activeTab = ref('pemohon')
const isSaving = ref(false)
const canSubmit = ref(false)

// Collapsible sections for accordion behavior
const collapsedSections = ref({
  maklumatAsas: false,
  pendidikanKemahiran: true,
  pinjamanAset: true,
  pekerjaanKewangan: true,
})

// Conditional field states
const statusMuflis = ref(false)
const adaKemahiran = ref(false)
const adaPinjaman = ref(false)
const adaAset = ref(false)
const tinggalAsrama = ref(false)

// Form data
const formData = ref({
  // Basic Identity
  jenisId: 'MyKad',
  noId: '791230104321',
  nama: 'Amirul Hakim bin Zainuddin',
  kategoriAsnaf: 'Miskin',
  warganegara: 'Malaysia',

  // Personal Details
  tarikhLahir: '1979-12-30',
  umur: 45,
  tempatLahir: 'Kuala Lumpur',
  jantina: 'Lelaki',
  agama: 'Islam',
  bangsa: 'Melayu',
  noTelefon: '0193456789',
  emel: 'hakim@gmail.com',

  // Marriage
  statusPerkahwinan: 'Berkahwin',
  statusPoligami: 'Tidak',

  // Conversion
  muallaf: false,

  // Health
  tahapKesihatan: 'Sihat',

  // Education
  masihBersekolah: false,
  pendidikanTertinggi: 'SPM',
  sijilPendidikan: ['SRP/PMR', 'SPM'],

  // Hostel/Rental (changed from tinggalKeluarga)
  alamatAsrama: '',
  negeriAsrama: '',
  daerahAsrama: '',
  bandarAsrama: '',
  poskodAsrama: '',

  // Skills
  kemahiran: ['Memasak'],

  // Address
  alamat: '',
  negeri: 'Selangor',
  daerah: 'Kuala Selangor',
  bandar: 'Shah Alam',
  poskod: '40100',
  kariah: 'Masjid Al-Taqwa',
  tempohMenetap: 0,
  unitTempoh: 'Bulan',
  kategoriKediaman: 'Musafir',

  // Housing
  statusKediaman: 'Milik Sendiri Tidak Berbayar',
  keadaanKediaman: 'Baik',

  // Banking
  namaBank: '',
  noAkaun: '',
  namaPemegang: '',

  // Loans
  institusiPinjaman: 'Bank Rakyat',
  jenisPinjaman: 'Pinjaman Peribadi',
  bayaranBulanan: 800,
  jumlahPinjaman: 150000,
  tarikhMulaPinjaman: '2020-01-01',
  tarikhTamatPinjaman: '2030-12-31',

  // Assets
  wangSimpanan: 500,
  emas: 0,
  saham: 0,
  kenderaan: [],
  rumahKedai: null,
  tanah: null,

  // Employment
  statusPekerjaan: 'Bekerja',
  sumberPendapatan: ['Sumbangan keluarga', 'Individu'],
  jenisPekerjaan: 'Pekerja Swasta',
  sektorPekerjaan: 'Kerajaan',
  jawatan: 'Pembantu Am',
  statusJawatan: 'Tetap',
  pendapatanKasar: 1800,

  // Income & Expenses
  gaji: 1500,
  pendapatanPasangan: 800,
  pencen: 0,
  sumbanganAnak: 200,
  bantuanJKM: 300,
  sewaRumah: 500,
  pendapatanLain: 0,

  perbelanjaanMakanan: 600,
  perbelanjaanSewa: null,
  perbelanjaanSekolah: 200,
  perbelanjaanPengangkutan: 100,
  perbelanjaanUtiliti: 200,
  jumlahBantuan: 2000,

  // Investigation
  kaedahSiasatan: '',
  catatanSiasatan: '',
  tingkahLakuAsnaf: '',
})

// Family members data
const familyMembers = ref([
  {
    noId: '060802030272',
    nama: 'NUR NAJWA BINTI ADNAN',
    kategori: 'Miskin',
    statusMultidimensi: 'Tidak Produktif',
    pelarasan: false
  },
  {
    noId: '091108030442',
    nama: 'NUR QISTINA BINTI ADNAN',
    kategori: 'Miskin',
    statusMultidimensi: 'Tidak Produktif',
    pelarasan: false
  },
  {
    noId: '770319035991',
    nama: 'Adnan bin Abu',
    kategori: 'Miskin',
    statusMultidimensi: 'Produktif C',
    pelarasan: false
  },
  {
    noId: '801004035672',
    nama: 'ROHANA BINTI AHMAD',
    kategori: 'Miskin',
    statusMultidimensi: 'Produktif C',
    pelarasan: false
  },
])

// Aid from agencies
const bantuanAgensi = ref([
  {
    nama: 'Program Kasih Siswa (dKasih)',
    jumlah: 1300,
    kekerapan: 'One-off',
    tahun: 2025,
    tarikh: '8/21/2025',
    sumber: 'ICU'
  },
  {
    nama: 'Sumbangan Asas Rahmah (SARA)',
    jumlah: 2100,
    kekerapan: 'Berkala',
    tahun: 2025,
    tarikh: '8/21/2025',
    sumber: 'ICU'
  },
])

// Existing aid
const bantuanSediaAda = ref([
  {
    jan: 'Jan Pendidikan Dialisis (Fakir)',
    kadar: 2800,
    frekuensi: 6,
    tarikhMula: '01/01/2024',
    tarikhTamat: '31/12/2024',
    jumlah: 16800,
    status: 'TIDAK LULUS'
  },
  {
    jan: 'Jan Sewaan/Ansuran Rumah (Fakir)',
    kadar: 800,
    frekuensi: 12,
    tarikhMula: '01/01/2024',
    tarikhTamat: '31/12/2024',
    jumlah: 9600,
    status: 'LULUS'
  },
])

// AI recommendations
const syorAI = ref([
  {
    aid: '[B103] (HQ) BANTUAN PERUBATAN DIALISIS (FAKIR)',
    aidProduct: '(HQ) KATEGORI HEMODIALISIS (FAKIR)',
    package: '(GL) (HQ) HEMODIALISIS DAN SUNTIKAN EPO (FAKIR)',
    entitlement: '(GL) (HQ) SUNTIKAN EPO (FAKIR)',
    kadar: 'RM 500.00/bulan',
    skor: '87%',
    tarikh: '2025-08-07',
    justifikasi: 'Asnaf mempunyai masalah kesihatan dan perlu menjalani rawatan dialisis',
    dipilih: false
  },
  {
    aid: '[B105] BANTUAN KEWANGAN BULANAN (FAKIR)',
    aidProduct: 'BANTUAN KEWANGAN BULANAN (FAKIR)',
    package: 'KEWANGAN BULANAN (FAKIR) - T2',
    entitlement: 'KEWANGAN BULANAN (FAKIR) - T2',
    kadar: 'RM 400.00',
    skor: '96%',
    tarikh: '2025-08-06',
    justifikasi: 'Bantuan Asasi untuk Fakir',
    dipilih: false
  },
  {
    aid: '[B106] BANTUAN MAKANAN BULANAN (FAKIR)',
    aidProduct: 'MAKANAN BULANAN (FAKIR)',
    package: 'MAKANAN BULANAN TERAS (FAKIR) - K2',
    entitlement: 'K2 FAKIR - (10KG BERAS, 2KG TEPUNG, 2KG MINYAK, 2KG GULA, 2 BIHUN, 1 KICAP)',
    kadar: 'RM 56.00',
    skor: '95%',
    tarikh: '2025-08-06',
    justifikasi: 'Bantuan Asasi untuk Fakir',
    dipilih: false
  },
])

// Personality records
const personalityRecords = ref([
  {
    tingkahLaku: 'Sangat Sopan - Bersikap hormat, menjawab soalan dengan jelas dan membawa dokumen lengkap',
    pegawai: 'Ahmad Firdaus Bin Azman',
    masa: '10:30 AM',
    tarikh: '15/01/2024'
  },
  {
    tingkahLaku: 'Baik - Kooperatif semasa temuduga, memberikan maklumat yang diperlukan dengan jujur',
    pegawai: 'Siti Khadijah Binti Othman',
    masa: '02:15 PM',
    tarikh: '08/12/2023'
  },
  {
    tingkahLaku: 'Agak Gelisah - Nampak nervous tetapi masih dapat menjawab soalan dengan baik',
    pegawai: 'Khalid Bin Zainal',
    masa: '09:45 AM',
    tarikh: '22/10/2023'
  },
])

// Methods
function switchTab(tab) {
  activeTab.value = tab
}

// Toggle section with accordion behavior
function toggleSection(section) {
  const wasCollapsed = collapsedSections.value[section]
  // Collapse all sections first
  Object.keys(collapsedSections.value).forEach(key => {
    collapsedSections.value[key] = true
  })
  // Expand clicked section if it was collapsed
  if (wasCollapsed) {
    collapsedSections.value[section] = false
  }
}

async function handleSave() {
  isSaving.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Data saved:', formData.value)
  } catch (error) {
    console.error('Save failed:', error)
  } finally {
    isSaving.value = false
  }
}

async function handleSubmit() {
  if (!canSubmit.value) return
  try {
    await handleSave()
    navigateTo('/tugasan')
  } catch (error) {
    console.error('Submit failed:', error)
  }
}

function handleBack() {
  navigateTo('/tugasan')
}

// Computed values
const totalPendapatan = computed(() => {
  return formData.value.gaji + formData.value.pendapatanPasangan +
    formData.value.pencen + formData.value.sumbanganAnak + formData.value.bantuanJKM +
    formData.value.sewaRumah + formData.value.pendapatanLain
})

const totalPerbelanjaan = computed(() => {
  return formData.value.perbelanjaanMakanan +
    (formData.value.perbelanjaanSewa || 0) + formData.value.perbelanjaanSekolah +
    formData.value.perbelanjaanPengangkutan + formData.value.perbelanjaanUtiliti
})

const baliPendapatan = computed(() => {
  return totalPendapatan.value - totalPerbelanjaan.value
})

const peratusanPerbezaan = computed(() => {
  return '50.81%'
})

const meritKeluarga = computed(() => {
  return '0.55'
})

const statusMultidimensi = computed(() => {
  return 'Produktif C'
})

const quadrant = computed(() => {
  return 'Asnaf Produktif Sementara'
})
</script>

<template>
  <div class="page-container">
    <LayoutsBreadcrumb />

    <!-- Page Header with Status -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Maklumat Siasatan
        </h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Rujukan: NAS-2025-0004
        </p>
      </div>
      <div class="flex items-center gap-3">
        <rs-badge variant="warning">DALAM SIASATAN</rs-badge>
      </div>
    </div>

    <!-- Main Layout: 70/30 Split -->
    <div class="grid grid-cols-12 gap-6">

      <!-- Left Column: Main Content (70%) -->
      <div class="col-span-12 lg:col-span-8">

        <!-- Tab Navigation -->
        <div class="mb-6">
          <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
            <button
              @click="switchTab('pemohon')"
              :class="[
                'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
                activeTab === 'pemohon'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              ]"
            >
              <Icon name="mdi:account" class="w-4 h-4 inline-block mr-2" />
              Maklumat Pemohon
            </button>
            <button
              @click="switchTab('syor')"
              :class="[
                'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
                activeTab === 'syor'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              ]"
            >
              <Icon name="mdi:chart-line" class="w-4 h-4 inline-block mr-2" />
              Syor Status
            </button>
            <button
              @click="switchTab('siasatan')"
              :class="[
                'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
                activeTab === 'siasatan'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              ]"
            >
              <Icon name="mdi:magnify" class="w-4 h-4 inline-block mr-2" />
              Maklumat Siasatan
            </button>
            <button
              @click="switchTab('kifayah')"
              :class="[
                'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
                activeTab === 'kifayah'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              ]"
            >
              <Icon name="mdi:cash-multiple" class="w-4 h-4 inline-block mr-2" />
              Had Kifayah
            </button>
            <button
              @click="switchTab('multidimensi')"
              :class="[
                'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
                activeTab === 'multidimensi'
                  ? 'border-primary text-primary bg-primary/5'
                  : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              ]"
            >
              <Icon name="mdi:chart-box" class="w-4 h-4 inline-block mr-2" />
              Multidimensi
            </button>
          </div>
        </div>

        <!-- Tab Content: Maklumat Pemohon -->
        <div v-show="activeTab === 'pemohon'" class="space-y-6">

          <!-- Section A: Maklumat Asas Pemohon (Combined) -->
          <rs-card>
            <template #header>
              <button @click="toggleSection('maklumatAsas')" class="w-full flex items-center justify-between text-left">
                <div class="flex items-center gap-3">
                  <h3 class="text-lg font-semibold">A. Maklumat Asas Pemohon</h3>
                  <rs-badge :variant="formData.kategoriAsnaf === 'Miskin' ? 'warning' : 'danger'">
                    {{ formData.kategoriAsnaf }}
                  </rs-badge>
                </div>
                <Icon :name="collapsedSections.maklumatAsas ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.maklumatAsas">
              <div class="space-y-8">

                <!-- I. Maklumat Peribadi -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">I. Maklumat Peribadi</h4>
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Jenis ID" v-model="formData.jenisId" :options="['MyKad', 'Foreign ID']" />
                      <FormKit type="text" label="ID Pengenalan" v-model="formData.noId" :disabled="true" />
                    </div>

                    <FormKit type="text" label="Nama Penuh" v-model="formData.nama" />

                    <FormKit type="file" label="Upload MyKad" help="Format: PDF, JPG, PNG" accept=".pdf,.jpg,.jpeg,.png" />

                    <FormKit type="select" label="Warganegara" v-model="formData.warganegara" :options="['Malaysia', 'Lain-lain']" />

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormKit type="date" label="Tarikh Lahir" v-model="formData.tarikhLahir" />
                      <FormKit type="number" label="Umur" v-model="formData.umur" :disabled="true" />
                      <FormKit type="select" label="Jantina" v-model="formData.jantina" :options="['Lelaki', 'Perempuan']" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="text" label="Tempat Lahir" v-model="formData.tempatLahir" />
                      <FormKit type="select" label="Agama" v-model="formData.agama" :options="['Islam', 'Kristian', 'Buddha', 'Hindu', 'Lain-lain']" />
                    </div>

                    <FormKit type="select" label="Bangsa" v-model="formData.bangsa" :options="['Melayu', 'Cina', 'India', 'Lain-lain']" />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="tel" label="No. Telefon Bimbit" v-model="formData.noTelefon" />
                      <FormKit type="email" label="Emel" v-model="formData.emel" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Status Perkahwinan" v-model="formData.statusPerkahwinan" :options="['Berkahwin', 'Bujang', 'Janda', 'Duda', 'Balu', 'Ibu Tinggal', 'Bapa Tinggal']" />
                      <FormKit type="select" label="Status Poligami" v-model="formData.statusPoligami" :options="['Tidak', 'Ya']" />
                    </div>
                  </div>
                </div>

                <!-- II. Maklumat Perbankan -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">II. Maklumat Perbankan</h4>
                  <div class="space-y-4">
                    <FormKit
                      type="radio"
                      label="Adakah anda muflis/disenarai hitam oleh bank?"
                      v-model="statusMuflis"
                      :options="[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false }
                      ]"
                    />

                    <!-- Show banking fields only if NOT muflis -->
                    <div v-if="!statusMuflis" class="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <FormKit type="text" label="Nama Bank" v-model="formData.namaBank" />
                      <FormKit type="text" label="No Akaun Bank" v-model="formData.noAkaun" />
                      <FormKit type="text" label="Nama Pemegang Akaun" v-model="formData.namaPemegang" />
                    </div>
                  </div>
                </div>

                <!-- III. Maklumat Pengislaman -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">III. Maklumat Pengislaman</h4>
                  <FormKit
                    type="radio"
                    label="Adakah anda seorang Muallaf?"
                    v-model="formData.muallaf"
                    :options="[
                      { label: 'Ya', value: true },
                      { label: 'Tidak', value: false }
                    ]"
                  />
                </div>

                <!-- IV. Maklumat Kesihatan -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">IV. Maklumat Kesihatan</h4>
                  <FormKit
                    type="select"
                    label="Tahap Kesihatan"
                    v-model="formData.tahapKesihatan"
                    :options="['Sihat', 'Sakit Kronik', 'OKU', 'Uzur']"
                  />
                </div>

                <!-- V. Alamat Kediaman -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">V. Alamat Kediaman</h4>
                  <div class="space-y-4">
                    <FormKit type="textarea" label="Alamat" v-model="formData.alamat" rows="2" />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Negeri" v-model="formData.negeri" :options="['Selangor', 'Wilayah Persekutuan', 'Perak']" />
                      <FormKit type="select" label="Daerah" v-model="formData.daerah" :options="['Kuala Selangor', 'Petaling', 'Gombak']" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Bandar" v-model="formData.bandar" :options="['Shah Alam', 'Subang Jaya', 'Rawang']" />
                      <FormKit type="select" label="Poskod" v-model="formData.poskod" :options="['40100', '40000', '47810']" />
                    </div>

                    <FormKit type="select" label="Kariah" v-model="formData.kariah" :options="['Masjid Al-Taqwa', 'Masjid Negeri', 'Masjid Al-Ikhlas']" />

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium mb-2">Tempoh Menetap di Selangor</label>
                        <div class="flex gap-2">
                          <FormKit type="number" v-model="formData.tempohMenetap" outer-class="!mb-0 flex-1" />
                          <FormKit type="select" v-model="formData.unitTempoh" :options="['Hari', 'Bulan', 'Tahun']" outer-class="!mb-0 w-32" />
                        </div>
                      </div>
                      <FormKit type="select" label="Kategori" v-model="formData.kategoriKediaman" :options="['Musafir', 'Mukim', 'Bermastautin']" />
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Status Kediaman" v-model="formData.statusKediaman" :options="['Milik Sendiri Tidak Berbayar', 'Milik Sendiri Berbayar', 'Sewa', 'Kuarters Majikan', 'Tumpang Rumah Ibu/Bapa/Mertua', 'Pusaka', 'Sumbangan LZS / PPRT / RISDA', 'Lain-lain']" />
                      <FormKit type="select" label="Keadaan Kediaman" v-model="formData.keadaanKediaman" :options="['Baik', 'Sempurna', 'Uzur', 'Separa Uzur']" />
                    </div>
                  </div>
                </div>

              </div>
            </template>
          </rs-card>

          <!-- Section B: Pendidikan & Kemahiran (Combined) -->
          <rs-card>
            <template #header>
              <button @click="toggleSection('pendidikanKemahiran')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">B. Pendidikan & Kemahiran</h3>
                <Icon :name="collapsedSections.pendidikanKemahiran ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pendidikanKemahiran">
              <div class="space-y-8">

                <!-- I. Maklumat Pendidikan -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">I. Maklumat Pendidikan</h4>
                  <div class="space-y-4">
                    <FormKit
                      type="radio"
                      label="Masih Bersekolah?"
                      v-model="formData.masihBersekolah"
                      :options="[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false }
                      ]"
                    />

                    <FormKit type="select" label="Pendidikan Tertinggi" v-model="formData.pendidikanTertinggi" :options="['Peringkat Rendah', 'SRP/PMR', 'SPM', 'Sijil', 'Diploma', 'STPM', 'Ijazah', 'Lain-lain']" />

                    <FormKit type="checkbox" label="Tahap Pendidikan yang Dicapai" v-model="formData.sijilPendidikan" :options="['Peringkat Rendah', 'SRP/PMR', 'SPM', 'Sijil', 'Diploma', 'STPM', 'Ijazah', 'Lain-lain']" />

                    <!-- New: Tinggal di asrama/rumah sewa -->
                    <FormKit
                      type="radio"
                      label="Adakah tinggal di asrama/rumah sewa?"
                      v-model="tinggalAsrama"
                      :options="[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false }
                      ]"
                    />

                    <!-- Show address fields if tinggal asrama -->
                    <div v-if="tinggalAsrama" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                      <FormKit type="textarea" label="Alamat Asrama/Rumah Sewa/Baitul" v-model="formData.alamatAsrama" rows="2" />
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="text" label="Negeri" v-model="formData.negeriAsrama" />
                        <FormKit type="text" label="Daerah" v-model="formData.daerahAsrama" />
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="text" label="Bandar" v-model="formData.bandarAsrama" />
                        <FormKit type="text" label="Poskod" v-model="formData.poskodAsrama" />
                      </div>
                    </div>

                    <FormKit type="file" label="Upload Sijil Pendidikan" help="Format: PDF, JPG, JPEG, PNG" accept=".pdf,.jpg,.jpeg,.png" multiple />
                  </div>
                </div>

                <!-- II. Kemahiran -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">II. Kemahiran</h4>
                  <div class="space-y-4">
                    <FormKit
                      type="radio"
                      label="Ada kemahiran atau tidak?"
                      v-model="adaKemahiran"
                      :options="[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false }
                      ]"
                    />

                    <!-- Show kemahiran options only if ada kemahiran -->
                    <div v-if="adaKemahiran">
                      <FormKit
                        type="checkbox"
                        label="Kemahiran yang Dimiliki"
                        v-model="formData.kemahiran"
                        :options="['Nelayan', 'Penternakan', 'Pertanian', 'Menjahit', 'Kraftangan', 'Memasak', 'Mengasuh', 'Perkhidmatan', 'Pertukangan', 'Perniagaan', 'Lain-lain']"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </template>
          </rs-card>

          <!-- Section C: Pinjaman & Pemilikan Aset (Combined) -->
          <rs-card>
            <template #header>
              <button @click="toggleSection('pinjamanAset')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">C. Pinjaman & Pemilikan Aset</h3>
                <Icon :name="collapsedSections.pinjamanAset ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pinjamanAset">
              <div class="space-y-8">

                <!-- I. Pinjaman -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">I. Maklumat Pinjaman</h4>
                  <div class="space-y-4">
                    <FormKit
                      type="radio"
                      label="Ada pinjaman atau tidak?"
                      v-model="adaPinjaman"
                      :options="[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false }
                      ]"
                    />

                    <!-- Show pinjaman fields only if ada pinjaman -->
                    <div v-if="adaPinjaman" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                      <FormKit type="text" label="Nama Institusi / Individu Pemberi Pinjaman" v-model="formData.institusiPinjaman" />
                      <FormKit type="text" label="Jenis Pinjaman" v-model="formData.jenisPinjaman" />
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="number" label="Amaun Bayaran Bulanan (RM)" v-model="formData.bayaranBulanan" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Jumlah Keseluruhan Perbelanjaan (RM)" v-model="formData.jumlahPinjaman" prefix-icon="currency-usd" />
                      </div>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="date" label="Tahun Mula Pinjaman" v-model="formData.tarikhMulaPinjaman" />
                        <FormKit type="date" label="Tahun Akhir Pinjaman" v-model="formData.tarikhTamatPinjaman" />
                      </div>
                      <FormKit type="file" label="Dokumen Perjanjian Pinjaman" help="Format: PDF, JPG, PNG. Max: 5MB" accept=".pdf,.jpg,.png" />
                    </div>
                  </div>
                </div>

                <!-- II. Pemilikan Aset -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">II. Pemilikan Aset</h4>
                  <div class="space-y-4">
                    <FormKit
                      type="radio"
                      label="Ada aset atau tidak?"
                      v-model="adaAset"
                      :options="[
                        { label: 'Ya', value: true },
                        { label: 'Tidak', value: false }
                      ]"
                    />

                    <!-- Show aset fields only if ada aset -->
                    <div v-if="adaAset" class="space-y-4">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Aset Cair -->
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                          <h5 class="font-semibold text-sm">Aset Cair</h5>
                          <FormKit type="number" label="Jumlah wang simpanan (RM)" v-model="formData.wangSimpanan" prefix-icon="currency-usd" />
                          <FormKit type="number" label="Emas (gram)" v-model="formData.emas" />
                          <FormKit type="number" label="Saham (RM)" v-model="formData.saham" prefix-icon="currency-usd" />
                        </div>

                        <!-- Aset Tidak Cair -->
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                          <h5 class="font-semibold text-sm">Aset Tidak Cair</h5>
                          <FormKit type="checkbox" label="Jenis Kenderaan" v-model="formData.kenderaan" :options="['Basikal', 'Kereta', 'Motosikal', 'Van', 'Lori']" />
                          <FormKit type="number" label="Rumah Kedai (unit)" v-model="formData.rumahKedai" />
                          <FormKit type="number" label="Tanah/Sawah (ekar)" v-model="formData.tanah" />
                        </div>
                      </div>

                      <FormKit type="file" label="Upload dokumen pemilikan" help="Wajib jika ada wang simpanan > 0, rumah kedai > 0, atau tanah/sawah > 0" accept=".pdf,.jpg,.png" />
                    </div>
                  </div>
                </div>

              </div>
            </template>
          </rs-card>

          <!-- Section D: Pekerjaan & Kewangan (Combined) -->
          <rs-card>
            <template #header>
              <button @click="toggleSection('pekerjaanKewangan')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">D. Pekerjaan & Kewangan</h3>
                <Icon :name="collapsedSections.pekerjaanKewangan ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pekerjaanKewangan">
              <div class="space-y-8">

                <!-- I. Status Pekerjaan -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">I. Status Pekerjaan</h4>
                  <div class="space-y-4">
                    <FormKit
                      type="radio"
                      label="Status Pekerjaan"
                      v-model="formData.statusPekerjaan"
                      :options="[
                        { label: 'Bekerja', value: 'Bekerja' },
                        { label: 'Tidak Bekerja', value: 'Tidak Bekerja' }
                      ]"
                    />
                    <FormKit
                      type="checkbox"
                      label="Sumber Pendapatan"
                      v-model="formData.sumberPendapatan"
                      :options="['Pengajian', 'Sumbangan keluarga', 'Individu', 'Institusi', 'Sumbangan Agensi', 'Lain-lain']"
                    />
                  </div>
                </div>

                <!-- II. Butiran Pekerjaan (if Bekerja) -->
                <div v-if="formData.statusPekerjaan === 'Bekerja'">
                  <h4 class="text-base font-semibold mb-4 text-primary">II. Butiran Pekerjaan</h4>
                  <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="text" label="Jenis Pekerjaan" v-model="formData.jenisPekerjaan" />
                      <FormKit type="select" label="Sektor Pekerjaan" v-model="formData.sektorPekerjaan" :options="['Kerajaan', 'Swasta', 'Badan Berkanun', 'Kerja Sendiri', 'Lain-lain']" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="text" label="Jawatan" v-model="formData.jawatan" />
                      <FormKit type="select" label="Status Jawatan" v-model="formData.statusJawatan" :options="['Tetap', 'Kontrak', 'Sementara']" />
                    </div>
                    <FormKit type="number" label="Pendapatan Kasar (RM)" v-model="formData.pendapatanKasar" prefix-icon="currency-usd" />
                    <FormKit type="file" label="Muat naik pengesahan pendapatan / penyata gaji ketua keluarga" accept=".pdf,.jpg,.png" />
                  </div>
                </div>

                <!-- III. Pendapatan & Perbelanjaan (Side by Side) -->
                <div>
                  <h4 class="text-base font-semibold mb-4 text-primary">III. Pendapatan & Perbelanjaan</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <!-- Pendapatan Column -->
                    <div class="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <h5 class="font-semibold text-sm mb-4 text-green-700 dark:text-green-300">Pendapatan Bulanan</h5>
                      <div class="space-y-3">
                        <FormKit type="number" label="Gaji / Elaun / Pendapatan Diperoleh" v-model="formData.gaji" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Pendapatan Isteri/Suami/Ibubapa/Penjaga" v-model="formData.pendapatanPasangan" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Pencen / PERKESO" v-model="formData.pencen" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Sumbangan Anak-anak" v-model="formData.sumbanganAnak" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Bantuan Jabatan Kebajikan Masyarakat" v-model="formData.bantuanJKM" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Sewa Rumah / Tanah / Kedai" v-model="formData.sewaRumah" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Pendapatan Lain-lain" v-model="formData.pendapatanLain" prefix-icon="currency-usd" />

                        <!-- Total Pendapatan - EOAD View Only -->
                        <div class="pt-3 border-t border-green-200 dark:border-green-800">
                          <div class="flex justify-between items-center">
                            <span class="text-sm font-semibold">Total Pendapatan:</span>
                            <span class="text-lg font-bold text-green-700 dark:text-green-300">RM{{ totalPendapatan }}</span>
                          </div>
                          <p class="text-xs text-gray-400 mt-1">(EOAD view only)</p>
                        </div>
                      </div>
                    </div>

                    <!-- Perbelanjaan Column -->
                    <div class="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
                      <h5 class="font-semibold text-sm mb-4 text-red-700 dark:text-red-300">Perbelanjaan Bulanan</h5>
                      <div class="space-y-3">
                        <FormKit type="number" label="Perbelanjaan Makanan dan Minuman" v-model="formData.perbelanjaanMakanan" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Sewa / Bayaran Pinjaman Perumahan" v-model="formData.perbelanjaanSewa" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Perbelanjaan Persekolahan Anak" v-model="formData.perbelanjaanSekolah" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Pengangkutan / Tambang Bas Sekolah" v-model="formData.perbelanjaanPengangkutan" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Bil Utiliti" v-model="formData.perbelanjaanUtiliti" prefix-icon="currency-usd" />
                        <FormKit type="number" label="Jumlah Bantuan Diterima" v-model="formData.jumlahBantuan" prefix-icon="currency-usd" />

                        <!-- Total Perbelanjaan - EOAD View Only -->
                        <div class="pt-3 border-t border-red-200 dark:border-red-800">
                          <div class="flex justify-between items-center">
                            <span class="text-sm font-semibold">Total Perbelanjaan:</span>
                            <span class="text-lg font-bold text-red-700 dark:text-red-300">RM{{ totalPerbelanjaan }}</span>
                          </div>
                          <p class="text-xs text-gray-400 mt-1">(EOAD view only)</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </template>
          </rs-card>

        </div>

        <!-- Tab Content: Syor Status -->
        <div v-show="activeTab === 'syor'" class="space-y-6">

          <!-- Syor AI Summary -->
          <rs-card>
            <template #header>
              <h3 class="text-lg font-semibold">Maklumat Syor</h3>
            </template>
            <template #body>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Peratusan Perbezaan</p>
                  <p class="text-2xl font-bold text-primary">{{ peratusanPerbezaan }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Kategori Keluarga Asnaf</p>
                  <p class="text-xl font-semibold">{{ formData.kategoriAsnaf }}</p>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- Family Members Table -->
          <rs-card>
            <template #header>
              <h4 class="text-lg font-semibold">Pengesahan Status</h4>
            </template>
            <template #body>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th class="px-3 py-2.5 text-left font-semibold">No.</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Pengenalan ID</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Nama</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Kategori</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Status Multidimensi</th>
                      <th class="px-3 py-2.5 text-center font-semibold">Pelarasan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(member, index) in familyMembers" :key="index" class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td class="px-3 py-3">{{ index + 1 }}</td>
                      <td class="px-3 py-3">{{ member.noId }}</td>
                      <td class="px-3 py-3">
                        <input type="text" v-model="member.nama" class="form-control" />
                      </td>
                      <td class="px-3 py-3">
                        <select v-model="member.kategori" class="form-control">
                          <option>Miskin</option>
                          <option>Fakir</option>
                        </select>
                      </td>
                      <td class="px-3 py-3">
                        <select v-model="member.statusMultidimensi" class="form-control">
                          <option>Tidak Produktif</option>
                          <option>Produktif C</option>
                          <option>Produktif B</option>
                          <option>Produktif A</option>
                        </select>
                      </td>
                      <td class="px-3 py-3 text-center">
                        <input type="checkbox" v-model="member.pelarasan" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Merit Keluarga (Syor)</p>
                  <p class="text-lg font-bold">{{ meritKeluarga }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Status Multidimensi Keluarga (Syor)</p>
                  <p class="text-lg font-semibold">{{ statusMultidimensi }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Quadrant Multidimensi Keluarga (Syor)</p>
                  <p class="text-lg font-semibold">{{ quadrant }}</p>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- Personaliti Asnaf -->
          <rs-card>
            <template #header>
              <h4 class="text-lg font-semibold">Personaliti Asnaf</h4>
            </template>
            <template #body>
              <div class="overflow-x-auto mb-4">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th class="px-3 py-2.5 text-left font-semibold">Tingkah Laku Asnaf</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Nama Pegawai</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Masa</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Tarikh</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(record, index) in personalityRecords" :key="index" class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td class="px-3 py-3">{{ record.tingkahLaku }}</td>
                      <td class="px-3 py-3">{{ record.pegawai }}</td>
                      <td class="px-3 py-3">{{ record.masa }}</td>
                      <td class="px-3 py-3">{{ record.tarikh }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <FormKit
                type="textarea"
                label="Tingkah Laku Asnaf"
                v-model="formData.tingkahLakuAsnaf"
                rows="3"
                validation="required"
              />
            </template>
          </rs-card>

        </div>

        <!-- Tab Content: Maklumat Siasatan -->
        <div v-show="activeTab === 'siasatan'" class="space-y-6">

          <!-- Profile Summary -->
          <rs-card>
            <template #header>
              <h4 class="text-lg font-semibold">Ringkasan Profil</h4>
            </template>
            <template #body>
              <ul class="space-y-2 text-sm">
                <li>• Jenis Pekerjaan: {{ formData.jenisPekerjaan }}</li>
                <li>• Status Kediaman: {{ formData.statusKediaman }}</li>
                <li>• Jumlah bayaran rumah: RM{{ formData.perbelanjaanSewa || 0 }}</li>
                <li>• Bil Tanggungan: {{ familyMembers.length }} Orang</li>
                <li>• Status Tanggungan: {{ familyMembers.filter(m => m.statusMultidimensi === 'Tidak Produktif').length }} tidak produktif</li>
              </ul>
            </template>
          </rs-card>

          <!-- Bantuan daripada Agensi -->
          <rs-card>
            <template #header>
              <h4 class="text-lg font-semibold">Bantuan daripada Agensi</h4>
            </template>
            <template #body>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th class="px-3 py-2.5 text-left font-semibold">No.</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Nama Bantuan</th>
                      <th class="px-3 py-2.5 text-right font-semibold">Jumlah (RM)</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Kekerapan</th>
                      <th class="px-3 py-2.5 text-center font-semibold">Tahun</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Tarikh Data Diperoleh</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Data Daripada</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(bantuan, index) in bantuanAgensi" :key="index" class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td class="px-3 py-3">{{ index + 1 }}</td>
                      <td class="px-3 py-3">{{ bantuan.nama }}</td>
                      <td class="px-3 py-3 text-right">RM {{ bantuan.jumlah.toLocaleString() }}</td>
                      <td class="px-3 py-3">{{ bantuan.kekerapan }}</td>
                      <td class="px-3 py-3 text-center">{{ bantuan.tahun }}</td>
                      <td class="px-3 py-3">{{ bantuan.tarikh }}</td>
                      <td class="px-3 py-3">{{ bantuan.sumber }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </rs-card>

          <!-- Bantuan Sedia Ada -->
          <rs-card>
            <template #header>
              <h4 class="text-lg font-semibold">Bantuan Sedia Ada</h4>
            </template>
            <template #body>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th class="px-3 py-2.5 text-left font-semibold">No.</th>
                      <th class="px-3 py-2.5 text-left font-semibold">JAN</th>
                      <th class="px-3 py-2.5 text-right font-semibold">Kadar (RM)</th>
                      <th class="px-3 py-2.5 text-center font-semibold">Frekuensi</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Tarikh Mula</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Tarikh Tamat</th>
                      <th class="px-3 py-2.5 text-right font-semibold">Jumlah (RM)</th>
                      <th class="px-3 py-2.5 text-center font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(bantuan, index) in bantuanSediaAda" :key="index" class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td class="px-3 py-3">{{ index + 1 }}</td>
                      <td class="px-3 py-3">{{ bantuan.jan }}</td>
                      <td class="px-3 py-3 text-right">RM {{ bantuan.kadar.toLocaleString() }}</td>
                      <td class="px-3 py-3 text-center">{{ bantuan.frekuensi }}</td>
                      <td class="px-3 py-3">{{ bantuan.tarikhMula }}</td>
                      <td class="px-3 py-3">{{ bantuan.tarikhTamat }}</td>
                      <td class="px-3 py-3 text-right">RM {{ bantuan.jumlah.toLocaleString() }}</td>
                      <td class="px-3 py-3 text-center">
                        <rs-badge :variant="bantuan.status === 'LULUS' ? 'success' : 'danger'">
                          {{ bantuan.status }}
                        </rs-badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </template>
          </rs-card>

          <!-- Syor AI -->
          <rs-card>
            <template #header>
              <div class="flex justify-between items-center">
                <h4 class="text-lg font-semibold">Syor AI</h4>
                <rs-button size="sm" @click="() => syorAI.forEach(s => s.dipilih = !syorAI.every(x => x.dipilih))">
                  {{ syorAI.every(s => s.dipilih) ? 'Nyahpilih Semua' : 'Pilih Semua' }}
                </rs-button>
              </div>
            </template>
            <template #body>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th class="px-3 py-2.5 text-center font-semibold">
                        <input type="checkbox"
                          :checked="syorAI.every(s => s.dipilih)"
                          @change="() => syorAI.forEach(s => s.dipilih = !syorAI.every(x => x.dipilih))"
                        />
                      </th>
                      <th class="px-3 py-2.5 text-left font-semibold">No.</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Aid</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Aid Product</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Kadar Dicadangkan</th>
                      <th class="px-3 py-2.5 text-center font-semibold">Skor AI</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Tarikh Syor</th>
                      <th class="px-3 py-2.5 text-left font-semibold">Justifikasi Syor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(syor, index) in syorAI" :key="index" class="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td class="px-3 py-3 text-center">
                        <input type="checkbox" v-model="syor.dipilih" />
                      </td>
                      <td class="px-3 py-3">{{ index + 1 }}</td>
                      <td class="px-3 py-3">{{ syor.aid }}</td>
                      <td class="px-3 py-3">{{ syor.aidProduct }}</td>
                      <td class="px-3 py-3">{{ syor.kadar }}</td>
                      <td class="px-3 py-3 text-center">
                        <rs-badge variant="success">{{ syor.skor }}</rs-badge>
                      </td>
                      <td class="px-3 py-3">{{ syor.tarikh }}</td>
                      <td class="px-3 py-3">{{ syor.justifikasi }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="mt-4 flex justify-end">
                <rs-button variant="primary">Sahkan</rs-button>
              </div>
            </template>
          </rs-card>

          <!-- Investigation Method -->
          <rs-card>
            <template #body>
              <div class="space-y-4">
                <FormKit
                  type="select"
                  label="Kaedah Siasatan"
                  v-model="formData.kaedahSiasatan"
                  :options="['--Sila Pilih--', 'Semak Dokumen Sahaja', 'Telefon', 'Lapangan']"
                  validation="required"
                />
                <FormKit
                  type="textarea"
                  label="Catatan Siasatan"
                  v-model="formData.catatanSiasatan"
                  rows="4"
                />
              </div>
            </template>
          </rs-card>

        </div>

        <!-- Tab Content: Had Kifayah -->
        <div v-show="activeTab === 'kifayah'" class="space-y-6">
          <rs-card>
            <template #header>
              <h4 class="text-lg font-semibold">Had Kifayah</h4>
            </template>
            <template #body>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Baki Pendapatan:</span>
                  <span :class="[
                    'font-semibold',
                    baliPendapatan < 0 ? 'text-red-600' : 'text-green-600'
                  ]">
                    RM{{ baliPendapatan }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Peratusan Perbezaan:</span>
                  <span class="font-semibold">{{ peratusanPerbezaan }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Kategori Keluarga Asnaf:</span>
                  <span class="font-semibold">{{ formData.kategoriAsnaf }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Kategori Asnaf:</span>
                  <span class="font-semibold">{{ formData.kategoriAsnaf }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Jumlah Had Kifayah:</span>
                  <span class="font-semibold">RM1,968.00</span>
                </div>
              </div>
            </template>
          </rs-card>
        </div>

        <!-- Tab Content: Multidimensi -->
        <div v-show="activeTab === 'multidimensi'" class="space-y-6">
          <rs-card>
            <template #header>
              <h4 class="text-lg font-semibold">Multidimensi</h4>
            </template>
            <template #body>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Merit Keluarga:</span>
                  <span class="font-semibold">{{ meritKeluarga }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Status Multidimensi:</span>
                  <span class="font-semibold">{{ statusMultidimensi }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600 dark:text-gray-400">Quadrant:</span>
                  <span class="font-semibold">{{ quadrant }}</span>
                </div>
              </div>
            </template>
          </rs-card>
        </div>

      </div>

      <!-- Right Column: Sidebar (30%) -->
      <div class="col-span-12 lg:col-span-4">
        <div class="space-y-4 lg:sticky lg:top-6">

          <!-- Quick Summary Card -->
          <rs-card>
            <template #header>
              <h4 class="text-lg font-semibold">Ringkasan Profil</h4>
            </template>
            <template #body>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Nama</p>
                  <p class="text-sm font-semibold">{{ formData.nama }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">No. ID</p>
                  <p class="text-sm font-semibold">{{ formData.noId }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Kategori</p>
                  <rs-badge :variant="formData.kategoriAsnaf === 'Miskin' ? 'warning' : 'danger'">
                    {{ formData.kategoriAsnaf }}
                  </rs-badge>
                </div>
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Tanggungan</p>
                  <p class="text-sm font-semibold">{{ familyMembers.length }} orang</p>
                </div>
                <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p class="text-xs text-gray-600 dark:text-gray-400">Jumlah Pendapatan Kasar Keluarga</p>
                  <p :class="[
                    'text-lg font-bold',
                    baliPendapatan < 0 ? 'text-red-600' : 'text-green-600'
                  ]">
                    RM{{ baliPendapatan }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Merit Keluarga</p>
                  <p class="text-sm font-semibold">{{ meritKeluarga }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-600 dark:text-gray-400">Status Multidimensi</p>
                  <p class="text-sm font-semibold">{{ statusMultidimensi }}</p>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- Action Buttons -->
          <rs-card>
            <template #body>
              <div class="space-y-3">
                <rs-button
                  variant="primary"
                  class="w-full"
                  :loading="isSaving"
                  @click="handleSave"
                >
                  <Icon name="mdi:content-save" class="w-4 h-4 mr-2" />
                  Simpan
                </rs-button>
                <rs-button
                  variant="success"
                  class="w-full"
                  :disabled="!canSubmit"
                  :class="{ 'opacity-50 cursor-not-allowed': !canSubmit }"
                  @click="handleSubmit"
                >
                  <Icon name="mdi:send" class="w-4 h-4 mr-2" />
                  Hantar Kelulusan
                </rs-button>
                <rs-button
                  variant="secondary"
                  class="w-full"
                  @click="handleBack"
                >
                  <Icon name="mdi:arrow-left" class="w-4 h-4 mr-2" />
                  Kembali
                </rs-button>
              </div>
            </template>
          </rs-card>

        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.page-container {
  padding: 1.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.dark .form-control {
  border-color: #4b5563;
  background-color: #1f2937;
  color: #f3f4f6;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
}
</style>
