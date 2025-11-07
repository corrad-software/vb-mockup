<script setup>
const { siteSettings } = useSiteSettings()

const showMessage = ref(false);

// Show refresh message after 8 seconds
setTimeout(() => {
  showMessage.value = true;
}, 8000);

const refreshPage = () => {
  window.location.reload(true);
};

// Computed property for logo with fallback
const logoUrl = computed(() => {
  return siteSettings.value?.siteLoadingLogo || siteSettings.value?.siteLogo || 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png'
})
</script>

<template>
  <div class="rs-loading fixed inset-0 z-50 bg-white dark:bg-gray-900">
      <div class="flex flex-col justify-center items-center h-full px-4">
        <!-- Logo with subtle animation -->
        <div class="mb-8 animate-fade-in">
          <img
            :src="logoUrl"
            :alt="siteSettings.siteName || 'Loading'"
            class="h-16 w-auto object-contain opacity-90"
          />
        </div>

        <!-- Loading Spinner -->
        <div class="relative">
          <!-- Outer spinning ring -->
          <div class="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-[rgb(var(--primary))] rounded-full animate-spin"></div>

          <!-- Inner pulsing dot -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-3 h-3 bg-[rgb(var(--primary))] rounded-full animate-pulse"></div>
          </div>
        </div>

        <!-- Optional refresh message -->
        <div v-if="showMessage" class="mt-8 text-center animate-fade-in">
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Mengambil masa lebih lama?</p>
          <button
            @click="refreshPage"
            class="text-sm text-[rgb(var(--primary))] hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(var(--primary))] focus:ring-offset-2 rounded px-2 py-1"
          >
            Muat semula halaman
          </button>
        </div>
      </div>
    </div>
</template>

<style scoped>
/* Fade in animation */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

/* Accessibility - Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .animate-spin,
  .animate-pulse,
  .animate-fade-in {
    animation: none;
  }
}
</style>
