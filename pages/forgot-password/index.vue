<script setup>
const { siteSettings, loading: siteSettingsLoading } = useSiteSettings();

definePageMeta({
  title: "Reset Password",
  layout: "empty",
  middleware: ["dashboard"],
});

const email = ref("");

// Get login logo with fallback
const getLoginLogo = () => {
  if (siteSettingsLoading.value) {
    return '/img/logo/NAS-logo.svg';
  }
  return siteSettings.value?.siteLoginLogo || '/img/logo/NAS-logo.svg';
};

// Get site name with fallback
const getSiteName = () => {
  if (siteSettingsLoading.value) {
    return 'Login Logo';
  }
  return siteSettings.value?.siteName || 'Login Logo';
};

const changePassword = () => {
  // Simulate password change request without API call
  console.log("Password change requested for email:", email.value);
  // Add your password change logic here
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-3 py-4 sm:px-4">
    <div class="w-full max-w-lg">
      <rs-card class="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mb-0">
        <div class="text-center mb-6">
          <div class="img-container flex justify-center items-center mb-3">
            <img 
              :src="getLoginLogo()" 
              :alt="getSiteName()" 
              class="max-w-[120px] max-h-[40px] object-contain"
              @error="$event.target.src = '/img/logo/NAS-logo.svg'"
            />
          </div>
          <h2 class="mt-3 text-xl font-bold text-gray-700 dark:text-gray-300">
            Tukar kata laluan
          </h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Kata laluan sementara akan dihantar ke emel anda.
          </p>
        </div>

        <FormKit type="form" :actions="false" @submit="changePassword">
          <FormKit
            type="email"
            name="email"
            placeholder="Sila masukkan emel anda"
            validation="required|email"
            :validation-messages="{
              required: 'Emel wajib diisi',
              email: 'Format emel tidak sah',
            }"
          >
            <template #prefix>
              <Icon
                name="ph:envelope"
                class="!w-4 !h-4 ml-3 text-gray-500"
              ></Icon>
            </template>
          </FormKit>
        </FormKit>

        <rs-button @click="navigateTo('reset-password')" class="w-full mt-4 h-8 text-sm">
          <Icon name="ph:lock-fill" class="mr-2 w-4 h-4" />
          Tukar kata laluan
        </rs-button>

        <div class="mt-3 text-center">
          <span class="text-xs text-gray-500 dark:text-gray-400">Kembali ke </span>
          <nuxt-link to="/login" class="text-xs text-primary">
            log masuk
          </nuxt-link>
        </div>
      </rs-card>
    </div>

    <p class="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center max-w-md">
      Dengan mengklik teruskan, anda bersetuju dengan
      <a href="#" class="text-primary hover:underline">Terma Perkhidmatan</a>
      dan
      <a href="#" class="text-primary hover:underline">Dasar Privasi</a>
    </p>
  </div>
</template>

<style scoped>
/* Add any additional component-specific styles here */
</style>
