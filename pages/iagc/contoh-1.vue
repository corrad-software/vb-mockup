<script setup>
definePageMeta({
  title: "Maklumat Kertas Siasatan",
  middleware: ["auth", "dashboard"],
})

// Collapsible sections state
const collapsedSections = ref({
  jenisKesalahan: false,
  suspek: false,
  mangsa: false,
  arahan: false,
  log: true,
})

// Toggle switch state
const kertasFizikal = ref(true)

// AI Suggestion Modal State
const showAiModal = ref(false)
const isLoadingAiSuggestions = ref(false)
const aiSuggestions = ref([])
const selectedSuggestion = ref(null)
const searchQuery = ref('')

// Sample data states
const jenisKesalahanList = ref([
  { id: 1, akta: 'AKTA DADAH BERBAHAYA 1952', seksyen: 'SECTION 39A(1)', nota: 'Pengedaran dadah berbahaya' }
])

const suspekList = ref([
  { id: 1, nama: 'GORDON YONG LONE SAINT', ic: '951020135793', negara: 'MALAYSIA' }
])

// Mock AI Suggestions Data
const mockAiSuggestions = [
  {
    id: 1,
    akta: 'AKTA DADAH BERBAHAYA 1952',
    seksyen: 'SECTION 39A(1)',
    penerangan: 'Pengedaran dadah berbahaya',
    nota: 'Kesalahan ini melibatkan pengedaran dadah berbahaya kepada orang lain. Hukuman maksimum ialah hukuman mati.',
    relevansi: 95,
    alasan: 'Berdasarkan maklumat kes yang melibatkan dadah dan pengedaran'
  },
  {
    id: 2,
    akta: 'AKTA DADAH BERBAHAYA 1952',
    seksyen: 'SECTION 39B',
    penerangan: 'Pengeluaran dadah berbahaya',
    nota: 'Kesalahan ini melibatkan pengeluaran atau pembuatan dadah berbahaya. Hukuman adalah hukuman mati jika didapati bersalah.',
    relevansi: 88,
    alasan: 'Berkaitan dengan kes penglibatan dadah berbahaya'
  },
  {
    id: 3,
    akta: 'AKTA DADAH BERBAHAYA 1952',
    seksyen: 'SECTION 6(3)',
    penerangan: 'Penyalahgunaan dadah berbahaya',
    nota: 'Kesalahan mengambil atau menggunakan dadah berbahaya tanpa kebenaran yang sah.',
    relevansi: 72,
    alasan: 'Kemungkinan berkaitan dengan penyalahgunaan dadah'
  }
]

const mangsaList = ref([
  { id: 1, nama: 'NORFAH IZZOL FAHMI BIN MOHD SHAHARI', ic: '', kategori: 'Pengadu', types: { mangsa: true, pengadu: true, simati: false, lain: false } }
])

const logList = ref([
  { tarikh: '27/10/2025 12:05:18 PM', statusSebelum: 'Sudah Minit', statusBaru: 'Telah Diterbit Dari Polis/Agensi', pengguna: 'norazimma' },
  { tarikh: '27/10/2024 12:05:43 PM', statusSebelum: 'Ada Pada TPR', statusBaru: 'Sudah Minit', pengguna: 'norazimma' },
  { tarikh: '27/10/2021 11:39:16 AM', statusSebelum: 'Baru Terima', statusBaru: 'Ada Pada TPR', pengguna: 'norazimma' }
])

// Helper classes for consistent styling
const labelClass = "text-sm font-medium text-[rgb(var(--text-color))] block mb-1.5"
const inputClass = "w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 focus:border-[rgb(var(--primary))] transition-all"
const inputDisabledClass = "w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded bg-[rgb(var(--bg-1))] text-[rgb(var(--text-muted))] cursor-not-allowed"

// Toggle collapsible section
const toggleSection = (section) => {
  collapsedSections.value[section] = !collapsedSections.value[section]
}

// AI Suggestion Functions
const openAiModal = () => {
  showAiModal.value = true
  getAiSuggestions()
}

const closeAiModal = () => {
  showAiModal.value = false
  selectedSuggestion.value = null
  searchQuery.value = ''
}

const getAiSuggestions = async () => {
  isLoadingAiSuggestions.value = true
  // Simulate API call
  setTimeout(() => {
    aiSuggestions.value = mockAiSuggestions
    isLoadingAiSuggestions.value = false
  }, 1500)
}

const selectSuggestion = (suggestion) => {
  selectedSuggestion.value = suggestion
}

const addSelectedSuggestion = () => {
  if (selectedSuggestion.value) {
    const newId = jenisKesalahanList.value.length + 1
    jenisKesalahanList.value.push({
      id: newId,
      akta: selectedSuggestion.value.akta,
      seksyen: selectedSuggestion.value.seksyen,
      nota: selectedSuggestion.value.penerangan
    })
    closeAiModal()
  }
}

const removeJenisKesalahan = (id) => {
  jenisKesalahanList.value = jenisKesalahanList.value.filter(item => item.id !== id)
}
</script>

<template>
  <div class="container mx-auto px-4 py-6 lg:px-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-xl font-bold text-[rgb(var(--text-color))]">Maklumat Kertas Siasatan</h1>
      <div class="flex items-center gap-2 mt-2 text-sm text-[rgb(var(--text-muted))]">
        <span>Penyelidikan Undang-Undang</span>
        <span>/</span>
        <span>Kertas Siasatan</span>
        <span>/</span>
        <span class="text-[rgb(var(--text-color))] font-medium">Maklumat Kertas Siasatan</span>
      </div>
    </div>

    <!-- Main Information Card -->
    <rs-card class="mb-4">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Maklumat Kertas Siasatan</h2>
          <rs-badge variant="warning">DALAM PROSES</rs-badge>
        </div>
      </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label :class="labelClass">Pegawai Penyiasat</label>
            <input type="text" disabled value="NURUL ADLIAH BINTI SHAHUDIN" :class="inputDisabledClass" />
          </div>
          <div>
            <label :class="labelClass">No Telefon</label>
            <input type="text" value="0166002270" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">No TPR</label>
            <input type="text" disabled value="KS/PRG/2025/83856" :class="inputDisabledClass" />
          </div>
          <div>
            <label :class="labelClass">No TPR Berkaitan</label>
            <input type="text" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">No Kertas Siasatan</label>
            <input type="text" disabled value="SPFJ/LN/P/5/3/14/2025" :class="inputDisabledClass" />
          </div>
          <div>
            <label :class="labelClass">No Repot</label>
            <input type="text" value="PERAK/691.E/091/6/25" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Negeri</label>
            <select :class="inputClass">
              <option>PULAU PINANG</option>
              <option>SELANGOR</option>
              <option>KUALA LUMPUR</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">Bahagian Khidmat Tengah</label>
            <select :class="inputClass">
              <option selected>BAHAGIAN KHIDMAT TENGAH</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">Kaedah Penghantaran</label>
            <select :class="inputClass">
              <option>Walk In</option>
              <option>Emel</option>
              <option>Pos</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">Tujuan Penghantaran</label>
            <select :class="inputClass">
              <option>Keputusan</option>
              <option>Semakan</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">Jabatan Dari Agensi</label>
            <input type="text" value="POLIS DIRAJA MALAYSIA (PDRM)" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Pegawai Penyiasat Sendi</label>
            <input type="text" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Alasan Penolakan Masuk</label>
            <input type="text" value="NURUL ADLIAH BINTI SHAHUDIN 0166002270" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Alasan Penolakan</label>
            <input type="text" value="NURUL ADLIAH BINTI SHAHUDIN 0166002270" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Nota ID</label>
            <input type="text" :class="inputClass" />
          </div>
          <div>
            <label :class="labelClass">Nota Penolakan</label>
            <input type="text" :class="inputClass" />
          </div>
        </div>

        <!-- Divider -->
        <div class="border-t border-[rgb(var(--border-color))] my-6"></div>

        <!-- Important Notice with Toggle -->
        <div class="mb-6">
          <div class="flex items-start gap-3 p-4 rounded-lg border-2" :class="kertasFizikal ? 'border-[rgb(var(--success))]/30 bg-green-50/50' : 'border-[rgb(var(--border-color))] bg-[rgb(var(--bg-1))]'">
            <Icon :name="kertasFizikal ? 'mdi:check-circle' : 'mdi:alert-circle-outline'"
                  class="w-6 h-6 mt-0.5 flex-shrink-0"
                  :class="kertasFizikal ? 'text-[rgb(var(--success))]' : 'text-gray-400'" />
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-1">
                <span class="font-semibold text-sm text-[rgb(var(--text-color))]">Kertas Siasatan Fizikal Diterima</span>
                <!-- Toggle Switch -->
                <button
                  @click="kertasFizikal = !kertasFizikal"
                  class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/50 focus:ring-offset-2"
                  :class="kertasFizikal ? 'bg-[rgb(var(--success))]' : 'bg-gray-300'"
                >
                  <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                        :class="kertasFizikal ? 'translate-x-6' : 'translate-x-1'"></span>
                </button>
              </div>
              <p class="text-xs text-[rgb(var(--text-muted))] leading-relaxed">
                <Icon name="mdi:information-outline" class="w-3 h-3 inline mr-1" />
                PIS Tiulang Simpan tidak akan diaktif tanpa simpan TPR terlebih dahulu
              </p>
            </div>
          </div>
        </div>

        <!-- Status and Volume Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label :class="labelClass">
              Status
              <span class="text-red-500 ml-0.5">*</span>
            </label>
            <select :class="inputClass">
              <option>Telah Diterima Dari Polis/Agensi</option>
              <option>Dalam Semakan</option>
              <option>Selesai</option>
            </select>
          </div>
          <div>
            <label :class="labelClass">Jilid</label>
            <div class="flex gap-2">
              <input type="number" value="1" :class="inputClass" min="1" />
              <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700" title="Maklumat Jilid">
                <Icon name="mdi:information-outline" class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Jenis Kesalahan Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('jenisKesalahan')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:gavel" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Jenis Kesalahan</h2>
            <rs-badge size="sm" class="ml-2">{{ jenisKesalahanList.length }}</rs-badge>
            <div class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              <Icon name="mdi:sparkles" class="w-3 h-3" />
              <span>AI</span>
            </div>
          </div>
          <Icon
            :name="collapsedSections.jenisKesalahan ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': !collapsedSections.jenisKesalahan }"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.jenisKesalahan">
        <!-- Empty State -->
        <div v-if="jenisKesalahanList.length === 0" class="text-center py-12">
          <div class="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <Icon name="mdi:sparkles" class="w-10 h-10 text-purple-600" />
          </div>
          <p class="text-sm font-medium text-[rgb(var(--text-color))] mb-2">Tiada jenis kesalahan ditambah</p>
          <p class="text-xs text-[rgb(var(--text-muted))] mb-4 max-w-md mx-auto">
            Gunakan cadangan AI untuk mendapatkan syor Akta dan Seksyen yang relevan berdasarkan maklumat kes
          </p>
          <button @click="openAiModal" class="px-4 py-2 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center gap-2 font-medium mx-auto">
            <Icon name="mdi:sparkles" class="w-5 h-5" />
            Dapatkan Cadangan AI
          </button>
        </div>

        <!-- Table with Data -->
        <div v-else>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-[rgb(var(--bg-1))]">
                  <th class="px-4 py-3 text-left font-semibold text-[rgb(var(--text-color))]">Akta</th>
                  <th class="px-4 py-3 text-left font-semibold text-[rgb(var(--text-color))]">Seksyen</th>
                  <th class="px-4 py-3 text-left font-semibold text-[rgb(var(--text-color))]">Nota</th>
                  <th class="px-4 py-3 text-left font-semibold text-[rgb(var(--text-color))] w-24">Tindakan</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in jenisKesalahanList"
                  :key="item.id"
                  class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
                >
                  <td class="px-4 py-3">{{ item.akta }}</td>
                  <td class="px-4 py-3">
                    <rs-badge variant="outline" size="sm">{{ item.seksyen }}</rs-badge>
                  </td>
                  <td class="px-4 py-3 text-[rgb(var(--text-muted))]">{{ item.nota }}</td>
                  <td class="px-4 py-3">
                    <div class="flex gap-1">
                      <button @click="removeJenisKesalahan(item.id)" class="p-1.5 rounded hover:bg-red-50 transition-colors group" title="Padam">
                        <Icon name="mdi:delete" class="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                      </button>
                      <button class="p-1.5 rounded hover:bg-blue-50 transition-colors group" title="Maklumat">
                        <Icon name="mdi:information" class="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-4 flex justify-end border-t border-[rgb(var(--border-color))] pt-3">
            <button @click="openAiModal" class="px-4 py-2 text-sm bg-[rgb(var(--primary))] text-white rounded hover:opacity-90 transition-opacity flex items-center gap-2 font-medium">
              <Icon name="mdi:sparkles" class="w-5 h-5" />
              Cadangan AI
            </button>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Suspek/OKT Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('suspek')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:account-alert" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Suspek / OKT</h2>
            <rs-badge size="sm" class="ml-2">{{ suspekList.length }}</rs-badge>
          </div>
          <Icon
            :name="collapsedSections.suspek ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': !collapsedSections.suspek }"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.suspek">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Nama</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">No Kad Pengenalan</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Negara</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700 w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="suspek in suspekList"
                :key="suspek.id"
                class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-4 py-3 font-medium">{{ suspek.nama }}</td>
                <td class="px-4 py-3 text-[rgb(var(--text-muted))]">{{ suspek.ic }}</td>
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <Icon name="mdi:flag" class="w-4 h-4 text-gray-400" />
                    {{ suspek.negara }}
                  </div>
                </td>
                <td class="px-4 py-3">
                  <div class="flex gap-1">
                    <button class="p-1.5 rounded hover:bg-red-50 transition-colors group" title="Padam">
                      <Icon name="mdi:delete" class="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-blue-50 transition-colors group" title="Maklumat">
                      <Icon name="mdi:information" class="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 flex justify-end border-t border-[rgb(var(--border-color))] pt-3">
          <button class="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
            <Icon name="mdi:plus" class="w-5 h-5" />
            Tambah Suspek/OKT
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Mangsa/Pengadu Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('mangsa')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:account-group" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Mangsa / Pengadu / Si Mati / Lain-lain</h2>
            <rs-badge size="sm" class="ml-2">{{ mangsaList.length }}</rs-badge>
          </div>
          <Icon
            :name="collapsedSections.mangsa ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': !collapsedSections.mangsa }"
          />
        </button>
      </template>
      <template #body v-show="!collapsedSections.mangsa">
        <table class="w-full text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">Nama</th>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">No Kad Pengenalan</th>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">Kategori</th>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">Mangsa/Pengadu/Si Mati/Lain-lain</th>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-[rgb(var(--border-color))]">
              <td class="px-3 py-2.5">NORFAH IZZOL FAHMI BIN MOHD SHAHARI</td>
              <td class="px-3 py-2.5"></td>
              <td class="px-3 py-2.5">Pengadu</td>
              <td class="px-3 py-2.5">
                <div class="space-y-1 text-xs">
                  <div class="flex items-center gap-1">
                    <input type="checkbox" checked disabled class="w-3 h-3" />
                    <span>Mangsa</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <input type="checkbox" checked disabled class="w-3 h-3" />
                    <span>Pengadu</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <input type="checkbox" disabled class="w-3 h-3" />
                    <span>Si Mati</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <input type="checkbox" disabled class="w-3 h-3" />
                    <span>Lain-lain (Cth: Syarikat, Pertubuhan, Haiwan dll)</span>
                  </div>
                </div>
              </td>
              <td class="px-3 py-2.5">
                <div class="flex gap-2">
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
        <div class="mt-3 flex justify-end">
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Icon name="mdi:plus" class="w-4 h-4" />
            Tambah
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Additional Fields Card -->
    <rs-card class="mb-4">
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">Kategori</label>
            <input type="text" class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded" />
          </div>
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">Siasatan Aini</label>
            <select class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded">
              <option></option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">TPR Yang Menit</label>
            <input type="text" value="AMIS GUADAH BINTI ROSLI" class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded" />
          </div>
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">TPR Yang Disabitkan</label>
            <input type="text" class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded" />
          </div>
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">Tarikh Ada Pada TPR</label>
            <input type="date" value="2025-10-27" class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded" />
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Arahan/Tindakan Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('arahan')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:gavel" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Arahan / Tindakan</h2>
          </div>
          <Icon
            :name="collapsedSections.arahan ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': !collapsedSections.arahan }"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.arahan">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">Arahan TPR</label>
            <select class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded">
              <option>Tuduh</option>
              <option>Tidak Tuduh</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">Perincian Arahan TPR</label>
            <input type="text" value="39A(1) ADR 13(2) ADR" class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded" />
          </div>
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">Tarikh Arahan</label>
            <input type="date" value="2025-10-27" class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded" />
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Maklumat Daftar Keluar Section -->
    <rs-card class="mb-4">
      <template #header>
        <h2 class="text-lg font-semibold">Maklumat Daftar Keluar</h2>
      </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">Pegawai Yang Mengemukakan Kertas Siasatan</label>
            <input type="text" value="EJAN SABRINA" class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded" />
          </div>
          <div>
            <label class="text-sm font-medium text-[rgb(var(--text-color))] block mb-1">Tarikh Kertas Siasatan Diambil</label>
            <input type="date" value="2025-10-27" class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded" />
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Log Kemas Kini Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('log')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-2">
            <Icon name="mdi:history" class="w-5 h-5 text-blue-600" />
            <h2 class="text-lg font-semibold">Log Kemas Kini</h2>
            <rs-badge size="sm" variant="outline" class="ml-2">{{ logList.length }} rekod</rs-badge>
          </div>
          <Icon
            :name="collapsedSections.log ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'rotate-180': !collapsedSections.log }"
          />
        </button>
      </template>
      <template #body v-if="!collapsedSections.log">
        <div class="flex justify-end mb-3">
          <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
            <Icon name="mdi:filter" class="w-4 h-4" />
            Carian
          </button>
        </div>
        <table class="w-full text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">Tarikh</th>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">Status Sebelum</th>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">Status Baru</th>
              <th class="px-3 py-2 text-left font-semibold text-gray-700">ID Pengguna</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-[rgb(var(--border-color))]">
              <td class="px-3 py-2.5">27/10/2025 12:05:18 PM</td>
              <td class="px-3 py-2.5">Sudah Minit</td>
              <td class="px-3 py-2.5">Telah Diterbit Dari Polis/Agensi</td>
              <td class="px-3 py-2.5">norazimma</td>
            </tr>
            <tr class="border-b border-[rgb(var(--border-color))]">
              <td class="px-3 py-2.5">27/10/2024 12:05:43 PM</td>
              <td class="px-3 py-2.5">Ada Pada TPR</td>
              <td class="px-3 py-2.5">Sudah Minit</td>
              <td class="px-3 py-2.5">norazimma</td>
            </tr>
            <tr class="border-b border-[rgb(var(--border-color))]">
              <td class="px-3 py-2.5">27/10/2021 11:39:16 AM</td>
              <td class="px-3 py-2.5">Baru Terima</td>
              <td class="px-3 py-2.5">Ada Pada TPR</td>
              <td class="px-3 py-2.5">norazimma</td>
            </tr>
          </tbody>
        </table>
        <div class="mt-3 flex justify-end gap-2">
          <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
            <Icon name="mdi:chevron-left" class="w-4 h-4" />
          </button>
          <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded font-medium">1</button>
          <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
            <Icon name="mdi:chevron-right" class="w-4 h-4" />
          </button>
        </div>
      </template>
    </rs-card>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mt-6">
      <button class="px-4 py-2.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
        Kembali
      </button>
      <div class="flex gap-3">
        <button class="px-4 py-2.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
          Simpan Sebagai Draf
        </button>
        <button class="px-4 py-2.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-medium">
          Hantar
        </button>
      </div>
    </div>

    <!-- AI Suggestion Modal -->
    <div v-if="showAiModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="closeAiModal">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b border-[rgb(var(--border-color))]">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Icon name="mdi:sparkles" class="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-[rgb(var(--text-color))]">Cadangan AI - Jenis Kesalahan</h3>
              <p class="text-xs text-[rgb(var(--text-muted))]">Berdasarkan maklumat kertas siasatan</p>
            </div>
          </div>
          <button @click="closeAiModal" class="p-2 rounded hover:bg-gray-100 transition-colors">
            <Icon name="mdi:close" class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <!-- AI Info Banner -->
        <div class="p-4 bg-purple-50 border-b border-purple-100">
          <div class="flex items-start gap-3">
            <Icon name="mdi:lightbulb-on" class="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div class="flex-1">
              <p class="text-sm text-purple-900 font-medium mb-1">AI menganalisis maklumat kes anda</p>
              <p class="text-xs text-purple-700 leading-relaxed">
                Sistem AI telah menganalisis: No TPR, No Repot, Jabatan Agensi, maklumat Suspek, dan maklumat Mangsa untuk mencadangkan Akta dan Seksyen yang paling relevan.
              </p>
            </div>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Loading State -->
          <div v-if="isLoadingAiSuggestions" class="flex flex-col items-center justify-center py-12">
            <div class="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p class="text-sm text-[rgb(var(--text-muted))]">Menganalisis maklumat kes...</p>
          </div>

          <!-- AI Suggestions List -->
          <div v-else class="space-y-3">
            <div
              v-for="suggestion in aiSuggestions"
              :key="suggestion.id"
              @click="selectSuggestion(suggestion)"
              class="p-4 rounded-lg border-2 transition-all cursor-pointer"
              :class="selectedSuggestion?.id === suggestion.id
                ? 'border-purple-600 bg-purple-50'
                : 'border-[rgb(var(--border-color))] hover:border-purple-300 hover:bg-purple-50/50'"
            >
              <div class="flex items-start gap-3">
                <!-- Radio Button -->
                <div class="mt-1">
                  <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                       :class="selectedSuggestion?.id === suggestion.id
                         ? 'border-purple-600 bg-purple-600'
                         : 'border-gray-300'">
                    <div v-if="selectedSuggestion?.id === suggestion.id" class="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1">
                  <!-- Relevance Badge -->
                  <div class="flex items-center gap-2 mb-2">
                    <rs-badge :variant="suggestion.relevansi >= 90 ? 'success' : suggestion.relevansi >= 75 ? 'warning' : 'outline'" size="sm">
                      {{ suggestion.relevansi }}% Relevan
                    </rs-badge>
                    <span class="text-xs text-[rgb(var(--text-muted))]">{{ suggestion.alasan }}</span>
                  </div>

                  <!-- Act and Section -->
                  <div class="mb-2">
                    <h4 class="text-sm font-semibold text-[rgb(var(--text-color))] mb-1">{{ suggestion.akta }}</h4>
                    <div class="flex items-center gap-2">
                      <rs-badge variant="outline" size="sm">{{ suggestion.seksyen }}</rs-badge>
                      <span class="text-sm text-[rgb(var(--text-color))]">{{ suggestion.penerangan }}</span>
                    </div>
                  </div>

                  <!-- Notes -->
                  <div class="mt-2 p-3 rounded bg-gray-50 border border-gray-200">
                    <div class="flex items-start gap-2">
                      <Icon name="mdi:file-document-outline" class="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                      <p class="text-xs text-[rgb(var(--text-muted))] leading-relaxed">{{ suggestion.nota }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="p-4 border-t border-[rgb(var(--border-color))] bg-gray-50">
          <div class="flex items-center justify-between">
            <p class="text-xs text-[rgb(var(--text-muted))]">
              <Icon name="mdi:information-outline" class="w-3 h-3 inline mr-1" />
              Pilih cadangan yang paling sesuai dengan kes anda
            </p>
            <div class="flex gap-3">
              <button @click="closeAiModal" class="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
                Batal
              </button>
              <button
                @click="addSelectedSuggestion"
                :disabled="!selectedSuggestion"
                class="px-4 py-2 text-sm rounded transition-all flex items-center gap-2 font-medium"
                :class="selectedSuggestion
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'">
                <Icon name="mdi:check" class="w-4 h-4" />
                Tambah Kesalahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
