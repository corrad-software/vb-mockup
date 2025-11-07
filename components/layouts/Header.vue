<script setup>
const isVertical = ref(true);
const isDesktop = ref(true);

const emit = defineEmits(["toggleMenu"]);

// Use site settings composable
const { siteSettings, setTheme, getCurrentTheme } = useSiteSettings();

// const { locale } = useI18n();
// const colorMode = useColorMode();
const langList = languageList();

const locale = ref("en");

const themes = themeList();
const themes2 = themeList2();

function setThemeLocal(theme) {
  setTheme(theme); // Use the site settings setTheme function
}

function rgbToHex(rgbString) {
  // Split the input string into an array of components
  const rgbArray = rgbString.split(",");

  // Convert each component to its numeric value
  const r = parseInt(rgbArray[0].trim(), 10);
  const g = parseInt(rgbArray[1].trim(), 10);
  const b = parseInt(rgbArray[2].trim(), 10);

  // Convert the numeric RGB values to hexadecimal
  const rHex = r.toString(16).padStart(2, "0");
  const gHex = g.toString(16).padStart(2, "0");
  const bHex = b.toString(16).padStart(2, "0");

  // Concatenate the components and return the final hexadecimal color code
  return `#${rHex}${gHex}${bHex}`;
}

// Toggle Open/Close menu
const toggleMenu = (event) => {
  emit("toggleMenu", event);
};

// Change language
const changeLanguage = (lang) => {
  locale.value = lang;
};

const languageNow = computed(() => {
  return langList.find((lang) => lang.value == locale.value);
});

// Get current theme icon
const currentThemeIcon = computed(() => {
  const theme = getCurrentTheme();
  return theme === "dark" ? "ic:outline-dark-mode" : "ic:outline-light-mode";
});

onMounted(() => {
  // If mobile toggleMenu
  if (window.innerWidth < 768) {
    emit("toggleMenu", true);
  }

  // Load site settings on mount and ensure they're properly populated
  const { loadSiteSettings } = useSiteSettings();
  loadSiteSettings().then(() => {
    nextTick(() => {
      console.log(
        "[Header.vue] Site settings loaded. Name:",
        siteSettings.value?.siteName,
        "ShowInHeader:",
        siteSettings.value?.showSiteNameInHeader,
        "Logo:",
        siteSettings.value?.siteLogo
      );
    });
  });
});

// Add computed to ensure logo reactivity
const currentLogo = computed(() => {
  const logoUrl = siteSettings.value?.siteLogo;
  if (logoUrl && logoUrl.trim() !== "") {
    return logoUrl; // Use logo from settings if available and not empty
  }
  return "/img/logo/NAS-logo.svg"; // Ultimate fallback
});
</script>

<template>
  <div class="w-header border-b border-gray-200 dark:border-gray-700 px-3 py-3 bg-[rgb(var(--bg-2))] fixed top-0 z-40">
    <div class="flex items-center justify-end gap-2 w-full">
      <!-- Menu Toggle Button (Mobile Only) -->
      <button 
        @click="toggleMenu"
        class="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden mr-auto"
      >
        <Icon name="ic:round-menu" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>

      <!-- Voice Reader -->
      <VoiceReader class="mr-1 hidden lg:block" />

      <!-- Theme Selector -->
      <VDropdown placement="bottom-end" distance="8" name="theme">
        <button class="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Icon name="ph:paint-brush-broad" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        <template #popper>
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 min-w-44">
            <div class="text-xs font-medium text-gray-900 dark:text-white px-2 py-1.5 border-b border-gray-200 dark:border-gray-700">
              Theme Colors
            </div>
            <div class="py-0.5">
              <button
                v-for="(val, index) in themes"
                :key="index"
                @click="setThemeLocal(val.theme)"
                class="w-full flex justify-between items-center px-2 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span class="capitalize text-gray-700 dark:text-gray-300">{{ val.theme }}</span>
                <div class="flex items-center gap-0.5">
                  <div
                    v-for="(color, colorIndex) in val.colors"
                    :key="colorIndex"
                    class="h-3 w-2.5 rounded-sm"
                    :style="{
                      backgroundColor: rgbToHex(color.value),
                    }"
                  ></div>
                </div>
              </button>
            </div>
          </div>
        </template>
      </VDropdown>

      <!-- Accessibility Theme -->
      <VDropdown placement="bottom-end" distance="8" name="theme2">
        <button class="flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Icon name="ph:wheelchair" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        <template #popper>
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 min-w-44">
            <div class="text-xs font-medium text-gray-900 dark:text-white px-2 py-1.5 border-b border-gray-200 dark:border-gray-700">
              Accessibility Themes
            </div>
            <div class="py-0.5">
              <button
                v-for="(val, index) in themes2"
                :key="index"
                @click="setThemeLocal(val.theme)"
                class="w-full flex justify-between items-center px-2 py-1.5 text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span class="capitalize text-gray-700 dark:text-gray-300">{{ val.theme }}</span>
                <div class="flex items-center gap-0.5">
                  <div
                    v-for="(color, colorIndex) in val.colors"
                    :key="colorIndex"
                    class="h-3 w-2.5 rounded-sm"
                    :style="{
                      backgroundColor: rgbToHex(color.value),
                    }"
                  ></div>
                </div>
              </button>
            </div>
          </div>
        </template>
      </VDropdown>

      <!-- Notifications -->
      <VDropdown placement="bottom-end" distance="8" name="notification">
        <button class="relative flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <Icon name="ic:round-notifications-none" class="w-4 h-4 text-gray-600 dark:text-gray-300" />
          <span class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <template #popper>
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg w-72">
            <div class="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700">
              <span class="font-semibold text-sm text-gray-900 dark:text-white">Notifikasi</span>
              <button
                @click="navigateTo('/pengurusan-bantuan/program/senarai-notifikasi')"
                class="text-xs text-primary hover:underline"
              >
                Lihat Semua
              </button>
            </div>
            <div class="max-h-56 overflow-y-auto">
              <div class="px-3 py-1.5 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
                Hari Ini
              </div>
              <div class="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                <a
                  href="https://bp.corrad.ai/workflow/acaa8fcf-ecdc-46cf-836b-1f1318e7e69e"
                  target="_blank"
                  class="text-xs text-gray-700 dark:text-gray-300 hover:text-primary line-clamp-2"
                >
                  Jemputan Program Sumbangan DYMM 2025
                </a>
              </div>
              <div class="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                <a class="text-xs text-gray-700 dark:text-gray-300 hover:text-primary line-clamp-2">
                  Permohonan Tuntutan TN-2025-00023 Telah Diluluskan
                </a>
              </div>
              <div class="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                <a class="text-xs text-gray-700 dark:text-gray-300 hover:text-primary line-clamp-2">
                  Permohonan Bantuan BTN-2025-00012 Telah Diluluskan
                </a>
              </div>
            </div>
          </div>
        </template>
      </VDropdown>

      <!-- User Profile -->
      <VDropdown placement="bottom-end" distance="8" name="profile">
        <button class="flex items-center gap-2 h-8 rounded-md px-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <img
            class="w-6 h-6 object-cover rounded-full"
            src="@/assets/img/user/default.svg"
            alt="User Avatar"
          />
          <div v-if="isDesktop" class="text-left">
            <p class="font-semibold text-xs text-gray-900 dark:text-white leading-none">Johan</p>
          </div>
          <Icon name="ic:outline-keyboard-arrow-down" class="w-3 h-3 text-gray-600 dark:text-gray-300" />
        </button>
        <template #popper>
          <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg py-1 min-w-40">
            <button
              @click="navigateTo('/system-settings')"
              class="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Icon name="ic:outline-settings" class="w-3.5 h-3.5" />
              Tetapan Sistem
            </button>
            <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <button
              @click="navigateTo('/logout')"
              class="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Icon name="ic:outline-logout" class="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </template>
      </VDropdown>
    </div>
  </div>
</template>
