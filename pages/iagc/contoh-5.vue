<script setup>
definePageMeta({
  title: "Pendaftaran Kedai Gunting Rambut",
  middleware: ["auth", "dashboard"],
})

// Active tab state
const activeTab = ref('pendaftaran')

// Tabs configuration
const tabs = [
  { id: 'pendaftaran', label: 'Senarai Pendaftaran', icon: 'mdi:store', count: 12 },
  { id: 'semakan', label: 'Dalam Semakan', icon: 'mdi:file-search', count: 5 },
  { id: 'lulus', label: 'Lulus', icon: 'mdi:check-circle', count: 8 },
  { id: 'ditolak', label: 'Ditolak', icon: 'mdi:close-circle', count: 2 },
]

// Search & Filter
const searchQuery = ref('')
const selectedDistrict = ref('ALL')

const districts = ['ALL', 'KUALA LUMPUR', 'PETALING JAYA', 'SHAH ALAM', 'KLANG', 'SUBANG JAYA']

// Sample data - Pendaftaran
const dataPendaftaran = ref([
  {
    id: 1,
    tarikhMohon: '25/10/2025',
    noPermohonan: 'BBR-2025-0001',
    namaKedai: 'Barber House KL',
    pemilik: 'Ahmad bin Hassan',
    lokasi: 'Lot 123, Jalan Sultan, Kuala Lumpur',
    telefon: '012-3456789',
    status: 'Baru',
    priority: 'medium'
  },
  {
    id: 2,
    tarikhMohon: '24/10/2025',
    noPermohonan: 'BBR-2025-0002',
    namaKedai: 'Premium Cuts Salon',
    pemilik: 'Siti Aminah binti Abdullah',
    lokasi: 'No 45, Jalan PJ 10, Petaling Jaya',
    telefon: '013-9876543',
    status: 'Baru',
    priority: 'high'
  },
  {
    id: 3,
    tarikhMohon: '23/10/2025',
    noPermohonan: 'BBR-2025-0003',
    namaKedai: 'Classic Barber Shop',
    pemilik: 'Raju a/l Krishnan',
    lokasi: 'Unit 5, Plaza Shah Alam',
    telefon: '014-2345678',
    status: 'Baru',
    priority: 'low'
  },
])

// Sample data - Dalam Semakan
const dataSemakan = ref([
  {
    id: 4,
    tarikhMohon: '20/10/2025',
    noPermohonan: 'BBR-2025-0004',
    namaKedai: 'Urban Grooming Studio',
    pemilik: 'Lee Wei Ming',
    lokasi: 'G-12, Subang Parade',
    telefon: '016-7788990',
    status: 'Dalam Semakan',
    petugas: 'Encik Amir'
  },
  {
    id: 5,
    tarikhMohon: '18/10/2025',
    noPermohonan: 'BBR-2025-0005',
    namaKedai: 'Gents Hair Studio',
    pemilik: 'Kumar a/l Rajesh',
    lokasi: 'Jalan Klang Lama',
    telefon: '012-9988776',
    status: 'Dalam Semakan',
    petugas: 'Puan Fatimah'
  },
])

// Sample data - Lulus
const dataLulus = ref([
  {
    id: 6,
    tarikhMohon: '15/10/2025',
    tarikhLulus: '22/10/2025',
    noPermohonan: 'BBR-2025-0006',
    namaKedai: 'Elite Barber House',
    pemilik: 'Mohd Faiz bin Ismail',
    lokasi: 'Bangsar Village II',
    telefon: '019-3344556',
    status: 'Lulus',
    noLesen: 'BBR-LIC-2025-001'
  },
])

// Sample data - Ditolak
const dataDitolak = ref([
  {
    id: 7,
    tarikhMohon: '10/10/2025',
    tarikhTolak: '20/10/2025',
    noPermohonan: 'BBR-2025-0007',
    namaKedai: 'Quick Cuts',
    pemilik: 'Tan Ah Kow',
    lokasi: 'Cheras',
    telefon: '011-2233445',
    status: 'Ditolak',
    alasan: 'Dokumen tidak lengkap'
  },
])

// Get badge variant based on status
const getStatusVariant = (status) => {
  const variants = {
    'Baru': 'warning',
    'Dalam Semakan': 'default',
    'Lulus': 'success',
    'Ditolak': 'error',
  }
  return variants[status] || 'default'
}

// Get priority color
const getPriorityColor = (priority) => {
  const colors = {
    'high': 'text-red-600',
    'medium': 'text-yellow-600',
    'low': 'text-green-600'
  }
  return colors[priority] || 'text-gray-600'
}

// Computed data based on active tab
const currentData = computed(() => {
  switch(activeTab.value) {
    case 'pendaftaran': return dataPendaftaran.value
    case 'semakan': return dataSemakan.value
    case 'lulus': return dataLulus.value
    case 'ditolak': return dataDitolak.value
    default: return []
  }
})

// Computed counts
const totalPendaftaran = computed(() => dataPendaftaran.value.length)
const totalSemakan = computed(() => dataSemakan.value.length)
const totalLulus = computed(() => dataLulus.value.length)
const totalDitolak = computed(() => dataDitolak.value.length)
</script>

<template>
  <div class="container mx-auto px-4 py-6 lg:px-6">
    <!-- Page Header -->
    <div class="mb-4">
      <h1 class="text-xl font-bold text-[rgb(var(--text-color))]">Pendaftaran Kedai Gunting Rambut</h1>
      <div class="flex items-center gap-2 mt-2 text-sm text-[rgb(var(--text-muted))]">
        <span>Pengurusan Perniagaan</span>
        <span>/</span>
        <span class="text-[rgb(var(--text-color))] font-medium">Pendaftaran Kedai Gunting Rambut</span>
      </div>
    </div>

    <!-- Stats Cards Row -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      <rs-card>
        <template #body>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[rgb(var(--text-muted))]">Baru</p>
              <p class="text-2xl font-bold text-[rgb(var(--text-color))] mt-1">{{ totalPendaftaran }}</p>
            </div>
            <div class="w-10 h-10 bg-yellow-100 rounded flex items-center justify-center">
              <Icon name="mdi:store-alert" class="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[rgb(var(--text-muted))]">Semakan</p>
              <p class="text-2xl font-bold text-[rgb(var(--text-color))] mt-1">{{ totalSemakan }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
              <Icon name="mdi:file-search" class="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[rgb(var(--text-muted))]">Lulus</p>
              <p class="text-2xl font-bold text-[rgb(var(--text-color))] mt-1">{{ totalLulus }}</p>
            </div>
            <div class="w-10 h-10 bg-green-100 rounded flex items-center justify-center">
              <Icon name="mdi:check-circle" class="w-5 h-5 text-green-600" />
            </div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[rgb(var(--text-muted))]">Ditolak</p>
              <p class="text-2xl font-bold text-[rgb(var(--text-color))] mt-1">{{ totalDitolak }}</p>
            </div>
            <div class="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
              <Icon name="mdi:close-circle" class="w-5 h-5 text-red-600" />
            </div>
          </div>
        </template>
      </rs-card>
    </div>

    <!-- Tabs Navigation -->
    <div class="border-b border-[rgb(var(--border-color))] mb-4">
      <div class="flex gap-1 overflow-x-auto">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-2"
          :class="activeTab === tab.id
            ? 'text-[rgb(var(--primary))] border-b-2 border-[rgb(var(--primary))]'
            : 'text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-color))]'"
        >
          <Icon :name="tab.icon" class="w-4 h-4" />
          <span>{{ tab.label }}</span>
          <rs-badge size="sm" :variant="activeTab === tab.id ? 'primary' : 'default'">
            {{ tab.count }}
          </rs-badge>
        </button>
      </div>
    </div>

    <!-- Search & Filter Bar -->
    <div class="flex flex-col md:flex-row gap-3 mb-4">
      <div class="flex-1">
        <div class="relative">
          <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(var(--text-muted))]" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama kedai, pemilik, atau no. permohonan..."
            class="w-full pl-10 pr-4 py-2.5 text-sm border border-[rgb(var(--border-color))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 focus:border-[rgb(var(--primary))]"
          />
        </div>
      </div>
      <select
        v-model="selectedDistrict"
        class="px-4 py-2.5 text-sm border border-[rgb(var(--border-color))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 focus:border-[rgb(var(--primary))]"
      >
        <option v-for="district in districts" :key="district" :value="district">
          {{ district === 'ALL' ? 'Semua Daerah' : district }}
        </option>
      </select>
      <rs-button variant="primary">
        <Icon name="mdi:plus" class="w-4 h-4 mr-2" />
        Tambah Permohonan
      </rs-button>
    </div>

    <!-- Tab Content - Pendaftaran -->
    <rs-card v-if="activeTab === 'pendaftaran'">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Senarai Permohonan Baru</h2>
          <rs-badge variant="warning">{{ totalPendaftaran }} Permohonan</rs-badge>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-[rgb(var(--bg-1))]">
              <tr>
                <th class="px-3 py-2 text-left font-semibold">Tarikh Mohon</th>
                <th class="px-3 py-2 text-left font-semibold">No. Permohonan</th>
                <th class="px-3 py-2 text-left font-semibold">Nama Kedai</th>
                <th class="px-3 py-2 text-left font-semibold">Pemilik</th>
                <th class="px-3 py-2 text-left font-semibold">Lokasi</th>
                <th class="px-3 py-2 text-left font-semibold">Telefon</th>
                <th class="px-3 py-2 text-left font-semibold">Status</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in dataPendaftaran"
                :key="item.id"
                class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-3 py-2.5">{{ item.tarikhMohon }}</td>
                <td class="px-3 py-2.5 font-medium text-[rgb(var(--primary))]">{{ item.noPermohonan }}</td>
                <td class="px-3 py-2.5 font-medium">{{ item.namaKedai }}</td>
                <td class="px-3 py-2.5">{{ item.pemilik }}</td>
                <td class="px-3 py-2.5 text-[rgb(var(--text-muted))]">{{ item.lokasi }}</td>
                <td class="px-3 py-2.5">{{ item.telefon }}</td>
                <td class="px-3 py-2.5">
                  <rs-badge :variant="getStatusVariant(item.status)">{{ item.status }}</rs-badge>
                </td>
                <td class="px-3 py-2.5">
                  <div class="flex gap-1">
                    <button class="p-1.5 rounded hover:bg-blue-50 transition-colors" title="Lihat">
                      <Icon name="mdi:eye" class="w-4 h-4 text-blue-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-green-50 transition-colors" title="Proses">
                      <Icon name="mdi:check" class="w-4 h-4 text-green-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-red-50 transition-colors" title="Hapus">
                      <Icon name="mdi:delete" class="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>

    <!-- Tab Content - Dalam Semakan -->
    <rs-card v-if="activeTab === 'semakan'">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Permohonan Dalam Semakan</h2>
          <rs-badge>{{ totalSemakan }} Permohonan</rs-badge>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-[rgb(var(--bg-1))]">
              <tr>
                <th class="px-3 py-2 text-left font-semibold">Tarikh Mohon</th>
                <th class="px-3 py-2 text-left font-semibold">No. Permohonan</th>
                <th class="px-3 py-2 text-left font-semibold">Nama Kedai</th>
                <th class="px-3 py-2 text-left font-semibold">Pemilik</th>
                <th class="px-3 py-2 text-left font-semibold">Petugas</th>
                <th class="px-3 py-2 text-left font-semibold">Status</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in dataSemakan"
                :key="item.id"
                class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-3 py-2.5">{{ item.tarikhMohon }}</td>
                <td class="px-3 py-2.5 font-medium text-[rgb(var(--primary))]">{{ item.noPermohonan }}</td>
                <td class="px-3 py-2.5 font-medium">{{ item.namaKedai }}</td>
                <td class="px-3 py-2.5">{{ item.pemilik }}</td>
                <td class="px-3 py-2.5">
                  <div class="flex items-center gap-2">
                    <Icon name="mdi:account" class="w-4 h-4 text-[rgb(var(--text-muted))]" />
                    <span>{{ item.petugas }}</span>
                  </div>
                </td>
                <td class="px-3 py-2.5">
                  <rs-badge :variant="getStatusVariant(item.status)">{{ item.status }}</rs-badge>
                </td>
                <td class="px-3 py-2.5">
                  <div class="flex gap-1">
                    <button class="p-1.5 rounded hover:bg-blue-50 transition-colors" title="Lihat">
                      <Icon name="mdi:eye" class="w-4 h-4 text-blue-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-green-50 transition-colors" title="Luluskan">
                      <Icon name="mdi:check-circle" class="w-4 h-4 text-green-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-red-50 transition-colors" title="Tolak">
                      <Icon name="mdi:close-circle" class="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>

    <!-- Tab Content - Lulus -->
    <rs-card v-if="activeTab === 'lulus'">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Permohonan Diluluskan</h2>
          <rs-badge variant="success">{{ totalLulus }} Permohonan</rs-badge>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-[rgb(var(--bg-1))]">
              <tr>
                <th class="px-3 py-2 text-left font-semibold">Tarikh Mohon</th>
                <th class="px-3 py-2 text-left font-semibold">Tarikh Lulus</th>
                <th class="px-3 py-2 text-left font-semibold">No. Permohonan</th>
                <th class="px-3 py-2 text-left font-semibold">No. Lesen</th>
                <th class="px-3 py-2 text-left font-semibold">Nama Kedai</th>
                <th class="px-3 py-2 text-left font-semibold">Pemilik</th>
                <th class="px-3 py-2 text-left font-semibold">Status</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in dataLulus"
                :key="item.id"
                class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-3 py-2.5">{{ item.tarikhMohon }}</td>
                <td class="px-3 py-2.5">{{ item.tarikhLulus }}</td>
                <td class="px-3 py-2.5 font-medium text-[rgb(var(--primary))]">{{ item.noPermohonan }}</td>
                <td class="px-3 py-2.5 font-semibold text-green-600">{{ item.noLesen }}</td>
                <td class="px-3 py-2.5 font-medium">{{ item.namaKedai }}</td>
                <td class="px-3 py-2.5">{{ item.pemilik }}</td>
                <td class="px-3 py-2.5">
                  <rs-badge :variant="getStatusVariant(item.status)">{{ item.status }}</rs-badge>
                </td>
                <td class="px-3 py-2.5">
                  <div class="flex gap-1">
                    <button class="p-1.5 rounded hover:bg-blue-50 transition-colors" title="Lihat">
                      <Icon name="mdi:eye" class="w-4 h-4 text-blue-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-green-50 transition-colors" title="Cetak Lesen">
                      <Icon name="mdi:printer" class="w-4 h-4 text-green-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>

    <!-- Tab Content - Ditolak -->
    <rs-card v-if="activeTab === 'ditolak'">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Permohonan Ditolak</h2>
          <rs-badge variant="error">{{ totalDitolak }} Permohonan</rs-badge>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-[rgb(var(--bg-1))]">
              <tr>
                <th class="px-3 py-2 text-left font-semibold">Tarikh Mohon</th>
                <th class="px-3 py-2 text-left font-semibold">Tarikh Tolak</th>
                <th class="px-3 py-2 text-left font-semibold">No. Permohonan</th>
                <th class="px-3 py-2 text-left font-semibold">Nama Kedai</th>
                <th class="px-3 py-2 text-left font-semibold">Pemilik</th>
                <th class="px-3 py-2 text-left font-semibold">Alasan</th>
                <th class="px-3 py-2 text-left font-semibold">Status</th>
                <th class="px-3 py-2 text-left font-semibold w-24">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in dataDitolak"
                :key="item.id"
                class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-3 py-2.5">{{ item.tarikhMohon }}</td>
                <td class="px-3 py-2.5">{{ item.tarikhTolak }}</td>
                <td class="px-3 py-2.5 font-medium text-[rgb(var(--primary))]">{{ item.noPermohonan }}</td>
                <td class="px-3 py-2.5 font-medium">{{ item.namaKedai }}</td>
                <td class="px-3 py-2.5">{{ item.pemilik }}</td>
                <td class="px-3 py-2.5 text-[rgb(var(--text-muted))]">{{ item.alasan }}</td>
                <td class="px-3 py-2.5">
                  <rs-badge :variant="getStatusVariant(item.status)">{{ item.status }}</rs-badge>
                </td>
                <td class="px-3 py-2.5">
                  <div class="flex gap-1">
                    <button class="p-1.5 rounded hover:bg-blue-50 transition-colors" title="Lihat">
                      <Icon name="mdi:eye" class="w-4 h-4 text-blue-600" />
                    </button>
                    <button class="p-1.5 rounded hover:bg-red-50 transition-colors" title="Hapus">
                      <Icon name="mdi:delete" class="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>
  </div>
</template>
