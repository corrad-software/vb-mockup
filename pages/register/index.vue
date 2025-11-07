<script setup>
import { ref } from "vue";
import { RecaptchaV2 } from "vue3-recaptcha-v2";
import { useSiteSettings } from "@/composables/useSiteSettings";

const { siteSettings, loading: siteSettingsLoading } = useSiteSettings();

definePageMeta({
  title: "Register",
  layout: "empty",
  middleware: ["dashboard"],
});

const formData = ref({
  fullName: "",
  idNumber: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  email: "",
  confirmEmail: "",
  subscribeNewsletter: false,
  agreeTerms: false,
});

const register = () => {
  // Simulate registration without API call
  console.log("Registration attempted with:", formData.value);
  // Add your registration logic here
};

const handleRecaptcha = (response) => {
  console.log("reCAPTCHA response:", response);
};

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
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center px-3 py-4 sm:px-4">
    <div class="w-full max-w-2xl">
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
          <h2 class="mt-3 text-xl font-bold text-gray-700 dark:text-gray-300">Daftar Akaun</h2>
          <p class="text-xs text-gray-500 dark:text-gray-400">Semua medan adalah wajib</p>
        </div>

        <FormKit type="form" :actions="false" @submit="register">
          <FormKit
            type="text"
            name="fullName"
            placeholder="Nama Penuh"
            validation="required"
            :validation-messages="{
              required: 'Nama Penuh wajib diisi',
            }"
          >
            <template #prefixIcon>
              <Icon
                name="ph:user-fill"
                class="!w-4 !h-4 ml-3 text-gray-500"
              ></Icon>
            </template>
          </FormKit>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormKit
              type="text"
              name="idNumber"
              placeholder="Nombor Mykad / Nombor Pasport"
              validation="required"
              :validation-messages="{
                required: 'Nombor Mykad / Nombor Pasport wajib diisi',
              }"
            >
              <template #prefixIcon>
                <Icon
                  name="ph:identification-card-fill"
                  class="!w-4 !h-4 ml-3 text-gray-500"
                ></Icon>
              </template>
            </FormKit>
            <FormKit
              type="tel"
              name="phoneNumber"
              placeholder="Nombor Telefon"
              validation="required"
              :validation-messages="{
                required: 'Nombor Telefon wajib diisi',
              }"
            >
              <template #prefixIcon>
                <Icon
                  name="ph:device-mobile-camera-fill"
                  class="!w-4 !h-4 ml-3 text-gray-500"
                ></Icon>
              </template>
            </FormKit>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormKit
              type="password"
              name="password"
              placeholder="Kata Laluan"
              validation="required"
              :validation-messages="{
                required: 'Kata Laluan wajib diisi',
              }"
            >
              <template #prefixIcon>
                <Icon
                  name="ph:lock-key-fill"
                  class="!w-4 !h-4 ml-3 text-gray-500"
                ></Icon>
              </template>
            </FormKit>
            <FormKit
              type="password"
              name="confirmPassword"
              placeholder="Pengesahan Kata Laluan"
              validation="required|confirm"
              :validation-messages="{
                required: 'Pengesahan Kata Laluan wajib diisi',
                confirm: 'Kata Laluan tidak sepadan',
              }"
              :validation-rules="{
                confirm: (value) => value === value.password,
              }"
            >
              <template #prefixIcon>
                <Icon
                  name="ph:lock-key-fill"
                  class="!w-4 !h-4 ml-3 text-gray-500"
                ></Icon>
              </template>
            </FormKit>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <FormKit
              type="email"
              name="email"
              placeholder="Emel"
              validation="required|email"
              :validation-messages="{
                required: 'Emel wajib diisi',
                email: 'Format emel tidak sah',
              }"
            >
              <template #prefixIcon>
                <Icon
                  name="ph:envelope-fill"
                  class="!w-4 !h-4 ml-3 text-gray-500"
                ></Icon>
              </template>
            </FormKit>
            <FormKit
              type="email"
              name="confirmEmail"
              placeholder="Pengesahan Emel"
              validation="required|confirm"
              :validation-messages="{
                required: 'Pengesahan Emel wajib diisi',
                confirm: 'Emel tidak sepadan',
              }"
              :validation-rules="{
                confirm: (value) => value === value.email,
              }"
            >
              <template #prefixIcon>
                <Icon
                  name="ph:envelope-fill"
                  class="!w-4 !h-4 ml-3 text-gray-500"
                ></Icon>
              </template>
            </FormKit>
          </div>

          <div class="flex justify-start mb-3 mt-1">
            <RecaptchaV2 @verify="handleRecaptcha" />
          </div>

          <FormKit
            type="checkbox"
            name="subscribeNewsletter"
            label="Melanggan ke newsletter bulanan"
          />

          <FormKit
            type="checkbox"
            name="agreeTerms"
            label="Setuju dengan terma perkhidmatan"
            validation="accepted"
            :validation-messages="{
              accepted: 'Anda mesti bersetuju dengan terma perkhidmatan',
            }"
          >
            <template #label>
              Setuju dengan
              <a href="#" class="text-primary ml-1">terma perkhidmatan</a>
            </template>
          </FormKit>

          <rs-button btn-type="submit" class="w-full h-8 text-sm"> Daftar Akaun </rs-button>
        </FormKit>

        <div class="text-center mt-3">
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Sudah mempunyai akaun?
            <nuxt-link to="/login" class="text-primary">Log Masuk</nuxt-link>
          </p>
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
