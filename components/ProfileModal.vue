<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  individual: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const isEditing = ref(false)
const formData = ref({})

// Initialize form data when individual changes
watch(() => props.individual, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal }
    isEditing.value = false
  }
}, { immediate: true })

// Calculate kifayah details
const kifayahDetails = computed(() => {
  if (!formData.value) return []

  const details = []
  const member = formData.value

  if (member.kategoriKeluarga === 'Ketua Keluarga') {
    if (member.statusKediaman === 'Milik Sendiri' || member.statusKediaman === 'Kediaman Percuma') {
      details.push({
        kategori: 'Ketua Keluarga & Kediaman Percuma',
        hadKifayah: 780.00,
        keterangan: 'Ketua keluarga dengan rumah sendiri atau percuma'
      })
    }
  }

  if (member.umur >= 18) {
    if (member.statusPekerjaan === 'Bekerja') {
      details.push({
        kategori: 'Umur ≥18 & Bekerja',
        hadKifayah: 200.00,
        keterangan: 'Individu dewasa yang bekerja'
      })
    } else {
      details.push({
        kategori: 'Umur ≥18 & Tidak Bekerja',
        hadKifayah: 167.00,
        keterangan: 'Individu dewasa yang tidak bekerja'
      })
    }
  }

  if (member.kategoriIndividu === 'Tanggungan') {
    if (member.tahapPendidikan === 'IPT' || member.tahapPendidikan === 'Ijazah' || member.tahapPendidikan === 'Diploma') {
      details.push({
        kategori: 'Tanggungan Belajar IPT',
        hadKifayah: 613.00,
        keterangan: 'Tanggungan yang belajar di institusi pengajian tinggi'
      })
    } else if (member.umur >= 7 && member.umur <= 17) {
      details.push({
        kategori: 'Tanggungan 7-17 tahun',
        hadKifayah: 408.00,
        keterangan: 'Tanggungan usia sekolah menengah/rendah'
      })
    } else if (member.umur <= 6) {
      details.push({
        kategori: 'Tanggungan ≤6 tahun',
        hadKifayah: 327.00,
        keterangan: 'Tanggungan kanak-kanak pra-sekolah'
      })
    }
  }

  if (member.tahapKesihatan === 'OKU') {
    details.push({
      kategori: 'OKU',
      hadKifayah: member.jumlahPerbelanjaanOKU || 0,
      keterangan: 'Orang Kurang Upaya dengan keperluan khas'
    })
  }

  if (member.tahapKesihatan === 'Sakit Kronik') {
    details.push({
      kategori: 'Pesakit Kronik',
      hadKifayah: member.kosRawatan || 0,
      keterangan: 'Pesakit kronik dengan kos rawatan berterusan'
    })
  }

  if (member.umur <= 12 && member.kategoriIndividu === 'Tanggungan') {
    details.push({
      kategori: 'Kos Penjagaan Anak ≤12',
      hadKifayah: 150.00,
      keterangan: 'Kos penjagaan untuk kanak-kanak'
    })
  }

  return details
})

const totalKifayah = computed(() => {
  return kifayahDetails.value.reduce((sum, item) => sum + item.hadKifayah, 0)
})

const isProfileIncomplete = computed(() => {
  if (!formData.value) return false
  return !formData.value.nama || !formData.value.tarikhLahir || !formData.value.noId
})

const handleClose = () => {
  isEditing.value = false
  emit('close')
}

const handleEdit = () => {
  isEditing.value = true
}

const handleCancelEdit = () => {
  formData.value = { ...props.individual }
  isEditing.value = false
}

const handleSave = () => {
  emit('save', formData.value)
  isEditing.value = false
}
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="text-xl font-bold">Profil Individu</h2>
        <button @click="handleClose" class="close-button">
          <Icon name="mdi:close" class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
        <!-- Incomplete Profile Warning -->
        <div v-if="isProfileIncomplete" class="alert alert-warning mb-4">
          <Icon name="mdi:alert" class="w-5 h-5" />
          <span>Profil tidak lengkap. Sila lengkapkan maklumat untuk pengiraan had kifayah yang tepat.</span>
        </div>

        <!-- Profile Summary -->
        <rs-card class="mb-4">
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold">Maklumat Asas</h3>
              <rs-button v-if="!isEditing" variant="outline" size="sm" @click="handleEdit">
                <Icon name="mdi:pencil" class="w-4 h-4 mr-1" />
                Kemaskini
              </rs-button>
            </div>
          </template>
          <template #body>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">Nama</label>
                <div v-if="!isEditing" class="font-medium">{{ formData.nama || 'N/A' }}</div>
                <FormKit v-else type="text" v-model="formData.nama" validation="required" />
              </div>

              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">No. ID</label>
                <div v-if="!isEditing" class="font-medium">{{ formData.noId || 'N/A' }}</div>
                <FormKit v-else type="text" v-model="formData.noId" validation="required" />
              </div>

              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">Tarikh Lahir</label>
                <div v-if="!isEditing" class="font-medium">{{ formData.tarikhLahir || 'N/A' }}</div>
                <FormKit v-else type="date" v-model="formData.tarikhLahir" validation="required" />
              </div>

              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">Umur</label>
                <div class="font-medium">{{ formData.umur || 0 }} tahun</div>
              </div>

              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">Jantina</label>
                <div v-if="!isEditing" class="font-medium">{{ formData.jantina || 'N/A' }}</div>
                <FormKit v-else type="select" v-model="formData.jantina" :options="['Lelaki', 'Perempuan']" />
              </div>

              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">Kategori Keluarga</label>
                <div v-if="!isEditing" class="font-medium">
                  <rs-badge :variant="formData.kategoriKeluarga === 'Ketua Keluarga' ? 'primary' : 'default'">
                    {{ formData.kategoriKeluarga || 'N/A' }}
                  </rs-badge>
                </div>
                <FormKit v-else type="select" v-model="formData.kategoriKeluarga" :options="['Ketua Keluarga', 'Pasangan', 'Tanggungan', 'Lain-lain']" />
              </div>

              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">Kategori Individu</label>
                <div v-if="!isEditing" class="font-medium">{{ formData.kategoriIndividu || 'N/A' }}</div>
                <FormKit v-else type="select" v-model="formData.kategoriIndividu" :options="['Pemohon', 'Tanggungan', 'Ahli Keluarga']" />
              </div>

              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">Status Pekerjaan</label>
                <div v-if="!isEditing" class="font-medium">{{ formData.statusPekerjaan || 'N/A' }}</div>
                <FormKit v-else type="select" v-model="formData.statusPekerjaan" :options="['Bekerja', 'Tidak Bekerja', 'Belajar', 'Pesara']" />
              </div>

              <div>
                <label class="text-sm text-[rgb(var(--text-muted))]">Tahap Kesihatan</label>
                <div v-if="!isEditing" class="font-medium">
                  <rs-badge :variant="formData.tahapKesihatan === 'Sihat' ? 'success' : 'warning'">
                    {{ formData.tahapKesihatan || 'N/A' }}
                  </rs-badge>
                </div>
                <FormKit v-else type="select" v-model="formData.tahapKesihatan" :options="['Sihat', 'OKU', 'Sakit Kronik']" />
              </div>
            </div>

            <!-- Additional fields for OKU -->
            <div v-if="isEditing && formData.tahapKesihatan === 'OKU'" class="mt-4 grid grid-cols-2 gap-4">
              <FormKit type="text" label="Jenis Kecacatan" v-model="formData.jenisMasalahKesihatan" />
              <FormKit type="number" label="Jumlah Perbelanjaan OKU (RM)" v-model="formData.jumlahPerbelanjaanOKU" />
            </div>

            <!-- Additional fields for Sakit Kronik -->
            <div v-if="isEditing && formData.tahapKesihatan === 'Sakit Kronik'" class="mt-4 grid grid-cols-2 gap-4">
              <FormKit type="text" label="Jenis Penyakit" v-model="formData.jenisPenyakit" />
              <FormKit type="number" label="Kos Rawatan Bulanan (RM)" v-model="formData.kosRawatan" />
            </div>

            <!-- Edit Actions -->
            <div v-if="isEditing" class="flex gap-3 justify-end mt-6">
              <rs-button variant="outline" @click="handleCancelEdit">
                Batal
              </rs-button>
              <rs-button variant="primary" @click="handleSave">
                <Icon name="mdi:check" class="w-4 h-4 mr-1" />
                Simpan
              </rs-button>
            </div>
          </template>
        </rs-card>

        <!-- Kifayah Calculation -->
        <rs-card>
          <template #header>
            <h3 class="text-lg font-semibold">Had Kifayah</h3>
          </template>
          <template #body>
            <div v-if="kifayahDetails.length === 0" class="text-center text-[rgb(var(--text-muted))] py-4">
              Tiada had kifayah yang berkenaan
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="(item, index) in kifayahDetails"
                :key="index"
                class="p-3 bg-[rgb(var(--bg-1))] rounded-lg"
              >
                <div class="flex items-start justify-between gap-3">
                  <div class="flex-1">
                    <div class="font-semibold text-sm">{{ item.kategori }}</div>
                    <div class="text-xs text-[rgb(var(--text-muted))] mt-1">{{ item.keterangan }}</div>
                  </div>
                  <div class="text-right">
                    <div class="font-bold text-[rgb(var(--primary))]">RM {{ item.hadKifayah.toFixed(2) }}</div>
                  </div>
                </div>
              </div>

              <div class="border-t border-[rgb(var(--border-color))] pt-3 mt-4">
                <div class="flex items-center justify-between">
                  <div class="font-bold text-base">Jumlah Had Kifayah</div>
                  <div class="font-bold text-lg text-[rgb(var(--primary))]">RM {{ totalKifayah.toFixed(2) }}</div>
                </div>
              </div>
            </div>
          </template>
        </rs-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: rgb(var(--bg-2));
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgb(var(--border-color));
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  color: rgb(var(--text-color));
}

.close-button:hover {
  background: rgb(var(--bg-1));
}

.alert {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.alert-warning {
  background: rgba(var(--warning), 0.1);
  color: rgb(var(--warning));
  border: 1px solid rgba(var(--warning), 0.3);
}
</style>
