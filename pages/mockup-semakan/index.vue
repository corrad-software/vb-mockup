<script setup>
definePageMeta({
  title: "Semakan Permohonan",
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
  ],
})

// Exact data from reference page
const pemohonData = ref({
  nama: 'Ahmad bin Abdullah',
  alamat: '10, Jalan SS 7/13, Kelana Jaya, 47301 Petaling Jaya, Selangor',
  kariah: 'Masjid Al-Taqwa',
  daerah: 'Kuala Selangor',
  jenisId: 'MyKad',
  noId: '800101-01-1234',
  noTelefon: '0123456789',
  emel: 'ahmad@email.com',
  statusKeluarga: 'Fakir',
  statusIndividu: 'Fakir',
  statusMultidimensi: 'Asnaf Tidak Produktif',
})

// Senarai Bantuan - exactly as shown
const bantuanList = ref([
  {
    no: 1,
    id: 'B300',
    jenisBantuan: 'B300 - (HQ) BANTUAN DERMASISWA SEKOLAH ASRAMA (FAKIR)',
    status: 'LENGKAP',
    sla: '2h',
  },
  {
    no: 2,
    id: 'B307',
    jenisBantuan: 'B307 - (HQ) DERMASISWA IPT DALAM NEGARA (FAKIR) - IPTA/IPTS',
    status: 'LENGKAP',
    sla: '3h',
  },
])

// Catatan Pegawai
const catatanPegawai = ref('Dipanjangkan kepada Jabatan Pendidikan untuk semakan lanjut')
const isSaving = ref(false)

function handleSemakan(item) {
  navigateTo(`/mockup-semakan/${item.id}`)
}

function handleSimpan() {
  isSaving.value = true
  setTimeout(() => {
    console.log('Simpan:', catatanPegawai.value)
    isSaving.value = false
  }, 1000)
}

function handleHantar() {
  console.log('Hantar semakan')
  navigateTo('/tugasan')
}

function handleBatal() {
  navigateTo('/tugasan')
}
</script>

<template>
  <div class="p-6">
    <LayoutsBreadcrumb />

    <!-- Compact Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-xl font-bold text-[rgb(var(--text-color))]">Semakan Permohonan</h1>
      </div>
      <rs-badge variant="warning" size="lg">DALAM SEMAKAN</rs-badge>
    </div>

    <!-- Main Grid Layout: 2 columns on desktop -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Left Column: Maklumat Pemohon (2/3 width) -->
      <div class="lg:col-span-2">
        <rs-card class="h-full">
          <template #header>
            <div class="flex items-center gap-2">
              <Icon name="mdi:account" class="w-5 h-5 text-primary" />
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Maklumat Pemohon</h2>
            </div>
          </template>
          <template #body>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Nama</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.nama }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">No Pengenalan</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.noId }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">No Telefon</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.noTelefon }}</p>
              </div>
              <div class="col-span-2 md:col-span-1">
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">E-mel</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.emel }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Alamat</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.alamat }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Kariah</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.kariah }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Daerah</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.daerah }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Jenis Pengenalan</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.jenisId }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Status Keluarga</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.statusKeluarga }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Status Individu</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.statusIndividu }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-color))]/60 mb-0.5">Status Multidimensi</p>
                <p class="font-medium text-[rgb(var(--text-color))]">{{ pemohonData.statusMultidimensi }}</p>
              </div>
            </div>
          </template>
        </rs-card>
      </div>

      <!-- Right Column: Action Card (1/3 width) -->
      <div class="lg:col-span-1">
        <rs-card class="h-full">
          <template #header>
            <div class="flex items-center gap-2">
              <Icon name="mdi:clipboard-text" class="w-5 h-5 text-primary" />
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Tindakan</h2>
            </div>
          </template>
          <template #body>
            <div class="space-y-3">
              <FormKit
                type="textarea"
                label="Catatan Umum"
                v-model="catatanPegawai"
                rows="3"
              />

              <div class="p-3 bg-info/10 border border-info/30 rounded-lg">
                <p class="text-xs text-[rgb(var(--text-color))]/70">
                  <Icon name="mdi:information-outline" class="w-4 h-4 inline mr-1" />
                  Pilih bantuan untuk semakan lanjut
                </p>
              </div>

              <div class="grid grid-cols-2 gap-2 pt-2">
                <rs-button
                  variant="success"
                  size="sm"
                  class="w-full"
                  :loading="isSaving"
                  @click="handleSimpan"
                >
                  <Icon name="mdi:content-save" class="w-4 h-4 mr-1" />
                  Simpan
                </rs-button>
                <rs-button
                  variant="primary"
                  size="sm"
                  class="w-full"
                  @click="handleHantar"
                >
                  <Icon name="mdi:send" class="w-4 h-4 mr-1" />
                  Hantar
                </rs-button>
              </div>
              <rs-button
                variant="secondary"
                size="sm"
                class="w-full"
                @click="handleBatal"
              >
                <Icon name="mdi:arrow-left" class="w-4 h-4 mr-1" />
                Batal
              </rs-button>
            </div>
          </template>
        </rs-card>
      </div>

    </div>

    <!-- Full Width: Senarai Bantuan -->
    <rs-card class="mt-4">
      <template #header>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Icon name="mdi:format-list-bulleted" class="w-5 h-5 text-primary" />
            <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Senarai Bantuan</h2>
          </div>
          <rs-badge variant="info" size="sm">{{ bantuanList.length }} Bantuan</rs-badge>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-[rgb(var(--bg-1))]">
              <tr>
                <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">NO.</th>
                <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">ID</th>
                <th class="px-3 py-2 text-left font-semibold text-[rgb(var(--text-color))]">JENIS BANTUAN</th>
                <th class="px-3 py-2 text-center font-semibold text-[rgb(var(--text-color))]">STATUS</th>
                <th class="px-3 py-2 text-center font-semibold text-[rgb(var(--text-color))]">SLA</th>
                <th class="px-3 py-2 text-center font-semibold text-[rgb(var(--text-color))]">TINDAKAN</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in bantuanList"
                :key="item.no"
                class="border-t border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))] transition-colors"
              >
                <td class="px-3 py-2.5 text-[rgb(var(--text-color))]">{{ item.no }}</td>
                <td class="px-3 py-2.5">
                  <span class="font-mono text-xs px-2 py-1 bg-[rgb(var(--bg-1))] rounded text-[rgb(var(--text-color))]">
                    {{ item.id }}
                  </span>
                </td>
                <td class="px-3 py-2.5 text-[rgb(var(--text-color))]">{{ item.jenisBantuan }}</td>
                <td class="px-3 py-2.5 text-center">
                  <div class="flex items-center justify-center gap-1.5">
                    <div class="w-2 h-2 bg-success rounded-full"></div>
                    <span class="text-xs font-medium text-[rgb(var(--text-color))]">{{ item.status }}</span>
                  </div>
                </td>
                <td class="px-3 py-2.5 text-center">
                  <span class="text-xs font-medium text-[rgb(var(--text-color))]">{{ item.sla }}</span>
                </td>
                <td class="px-3 py-2.5 text-center">
                  <rs-button
                    size="sm"
                    variant="primary"
                    @click="handleSemakan(item)"
                  >
                    Semakan
                  </rs-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>

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
