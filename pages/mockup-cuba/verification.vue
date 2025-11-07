<script setup>
definePageMeta({
  title: "Pengesahan Organisasi",
  layout: "default",
})

// Organization application data
const application = ref({
  // Application metadata
  reference: 'ORG-202505-0003',
  applicationDate: '17/7/2025',
  status: 'MENUNGGU PENGESAHAN',

  // Basic information
  organizationName: 'Masjid Al-Hidayah',
  organizationType: 'Masjid',
  registrationNo: 'PPM-2020-001',
  registrationStatus: 'Berdaftar',
  structure: 'HQ',
  zone: 'Zon Klang',

  // Address
  address: {
    line1: 'Lot 789, Jalan Masjid 5/2',
    line2: 'Taman Masjid Klang',
    postcode: '41000',
    city: 'Klang',
    district: 'Klang',
    state: 'Selangor',
  },

  // Representative 1
  representative: {
    name: 'Ustazah Siti Fatimah binti Ali',
    ic: '820315234567',
    phone: '03-55123458',
    email: 'fatimah@masjidssa.gov.my',
  },

  // Bank information
  bank: {
    name: 'Bank Islam',
    accountNo: '2098765432109',
    accountHolder: 'Masjid Al-Hidayah',
    paymentMethod: 'Bank Transfer',
    swiftCode: 'BIMBMYKL',
  },
})

// Supporting documents
const documents = ref([
  {
    id: 1,
    type: 'Sijil Pendaftaran',
    filename: 'sijil_ros_masjid_2020.pdf',
    size: '1.7 MB',
    status: 'complete'
  },
  {
    id: 2,
    type: 'Surat Perwakilan Kuasa',
    filename: 'surat_perwakilan_cawangan_2025.pdf',
    size: '1.3 MB',
    status: 'complete'
  },
  {
    id: 3,
    type: 'Bukti Bank',
    filename: 'bank_letter_cawangan_2025.pdf',
    size: '0.8 MB',
    status: 'complete'
  },
  {
    id: 4,
    type: 'Dokumen Tambahan',
    filename: null,
    size: null,
    status: 'empty'
  },
])

// Verification decision form
const verificationForm = ref({
  decision: null, // 'approved', 'correction', 'rejected'
  remarks: '',
})

const isSubmitting = ref(false)
const canSubmit = computed(() => verificationForm.value.decision !== null)

// Action handlers
function handleBack() {
  navigateTo('/mockup-cuba/list')
}

function handleViewDocument(doc) {
  if (doc.status === 'empty') return
  console.log('View document:', doc.filename)
  // Implement document viewer
}

function handleDownloadDocument(doc) {
  if (doc.status === 'empty') return
  console.log('Download document:', doc.filename)
  // Implement download
}

async function handleSubmitDecision() {
  if (!canSubmit.value) return

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('Submitting verification decision:', verificationForm.value)

    // Show success message and navigate back
    alert('Keputusan pengesahan berjaya dihantar')
    navigateTo('/mockup-cuba/list')
  } catch (error) {
    console.error('Error submitting decision:', error)
    alert('Ralat semasa menghantar keputusan')
  } finally {
    isSubmitting.value = false
  }
}

// Badge variant helper
function getStatusVariant(status) {
  const variants = {
    'MENUNGGU PENGESAHAN': 'warning',
    'DISAHKAN': 'success',
    'PERLU PEMBETULAN': 'error',
    'TIDAK SAH': 'error',
  }
  return variants[status] || 'default'
}
</script>

<template>
  <div class="container mx-auto px-4 py-6 lg:px-6">
    <LayoutsBreadcrumb />

    <!-- Page Header -->
    <div class="mb-4">
      <h1 class="text-xl font-bold text-[rgb(var(--text-color))] mb-2">Maklumat Organisasi Terperinci</h1>

      <!-- Status Card -->
      <rs-card class="bg-[rgb(var(--bg-1))]">
        <template #body>
          <div class="flex items-start justify-between gap-4 flex-wrap">
            <div class="space-y-1">
              <h3 class="text-base font-semibold text-[rgb(var(--text-color))]">Status Permohonan</h3>
              <div class="flex items-center gap-3 text-sm text-[rgb(var(--text-muted))]">
                <span>Rujukan: <span class="font-medium text-[rgb(var(--text-color))]">{{ application.reference }}</span></span>
                <span>•</span>
                <span>Tarikh Permohonan: <span class="font-medium text-[rgb(var(--text-color))]">{{ application.applicationDate }}</span></span>
              </div>
            </div>
            <rs-badge :variant="getStatusVariant(application.status)" size="lg">
              {{ application.status }}
            </rs-badge>
          </div>
        </template>
      </rs-card>
    </div>

    <!-- Main Layout: 2/3 + 1/3 Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Left Column: Main Content (2/3) -->
      <div class="lg:col-span-2 space-y-4">

        <!-- Basic Information -->
        <rs-card>
          <template #header>
            <h2 class="text-lg font-semibold text-[rgb(var(--text-color))]">Maklumat Asas</h2>
          </template>
          <template #body>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
              <div class="col-span-2 md:col-span-3">
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Nama Organisasi</p>
                <p class="text-base font-semibold text-[rgb(var(--text-color))]">{{ application.organizationName }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Jenis Organisasi</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.organizationType }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">No. Pendaftaran</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.registrationNo }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Status Pendaftaran</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.registrationStatus }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Struktur</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.structure }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Kawasan/Zon</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.zone }}</p>
              </div>
            </div>
          </template>
        </rs-card>

        <!-- Address Information -->
        <rs-card>
          <template #header>
            <h2 class="text-lg font-semibold text-[rgb(var(--text-color))]">Maklumat Alamat</h2>
          </template>
          <template #body>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
              <div class="col-span-2">
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Alamat 1</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.address.line1 }}</p>
              </div>
              <div class="col-span-2">
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Alamat 2</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.address.line2 }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Poskod</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.address.postcode }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Bandar</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.address.city }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Daerah</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.address.district }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Negeri</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ application.address.state }}</p>
              </div>
            </div>
          </template>
        </rs-card>

        <!-- Representative & Bank in 2-column grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <!-- Representative Information -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Maklumat Perhubungan</h2>
            </template>
            <template #body>
              <div class="space-y-3">
                <h3 class="text-sm font-semibold text-[rgb(var(--text-color))]">Wakil 1</h3>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Nama</p>
                  <p class="text-sm font-medium text-[rgb(var(--text-color))]">{{ application.representative.name }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">No. IC</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ application.representative.ic }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">No. Telefon</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ application.representative.phone }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Emel</p>
                  <a :href="`mailto:${application.representative.email}`" class="text-sm text-[rgb(var(--primary))] hover:underline break-all">
                    {{ application.representative.email }}
                  </a>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- Bank Information -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Maklumat Bank</h2>
            </template>
            <template #body>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Nama Bank</p>
                  <p class="text-sm font-medium text-[rgb(var(--text-color))]">{{ application.bank.name }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">No. Akaun Bank</p>
                  <p class="text-sm font-mono text-[rgb(var(--text-color))]">{{ application.bank.accountNo }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Nama Pemegang Akaun</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ application.bank.accountHolder }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Kaedah Pembayaran</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ application.bank.paymentMethod }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">SWIFT Code</p>
                  <p class="text-sm font-mono text-[rgb(var(--text-color))]">{{ application.bank.swiftCode }}</p>
                </div>
              </div>
            </template>
          </rs-card>

        </div>

        <!-- Documents -->
        <rs-card>
          <template #header>
            <h2 class="text-lg font-semibold text-[rgb(var(--text-color))]">Dokumen Sokongan</h2>
          </template>
          <template #body>
            <div class="space-y-3">
              <div
                v-for="doc in documents"
                :key="doc.id"
                class="flex items-center justify-between gap-4 p-3 rounded border border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))]"
              >
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-semibold text-[rgb(var(--text-color))] mb-0.5">{{ doc.type }}</p>
                  <div v-if="doc.status === 'complete'" class="flex items-center gap-2 text-xs text-[rgb(var(--text-muted))]">
                    <Icon name="mdi:file-document" class="w-4 h-4" />
                    <span class="truncate">{{ doc.filename }}</span>
                    <span>•</span>
                    <span>{{ doc.size }}</span>
                  </div>
                  <p v-else class="text-xs text-[rgb(var(--text-muted))]">TIADA</p>
                </div>
                <div v-if="doc.status === 'complete'" class="flex items-center gap-1 flex-shrink-0">
                  <rs-button size="sm" variant="ghost" @click="handleViewDocument(doc)">
                    Lihat
                  </rs-button>
                  <rs-button size="sm" variant="outline" @click="handleDownloadDocument(doc)">
                    <Icon name="mdi:download" class="w-4 h-4" />
                  </rs-button>
                </div>
              </div>
            </div>
          </template>
        </rs-card>

      </div>

      <!-- Right Sidebar (1/3) -->
      <div class="lg:col-span-1">
        <div class="lg:sticky lg:top-6 space-y-4">

          <!-- Verification Decision Form -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Keputusan Pengesahan (Semak)</h2>
            </template>
            <template #body>
              <div class="space-y-4">

                <!-- Decision Radio Buttons -->
                <div>
                  <label class="text-sm font-medium text-[rgb(var(--text-color))] mb-2 block">
                    Status Pengesahan <span class="text-[rgb(var(--error))]">*</span>
                  </label>
                  <div class="space-y-2">
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        v-model="verificationForm.decision"
                        value="approved"
                        class="w-4 h-4 text-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))]"
                      />
                      <span class="text-sm text-[rgb(var(--text-color))]">Disahkan</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        v-model="verificationForm.decision"
                        value="correction"
                        class="w-4 h-4 text-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))]"
                      />
                      <span class="text-sm text-[rgb(var(--text-color))]">Perlu Pembetulan</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        v-model="verificationForm.decision"
                        value="rejected"
                        class="w-4 h-4 text-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))]"
                      />
                      <span class="text-sm text-[rgb(var(--text-color))]">Tidak Sah</span>
                    </label>
                  </div>
                  <p v-if="!canSubmit" class="text-xs text-[rgb(var(--error))] mt-1">Status pengesahan adalah wajib</p>
                </div>

                <!-- Remarks (optional) -->
                <div>
                  <label class="text-sm font-medium text-[rgb(var(--text-color))] mb-1.5 block">
                    Catatan
                  </label>
                  <textarea
                    v-model="verificationForm.remarks"
                    rows="4"
                    placeholder="Masukkan catatan jika perlu..."
                    class="w-full px-3 py-2 text-sm border border-[rgb(var(--border-color))] rounded focus:outline-none focus:border-[rgb(var(--primary))] focus:ring-1 focus:ring-[rgb(var(--primary))]"
                  ></textarea>
                </div>

                <!-- Action Buttons -->
                <div class="space-y-2 pt-2">
                  <rs-button
                    variant="primary"
                    class="w-full"
                    :disabled="!canSubmit || isSubmitting"
                    @click="handleSubmitDecision"
                  >
                    <Icon v-if="isSubmitting" name="mdi:loading" class="w-4 h-4 mr-1.5 animate-spin" />
                    <Icon v-else name="mdi:check" class="w-4 h-4 mr-1.5" />
                    {{ isSubmitting ? 'Menghantar...' : 'Hantar Keputusan' }}
                  </rs-button>
                  <rs-button
                    variant="outline"
                    class="w-full"
                    @click="handleBack"
                  >
                    <Icon name="mdi:arrow-left" class="w-4 h-4 mr-1.5" />
                    Kembali
                  </rs-button>
                </div>

              </div>
            </template>
          </rs-card>

          <!-- Info Box -->
          <div class="p-3 bg-[rgb(var(--bg-1))] border border-[rgb(var(--border-color))] rounded">
            <div class="flex gap-2">
              <Icon name="mdi:information" class="w-4 h-4 text-[rgb(var(--primary))] flex-shrink-0 mt-0.5" />
              <p class="text-xs text-[rgb(var(--text-muted))]">
                Sila semak semua maklumat dengan teliti sebelum membuat keputusan pengesahan.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
