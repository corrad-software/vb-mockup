<script setup>
definePageMeta({
  title: "Profil Organisasi",
})

// Core organization data - optimized grouping
const organization = ref({
  // Primary identifiers
  id: 'ORG-202505-0003',
  name: 'Yayasan Kebajikan Islam Selangor',
  registrationNo: 'PPM-001-10-11032024',
  registrationType: 'Pertubuhan Kebajikan',
  category: 'Berdaftar',
  status: 'AKTIF',
  registrationDate: '15/03/2024',

  // Contact details
  contact: {
    address: 'No. 123, Jalan Merdeka',
    address2: 'Taman Sentosa',
    postcode: '40000',
    city: 'Shah Alam',
    state: 'Selangor',
    phone: '03-5544 3322',
    fax: '03-5544 3323',
    email: 'info@ykis.org.my',
    website: 'www.ykis.org.my',
  },

  // Banking
  bank: {
    name: 'Maybank',
    accountNo: '1234567890123',
    accountHolder: 'Yayasan Kebajikan Islam Selangor',
  },

  // Representative
  representative: {
    name: 'Ahmad bin Abdullah',
    ic: '740815-10-5678',
    position: 'Pengerusi',
    phone: '012-345 6789',
    email: 'ahmad@ykis.org.my',
  },

  // Metadata
  createdBy: 'System',
  createdDate: '15/03/2024 09:00 PG',
  updatedBy: 'Siti Aminah',
  updatedDate: '20/10/2025 10:30 PG',
})

// Documents with status
const documents = ref([
  { id: 1, type: 'Sijil Pendaftaran', status: 'Lengkap', uploadDate: '15/03/2024', size: '2.4 MB' },
  { id: 2, type: 'Surat Pengesahan Bank', status: 'Lengkap', uploadDate: '15/03/2024', size: '1.8 MB' },
  { id: 3, type: 'Salinan MyKad Wakil', status: 'Lengkap', uploadDate: '15/03/2024', size: '956 KB' },
  { id: 4, type: 'Surat Pelantikan Wakil', status: 'Lengkap', uploadDate: '15/03/2024', size: '1.2 MB' },
])

// Activity log
const activities = ref([
  { id: 1, action: 'Profil dikemas kini', datetime: '20/10/2025 10:30 PG', officer: 'Siti Aminah', type: 'update' },
  { id: 2, action: 'Dokumen dimuat naik', datetime: '18/10/2025 02:15 PTG', officer: 'Ahmad Rizal', type: 'upload' },
  { id: 3, action: 'Status ditukar ke AKTIF', datetime: '15/03/2024 09:45 PG', officer: 'Faridah Hassan', type: 'status' },
  { id: 4, action: 'Profil dicipta', datetime: '15/03/2024 09:00 PG', officer: 'System', type: 'create' },
])

// Computed stats
const stats = computed(() => ({
  documentsComplete: documents.value.filter(d => d.status === 'Lengkap').length,
  documentsTotal: documents.value.length,
  activitiesCount: activities.value.length,
  lastUpdate: organization.value.updatedDate,
}))

// Action handlers
function handleEdit() {
  navigateTo('/mockup-cuba/edit')
}

function handleDeactivate() {
  if (confirm('Nyahaktifkan organisasi ini?')) {
    console.log('Deactivating organization')
  }
}

function handleExportPDF() {
  console.log('Exporting to PDF')
}

function handleViewDocument(doc) {
  console.log('View document:', doc)
}

function handleDownloadDocument(doc) {
  console.log('Download document:', doc)
}
</script>

<template>
  <div class="container mx-auto px-4 py-6 lg:px-6">
    <LayoutsBreadcrumb />

    <!-- Page Header -->
    <div class="mb-4">
      <div class="flex items-start justify-between gap-4 flex-wrap">
        <div class="flex-1 min-w-0">
          <h1 class="text-xl font-bold text-[rgb(var(--text-color))] mb-1">{{ organization.name }}</h1>
          <div class="flex items-center gap-3 text-sm text-[rgb(var(--text-muted))]">
            <span class="font-medium">{{ organization.id }}</span>
            <span>•</span>
            <span>{{ organization.registrationType }}</span>
          </div>
        </div>
        <rs-badge :variant="organization.status === 'AKTIF' ? 'success' : 'error'" size="lg">
          {{ organization.status }}
        </rs-badge>
      </div>
    </div>

    <!-- Main Layout: 2/3 + 1/3 Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">

      <!-- Left Column: Main Content (2/3) -->
      <div class="lg:col-span-2 space-y-4">

        <!-- Primary Information Card -->
        <rs-card>
          <template #header>
            <h2 class="text-lg font-semibold text-[rgb(var(--text-color))]">Maklumat Pendaftaran</h2>
          </template>
          <template #body>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
              <div class="col-span-2 md:col-span-3">
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Nama Organisasi</p>
                <p class="text-base font-semibold text-[rgb(var(--text-color))]">{{ organization.name }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">No. Pendaftaran</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.registrationNo }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Jenis</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.registrationType }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Kategori</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.category }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Tarikh Daftar</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.registrationDate }}</p>
              </div>
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Status</p>
                <rs-badge :variant="organization.status === 'AKTIF' ? 'success' : 'error'">
                  {{ organization.status }}
                </rs-badge>
              </div>
            </div>
          </template>
        </rs-card>

        <!-- Contact Information -->
        <rs-card>
          <template #header>
            <h2 class="text-lg font-semibold text-[rgb(var(--text-color))]">Maklumat Perhubungan</h2>
          </template>
          <template #body>
            <div class="space-y-4">
              <!-- Address -->
              <div>
                <p class="text-xs text-[rgb(var(--text-muted))] mb-1.5">Alamat</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.contact.address }}</p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.contact.address2 }}</p>
                <p class="text-sm text-[rgb(var(--text-color))]">
                  {{ organization.contact.postcode }} {{ organization.contact.city }}
                </p>
                <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.contact.state }}</p>
              </div>

              <!-- Contact Grid -->
              <div class="grid grid-cols-2 gap-x-6 gap-y-3 pt-3 border-t border-[rgb(var(--border-color))]">
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Telefon</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.contact.phone }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Faks</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.contact.fax }}</p>
                </div>
                <div class="col-span-2">
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Emel</p>
                  <a :href="`mailto:${organization.contact.email}`" class="text-sm text-[rgb(var(--primary))] hover:underline">
                    {{ organization.contact.email }}
                  </a>
                </div>
                <div class="col-span-2">
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Laman Web</p>
                  <a :href="`https://${organization.contact.website}`" target="_blank" class="text-sm text-[rgb(var(--primary))] hover:underline">
                    {{ organization.contact.website }}
                  </a>
                </div>
              </div>
            </div>
          </template>
        </rs-card>

        <!-- Bank & Representative in 2-column grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <!-- Bank Information -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Maklumat Bank</h2>
            </template>
            <template #body>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Nama Bank</p>
                  <p class="text-sm font-medium text-[rgb(var(--text-color))]">{{ organization.bank.name }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">No. Akaun</p>
                  <p class="text-sm font-mono text-[rgb(var(--text-color))]">{{ organization.bank.accountNo }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Nama Pemegang</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.bank.accountHolder }}</p>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- Representative -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Wakil Organisasi</h2>
            </template>
            <template #body>
              <div class="space-y-3">
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Nama</p>
                  <p class="text-sm font-medium text-[rgb(var(--text-color))]">{{ organization.representative.name }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">No. K/P</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.representative.ic }}</p>
                </div>
                <div>
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Jawatan</p>
                  <p class="text-sm text-[rgb(var(--text-color))]">{{ organization.representative.position }}</p>
                </div>
              </div>
            </template>
          </rs-card>

        </div>

        <!-- Documents -->
        <rs-card>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-[rgb(var(--text-color))]">Dokumen</h2>
              <rs-badge variant="info">{{ documents.length }}</rs-badge>
            </div>
          </template>
          <template #body>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-[rgb(var(--bg-1))]">
                  <tr>
                    <th class="px-3 py-2 text-left font-semibold">Jenis Dokumen</th>
                    <th class="px-3 py-2 text-left font-semibold">Status</th>
                    <th class="px-3 py-2 text-left font-semibold">Tarikh</th>
                    <th class="px-3 py-2 text-center font-semibold">Tindakan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="doc in documents"
                    :key="doc.id"
                    class="border-t border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))]"
                  >
                    <td class="px-3 py-2.5">{{ doc.type }}</td>
                    <td class="px-3 py-2.5">
                      <rs-badge :variant="doc.status === 'Lengkap' ? 'success' : 'warning'">
                        {{ doc.status }}
                      </rs-badge>
                    </td>
                    <td class="px-3 py-2.5 text-[rgb(var(--text-muted))]">{{ doc.uploadDate }}</td>
                    <td class="px-3 py-2.5">
                      <div class="flex items-center justify-center gap-1">
                        <rs-button size="sm" variant="ghost" @click="handleViewDocument(doc)">
                          <Icon name="mdi:eye" class="w-4 h-4" />
                        </rs-button>
                        <rs-button size="sm" variant="ghost" @click="handleDownloadDocument(doc)">
                          <Icon name="mdi:download" class="w-4 h-4" />
                        </rs-button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </rs-card>

        <!-- Activity History -->
        <rs-card>
          <template #header>
            <h2 class="text-lg font-semibold text-[rgb(var(--text-color))]">Sejarah Aktiviti</h2>
          </template>
          <template #body>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead class="bg-[rgb(var(--bg-1))]">
                  <tr>
                    <th class="px-3 py-2 text-left font-semibold">Aktiviti</th>
                    <th class="px-3 py-2 text-left font-semibold">Tarikh & Masa</th>
                    <th class="px-3 py-2 text-left font-semibold">Pegawai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="activity in activities"
                    :key="activity.id"
                    class="border-t border-[rgb(var(--border-color))] hover:bg-[rgb(var(--bg-1))]"
                  >
                    <td class="px-3 py-2.5">{{ activity.action }}</td>
                    <td class="px-3 py-2.5 text-[rgb(var(--text-muted))]">{{ activity.datetime }}</td>
                    <td class="px-3 py-2.5">{{ activity.officer }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>
        </rs-card>

      </div>

      <!-- Right Sidebar (1/3) -->
      <div class="lg:col-span-1">
        <div class="lg:sticky lg:top-6 space-y-4">

          <!-- Quick Stats -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Ringkasan</h2>
            </template>
            <template #body>
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-[rgb(var(--text-muted))]">Dokumen</span>
                  <span class="text-sm font-semibold text-[rgb(var(--text-color))]">
                    {{ stats.documentsComplete }}/{{ stats.documentsTotal }}
                  </span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-[rgb(var(--text-muted))]">Rekod Aktiviti</span>
                  <span class="text-sm font-semibold text-[rgb(var(--text-color))]">{{ stats.activitiesCount }}</span>
                </div>
                <div class="pt-2 border-t border-[rgb(var(--border-color))]">
                  <p class="text-xs text-[rgb(var(--text-muted))] mb-0.5">Kemaskini Terakhir</p>
                  <p class="text-xs text-[rgb(var(--text-color))]">{{ stats.lastUpdate }}</p>
                  <p class="text-xs text-[rgb(var(--text-muted))]">oleh {{ organization.updatedBy }}</p>
                </div>
              </div>
            </template>
          </rs-card>

          <!-- Actions -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold text-[rgb(var(--text-color))]">Tindakan</h2>
            </template>
            <template #body>
              <div class="space-y-2">
                <rs-button variant="primary" class="w-full" @click="handleEdit">
                  <Icon name="mdi:pencil" class="w-4 h-4 mr-1.5" />
                  Kemaskini
                </rs-button>
                <rs-button variant="outline" class="w-full" @click="handleExportPDF">
                  <Icon name="mdi:file-pdf-box" class="w-4 h-4 mr-1.5" />
                  Eksport PDF
                </rs-button>
                <rs-button variant="error" class="w-full" @click="handleDeactivate">
                  <Icon name="mdi:close-circle" class="w-4 h-4 mr-1.5" />
                  Nyahaktif
                </rs-button>
              </div>
            </template>
          </rs-card>

          <!-- Info Box -->
          <div class="p-3 bg-info/10 border border-info/30 rounded-lg">
            <div class="flex gap-2">
              <Icon name="mdi:information" class="w-4 h-4 text-info flex-shrink-0 mt-0.5" />
              <p class="text-xs text-[rgb(var(--text-color))]/70">
                Organisasi ini telah disahkan dan berdaftar dengan Lembaga Zakat Selangor.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>
