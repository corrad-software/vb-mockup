<script setup>
import { useUserStore } from "~/stores/user";
import { RecaptchaV2 } from "vue3-recaptcha-v2";

definePageMeta({
  title: "Login",
  layout: "empty",
  middleware: ["dashboard"],
});

const { siteSettings } = useSiteSettings();

const { $swal } = useNuxtApp();

// Computed property for logo with fallback
const logoUrl = computed(() => {
  return siteSettings.value?.siteLoginLogo || siteSettings.value?.siteLogo || 'https://www.agc.gov.my/portalassets/img/toplogo-Malay.png'
})
const username = ref("");
const password = ref("");
const userStore = useUserStore();

const togglePasswordVisibility = ref(false);

const login = async () => {
  try {
    const res = await useFetch("/api/auth/login", {
      method: "POST",
      initialCache: false,
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = res.data.value;

    console.log("Login response: ", res.data.value);

    if (data.statusCode === 200) {
      // Save token to pinia store
      userStore.setUsername(data.data.username);
      userStore.setRoles(data.data.roles);
      userStore.setIsAuthenticated(true);
      userStore.setAccessToken(data.accessToken);
      userStore.setRefreshToken(data.refreshToken);

      $swal.fire({
        position: "center",
        title: "Success",
        text: "Login Success",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      window.location.href = "/dashboard";
    } else {
      $swal.fire({
        title: "Error!",
        text: data.message,
        icon: "error",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const handleWidgetId = (widgetId) => {
  console.log("Widget ID: ", widgetId);
};
const handleErrorCalback = () => {
  console.log("Error callback");
};
const handleExpiredCallback = () => {
  console.log("Expired callback");
};
const handleLoadCallback = (response) => {
  console.log("Load callback", response);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-3 py-4 sm:px-4">
    <div class="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden min-h-[600px] flex flex-col lg:flex-row">
      <!-- Left Column - Login Form -->
      <div class="flex-1 flex flex-col justify-center p-4 sm:p-6 lg:p-8">
        <div class="max-w-md mx-auto w-full">
            <!-- Logo -->
            <div class="text-center mb-6">
              <img
                :src="logoUrl"
                :alt="siteSettings.siteName || 'Login'"
                class="max-w-[200px] max-h-[50px] object-contain mx-auto"
              />
            </div>
            
            <!-- Heading -->
            <div class="text-center mb-6">
              <h1 class="text-xl font-bold text-gray-900 dark:text-white mb-1">Selamat Kembali</h1>
              <p class="text-sm text-gray-600 dark:text-gray-300">Log masuk ke akaun anda</p>
            </div>
            
            <!-- Form Fields -->
            <div class="space-y-3">
              <!-- Email Field -->
              <div>
                <label class="block text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">ID Pengguna</label>
                <input
                  v-model="username"
                  type="text"
                  placeholder="Masukkan ID Pengguna"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  required
                />
              </div>

              <!-- Password Field -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="block text-xs font-medium text-gray-900 dark:text-gray-100">Kata Laluan</label>
                  <NuxtLink
                    class="text-xs text-primary hover:underline"
                    to="forgot-password"
                  >
                    Lupa Kata Laluan?
                  </NuxtLink>
                </div>
                <div class="relative">
                  <input
                    v-model="password"
                    :type="togglePasswordVisibility ? 'text' : 'password'"
                    placeholder="Masukkan Kata Laluan"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10 text-sm"
                    required
                  />
                  <button
                    type="button"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center h-8"
                    @click="togglePasswordVisibility = !togglePasswordVisibility"
                  >
                    <Icon
                      v-if="!togglePasswordVisibility"
                      name="ion:eye-outline"
                      class="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    ></Icon>
                    <Icon 
                      v-else 
                      name="ion:eye-off-outline" 
                      class="w-4 h-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                    ></Icon>
                  </button>
                </div>
              </div>
            </div>
            
            <!-- reCAPTCHA -->
            <div class="my-4">
              <RecaptchaV2
                @widget-id="handleWidgetId"
                @error-callback="handleErrorCalback"
                @expired-callback="handleExpiredCallback"
                @load-callback="handleLoadCallback"
              />
            </div>

            <!-- Login Button -->
            <button
              @click="login"
              class="w-full bg-primary text-white py-2 px-3 rounded-md font-medium hover:bg-primary/90 transition-colors duration-200 text-sm h-8"
            >
              Log Masuk
            </button>

            <!-- Divider -->
            <div class="flex items-center my-4">
              <hr class="flex-1 border-gray-300 dark:border-gray-600" />
              <span class="px-3 text-xs text-gray-500 dark:text-gray-400">Atau teruskan dengan</span>
              <hr class="flex-1 border-gray-300 dark:border-gray-600" />
            </div>

            <!-- Social Login Buttons -->
            <div class="grid grid-cols-3 gap-2 mb-4">
              <button class="flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors h-8">
                <Icon name="ph:apple-logo" class="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
              <button class="flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors h-8">
                <Icon name="ph:google-logo" class="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
              <button class="flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors h-8">
                <Icon name="ph:facebook-logo" class="w-4 h-4 text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            <!-- Register Link -->
            <div class="text-center">
              <p class="text-xs text-gray-600 dark:text-gray-300">
                Tiada akaun? 
                <NuxtLink to="/register" class="text-primary hover:underline font-medium">
                  Daftar / Log masuk kali pertama
                </NuxtLink>
              </p>
            </div>
          </div>
        </div>

      <!-- Right Column - Illustration Area -->
      <div class="hidden lg:flex flex-1 bg-gray-50 dark:bg-gray-700 items-center justify-center p-8">
        <div class="text-center">
          <!-- Abstract Graphic -->
          <div class="relative w-24 h-24 mx-auto mb-3">
            <!-- Central Circle -->
            <div class="absolute inset-0 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center">
              <Icon name="ph:camera" class="w-6 h-6 text-gray-400 dark:text-gray-500" />
            </div>
            <!-- Radiating Lines -->
            <div class="absolute inset-0">
              <div class="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 dark:bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-0"></div>
              <div class="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 dark:bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
              <div class="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 dark:bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-90"></div>
              <div class="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 dark:bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-135"></div>
              <div class="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 dark:bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-180"></div>
              <div class="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 dark:bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-225"></div>
              <div class="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 dark:bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-270"></div>
              <div class="absolute top-1/2 left-1/2 w-12 h-px bg-gray-300 dark:bg-gray-500 transform -translate-x-1/2 -translate-y-1/2 rotate-315"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <p class="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center max-w-md">
      Dengan mengklik teruskan, anda bersetuju dengan
      <a href="#" class="text-primary hover:underline">Terma Perkhidmatan</a>
      dan
      <a href="#" class="text-primary hover:underline">Dasar Privasi</a>
    </p>
  </div>
</template>
