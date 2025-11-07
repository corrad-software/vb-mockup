<script setup>
definePageMeta({
  title: "Semakan & Input Maklumat Bantuan",
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
      name: "Senarai untuk Disemak",
      path: "/semakan-list",
    },
    {
      name: "Semakan Permohonan",
      path: "/mockup-semakan",
    },
    {
      name: "Bantuan",
      path: "#",
    },
  ],
})

const route = useRoute()
const aidId = route.params.aidId

// Exact data from B300 reference page
const bantuanData = ref({
  aid: 'B300 - (HQ) BANTUAN DERMASISWA SEKOLAH ASRAMA (FAKIR)',
  aidProduct: 'BANTUAN DERMASISWA SEKOLAH ASRAMA (FAKIR))',
  tarikhPermohonan: '20-10-2025',
  sla: '3h',
})

// Toggle states
const isSegera = ref(false)
const isKelulusanKhas = ref(false)

// Documents list - exactly as shown in reference
const dokumenList = ref([
  {
    no: 1,
    nama: 'Surat tawaran belajar daripada pihak sekolah/surat pengesahan belajar',
    status: '-- Pilih Status --',
    catatan: '',
  },
  {
    no: 2,
    nama: 'Salinan akaun bank pelajar yang mengandungi: Nama bank, Nama dan no akaun bank',
    status: '-- Pilih Status --',
    catatan: '',
  },
  {
    no: 3,
    nama: 'Salinan kad pengenalan ketua keluarga/ penjaga',
    status: '-- Pilih Status --',
    catatan: '',
  },
  {
    no: 4,
    nama: 'Salinan kad pengenalan/surat beranak pelajar',
    status: '-- Pilih Status --',
    catatan: '',
  },
])

// LZS Documents
const dokumenLZS = ref([
  {
    no: 1,
    nama: '',
    tindakan: '',
    catatan: '',
  },
])

// Right sidebar data
const semakanData = ref({
  statusPermohonan: 'DALAM SEMAKAN',
  proses: 'Pilih Proses',
  catatanPegawai: 'Masukkan catatan pegawai (wajib jika Tidak Lengkap)',
  tarikhSemak: '20 Oktober 2025 pada 11:29 PTG',
})

const isSaving = ref(false)

// Computed
const completedDocs = computed(() => dokumenList.value.filter(d => d.status === 'Lengkap').length)
const totalDocs = computed(() => dokumenList.value.length)
const progressPercent = computed(() => completedDocs.value > 0 ? (completedDocs.value / totalDocs.value) * 100 : 0)

// Methods
function handleViewDokumen(dokumen) {
  console.log('View:', dokumen)
}

function handleDownloadDokumen(dokumen) {
  console.log('Download:', dokumen)
}

function handleUpload() {
  console.log('Upload dokumen LZS')
}

function handleTambah() {
  dokumenLZS.value.push({
    no: dokumenLZS.value.length + 1,
    nama: '',
    tindakan: '',
    catatan: '',
  })
}

function handleBuang() {
  if (dokumenLZS.value.length > 1) {
    dokumenLZS.value.pop()
  }
}

function handleHantar() {
  console.log('Hantar semakan')
  navigateTo('/mockup-semakan')
}

function handleSimpan() {
  isSaving.value = true
  setTimeout(() => {
    console.log('Simpan data')
    isSaving.value = false
  }, 1000)
}

function handleBatal() {
  navigateTo('/mockup-semakan')
}
</script>

<template>
  <div class="p-6">
    <LayoutsBreadcrumb />

    <!-- Compact Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-xl font-bold text-[rgb(var(--text-color))]">Semakan Bantuan</h1>
        <p class="text-xs text-[rgb(var(--text-color))]/60 mt-0.5">{{ bantuanData.aid }}</p>
      </div>
      <rs-badge variant="warning" size="lg">DALAM SEMAKAN</rs-badge>
    </div>

    <!-- Two Column Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Main Content Area (Left - 2/3) -->
      <div class="lg:col-span-2 space-y-4">

        <!-- Maklumat Bantuan -->
        <rs-card>
          <template #header>
            <div class="flex items-center gap-2">
              <Icon name="mdi:information" class="w-5 h-5 text-primary" />
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Maklumat Bantuan</h2>
            </div>
          </template>
          <template #body>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 text-sm">
              <div class="col-span-2">
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Aid</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ bantuanData.aid }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Aid Product</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ bantuanData.aidProduct }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Tarikh Permohonan</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ bantuanData.tarikhPermohonan }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">SLA</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ bantuanData.sla }}</p>
              </div>
              <div class="col-span-2 pt-2 border-t border-[rgb(var(--border-color))]">
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-2">Status Keutamaan</p>
                <div class="flex gap-4">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="isSegera" class="w-4 h-4">
                    <span class="text-xs font-medium text-[rgb(var(--text-color))]">SEGERA</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" v-model="isKelulusanKhas" class="w-4 h-4">
                    <span class="text-xs font-medium text-[rgb(var(--text-color))]">Kelulusan Khas</span>
                  </label>
                </div>
              </div>
            </div>
          </template>
        </rs-card>

        <!-- Dokumen Sokongan -->
        <rs-card>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Icon name="mdi:file-document-multiple" class="w-5 h-5 text-primary" />
                <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Dokumen Sokongan</h2>
              </div>
              <rs-badge variant="info" size="sm">{{ dokumenList.length }} Dokumen</rs-badge>
            </div>
          </template>
          <template #body>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-[rgb(var(--bg-1))]">
                  <tr>
                    <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">NO</th>
                    <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">DOKUMEN</th>
                    <th class="px-3 py-2 text-center font-semibold text-[rgb(var(--text-color))]">AKSI</th>
                    <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">STATUS</th>
                    <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">CATATAN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="dok in dokumenList"
                    :key="dok.no"
                    class="border-t border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
                  >
                    <td class="px-3 py-2.5 text-[rgb(var(--text-color))]">{{ dok.no }}</td>
                    <td class="px-3 py-2.5 text-[rgb(var(--text-color))]">{{ dok.nama }}</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center justify-center gap-1">
                        <rs-button size="sm" variant="ghost" @click="handleViewDokumen(dok)">
                          <Icon name="mdi:eye" class="w-4 h-4" />
                        </rs-button>
                        <rs-button size="sm" variant="ghost" @click="handleDownloadDokumen(dok)">
                          <Icon name="mdi:download" class="w-4 h-4" />
                        </rs-button>
                      </div>
                    </td>
                    <td class="px-3 py-2.5">
                      <FormKit
                        type="select"
                        v-model="dok.status"
                        :options="['-- Pilih Status --', 'Lengkap', 'Tidak Lengkap', 'Tidak Berkaitan']"
                      />
                    </td>
                    <td class="px-3 py-2.5">
                      <FormKit type="text" v-model="dok.catatan" placeholder="Catatan" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </rs-card>

        <!-- Pengesahan Note -->
        <div class="p-3 bg-info/10 border border-info/30 rounded-lg flex gap-2">
          <Icon name="mdi:comment-check" class="w-5 h-5 text-info flex-shrink-0" />
          <p class="text-xs text-[rgb(var(--text-color))]/70">
            <span class="font-semibold text-[rgb(var(--text-color))]">Pengesahan: </span>
            Sila sahkan dokumen sokongan yang telah dimuat naik
          </p>
        </div>

        <!-- Dokumen LZS -->
        <rs-card>
          <template #header>
            <div class="flex items-center gap-2">
              <Icon name="mdi:cloud-upload" class="w-5 h-5 text-primary" />
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Dokumen Sokongan Dari LZS</h2>
            </div>
          </template>
          <template #body>
            <div class="space-y-3">
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead class="bg-[rgb(var(--bg-1))]">
                    <tr>
                      <th class="px-3 py-2 text-center font-semibold text-[rgb(var(--text-color))]">No</th>
                      <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">Dokumen</th>
                      <th class="px-3 py-2 text-center font-semibold text-[rgb(var(--text-color))]">Aksi</th>
                      <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">Catatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="dok in dokumenLZS"
                      :key="dok.no"
                      class="border-t border-[rgb(var(--border-color))]"
                    >
                      <td class="px-3 py-2.5 text-center text-[rgb(var(--text-color))]">{{ dok.no }}</td>
                      <td class="px-3 py-2.5">
                        <FormKit type="text" v-model="dok.nama" placeholder="Nama/rujukan dokumen" />
                      </td>
                      <td class="px-3 py-2.5 text-center">
                        <div class="flex items-center justify-center gap-2 text-xs">
                          <button @click="handleUpload" class="text-primary hover:underline font-medium">Lihat</button>
                          <span class="text-[rgb(var(--text-color))]/40">|</span>
                          <button @click="handleUpload" class="text-primary hover:underline font-medium">Upload</button>
                        </div>
                      </td>
                      <td class="px-3 py-2.5">
                        <FormKit type="text" v-model="dok.catatan" placeholder="Catatan" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex gap-2">
                <rs-button variant="primary" size="sm" @click="handleTambah">
                  <Icon name="mdi:plus" class="w-4 h-4 mr-1" />
                  Tambah
                </rs-button>
                <rs-button variant="danger" size="sm" @click="handleBuang" :disabled="dokumenLZS.length <= 1">
                  <Icon name="mdi:delete" class="w-4 h-4 mr-1" />
                  Buang
                </rs-button>
              </div>
            </div>
          </template>
        </rs-card>

      </div>

      <!-- Right Sidebar (1/3) -->
      <div class="lg:col-span-1">
        <rs-card class="lg:sticky lg:top-6">
          <template #header>
            <div class="flex items-center gap-2">
              <Icon name="mdi:clipboard-text" class="w-5 h-5 text-primary" />
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Status & Catatan</h2>
            </div>
          </template>
          <template #body>
            <div class="space-y-3">
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-1.5">Status Permohonan</p>
                <rs-badge variant="warning" size="lg" class="w-full justify-center">
                  {{ semakanData.statusPermohonan }}
                </rs-badge>
              </div>

              <FormKit
                type="select"
                label="Proses"
                v-model="semakanData.proses"
                :options="['Pilih Proses', 'Untuk Siasatan', 'Untuk Kelulusan', 'Untuk Penolakan']"
              />

              <FormKit
                type="textarea"
                label="Catatan Pegawai"
                v-model="semakanData.catatanPegawai"
                rows="3"
              />

              <div class="p-2.5 bg-[rgb(var(--bg-1))] rounded-lg">
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-1">Tarikh Semak</p>
                <p class="text-xs font-medium text-[rgb(var(--text-color))] flex items-center gap-1.5">
                  <Icon name="mdi:clock" class="w-3.5 h-3.5 text-primary" />
                  {{ semakanData.tarikhSemak }}
                </p>
              </div>

              <div class="p-3 bg-info/10 border border-info/30 rounded-lg">
                <div class="flex gap-2">
                  <Icon name="mdi:information" class="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
                  <p class="text-xs text-[rgb(var(--text-color))]/70">
                    Sekiranya bantuan tanpa siasatan, sistem akan terus ke "Untuk Siasatan".
                  </p>
                </div>
              </div>

              <div class="pt-2 space-y-2">
                <rs-button variant="primary" class="w-full" @click="handleHantar">
                  <Icon name="mdi:send" class="w-4 h-4 mr-1.5" />
                  Hantar
                </rs-button>
                <rs-button variant="success" class="w-full" :loading="isSaving" @click="handleSimpan">
                  <Icon name="mdi:content-save" class="w-4 h-4 mr-1.5" />
                  Simpan
                </rs-button>
                <rs-button variant="secondary" class="w-full" @click="handleBatal">
                  <Icon name="mdi:arrow-left" class="w-4 h-4 mr-1.5" />
                  Batal / Kembali
                </rs-button>
              </div>
            </div>
          </template>
        </rs-card>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .p-6 {
    padding: 1rem;
  }
}
</style>
