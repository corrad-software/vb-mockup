<script setup>
definePageMeta({
  title: "Profil Asnaf Lengkap",
  middleware: ["auth"],
  requiresAuth: true,
  breadcrumb: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profiling", path: "/profiling" },
    { name: "Pendaftaran Lengkap", path: "/mockup-asnaf-profiling" },
  ],
})

const currentStep = ref(1) // 1: Maklumat Pemohon, 2: Tanggungan, 3: Penilaian Awal
const isSaving = ref(false)
const showSuccess = ref(false)

const applicantData = ref({
  // 1. Peribadi
  jenisId: 'Kad Pengenalan', noId: '', nama: '',
  tarikhLahir: '', umur: 0, jantina: 'Lelaki',
  agama: 'Islam', bangsa: 'Melayu', warganegara: 'Warganegara',
  noTelefon: '', emel: '',
  statusPerkahwinan: 'Berkahwin', bilIsteri: 0, bilAnak: 0,

  // 2. Alamat
  alamat1: '', alamat2: '', alamat3: '',
  poskod: '', bandar: '', daerah: '', negeri: 'Selangor',
  statusKediaman: 'Milik Sendiri', tapakRumah: 'Milik Sendiri',
  jenisRumah: 'Kos Rendah', binaanRumah: 'Batu',
  bilBilik: 0, keadaanRumah: 'Baik',

  // 3. Pendidikan
  tahapPendidikan: 'SPM', institusiPendidikan: '',
  bidangPengajian: '', tahunTamat: '',

  // 4. Pengislaman (Muallaf)
  isMuallaf: 'Tidak', namaSebelumIslam: '', namaSelepasIslam: '',
  tarikhMasukIslam: '', tempatMasukIslam: '',
  tarikhMasukKFAM: '', statusKFAM: '',

  // 5. Perbankan
  adaAkaunBank: 'Ya',
  sebabTiadaAkaunBank: '', // Conditional: if adaAkaunBank = Tidak
  namaBank: '', noAkaunBank: '', namaPemegangAkaun: '',

  // 6. Kesihatan
  tahapKesihatan: 'Sihat',
  // OKU specific
  jenisMasalahKesihatan: '', kadOKU: '', kategoriOKU: '',
  tahapKecacatan: '', jumlahPerbelanjaanOKU: 0,
  // Sakit Kronik specific
  jenisPenyakit: '', tempohSakit: '', kosRawatan: 0,

  // 7. Kemahiran
  kemahiran: [],

  // 8. Pinjaman
  adaPinjaman: 'Tidak',
  institusiPinjaman: '', jenisPinjaman: '',
  jumlahPinjaman: 0, bayaranBulanan: 0,
  bakinPinjaman: 0, tempohBayaran: 0,

  // 9. Pemilikan Aset
  // Aset Cair
  wangSimpanan: 0, simpananASB: 0, simpananTabung: 0,
  emas: 0, saham: 0,
  // Aset Tidak Cair
  kenderaan: [], rumahKedai: 0, tanah: 0,
  ternakan: '', perniagaan: '',

  // 10. Pekerjaan
  statusPekerjaan: 'Bekerja',
  jenisPekerjaan: '', namaMajikan: '', alamatMajikan: '',
  jawatan: '', sektorPekerjaan: 'Swasta',
  tempohBekerja: 0, statusJawatan: 'Tetap',

  // 11. Pendapatan & Perbelanjaan
  pendapatanBulanan: 0, pendapatanPasangan: 0,
  pendapatanLain: 0, sumberPendapatanLain: '',
  jumlahPendapatan: 0,
  // Perbelanjaan
  belanjaanMakanan: 0, belanjaanUtiliti: 0, belanjaanPengangkutan: 0,
  belanjaanPerubatan: 0, belanjaanPendidikan: 0, belanjaanSewa: 0,
  belanjaanLain: 0, jumlahBelanjaan: 0,

  // Pengesahan
  hubunganKekeluargaanLZS: 'Tidak', pengesahanPDPA: 'Setuju',

  // Pengesahan Bermastautin (filled after upload)
  dokumenPengesahanBermastautin: null,
  dokumenPengesahanPendapatan: null,
  namaPegawaiPengesah: '', jawatanPegawai: '',
  noTelefonPegawai: '', tarikhPengesahan: '',
})

// Waris List (now addable)
const warisList = ref([])

// Penilaian Awal (Step C)
const penilaianAwal = ref({
  komitmenKosTinggi: 'Tidak',
  keperluanMendesak: '',
})

const tanggunganList = ref([])
const jumlahTanggungan = ref(0)
const showAddTanggunganModal = ref(false)
const newTanggungan = ref({ nama: '', tarikhLahir: '' })
const editingTanggunganId = ref(null)
const isFormReadOnly = ref(false)

// Collapsible sections state - Start with all sections COLLAPSED
const collapsedSections = ref({
  peribadi: true,
  alamat: true,
  pendidikan: true,
  pengislaman: true,
  perbankan: true,
  kesihatan: true,
  kemahiran: true,
  pinjaman: true,
  pemilikan: true,
  pekerjaan: true,
  pendapatanBelanjaan: true,
  pengesahan: true,
  pengesahanBermastautin: true,
})

// Computed for banking conditional field
const showSebabTiadaBank = computed(() => applicantData.value.adaAkaunBank === 'Tidak')

// Computed for Muallaf fields
const showMuallapFields = computed(() => applicantData.value.isMuallaf === 'Ya')

// Computed for Pinjaman fields
const showPinjamanFields = computed(() => applicantData.value.adaPinjaman === 'Ya')

// Computed for Pekerjaan fields
const showPekerjaanFields = computed(() => applicantData.value.statusPekerjaan === 'Bekerja')

// Auto-calculate total pendapatan
watch([
  () => applicantData.value.pendapatanBulanan,
  () => applicantData.value.pendapatanPasangan,
  () => applicantData.value.pendapatanLain
], () => {
  applicantData.value.jumlahPendapatan =
    (applicantData.value.pendapatanBulanan || 0) +
    (applicantData.value.pendapatanPasangan || 0) +
    (applicantData.value.pendapatanLain || 0)
})

// Auto-calculate total belanjaan
watch([
  () => applicantData.value.belanjaanMakanan,
  () => applicantData.value.belanjaanUtiliti,
  () => applicantData.value.belanjaanPengangkutan,
  () => applicantData.value.belanjaanPerubatan,
  () => applicantData.value.belanjaanPendidikan,
  () => applicantData.value.belanjaanSewa,
  () => applicantData.value.belanjaanLain
], () => {
  applicantData.value.jumlahBelanjaan =
    (applicantData.value.belanjaanMakanan || 0) +
    (applicantData.value.belanjaanUtiliti || 0) +
    (applicantData.value.belanjaanPengangkutan || 0) +
    (applicantData.value.belanjaanPerubatan || 0) +
    (applicantData.value.belanjaanPendidikan || 0) +
    (applicantData.value.belanjaanSewa || 0) +
    (applicantData.value.belanjaanLain || 0)
}, { deep: true })

// Auto-calculate umur from tarikhLahir
watch(() => applicantData.value.tarikhLahir, (newDate) => {
  if (newDate) {
    applicantData.value.umur = calculateAge(newDate)
  }
})

// Accordion behavior: expanding one section collapses all others
const toggleSection = (section) => {
  const wasCollapsed = collapsedSections.value[section]
  // Collapse all sections
  Object.keys(collapsedSections.value).forEach(key => {
    collapsedSections.value[key] = true
  })
  // If the section was collapsed, expand it (otherwise leave all collapsed)
  if (wasCollapsed) {
    collapsedSections.value[section] = false

    // Scroll to the expanded section with padding at top
    nextTick(() => {
      const sectionElement = document.getElementById(`section-${section}`)
      if (sectionElement) {
        const offset = 80 // Padding from top
        const elementPosition = sectionElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    })
  }
}

// Computed property for conditional field display (Foreign ID + Lain-lain)
const showForeignIdFields = computed(() =>
  applicantData.value.jenisId === 'Foreign ID' && applicantData.value.warganegara === 'Lain-lain'
)

// Waris functions
function addWaris() {
  warisList.value.push({
    id: Date.now(),
    namaWaris: '',
    hubunganWaris: '',
    noTelefonWaris: '',
    alamatWaris: '',
  })
}

function removeWaris(id) {
  warisList.value = warisList.value.filter(w => w.id !== id)
}

// Navigation functions
function goToStep(step) {
  currentStep.value = step
}

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function openAddTanggunganModal() {
  newTanggungan.value = { nama: '', tarikhLahir: '' }
  showAddTanggunganModal.value = true
}

function saveNewTanggungan() {
  if (!newTanggungan.value.nama || !newTanggungan.value.tarikhLahir) {
    return
  }

  const umur = calculateAge(newTanggungan.value.tarikhLahir)

  tanggunganList.value.push({
    id: Date.now(),
    // Maklumat Peribadi
    hubungan: 'Anak', nama: newTanggungan.value.nama, jenisId: 'Kad Pengenalan', noId: '', noPassport: '',
    tarikhMulaPassport: '', tarikhTamatPassport: '', noPassportLama: '', tarafPendudukTetap: '',
    jantina: 'Lelaki', tarikhLahir: newTanggungan.value.tarikhLahir,
    tempatLahir: '', bangsa: 'Melayu', statusPerkahwinan: 'Bujang', warganegara: 'Warganegara',
    tempohMenetapSelangor: 0, noTelefon: '', umur,
    // Maklumat Islam
    namaSelepasIslam: '', tarikhMasukIslam: '', tarikhMasukKFAM: '',
    // Maklumat Bank
    namaBank: '', noAkaunBank: '', namaPemegangAkaun: '', kaedahPembayaran: '',
    // Pendidikan
    bersekolah: 'Ya', pendidikanTertinggi: '', jenisSekolah: 'Pra Sekolah',
    namaSekolahMenengah: '', alamatSekolahMenengah: '', daerahSekolahMenengah: '',
    negeriSekolahMenengah: '', poskodSekolahMenengah: '',
    namaSekolahAgama: '', alamatSekolahAgama: '', daerahSekolahAgama: '',
    negeriSekolahAgama: '', poskodSekolahAgama: '',
    tinggalBersamaKeluarga: 'Ya',
    // Kesihatan
    tahapKesihatan: 'Sihat',
    // OKU specific
    oku: '', kesempurnaanFizikal: 'Sempurna', sebabKecacatan: 'Sejak Lahir',
    tahapKecacatan: '', jumlahPerbelanjaanOKU: 0,
    // Sakit Kronik specific
    keadaanKesihatan: '', kosPenjagaan: '', jumlahPerbelanjaanKronik: 0,
    // Kemahiran (18+)
    kemahiran: '',
    // Pekerjaan (18+)
    pekerjaan: 'Tidak Bekerja', sektor: 'Kerajaan', namaMajikan: '',
    noTelMajikan: '', alamatMajikan: '', bandarMajikan: '', poskodMajikan: '',
    daerahMajikan: '', negeriMajikan: '', jawatan: '', negaraMajikan: '',
    statusJawatan: '', pendapatanBulanan: 0,
  })

  // Auto-sort: youngest at bottom (oldest first)
  tanggunganList.value.sort((a, b) => b.umur - a.umur)

  showAddTanggunganModal.value = false
  newTanggungan.value = { nama: '', tarikhLahir: '' }
}

function editTanggungan(id) {
  // Toggle: if already editing this one, collapse it. Otherwise expand it.
  editingTanggunganId.value = editingTanggunganId.value === id ? null : id
}

// Auto-expand first tanggungan when added
watch(() => tanggunganList.value.length, (newLength, oldLength) => {
  if (newLength > oldLength && newLength > 0) {
    // Auto-expand the newly added tanggungan
    editingTanggunganId.value = tanggunganList.value[tanggunganList.value.length - 1].id
  }
})

function removeTanggungan(id) {
  tanggunganList.value = tanggunganList.value.filter(t => t.id !== id)
  jumlahTanggungan.value = tanggunganList.value.length
}

function calculateAge(birthDate) {
  if (!birthDate) return 0
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

async function handleSave() {
  // Simpan = save as draft (can edit multiple times)
  isSaving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Data saved as draft:', {
      applicantData: applicantData.value,
      tanggunganList: tanggunganList.value,
      warisList: warisList.value,
      penilaianAwal: penilaianAwal.value
    })
    showSuccess.value = true
    setTimeout(() => showSuccess.value = false, 3000)
  } catch (error) {
    console.error('Save failed:', error)
  } finally {
    isSaving.value = false
  }
}

function confirmSubmit() {
  if (confirm('Adakah anda pasti untuk menghantar permohonan ini? Setelah dihantar, rekod tidak boleh diedit lagi.')) {
    handleSubmit()
  }
}

async function handleSubmit() {
  // Hantar = submit (record becomes read-only)
  isSaving.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Data submitted:', {
      applicantData: applicantData.value,
      tanggunganList: tanggunganList.value,
      warisList: warisList.value,
      penilaianAwal: penilaianAwal.value
    })
    isFormReadOnly.value = true
    // Navigate to Had Kifayah (Analisa Data) page after successful submission
    navigateTo('/mockup-asnaf-profiling/had-kifayah')
  } catch (error) {
    console.error('Submit failed:', error)
  } finally {
    isSaving.value = false
  }
}

watch(() => tanggunganList.value.length, (newVal) => jumlahTanggungan.value = newVal)
watch(() => tanggunganList.value, (newVal) => {
  newVal.forEach(t => { if (t.tarikhLahir) t.umur = calculateAge(t.tarikhLahir) })
}, { deep: true })

const tanggunganBelow18 = computed(() => tanggunganList.value.filter(t => t.umur < 18))
</script>

<template>
  <div class="page-container">
    <LayoutsBreadcrumb />

    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Borang Pendaftaran Lengkap Asnaf</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Isi semua maklumat dengan lengkap dan tepat</p>
      </div>
      <rs-badge variant="info" class="status-badge">DRAF</rs-badge>
    </div>

    <div v-if="showSuccess" class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
      <div class="flex items-center gap-2">
        <Icon name="mdi:check-circle" class="w-5 h-5 text-green-600" />
        <p class="text-sm text-green-700 dark:text-green-300">Data berjaya disimpan!</p>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-6">
      <div class="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          @click="goToStep(1)"
          :class="[
            'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
            currentStep === 1
              ? 'border-primary text-primary bg-primary/5'
              : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          ]"
        >
          <Icon name="mdi:account" class="w-4 h-4 inline-block mr-2" />
          Maklumat Pemohon
        </button>
        <button
          @click="goToStep(2)"
          :class="[
            'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
            currentStep === 2
              ? 'border-primary text-primary bg-primary/5'
              : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          ]"
        >
          <Icon name="mdi:account-multiple" class="w-4 h-4 inline-block mr-2" />
          Tanggungan
        </button>
        <button
          @click="goToStep(3)"
          :class="[
            'px-4 py-2.5 text-sm font-medium transition-colors border-b-2',
            currentStep === 3
              ? 'border-primary text-primary bg-primary/5'
              : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
          ]"
        >
          <Icon name="mdi:clipboard-check" class="w-4 h-4 inline-block mr-2" />
          Penilaian Awal
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <!-- Step 1: Maklumat Pemohon -->
      <div v-show="currentStep === 1" class="space-y-4">
          <!-- 1. PERIBADI -->
          <rs-card id="section-peribadi">
            <template #header>
              <button @click="toggleSection('peribadi')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Peribadi</h3>
                <Icon :name="collapsedSections.peribadi ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.peribadi">
              <div class="space-y-3">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormKit type="select" label="Jenis ID" v-model="applicantData.jenisId" :options="['Kad Pengenalan', 'Foreign ID', 'Sijil Lahir']" :disabled="isFormReadOnly" />
                  <FormKit type="text" label="Nombor ID" v-model="applicantData.noId" validation="required" :disabled="isFormReadOnly" />
                </div>
                <FormKit type="text" label="Nama Penuh" v-model="applicantData.nama" validation="required" :disabled="isFormReadOnly" />
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormKit type="date" label="Tarikh Lahir" v-model="applicantData.tarikhLahir" :disabled="isFormReadOnly" />
                  <FormKit type="number" label="Umur" v-model="applicantData.umur" disabled />
                  <FormKit type="select" label="Jantina" v-model="applicantData.jantina" :options="['Lelaki', 'Perempuan']" :disabled="isFormReadOnly" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormKit type="select" label="Agama" v-model="applicantData.agama" :options="['Islam', 'Kristian', 'Buddha', 'Hindu', 'Lain-lain']" :disabled="isFormReadOnly" />
                  <FormKit type="select" label="Bangsa" v-model="applicantData.bangsa" :options="['Melayu', 'Cina', 'India', 'Lain-lain']" :disabled="isFormReadOnly" />
                  <FormKit type="select" label="Warganegara" v-model="applicantData.warganegara" :options="['Warganegara', 'Bukan Warganegara']" :disabled="isFormReadOnly" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormKit type="tel" label="No Telefon" v-model="applicantData.noTelefon" validation="required" :disabled="isFormReadOnly" />
                  <FormKit type="email" label="Emel" v-model="applicantData.emel" validation="email" :disabled="isFormReadOnly" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormKit type="select" label="Status Perkahwinan" v-model="applicantData.statusPerkahwinan" :options="['Bujang', 'Berkahwin', 'Duda', 'Balu', 'Janda']" :disabled="isFormReadOnly" />
                  <FormKit type="number" label="Bilangan Isteri" v-model="applicantData.bilIsteri" :disabled="isFormReadOnly" min="0" />
                  <FormKit type="number" label="Bilangan Anak" v-model="applicantData.bilAnak" :disabled="isFormReadOnly" min="0" />
                </div>
              </div>
            </template>
          </rs-card>

          <!-- 2. ALAMAT -->
          <rs-card id="section-alamat">
            <template #header>
              <button @click="toggleSection('alamat')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Alamat</h3>
                <Icon :name="collapsedSections.alamat ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.alamat">
              <div class="space-y-3">
                <FormKit type="textarea" label="Alamat 1" v-model="applicantData.alamat1" rows="2" validation="required" :disabled="isFormReadOnly" />
                <FormKit type="textarea" label="Alamat 2" v-model="applicantData.alamat2" rows="2" :disabled="isFormReadOnly" />
                <FormKit type="textarea" label="Alamat 3" v-model="applicantData.alamat3" rows="2" :disabled="isFormReadOnly" />
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormKit type="text" label="Poskod" v-model="applicantData.poskod" validation="required" :disabled="isFormReadOnly" />
                  <FormKit type="text" label="Bandar" v-model="applicantData.bandar" :disabled="isFormReadOnly" />
                  <FormKit type="select" label="Daerah" v-model="applicantData.daerah" validation="required" :options="['Gombak', 'Hulu Langat', 'Hulu Selangor', 'Klang', 'Kuala Langat', 'Kuala Selangor', 'Petaling', 'Sabak Bernam', 'Sepang']" :disabled="isFormReadOnly" />
                </div>
                <FormKit type="text" label="Negeri" v-model="applicantData.negeri" disabled value="Selangor" />
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormKit type="select" label="Status Kediaman" v-model="applicantData.statusKediaman" :options="['Milik Sendiri', 'Sewa', 'Rumah Ibu Bapa', 'Rumah Keluarga', 'Kuarters Kerajaan', 'Lain-lain']" :disabled="isFormReadOnly" />
                  <FormKit type="select" label="Tapak Rumah" v-model="applicantData.tapakRumah" :options="['Milik Sendiri', 'Tanah Kerajaan', 'Tanah Wakaf', 'Setinggan', 'Lain-lain']" :disabled="isFormReadOnly" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormKit type="select" label="Jenis Rumah" v-model="applicantData.jenisRumah" :options="['Rumah Teres', 'Flat/Apartment', 'Rumah Kampung', 'Rumah Papan', 'Lain-lain']" :disabled="isFormReadOnly" />
                  <FormKit type="select" label="Binaan Rumah" v-model="applicantData.binaanRumah" :options="['Batu/Simen', 'Kayu', 'Campuran', 'Lain-lain']" :disabled="isFormReadOnly" />
                  <FormKit type="number" label="Bilangan Bilik" v-model="applicantData.bilBilik" :disabled="isFormReadOnly" min="0" />
                </div>
                <FormKit type="select" label="Keadaan Rumah" v-model="applicantData.keadaanRumah" :options="['Baik', 'Sederhana', 'Buruk', 'Uzur']" :disabled="isFormReadOnly" />
              </div>
            </template>
          </rs-card>

          <!-- 3. PENDIDIKAN -->
          <rs-card id="section-pendidikan">
            <template #header>
              <button @click="toggleSection('pendidikan')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Pendidikan</h3>
                <Icon :name="collapsedSections.pendidikan ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pendidikan">
              <div class="space-y-3">
                <FormKit type="select" label="Tahap Pendidikan" v-model="applicantData.tahapPendidikan" :options="['Tidak Bersekolah', 'Sekolah Rendah', 'PMR/SRP', 'SPM/SPMV', 'STPM/Diploma', 'Ijazah Sarjana Muda', 'Ijazah Sarjana', 'PhD', 'Lain-lain']" :disabled="isFormReadOnly" />
                <FormKit type="text" label="Institusi Pendidikan" v-model="applicantData.institusiPendidikan" :disabled="isFormReadOnly" />
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormKit type="text" label="Bidang Pengajian" v-model="applicantData.bidangPengajian" :disabled="isFormReadOnly" />
                  <FormKit type="text" label="Tahun Tamat" v-model="applicantData.tahunTamat" :disabled="isFormReadOnly" />
                </div>
              </div>
            </template>
          </rs-card>

          <!-- 4. PENGISLAMAN (MUALLAF) -->
          <rs-card id="section-pengislaman">
            <template #header>
              <button @click="toggleSection('pengislaman')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Pengislaman</h3>
                <Icon :name="collapsedSections.pengislaman ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pengislaman">
              <div class="space-y-3">
                <FormKit type="radio" label="Adakah anda seorang Muallaf?" v-model="applicantData.isMuallaf" :options="[{label: 'Ya', value: 'Ya'}, {label: 'Tidak', value: 'Tidak'}]" :disabled="isFormReadOnly" />

                <!-- Conditional fields if Muallaf -->
                <template v-if="showMuallapFields">
                  <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-3">
                    <FormKit type="text" label="Nama Sebelum Islam" v-model="applicantData.namaSebelumIslam" :disabled="isFormReadOnly" />
                    <FormKit type="text" label="Nama Selepas Islam" v-model="applicantData.namaSelepasIslam" :disabled="isFormReadOnly" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="date" label="Tarikh Masuk Islam" v-model="applicantData.tarikhMasukIslam" :disabled="isFormReadOnly" />
                      <FormKit type="text" label="Tempat Masuk Islam" v-model="applicantData.tempatMasukIslam" :disabled="isFormReadOnly" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="date" label="Tarikh Masuk KFAM" v-model="applicantData.tarikhMasukKFAM" :disabled="isFormReadOnly" />
                      <FormKit type="select" label="Status KFAM" v-model="applicantData.statusKFAM" :options="['Lulus', 'Dalam Proses', 'Belum Mendaftar']" :disabled="isFormReadOnly" />
                    </div>
                    <FormKit type="file" label="Dokumen Pengislaman" help="Format: PDF, JPG, PNG. Max: 5MB" accept=".pdf,.jpg,.png" />
                  </div>
                </template>
              </div>
            </template>
          </rs-card>

          <!-- 5. PERBANKAN -->
          <rs-card id="section-perbankan">
            <template #header>
              <button @click="toggleSection('perbankan')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Perbankan</h3>
                <Icon :name="collapsedSections.perbankan ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.perbankan">
              <div class="space-y-3">
                <FormKit type="radio" label="Adakah anda mempunyai akaun bank?" v-model="applicantData.adaAkaunBank" :options="[{label: 'Ya', value: 'Ya'}, {label: 'Tidak', value: 'Tidak'}]" :disabled="isFormReadOnly" />

                <!-- Conditional: If NO bank account -->
                <template v-if="showSebabTiadaBank">
                  <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <FormKit type="select" label="Sebab Tiada Akaun Bank" v-model="applicantData.sebabTiadaAkaunBank" :options="['Bukan Warganegara', 'Sakit Terlantar', 'Tidak Layak', 'Tidak Pernah Memohon', 'Lain-lain']" :disabled="isFormReadOnly" />
                  </div>
                </template>

                <!-- Conditional: If YES bank account -->
                <template v-if="!showSebabTiadaBank">
                  <div class="space-y-3">
                    <FormKit type="select" label="Nama Bank" v-model="applicantData.namaBank" :options="['Maybank', 'CIMB', 'RHB', 'Bank Islam', 'Bank Rakyat', 'Public Bank', 'Hong Leong Bank', 'Ambank', 'BSN', 'Affin Bank', 'UOB', 'OCBC', 'Standard Chartered', 'Alliance Bank', 'Agrobank', 'Lain-lain']" :disabled="isFormReadOnly" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="text" label="No Akaun Bank" v-model="applicantData.noAkaunBank" :disabled="isFormReadOnly" />
                      <FormKit type="text" label="Nama Pemegang Akaun" v-model="applicantData.namaPemegangAkaun" :disabled="isFormReadOnly" />
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </rs-card>

          <!-- 6. KESIHATAN -->
          <rs-card id="section-kesihatan">
            <template #header>
              <button @click="toggleSection('kesihatan')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Kesihatan</h3>
                <Icon :name="collapsedSections.kesihatan ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.kesihatan">
              <div class="space-y-3">
                <FormKit type="select" label="Tahap Kesihatan" v-model="applicantData.tahapKesihatan" :options="['Sihat', 'OKU', 'Sakit Kronik', 'Uzur']" :disabled="isFormReadOnly" />

                <!-- Conditional: If OKU -->
                <template v-if="applicantData.tahapKesihatan === 'OKU'">
                  <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-3">
                    <FormKit type="text" label="Jenis Masalah Kesihatan" v-model="applicantData.jenisMasalahKesihatan" :disabled="isFormReadOnly" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="text" label="No Kad OKU" v-model="applicantData.kadOKU" :disabled="isFormReadOnly" />
                      <FormKit type="select" label="Kategori OKU" v-model="applicantData.kategoriOKU" :options="['Penglihatan', 'Pendengaran', 'Fizikal', 'Mental', 'Pembelajaran', 'Pelbagai']" :disabled="isFormReadOnly" />
                    </div>
                    <FormKit type="select" label="Tahap Kecacatan" v-model="applicantData.tahapKecacatan" :options="['Terlantar', 'Boleh Bergerak Sendiri', 'Perlukan Bantuan']" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Jumlah Perbelanjaan Bulanan (RM)" v-model="applicantData.jumlahPerbelanjaanOKU" :disabled="isFormReadOnly" />
                    <FormKit type="file" label="Upload Dokumen OKU" help="Format: PDF, JPG, PNG. Max: 5MB" accept=".pdf,.jpg,.png" />
                  </div>
                </template>

                <!-- Conditional: If Sakit Kronik/Uzur -->
                <template v-if="applicantData.tahapKesihatan === 'Sakit Kronik' || applicantData.tahapKesihatan === 'Uzur'">
                  <div class="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg space-y-3">
                    <FormKit type="text" label="Jenis Penyakit" v-model="applicantData.jenisPenyakit" :disabled="isFormReadOnly" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="text" label="Tempoh Sakit" v-model="applicantData.tempohSakit" :disabled="isFormReadOnly" placeholder="contoh: 2 tahun" />
                      <FormKit type="number" label="Kos Rawatan Bulanan (RM)" v-model="applicantData.kosRawatan" :disabled="isFormReadOnly" />
                    </div>
                    <FormKit type="file" label="Upload Dokumen Kesihatan" help="Format: PDF, JPG, PNG. Max: 5MB" accept=".pdf,.jpg,.png" />
                  </div>
                </template>
              </div>
            </template>
          </rs-card>

          <!-- 7. KEMAHIRAN -->
          <rs-card id="section-kemahiran">
            <template #header>
              <button @click="toggleSection('kemahiran')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Kemahiran</h3>
                <Icon :name="collapsedSections.kemahiran ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.kemahiran">
              <FormKit type="checkbox" label="Kemahiran yang Dimiliki" v-model="applicantData.kemahiran" :options="['Nelayan', 'Penternakan', 'Pertanian', 'Menjahit', 'Kraftangan', 'Memasak', 'Mengasuh', 'Perkhidmatan', 'Pertukangan', 'Perniagaan', 'Automotif', 'IT/Komputer', 'Lain-lain']" :disabled="isFormReadOnly" />
            </template>
          </rs-card>

          <!-- 8. PINJAMAN -->
          <rs-card id="section-pinjaman">
            <template #header>
              <button @click="toggleSection('pinjaman')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Pinjaman</h3>
                <Icon :name="collapsedSections.pinjaman ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pinjaman">
              <div class="space-y-3">
                <FormKit type="radio" label="Adakah anda mempunyai pinjaman?" v-model="applicantData.adaPinjaman" :options="[{label: 'Ya', value: 'Ya'}, {label: 'Tidak', value: 'Tidak'}]" :disabled="isFormReadOnly" />

                <!-- Conditional: If has loan -->
                <template v-if="showPinjamanFields">
                  <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg space-y-3">
                    <FormKit type="text" label="Institusi Pinjaman" v-model="applicantData.institusiPinjaman" :disabled="isFormReadOnly" />
                    <FormKit type="select" label="Jenis Pinjaman" v-model="applicantData.jenisPinjaman" :options="['Pinjaman Perumahan', 'Pinjaman Kenderaan', 'Pinjaman Peribadi', 'PTPTN', 'Ar-Rahnu', 'Along', 'Lain-lain']" :disabled="isFormReadOnly" />
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormKit type="number" label="Jumlah Pinjaman (RM)" v-model="applicantData.jumlahPinjaman" :disabled="isFormReadOnly" />
                      <FormKit type="number" label="Bayaran Bulanan (RM)" v-model="applicantData.bayaranBulanan" :disabled="isFormReadOnly" />
                      <FormKit type="number" label="Baki Pinjaman (RM)" v-model="applicantData.bakinPinjaman" :disabled="isFormReadOnly" />
                    </div>
                    <FormKit type="number" label="Tempoh Bayaran (Bulan)" v-model="applicantData.tempohBayaran" :disabled="isFormReadOnly" />
                    <FormKit type="file" label="Dokumen Pinjaman" help="Format: PDF, JPG, PNG. Max: 5MB" accept=".pdf,.jpg,.png" />
                  </div>
                </template>
              </div>
            </template>
          </rs-card>

          <!-- 9. PEMILIKAN ASET -->
          <rs-card id="section-pemilikan">
            <template #header>
              <button @click="toggleSection('pemilikan')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Pemilikan Aset</h3>
                <Icon :name="collapsedSections.pemilikan ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pemilikan">
              <div class="space-y-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="space-y-3">
                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Aset Cair</h4>
                    <FormKit type="number" label="Wang Simpanan (RM)" v-model="applicantData.wangSimpanan" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Simpanan ASB (RM)" v-model="applicantData.simpananASB" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Simpanan Tabung Haji (RM)" v-model="applicantData.simpananTabung" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Emas (gram)" v-model="applicantData.emas" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Saham (RM)" v-model="applicantData.saham" :disabled="isFormReadOnly" />
                  </div>
                  <div class="space-y-3">
                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Aset Tidak Cair</h4>
                    <FormKit type="checkbox" label="Kenderaan" v-model="applicantData.kenderaan" :options="['Kereta', 'Motosikal', 'Van', 'Lori', 'Basikal']" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Rumah Kedai (unit)" v-model="applicantData.rumahKedai" :disabled="isFormReadOnly" min="0" />
                    <FormKit type="number" label="Tanah (ekar)" v-model="applicantData.tanah" :disabled="isFormReadOnly" min="0" />
                    <FormKit type="text" label="Ternakan" v-model="applicantData.ternakan" :disabled="isFormReadOnly" placeholder="contoh: 5 ekor lembu" />
                    <FormKit type="text" label="Perniagaan" v-model="applicantData.perniagaan" :disabled="isFormReadOnly" placeholder="jenis perniagaan" />
                  </div>
                </div>
                <FormKit type="file" label="Dokumen Pemilikan Aset" help="Upload jika ada aset bernilai tinggi. Format: PDF, JPG, PNG. Max: 5MB" accept=".pdf,.jpg,.png" />
              </div>
            </template>
          </rs-card>

          <!-- 10. PEKERJAAN -->
          <rs-card id="section-pekerjaan">
            <template #header>
              <button @click="toggleSection('pekerjaan')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Pekerjaan</h3>
                <Icon :name="collapsedSections.pekerjaan ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pekerjaan">
              <div class="space-y-3">
                <FormKit type="select" label="Status Pekerjaan" v-model="applicantData.statusPekerjaan" :options="['Bekerja', 'Tidak Bekerja', 'Pencen', 'Pelajar', 'Suri Rumah']" :disabled="isFormReadOnly" />

                <!-- Conditional: If working -->
                <template v-if="showPekerjaanFields">
                  <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg space-y-3">
                    <FormKit type="text" label="Jenis Pekerjaan/Jawatan" v-model="applicantData.jenisPekerjaan" :disabled="isFormReadOnly" />
                    <FormKit type="text" label="Nama Majikan/Syarikat" v-model="applicantData.namaMajikan" :disabled="isFormReadOnly" />
                    <FormKit type="textarea" label="Alamat Majikan" v-model="applicantData.alamatMajikan" rows="2" :disabled="isFormReadOnly" />
                    <FormKit type="text" label="Jawatan" v-model="applicantData.jawatan" :disabled="isFormReadOnly" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Sektor Pekerjaan" v-model="applicantData.sektorPekerjaan" :options="['Kerajaan', 'Swasta', 'Sendiri']" :disabled="isFormReadOnly" />
                      <FormKit type="select" label="Status Jawatan" v-model="applicantData.statusJawatan" :options="['Tetap', 'Kontrak', 'Sambilan', 'Sementara']" :disabled="isFormReadOnly" />
                    </div>
                    <FormKit type="number" label="Tempoh Bekerja (Tahun)" v-model="applicantData.tempohBekerja" :disabled="isFormReadOnly" min="0" />
                  </div>
                </template>
              </div>
            </template>
          </rs-card>

          <!-- 11. PENDAPATAN & PERBELANJAAN -->
          <rs-card id="section-pendapatanBelanjaan">
            <template #header>
              <button @click="toggleSection('pendapatanBelanjaan')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Pendapatan & Perbelanjaan</h3>
                <Icon :name="collapsedSections.pendapatanBelanjaan ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pendapatanBelanjaan">
              <div class="space-y-4">
                <!-- Pendapatan -->
                <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Pendapatan Bulanan</h4>
                  <div class="space-y-3">
                    <FormKit type="number" label="Pendapatan Bulanan Pemohon (RM)" v-model="applicantData.pendapatanBulanan" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Pendapatan Pasangan (RM)" v-model="applicantData.pendapatanPasangan" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Pendapatan Lain (RM)" v-model="applicantData.pendapatanLain" :disabled="isFormReadOnly" />
                    <FormKit type="text" label="Sumber Pendapatan Lain" v-model="applicantData.sumberPendapatanLain" :disabled="isFormReadOnly" placeholder="contoh: sewa rumah, komisyen" />
                    <div class="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                      <div class="flex justify-between items-center">
                        <span class="font-semibold">Jumlah Pendapatan:</span>
                        <span class="text-lg font-bold text-green-600">RM {{ applicantData.jumlahPendapatan.toLocaleString() }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Perbelanjaan -->
                <div class="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <h4 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Perbelanjaan Bulanan</h4>
                  <div class="space-y-3">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="number" label="Makanan (RM)" v-model="applicantData.belanjaanMakanan" :disabled="isFormReadOnly" />
                      <FormKit type="number" label="Utiliti (RM)" v-model="applicantData.belanjaanUtiliti" :disabled="isFormReadOnly" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="number" label="Pengangkutan (RM)" v-model="applicantData.belanjaanPengangkutan" :disabled="isFormReadOnly" />
                      <FormKit type="number" label="Perubatan (RM)" v-model="applicantData.belanjaanPerubatan" :disabled="isFormReadOnly" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="number" label="Pendidikan (RM)" v-model="applicantData.belanjaanPendidikan" :disabled="isFormReadOnly" />
                      <FormKit type="number" label="Sewa (RM)" v-model="applicantData.belanjaanSewa" :disabled="isFormReadOnly" />
                    </div>
                    <FormKit type="number" label="Lain-lain (RM)" v-model="applicantData.belanjaanLain" :disabled="isFormReadOnly" />
                    <div class="p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
                      <div class="flex justify-between items-center">
                        <span class="font-semibold">Jumlah Belanjaan:</span>
                        <span class="text-lg font-bold text-red-600">RM {{ applicantData.jumlahBelanjaan.toLocaleString() }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Balance -->
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div class="flex justify-between items-center">
                    <span class="font-semibold">Baki (Pendapatan - Belanjaan):</span>
                    <span :class="['text-xl font-bold', (applicantData.jumlahPendapatan - applicantData.jumlahBelanjaan) >= 0 ? 'text-green-600' : 'text-red-600']">
                      RM {{ (applicantData.jumlahPendapatan - applicantData.jumlahBelanjaan).toLocaleString() }}
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- 12. PENGESAHAN -->
          <rs-card id="section-pengesahan">
            <template #header>
              <button @click="toggleSection('pengesahan')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Pengesahan</h3>
                <Icon :name="collapsedSections.pengesahan ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pengesahan">
              <div class="space-y-3">
                <FormKit type="radio" label="Hubungan Kekeluargaan dengan Kakitangan LZS?" v-model="applicantData.hubunganKekeluargaanLZS" :options="[{label: 'Ya', value: 'Ya'}, {label: 'Tidak', value: 'Tidak'}]" :disabled="isFormReadOnly" />

                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Pengesahan PDPA</h4>
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm space-y-2 mb-4">
                    <p class="font-semibold">Saya mengesahkan bahawa:</p>
                    <ul class="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      <li>Semua maklumat yang diberikan adalah benar dan tepat</li>
                      <li>Saya memberikan kebenaran kepada LZS untuk memproses data peribadi saya</li>
                      <li>Saya memahami data akan digunakan untuk pemprosesan permohonan bantuan</li>
                    </ul>
                  </div>
                  <FormKit type="radio" v-model="applicantData.pengesahanPDPA" :options="[{label: 'Setuju', value: 'Setuju'}, {label: 'Tidak Setuju', value: 'Tidak Setuju'}]" :disabled="isFormReadOnly" />
                </div>
              </div>
            </template>
          </rs-card>

          <!-- 13. PENGESAHAN BERMASTAUTIN -->
          <rs-card id="section-pengesahanBermastautin">
            <template #header>
              <button @click="toggleSection('pengesahanBermastautin')" class="w-full flex items-center justify-between text-left">
                <h3 class="text-lg font-semibold">Pengesahan Bermastautin</h3>
                <Icon :name="collapsedSections.pengesahanBermastautin ? 'mdi:chevron-down' : 'mdi:chevron-up'" class="w-5 h-5" />
              </button>
            </template>
            <template #body v-if="!collapsedSections.pengesahanBermastautin">
              <div class="space-y-4">
                <div class="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div class="flex gap-3">
                    <Icon name="mdi:information" class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div class="text-sm text-blue-700 dark:text-blue-300">
                      <p class="font-semibold mb-1">Proses Pengesahan</p>
                      <ol class="list-decimal list-inside space-y-1">
                        <li>Upload dokumen yang telah ditandatangani oleh Penolong Amil</li>
                        <li>Selepas upload, pilih nama Pegawai/Penolong Amil yang mengesahkan</li>
                        <li>Penolong Amil tidak dibayar untuk pengesahan ini (proses manual)</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <!-- Upload Documents FIRST -->
                <div class="space-y-3">
                  <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">1. Muat Naik Dokumen</h4>
                  <FormKit type="file" label="Dokumen Pengesahan Bermastautin" v-model="applicantData.dokumenPengesahanBermastautin" help="Dokumen yang ditandatangani Penolong Amil. Format: PDF, JPG, PNG. Max: 5MB" accept=".pdf,.jpg,.png" :disabled="isFormReadOnly" />
                  <FormKit type="file" label="Dokumen Pengesahan Pendapatan" v-model="applicantData.dokumenPengesahanPendapatan" help="Dokumen yang ditandatangani Penolong Amil. Format: PDF, JPG, PNG. Max: 5MB" accept=".pdf,.jpg,.png" :disabled="isFormReadOnly" />
                </div>

                <!-- THEN Select Pegawai (after upload) -->
                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">2. Maklumat Pegawai/Penolong Amil yang Mengesahkan</h4>
                  <div class="space-y-3">
                    <FormKit type="text" label="Nama Pegawai/Penolong Amil" v-model="applicantData.namaPegawaiPengesah" :disabled="isFormReadOnly" placeholder="Pilih selepas upload dokumen" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="text" label="Jawatan Pegawai" v-model="applicantData.jawatanPegawai" :disabled="isFormReadOnly" placeholder="contoh: Penolong Amil Kariah" />
                      <FormKit type="tel" label="No Telefon Pegawai" v-model="applicantData.noTelefonPegawai" :disabled="isFormReadOnly" />
                    </div>
                    <FormKit type="date" label="Tarikh Pengesahan" v-model="applicantData.tarikhPengesahan" :disabled="isFormReadOnly" />
                  </div>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- Navigation Button for Tab 1 -->
          <div class="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <rs-button variant="primary" @click="goToStep(2)">
              Seterusnya: Tanggungan
              <Icon name="mdi:arrow-right" class="w-4 h-4 ml-2" />
            </rs-button>
          </div>
      </div>

      <!-- Step 2: Tanggungan -->
      <div v-show="currentStep === 2" class="space-y-4">
          <rs-card>
            <template #body>
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-semibold">Senarai Tanggungan</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Tambah maklumat tanggungan yang sah</p>
                </div>
                <rs-button variant="primary" @click="openAddTanggunganModal" :disabled="isFormReadOnly">
                  <Icon name="mdi:plus" class="w-4 h-4 mr-2" />Tambah Tanggungan
                </rs-button>
              </div>
            </template>
          </rs-card>

          <div v-if="tanggunganList.length === 0" class="text-center py-12">
            <Icon name="mdi:account-multiple-outline" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p class="text-gray-600 dark:text-gray-400">Tiada tanggungan ditambah</p>
            <p class="text-sm text-gray-500 mt-1">Klik butang "Tambah Tanggungan" untuk mula</p>
          </div>

          <rs-card v-for="(t, index) in tanggunganList" :key="t.id">
            <template #header>
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                  <button @click="editTanggungan(t.id)" class="flex items-center gap-2 text-left">
                    <Icon :name="editingTanggunganId === t.id ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="w-5 h-5" />
                    <h4 class="text-lg font-semibold hover:text-primary">{{ t.nama }}</h4>
                  </button>
                  <rs-badge v-if="t.umur < 18" variant="warning">Bawah 18 tahun</rs-badge>
                  <rs-badge v-else variant="success">18 tahun ke atas</rs-badge>
                </div>
                <button v-if="!isFormReadOnly" @click="removeTanggungan(t.id)" class="text-red-600 hover:text-red-700 dark:text-red-400">
                  <Icon name="mdi:delete" class="w-5 h-5" />
                </button>
              </div>
            </template>
            <template #body v-if="editingTanggunganId === t.id">
              <div class="space-y-4">
                <div>
                  <h5 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">I. Maklumat Peribadi Tanggungan</h5>
                  <div class="space-y-3">
                    <FormKit type="select" label="Hubungan dengan Pemohon/Asnaf" v-model="t.hubungan" validation="required" :options="['Pasangan Pemohon', 'Isteri Kedua', 'Isteri Ketiga', 'Isteri Keempat', 'Ipar', 'Abang', 'Bapa', 'Ibu', 'Kakak', 'Adik', 'Anak', 'Cucu', 'Bapa Mertua', 'Ibu Mertua', 'Lain-lain Nyatakan']" :disabled="isFormReadOnly" />
                    <FormKit type="text" label="Nama" v-model="t.nama" validation="required" :disabled="isFormReadOnly" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Jenis ID" v-model="t.jenisId" :options="['Kad Pengenalan', 'Foreign ID', 'Sijil Lahir']" :disabled="isFormReadOnly" />
                      <FormKit type="text" label="No ID" v-model="t.noId" :disabled="isFormReadOnly" />
                    </div>
                    <!-- Conditional: Only show for Foreign ID + Lain-lain -->
                    <template v-if="t.jenisId === 'Foreign ID' && t.warganegara === 'Lain-lain'">
                      <FormKit type="text" label="No Passport Lama" v-model="t.noPassportLama" :disabled="isFormReadOnly" />
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="date" label="Tarikh Mula Passport" v-model="t.tarikhMulaPassport" :disabled="isFormReadOnly" />
                        <FormKit type="date" label="Tarikh Tamat Passport" v-model="t.tarikhTamatPassport" :disabled="isFormReadOnly" />
                      </div>
                      <FormKit type="select" label="Taraf Penduduk Tetap" v-model="t.tarafPendudukTetap" :options="['Ya', 'Tidak']" :disabled="isFormReadOnly" />
                    </template>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormKit type="select" label="Jantina" v-model="t.jantina" :options="['Lelaki', 'Perempuan']" :disabled="isFormReadOnly" />
                      <FormKit type="date" label="Tarikh Lahir" v-model="t.tarikhLahir" validation="required" :disabled="isFormReadOnly" />
                      <FormKit type="number" label="Umur" v-model="t.umur" :disabled="true" />
                    </div>
                    <FormKit type="text" label="Tempat Lahir" v-model="t.tempatLahir" validation="required" :disabled="isFormReadOnly" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Bangsa" v-model="t.bangsa" :options="['Melayu', 'Cina', 'India', 'Lain-lain Nyatakan']" :disabled="isFormReadOnly" />
                      <FormKit type="select" label="Status Perkahwinan" v-model="t.statusPerkahwinan" :options="['Berkahwin', 'Bujang', 'Janda', 'Ibu Tinggal', 'Bapa Tinggal', 'Duda', 'Balu']" :disabled="isFormReadOnly" />
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Warganegara" v-model="t.warganegara" :options="['Warganegara', 'Lain-lain']" :disabled="isFormReadOnly" />
                      <FormKit type="number" label="Tempoh Menetap Di Selangor (Tahun)" v-model="t.tempohMenetapSelangor" :disabled="isFormReadOnly" />
                    </div>
                    <FormKit type="tel" label="No Telefon/Telefon Bimbit" v-model="t.noTelefon" :disabled="isFormReadOnly" />
                  </div>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h5 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Maklumat Islam</h5>
                  <div class="space-y-3">
                    <FormKit type="text" label="Nama Selepas Islam (Muallaf)" v-model="t.namaSelepasIslam" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="date" label="Tarikh Masuk Islam" v-model="t.tarikhMasukIslam" help="Format: dd-mm-yyyy" />
                      <FormKit type="date" label="Tarikh Masuk Kelas Fardu Ain Muallaf (KFAM)" v-model="t.tarikhMasukKFAM" help="Format: dd-mm-yyyy" />
                    </div>
                  </div>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h5 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Maklumat Bank</h5>
                  <div class="space-y-3">
                    <FormKit type="select" label="Nama Bank" v-model="t.namaBank" :options="['Maybank', 'CIMB', 'RHB', 'Bank Islam', 'Bank Rakyat', 'Public Bank', 'Hong Leong Bank', 'Ambank', 'BSN', 'Affin Bank', 'UOB', 'OCBC', 'Standard Chartered', 'Alliance Bank', 'Agrobank']" />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="text" label="No Akaun Bank" v-model="t.noAkaunBank" validation="required" />
                      <FormKit type="text" label="Nama Pemegang Akaun Bank" v-model="t.namaPemegangAkaun" validation="required" />
                    </div>
                    <FormKit type="select" label="Kaedah Pembayaran" v-model="t.kaedahPembayaran" :options="['Akaun', 'Tiada']" />
                  </div>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h5 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">II. Maklumat Pendidikan Tanggungan</h5>
                  <div class="space-y-3">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormKit type="select" label="Bersekolah" v-model="t.bersekolah" :options="['Ya', 'Tidak']" :disabled="isFormReadOnly" />
                      <FormKit v-if="t.bersekolah === 'Ya'" type="select" label="Pendidikan Tertinggi" v-model="t.pendidikanTertinggi" :options="['Peringkat Rendah', 'SRP/PMR', 'SPM', 'Sijil', 'Diploma', 'STPM', 'Ijazah', 'Lain-lain Nyatakan']" :disabled="isFormReadOnly" />
                    </div>

                    <FormKit v-if="t.bersekolah === 'Ya'" type="select" label="Jenis Sekolah" v-model="t.jenisSekolah" :options="['Pra Sekolah', 'Sekolah Rendah', 'Sekolah Menengah', 'IPT/IPTA']" :disabled="isFormReadOnly" />

                    <!-- Sekolah Menengah/Rendah/IPTA -->
                    <div v-if="t.bersekolah === 'Ya'" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                      <h6 class="font-semibold text-sm">Nama dan Alamat Sekolah/Institusi (SEK.MEN/SRK/IPTA/IPTS)</h6>
                      <FormKit type="text" label="Nama Sekolah" v-model="t.namaSekolahMenengah" :disabled="isFormReadOnly" />
                      <FormKit type="textarea" label="Alamat" v-model="t.alamatSekolahMenengah" rows="2" :disabled="isFormReadOnly" />
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="text" label="Daerah" v-model="t.daerahSekolahMenengah" :disabled="isFormReadOnly" />
                        <FormKit type="text" label="Negeri" v-model="t.negeriSekolahMenengah" :disabled="isFormReadOnly" />
                      </div>
                      <FormKit type="text" label="Poskod" v-model="t.poskodSekolahMenengah" :disabled="isFormReadOnly" />
                    </div>

                    <!-- Sekolah Agama -->
                    <div v-if="t.bersekolah === 'Ya'" class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                      <h6 class="font-semibold text-sm">Nama dan Alamat Sekolah/Institusi (SRA/KAFA)</h6>
                      <FormKit type="text" label="Nama Sekolah" v-model="t.namaSekolahAgama" :disabled="isFormReadOnly" />
                      <FormKit type="textarea" label="Alamat" v-model="t.alamatSekolahAgama" rows="2" :disabled="isFormReadOnly" />
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormKit type="text" label="Daerah" v-model="t.daerahSekolahAgama" :disabled="isFormReadOnly" />
                        <FormKit type="text" label="Negeri" v-model="t.negeriSekolahAgama" :disabled="isFormReadOnly" />
                      </div>
                      <FormKit type="text" label="Poskod" v-model="t.poskodSekolahAgama" :disabled="isFormReadOnly" />
                    </div>

                    <FormKit type="radio" label="Tinggal Bersama Keluarga" v-model="t.tinggalBersamaKeluarga" :options="[{label: 'Ya', value: 'Ya'}, {label: 'Tidak', value: 'Tidak'}]" :disabled="isFormReadOnly" />
                    <FormKit type="file" label="Upload Dokumen" help="Format yang dibenarkan: PDF, JPG, PNG. Saiz maksimum: 5MB" accept=".pdf,.jpg,.png" />
                  </div>
                </div>

                <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h5 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">III. Maklumat Kesihatan Tanggungan</h5>
                  <FormKit type="select" label="Tahap Kesihatan" v-model="t.tahapKesihatan" :options="['Sihat', 'Sakit Kronik', 'OKU', 'Uzur']" :disabled="isFormReadOnly" />

                  <!-- If OKU -->
                  <div v-if="t.tahapKesihatan === 'OKU'" class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-4">
                    <FormKit type="text" label="OKU" v-model="t.oku" :disabled="isFormReadOnly" />
                    <FormKit type="select" label="Kesempurnaan Fizikal" v-model="t.kesempurnaanFizikal" :options="['Sempurna', 'Tidak Sempurna']" :disabled="isFormReadOnly" />
                    <FormKit type="select" label="Sebab Kecacatan (Jika Cacat)" v-model="t.sebabKecacatan" :options="['Sejak Lahir', 'Kemalangan', 'Penyakit', 'Lain-lain']" :disabled="isFormReadOnly" />
                    <FormKit type="select" label="Tahap Kecacatan" v-model="t.tahapKecacatan" :options="['Terlantar', 'Boleh Bergerak Sendiri', 'Perlukan Bantuan']" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Jumlah Perbelanjaan Bulanan (RM)" v-model="t.jumlahPerbelanjaanOKU" :disabled="isFormReadOnly" />
                    <FormKit type="file" label="Upload Dokumen OKU" help="Format yang dibenarkan: PDF, JPG, PNG. Saiz maksimum: 5MB" accept=".pdf,.jpg,.png" />
                  </div>

                  <!-- If Sakit Kronik/Uzur -->
                  <div v-if="t.tahapKesihatan === 'Sakit Kronik' || t.tahapKesihatan === 'Uzur'" class="mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg space-y-4">
                    <FormKit type="select" label="Keadaan Kesihatan" v-model="t.keadaanKesihatan" :options="['Terlantar', 'Boleh Bergerak', 'Perlukan Rawatan Berkala']" :disabled="isFormReadOnly" />
                    <FormKit type="select" label="Kos Penjagaan" v-model="t.kosPenjagaan" :options="['Berbayar', 'Percuma']" :disabled="isFormReadOnly" />
                    <FormKit type="number" label="Jumlah Perbelanjaan Bulanan (RM)" v-model="t.jumlahPerbelanjaanKronik" :disabled="isFormReadOnly" />
                    <FormKit type="file" label="Upload Dokumen Sakit Kronik" help="Format yang dibenarkan: PDF, JPG, PNG. Saiz maksimum: 5MB" accept=".pdf,.jpg,.png" />
                  </div>
                </div>

                <template v-if="t.umur >= 18">
                  <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h5 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">IV. Maklumat Kemahiran (18 tahun ke atas)</h5>
                    <FormKit type="select" label="Kemahiran" v-model="t.kemahiran" :options="['Nelayan', 'Penternakan', 'Pertanian', 'Menjahit', 'Kraftangan', 'Memasak', 'Mengasuh', 'Perkhidmatan', 'Pertukangan', 'Perniagaan', 'Lain-lain']" :disabled="isFormReadOnly" />
                  </div>

                  <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h5 class="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">V. Maklumat Pekerjaan Tanggungan (18 tahun ke atas)</h5>
                    <div class="space-y-3">
                      <FormKit type="select" label="Pekerjaan" v-model="t.pekerjaan" :options="['Bekerja Nyatakan Jawatan', 'Tidak Bekerja', 'Pelajar', 'Pencen']" :disabled="isFormReadOnly" />

                      <template v-if="t.pekerjaan === 'Bekerja Nyatakan Jawatan'">
                        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg space-y-4">
                          <FormKit type="select" label="Sektor" v-model="t.sektor" :options="['Kerajaan', 'Swasta', 'Sendiri']" :disabled="isFormReadOnly" />
                          <FormKit type="text" label="Nama Majikan" v-model="t.namaMajikan" :disabled="isFormReadOnly" />
                          <FormKit type="tel" label="No Tel Majikan" v-model="t.noTelMajikan" :disabled="isFormReadOnly" />
                          <FormKit type="textarea" label="Alamat Majikan" v-model="t.alamatMajikan" rows="2" :disabled="isFormReadOnly" />
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormKit type="text" label="Bandar" v-model="t.bandarMajikan" :disabled="isFormReadOnly" />
                            <FormKit type="text" label="Poskod" v-model="t.poskodMajikan" :disabled="isFormReadOnly" />
                          </div>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormKit type="text" label="Daerah" v-model="t.daerahMajikan" :disabled="isFormReadOnly" />
                            <FormKit type="text" label="Negeri" v-model="t.negeriMajikan" :disabled="isFormReadOnly" />
                          </div>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormKit type="text" label="Jawatan" v-model="t.jawatan" :disabled="isFormReadOnly" />
                            <FormKit type="text" label="Negara" v-model="t.negaraMajikan" :disabled="isFormReadOnly" />
                          </div>
                          <FormKit type="select" label="Status Jawatan" v-model="t.statusJawatan" :options="['Tetap', 'Kontrak', 'Sambilan']" :disabled="isFormReadOnly" />
                          <FormKit type="number" label="Pendapatan Bulanan (RM)" v-model="t.pendapatanBulanan" :disabled="isFormReadOnly" />
                        </div>
                      </template>
                    </div>
                  </div>
                </template>

                <div v-else class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div class="flex gap-3">
                    <Icon name="mdi:information" class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div class="text-sm text-yellow-700 dark:text-yellow-300">
                      <p class="font-semibold mb-1">Tanggungan Bawah 18 Tahun</p>
                      <p>Maklumat kemahiran dan pekerjaan tidak diperlukan untuk tanggungan bawah 18 tahun.</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- Navigation Button for Tab 2 -->
          <div class="flex justify-end mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <rs-button variant="primary" @click="goToStep(3)">
              Seterusnya: Penilaian Awal
              <Icon name="mdi:arrow-right" class="w-4 h-4 ml-2" />
            </rs-button>
          </div>
      </div>

      <!-- Step 3: Penilaian Awal -->
      <div v-show="currentStep === 3" class="space-y-4">
        <rs-card>
          <template #header>
            <h3 class="text-lg font-semibold">C. Penilaian Awal</h3>
          </template>
          <template #body>
            <div class="space-y-6">
              <FormKit
                type="radio"
                label="Adakah tuan/puan mempunyai komitmen dan pembiayaan melibatkan kos yang tinggi?"
                v-model="penilaianAwal.komitmenKosTinggi"
                :options="[{label: 'Ya', value: 'Ya'}, {label: 'Tidak', value: 'Tidak'}]"
                :disabled="isFormReadOnly"
              />

              <FormKit
                type="textarea"
                label="Apakah keperluan tuan/puan mendesak sekarang ini?"
                v-model="penilaianAwal.keperluanMendesak"
                rows="4"
                :disabled="isFormReadOnly"
              />

              <FormKit
                type="file"
                label="Muat naik dokumen sokongan (PDF, JPG, PNG)"
                help="Format yang dibenarkan: PDF, JPG, PNG. Saiz maksimum: 5MB setiap fail"
                accept=".pdf,.jpg,.png"
                multiple
              />
            </div>
          </template>
        </rs-card>

        <!-- Action Buttons for Tab 3 -->
        <div class="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <rs-button variant="primary" :loading="isSaving" @click="handleSave" :disabled="isFormReadOnly">
            <Icon name="mdi:content-save" class="w-4 h-4 mr-2" />Simpan
          </rs-button>
          <rs-button variant="success" @click="confirmSubmit" :disabled="isFormReadOnly">
            <Icon name="mdi:send" class="w-4 h-4 mr-2" />Hantar
          </rs-button>
        </div>
      </div>
    </div>

    <!-- Modal for Adding Tanggungan -->
    <div v-if="showAddTanggunganModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click.self="showAddTanggunganModal = false">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Tambah Tanggungan</h3>
            <button @click="showAddTanggunganModal = false" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Icon name="mdi:close" class="w-6 h-6" />
            </button>
          </div>
          <div class="space-y-4">
            <FormKit type="text" label="Nama" v-model="newTanggungan.nama" validation="required" />
            <FormKit type="date" label="Tarikh Lahir" v-model="newTanggungan.tarikhLahir" validation="required" />
          </div>
          <div class="flex gap-3 mt-6">
            <rs-button variant="secondary" class="flex-1" @click="showAddTanggunganModal = false">Batal</rs-button>
            <rs-button variant="primary" class="flex-1" @click="saveNewTanggungan" :disabled="!newTanggungan.nama || !newTanggungan.tarikhLahir">Simpan</rs-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Standard layout matching mockup-siasatan */
.page-container {
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
}
</style>
