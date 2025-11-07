<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  title: "Analisa Data (Had Kifayah)",
  middleware: ["auth"],
  requiresAuth: true,
  breadcrumb: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profiling", path: "/profiling" },
    { name: "Pendaftaran Lengkap", path: "/mockup-asnaf-profiling" },
    { name: "Had Kifayah", path: "/mockup-asnaf-profiling/had-kifayah" },
  ],
})

// This page corresponds to: https://lzs-nine.vercel.app/BF-PRF/AS/FR/04
// Had Kifayah calculation based on registration data

// Mock data based on completed registration
const noKadPengenalan = ref('770319035991')
const pendapatan = ref(1000)
const pendapatanTanggungan = ref(0)

// Mock calculation data (in real implementation, this would come from backend calculation)
const hadKifayahItems = ref([
  { kategori: 'Dewasa Tidak Bekerja', hadKifayah: 167.00, bil: 1 },
  { kategori: 'Rumah Tidak Berbayar', hadKifayah: 780.00, bil: 1 },
  { kategori: 'Tanggungan 7-17 tahun', hadKifayah: 408.00, bil: 1 },
  { kategori: 'Tanggungan Belajar IPT', hadKifayah: 613.00, bil: 1 },
])

// Computed calculations
const jumlahHadKifayah = computed(() => {
  return hadKifayahItems.value.reduce((sum, item) => sum + (item.hadKifayah * item.bil), 0)
})

const jumlahPendapatanKeluarga = computed(() => {
  return pendapatan.value + pendapatanTanggungan.value
})

const jurangHadKifayah = computed(() => {
  return jumlahPendapatanKeluarga.value - jumlahHadKifayah.value
})

const peratusPerbezaan = computed(() => {
  if (jumlahHadKifayah.value === 0) return 0
  return ((jumlahPendapatanKeluarga.value / jumlahHadKifayah.value) * 100).toFixed(2)
})

const kategoriAsnaf = computed(() => {
  // Logic: If percentage < 100%, they are "Miskin" (poor), otherwise "Asnaf" (eligible)
  return parseFloat(peratusPerbezaan.value) < 100 ? 'Miskin' : 'Asnaf'
})

const kategoriKeluarga = computed(() => {
  return parseFloat(peratusPerbezaan.value) < 100 ? 'Miskin' : 'Asnaf'
})

function handleKembali() {
  navigateTo('/mockup-asnaf-profiling')
}

function handleSeterusnya() {
  // Navigate to next step (Analisa Multidimensi)
  // For mockup, just go to dashboard
  navigateTo('/dashboard')
}
</script>

<template>
  <div class="page-container">
    <LayoutsBreadcrumb />

    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">Analisa Data (Had Kifayah) (NAS)</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Proses mengira had kifayah asnaf berdasarkan maklumat yang dimasukkan</p>
    </div>

    <rs-card>
      <template #body>
        <div class="space-y-6">
          <!-- Input Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormKit
              type="text"
              label="No. Kad Pengenalan"
              v-model="noKadPengenalan"
              disabled
            />
            <FormKit
              type="number"
              label="Pendapatan (RM)"
              v-model="pendapatan"
            />
            <FormKit
              type="number"
              label="Pendapatan Tanggungan (RM)"
              v-model="pendapatanTanggungan"
            />
          </div>

          <!-- Calculation Results -->
          <div class="mt-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Hasil Pengiraan Had Kifayah</h3>

            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-50 dark:bg-gray-800">
                    <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Kategori
                    </th>
                    <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Had Kifayah
                    </th>
                    <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Bil
                    </th>
                    <th class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Jumlah
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in hadKifayahItems" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                      {{ item.kategori }}
                    </td>
                    <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-right text-gray-900 dark:text-gray-100">
                      {{ item.hadKifayah.toFixed(2) }}
                    </td>
                    <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-center text-gray-900 dark:text-gray-100">
                      {{ item.bil }}
                    </td>
                    <td class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm text-right font-semibold text-gray-900 dark:text-gray-100">
                      {{ (item.hadKifayah * item.bil).toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="bg-blue-50 dark:bg-blue-900/20">
                    <td colspan="4" class="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right text-base font-bold text-blue-900 dark:text-blue-100">
                      Jumlah Had Kifayah: RM{{ jumlahHadKifayah.toFixed(2) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Summary Calculations -->
          <div class="mt-6 space-y-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div class="text-sm">
              <span class="font-semibold text-gray-900 dark:text-gray-100">Jurang Had Kifayah:</span>
              <span class="text-gray-700 dark:text-gray-300 ml-2">
                Jumlah Pendapatan Keluarga - Jumlah Had Kifayah = {{ jumlahPendapatanKeluarga }} - {{ jumlahHadKifayah.toFixed(0) }} =
                <span :class="jurangHadKifayah < 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'">
                  {{ jurangHadKifayah }}
                </span>
              </span>
            </div>

            <div class="text-sm">
              <span class="font-semibold text-gray-900 dark:text-gray-100">Peratusan Perbezaan:</span>
              <span class="text-gray-700 dark:text-gray-300 ml-2">
                (Pendapatan Isi Rumah / Jumlah Had Kifayah) × 100 = ({{ jumlahPendapatanKeluarga }} / {{ jumlahHadKifayah.toFixed(0) }}) × 100 =
                <span class="font-bold">{{ peratusPerbezaan }}%</span>
              </span>
            </div>

            <div class="text-sm">
              <span class="font-semibold text-gray-900 dark:text-gray-100">Kategori Keluarga Asnaf:</span>
              <span class="ml-2">
                <rs-badge :variant="kategoriKeluarga === 'Miskin' ? 'danger' : 'success'">
                  {{ kategoriKeluarga }}
                </rs-badge>
              </span>
            </div>

            <div class="text-sm">
              <span class="font-semibold text-gray-900 dark:text-gray-100">Kategori Asnaf:</span>
              <span class="ml-2">
                <rs-badge :variant="kategoriAsnaf === 'Miskin' ? 'danger' : 'success'">
                  {{ kategoriAsnaf }}
                </rs-badge>
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 justify-end pt-4">
            <rs-button variant="secondary" @click="handleKembali">
              Kembali
            </rs-button>
            <rs-button variant="primary" @click="handleSeterusnya">
              Seterusnya
            </rs-button>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Status Progress (Optional - shows where user is in the process) -->
    <div class="mt-6">
      <rs-card>
        <template #header>
          <h3 class="text-lg font-semibold">Status Permohonan</h3>
        </template>
        <template #body>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:check" class="w-6 h-6 text-green-600" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-gray-100">Pendaftaran Lengkap</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Maklumat asnaf dan tanggungan telah lengkap</p>
              </div>
              <rs-badge variant="success">Selesai</rs-badge>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:check" class="w-6 h-6 text-green-600" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-gray-100">Pengiraan Had Kifayah</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Had kifayah telah dikira berdasarkan data</p>
              </div>
              <rs-badge variant="success">Selesai</rs-badge>
            </div>
            <div class="flex items-center gap-4 opacity-50">
              <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:chart-line" class="w-6 h-6 text-gray-400" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-gray-100">Analisa Multidimensi</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Penilaian menyeluruh terhadap kelayakan</p>
              </div>
              <rs-badge variant="secondary">Seterusnya</rs-badge>
            </div>
            <div class="flex items-center gap-4 opacity-50">
              <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Icon name="mdi:clipboard-check" class="w-6 h-6 text-gray-400" />
              </div>
              <div class="flex-1">
                <p class="font-semibold text-gray-900 dark:text-gray-100">Keputusan Akhir</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Keputusan kelayakan bantuan</p>
              </div>
              <rs-badge variant="secondary">Menunggu</rs-badge>
            </div>
          </div>
        </template>
      </rs-card>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 1.5rem;
}

@media (max-width: 768px) {
  .page-container {
    padding: 1rem;
  }
}
</style>
