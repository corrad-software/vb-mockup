<script setup>
const { siteSettings, loadSiteSettings } = useSiteSettings();

// Use site settings for global meta
useHead({
  title: () => siteSettings?.value?.siteName || 'NAS',
  meta: [
    { name: 'description', content: () => siteSettings?.value?.siteDescription || 'NAS Base Project' },
    { property: 'og:title', content: () => siteSettings?.value?.siteName || 'NAS' },
    { property: 'og:description', content: () => siteSettings?.value?.siteDescription || 'NAS Base Project' },
    { name: 'twitter:title', content: () => siteSettings?.value?.siteName || 'NAS' },
    { name: 'twitter:description', content: () => siteSettings?.value?.siteDescription || 'NAS Base Project' },
  ],
  link: [
    { rel: 'icon', href: () => siteSettings?.value?.siteFavicon || '/favicon.ico' },
    { rel: 'apple-touch-icon', href: () => siteSettings?.value?.siteFavicon || '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: "en",
  },
});

const nuxtApp = useNuxtApp();
const loading = ref(true);

onMounted(async () => {
  // Load site settings first
  await loadSiteSettings();
  
  // Hide loading indicator if not hydrating
  setTimeout(() => {
    loading.value = false;
  }, 1000);

  // Get theme from localStorage or site settings
  let theme = localStorage.getItem("theme") || siteSettings?.value?.selectedTheme || "biasa";
  document.documentElement.setAttribute("data-theme", theme);
});
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <Loading v-if="loading" />
      <NuxtPage v-else :key="$route.fullPath" />
    </NuxtLayout>
  </div>
</template>

<style>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}

/* Hide vertical scrollbar on all iframes while preserving scroll behavior */
iframe {
  width: 100%;
  height: 100vh;
  display: block;
  border: none;
  -ms-overflow-style: none; /* IE & Edge */
  scrollbar-width: none; /* Firefox */
}

iframe::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}
</style>
