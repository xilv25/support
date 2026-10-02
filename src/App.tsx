import React, { useState, useEffect, useRef } from 'react';
import {
  QrCode,
  Coins,
  CheckCircle2,
  Download,
  Copy,
  Check,
  Github,
  MessageSquare,
  Instagram,
  Globe,
  Heart,
  ShieldCheck,
  Send,
  Coffee,
  Wallet,
  Info,
  X,
  Utensils,
  Server,
  Code2,
  BookOpen,
  Lightbulb,
  AlertCircle,
  Loader2,
  Video,
  Upload,
  ArrowRight,
  Share2
} from 'lucide-react';

// ============================================================================
// KONFIGURASI HALAMAN (EDIT TEKS, LINK, KEY, & DUKUNGAN DI SINI)
// ============================================================================
export const CONFIG = {
  // Web3Forms Key (Dapatkan key gratis di https://web3forms.com)
  web3formsKey: "ISI_KEY_DISINI",
  targetEmail: "xilvnycez@gmail.com",

  profile: {
    name: "Schneider",
    avatarInitials: "S",
    avatarImage: "/schneider-profile.png",
    role: "VIBE CODER • INDONESIA",
    bio: "Vibe coder yang suka bikin web & tools pakai AI. Dukunganmu bantu aku terus belajar dan bikin proyek baru.",
    badge: "VIBE CODER",
    locationCode: "ID"
  },
  hero: {
    topBadge: "OPEN FOR SUPPORT",
    title: "DUKUNG AKU",
    subtitle: "Dukunganmu sangat berarti untuk membantu Schneider terus belajar, eksperimen tools AI, dan merilis proyek web gratis!",
    supportPurposes: [
      {
        title: "Belajar hal baru",
        desc: "Mencoba teknologi, AI tools, & framework baru",
        icon: BookOpen,
        bg: "#FFDE59" // Yellow
      },
      {
        title: "Bikin proyek gratis",
        desc: "Mengembangkan web & tools open-source untuk publik",
        icon: Code2,
        bg: "#00F0FF" // Cyan
      },
      {
        title: "Biaya domain & hosting",
        desc: "Menjaga server & domain proyek tetap online",
        icon: Server,
        bg: "#00FF66" // Green
      }
    ]
  },
  qris: {
    merchantName: "SCHNEIDER DONATION",
    imagePath: "/qris-merchant.png",
    downloadFileName: "qris-merchant.png",
    instruction: "Bisa discan dari e-wallet atau m-banking apa saja",
    note: "Bebas biaya admin & donasi langsung diterima pengembang."
  },
  
  // METODE PAYMENT MANUAL TRANSFER
  paymentMethods: [
    { name: "DANA", number: "081380518572", accountName: "M. THORIQ RIZQI FAHMI" },
    { name: "GOPAY", number: "081380518572", accountName: "M. THORIQ RIZQI FAHMI" },
    { name: "BCA", number: "8243049952", accountName: "M. THORIQ RIZQI FAHMI" },
    { name: "SEABANK", number: "901693367414", accountName: "M. THORIQ RIZQI FAHMI" }
  ],

  steps: [
    {
      number: "01",
      title: "SCAN QRIS",
      desc: "Buka aplikasi e-wallet atau m-banking di HP kamu, pilih menu Scan / Bayar QRIS.",
      icon: QrCode,
      color: "#FFDE59" // Yellow
    },
    {
      number: "02",
      title: "ISI NOMINAL",
      desc: "Masukkan nominal donasi seikhlasnya (mulai dari Rp 1.000) tanpa biaya admin tambahan.",
      icon: Coins,
      color: "#FF0055" // Pink
    },
    {
      number: "03",
      title: "SELESAI",
      desc: "Konfirmasi pembayaran dan masukkan PIN. Selesai! Support kamu berhasil terkirim.",
      icon: CheckCircle2,
      color: "#00F0FF" // Cyan
    }
  ],
  nominalSuggestions: [
    { amount: 5000, label: "Rp 5.000", perk: "Kopi Sachet", desc: "Energy booster ngoding tanpa ngantuk", icon: Coffee },
    { amount: 10000, label: "Rp 10.000", perk: "Cemilan Ngoding", desc: "Penyegar pemicu ide fitur baru", icon: Utensils },
    { amount: 25000, label: "Rp 25.000", perk: "Makan Siang", desc: "Suplai nutrisi bergizi untuk fokus ngoding", icon: Lightbulb },
    { amount: 50000, label: "Rp 50.000", perk: "Domain & Cloud", desc: "Bantu bayar server & domain proyek", icon: Server }
  ],
  links: [
    {
      title: "GITHUB",
      url: "https://github.com/xilv25",
      description: "Lihat kode & repository proyek open-source milikku",
      badge: "SOURCE CODE",
      bg: "#FFDE59", // Yellow
      disabled: false,
      icon: Github
    },
    {
      title: "SALURAN WHATSAPP",
      url: "https://whatsapp.com/channel/0029Vb7Y84OLSmbaaAlKY70L",
      description: "Update proyek & info terbaru",
      badge: "CHANNEL INFO",
      bg: "#25D366", // WhatsApp Green
      disabled: false,
      icon: MessageSquare
    },
    {
      title: "INSTAGRAM",
      url: "",
      description: "Dokumentasi harian & update visual",
      badge: "SEGERA HADIR",
      bg: "#E5E7EB", // Light Gray
      disabled: true,
      icon: Instagram
    },
    {
      title: "TIKTOK",
      url: "",
      description: "Video pendek seputar vibe coding & AI tools",
      badge: "SEGERA HADIR",
      bg: "#E5E7EB", // Light Gray
      disabled: true,
      icon: Video
    },
    {
      title: "PORTFOLIO WEBSITE",
      url: "",
      description: "Showcase proyek lengkap & karya AI",
      badge: "SEGERA HADIR",
      bg: "#E5E7EB", // Light Gray
      disabled: true,
      icon: Globe
    }
  ],

  // ==========================================================================
  // CARA MENAMBAH DUKUNGAN BARU DARI EMAIL:
  // Salin ucapan dari email masuk lalu tambahkan object baru di bawah ini:
  // Contoh: { name: "Budi", amount: "Rp 25.000", message: "Semangat ngoding!", date: "02 Okt 2026" },
  // ==========================================================================
  supporters: [] as Array<{
    name: string;
    amount?: string;
    message?: string;
    date: string;
  }>,

  footer: {
    thankYouText: "TERIMA KASIH BANYAK SUDAH SUPPORT!",
    subtext: "Setiap donasi, sekecil apa pun, sangat berarti dan membantuku untuk terus berkarya.",
    credit: "Dioperasikan oleh Schneider • Dibuat dengan Gaya Neo-Brutalism"
  }
};

export default function App() {
  const formRef = useRef<HTMLDivElement>(null);

  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);
  const [profileImgError, setProfileImgError] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);

  // Form State for Web3Forms
  const [formName, setFormName] = useState("");
  const [formAmount, setFormAmount] = useState("25000");
  const [formMessage, setFormMessage] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const [honeypot, setHoneypot] = useState(""); // anti-spam
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formErrorMessage, setFormErrorMessage] = useState("");

  // Lock body scroll when modal is open + Listen for Escape key
  useEffect(() => {
    if (showManualModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showManualModal) {
        setShowManualModal(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showManualModal]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    triggerToast(`Berhasil menyalin ${label}: ${text}`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleDownloadQRIS = () => {
    const link = document.createElement("a");
    link.href = CONFIG.qris.imagePath;
    link.download = CONFIG.qris.downloadFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("Mengunduh gambar QRIS...");
  };

  // Handle File Upload Validation & Preview
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate Image Type
    if (!file.type.startsWith("image/")) {
      setFileError("File harus berupa gambar (JPG, PNG, WEBP, dll)");
      return;
    }

    // Validate Max Size 5MB
    if (file.size > 5 * 1024 * 1024) {
      setFileError("Ukuran file maksimal 5 MB");
      return;
    }

    setProofFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setProofPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setProofFile(null);
    setProofPreview(null);
    setFileError(null);
  };

  // Submit message + optional image attachment via Web3Forms FormData
  const handleSendEmailMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypot) {
      return;
    }

    if (!formName.trim()) {
      triggerToast("Harap isi nama atau inisial kamu!");
      return;
    }

    setFormStatus("loading");
    setFormErrorMessage("");

    const formattedAmount = formAmount
      ? `Rp ${parseInt(formAmount, 10).toLocaleString("id-ID")}`
      : "Sesuai keiklasan";

    try {
      const keyToUse = CONFIG.web3formsKey !== "ISI_KEY_DISINI" 
        ? CONFIG.web3formsKey 
        : "02ad0bd6-4b89-4933-9fb8-59c735221b06";

      const formData = new FormData();
      formData.append("access_key", keyToUse);
      formData.append("subject", `Pesan Dukungan Donasi dari ${formName.trim()}`);
      formData.append("from_name", "Website Donasi Schneider");
      formData.append("nama", formName.trim());
      formData.append("nominal_donasi", formattedAmount);
      formData.append("pesan", formMessage.trim() || "(Tanpa pesan khusus)");
      formData.append("target_email", CONFIG.targetEmail);

      if (proofFile) {
        formData.append("attachment", proofFile);
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok && (result.success || result.status === 200)) {
        setFormStatus("success");
        setFormName("");
        setFormMessage("");
        handleRemoveFile();
        triggerToast("Pesan dukunganmu berhasil dikirimkan ke email Schneider!");
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setFormErrorMessage(result.message || "Gagal mengirim pesan. Silakan periksa jaringan atau coba lagi.");
      }
    } catch (err: any) {
      setFormStatus("error");
      setFormErrorMessage("Terjadi kesalahan koneksi. Silakan coba beberapa saat lagi.");
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF0] text-[#121212] flex flex-col font-sans selection:bg-[#FF0055] selection:text-white pb-12">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-[#FF0055] text-white neo-border px-6 py-3 rounded-none neo-shadow font-bold text-sm md:text-base flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#FFDE59] stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Running Marquee Banner */}
      <div className="bg-[#FFDE59] neo-border-sm border-x-0 border-t-0 py-2.5 overflow-hidden whitespace-nowrap font-extrabold uppercase text-xs md:text-sm tracking-wider flex items-center select-none">
        <div className="inline-flex animate-marquee gap-8 items-center">
          <span className="flex items-center gap-2"><QrCode className="w-4 h-4 text-black stroke-[3]" /> DONASI QRIS SCHNEIDER</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Coins className="w-4 h-4 text-black stroke-[3]" /> SCAN DENGAN E-WALLET / M-BANKING</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-[#FF0055] stroke-[3]" /> DUKUNG PROYEK VIBE CODING</span>
          <span>•</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-black stroke-[3]" /> TANPA BIAYA ADMIN</span>
          <span>•</span>
        </div>
        <div className="inline-flex animate-marquee gap-8 items-center pl-8" aria-hidden="true">
          <span className="flex items-center gap-2"><QrCode className="w-4 h-4 text-black stroke-[3]" /> DONASI QRIS SCHNEIDER</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Coins className="w-4 h-4 text-black stroke-[3]" /> SCAN DENGAN E-WALLET / M-BANKING</span>
          <span>•</span>
          <span className="flex items-center gap-2"><Heart className="w-4 h-4 text-[#FF0055] stroke-[3]" /> DUKUNG PROYEK VIBE CODING</span>
          <span>•</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-black stroke-[3]" /> TANPA BIAYA ADMIN</span>
          <span>•</span>
        </div>
      </div>

      <main className="max-w-3xl w-full mx-auto px-4 pt-6 md:pt-10 flex-1 space-y-10 md:space-y-14">
        
        {/* ====================================================================
            1. BIO / PROFIL
            ==================================================================== */}
        <section className="bg-white neo-border neo-shadow p-6 md:p-8 -rotate-1 hover:rotate-0 transition-transform duration-200 relative overflow-hidden">
          {/* Decorative Corner Badge */}
          <div className="absolute -right-12 top-6 bg-[#FF0055] text-white text-[10px] font-black uppercase px-12 py-1 rotate-45 neo-border-sm shadow-sm">
            OFFICIAL
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            {/* Avatar / Profile Image */}
            <div className="relative shrink-0">
              {!profileImgError ? (
                <img
                  src={CONFIG.profile.avatarImage}
                  alt={CONFIG.profile.name}
                  onError={() => setProfileImgError(true)}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover neo-border bg-[#FFDE59] rounded-none shrink-0"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 neo-border bg-[#FFDE59] flex items-center justify-center font-black text-4xl md:text-5xl text-black neo-shadow-sm select-none rounded-none">
                  {CONFIG.profile.avatarInitials}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-[#00FF66] p-1.5 neo-border-sm rounded-none">
                <ShieldCheck className="w-4 h-4 text-black stroke-[3]" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-2 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="bg-[#00F0FF] neo-border-sm px-2.5 py-0.5 text-xs font-black uppercase tracking-wide">
                  {CONFIG.profile.badge}
                </span>
                <span className="bg-black text-white neo-border-sm px-2 py-0.5 text-[11px] font-black uppercase">
                  {CONFIG.profile.locationCode}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-black leading-none">
                {CONFIG.profile.name}
              </h1>

              <p className="text-xs md:text-sm font-extrabold text-[#FF0055] uppercase tracking-wide flex items-center justify-center sm:justify-start gap-1.5">
                <Code2 className="w-4 h-4 stroke-[3]" />
                <span>{CONFIG.profile.role}</span>
              </p>

              <p className="text-sm md:text-base font-bold text-gray-800 leading-relaxed pt-1">
                {CONFIG.profile.bio}
              </p>
            </div>
          </div>
        </section>

        {/* ====================================================================
            2. HERO SECTION & DUKUNGANMU UNTUK
            ==================================================================== */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#FFDE59] neo-border neo-shadow-sm px-4 py-1.5 text-xs md:text-sm font-black uppercase tracking-wider">
            <span>{CONFIG.hero.topBadge}</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-none text-black">
            {CONFIG.hero.title}
          </h2>

          <p className="max-w-xl mx-auto text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-snug">
            {CONFIG.hero.subtitle}
          </p>

          {/* DUKUNGANMU UNTUK: 3 Kartu Kecil Brutalist */}
          <div className="pt-2 space-y-3">
            <div className="inline-block bg-black text-white neo-border-sm px-3 py-1 text-xs font-black uppercase tracking-wider">
              DUKUNGANMU UNTUK:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
              {CONFIG.hero.supportPurposes.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    style={{ backgroundColor: item.bg }}
                    className="neo-border neo-shadow-sm p-4 flex flex-col justify-between space-y-2 hover:-translate-y-1 transition-transform"
                  >
                    <div className="flex items-center justify-between">
                      <IconComponent className="w-6 h-6 text-black stroke-[3]" />
                      <span className="text-[10px] font-black bg-black text-white px-1.5 py-0.2 neo-border-sm">
                        OK
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black uppercase text-black leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-extrabold text-gray-900 mt-1 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ====================================================================
            3. KARTU QRIS (/qris-merchant.png)
            ==================================================================== */}
        <section className="bg-[#FFDE59] neo-border neo-shadow-lg p-6 md:p-8 space-y-6 relative text-center">
          
          {/* Top Card Badge */}
          <div className="inline-block bg-[#FF0055] text-white neo-border neo-shadow-sm px-5 py-2 font-black uppercase text-sm md:text-base tracking-wider">
            QRIS NATIONAL STANDARD
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-black">
              {CONFIG.qris.merchantName}
            </h3>
          </div>

          {/* Large QRIS Image Box */}
          <div className="max-w-sm mx-auto bg-white neo-border p-4 sm:p-6 neo-shadow space-y-4">
            {!imgError ? (
              <img
                src={CONFIG.qris.imagePath}
                alt="QRIS Donasi Schneider"
                onError={() => setImgError(true)}
                className="w-full h-auto object-contain neo-border max-h-[380px] bg-white mx-auto"
              />
            ) : (
              /* Fallback Structure as originally designed */
              <div className="w-full aspect-[3/4] bg-white neo-border p-4 flex flex-col justify-between items-center">
                <div className="bg-[#ED1C24] text-white w-full py-2 font-black text-sm uppercase neo-border-sm">
                  QRIS STANDAR NASIONAL
                </div>
                <div className="my-auto space-y-2">
                  <QrCode className="w-32 h-32 text-black mx-auto stroke-[2]" />
                  <p className="font-mono text-xs font-black">SCHNEIDER DONATION</p>
                </div>
                <div className="text-[10px] font-extrabold text-gray-500">
                  SCAN MENGGUNAKAN APP APAPUN
                </div>
              </div>
            )}

            {/* Simple One-Sentence Instruction */}
            <div className="bg-[#FFFDF0] neo-border-sm p-3 text-xs md:text-sm font-bold text-black flex items-center justify-center gap-2 text-center">
              <Info className="w-5 h-5 text-[#FF0055] shrink-0 stroke-[3]" />
              <span>{CONFIG.qris.instruction}</span>
            </div>
          </div>

          {/* Action Buttons: SIMPAN QRIS + MANUAL TRANSFER */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto pt-2">
            <button
              onClick={handleDownloadQRIS}
              className="neo-btn bg-[#FF0055] text-white py-3.5 px-6 flex items-center justify-center gap-2 text-sm md:text-base uppercase tracking-wider font-black w-full"
            >
              <Download className="w-5 h-5 stroke-[3]" />
              <span>SIMPAN QRIS</span>
            </button>

            <button
              onClick={() => setShowManualModal(true)}
              className="neo-btn bg-white text-black py-3.5 px-6 flex items-center justify-center gap-2 text-sm md:text-base uppercase tracking-wider font-black w-full"
            >
              <Wallet className="w-5 h-5 stroke-[3]" />
              <span>TRANSFER MANUAL</span>
            </button>
          </div>

          <p className="text-xs font-extrabold text-black/80 max-w-sm mx-auto">
            {CONFIG.qris.note}
          </p>
        </section>

        {/* ====================================================================
            4. LANGKAH DONASI
            ==================================================================== */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              3 LANGKAH SINGKAT DONASI
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-700">
              Proses instan tanpa ribet, langsung dari smartphone milikmu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CONFIG.steps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-white neo-border neo-shadow p-5 flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-transform relative"
                >
                  <div className="flex justify-between items-start">
                    <span
                      style={{ backgroundColor: step.color }}
                      className="text-black neo-border-sm font-black text-base px-3 py-1 neo-shadow-sm"
                    >
                      LANGKAH {step.number}
                    </span>
                    <IconComp className="w-8 h-8 text-black stroke-[3]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase text-black">
                      {step.title}
                    </h3>
                    <p className="text-xs md:text-sm font-bold text-gray-700 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t-2 border-black flex items-center text-[10px] font-black uppercase text-gray-500 justify-between">
                    <span>STEP {idx + 1} OF 3</span>
                    <Check className="w-4 h-4 text-[#FF0055] stroke-[3]" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
            5. NOMINAL SARAN
            ==================================================================== */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-block bg-[#00F0FF] neo-border-sm px-3 py-0.5 text-xs font-black uppercase mb-1">
              SARAN NOMINAL
            </div>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              PILIH NOMINAL SESUAI KEINGINAN
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-700">
              *Hanya sebagai info perk. Kamu bebas menentukan nominal berapa saja saat scan QRIS!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {CONFIG.nominalSuggestions.map((item) => {
              const PerkIcon = item.icon;
              return (
                <div
                  key={item.amount}
                  onClick={() => setSelectedNominal(item.amount)}
                  className={`cursor-pointer neo-border p-4 flex flex-col justify-between text-left space-y-3 transition-all ${
                    selectedNominal === item.amount
                      ? "bg-[#FFDE59] neo-shadow-lg -translate-y-1"
                      : "bg-white neo-shadow hover:-translate-y-0.5 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <PerkIcon className="w-6 h-6 text-black stroke-[3]" />
                    {selectedNominal === item.amount && (
                      <span className="text-xs font-black text-[#FF0055]">PILIHAN</span>
                    )}
                  </div>

                  <div>
                    <p className="text-2xl font-black uppercase tracking-tight text-black">
                      {item.label}
                    </p>
                    <p className="text-xs font-extrabold text-[#FF0055] mt-0.5 flex items-center gap-1">
                      <span>{item.perk}</span>
                    </p>
                  </div>

                  <p className="text-[11px] font-extrabold text-gray-700 leading-snug pt-2 border-t-2 border-black/20">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {selectedNominal && (
            <div className="bg-[#FF0055] text-white neo-border neo-shadow p-4 text-center font-bold text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-left">
                <Coffee className="w-5 h-5 text-[#FFDE59] shrink-0 stroke-[3]" />
                <span>
                  Kamu memilih nominal: <strong>Rp {selectedNominal.toLocaleString("id-ID")}</strong>! Silakan ketik nominal ini saat scan di aplikasi QRIS milikmu.
                </span>
              </div>
              <button
                onClick={() => handleCopy(selectedNominal.toString(), "Nominal Donasi")}
                className="neo-btn bg-[#FFDE59] text-black text-xs px-4 py-2 uppercase font-black shrink-0"
              >
                SALIN NOMINAL
              </button>
            </div>
          )}
        </section>

        {/* ====================================================================
            6. LINK PROFIL
            ==================================================================== */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              TEMUKAN SCHNEIDER DI INTERNET
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-700">
              Ikuti saluran resmi dan repository GitHub milik Schneider.
            </p>
          </div>

          <div className="space-y-4">
            {CONFIG.links.map((link) => {
              const IconComponent = link.icon;

              if (link.disabled) {
                return (
                  <div
                    key={link.title}
                    className="neo-border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left bg-gray-200/80 opacity-65 cursor-not-allowed select-none"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-12 h-12 neo-border bg-white flex items-center justify-center shrink-0 text-gray-500">
                        <IconComponent className="w-6 h-6 stroke-[3]" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xl font-black uppercase tracking-tight text-gray-700">
                            {link.title}
                          </span>
                          <span className="bg-gray-700 text-white text-[10px] font-black px-2 py-0.5 neo-border-sm uppercase">
                            {link.badge}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold text-gray-600">
                          {link.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={link.title}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: link.bg }}
                  className="neo-btn p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 block text-left group text-black"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 neo-border bg-white flex items-center justify-center shrink-0 neo-shadow-sm text-black">
                      <IconComponent className="w-6 h-6 stroke-[3]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xl font-black uppercase tracking-tight group-hover:underline">
                          {link.title}
                        </span>
                        <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 neo-border-sm uppercase">
                          {link.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-extrabold text-black/90">
                        {link.description}
                      </p>
                    </div>
                  </div>

                  <div className="self-end sm:self-center shrink-0 bg-white neo-border-sm p-2 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-5 h-5 text-black stroke-[3]" />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* ====================================================================
            7. DUKUNGAN DARI TEMAN-TEMAN
            ==================================================================== */}
        <section className="bg-white neo-border neo-shadow p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-4 border-black pb-4">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-black">
                <Heart className="w-6 h-6 text-[#FF0055] stroke-[3]" />
                DUKUNGAN DARI TEMAN-TEMAN
              </h2>
              <p className="text-xs font-bold text-gray-700">
                Apresiasi dan dukungan dari teman-teman yang telah bergabung.
              </p>
            </div>

            <span className="bg-[#FFDE59] neo-border-sm px-3 py-1 text-xs font-black uppercase">
              {CONFIG.supporters.length} SUPPORTERS
            </span>
          </div>

          {/* Empty state or list */}
          {CONFIG.supporters.length === 0 ? (
            <div className="bg-[#FFFDF0] neo-border p-6 text-center space-y-4">
              <div className="w-16 h-16 bg-[#FF0055] text-white neo-border mx-auto flex items-center justify-center neo-shadow-sm">
                <Heart className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black uppercase text-black">
                  BELUM ADA DUKUNGAN. JADI YANG PERTAMA!
                </h3>
                <p className="text-xs font-bold text-gray-700 max-w-md mx-auto">
                  Kirim dukunganmu lewat form di bawah untuk membantu Schneider terus belajar dan merilis proyek baru!
                </p>
              </div>

              <button
                onClick={scrollToForm}
                className="neo-btn bg-[#FFDE59] text-black py-2.5 px-6 text-xs uppercase font-black inline-flex items-center gap-2"
              >
                <span>KIRIM DUKUNGAN SEKARANG</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {CONFIG.supporters.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#FFFDF0] neo-border p-4 space-y-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-sm uppercase text-black">
                        {item.name}
                      </span>
                      {item.amount && (
                        <span className="bg-[#00FF66] text-black text-[10px] font-black px-2 py-0.5 neo-border-sm uppercase">
                          {item.amount}
                        </span>
                      )}
                    </div>

                    {item.message && (
                      <p className="text-xs font-bold text-gray-800 leading-snug">
                        "{item.message}"
                      </p>
                    )}
                  </div>

                  <span className="text-[10px] font-black text-gray-500 shrink-0 uppercase bg-white neo-border-sm px-2 py-0.5">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ====================================================================
            8. FORM UCAPAN + BUKTI TRANSFER (KE EMAIL VIA WEB3FORMS)
            ==================================================================== */}
        <section ref={formRef} className="bg-white neo-border neo-shadow p-6 md:p-8 space-y-5">
          <div className="space-y-1 border-b-4 border-black pb-4">
            <span className="bg-[#FFDE59] neo-border-sm px-2.5 py-0.5 text-xs font-black uppercase">
              PESAN LANGSUNG KE EMAIL
            </span>
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2 text-black">
              <Send className="w-6 h-6 text-[#FF0055] stroke-[3]" />
              KIRIM UCAPAN & BUKTI TRANSFER
            </h2>
            <p className="text-xs font-bold text-gray-700">
              Isi form di bawah untuk mengirim pesan pribadi atau bukti transfer. Pesan & bukti hanya masuk langsung ke email Schneider.
            </p>
          </div>

          <form onSubmit={handleSendEmailMessage} className="bg-[#FFFDF0] neo-border p-4 sm:p-5 space-y-4">
            
            {/* Anti-Spam Honeypot Field */}
            <input
              type="text"
              name="botcheck"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-black uppercase mb-1 text-black">
                  NAMA / INISIAL KAMU *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi / Anonim"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  disabled={formStatus === "loading"}
                  className="w-full bg-white neo-border-sm p-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF0055] disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase mb-1 text-black">
                  NOMINAL DONASI (OPSIONAL)
                </label>
                <select
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  disabled={formStatus === "loading"}
                  className="w-full bg-white neo-border-sm p-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF0055] disabled:opacity-50"
                >
                  <option value="">-- Seikhlasnya --</option>
                  <option value="5000">Nominal: Rp 5.000</option>
                  <option value="10000">Nominal: Rp 10.000</option>
                  <option value="25000">Nominal: Rp 25.000</option>
                  <option value="50000">Nominal: Rp 50.000</option>
                  <option value="100000">Nominal: Rp 100.000+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase mb-1 text-black">
                PESAN / UCAPAN (OPSIONAL)
              </label>
              <textarea
                placeholder="Tulis pesan semangat untuk Schneider..."
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                rows={2}
                disabled={formStatus === "loading"}
                className="w-full bg-white neo-border-sm p-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#FF0055] disabled:opacity-50"
              />
            </div>

            {/* BUKTI TRANSFER (OPSIONAL) FILE UPLOAD */}
            <div className="space-y-2">
              <label className="block text-[11px] font-black uppercase text-black">
                BUKTI TRANSFER (OPSIONAL)
              </label>

              {!proofPreview ? (
                <div className="relative">
                  <label className="neo-btn bg-white hover:bg-gray-50 text-black p-4 flex flex-col items-center justify-center gap-2 cursor-pointer text-center">
                    <Upload className="w-6 h-6 text-[#FF0055] stroke-[3]" />
                    <span className="text-xs font-black uppercase">
                      UNGGAH GAMBAR BUKTI TRANSFER
                    </span>
                    <span className="text-[10px] font-bold text-gray-500">
                      Maksimal 5 MB (Format Gambar JPG, PNG, WEBP)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={formStatus === "loading"}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="bg-white neo-border p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={proofPreview}
                      alt="Preview Bukti Transfer"
                      className="w-14 h-14 object-cover neo-border-sm shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-xs font-black text-black truncate">
                        {proofFile?.name}
                      </p>
                      <p className="text-[10px] font-bold text-gray-500">
                        {proofFile ? (proofFile.size / (1024 * 1024)).toFixed(2) : 0} MB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="neo-btn bg-[#FF0055] text-white p-2 shrink-0 hover:bg-black"
                  >
                    <X className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              )}

              <p className="text-[11px] font-bold text-gray-600 italic">
                * Tidak wajib. Kalau cuma mau bilang makasih juga boleh banget.
              </p>

              {fileError && (
                <div className="bg-[#FF0055] text-white neo-border-sm p-2 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 stroke-[3]" />
                  <span>{fileError}</span>
                </div>
              )}
            </div>

            {/* Error Message Box */}
            {formStatus === "error" && (
              <div className="bg-[#FF0055] text-white neo-border-sm p-3 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 stroke-[3]" />
                <span>{formErrorMessage || "Gagal mengirim. Silakan periksa jaringan dan coba lagi."}</span>
              </div>
            )}

            {/* Success Message Box */}
            {formStatus === "success" && (
              <div className="bg-[#00FF66] text-black neo-border-sm p-3 text-xs font-black flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 shrink-0 stroke-[3]" />
                <span>TERKIRIM, MAKASIH! Pesan dukunganmu sudah terkirim ke email.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "loading"}
              className={`neo-btn w-full py-3 px-6 text-xs sm:text-sm uppercase font-black flex items-center justify-center gap-2 transition-colors ${
                formStatus === "success"
                  ? "bg-[#00FF66] text-black"
                  : formStatus === "error"
                  ? "bg-[#FF0055] text-white"
                  : "bg-[#FF0055] text-white hover:bg-black"
              }`}
            >
              {formStatus === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin stroke-[3]" />
                  <span>MENGIRIM...</span>
                </>
              ) : formStatus === "success" ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>TERKIRIM, MAKASIH!</span>
                </>
              ) : formStatus === "error" ? (
                <>
                  <AlertCircle className="w-4 h-4 stroke-[3]" />
                  <span>GAGAL, COBA LAGI</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 stroke-[3]" />
                  <span>KIRIM PESAN DUKUNGAN</span>
                </>
              )}
            </button>
          </form>
        </section>

      </main>

      {/* ====================================================================
          MODAL "TRANSFER MANUAL"
          ==================================================================== */}
      {showManualModal && (
        <div
          onClick={() => setShowManualModal(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white neo-border neo-shadow-lg max-w-lg w-full p-6 space-y-5 relative my-8"
          >
            {/* Big Close Button */}
            <button
              onClick={() => setShowManualModal(false)}
              aria-label="Tutup Modal"
              className="absolute top-4 right-4 bg-[#FF0055] text-white p-2 neo-border hover:bg-black transition-colors"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>

            <div className="space-y-1">
              <span className="bg-[#FFDE59] neo-border-sm px-2.5 py-0.5 text-xs font-black uppercase">
                DIRECT TRANSFER
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-black">
                TRANSFER MANUAL
              </h3>
              <p className="text-xs font-extrabold text-[#FF0055] uppercase">
                Pastikan nama penerima sesuai sebelum melakukan transfer
              </p>
            </div>

            {/* 4 Brutalist Payment Cards */}
            <div className="space-y-3">
              {CONFIG.paymentMethods.map((acc) => (
                <div
                  key={acc.name}
                  className="bg-[#FFFDF0] neo-border p-4 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-black uppercase bg-black text-white px-2.5 py-0.5">
                      {acc.name}
                    </span>
                    <p className="font-mono text-lg font-black text-black pt-0.5 tracking-wide">
                      {acc.number}
                    </p>
                    <p className="text-[11px] font-extrabold text-gray-700 uppercase">
                      a.n. {acc.accountName}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(acc.number, acc.name)}
                    className={`neo-btn px-4 py-2 text-xs uppercase font-black flex items-center gap-1.5 shrink-0 ${
                      copiedText === acc.number
                        ? "bg-[#00FF66] text-black"
                        : "bg-[#FFDE59] text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {copiedText === acc.number ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>TERSALIN</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 stroke-[3]" />
                        <span>SALIN</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#00F0FF] neo-border-sm p-3 text-xs font-extrabold text-black flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 stroke-[3]" />
              <span>Setelah transfer, kamu dapat mengunggah bukti transfer via form ucapan di bawah jika berkenan.</span>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          FOOTER
          ==================================================================== */}
      <footer className="mt-16 border-t-4 border-black bg-[#FFDE59] py-10 px-4 text-center select-none">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-block bg-black text-white px-4 py-1.5 font-black text-sm uppercase tracking-widest neo-border-sm">
            {CONFIG.footer.thankYouText}
          </div>

          <p className="text-xs md:text-sm font-bold text-black max-w-lg mx-auto">
            {CONFIG.footer.subtext}
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => handleCopy(window.location.href, "Link Website Donasi")}
              className="neo-btn bg-white text-black text-xs font-black px-4 py-2 uppercase flex items-center gap-2"
            >
              <Share2 className="w-4 h-4 text-[#FF0055] stroke-[3]" />
              BAGIKAN HALAMAN INI
            </button>
          </div>

          <p className="text-[11px] font-black uppercase text-black/70 pt-4 border-t-2 border-black/20">
            {CONFIG.footer.credit}
          </p>
        </div>
      </footer>
    </div>
  );
}
