<script setup>
import Menu from "~/navigation/index.js";
import RSItem from "~/components/layouts/sidemenu/Item.vue";

const { siteSettings } = useSiteSettings()

const props = defineProps({
  menuItem: {
    type: Array,
    default: () => Menu,
    required: false,
  },
  sidebarToggle: {
    type: Boolean,
    default: false,
  },
});

// Computed property for logo with fallback
const logoUrl = computed(() => {
  return siteSettings.value?.siteLogo || 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png'
})

onMounted(() => {
  try {
    const el = document.querySelector(".active-menu").closest(".menu-content");
    const elParent = el.parentElement.parentElement;

    if (elParent) {
      elParent.classList.remove("hide");
      elParent.querySelector("a").classList.add("nav-open");
    }
    if (el) el.classList.remove("hide");
  } catch (e) {
    // console.log(e);
    return;
  }
});
</script>

<template>
  <div class="vertical-menu w-[256px] border-r border-gray-200 dark:border-gray-700 overflow-hidden bg-[rgb(var(--bg-2))] fixed top-0 bottom-0 z-50">
    <!-- Sidebar Header -->
    <div class="px-3 py-3 border-b border-gray-200 dark:border-gray-700 h-[57px] flex items-center justify-center">
      <div class="w-full flex items-center justify-center">
        <img
          :src="logoUrl"
          class="h-9 w-auto object-contain"
          :alt="siteSettings.siteName || 'Logo'"
        />
      </div>
    </div>

    <!-- Navigation Menu -->
    <div
      class="menu-scrollbar flex-1 py-1.5 overflow-y-auto overflow-x-hidden"
      tabindex="0"
      style="height: calc(100vh - 57px)"
    >
      <RSItem :items="menuItem"></RSItem>
    </div>
  </div>
</template>

<style scoped>
.menu-scrollbar {
  scrollbar-width: none;
}

.menu-scrollbar:hover,
.menu-scrollbar:focus {
  scrollbar-width: thin;
}

:deep(.menu-scrollbar::-webkit-scrollbar) {
  width: 0;
  height: 0;
}

:deep(.menu-scrollbar:hover::-webkit-scrollbar),
:deep(.menu-scrollbar:focus::-webkit-scrollbar) {
  width: 6px;
  height: 6px;
}

:deep(.menu-scrollbar::-webkit-scrollbar-track) {
  background: transparent;
}

:deep(.menu-scrollbar::-webkit-scrollbar-thumb) {
  background-color: rgba(209, 213, 219, 0.9); /* light gray */
  border-radius: 9999px;
}
</style>
