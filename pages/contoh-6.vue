<script setup>
definePageMeta({
  layout: "empty",
  title: "Portal Perkhidmatan Undang-Undang",
});

const services = [
  {
    id: 1,
    title: "Kertas Siasatan",
    subtitle: "Pendaftaran Kertas Siasatan",
    description: "Pendaftaran kertas Siasatan bagi agensi kerajaan",
    icon: "mdi:file-document-edit-outline",
    bgColor: "bg-gradient-to-br from-[#2563eb] to-[#1e40af]",
    link: "/kertas-siasatan",
  },
  {
    id: 2,
    title: "Perakuan Sijil Pengecualian",
    subtitle: "Permohonan Sijil",
    description: "Permohonan pengecualian di bawah seksyen 13(4) Akta Profesion Undang-Undang 1976 (Akta 166)",
    icon: "mdi:certificate-outline",
    bgColor: "bg-gradient-to-br from-[#0891b2] to-[#0e7490]",
    link: "/perakuan-sijil",
  },
  {
    id: 3,
    title: "Penerimaan Masuk Sebagai PB/PC",
    subtitle: "Perkhidmatan Penerimaan",
    description: "Perkhidmatan dalam talian kertas kausa kepada Peguam Negara bagi maksud diterima masuk sebagai Peguam Bela dan Peguam Cara",
    icon: "mdi:account-check-outline",
    bgColor: "bg-gradient-to-br from-[#059669] to-[#047857]",
    link: "/penerimaan-masuk",
  },
  {
    id: 4,
    title: "Notari Awam",
    subtitle: "Permohonan Notari",
    description: "Permohonan dalam talian untuk Notari Awam",
    icon: "mdi:gavel",
    bgColor: "bg-gradient-to-br from-[#7c3aed] to-[#6d28d9]",
    link: "/notari-awam",
  },
  {
    id: 5,
    title: "Amanah Khairat Awam",
    subtitle: "Permohonan Kebenaran",
    description: "Permohonan kebenaran Peguam Negara dibawah seksyen 9 Akta Perbadanan Kerajaan 1965 (Akta 350) bagi Amanah Khairat awam boleh dibuat melalui dalam talian",
    icon: "mdi:hand-heart-outline",
    bgColor: "bg-gradient-to-br from-[#dc2626] to-[#b91c1c]",
    link: "/amanah-khairat",
  },
  {
    id: 6,
    title: "eTrans (Sistem Pembayaran Dalam Talian)",
    subtitle: "Sistem Pembayaran",
    description: "Sistem pembayaran secara dalam talian yang disediakan untuk pelanggan, pegawai dan kakitangan Jabatan Peguam Negara",
    icon: "mdi:credit-card-outline",
    bgColor: "bg-gradient-to-br from-[#ea580c] to-[#c2410c]",
    link: "/etrans",
  },
];

const hoveredCard = ref(null);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
    <!-- Decorative Background Graphics -->
    <!-- Top Right: Malaysian Motif Pattern -->
    <div class="absolute top-0 right-0 w-96 h-96 opacity-[0.05] pointer-events-none">
      <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Traditional Malaysian Geometric Pattern -->
        <pattern id="malayPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M50 0L100 50L50 100L0 50Z" fill="#2563eb"/>
          <circle cx="50" cy="50" r="20" fill="#0891b2"/>
          <path d="M50 30L60 50L50 70L40 50Z" fill="#f8f9fa"/>
        </pattern>
        <rect width="400" height="400" fill="url(#malayPattern)"/>
      </svg>
    </div>

    <!-- Bottom Left: Justice Scale Watermark -->
    <div class="absolute bottom-0 left-0 w-72 h-72 opacity-[0.04] pointer-events-none">
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Stylized Justice Scale -->
        <path d="M100 30L100 150M100 150L70 160M100 150L130 160" stroke="#2563eb" stroke-width="3"/>
        <circle cx="100" cy="30" r="8" fill="#0891b2"/>
        <path d="M50 80L70 100L90 80M110 80L130 100L150 80" stroke="#2563eb" stroke-width="2"/>
        <line x1="50" y1="100" x2="90" y2="100" stroke="#2563eb" stroke-width="2"/>
        <line x1="110" y1="100" x2="150" y2="100" stroke="#2563eb" stroke-width="2"/>
      </svg>
    </div>

    <!-- Top Left: Document Icon -->
    <div class="absolute top-20 left-10 w-20 h-20 opacity-[0.06] pointer-events-none">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="10" width="60" height="80" rx="5" fill="#059669"/>
        <line x1="30" y1="30" x2="70" y2="30" stroke="#f8f9fa" stroke-width="2"/>
        <line x1="30" y1="45" x2="70" y2="45" stroke="#f8f9fa" stroke-width="2"/>
        <line x1="30" y1="60" x2="70" y2="60" stroke="#f8f9fa" stroke-width="2"/>
      </svg>
    </div>

    <div class="relative z-10">
      <!-- Header Section with Hero Background -->
      <header class="relative pt-10 pb-8 px-4 bg-gradient-to-br from-[#1e40af] via-[#1d4ed8] to-[#2563eb] overflow-hidden">
        <!-- Decorative Header Graphics -->
        <div class="absolute inset-0 opacity-10">
          <svg class="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 300" fill="none">
            <!-- Decorative Lines -->
            <path d="M0 150Q300 100 600 150T1200 150" stroke="#ffffff" stroke-width="2" opacity="0.4"/>
            <path d="M0 180Q300 130 600 180T1200 180" stroke="#ffffff" stroke-width="2" opacity="0.3"/>
            <!-- Small Stars -->
            <circle cx="150" cy="80" r="2" fill="#ffffff"/>
            <circle cx="400" cy="120" r="2" fill="#ffffff"/>
            <circle cx="800" cy="90" r="2" fill="#ffffff"/>
            <circle cx="1000" cy="140" r="2" fill="#ffffff"/>
          </svg>
        </div>

        <div class="max-w-7xl mx-auto relative">
          <div class="flex flex-col items-center text-center space-y-5">
            <!-- Logo with Malaysian Flag Colors Accent -->
            <div class="relative">
              <div class="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-lg relative z-10 ring-2 ring-blue-100">
                <Icon name="mdi:scale-balance" class="w-11 h-11 text-[#1e40af]" />
              </div>
              <!-- Malaysian Colors Accent -->
              <div class="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-[#dc2626] via-[#ef4444] to-[#2563eb] border-2 border-white shadow-md"></div>
            </div>

            <!-- Title with Jata Negara Inspired Elements -->
            <div class="space-y-2 relative">
              <!-- Decorative Side Elements -->
              <div class="absolute -left-24 top-1/2 -translate-y-1/2 hidden lg:block">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                  <path d="M0 20L80 20M75 15L80 20L75 25" stroke="#fbbf24" stroke-width="2"/>
                </svg>
              </div>
              <div class="absolute -right-24 top-1/2 -translate-y-1/2 hidden lg:block">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
                  <path d="M0 20L80 20M5 15L0 20L5 25" stroke="#fbbf24" stroke-width="2"/>
                </svg>
              </div>

              <h1 class="text-3xl lg:text-4xl font-bold text-white tracking-normal" style="font-family: 'Inter', system-ui, sans-serif; text-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                Jabatan Peguam Negara Malaysia
              </h1>
              <div class="flex items-center justify-center gap-2">
                <div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
                <h2 class="text-base lg:text-lg font-medium text-blue-50 tracking-wide" style="font-family: 'Inter', system-ui, sans-serif;">
                  PORTAL PERKHIDMATAN UNDANG-UNDANG
                </h2>
                <div class="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
              </div>
            </div>
          </div>

          <!-- Important Notice -->
          <div class="max-w-4xl mx-auto mt-8">
            <div class="bg-white/95 backdrop-blur-sm border-l-4 border-amber-500 rounded-r-lg p-4 shadow-lg">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="mdi:information" class="w-5 h-5 text-amber-600" />
                </div>
                <div class="text-left space-y-1 flex-1">
                  <p class="text-sm font-semibold text-gray-900">PENGUMUMAN PENTING</p>
                  <p class="text-sm text-gray-700 leading-relaxed">
                    Sekiranya aduan atau masalah mengenai eServices hendaklah diajukan ke alamat e-mel
                    <a href="mailto:aplikasi@agc.gov.my" class="font-semibold text-blue-700 underline hover:text-blue-800">aplikasi@agc.gov.my</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Decorative Divider -->
      <div class="h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 shadow-sm"></div>

      <!-- Services Grid -->
      <main class="px-4 py-12 relative">
        <!-- Side Decorative Elements -->
        <div class="absolute right-4 top-40 w-16 h-16 opacity-[0.05] pointer-events-none hidden xl:block">
          <svg viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="#2563eb" stroke-width="2"/>
            <path d="M50 10L90 50L50 90L10 50Z" fill="#0891b2"/>
          </svg>
        </div>

        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="service in services"
              :key="service.id"
              class="group"
              @mouseenter="hoveredCard = service.id"
              @mouseleave="hoveredCard = null"
            >
              <!-- Card -->
              <div
                class="relative h-full bg-white rounded-lg border-2 border-gray-100 hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col"
                :class="hoveredCard === service.id ? 'shadow-xl -translate-y-1' : 'shadow-md'"
              >
                <!-- Header with Icon and Corner Accent -->
                <div
                  class="relative h-28 p-5 flex items-center justify-center overflow-hidden"
                  :class="service.bgColor"
                >
                  <!-- Corner Accent -->
                  <div class="absolute top-0 right-0 w-16 h-16">
                    <svg viewBox="0 0 100 100" class="w-full h-full">
                      <path d="M100 0L100 100L0 0Z" fill="#ffffff" opacity="0.1"/>
                    </svg>
                  </div>

                  <!-- Icon -->
                  <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border-2 border-white/30 relative z-10 shadow-lg">
                    <Icon :name="service.icon" class="w-9 h-9 text-white" />
                  </div>

                  <!-- Decorative Bottom Border -->
                  <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                </div>

                <!-- Content -->
                <div class="flex-1 p-5 flex flex-col">
                  <div class="flex-1 space-y-2 mb-4">
                    <h3 class="text-base font-bold text-gray-900 leading-snug" style="font-family: 'Inter', system-ui, sans-serif;">
                      {{ service.title }}
                    </h3>
                    <p class="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      {{ service.subtitle }}
                    </p>
                    <p class="text-sm text-gray-600 leading-relaxed">
                      {{ service.description }}
                    </p>
                  </div>

                  <!-- Action Buttons - Aligned to Bottom -->
                  <div class="flex gap-2 mt-auto">
                    <button
                      class="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xs font-bold uppercase tracking-wide rounded-lg transition-all duration-200 shadow-md hover:shadow-lg relative overflow-hidden group/btn"
                      @click="$router.push(service.link)"
                    >
                      <span class="relative z-10">SELANJUTNYA →</span>
                      <!-- Hover Effect -->
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                    </button>
                    <button
                      class="px-4 py-2.5 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-blue-50 hover:to-cyan-50 border-2 border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 text-xs font-bold uppercase tracking-wide rounded-lg transition-all duration-200"
                    >
                      INFO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer class="pb-8 px-4 mt-8">
        <div class="max-w-7xl mx-auto">
          <!-- Decorative Top Border -->
          <div class="h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent mb-6 rounded-full"></div>

          <div class="bg-white rounded-lg border-2 border-gray-100 p-6 shadow-md relative overflow-hidden">
            <!-- Corner Decoration -->
            <div class="absolute bottom-0 left-0 w-32 h-32 opacity-[0.04]">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="0" cy="100" r="80" fill="#2563eb"/>
              </svg>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm relative z-10">
              <!-- Address -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                  <h4 class="font-bold text-gray-900 text-base" style="font-family: 'Inter', system-ui, sans-serif;">
                    Jabatan Peguam Negara
                  </h4>
                </div>
                <p class="text-gray-700 leading-relaxed pl-3">
                  No. 45, Persiaran Perdana<br />
                  Precint 4, 62100 Putrajaya<br />
                  W.P Putrajaya, Malaysia
                </p>
              </div>

              <!-- Contact -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  <h4 class="font-bold text-gray-900 text-base" style="font-family: 'Inter', system-ui, sans-serif;">
                    Hubungi Kami
                  </h4>
                </div>
                <div class="space-y-1 text-gray-700 pl-3">
                  <p>Tel: +603-8000 8000</p>
                  <p>Faks: +603-8888 9000</p>
                  <p>Email: info@agc.gov.my</p>
                </div>
              </div>

              <!-- Support -->
              <div class="space-y-2">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                  <h4 class="font-bold text-gray-900 text-base" style="font-family: 'Inter', system-ui, sans-serif;">
                    Bantuan & Sokongan
                  </h4>
                </div>
                <div class="space-y-2 pl-3">
                  <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold transition-colors block">
                    → Panduan Pengguna
                  </a>
                  <a href="#" class="text-blue-600 hover:text-blue-700 font-semibold transition-colors block">
                    → Soalan Lazim
                  </a>
                </div>
              </div>
            </div>

            <!-- Copyright -->
            <div class="mt-6 pt-6 border-t-2 border-gray-100 text-center text-xs text-gray-600 relative z-10">
              <p>© 2025 Jabatan Peguam Negara Malaysia. Hak Cipta Terpelihara.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
</style>
