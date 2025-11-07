<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  title: "Pokok Keluarga",
  middleware: ["auth"],
  requiresAuth: true,
  breadcrumb: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Pokok Keluarga", path: "/mockup-tree" },
  ],
})

const showProfileModal = ref(false)
const selectedIndividual = ref(null)

// Sample family data based on profiling structure
const familyData = ref([
  {
    id: 'ketua-1',
    parentId: null,
    level: 0,
    // Maklumat Peribadi
    nama: 'Ahmad bin Abdullah',
    jenisId: 'Kad Pengenalan',
    noId: '770319035991',
    tarikhLahir: '1977-03-19',
    umur: 47,
    jantina: 'Lelaki',
    agama: 'Islam',
    bangsa: 'Melayu',
    warganegara: 'Warganegara',
    noTelefon: '0123456789',
    emel: 'ahmad@email.com',
    statusPerkahwinan: 'Berkahwin',

    // Kategori
    kategoriKeluarga: 'Ketua Keluarga',
    kategoriIndividu: 'Pemohon',

    // Alamat & Kediaman
    statusKediaman: 'Kediaman Percuma',
    tapakRumah: 'Milik Sendiri',
    jenisRumah: 'Kos Rendah',
    binaanRumah: 'Batu',
    bilBilik: 3,
    keadaanRumah: 'Baik',

    // Pendidikan
    tahapPendidikan: 'SPM',

    // Kesihatan
    tahapKesihatan: 'Sihat',

    // Pekerjaan
    statusPekerjaan: 'Tidak Bekerja',
    jenisPekerjaan: '',
    sektorPekerjaan: '',

    // Pendapatan
    pendapatanBulanan: 0,
  },
  {
    id: 'pasangan-1',
    parentId: 'ketua-1',
    level: 0,
    nama: 'Fatimah binti Hassan',
    jenisId: 'Kad Pengenalan',
    noId: '800515036782',
    tarikhLahir: '1980-05-15',
    umur: 44,
    jantina: 'Perempuan',
    agama: 'Islam',
    bangsa: 'Melayu',
    warganegara: 'Warganegara',
    noTelefon: '0123456788',
    statusPerkahwinan: 'Berkahwin',

    kategoriKeluarga: 'Pasangan',
    kategoriIndividu: 'Ahli Keluarga',

    tahapPendidikan: 'SPM',
    tahapKesihatan: 'Sihat',
    statusPekerjaan: 'Tidak Bekerja',
    pendapatanBulanan: 0,
  },
  {
    id: 'anak-1',
    parentId: 'ketua-1',
    level: 1,
    nama: 'Muhammad Amin bin Ahmad',
    jenisId: 'Kad Pengenalan',
    noId: '050820031234',
    tarikhLahir: '2005-08-20',
    umur: 19,
    jantina: 'Lelaki',
    agama: 'Islam',
    bangsa: 'Melayu',
    warganegara: 'Warganegara',

    kategoriKeluarga: 'Tanggungan',
    kategoriIndividu: 'Tanggungan',

    tahapPendidikan: 'Diploma',
    tahapKesihatan: 'Sihat',
    statusPekerjaan: 'Belajar',
    pendapatanBulanan: 0,
  },
  {
    id: 'anak-2',
    parentId: 'ketua-1',
    level: 1,
    nama: 'Nur Aisyah binti Ahmad',
    jenisId: 'Kad Pengenalan',
    noId: '101203031567',
    tarikhLahir: '2010-12-03',
    umur: 14,
    jantina: 'Perempuan',
    agama: 'Islam',
    bangsa: 'Melayu',
    warganegara: 'Warganegara',

    kategoriKeluarga: 'Tanggungan',
    kategoriIndividu: 'Tanggungan',

    tahapPendidikan: 'Tingkatan 2',
    tahapKesihatan: 'OKU',
    jenisMasalahKesihatan: 'Masalah Penglihatan',
    jumlahPerbelanjaanOKU: 300,
    statusPekerjaan: 'Belajar',
    pendapatanBulanan: 0,
  },
  {
    id: 'anak-3',
    parentId: 'ketua-1',
    level: 1,
    nama: 'Ahmad Faiz bin Ahmad',
    jenisId: 'Kad Pengenalan',
    noId: '150708031890',
    tarikhLahir: '2015-07-08',
    umur: 9,
    jantina: 'Lelaki',
    agama: 'Islam',
    bangsa: 'Melayu',
    warganegara: 'Warganegara',

    kategoriKeluarga: 'Tanggungan',
    kategoriIndividu: 'Tanggungan',

    tahapPendidikan: 'Tahun 3',
    tahapKesihatan: 'Sihat',
    statusPekerjaan: 'Belajar',
    pendapatanBulanan: 0,
  },
  {
    id: 'anak-4',
    parentId: 'ketua-1',
    level: 1,
    nama: 'Sofea binti Ahmad',
    jenisId: '',
    noId: '',
    tarikhLahir: '2020-03-15',
    umur: 4,
    jantina: 'Perempuan',
    agama: 'Islam',
    bangsa: 'Melayu',
    warganegara: 'Warganegara',

    kategoriKeluarga: 'Tanggungan',
    kategoriIndividu: 'Tanggungan',

    tahapPendidikan: 'Tadika',
    tahapKesihatan: 'Sihat',
    statusPekerjaan: '',
    pendapatanBulanan: 0,
  },
])

// Calculate total family kifayah
const totalFamilyKifayah = computed(() => {
  let total = 0

  familyData.value.forEach(member => {
    // Ketua Keluarga + Kediaman Percuma
    if (member.kategoriKeluarga === 'Ketua Keluarga') {
      if (member.statusKediaman === 'Milik Sendiri' || member.statusKediaman === 'Kediaman Percuma') {
        total += 780
      }
    }

    // Dewasa
    if (member.umur >= 18) {
      if (member.statusPekerjaan === 'Bekerja') {
        total += 200
      } else {
        total += 167
      }
    }

    // Tanggungan
    if (member.kategoriIndividu === 'Tanggungan') {
      if (member.tahapPendidikan === 'IPT' || member.tahapPendidikan === 'Ijazah' || member.tahapPendidikan === 'Diploma') {
        total += 613
      } else if (member.umur >= 7 && member.umur <= 17) {
        total += 408
      } else if (member.umur <= 6) {
        total += 327
      }
    }

    // OKU
    if (member.tahapKesihatan === 'OKU') {
      total += member.jumlahPerbelanjaanOKU || 0
    }

    // Sakit Kronik
    if (member.tahapKesihatan === 'Sakit Kronik') {
      total += member.kosRawatan || 0
    }

    // Kos Penjagaan Anak
    if (member.umur <= 12 && member.kategoriIndividu === 'Tanggungan') {
      total += 150
    }
  })

  return total
})

const totalFamilyIncome = computed(() => {
  return familyData.value.reduce((sum, member) => sum + (member.pendapatanBulanan || 0), 0)
})

const kifayahGap = computed(() => {
  return totalFamilyIncome.value - totalFamilyKifayah.value
})

const incomePercentage = computed(() => {
  if (totalFamilyKifayah.value === 0) return 0
  return ((totalFamilyIncome.value / totalFamilyKifayah.value) * 100).toFixed(2)
})

const familyCategory = computed(() => {
  return parseFloat(incomePercentage.value) < 100 ? 'Miskin' : 'Asnaf'
})

const handleNodeClick = (individual) => {
  selectedIndividual.value = individual
  showProfileModal.value = true
}

const handleCloseModal = () => {
  showProfileModal.value = false
  selectedIndividual.value = null
}

const handleSaveProfile = (updatedData) => {
  const index = familyData.value.findIndex(m => m.id === updatedData.id)
  if (index !== -1) {
    familyData.value[index] = updatedData
  }
  showProfileModal.value = false
}
</script>

<template>
  <div class="container mx-auto px-4 py-6 lg:px-6">
    <LayoutsBreadcrumb />

    <div class="mb-6">
      <h1 class="text-xl font-bold">Pokok Keluarga</h1>
      <p class="text-sm text-[rgb(var(--text-muted))] mt-1">
        Visualisasi struktur keluarga dengan maklumat had kifayah
      </p>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <rs-card>
        <template #body>
          <div class="p-2">
            <div class="text-sm text-[rgb(var(--text-muted))]">Jumlah Ahli Keluarga</div>
            <div class="text-2xl font-bold mt-1">{{ familyData.length }}</div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="p-2">
            <div class="text-sm text-[rgb(var(--text-muted))]">Jumlah Had Kifayah</div>
            <div class="text-2xl font-bold text-[rgb(var(--primary))] mt-1">
              RM {{ totalFamilyKifayah.toFixed(2) }}
            </div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="p-2">
            <div class="text-sm text-[rgb(var(--text-muted))]">Jumlah Pendapatan</div>
            <div class="text-2xl font-bold mt-1">RM {{ totalFamilyIncome.toFixed(2) }}</div>
          </div>
        </template>
      </rs-card>

      <rs-card>
        <template #body>
          <div class="p-2">
            <div class="text-sm text-[rgb(var(--text-muted))]">Kategori Keluarga</div>
            <rs-badge :variant="familyCategory === 'Miskin' ? 'error' : 'success'" size="lg" class="mt-2">
              {{ familyCategory }}
            </rs-badge>
          </div>
        </template>
      </rs-card>
    </div>

    <!-- Family Tree Visualization -->
    <rs-card class="mb-4">
      <template #header>
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Visualisasi Pokok Keluarga</h2>
          <div class="text-sm text-[rgb(var(--text-muted))]">
            Klik pada individu untuk melihat profil lengkap
          </div>
        </div>
      </template>
      <template #body>
        <FamilyTree :family-data="familyData" @node-click="handleNodeClick" />
      </template>
    </rs-card>

    <!-- Legend -->
    <rs-card>
      <template #header>
        <h2 class="text-lg font-semibold">Legenda</h2>
      </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded bg-[rgba(var(--primary),0.1)] border-2 border-[rgb(var(--primary))]"></div>
            <span class="text-sm">Ketua Keluarga</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded bg-[rgb(var(--bg-1))] border-2 border-[rgb(var(--border-color))]"></div>
            <span class="text-sm">Ahli Keluarga</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-4 h-4 rounded bg-[rgba(var(--error),0.1)] border-2 border-[rgb(var(--error))]"></div>
            <span class="text-sm">Profil Tidak Lengkap</span>
          </div>
        </div>

        <div class="mt-4 pt-4 border-t border-[rgb(var(--border-color))]">
          <h3 class="font-semibold text-sm mb-3">Kategori Had Kifayah:</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 text-sm">
            <div>1. Ketua Keluarga & Kediaman Percuma</div>
            <div>2. Umur ≥18 & Bekerja</div>
            <div>3. Umur ≥18 & Tidak Bekerja</div>
            <div>4. Tanggungan Belajar IPT</div>
            <div>5. Tanggungan 7-17 tahun</div>
            <div>6. Tanggungan ≤6 tahun</div>
            <div>7. OKU</div>
            <div>8. Pesakit Kronik</div>
            <div>9. Kos Penjagaan Anak ≤12</div>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Profile Modal -->
    <ProfileModal
      :show="showProfileModal"
      :individual="selectedIndividual"
      @close="handleCloseModal"
      @save="handleSaveProfile"
    />
  </div>
</template>

<style scoped>
/* Styles handled by components and design system */
</style>
    