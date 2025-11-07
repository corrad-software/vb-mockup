<script setup>
definePageMeta({
  title: "Statistik Kertas Siasatan",
  middleware: ["auth", "dashboard"],
})

// Filters
const selectedMonth = ref('All')
const selectedYear = ref('2025')
const selectedCategory = ref('TPR')

// KPI Cards - Most Important Info (Top Left)
const kpiCards = ref([
  { label: 'Jumlah Kertas', value: '47K', change: '+5.2%', isPositive: true, icon: 'mdi:file-document-multiple', color: '#0078D4' },
  { label: 'Patuh KPI', value: '94%', change: '+2%', isPositive: true, icon: 'mdi:check-circle', color: '#107C10' },
  { label: 'Dalam Proses', value: '2.5K', change: '-1.3%', isPositive: false, icon: 'mdi:clock-outline', color: '#FFB900' },
])

// Monthly data - Sorted chronologically
const monthlyData = ref([
  { month: 'Jan', value: 5.43 },
  { month: 'Feb', value: 4.74 },
  { month: 'Mac', value: 4.32 },
  { month: 'Apr', value: 4.09 },
  { month: 'Mei', value: 5.39 },
  { month: 'Jun', value: 4.03 },
  { month: 'Jul', value: 5.47 },
  { month: 'Ogos', value: 4.70 },
  { month: 'Sep', value: 4.25 },
  { month: 'Okt', value: 4.16 },
])

// Arahan TPR - Sorted by value (Best Practice: easier comparison)
const arahanTprData = ref([
  { label: 'Tuduh', value: 19.79, color: '#0078D4' },
  { label: 'Izin Kompaun', value: 7.67, color: '#107C10' },
  { label: 'Siasatan Lanjut', value: 3.95, color: '#FFB900' },
  { label: 'NFA', value: 3.90, color: '#00B7C3' },
  { label: 'Lain-lain', value: 3.69, color: '#8661C5' },
  { label: 'Izin Dakwa', value: 2.68, color: '#E74856' },
])

// Daerah data - Sorted by value descending (Best Practice)
const daerahData = ref([
  { daerah: 'TIMUR LAUT', kertas: 12.58, tpr: 39 },
  { daerah: 'SBG PERAI UTARA', kertas: 11.86, tpr: 43 },
  { daerah: 'SBG PERAI TENGAH', kertas: 9.12, tpr: 39 },
  { daerah: 'BARAT DAYA', kertas: 7.73, tpr: 35 },
  { daerah: 'SBG PERAI SELATAN', kertas: 5.28, tpr: 35 },
])

// KPI Status - Only 2 categories (Best Practice: avoid complex pie charts)
const statusData = ref([
  { status: 'Patuh', value: 94, color: '#107C10' },
  { status: 'Lewat', value: 6, color: '#D13438' },
])

// Computed
const maxMonthValue = computed(() => Math.max(...monthlyData.value.map(d => d.value)))
const maxArahanValue = computed(() => Math.max(...arahanTprData.value.map(d => d.value)))
const totalDaerah = computed(() => daerahData.value.reduce((sum, item) => sum + item.kertas, 0))
const totalTpr = computed(() => daerahData.value.reduce((sum, item) => sum + item.tpr, 0))

// Filter categories
const categories = ['TPR', 'DALAM TINDAKAN', 'BIL. ARAHAN', 'AKTA & SEKSYEN']
</script>

<template>
  <div class="min-h-screen bg-[#F3F2F1] p-6">
    <!-- Page Title - Clean and prominent -->
    <div class="mb-4">
      <h1 class="text-2xl font-semibold text-[#323130]">Statistik Kertas Siasatan</h1>
      <p class="text-sm text-[#605E5C] mt-1">Negeri Pulau Pinang</p>
    </div>

    <!-- Filter Bar -->
    <div class="flex items-center gap-3 mb-6 flex-wrap">
      <!-- Category Buttons -->
      <div class="flex gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
          class="px-4 py-2 rounded text-sm font-medium transition-all"
          :class="selectedCategory === cat
            ? 'bg-[#0078D4] text-white shadow-sm'
            : 'bg-white text-[#323130] border border-[#EDEBE9] hover:bg-[#F3F2F1]'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Date Filters -->
      <div class="flex gap-2 ml-auto">
        <select v-model="selectedMonth" class="px-3 py-2 text-sm bg-white border border-[#EDEBE9] rounded text-[#323130] outline-none focus:border-[#0078D4]">
          <option value="All">Semua Bulan</option>
          <option value="January">Januari</option>
          <option value="February">Februari</option>
        </select>
        <select v-model="selectedYear" class="px-3 py-2 text-sm bg-white border border-[#EDEBE9] rounded text-[#323130] outline-none focus:border-[#0078D4]">
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>
    </div>

    <!-- KPI Cards Row - Most Important Info First -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div
        v-for="kpi in kpiCards"
        :key="kpi.label"
        class="bg-white rounded border border-[#EDEBE9] p-5 hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2">
            <div
              class="w-10 h-10 rounded flex items-center justify-center"
              :style="{ backgroundColor: kpi.color + '15' }"
            >
              <Icon :name="kpi.icon" class="w-5 h-5" :style="{ color: kpi.color }" />
            </div>
          </div>
          <div
            class="text-xs font-semibold px-2 py-1 rounded"
            :class="kpi.isPositive ? 'text-[#107C10] bg-[#F3FEF6]' : 'text-[#D13438] bg-[#FEF6F6]'"
          >
            {{ kpi.change }}
          </div>
        </div>
        <div class="text-3xl font-semibold text-[#323130] mb-1">{{ kpi.value }}</div>
        <div class="text-sm text-[#605E5C]">{{ kpi.label }}</div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <!-- Column Chart - Monthly Trend (Left, larger) -->
      <div class="col-span-1 lg:col-span-8 bg-white rounded border border-[#EDEBE9] p-5">
        <h3 class="text-sm font-semibold text-[#323130] mb-4">Trend Bulanan (K)</h3>

        <!-- Chart Area -->
        <div class="h-64 flex items-end gap-1.5 px-2">
          <div v-for="item in monthlyData" :key="item.month" class="flex-1 flex flex-col items-center gap-2">
            <!-- Bar -->
            <div class="w-full flex flex-col items-center justify-end" style="height: 220px;">
              <div
                class="w-full bg-[#0078D4] rounded-t transition-all hover:bg-[#106EBE]"
                :style="{ height: `${(item.value / maxMonthValue) * 100}%` }"
              ></div>
            </div>
            <!-- Value Label -->
            <div class="text-xs font-medium text-[#323130]">{{ item.value }}K</div>
            <!-- Month Label -->
            <div class="text-xs text-[#605E5C]">{{ item.month }}</div>
          </div>
        </div>
      </div>

      <!-- Bar Chart - Arahan TPR (Right) -->
      <div class="col-span-1 lg:col-span-4 bg-white rounded border border-[#EDEBE9] p-5">
        <h3 class="text-sm font-semibold text-[#323130] mb-4">Arahan TPR (K)</h3>

        <div class="space-y-3">
          <div v-for="item in arahanTprData" :key="item.label" class="flex items-center gap-3">
            <!-- Label -->
            <div class="w-24 text-xs text-[#605E5C] text-right truncate" :title="item.label">
              {{ item.label }}
            </div>
            <!-- Bar -->
            <div class="flex-1 relative h-7 bg-[#F3F2F1] rounded overflow-hidden">
              <div
                class="absolute inset-y-0 left-0 rounded transition-all"
                :style="{
                  width: `${(item.value / maxArahanValue) * 100}%`,
                  backgroundColor: item.color
                }"
              ></div>
            </div>
            <!-- Value -->
            <div class="w-12 text-xs font-semibold text-[#323130] text-right">{{ item.value }}K</div>
          </div>
        </div>
      </div>

      <!-- Table - Daerah -->
      <div class="col-span-1 lg:col-span-8 bg-white rounded border border-[#EDEBE9] p-5">
        <h3 class="text-sm font-semibold text-[#323130] mb-4">Mengikut Daerah</h3>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="border-b-2 border-[#EDEBE9]">
              <tr>
                <th class="text-left py-2 px-3 font-semibold text-[#323130]">Daerah</th>
                <th class="text-right py-2 px-3 font-semibold text-[#323130]">Kertas (K)</th>
                <th class="text-right py-2 px-3 font-semibold text-[#323130]">TPR</th>
              </tr>
            </thead>
          <tbody>
            <tr
              v-for="(item, index) in daerahData"
              :key="item.daerah"
              class="border-b border-[#EDEBE9] hover:bg-[#F3F2F1] transition-colors"
            >
              <td class="py-2 px-3 text-[#323130]">{{ item.daerah }}</td>
              <td class="py-2 px-3 text-right font-medium text-[#323130]">{{ item.kertas }}K</td>
              <td class="py-2 px-3 text-right text-[#605E5C]">{{ item.tpr }}</td>
            </tr>
            <!-- Total Row -->
            <tr class="border-t-2 border-[#323130] bg-[#FAF9F8] font-semibold">
              <td class="py-2 px-3 text-[#323130]">Jumlah</td>
              <td class="py-2 px-3 text-right text-[#323130]">{{ totalDaerah.toFixed(2) }}K</td>
              <td class="py-2 px-3 text-right text-[#323130]">{{ totalTpr }}</td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      <!-- Donut Chart - KPI Status (Simple, 2 categories only) -->
      <div class="col-span-1 lg:col-span-4 bg-white rounded border border-[#EDEBE9] p-5">
        <h3 class="text-sm font-semibold text-[#323130] mb-4">Status KPI</h3>

        <!-- Donut Chart -->
        <div class="flex flex-col items-center justify-center">
          <div class="relative w-40 h-40 mb-4">
            <!-- SVG Donut -->
            <svg viewBox="0 0 100 100" class="transform -rotate-90">
              <!-- Background circle -->
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#EDEBE9"
                stroke-width="20"
              />
              <!-- Patuh segment (94%) -->
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#107C10"
                stroke-width="20"
                stroke-dasharray="236 251"
                stroke-linecap="round"
              />
              <!-- Lewat segment (6%) -->
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#D13438"
                stroke-width="20"
                stroke-dasharray="15 251"
                stroke-dashoffset="-236"
                stroke-linecap="round"
              />
            </svg>

            <!-- Center Value -->
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <div class="text-3xl font-bold text-[#323130]">94%</div>
              <div class="text-xs text-[#605E5C]">Patuh</div>
            </div>
          </div>

          <!-- Legend -->
          <div class="space-y-2 w-full">
            <div
              v-for="status in statusData"
              :key="status.status"
              class="flex items-center justify-between p-2 rounded"
              :style="{ backgroundColor: status.color + '10' }"
            >
              <div class="flex items-center gap-2">
                <div
                  class="w-3 h-3 rounded-full"
                  :style="{ backgroundColor: status.color }"
                ></div>
                <span class="text-xs text-[#323130]">{{ status.status }}</span>
              </div>
              <span class="text-sm font-semibold text-[#323130]">{{ status.value }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-6 text-xs text-[#605E5C] text-center">
      Data: 03-04-2023 hingga 27-10-2025 | Dikemas kini setiap hari
    </div>
  </div>
</template>

<style scoped>
/* Power BI-style scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #F3F2F1;
}

::-webkit-scrollbar-thumb {
  background: #C8C6C4;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #A19F9D;
}
</style>
