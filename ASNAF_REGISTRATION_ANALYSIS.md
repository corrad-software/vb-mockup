# Asnaf Self-Registration Form - Complete Field Analysis & Redesign Plan

## Document Purpose
This document captures ALL fields from the original form at https://lzs-nine.vercel.app/BF-PRF/AS/FR-S/02 and provides a complete redesign plan for http://localhost:3000/mockup-asnaf-profiling

**Status:** IN PROGRESS - Field capture phase
**Last Updated:** 2025-10-16
**Context:** Self-registration page for asnaf (user-facing, not admin/internal)

---

## PART 1: ORIGINAL FORM STRUCTURE (9 Steps for Applicant)

### Step 1: Maklumat Peribadi Asnaf

#### Section A: Maklumat Peribadi Asnaf (*untuk muallaf)

**I. Maklumat Peribadi**
- Jenis ID (dropdown): Kad Pengenalan, Foreign ID, Sijil Lahir
- Nombor ID (text, required)
- Nama (text, required)
- No Polis/No Tentera/No Sijil Lahir (text)
- No Passport (text)
- Tarikh mula passport (date)
- Tarikh tamat passport (date)

**Butiran Peribadi**
- Tarikh Lahir (date, format: dd-mm-yyyy)
- Agama (dropdown): Islam, Kristian, Buddha, Hindu, Sikh, Taoisme, Konfusianisme, Lain-lain
- Emel (text, required)
- No Telefon (text)
- Warganegara (dropdown): Warganegara, Bukan Warganegara
- Jantina (dropdown): Lelaki, Perempuan
- Bangsa (dropdown): Melayu, Cina, India, Lain-lain

**Maklumat Pendidikan**
- Bersekolah (dropdown): Ya, Tidak
- Pendidikan Tertinggi (dropdown): Peringkat Rendah, SRP/PMR, SPM, Sijil, Diploma, STPM, Ijazah, Lain-lain Nyatakan

**Maklumat Islam**
- Nama Selepas Islam (Muallaf) (text)
- Tarikh Masuk Islam (date, format: dd-mm-yyyy)
- Tarikh Masuk Kelas Fardu Ain Muallaf (KFAM) (date, format: dd-mm-yyyy)

**Status Perkahwinan**
- Status Perkahwinan (dropdown): Berkahwin, Bujang, Janda, Ibu Tinggal, Bapa Tinggal, Duda, Balu
- Status Poligami (dropdown): Tidak, Ya

**Maklumat Bank**
- Nama Bank (dropdown): Maybank, CIMB, RHB, Bank Islam, Bank Rakyat, Public Bank, Hong Leong Bank, Ambank, BSN, Affin Bank, UOB, OCBC, Standard Chartered, Alliance Bank, Agrobank
- No Akaun Bank (text, required)
- Nama Pemegang Akaun Bank (text, required)
- Kaedah Pembayaran (dropdown): Akaun, Tiada

### Step 2: Maklumat Kesihatan

**II. Maklumat Kesihatan**
- Tahap Kesihatan (dropdown): Sihat, Sakit Kronik, OKU, Uzur

### Step 3: Kemahiran

**III. Kemahiran**
- Kemahiran (dropdown): Nelayan, Penternakan, Pertanian, Menjahit, Kraftangan, Memasak, Mengasuh, Perkhidmatan, Pertukangan, Perniagaan, Lain-lain

### Step 4: Maklumat Kediaman
[TO BE CAPTURED - continuing navigation]

### Step 5: Maklumat Pinjaman
[TO BE CAPTURED]

### Step 6: Pemilikan Aset
[TO BE CAPTURED]

### Step 7: Maklumat Waris/Penjaga
[TO BE CAPTURED]

### Step 8: Pengesahan
[TO BE CAPTURED]

### Step 9: Pengesahan Bermastautin
[TO BE CAPTURED]

---

## PART 2: TANGGUNGAN (DEPENDENT) STRUCTURE
**Status:** NOT YET CAPTURED
- According to user: After completing 9 steps for applicant, must have "B. Maklumat Peribadi Tanggungan"
- Tanggungan has their own steps (if followed the old one)
- Number of tanggungan is dynamic based on input
- For tanggungan under 18 years old: Hide tabs for kemahiran, pemilikan aset, pinjaman harta, pekerjaan

---

## PART 3: NEXT PAGE - HAD KIFAYAH
**URL:** https://lzs-nine.vercel.app/BF-PRF/AS/FR/04
**Status:** NOT YET ANALYZED
- After completing both applicant and tanggungan registration
- Must redirect to "Analisa Data (Had Kifayah) (NAS)"

---

## PART 4: FIELD COMPARISON (Current vs Original)
**Status:** PENDING - Will be populated after capturing all original fields

| Section | Original Fields | Current Implementation | Missing Fields | Status |
|---------|----------------|----------------------|----------------|--------|
| Maklumat Peribadi | [TBD] | [TBD] | [TBD] | ❌ Not Verified |
| Kesihatan | [TBD] | [TBD] | [TBD] | ❌ Not Verified |
| Kemahiran | [TBD] | [TBD] | [TBD] | ❌ Not Verified |
| Kediaman | [TBD] | [TBD] | [TBD] | ❌ Not Verified |
| Pinjaman | [TBD] | [TBD] | [TBD] | ❌ Not Verified |
| Pemilikan | [TBD] | [TBD] | [TBD] | ❌ Not Verified |
| Waris | [TBD] | [TBD] | [TBD] | ❌ Not Verified |
| Pengesahan | [TBD] | [TBD] | [TBD] | ❌ Not Verified |

---

## PART 5: PROPOSED REDESIGN OPTIONS

### Option A: Accordion-Based Single Page
**Pros:**
- All sections visible in sidebar/overview
- Progressive disclosure - expand only what needed
- Better for long forms
- Easy to see completion status

**Cons:**
- Might feel overwhelming if all accordions open
- Requires more vertical scrolling

### Option B: Tab-Based with Subsections
**Pros:**
- Clear separation of major sections
- Less overwhelming than single page
- Can show progress per tab

**Cons:**
- Tab switching might hide context
- Harder to see overall progress

### Option C: Hybrid - Two Main Tabs with Accordions
**Pros:**
- Balance between organization and visibility
- Main tab: Applicant (with accordions for 9 sections)
- Second tab: Tanggungan (dynamic list with accordions)
- Good for self-service user experience

**Cons:**
- Slightly more complex to implement

### Option D: Wizard with Overview Sidebar
**Pros:**
- Guided experience for users
- Always-visible sidebar shows all sections
- Can click any section to jump
- Maintains sense of progress

**Cons:**
- Similar to original but improved

**RECOMMENDATION:** Option C or D - Will decide after capturing all fields and understanding tanggungan structure

---

## PART 6: CONDITIONAL LOGIC REQUIREMENTS

### Age-Based Conditions for Tanggungan
- **Under 18 years old:**
  - SHOW: Maklumat Peribadi, Pendidikan, Kesihatan
  - HIDE: Kemahiran, Pemilikan Aset, Pinjaman Harta, Pekerjaan

- **18 years and above:**
  - SHOW: All sections

### Dynamic Tanggungan Management
- Number of tanggungan forms based on input count
- Add/remove tanggungan functionality
- Each tanggungan has own set of fields (reduced version of applicant form)

---

## PART 7: NAVIGATION FLOW

```
[Applicant Registration - 9 Steps]
           ↓
[Tanggungan Registration - Dynamic]
           ↓
[Analisa Data (Had Kifayah)]
```

---

## PART 8: IMPLEMENTATION CHECKLIST

### Phase 1: Complete Field Capture ⏳ IN PROGRESS
- [x] Step 1: Maklumat Peribadi
- [x] Step 2: Kesihatan  
- [x] Step 3: Kemahiran
- [ ] Step 4: Kediaman
- [ ] Step 5: Pinjaman
- [ ] Step 6: Pemilikan
- [ ] Step 7: Waris
- [ ] Step 8: Pengesahan
- [ ] Step 9: Pengesahan Bermastautin
- [ ] Tanggungan structure and fields
- [ ] Had Kifayah page structure

### Phase 2: Field Verification
- [ ] Compare all fields with current implementation
- [ ] Document missing fields
- [ ] Document extra fields (if any)

### Phase 3: Design Decision
- [ ] Choose final layout option (A/B/C/D)
- [ ] Create detailed wireframe/structure
- [ ] Define all conditional logic rules
- [ ] Plan responsive behavior

### Phase 4: Implementation
- [ ] Create/update Vue component structure
- [ ] Implement all fields with exact names/terms
- [ ] Implement conditional logic for tanggungan age
- [ ] Implement dynamic tanggungan list
- [ ] Create Had Kifayah page
- [ ] Implement navigation flow
- [ ] Add form validation
- [ ] Test responsive design

### Phase 5: Testing & Validation
- [ ] Verify all fields present
- [ ] Test conditional logic
- [ ] Test add/remove tanggungan
- [ ] Test age calculation
- [ ] Test navigation flow to Had Kifayah
- [ ] Test on mobile/tablet/desktop

---

## NOTES FOR CONTINUATION

**Current Token Usage:** ~50k / 200k
**Strategy:** Capture all fields into this markdown, then implement in next session
**Priority:** Complete field capture before designing, to avoid assumptions

**Next Steps:**
1. Continue clicking through steps 4-9 to capture remaining applicant fields
2. Navigate to tanggungan section (if accessible)
3. Capture tanggungan field structure
4. Analyze Had Kifayah page
5. Complete field comparison table
6. Make final design decision
7. Implement complete solution


### Step 4: Maklumat Kediaman

**IV. Maklumat Kediaman/Tempat Tinggal**

**Alamat Terkini**
- Alamat 1 (textarea, required)
- Alamat 2 (textarea)
- Alamat 3 (textarea)
- Lokasi (text, required) [with "Dapatkan Lokasi" button]
- Daerah (dropdown, required): Gombak, Hulu Langat, Hulu Selangor, Klang, Kuala Langat, Kuala Selangor, Petaling, Sabak Bernam, Sepang
- Poskod (text, required)
- Kariah (dropdown): Kariah Masjid Al-Hidayah, Al-Ikhlas, Al-Muttaqin, Al-Rahman, Al-Salam, Al-Taqwa, An-Nur, Ar-Rahman, As-Salam, At-Taqwa
- Tempoh Bermastautin (Tahun) (number, required)
- Kursus Terpilih (text, readonly) [with "Pilih Kursus" button]
- Negeri (text, disabled, default: "Selangor")

**Status Kediaman**
- Status Kediaman/Tempat Tinggal (dropdown): Milik Sendiri Tidak Berbayar, Milik Sendiri Berbayar, Sewa, Kuarters Majikan, Tumpang Rumah Ibu/Bapa/Mertua, Pusaka, Sumbangan LZS/PPRT/RUSDA, Lain-lain
- Tapak Rumah (dropdown): Milik Sendiri, Tanah Wakaf, Tanah Kerajaan/Persendirian, Setinggan (Izin), Kebenaran Menduduki Sementara (TOL), Menumpang/Sewa/Pajak Daripada Orang Lain, Tanah Keluarga, Lain-lain
- Jenis Rumah (dropdown): Kos Rendah, Kos Sederhana, Pangsapuri/Flat, Teres, Lain-lain
- Binaan Rumah (dropdown): Batu, Kayu, Separa Batu, Lain-lain
- Keadaan Kediaman (dropdown): Baik/Sempurna, Uzur, Separa Uzur

**Kemudahan Asas**
- Bekalan Air (dropdown): Ada, Tiada
  - Anggaran Bil Sebulan (RM) (number)
- Bekalan Elektrik (dropdown): Ada, Tiada
  - Anggaran Bil Sebulan (RM) (number)
- Bil Penyelenggaraan (dropdown): Ada, Tiada
  - Anggaran Bil Sebulan (RM) (number)

### Step 5: Maklumat Pinjaman

**V. Maklumat Pinjaman Harta**
- Nama Institusi/Individu Pemberi Pinjaman (text)
- Jenis Pinjaman (text)
- Amaun Bayaran Bulanan (RM) (number)
- Jumlah Keseluruhan Perbelanjaan (RM) (number)
- Tahun Mula Pinjaman (date)
- Tahun Akhir Pinjaman (date)
- Upload Dokumen Pinjaman (file upload) [Format: PDF, JPG, PNG. Max: 5MB]


### Step 6: Pemilikan Aset

**VI. Maklumat Pemilikan**

**Aset Cair**
- Jumlah wang simpanan (RM) (number) [*sertakan penyata bank]
- Emas (gram) (number)
- Saham (RM) (number)

**Aset Tidak Cair**
- Kenderaan (Nyatakan Unit) (text) [Contoh: Basikal 1, Kereta 1]
- Rumah Kedai (unit) (number)
- Tanah/Sawah (ekar) (number)

### Step 7: Maklumat Waris/Penjaga

**VII. Maklumat Waris**
- [Has "Tambah Waris" button - dynamic list functionality]
- Note: Waris details not populated in current form view

### Step 8: Pengesahan

**VIII. Pengesahan**

**Bantuan Penolong Amil**
- Adakah anda dibantu oleh penolong Amil (radio): Ya, Tidak

**Hubungan dengan PAK**
- Adakah anda mempunyai hubungan dengan Penolong Amil Kariah (PAK)? (radio): Ya, Tidak

**Maklumat Perakuan Pemohon**
- Hubungan kekeluargaan dengan kakitangan LZS? (radio): Ya, Tidak

**Pengesahan PDPA (Akta Perlindungan Data Peribadi)**
- Pengesahan (radio): Setuju, Tidak Setuju
- Confirmation items:
  - Semua maklumat yang diberikan adalah benar dan tepat
  - Saya memberikan kebenaran kepada Lembaga Zakat Selangor (LZS) untuk memproses dan menyimpan data peribadi saya
  - Saya memahami bahawa data saya akan digunakan untuk tujuan pemprosesan permohonan bantuan
  - Saya bersetuju untuk menerima komunikasi berkaitan permohonan saya
  - Saya boleh menarik balik kebenaran ini pada bila-bila masa

### Step 9: Pengesahan Bermastautin

**IX. Pengesahan Bermastautin**

**Maklumat Pegawai PAK yang Mengesahkan**
- Kariah (text, disabled) [Pre-filled from previous step]
- Nama Pegawai PAK (text, disabled) [Example: "Ustaz Ahmad bin Abdullah"]

**Dokumen yang Dimuat Naik**
- File display: pengesahan_bermastautin.pdf (2.0 MB) [with "Muat Turun" button]

**Form Fields**
- Nama (text, disabled, required) [Pre-filled: "Ustaz Ahmad bin Abdullah"]
- Jawatan (text, disabled, required) [Pre-filled: "Pegawai PAK"]
- No Telefon (text, disabled, required) [Pre-filled: "012-3456789"]
- Tarikh Pengesahan (date, disabled) [Pre-filled: "15/01/2024"]
- Muat naik dokumen pengesahan bermastautin (file upload) [Format: PDF, JPG, PNG. Max: 5MB]

**Navigation Button**
- "Seterusnya ke Maklumat Peribadi Tanggungan" button appears after completing all 9 steps

---

## CRITICAL FINDING: TANGGUNGAN SECTION EXISTS

After completing all 9 steps for applicant, there is a button:
**"Seterusnya ke Maklumat Peribadi Tanggungan"**

This confirms user's statement that tanggungan section comes AFTER completing applicant registration.

---


## PART 2: TANGGUNGAN (DEPENDENT) STRUCTURE - CAPTURED ✅

**IMPORTANT:** Tanggungan section has its own 6-step form process!

Steps: Peribadi → Pendidikan Tanggungan → Kesihatan Tanggungan → Kemahiran Tanggungan → Pekerjaan Tanggungan → Penilaian

### Tanggungan Step 1: Maklumat Peribadi Tanggungan

**B. Maklumat Peribadi Tanggungan**

**I. Maklumat Peribadi Tanggungan**
- Hubungan dengan Pemohon/Asnaf (dropdown, required): Pasangan Pemohon, Isteri Kedua, Isteri Ketiga, Isteri Keempat, Ipar, Abang, Bapa, Ibu, Kakak, Adik, Anak, Cucu, Bapa Mertua, Ibu Mertua, Lain-lain Nyatakan
- Nama (text, required)
- Jenis ID (dropdown): Kad Pengenalan, Foreign ID, Sijil Lahir
- No ID (text)
- No Passport (text)
- Tarikh mula passport (date)
- Tarikh tamat passport (date)
- Jantina (dropdown): Lelaki, Perempuan
- Tarikh Lahir (date, required)
- Tempat Lahir (text, required)
- Bangsa (dropdown): Melayu, Cina, India, Lain-lain Nyatakan
- Status Perkahwinan (dropdown): Berkahwin, Bujang, Janda, Ibu Tinggal, Bapa Tinggal, Duda, Balu
- Warganegara (dropdown): Warganegara, Bukan Warganegara
- Tempoh Menetap Di Selangor (Tahun) (number)
- No Telefon/Telefon Bimbit (text)

**Maklumat Islam**
- Nama Selepas Islam (Muallaf) (text)
- Tarikh Masuk Islam (date, format: dd-mm-yyyy)
- Tarikh Masuk Kelas Fardu Ain Muallaf (KFAM) (date, format: dd-mm-yyyy)

**Maklumat Bank**
- Nama Bank (dropdown): Maybank, CIMB, RHB, Bank Islam, Bank Rakyat, Public Bank, Hong Leong Bank, Ambank, BSN, Affin Bank, UOB, OCBC, Standard Chartered, Alliance Bank, Agrobank
- No Akaun Bank (text, required)
- Nama Pemegang Akaun Bank (text, required)
- Kaedah Pembayaran (dropdown): Akaun, Tiada

**Navigation:** "Seterusnya ke Maklumat Pendidikan Tanggungan"

### Tanggungan Steps 2-6: [TO BE CAPTURED]
- Step 2: Pendidikan Tanggungan
- Step 3: Kesihatan Tanggungan  
- Step 4: Kemahiran Tanggungan
- Step 5: Pekerjaan Tanggungan
- Step 6: Penilaian

**Note:** According to user requirements:
- For tanggungan **under 18 years old**: Kemahiran, Pemilikan Aset, Pinjaman Harta, Pekerjaan tabs should be HIDDEN
- For tanggungan **18 years and above**: Show all sections

---

## SUMMARY OF FINDINGS

### Complete Flow Structure
```
┌─────────────────────────────────────────────────┐
│  APPLICANT REGISTRATION (9 Steps)              │
├─────────────────────────────────────────────────┤
│  1. Maklumat Peribadi                          │
│  2. Kesihatan                                  │
│  3. Kemahiran                                  │
│  4. Kediaman                                   │
│  5. Pinjaman                                   │
│  6. Pemilikan                                  │
│  7. Waris                                      │
│  8. Pengesahan                                 │
│  9. Pengesahan Bermastautin                    │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  TANGGUNGAN REGISTRATION (6 Steps)             │
│  [Dynamic - Based on Number of Tanggungan]     │
├─────────────────────────────────────────────────┤
│  1. Peribadi                                   │
│  2. Pendidikan Tanggungan                      │
│  3. Kesihatan Tanggungan                       │
│  4. Kemahiran Tanggungan   [Hide if < 18]     │
│  5. Pekerjaan Tanggungan   [Hide if < 18]     │
│  6. Penilaian                                  │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  ANALISA DATA (HAD KIFAYAH) (NAS)              │
│  URL: /BF-PRF/AS/FR/04                         │
└─────────────────────────────────────────────────┘
```

### Key UX Problems in Original Design

1. **Linear Progression Lock**: Must complete all 9 applicant steps before accessing tanggungan
2. **Hidden Context**: Cannot see what's coming next or what's required overall
3. **No Overview**: No bird's eye view of progress across both applicant and tanggungan
4. **Repetitive Navigation**: Clicking "Next" 15+ times (9 applicant + 6 tanggungan per dependent)
5. **Lost Context**: When filling tanggungan, cannot see applicant info for reference
6. **Mobile Unfriendly**: Stepper navigation doesn't work well on small screens

### Proposed Solution Comparison

| Aspect | Original | Option C (Recommended) | Option D (Alternative) |
|--------|----------|----------------------|----------------------|
| **Main Structure** | 15+ sequential steps | 2 tabs with accordions | Wizard with sidebar |
| **Visibility** | One step at a time | All sections visible in overview | All sections in sidebar |
| **Navigation** | Linear only | Click any section | Click sidebar or next/prev |
| **Mobile** | Poor | Good (collapsible) | Good (responsive sidebar) |
| **Complexity** | Low (simple) | Medium | Medium-High |
| **User Control** | Low | High | Medium |
| **Implementation** | N/A (existing) | Medium effort | Medium-High effort |

### Recommended Design: **Option C - Hybrid Two-Tab with Accordions**

**Why Option C:**
1. ✅ Self-service friendly - clear separation between "My Info" and "Dependents"
2. ✅ All sections visible at once - no hidden steps
3. ✅ Mobile responsive - accordions collapse naturally
4. ✅ Dynamic tanggungan list - easy add/remove
5. ✅ Age-based conditional logic - simple v-if implementation
6. ✅ Progress tracking - can see completion per section
7. ✅ Familiar pattern - users understand tabs and accordions

**Layout Structure:**
```
┌───────────────────────────────────────────────────────────────┐
│  📋 Profil Asnaf Lengkap                            [Save]    │
├───────────────────────────────────────────────────────────────┤
│  [Maklumat Pemohon]  [Tanggungan (2)]                        │
├─────────────────────────────────┬─────────────────────────────┤
│                                 │                             │
│  Main Content (70%)             │  Sticky Sidebar (30%)       │
│                                 │                             │
│  ▼ A. Maklumat Peribadi        │  📊 Ringkasan               │
│    [All personal fields...]     │  • Nama: [...]              │
│                                 │  • IC: [...]                │
│  ▼ B. Maklumat Kesihatan       │  • Tanggungan: 2            │
│    [Health fields...]           │                             │
│                                 │  ✓ Kemajuan                 │
│  ▼ C. Maklumat Kemahiran       │  ━━━━━━━━━━ 80%            │
│    [Skills fields...]           │                             │
│                                 │  ⚡ Tindakan                │
│  ▼ D. Maklumat Kediaman        │  [Simpan Draf]              │
│    [Address fields...]          │  [Hantar]                   │
│                                 │                             │
│  ... [All sections expanded]    │                             │
│                                 │                             │
└─────────────────────────────────┴─────────────────────────────┘

[On "Tanggungan" Tab:]
┌───────────────────────────────────────────────────────────────┐
│  [+ Tambah Tanggungan]                                        │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  🧑 Tanggungan 1: Ahmad bin Ali (25 tahun)        [🗑️ Padam]  │
│  ▼ Maklumat Peribadi                                         │
│    [Personal fields...]                                       │
│  ▼ Pendidikan                                                │
│    [Education fields...]                                      │
│  ▼ Kesihatan                                                 │
│    [Health fields...]                                         │
│  ▼ Kemahiran                                                 │
│    [Skills fields...]                                         │
│  ▼ Pekerjaan                                                 │
│    [Employment fields...]                                     │
│                                                               │
│  👶 Tanggungan 2: Siti binti Ali (12 tahun)       [🗑️ Padam]  │
│  ▼ Maklumat Peribadi                                         │
│    [Personal fields...]                                       │
│  ▼ Pendidikan                                                │
│    [Education fields...]                                      │
│  ▼ Kesihatan                                                 │
│    [Health fields...]                                         │
│  [Kemahiran - HIDDEN (under 18)]                            │
│  [Pekerjaan - HIDDEN (under 18)]                            │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## NEXT STEPS FOR IMPLEMENTATION

### Phase 1: Complete Field Capture ⏳ 80% DONE
- [x] Applicant Steps 1-9 (ALL captured)
- [x] Tanggungan Step 1 (Peribadi)
- [ ] Tanggungan Steps 2-6 (Pendidikan, Kesihatan, Kemahiran, Pekerjaan, Penilaian)
- [ ] Had Kifayah page structure

### Phase 2: Design Finalization
- [ ] Review Option C design with stakeholders
- [ ] Create detailed component breakdown
- [ ] Define all validation rules
- [ ] Plan responsive breakpoints

### Phase 3: Implementation
**File:** `/pages/mockup-asnaf-profiling/index.vue`

**Key Implementation Details:**
1. Two main tabs: `activeTab: 'applicant' | 'tanggungan'`
2. Applicant: 9 accordion sections (A-I)
3. Tanggungan: Dynamic array with add/remove
4. Age calculation: `watch(tanggungan.tarikhLahir)` → auto-calculate age
5. Conditional rendering: `v-if="tanggungan.umur >= 18"` for restricted sections
6. Form validation: Use FormKit validation rules
7. Auto-save: Optional draft save functionality
8. Navigation: On submit → redirect to `/BF-PRF/AS/FR/04` (Had Kifayah)

### Phase 4: Testing & Validation
- [ ] All 150+ fields present and functional
- [ ] Age-based conditional logic works correctly
- [ ] Add/remove tanggungan functionality
- [ ] Form validation triggers appropriately
- [ ] Responsive on mobile/tablet/desktop
- [ ] Navigation to Had Kifayah page works
- [ ] Draft save/load functionality (if implemented)

---

**DOCUMENT STATUS:** Ready for implementation
**ESTIMATED FIELDS:** 150+ across applicant + tanggungan
**TOKEN USAGE:** ~85k / 200k (safe for continuation)
**LAST UPDATED:** 2025-10-16

