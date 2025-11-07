<script setup>
definePageMeta({
  title: "Maklumat Asas Fail - AI Assisted",
  middleware: ["auth", "dashboard"],
})

// Collapsible sections state
const collapsedSections = ref({
  maklumatAsas: false,
  mahkamah: false,
  pihak: false,
  peguamPemerhati: false,
  pertuduhan: false,
  pertuduhan2: false,
  dokumen: false,
  keputusan: false,
  ahliPerasuakan: false,
})

// AI Features State
const isRecording = ref(false)
const isProcessingVoice = ref(false)
const isProcessingOCR = ref(false)
const showOCRModal = ref(false)
const showVoiceModal = ref(false)
const selectedField = ref(null)
const ocrConfidence = ref(null)
const ocrPreview = ref(null)

// Form data
const formData = ref({
  jenisKesalahan: 'MAHKAMAH TINGGI',
  jenisFail: 'RAYUAN',
  noFail: 'PEND/TRN/2025/10/02/001',
  tarikhTerima: '02/10/2025',
  negeri: 'TERENGGANU',
  mahkamah: 'MAHKAMAH TINGGI KUALA TERENGGANU',
  ppYsLinda: 'PP VS LINDA',
  namaTertuduh: 'NUR AISYAH BINTI MOHAMAD',
  jabatan: 'TIMBALAN PENDAKWA RAYA - L41',
  jawatan: 'INSP',
  disediakan: 'NUR AISYAH BINTI MOHAMAD',
  no_telefon: '0146074685',
})

// Rich text editor content
const editorContent = ref({
  keputusan: '<p>OK</p>',
  alasanPengahkiman: '<p>body</p>',
  faktaKes: '<p>body</p>',
  isuYang: '<p>body</p>',
  cadanganTimbalanPendakwa: '<p>body</p>',
  cadanganPengarah: '<p>body</p>',
  keputusanTindakan: '<p>Cadangan KLU</p>',
})

// Sample table data
const mahkamahList = ref([
  { id: 1, peranan: 'Ketua Hakim Negara', nama: 'TUAN HASYIM' }
])

const pihakList = ref([
  { id: 1, peranan: 'Pendakwa Raya', nama: 'PENGADAWA RAYA', noTel: '0132123123', email: 'TIADA' },
  { id: 2, peranan: 'Pemohon', nama: 'IRUMA', noTel: '0132123123', email: 'TIADA' }
])

const peguamList = ref([])
const ahliPerasukanList = ref([])

// Toggle section
const toggleSection = (section) => {
  collapsedSections.value[section] = !collapsedSections.value[section]
}

// AI Voice-to-Text Feature
const startVoiceInput = (fieldName) => {
  selectedField.value = fieldName
  showVoiceModal.value = true
  isRecording.value = true

  // Simulate voice recording
  setTimeout(() => {
    isRecording.value = false
    isProcessingVoice.value = true

    // Simulate AI processing
    setTimeout(() => {
      isProcessingVoice.value = false
      showVoiceModal.value = false
      // In real implementation, transcribed text would be populated here
    }, 1500)
  }, 3000)
}

// AI OCR Feature
const startOCRCapture = (fieldName) => {
  selectedField.value = fieldName
  showOCRModal.value = true
  isProcessingOCR.value = true
  ocrConfidence.value = null

  // Simulate OCR processing
  setTimeout(() => {
    isProcessingOCR.value = false
    ocrConfidence.value = Math.floor(Math.random() * 30) + 70 // 70-100%

    // Simulate longer text with official letter formatting for Keputusan Tindakan field
    if (fieldName === 'keputusanTindakan') {
      ocrPreview.value = `JABATAN PEGUAM NEGARA

Merujuk kepada perkara di atas.

Dengan segala hormatnya, saya mewakili bahagian ini minta-minta tindakan seperti berikut:

1. KES telah dikedalkan dan ketamatkan kepada YARS P. Alim buat keeli. Ketua Unit Jenayah Am rekantarakan dengan pendahuluan alhir dalam 3/10/25.

2. OKT sepatutnya dengan cakangan syer OKT sepatutkan dengan pendahuluan pihak dibuah bagi 2 atau 3 PTIPSOM dengan syarat OKT mengaku salah setelah mengambil kira kepentingan masa pegawai tidak dapat dikecam ke dalam KJS - semua migran telah dihantar pulang.

3. OKT bersalnya dengan cakangan syer OKT sepatutkan dengan pendahuluan pihak dibuah bagi 2 atau 3 PTIPSOM dengan syarat OKT mengaku salah setelah mengambil kira kepentingan semua migran tidak dapat dikecam ke dalam KJS - semua migran telah dihantar pulang.

4. KJS diperluakan untuk peruntutan YARS-Tuan.

Sekian, terima kasih.`
    } else {
      ocrPreview.value = "Sample OCR text extracted from image"
    }
  }, 2000)
}

const acceptOCRResult = () => {
  // Populate the field with OCR result
  if (selectedField.value === 'keputusanTindakan') {
    editorContent.value.keputusanTindakan = ocrPreview.value
  } else if (selectedField.value === 'namaKes') {
    formData.value.ppYsLinda = ocrPreview.value
  }

  showOCRModal.value = false
  ocrConfidence.value = null
  ocrPreview.value = null
  selectedField.value = null
}

const rejectOCRResult = () => {
  showOCRModal.value = false
  ocrConfidence.value = null
  ocrPreview.value = null
  selectedField.value = null
}

// Helper classes
const labelClass = "text-sm font-medium text-[rgb(var(--text-color))] block mb-1.5"
const inputClass = "w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 focus:border-[rgb(var(--primary))] transition-all"
const inputDisabledClass = "w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded bg-[rgb(var(--bg-1))] text-[rgb(var(--text-muted))] cursor-not-allowed"
</script>

<template>
  <div class="container mx-auto px-4 py-6 lg:px-6">
    <!-- Page Header -->
    <div class="mb-4">
      <h1 class="text-xl font-bold text-[rgb(var(--text-color))]">Maklumat Asas Fail</h1>
      <div class="flex items-center gap-2 mt-2 text-sm text-[rgb(var(--text-muted))]">
        <span>Senarai LKK</span>
        <span>/</span>
        <span>Maklumat LKK</span>
        <span>/</span>
        <span class="text-[rgb(var(--text-color))] font-medium">Maklumat Asas Fail</span>
      </div>
    </div>

    <!-- AI Help Note -->
    <div class="mb-4 px-3 py-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800 flex items-center gap-2">
      <Icon name="mdi:information" class="w-4 h-4 flex-shrink-0" />
      <span>Isi maklumat fail dengan mudah menggunakan AI. Klik ikon <Icon name="mdi:microphone" class="w-3 h-3 inline" /> untuk input suara atau <Icon name="mdi:camera" class="w-3 h-3 inline" /> untuk imbas dokumen.</span>
    </div>

    <!-- Maklumat Asas Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('maklumatAsas')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:file-document" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Maklumat Asas</h2>
          </div>
          <Icon
            :name="collapsedSections.maklumatAsas ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.maklumatAsas">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label :class="labelClass">Jenis Mahkamah</label>
            <input type="text" disabled :value="formData.jenisKesalahan" :class="inputDisabledClass" />
          </div>
          <div>
            <label :class="labelClass">Jenis Fail</label>
            <input type="text" disabled :value="formData.jenisFail" :class="inputDisabledClass" />
          </div>
          <div>
            <label :class="labelClass">No Fail <span class="text-red-500">*</span></label>
            <input type="text" :value="formData.noFail" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Tarikh Terima <span class="text-red-500">*</span></label>
            <input type="text" :value="formData.tarikhTerima" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Negeri <span class="text-red-500">*</span></label>
            <select :class="inputClass">
              <option>TERENGGANU</option>
              <option>SELANGOR</option>
              <option>KUALA LUMPUR</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">Mahkamah</label>
            <select :class="inputClass">
              <option>MAHKAMAH TINGGI KUALA TERENGGANU</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">Nama Kes</label>
            <div class="relative">
              <input type="text" :value="formData.ppYsLinda" :class="inputClass" />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <button
                  @click="startVoiceInput('namaKes')"
                  class="p-1.5 rounded hover:bg-blue-50 transition-colors group"
                  title="Voice Input (BM/EN)"
                >
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
                <button
                  @click="startOCRCapture('namaKes')"
                  class="p-1.5 rounded hover:bg-green-50 transition-colors group"
                  title="Scan Dokumen (OCR)"
                >
                  <Icon name="mdi:camera" class="w-4 h-4 text-green-600" />
                </button>
              </div>
            </div>
          </div>
          <div>
            <label :class="labelClass">Tarikh Dihantar Kepada AGC</label>
            <input type="date" value="2025-10-02" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Disediakan Oleh</label>
            <div class="relative">
              <input type="text" :value="formData.disediakan" :class="inputClass" />
              <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <button
                  @click="startVoiceInput('disediakan')"
                  class="p-1.5 rounded hover:bg-blue-50 transition-colors"
                  title="Voice Input"
                >
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </div>
          </div>
          <div>
            <label :class="labelClass">Jawatan</label>
            <input type="text" :value="formData.jawatan" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">No Telefon</label>
            <input type="text" :value="formData.no_telefon" :class="inputClass" />
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Mahkamah (Korum) Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('mahkamah')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:gavel" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Mahkamah (Korum)</h2>
            <rs-badge size="sm" class="ml-2">{{ mahkamahList.length }}</rs-badge>
          </div>
          <Icon
            :name="collapsedSections.mahkamah ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.mahkamah">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-[rgb(var(--bg-1))]">
                <th class="px-3 py-2 text-left font-semibold">Peranan</th>
                <th class="px-3 py-2 text-left font-semibold">Nama</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in mahkamahList"
                :key="item.id"
                class="border-b border-[rgb(var(--border-color))]"
              >
                <td class="px-3 py-2.5">{{ item.peranan }}</td>
                <td class="px-3 py-2.5">{{ item.nama }}</td>
                <td class="px-3 py-2.5">
                  <div class="flex gap-1">
                    <button class="p-1.5 rounded hover:bg-gray-100">
                      <Icon name="mdi:delete" class="w-4 h-4 text-gray-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-gray-100">
                      <Icon name="mdi:information" class="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 flex justify-end border-t border-[rgb(var(--border-color))] pt-3">
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="mdi:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Pihak-Pihak Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('pihak')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:account-group" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Pihak-Pihak</h2>
            <rs-badge size="sm" class="ml-2">{{ pihakList.length }}</rs-badge>
          </div>
          <Icon
            :name="collapsedSections.pihak ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.pihak">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-[rgb(var(--bg-1))]">
                <th class="px-3 py-2 text-left font-semibold">Peranan</th>
                <th class="px-3 py-2 text-left font-semibold">Nama</th>
                <th class="px-3 py-2 text-left font-semibold">No Tel</th>
                <th class="px-3 py-2 text-left font-semibold">Email</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in pihakList"
                :key="item.id"
                class="border-b border-[rgb(var(--border-color))]"
              >
                <td class="px-3 py-2.5">{{ item.peranan }}</td>
                <td class="px-3 py-2.5">{{ item.nama }}</td>
                <td class="px-3 py-2.5">{{ item.noTel }}</td>
                <td class="px-3 py-2.5">{{ item.email }}</td>
                <td class="px-3 py-2.5">
                  <div class="flex gap-1">
                    <button class="p-1.5 rounded hover:bg-gray-100">
                      <Icon name="mdi:delete" class="w-4 h-4 text-gray-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-gray-100">
                      <Icon name="mdi:information" class="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 flex justify-end border-t border-[rgb(var(--border-color))] pt-3">
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="mdi:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Peguam Pemerhati Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('peguamPemerhati')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:briefcase-account" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Peguam Pemerhati (sekiranya ada)</h2>
          </div>
          <Icon
            :name="collapsedSections.peguamPemerhati ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.peguamPemerhati">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-[rgb(var(--bg-1))]">
                <th class="px-3 py-2 text-left font-semibold">Nama Peguam</th>
                <th class="px-3 py-2 text-left font-semibold">Firma</th>
                <th class="px-3 py-2 text-left font-semibold">Pemerhati bagi Pihak</th>
                <th class="px-3 py-2 text-left font-semibold">Catatan</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[rgb(var(--border-color))]">
                <td colspan="5" class="px-3 py-8 text-center text-[rgb(var(--text-muted))]">Tiada rekod</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end border-t border-[rgb(var(--border-color))] pt-3 mt-3">
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="mdi:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Pertuduhan Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('pertuduhan')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:file-document-alert" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Pertuduhan</h2>
          </div>
          <Icon
            :name="collapsedSections.pertuduhan ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.pertuduhan">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-[rgb(var(--bg-1))]">
                <th class="px-3 py-2 text-left font-semibold">No Kes</th>
                <th class="px-3 py-2 text-left font-semibold">Nama OKT</th>
                <th class="px-3 py-2 text-left font-semibold">Akta</th>
                <th class="px-3 py-2 text-left font-semibold">Seksyen</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[rgb(var(--border-color))]">
                <td class="px-3 py-2.5">TRN/2025-1050012</td>
                <td class="px-3 py-2.5">IRUMA</td>
                <td class="px-3 py-2.5">4/AKTA KESELAMATAN SOSIAL PEKERJA 1969</td>
                <td class="px-3 py-2.5">3</td>
                <td class="px-3 py-2.5">
                  <div class="flex gap-1">
                    <button class="p-1.5 rounded hover:bg-gray-100">
                      <Icon name="mdi:delete" class="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-3 flex justify-end border-t border-[rgb(var(--border-color))] pt-3">
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="mdi:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Pertuduhan Pilihan / Pindaan Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('pertuduhan2')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:file-document-edit" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Pertuduhan Pilihan / Pindaan</h2>
          </div>
          <Icon
            :name="collapsedSections.pertuduhan2 ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.pertuduhan2">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-[rgb(var(--bg-1))]">
                <th class="px-3 py-2 text-left font-semibold">No Kes</th>
                <th class="px-3 py-2 text-left font-semibold">Nama OKT</th>
                <th class="px-3 py-2 text-left font-semibold">Akta</th>
                <th class="px-3 py-2 text-left font-semibold">Seksyen</th>
                <th class="px-3 py-2 text-left font-semibold">Tarikh</th>
                <th class="px-3 py-2 text-left font-semibold">Perubahan</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[rgb(var(--border-color))]">
                <td colspan="7" class="px-3 py-8 text-center text-[rgb(var(--text-muted))]">Tiada rekod</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end border-t border-[rgb(var(--border-color))] pt-3 mt-3">
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="mdi:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Dokumen Sokongan Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('dokumen')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:file-multiple" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Dokumen Sokongan</h2>
          </div>
          <Icon
            :name="collapsedSections.dokumen ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.dokumen">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-[rgb(var(--bg-1))]">
                <th class="px-3 py-2 text-left font-semibold">Nama Dokumen</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[rgb(var(--border-color))]">
                <td colspan="2" class="px-3 py-8 text-center text-[rgb(var(--text-muted))]">Tiada rekod</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end border-t border-[rgb(var(--border-color))] pt-3 mt-3">
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="mdi:upload" class="w-4 h-4" />
            Muat Naik
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Keputusan Section with Rich Text Editors -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('keputusan')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:text-box-check" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Keputusan</h2>
          </div>
          <Icon
            :name="collapsedSections.keputusan ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.keputusan">
        <div class="space-y-4">
          <!-- Tarikh Keputusan & Tarikh Akhir -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label :class="labelClass">Tarikh Keputusan</label>
              <input type="date" value="2025-09-26" :class="inputClass" />
            </div>
            <div>
              <label :class="labelClass">Tarikh Akhir Untuk Failkan Rayuan</label>
              <input type="date" value="2025-10-17" :class="inputClass" />
            </div>
          </div>

          <!-- Rich Text Editor - Alasan Pengahkiman -->
          <div>
            <label :class="labelClass">Alasan Pengahkiman</label>
            <div class="border border-[rgb(var(--border-color))] rounded">
              <!-- Simplified Toolbar -->
              <div class="flex items-center gap-1 px-2 py-1.5 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))]">
                <button class="p-1.5 rounded hover:bg-gray-200" title="Image">
                  <Icon name="mdi:image" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200" title="Source">
                  <Icon name="mdi:code-tags" class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 mx-1"></div>
                <button class="p-1.5 rounded hover:bg-gray-200" title="Bold">
                  <Icon name="mdi:format-bold" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200" title="Italic">
                  <Icon name="mdi:format-italic" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200" title="Underline">
                  <Icon name="mdi:format-underline" class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 mx-1"></div>
                <!-- AI Voice Button in Toolbar -->
                <button
                  @click="startVoiceInput('alasanPengahkiman')"
                  class="p-1.5 rounded hover:bg-blue-100 transition-colors"
                  title="Voice Input AI"
                >
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
              </div>
              <textarea
                v-model="editorContent.alasanPengahkiman"
                rows="4"
                class="w-full px-3 py-2 text-sm focus:outline-none resize-none"
                placeholder="Masukkan alasan pengahkiman..."
              ></textarea>
            </div>
          </div>

          <!-- Rich Text Editor - Fakta Kes -->
          <div>
            <label :class="labelClass">Fakta Kes</label>
            <div class="border border-[rgb(var(--border-color))] rounded">
              <div class="flex items-center gap-1 px-2 py-1.5 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))]">
                <button class="p-1.5 rounded hover:bg-gray-200" title="Image">
                  <Icon name="mdi:image" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200" title="Source">
                  <Icon name="mdi:code-tags" class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 mx-1"></div>
                <button
                  @click="startVoiceInput('faktaKes')"
                  class="p-1.5 rounded hover:bg-blue-100"
                  title="Voice Input AI"
                >
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
              </div>
              <textarea
                v-model="editorContent.faktaKes"
                rows="4"
                class="w-full px-3 py-2 text-sm focus:outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Rich Text Editor - Isu Yang Dibangkitkan Dan Hujahan Pihak - Pihak -->
          <div>
            <label :class="labelClass">Isu Yang Dibangkitkan Dan Hujahan Pihak - Pihak</label>
            <div class="border border-[rgb(var(--border-color))] rounded">
              <div class="flex items-center gap-1 px-2 py-1.5 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))]">
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:image" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:code-tags" class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 mx-1"></div>
                <button @click="startVoiceInput('isuYang')" class="p-1.5 rounded hover:bg-blue-100">
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
              </div>
              <textarea rows="4" class="w-full px-3 py-2 text-sm focus:outline-none resize-none"></textarea>
            </div>
          </div>

          <!-- Rich Text Editor - Cadangan Timbalan Pendakwa Negeri/Agensi -->
          <div>
            <label :class="labelClass">Cadangan Timbalan Pendakwa Negeri/Agensi</label>
            <div class="border border-[rgb(var(--border-color))] rounded">
              <div class="flex items-center gap-1 px-2 py-1.5 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))]">
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:image" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:code-tags" class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 mx-1"></div>
                <button @click="startVoiceInput('cadanganTimbalan')" class="p-1.5 rounded hover:bg-blue-100">
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
              </div>
              <textarea rows="4" class="w-full px-3 py-2 text-sm focus:outline-none resize-none"></textarea>
            </div>
          </div>

          <!-- Rich Text Editor - Cadangan Pengarah Pendakwaan -->
          <div>
            <label :class="labelClass">Cadangan Pengarah Pendakwaan</label>
            <div class="border border-[rgb(var(--border-color))] rounded">
              <div class="flex items-center gap-1 px-2 py-1.5 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))]">
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:image" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:code-tags" class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 mx-1"></div>
                <button @click="startVoiceInput('cadanganPengarah')" class="p-1.5 rounded hover:bg-blue-100">
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
              </div>
              <textarea rows="4" class="w-full px-3 py-2 text-sm focus:outline-none resize-none"></textarea>
            </div>
          </div>

          <!-- Keputusan Tindakan Rich Text -->
          <div>
            <label :class="labelClass">Keputusan Tindakan</label>
            <div class="border border-[rgb(var(--border-color))] rounded">
              <div class="flex items-center gap-1 px-2 py-1.5 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))]">
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:image" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:code-tags" class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 mx-1"></div>
                <button @click="startVoiceInput('keputusanTindakan')" class="p-1.5 rounded hover:bg-blue-100" title="Voice Input AI">
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
                <button @click="startOCRCapture('keputusanTindakan')" class="p-1.5 rounded hover:bg-green-100" title="Scan Dokumen (OCR)">
                  <Icon name="mdi:camera" class="w-4 h-4 text-green-600" />
                </button>
              </div>
              <textarea
                v-model="editorContent.keputusanTindakan"
                rows="6"
                class="w-full px-3 py-2 text-sm focus:outline-none resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Catatan -->
          <div>
            <label :class="labelClass">Catatan</label>
            <div class="border border-[rgb(var(--border-color))] rounded">
              <div class="flex items-center gap-1 px-2 py-1.5 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))]">
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:image" class="w-4 h-4" />
                </button>
                <button class="p-1.5 rounded hover:bg-gray-200">
                  <Icon name="mdi:code-tags" class="w-4 h-4" />
                </button>
                <div class="w-px h-4 bg-gray-300 mx-1"></div>
                <button @click="startVoiceInput('catatan')" class="p-1.5 rounded hover:bg-blue-100">
                  <Icon name="mdi:microphone" class="w-4 h-4 text-blue-600" />
                </button>
              </div>
              <textarea rows="6" class="w-full px-3 py-2 text-sm focus:outline-none resize-none"></textarea>
            </div>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Senarai Ahli Perasuakan Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('ahliPerasuakan')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:account-multiple" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Senarai Ahli Perasuakan</h2>
          </div>
          <Icon
            :name="collapsedSections.ahliPerasuakan ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.ahliPerasuakan">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-[rgb(var(--bg-1))]">
                <th class="px-3 py-2 text-left font-semibold">Nama Pegawai</th>
                <th class="px-3 py-2 text-left font-semibold">Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-[rgb(var(--border-color))]">
                <td colspan="2" class="px-3 py-8 text-center text-[rgb(var(--text-muted))]">Tiada rekod</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex justify-end border-t border-[rgb(var(--border-color))] pt-3 mt-3">
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="mdi:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3 mt-6">
      <button class="px-4 py-2.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
        Kembali
      </button>
      <button class="px-4 py-2.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium">
        Simpan
      </button>
    </div>

    <!-- Voice Input Modal -->
    <div
      v-if="showVoiceModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showVoiceModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div class="text-center">
          <div class="mb-4">
            <div
              class="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
              :class="isRecording ? 'bg-red-100 animate-pulse' : 'bg-blue-100'"
            >
              <Icon
                name="mdi:microphone"
                class="w-10 h-10"
                :class="isRecording ? 'text-red-600' : 'text-blue-600'"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            {{ isRecording ? 'Merakam Suara...' : isProcessingVoice ? 'Memproses AI...' : 'Sedia untuk Rakam' }}
          </h3>
          <p class="text-sm text-[rgb(var(--text-muted))] mb-4">
            {{ isRecording ? 'Bercakap dalam Bahasa Melayu atau Bahasa Inggeris' : isProcessingVoice ? 'Menukar suara kepada teks...' : 'Tekan butang untuk memulakan' }}
          </p>
          <div v-if="isProcessingVoice" class="flex justify-center mb-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <button
            v-if="!isProcessingVoice"
            @click="showVoiceModal = false"
            class="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

    <!-- OCR Modal -->
    <div
      v-if="showOCRModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showOCRModal = false"
    >
      <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
        <div class="mb-4">
          <h3 class="text-lg font-semibold mb-2">Imbas Dokumen (OCR)</h3>
          <p class="text-sm text-[rgb(var(--text-muted))]">AI akan mengekstrak teks daripada gambar dokumen</p>
        </div>

        <div v-if="isProcessingOCR" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p class="text-sm text-[rgb(var(--text-muted))]">Menganalisis imej dengan OCR AI...</p>
        </div>

        <div v-else-if="ocrConfidence" class="space-y-4">
          <!-- Confidence Indicator -->
          <div class="p-4 rounded-lg" :class="ocrConfidence >= 85 ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-medium">Keyakinan AI</span>
              <span class="text-lg font-bold" :class="ocrConfidence >= 85 ? 'text-green-600' : 'text-yellow-600'">
                {{ ocrConfidence }}%
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="h-2 rounded-full transition-all"
                :class="ocrConfidence >= 85 ? 'bg-green-600' : 'bg-yellow-600'"
                :style="{ width: ocrConfidence + '%' }"
              ></div>
            </div>
          </div>

          <!-- OCR Result -->
          <div>
            <label class="text-sm font-medium block mb-2">Teks yang Dikesan:</label>
            <textarea
              v-model="ocrPreview"
              rows="12"
              class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded focus:outline-none focus:ring-2 focus:ring-green-500/20 font-mono"
              style="white-space: pre-wrap;"
            ></textarea>
            <p class="text-xs text-[rgb(var(--text-muted))] mt-1">
              <Icon name="mdi:information" class="w-3 h-3 inline" />
              Anda boleh mengedit teks sebelum menyimpan
            </p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 justify-end">
            <button
              @click="rejectOCRResult"
              class="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              @click="acceptOCRResult"
              class="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
            >
              Gunakan Teks Ini
            </button>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <Icon name="mdi:camera-plus" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p class="text-sm text-[rgb(var(--text-muted))] mb-4">Ambil gambar dokumen untuk diimbas</p>
          <button class="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
            <Icon name="mdi:camera" class="w-4 h-4 inline mr-2" />
            Buka Kamera
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
