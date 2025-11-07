<script setup>
definePageMeta({
  title: "Semakan Data (Kemaskini) - PRF",
  middleware: ["auth"],
  requiresAuth: true,
  breadcrumb: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profiling", path: "/profiling" },
    { name: "Semakan Data (Kemaskini)", path: "/mockup-semakan-prf" },
  ],
})

const currentStep = ref(1) // 1: Peribadi, 2: Alamat, 3: Pendapatan & Perbelanjaan

// Before Update Data
const beforeData = ref({
  // Peribadi
  jenisId: 'MyKad',
  noId: '900101015555',
  nama: 'AHMAD BIN ALI',
  warganegara: 'Malaysia',
  tarikhLahir: '01/01/1990',
  umur: 35,
  tempatLahir: 'Shah Alam',
  jantina: 'Lelaki',
  agama: 'Islam',
  bangsa: 'Melayu',
  noTelefon: '0123456789',
  emel: 'ahmad@example.com',
  statusPerkahwinan: 'Berkahwin',
  statusPoligami: 'Tidak',

  // Alamat
  alamat1: 'No 10, Jalan Mawar 1',
  alamat2: 'Taman Mawar',
  alamat3: '',
  poskod: '40100',
  negeri: 'Selangor',
  daerah: 'Petaling',
  bandar: 'Shah Alam',
  kariah: 'Seksyen 7',
  tempohMenetap: 5,
  unitTempoh: 'Tahun',
  statusKediaman: 'Sewa',
  keadaanKediaman: 'Baik',
  kadarAmount: 800,

  // Pendapatan & Perbelanjaan
  perbelanjaanMakanan: 800,
  perbelanjaanSewa: 1200,
  perbelanjaanSekolah: 300,
  perbelanjaanPengangkutan: 150,
  perbelanjaanUtiliti: 200,
  perbelanjaanTakaful: 100,
  perbelanjaanSewaLain: 0,
  totalPerbelanjaan: 2750,

  pendapatanGaji: 2500,
  pendapatanPasangan: 500,
  pendapatanPencen: 300,
  pendapatanAnak: 200,
  pendapatanJKM: 100,
  pendapatanTanggungan: 0,
  totalPendapatan: 3600,

  tarikhKemaskini: '01/09/2025',
})

// After Update Data
const afterData = ref({
  // Peribadi
  jenisId: 'MyKad',
  noId: '900101015555',
  nama: 'AHMAD BIN ALI',
  warganegara: 'Malaysia',
  tarikhLahir: '01/01/1990',
  umur: 35,
  tempatLahir: 'Kuala Lumpur',
  jantina: 'Lelaki',
  agama: 'Islam',
  bangsa: 'Melayu',
  noTelefon: '0112233445',
  emel: 'ahmad.updated@example.com',
  statusPerkahwinan: 'Duda',
  statusPoligami: 'Tidak',

  // Alamat
  alamat1: 'No 12, Jalan Mawar 3',
  alamat2: 'Taman Mawar Baru',
  alamat3: 'Blok A-2-5',
  poskod: '40100',
  negeri: 'Selangor',
  daerah: 'Klang',
  bandar: 'Shah Alam',
  kariah: 'Seksyen 7',
  tempohMenetap: 3,
  unitTempoh: 'Tahun',
  statusKediaman: 'Milik Sendiri Berbayar',
  keadaanKediaman: 'Baik',
  kadarAmount: 1200,

  // Pendapatan & Perbelanjaan
  perbelanjaanMakanan: 900,
  perbelanjaanSewa: 1300,
  perbelanjaanSekolah: 400,
  perbelanjaanPengangkutan: 200,
  perbelanjaanUtiliti: 250,
  perbelanjaanTakaful: 150,
  perbelanjaanSewaLain: 0,
  totalPerbelanjaan: 3200,

  pendapatanGaji: 2800,
  pendapatanPasangan: 600,
  pendapatanPencen: 400,
  pendapatanAnak: 300,
  pendapatanJKM: 150,
  pendapatanTanggungan: 0,
  totalPendapatan: 4250,

  tarikhKemaskini: '09/09/2025',
})

const tarikhSemasa = ref('20/10/2025')

function goToStep(step) {
  currentStep.value = step
}

// Helper to check if value changed
function isChanged(field) {
  return beforeData.value[field] !== afterData.value[field]
}

// Comparison field component data
const peribadiFields = [
  { label: 'Jenis ID', field: 'jenisId' },
  { label: 'No. Pengenalan', field: 'noId' },
  { label: 'Nama Penuh', field: 'nama' },
  { label: 'Warganegara', field: 'warganegara' },
  { label: 'Tarikh Lahir', field: 'tarikhLahir' },
  { label: 'Umur', field: 'umur' },
  { label: 'Tempat Lahir', field: 'tempatLahir' },
  { label: 'Jantina', field: 'jantina' },
  { label: 'Agama', field: 'agama' },
  { label: 'Bangsa', field: 'bangsa' },
  { label: 'No. Telefon', field: 'noTelefon' },
  { label: 'Emel', field: 'emel' },
  { label: 'Status Perkahwinan', field: 'statusPerkahwinan' },
  { label: 'Status Poligami', field: 'statusPoligami' },
]

const alamatFields = [
  { label: 'Alamat 1', field: 'alamat1' },
  { label: 'Alamat 2', field: 'alamat2' },
  { label: 'Alamat 3', field: 'alamat3' },
  { label: 'Poskod', field: 'poskod' },
  { label: 'Negeri', field: 'negeri' },
  { label: 'Daerah', field: 'daerah' },
  { label: 'Bandar', field: 'bandar' },
  { label: 'Kariah', field: 'kariah' },
  { label: 'Tempoh Menetap', field: 'tempohMenetap', suffix: 'unitTempoh' },
  { label: 'Status Kediaman', field: 'statusKediaman' },
  { label: 'Keadaan Kediaman', field: 'keadaanKediaman' },
  { label: 'Kadar Bayaran/Sewa (RM)', field: 'kadarAmount' },
]

const perbelanjaanFields = [
  { label: 'Makanan & Minuman', field: 'perbelanjaanMakanan', prefix: 'RM' },
  { label: 'Sewa / Bayaran Pinjaman', field: 'perbelanjaanSewa', prefix: 'RM' },
  { label: 'Persekolahan Anak', field: 'perbelanjaanSekolah', prefix: 'RM' },
  { label: 'Pengangkutan', field: 'perbelanjaanPengangkutan', prefix: 'RM' },
  { label: 'Bil Utiliti', field: 'perbelanjaanUtiliti', prefix: 'RM' },
  { label: 'Takaful', field: 'perbelanjaanTakaful', prefix: 'RM' },
  { label: 'Sewa Rumah/Tanah/Kedai', field: 'perbelanjaanSewaLain', prefix: 'RM' },
]

const pendapatanFields = [
  { label: 'Gaji / Pendapatan', field: 'pendapatanGaji', prefix: 'RM' },
  { label: 'Pendapatan Pasangan', field: 'pendapatanPasangan', prefix: 'RM' },
  { label: 'Pencen / PERKESO', field: 'pendapatanPencen', prefix: 'RM' },
  { label: 'Sumbangan Anak-anak', field: 'pendapatanAnak', prefix: 'RM' },
  { label: 'Bantuan JKM', field: 'pendapatanJKM', prefix: 'RM' },
  { label: 'Pendapatan Tanggungan', field: 'pendapatanTanggungan', prefix: 'RM' },
]

function formatValue(value, field) {
  if (value === null || value === undefined || value === '') return '-'
  if (field.prefix) return `${field.prefix} ${value.toLocaleString()}`
  if (field.suffix) return `${value} ${beforeData.value[field.suffix] || afterData.value[field.suffix]}`
  return value
}
</script>

<template>
  <div class="page-container">
    <LayoutsBreadcrumb />

    <div class="header-section">
      <div>
        <h1 class="page-title">Semakan Data (Kemaskini)</h1>
        <p class="page-subtitle">Perbandingan Data: Sebelum dan Selepas Kemaskini</p>
      </div>
      <rs-badge variant="info" size="lg">Langkah {{ currentStep }} / 3</rs-badge>
    </div>

    <!-- Tab Navigation -->
    <div class="tabs-container">
      <button
        @click="goToStep(1)"
        :class="['tab-button', { active: currentStep === 1, completed: currentStep > 1 }]"
      >
        <Icon :name="currentStep > 1 ? 'mdi:check-circle' : 'mdi:account'" class="tab-icon" />
        <span>Peribadi</span>
      </button>
      <button
        @click="goToStep(2)"
        :class="['tab-button', { active: currentStep === 2, completed: currentStep > 2 }]"
      >
        <Icon :name="currentStep > 2 ? 'mdi:check-circle' : 'mdi:home-city'" class="tab-icon" />
        <span>Alamat</span>
      </button>
      <button
        @click="goToStep(3)"
        :class="['tab-button', { active: currentStep === 3 }]"
      >
        <Icon name="mdi:cash-multiple" class="tab-icon" />
        <span>Pendapatan & Perbelanjaan</span>
      </button>
    </div>

    <!-- Comparison Grid -->
    <div class="comparison-wrapper">
      <!-- Step 1: Peribadi -->
      <rs-card v-show="currentStep === 1" class="comparison-card">
        <template #header>
          <h3 class="section-title">A. Maklumat Peribadi Asnaf</h3>
        </template>
        <template #body>
          <div class="comparison-grid">
            <!-- Header Row -->
            <div class="grid-header"></div>
            <div class="grid-header before-column">
              <Icon name="mdi:clock-outline" class="w-4 h-4" />
              <span>Sebelum Kemaskini</span>
            </div>
            <div class="grid-header after-column">
              <Icon name="mdi:check-circle" class="w-4 h-4" />
              <span>Selepas Kemaskini</span>
            </div>

            <!-- Data Rows -->
            <template v-for="field in peribadiFields" :key="field.field">
              <div class="grid-label">{{ field.label }}</div>
              <div class="grid-value before-value">
                {{ formatValue(beforeData[field.field], field) }}
              </div>
              <div
                :class="[
                  'grid-value after-value',
                  { 'changed': isChanged(field.field) }
                ]"
              >
                <span v-if="isChanged(field.field)" class="change-indicator">
                  <Icon name="mdi:arrow-right" class="w-3 h-3" />
                </span>
                {{ formatValue(afterData[field.field], field) }}
              </div>
            </template>

            <!-- Tarikh Kemaskini -->
            <div class="grid-label font-semibold">Tarikh Kemaskini</div>
            <div class="grid-value before-value">{{ beforeData.tarikhKemaskini }}</div>
            <div class="grid-value after-value">{{ afterData.tarikhKemaskini }}</div>
          </div>
        </template>
      </rs-card>

      <!-- Step 2: Alamat -->
      <rs-card v-show="currentStep === 2" class="comparison-card">
        <template #header>
          <h3 class="section-title">2. Maklumat Alamat</h3>
        </template>
        <template #body>
          <div class="comparison-grid">
            <!-- Header Row -->
            <div class="grid-header"></div>
            <div class="grid-header before-column">
              <Icon name="mdi:clock-outline" class="w-4 h-4" />
              <span>Sebelum Kemaskini</span>
            </div>
            <div class="grid-header after-column">
              <Icon name="mdi:check-circle" class="w-4 h-4" />
              <span>Selepas Kemaskini</span>
            </div>

            <!-- Data Rows -->
            <template v-for="field in alamatFields" :key="field.field">
              <div class="grid-label">{{ field.label }}</div>
              <div class="grid-value before-value">
                {{ formatValue(beforeData[field.field], field) }}
              </div>
              <div
                :class="[
                  'grid-value after-value',
                  { 'changed': isChanged(field.field) }
                ]"
              >
                <span v-if="isChanged(field.field)" class="change-indicator">
                  <Icon name="mdi:arrow-right" class="w-3 h-3" />
                </span>
                {{ formatValue(afterData[field.field], field) }}
              </div>
            </template>

            <!-- Tarikh Kemaskini -->
            <div class="grid-label font-semibold">Tarikh Kemaskini</div>
            <div class="grid-value before-value">{{ beforeData.tarikhKemaskini }}</div>
            <div class="grid-value after-value">{{ afterData.tarikhKemaskini }}</div>
          </div>
        </template>
      </rs-card>

      <!-- Step 3: Pendapatan & Perbelanjaan -->
      <rs-card v-show="currentStep === 3" class="comparison-card">
        <template #header>
          <h3 class="section-title">11. Maklumat Pendapatan & Perbelanjaan</h3>
        </template>
        <template #body>
          <div class="space-y-8">
            <!-- Perbelanjaan Section -->
            <div>
              <h4 class="subsection-title">Perbelanjaan Bulanan</h4>
              <div class="comparison-grid">
                <div class="grid-header"></div>
                <div class="grid-header before-column">Sebelum</div>
                <div class="grid-header after-column">Selepas</div>

                <template v-for="field in perbelanjaanFields" :key="field.field">
                  <div class="grid-label">{{ field.label }}</div>
                  <div class="grid-value before-value">
                    {{ formatValue(beforeData[field.field], field) }}
                  </div>
                  <div
                    :class="[
                      'grid-value after-value',
                      { 'changed': isChanged(field.field) }
                    ]"
                  >
                    <span v-if="isChanged(field.field)" class="change-indicator">
                      <Icon name="mdi:arrow-right" class="w-3 h-3" />
                    </span>
                    {{ formatValue(afterData[field.field], field) }}
                  </div>
                </template>

                <!-- Total -->
                <div class="grid-label font-bold text-base">JUMLAH PERBELANJAAN</div>
                <div class="grid-value before-value font-bold text-base">
                  RM {{ beforeData.totalPerbelanjaan.toLocaleString() }}
                </div>
                <div
                  :class="[
                    'grid-value after-value font-bold text-base',
                    { 'changed': isChanged('totalPerbelanjaan') }
                  ]"
                >
                  <span v-if="isChanged('totalPerbelanjaan')" class="change-indicator">
                    <Icon name="mdi:arrow-right" class="w-3 h-3" />
                  </span>
                  RM {{ afterData.totalPerbelanjaan.toLocaleString() }}
                </div>
              </div>
            </div>

            <!-- Pendapatan Section -->
            <div>
              <h4 class="subsection-title">Pendapatan Bulanan</h4>
              <div class="comparison-grid">
                <div class="grid-header"></div>
                <div class="grid-header before-column">Sebelum</div>
                <div class="grid-header after-column">Selepas</div>

                <template v-for="field in pendapatanFields" :key="field.field">
                  <div class="grid-label">{{ field.label }}</div>
                  <div class="grid-value before-value">
                    {{ formatValue(beforeData[field.field], field) }}
                  </div>
                  <div
                    :class="[
                      'grid-value after-value',
                      { 'changed': isChanged(field.field) }
                    ]"
                  >
                    <span v-if="isChanged(field.field)" class="change-indicator">
                      <Icon name="mdi:arrow-right" class="w-3 h-3" />
                    </span>
                    {{ formatValue(afterData[field.field], field) }}
                  </div>
                </template>

                <!-- Total -->
                <div class="grid-label font-bold text-base">JUMLAH PENDAPATAN</div>
                <div class="grid-value before-value font-bold text-base">
                  RM {{ beforeData.totalPendapatan.toLocaleString() }}
                </div>
                <div
                  :class="[
                    'grid-value after-value font-bold text-base',
                    { 'changed': isChanged('totalPendapatan') }
                  ]"
                >
                  <span v-if="isChanged('totalPendapatan')" class="change-indicator">
                    <Icon name="mdi:arrow-right" class="w-3 h-3" />
                  </span>
                  RM {{ afterData.totalPendapatan.toLocaleString() }}
                </div>
              </div>
            </div>

            <!-- Summary Comparison -->
            <div class="summary-box">
              <div class="summary-grid">
                <div></div>
                <div class="summary-header before-summary">Sebelum</div>
                <div class="summary-header after-summary">Selepas</div>
                <div class="summary-header">Perubahan</div>

                <div class="summary-label">Jumlah Perbelanjaan</div>
                <div class="summary-value">RM {{ beforeData.totalPerbelanjaan.toLocaleString() }}</div>
                <div class="summary-value">RM {{ afterData.totalPerbelanjaan.toLocaleString() }}</div>
                <div :class="['summary-change', afterData.totalPerbelanjaan > beforeData.totalPerbelanjaan ? 'negative' : 'positive']">
                  <Icon :name="afterData.totalPerbelanjaan > beforeData.totalPerbelanjaan ? 'mdi:arrow-up' : 'mdi:arrow-down'" class="w-4 h-4" />
                  RM {{ Math.abs(afterData.totalPerbelanjaan - beforeData.totalPerbelanjaan).toLocaleString() }}
                </div>

                <div class="summary-label">Jumlah Pendapatan</div>
                <div class="summary-value">RM {{ beforeData.totalPendapatan.toLocaleString() }}</div>
                <div class="summary-value">RM {{ afterData.totalPendapatan.toLocaleString() }}</div>
                <div :class="['summary-change', afterData.totalPendapatan > beforeData.totalPendapatan ? 'positive' : 'negative']">
                  <Icon :name="afterData.totalPendapatan > beforeData.totalPendapatan ? 'mdi:arrow-up' : 'mdi:arrow-down'" class="w-4 h-4" />
                  RM {{ Math.abs(afterData.totalPendapatan - beforeData.totalPendapatan).toLocaleString() }}
                </div>

                <div class="summary-label font-bold">Baki (Pendapatan - Perbelanjaan)</div>
                <div class="summary-value font-bold">RM {{ (beforeData.totalPendapatan - beforeData.totalPerbelanjaan).toLocaleString() }}</div>
                <div class="summary-value font-bold">RM {{ (afterData.totalPendapatan - afterData.totalPerbelanjaan).toLocaleString() }}</div>
                <div :class="['summary-change font-bold', (afterData.totalPendapatan - afterData.totalPerbelanjaan) > (beforeData.totalPendapatan - beforeData.totalPerbelanjaan) ? 'positive' : 'negative']">
                  <Icon :name="(afterData.totalPendapatan - afterData.totalPerbelanjaan) > (beforeData.totalPendapatan - beforeData.totalPerbelanjaan) ? 'mdi:arrow-up' : 'mdi:arrow-down'" class="w-4 h-4" />
                  RM {{ Math.abs((afterData.totalPendapatan - afterData.totalPerbelanjaan) - (beforeData.totalPendapatan - beforeData.totalPerbelanjaan)).toLocaleString() }}
                </div>
              </div>
            </div>

            <!-- Dates -->
            <div class="comparison-grid">
              <div class="grid-label font-semibold">Tarikh Kemaskini</div>
              <div class="grid-value before-value">{{ beforeData.tarikhKemaskini }}</div>
              <div class="grid-value after-value">{{ afterData.tarikhKemaskini }}</div>

              <div class="grid-label font-semibold">Tarikh Semasa</div>
              <div class="grid-value" style="grid-column: span 2">{{ tarikhSemasa }}</div>
            </div>
          </div>
        </template>
      </rs-card>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <rs-button
        v-if="currentStep > 1"
        variant="secondary"
        @click="goToStep(currentStep - 1)"
      >
        <Icon name="mdi:chevron-left" class="w-5 h-5" />
        Kembali
      </rs-button>
      <div v-else></div>

      <rs-button
        v-if="currentStep < 3"
        variant="primary"
        @click="goToStep(currentStep + 1)"
      >
        Seterusnya
        <Icon name="mdi:chevron-right" class="w-5 h-5" />
      </rs-button>
      <rs-button v-else variant="success">
        <Icon name="mdi:comment-text" class="w-5 h-5 mr-2" />
        Komen Penyemak
      </rs-button>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  @apply p-6 max-w-[1600px] mx-auto;
}

.header-section {
  @apply flex justify-between items-start mb-8 gap-4;
}

.page-title {
  @apply text-3xl font-bold text-[rgb(var(--text-color))] mb-2;
}

.page-subtitle {
  @apply text-sm text-[rgb(var(--text-color))]/70;
}

.tabs-container {
  @apply grid grid-cols-3 gap-2 mb-8 bg-[rgb(var(--bg-1))] p-2 rounded-xl;
}

.tab-button {
  @apply flex items-center justify-center gap-2 px-4 py-3 font-medium text-sm rounded-lg transition-all duration-200 bg-transparent text-[rgb(var(--text-color))]/70 border-2 border-transparent;
}

.tab-button:hover {
  @apply bg-[rgb(var(--bg-2))];
}

.tab-button.active {
  @apply bg-primary text-white shadow-md;
}

.tab-button.completed {
  @apply text-success;
}

.tab-icon {
  @apply w-5 h-5;
}

.comparison-wrapper {
  @apply mb-8;
}

.comparison-card {
  @apply overflow-visible;
}

.section-title {
  @apply text-lg font-semibold text-[rgb(var(--text-color))];
}

.subsection-title {
  @apply text-base font-semibold text-[rgb(var(--text-color))] mb-4 pb-2 border-b-2 border-[rgb(var(--border-color))];
}

/* Comparison Grid */
.comparison-grid {
  @apply grid gap-[1px] bg-[rgb(var(--border-color))] border border-[rgb(var(--border-color))] rounded-lg overflow-hidden;
  grid-template-columns: minmax(200px, 1fr) minmax(180px, 1fr) minmax(180px, 1fr);
}

.grid-header {
  @apply bg-[rgb(var(--bg-1))] px-4 py-3 font-semibold text-sm text-[rgb(var(--text-color))] flex items-center gap-2;
}

.before-column {
  @apply text-danger;
}

.after-column {
  @apply text-success;
}

.grid-label {
  @apply bg-[rgb(var(--bg-2))] px-4 py-3.5 font-medium text-sm text-[rgb(var(--text-color))]/70 flex items-center;
}

.grid-value {
  @apply bg-[rgb(var(--bg-2))] px-4 py-3.5 text-sm text-[rgb(var(--text-color))] flex items-center gap-2 break-words;
}

.before-value {
  @apply bg-danger/5;
}

.after-value {
  @apply bg-success/5;
}

.after-value.changed {
  @apply bg-success/10 font-semibold border-l-[3px] border-success;
}

.change-indicator {
  @apply inline-flex items-center justify-center w-5 h-5 bg-success text-white rounded-full flex-shrink-0;
}

/* Summary Box */
.summary-box {
  @apply rounded-xl p-6 mt-8 border-2 border-info;
  background: linear-gradient(135deg, rgb(var(--color-info))/10 0%, rgb(var(--color-info))/5 100%);
}

.summary-grid {
  @apply grid gap-[1px] bg-[rgb(var(--border-color))] rounded-lg overflow-hidden;
  grid-template-columns: minmax(200px, 1fr) repeat(3, minmax(120px, 1fr));
}

.summary-header {
  @apply bg-[rgb(var(--bg-1))] px-3 py-3 font-semibold text-sm text-center;
}

.before-summary {
  @apply text-danger;
}

.after-summary {
  @apply text-success;
}

.summary-label {
  @apply bg-[rgb(var(--bg-2))] px-4 py-4 font-medium text-sm;
}

.summary-value {
  @apply bg-[rgb(var(--bg-2))] px-4 py-4 text-center font-medium;
}

.summary-change {
  @apply bg-[rgb(var(--bg-2))] px-4 py-4 text-center font-semibold flex items-center justify-center gap-1;
}

.summary-change.positive {
  @apply text-success;
}

.summary-change.negative {
  @apply text-danger;
}

/* Action Buttons */
.action-buttons {
  @apply flex justify-between items-center pt-8 border-t-2 border-[rgb(var(--border-color))];
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .page-container {
    @apply p-4;
  }

  .header-section {
    @apply flex-col;
  }

  .tabs-container {
    @apply grid-cols-1;
  }

  .tab-button span {
    @apply text-[0.813rem];
  }

  .comparison-grid {
    @apply grid-cols-1;
  }

  .grid-header:first-child {
    @apply hidden;
  }

  .grid-label {
    @apply font-semibold bg-[rgb(var(--bg-1))];
  }

  .before-value::before {
    content: '❌ ';
  }

  .after-value::before {
    content: '✅ ';
  }

  .summary-grid {
    @apply grid-cols-1;
  }

  .summary-header:first-child {
    @apply hidden;
  }
}

@media (max-width: 640px) {
  .action-buttons {
    @apply flex-col-reverse gap-3;
  }

  .action-buttons > * {
    @apply w-full;
  }
}
</style>
    