<script setup>
definePageMeta({
  title: "Senarai Kertas Siasatan",
  middleware: ["auth", "dashboard"],
})

// Search & Filter State
const searchQuery = ref('')
const selectedStatus = ref(null)

// Quick filter pills
const statusFilters = [
  { label: 'Semua', value: null, count: 85, color: 'default' },
  { label: 'Belum Lengkap', value: 'belum', count: 75, color: 'warning' },
  { label: 'Sudah Lengkap', value: 'sudah', count: 29, color: 'success' },
  { label: 'Baru Terima', value: 'baru', count: 45, color: 'primary' },
]

// Collapsible sections
const collapsedSections = ref({
  belumLengkap: false,
  sudahLengkap: false,
  statusOverview: false,
})

// Sample Data - Belum Lengkap
const dataBelumLengkap = ref([
  { id: 1, tarikh: '27/10/2025', noRepot: 'KUAH REPOT 13/69/24', noKertasSiasatan: 'IPRLANDS/AW/JS/ln/ADB/2703/24', pegawai: 'SJIN SYAHRUBBIN BIN CHE MOHAMAD', status: 'Draf', priority: 'high' },
  { id: 2, tarikh: '27/10/2025', noRepot: 'PDG MATSIRAT/3094/25', noKertasSiasatan: 'LNW/JS/KP/ST/17/25', pegawai: 'MUHAMMAD SODIQIN BIN MOHAMED ANIP', status: 'Draf', priority: 'medium' },
  { id: 3, tarikh: '26/10/2025', noRepot: 'KUALA NERANG 2572/25', noKertasSiasatan: 'PT/JS/KP/525/45/25', pegawai: 'SURAINI BINTI CHE ISHAK', status: 'Draf', priority: 'low' },
  { id: 4, tarikh: '26/10/2025', noRepot: 'KUALA KEDAH 4092/2025', noKertasSiasatan: 'JS/ln/ADB/3749/2025', pegawai: 'FHAHIS AFFENDI BIN KHAMIS', status: 'Draf', priority: 'high' },
  { id: 5, tarikh: '26/10/2025', noRepot: 'TRAFIK PENDANG/1669/24', noKertasSiasatan: 'KST/603/24', pegawai: 'ZAMZURNIA AHMAD', status: 'Draf', priority: 'medium' },
])

// Sample Data - Sudah Lengkap
const dataSudahLengkap = ref([
  { id: 11, tarikh: '08/09/2025', noRepot: 'YAN/511/25', noKertasSiasatan: 'YAN/JS/ln-ADB/1102/2025', pegawai: 'MOHAMAD ZULFAULI BIN FAZOL', status: 'Selesai' },
  { id: 12, tarikh: '15/09/2025', noRepot: 'YAN/1325/22', noKertasSiasatan: 'IPRYAN/JS/ln/ADB/136/22', pegawai: 'MOHD FAKHROOI BIN ALI', status: 'Selesai' },
  { id: 13, tarikh: '26/10/2025', noRepot: 'TRAFIK PENDANG/1669/25', noKertasSiasatan: 'KST/532/25', pegawai: 'ZAMZURNIA AHMAD', status: 'Dalam Semakan' },
  { id: 14, tarikh: '09/07/2025', noRepot: 'TRAFIK PENDANG/1340/25', noKertasSiasatan: 'FTMTNO/316/25', pegawai: 'ZAMZURNIA AHMAD', status: 'Selesai' },
])

// Status Overview Data
const statusOverview = ref([
  { noTpr: 'KS/KEDAH/2023/17215', noRepot: 'YAN- 3411/23', noKertasSiasatan: 'YAN/JS/JKS/107/23', jilid: '1', status: 'Baru Terima', pegawai: '' },
  { noTpr: 'KS/KEDAH/2023/17214', noRepot: 'YAN- 3247/23', noKertasSiasatan: 'YAN/JS/JKS/104/23', jilid: '1', status: 'Baru Terima', pegawai: '' },
  { noTpr: 'KS/KEDAH/2023/520', noRepot: 'Yan-3074/20', noKertasSiasatan: 'Yan/jg/166/20', jilid: '1', status: 'Telah Diambil', pegawai: 'INSP CHE NORHAYATI' },
  { noTpr: 'KS/KEDAH/2023/3666/23', noRepot: 'YAN- 3666/23', noKertasSiasatan: 'YAN/JS/JKS/92/23', jilid: '1', status: 'Telah Diambil', pegawai: 'INSP HAYATI' },
])

// Toggle section collapse
const toggleSection = (section) => {
  collapsedSections.value[section] = !collapsedSections.value[section]
}

// Get badge variant based on status
const getStatusVariant = (status) => {
  const variants = {
    'Draf': 'outline',
    'Selesai': 'success',
    'Dalam Semakan': 'warning',
    'Baru Terima': 'primary',
    'Telah Diambil': 'success'
  }
  return variants[status] || 'outline'
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

// Computed values
const totalBelumLengkap = computed(() => dataBelumLengkap.value.length)
const totalSudahLengkap = computed(() => dataSudahLengkap.value.length)
</script>

<template>
  <div class="container mx-auto px-4 py-6 lg:px-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-xl font-bold text-[rgb(var(--text-color))]">Senarai Kertas Siasatan</h1>
      <div class="flex items-center gap-2 mt-2 text-sm text-[rgb(var(--text-muted))]">
        <span>Kertas Siasatan</span>
        <span>/</span>
        <span class="text-[rgb(var(--text-color))] font-medium">Senarai Kertas Siasatan</span>
      </div>
    </div>

    <!-- Stats Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <rs-card>
        <template #body>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[rgb(var(--text-muted))] mb-1">Jumlah Kertas</p>
              <p class="text-2xl font-bold text-[rgb(var(--text-color))]">88,520</p>
              <p class="text-xs text-[rgb(var(--text-muted))] mt-1">
                <Icon name="mdi:trending-up" class="w-3 h-3 inline text-green-600" />
                <span class="text-green-600">+12%</span> dari bulan lalu
              </p>
            </div>
            <div class="p-3 rounded-lg bg-blue-100">
              <Icon name="mdi:file-document-multiple" class="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[rgb(var(--text-muted))] mb-1">Belum Lengkap</p>
              <p class="text-2xl font-bold text-yellow-600">{{ totalBelumLengkap }}</p>
              <p class="text-xs text-[rgb(var(--text-muted))] mt-1">Perlu tindakan</p>
            </div>
            <div class="p-3 rounded-lg bg-yellow-100">
              <Icon name="mdi:alert-circle" class="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[rgb(var(--text-muted))] mb-1">Sudah Lengkap</p>
              <p class="text-2xl font-bold text-green-600">{{ totalSudahLengkap }}</p>
              <p class="text-xs text-[rgb(var(--text-muted))] mt-1">Siap untuk cetak</p>
            </div>
            <div class="p-3 rounded-lg bg-green-100">
              <Icon name="mdi:check-circle" class="w-8 h-8 text-green-600" />
            </div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-[rgb(var(--text-muted))] mb-1">Baru Hari Ini</p>
              <p class="text-2xl font-bold text-[rgb(var(--primary))]">23</p>
              <p class="text-xs text-[rgb(var(--text-muted))] mt-1">Diterima pagi tadi</p>
            </div>
            <div class="p-3 rounded-lg bg-blue-100">
              <Icon name="mdi:clock-fast" class="w-8 h-8 text-[rgb(var(--primary))]" />
            </div>
          </div>
        </template>
      </rs-card>
    </div>

    <!-- Search & Quick Filters -->
    <rs-card class="mb-4">
      <template #body>
        <div class="flex flex-col gap-4">
          <!-- Search Bar -->
          <div class="flex flex-col md:flex-row gap-3">
            <div class="flex-1 relative">
              <Icon name="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari No Repot, No Kertas Siasatan, Pegawai..."
                class="w-full pl-10 pr-4 py-2.5 text-sm border border-[rgb(var(--border-color))] rounded focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))]/20 focus:border-[rgb(var(--primary))] transition-all"
              />
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-2">
              <button class="px-4 py-2.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium whitespace-nowrap">
                <Icon name="mdi:download" class="w-4 h-4" />
                Export Excel
              </button>
              <button class="px-4 py-2.5 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap text-gray-700">
                <Icon name="mdi:printer" class="w-4 h-4" />
                Cetak Semua
              </button>
            </div>
          </div>

          <!-- Quick Filter Pills -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="filter in statusFilters"
              :key="filter.value"
              @click="selectedStatus = filter.value"
              class="px-4 py-2 rounded-full text-sm font-medium transition-all"
              :class="selectedStatus === filter.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              {{ filter.label }}
              <span class="ml-2 px-2 py-0.5 rounded-full text-xs"
                    :class="selectedStatus === filter.value ? 'bg-white/20' : 'bg-gray-300'">
                {{ filter.count }}
              </span>
            </button>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Kertas Siasatan Belum Lengkap Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('belumLengkap')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:file-document-alert" class="w-5 h-5 text-yellow-600" />
            <h2 class="text-lg font-semibold">Senarai Kertas Siasatan Belum Lengkap</h2>
            <rs-badge variant="warning" size="sm">{{ totalBelumLengkap }} rekod</rs-badge>
          </div>
          <Icon
            :name="collapsedSections.belumLengkap ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>

      <template #body v-if="!collapsedSections.belumLengkap">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-3 text-left font-semibold w-32 text-gray-700">Tarikh</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">No Repot</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">No Kertas Siasatan</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Pegawai Penyiasat</th>
                <th class="px-4 py-3 text-center font-semibold w-24 text-gray-700">Prioriti</th>
                <th class="px-4 py-3 text-center font-semibold w-32 text-gray-700">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in dataBelumLengkap"
                :key="item.id"
                class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-4 py-3 text-[rgb(var(--text-muted))]">{{ item.tarikh }}</td>
                <td class="px-4 py-3 font-medium">{{ item.noRepot }}</td>
                <td class="px-4 py-3 text-[rgb(var(--text-muted))]">{{ item.noKertasSiasatan }}</td>
                <td class="px-4 py-3">{{ item.pegawai }}</td>
                <td class="px-4 py-3 text-center">
                  <div class="flex items-center justify-center gap-1">
                    <Icon
                      :name="item.priority === 'high' ? 'mdi:flag' : item.priority === 'medium' ? 'mdi:flag-outline' : 'mdi:flag-off'"
                      class="w-4 h-4"
                      :class="getPriorityColor(item.priority)"
                    />
                  </div>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-center gap-1">
                    <button
                      class="p-2 rounded hover:bg-blue-50 transition-colors group"
                      title="Lihat"
                    >
                      <Icon name="mdi:eye" class="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </button>
                    <button
                      class="p-2 rounded hover:bg-green-50 transition-colors group"
                      title="Edit"
                    >
                      <Icon name="mdi:pencil" class="w-4 h-4 text-gray-500 group-hover:text-green-600" />
                    </button>
                    <button
                      class="p-2 rounded hover:bg-purple-50 transition-colors group"
                      title="Cetak"
                    >
                      <Icon name="mdi:printer" class="w-4 h-4 text-gray-500 group-hover:text-purple-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex items-center justify-between border-t border-[rgb(var(--border-color))] pt-4">
          <p class="text-sm text-[rgb(var(--text-muted))]">
            Menunjukkan <span class="font-semibold">1-{{ totalBelumLengkap }}</span> daripada
            <span class="font-semibold">75</span> rekod
          </p>
          <div class="flex gap-1">
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-700">
              <Icon name="mdi:chevron-left" class="w-4 h-4" />
            </button>
            <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded font-medium">1</button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">2</button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">3</button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
              <Icon name="mdi:chevron-right" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Kertas Siasatan Sudah Lengkap Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('sudahLengkap')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:file-document-check" class="w-5 h-5 text-green-600" />
            <h2 class="text-lg font-semibold">Senarai Kertas Siasatan Sudah Lengkap</h2>
            <rs-badge variant="success" size="sm">{{ totalSudahLengkap }} rekod</rs-badge>
          </div>
          <Icon
            :name="collapsedSections.sudahLengkap ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>

      <template #body v-if="!collapsedSections.sudahLengkap">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-3 text-left font-semibold w-32 text-gray-700">Tarikh</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">No Repot</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">No Kertas Siasatan</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Pegawai Penyiasat</th>
                <th class="px-4 py-3 text-center font-semibold w-32 text-gray-700">Status</th>
                <th class="px-4 py-3 text-center font-semibold w-32 text-gray-700">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in dataSudahLengkap"
                :key="item.id"
                class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-4 py-3 text-[rgb(var(--text-muted))]">{{ item.tarikh }}</td>
                <td class="px-4 py-3 font-medium">{{ item.noRepot }}</td>
                <td class="px-4 py-3 text-[rgb(var(--text-muted))]">{{ item.noKertasSiasatan }}</td>
                <td class="px-4 py-3">{{ item.pegawai }}</td>
                <td class="px-4 py-3 text-center">
                  <rs-badge :variant="getStatusVariant(item.status)" size="sm">{{ item.status }}</rs-badge>
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-center gap-1">
                    <button
                      class="p-2 rounded hover:bg-blue-50 transition-colors group"
                      title="Lihat"
                    >
                      <Icon name="mdi:eye" class="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    </button>
                    <button
                      class="p-2 rounded hover:bg-purple-50 transition-colors group"
                      title="Cetak"
                    >
                      <Icon name="mdi:printer" class="w-4 h-4 text-gray-500 group-hover:text-purple-600" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>

    <!-- Status Overview Section -->
    <rs-card class="mb-4">
      <template #header>
        <button
          @click="toggleSection('statusOverview')"
          class="w-full flex items-center justify-between cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div class="flex items-center gap-3">
            <Icon name="mdi:chart-box" class="w-5 h-5 text-[rgb(var(--primary))]" />
            <h2 class="text-lg font-semibold">Status Kertas Siasatan</h2>
            <rs-badge size="sm" variant="outline">{{ statusOverview.length }} daripada 88,520 rekod</rs-badge>
          </div>
          <Icon
            :name="collapsedSections.statusOverview ? 'mdi:chevron-down' : 'mdi:chevron-up'"
            class="w-5 h-5 transition-transform duration-200"
          />
        </button>
      </template>

      <template #body v-if="!collapsedSections.statusOverview">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-3 text-left font-semibold text-gray-700">No TPR</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">No Repot</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">No Kertas Siasatan</th>
                <th class="px-4 py-3 text-center font-semibold w-20 text-gray-700">Jilid</th>
                <th class="px-4 py-3 text-center font-semibold w-40 text-gray-700">Status</th>
                <th class="px-4 py-3 text-left font-semibold text-gray-700">Pengurusan KS</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in statusOverview"
                :key="item.noTpr"
                class="border-b border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-4 py-3 font-medium text-[rgb(var(--primary))]">{{ item.noTpr }}</td>
                <td class="px-4 py-3">{{ item.noRepot }}</td>
                <td class="px-4 py-3 text-[rgb(var(--text-muted))]">{{ item.noKertasSiasatan }}</td>
                <td class="px-4 py-3 text-center">
                  <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold">
                    {{ item.jilid }}
                  </div>
                </td>
                <td class="px-4 py-3 text-center">
                  <rs-badge :variant="getStatusVariant(item.status)" size="sm">
                    {{ item.status }}
                  </rs-badge>
                </td>
                <td class="px-4 py-3">
                  <span v-if="item.pegawai" class="flex items-center gap-2">
                    <Icon name="mdi:account" class="w-4 h-4 text-gray-400" />
                    {{ item.pegawai }}
                  </span>
                  <span v-else class="text-[rgb(var(--text-muted))] italic flex items-center gap-2">
                    <Icon name="mdi:minus-circle-outline" class="w-4 h-4" />
                    Tiada
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Advanced Pagination -->
        <div class="mt-4 flex items-center justify-between border-t border-[rgb(var(--border-color))] pt-4">
          <p class="text-sm text-[rgb(var(--text-muted))]">
            Halaman <span class="font-semibold">1</span> daripada <span class="font-semibold">8,852</span>
          </p>
          <div class="flex items-center gap-2">
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700" title="Halaman Pertama">
              <Icon name="mdi:chevron-double-left" class="w-4 h-4" />
            </button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
              <Icon name="mdi:chevron-left" class="w-4 h-4" />
            </button>
            <button class="px-3 py-2 text-sm bg-blue-600 text-white rounded font-medium">1</button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">2</button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">3</button>
            <span class="px-2 text-sm text-gray-500">...</span>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">8852</button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700">
              <Icon name="mdi:chevron-right" class="w-4 h-4" />
            </button>
            <button class="px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors text-gray-700" title="Halaman Terakhir">
              <Icon name="mdi:chevron-double-right" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </template>
    </rs-card>
  </div>
</template>
