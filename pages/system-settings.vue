<script setup>
definePageMeta({
  title: "System Settings",
  middleware: ["auth", "dashboard"],
})

const { $swal } = useNuxtApp()
const { siteSettings, updateSiteSettings, loadSiteSettings } = useSiteSettings()

// Form data - Initialize with current settings
const form = ref({
  siteLogo: siteSettings.value.siteLogo || '',
  siteLoginLogo: siteSettings.value.siteLoginLogo || '',
  siteLoadingLogo: siteSettings.value.siteLoadingLogo || '',
  siteName: siteSettings.value.siteName || '',
  siteDescription: siteSettings.value.siteDescription || ''
})

// Load settings on mount
onMounted(async () => {
  await loadSiteSettings()
  form.value = {
    siteLogo: siteSettings.value.siteLogo || '',
    siteLoginLogo: siteSettings.value.siteLoginLogo || '',
    siteLoadingLogo: siteSettings.value.siteLoadingLogo || '',
    siteName: siteSettings.value.siteName || '',
    siteDescription: siteSettings.value.siteDescription || ''
  }
})

// Watch for changes in siteSettings
watch(() => siteSettings.value, (newVal) => {
  form.value = {
    siteLogo: newVal.siteLogo || '',
    siteLoginLogo: newVal.siteLoginLogo || '',
    siteLoadingLogo: newVal.siteLoadingLogo || '',
    siteName: newVal.siteName || '',
    siteDescription: newVal.siteDescription || ''
  }
}, { deep: true })

// Preview logos
const logoPreview = computed(() => form.value.siteLogo || 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png')
const loginLogoPreview = computed(() => form.value.siteLoginLogo || form.value.siteLogo || 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png')
const loadingLogoPreview = computed(() => form.value.siteLoadingLogo || form.value.siteLogo || 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png')

// Save settings
const handleSave = async () => {
  const result = await updateSiteSettings(form.value)

  if (result.success) {
    $swal.fire({
      title: 'Berjaya!',
      text: 'Tetapan sistem telah disimpan. Halaman akan dimuat semula.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      // Reload page to apply changes
      window.location.reload()
    })
  } else {
    $swal.fire({
      title: 'Ralat!',
      text: result.error?.message || 'Gagal menyimpan tetapan sistem',
      icon: 'error'
    })
  }
}

// Reset to default
const handleReset = () => {
  $swal.fire({
    title: 'Reset ke Default?',
    text: 'Tetapan akan dikembalikan ke nilai asal',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Reset',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      form.value = {
        siteLogo: 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png',
        siteLoginLogo: 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png',
        siteLoadingLogo: 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png',
        siteName: "Attorney General's Chambers",
        siteDescription: 'Portal Pengurusan Digital'
      }
      handleSave()
    }
  })
}
</script>

<template>
  <div class="container mx-auto px-4 py-6 lg:px-6">
    <div class="mb-4">
      <h1 class="text-xl font-bold text-[rgb(var(--text-color))]">Tetapan Sistem</h1>
      <p class="text-sm text-[rgb(var(--text-muted))] mt-1">
        Konfigurasi logo dan tajuk sistem
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Main Settings -->
      <div class="lg:col-span-2">
        <rs-card>
          <template #header>
            <h2 class="text-lg font-semibold">Konfigurasi</h2>
          </template>
          <template #body>
            <div class="space-y-4">
              <!-- Main Logo URL -->
              <div>
                <label class="block text-sm font-medium text-[rgb(var(--text-color))] mb-2">
                  URL Logo Utama
                </label>
                <input
                  v-model="form.siteLogo"
                  type="url"
                  placeholder="https://example.com/logo.png"
                  class="w-full px-4 py-2.5 border border-[rgb(var(--border-color))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] bg-white dark:bg-gray-800 text-[rgb(var(--text-color))]"
                />
                <p class="text-xs text-[rgb(var(--text-muted))] mt-1">
                  Logo utama untuk sidebar dan header (PNG, JPG, SVG)
                </p>
              </div>

              <!-- Login Logo URL -->
              <div>
                <label class="block text-sm font-medium text-[rgb(var(--text-color))] mb-2">
                  URL Logo Login (Opsional)
                </label>
                <input
                  v-model="form.siteLoginLogo"
                  type="url"
                  placeholder="https://example.com/login-logo.png"
                  class="w-full px-4 py-2.5 border border-[rgb(var(--border-color))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] bg-white dark:bg-gray-800 text-[rgb(var(--text-color))]"
                />
                <p class="text-xs text-[rgb(var(--text-muted))] mt-1">
                  Logo khas untuk halaman login. Jika kosong, akan guna logo utama.
                </p>
              </div>

              <!-- Loading Logo URL -->
              <div>
                <label class="block text-sm font-medium text-[rgb(var(--text-color))] mb-2">
                  URL Logo Loading (Opsional)
                </label>
                <input
                  v-model="form.siteLoadingLogo"
                  type="url"
                  placeholder="https://example.com/loading-logo.png"
                  class="w-full px-4 py-2.5 border border-[rgb(var(--border-color))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] bg-white dark:bg-gray-800 text-[rgb(var(--text-color))]"
                />
                <p class="text-xs text-[rgb(var(--text-muted))] mt-1">
                  Logo untuk skrin loading. Jika kosong, akan guna logo utama.
                </p>
              </div>

              <!-- System Title -->
              <div>
                <label class="block text-sm font-medium text-[rgb(var(--text-color))] mb-2">
                  Nama Sistem
                </label>
                <input
                  v-model="form.siteName"
                  type="text"
                  placeholder="Nama Sistem"
                  class="w-full px-4 py-2.5 border border-[rgb(var(--border-color))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] bg-white dark:bg-gray-800 text-[rgb(var(--text-color))]"
                />
                <p class="text-xs text-[rgb(var(--text-muted))] mt-1">
                  Nama sistem yang akan dipaparkan
                </p>
              </div>

              <!-- System Description -->
              <div>
                <label class="block text-sm font-medium text-[rgb(var(--text-color))] mb-2">
                  Penerangan Sistem
                </label>
                <input
                  v-model="form.siteDescription"
                  type="text"
                  placeholder="Penerangan / Tagline"
                  class="w-full px-4 py-2.5 border border-[rgb(var(--border-color))] rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] bg-white dark:bg-gray-800 text-[rgb(var(--text-color))]"
                />
                <p class="text-xs text-[rgb(var(--text-muted))] mt-1">
                  Penerangan atau tagline sistem
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 pt-4">
                <rs-button variant="primary" @click="handleSave">
                  <Icon name="mdi:content-save" class="w-4 h-4 mr-2" />
                  Simpan Tetapan
                </rs-button>
                <rs-button variant="outline" @click="handleReset">
                  <Icon name="mdi:refresh" class="w-4 h-4 mr-2" />
                  Reset ke Default
                </rs-button>
              </div>
            </div>
          </template>
        </rs-card>
      </div>

      <!-- Preview Sidebar -->
      <div class="lg:col-span-1">
        <div class="space-y-4">
          <!-- Main Logo Preview -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold">Logo Utama</h2>
            </template>
            <template #body>
              <div class="border border-[rgb(var(--border-color))] rounded-md p-4 bg-gray-50 dark:bg-gray-800 flex items-center justify-center min-h-[100px]">
                <img
                  :src="logoPreview"
                  alt="Logo Preview"
                  class="max-h-[80px] max-w-full object-contain"
                  @error="$event.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'50\' y=\'50\' font-family=\'Arial\' font-size=\'12\' fill=\'%239ca3af\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3ENo Image%3C/text%3E%3C/svg%3E'"
                />
              </div>
            </template>
          </rs-card>

          <!-- Login Logo Preview -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold">Logo Login</h2>
            </template>
            <template #body>
              <div class="border border-[rgb(var(--border-color))] rounded-md p-4 bg-gray-50 dark:bg-gray-800 flex items-center justify-center min-h-[100px]">
                <img
                  :src="loginLogoPreview"
                  alt="Login Logo Preview"
                  class="max-h-[80px] max-w-full object-contain"
                  @error="$event.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'50\' y=\'50\' font-family=\'Arial\' font-size=\'12\' fill=\'%239ca3af\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3ENo Image%3C/text%3E%3C/svg%3E'"
                />
              </div>
            </template>
          </rs-card>

          <!-- Loading Logo Preview -->
          <rs-card>
            <template #header>
              <h2 class="text-base font-semibold">Logo Loading</h2>
            </template>
            <template #body>
              <div class="border border-[rgb(var(--border-color))] rounded-md p-4 bg-gray-50 dark:bg-gray-800 flex items-center justify-center min-h-[100px]">
                <img
                  :src="loadingLogoPreview"
                  alt="Loading Logo Preview"
                  class="max-h-[80px] max-w-full object-contain"
                  @error="$event.target.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%23e5e7eb\'/%3E%3Ctext x=\'50\' y=\'50\' font-family=\'Arial\' font-size=\'12\' fill=\'%239ca3af\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3ENo Image%3C/text%3E%3C/svg%3E'"
                />
              </div>
            </template>
          </rs-card>

          <!-- Info -->
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
            <div class="flex gap-2">
              <Icon name="mdi:information" class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-xs text-blue-800 dark:text-blue-300">
                  Tetapan akan disimpan ke database dan akan digunakan pada semua halaman sistem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
