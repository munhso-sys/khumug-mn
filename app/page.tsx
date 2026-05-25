"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Wrench,
  Mountain,
  Users,
  GraduationCap,
  ClipboardCheck,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Send,
} from "lucide-react";

const services = [
  { icon: Wrench, title: "Хүнд машин механизмын засвар", text: "Оношилгоо, урьдчилан сэргийлэх үйлчилгээ, иж бүрэн засвар." },
  { icon: Mountain, title: "Уурхайн олборлолт", text: "Төлөвлөгөө, паспорт, ХАБЭА-н шаардлагад нийцсэн олборлолтын зохион байгуулалт." },
  { icon: ClipboardCheck, title: "Менежментийн зөвлөх үйлчилгээ", text: "Стратеги төлөвлөлт, бүтээмж, хүний нөөц, эрсдэлийн удирдлагын зөвлөгөө." },
  { icon: ShieldCheck, title: "ХАБЭА ба эрсдэлийн үнэлгээ", text: "Аюулыг илрүүлэх, эрсдэлийг бууруулах, ослоос урьдчилан сэргийлэх шийдэл." },
  { icon: Users, title: "Хүний нөөц, хөдөлмөр зохион байгуулалт", text: "Ажиллах хүчний бүрдүүлэлт, ээлжийн удирдлага, ажлын байрны зохион байгуулалт." },
  { icon: GraduationCap, title: "Core Skills сургалт", text: "Уул уурхайн мастер болон ажилтнуудад зориулсан чадамжид суурилсан сургалт." },
];

const partners = [
  "Барулас Майнинг ХХК",
  "Шидэт Ундарга ХХК",
  "Биг Могул Коул Энд Энержи ХХК",
  "Нивдэг ХХК",
  "Нандинцэцэг ХХК",
  "Дулаанхан Хайрхан ХХК",
  "Буман Ложистикс ХХК",
  "Талын Гал ХХК",
  "Мезом ХХК",
  "Толой ХХК",
  "Файнел Драйв Сервис ХХК",
];

const stats = [
  ["180 цаг", "Core Skills сургалт"],
  ["20:80", "Онол ба дадлага"],
  ["30 хоног", "Сургалтын хугацаа"],
  ["5 нэгж", "Чадамжийн бүтэц"],
];

const navItems = [
  ["Бидний тухай", "#about"],
  ["Үйлчилгээ", "#services"],
  ["Сургалт", "#training"],
  ["Түншүүд", "#partners"],
];


export default function KhumugHomepage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  async function handleContactSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  console.log("FORM SUBMIT CLICKED");

  setFormStatus("loading");
  setFormMessage("");
  
  const form = event.currentTarget;

  const formData = new FormData(form);

  const payload = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    service: formData.get("service"),
    message: formData.get("message"),
  };

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    setFormStatus("success");
    setFormMessage("Таны хүсэлт амжилттай илгээгдлээ.");
    form.reset();
  } else {
    const result = await response.json().catch(() => null);
    console.error("CONTACT ERROR:", result);

    setFormStatus("error");
    setFormMessage("Илгээх үед алдаа гарлаа. Дахин оролдоно уу.");
  }
}

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F1F1F]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-[#111]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-3">
            <img
              src="/khumug.gif"
              alt="Хөмөг Майнинг ХХК лого"
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <div className="text-sm font-bold tracking-wide text-white">ХӨМӨГ МАЙНИНГ ХХК</div>
              <div className="text-xs text-white/55">Mining • Maintenance • Training</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
            {navItems.map(([label, href]) => (
              <a key={href} href={href} className="hover:text-[#74c947]">{label}</a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#contact" className="rounded-full bg-[#5FAF2D] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-green-900/25 hover:bg-[#3E7A1B]">Холбоо барих</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border border-white/10 p-2 text-white md:hidden" aria-label="Menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#111] px-5 py-4 md:hidden">
            <div className="mx-auto grid max-w-7xl gap-3">
              {navItems.map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-white/80 hover:bg-white/5 hover:text-[#B9F59C]">{label}</a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="mt-2 rounded-xl bg-[#5FAF2D] px-4 py-3 text-center font-semibold text-white">Холбоо барих</a>
            </div>
          </div>
        )}
      </header>

      <section
        className="relative min-h-screen overflow-hidden bg-[#121412] bg-cover bg-center bg-fixed bg-no-repeat pt-28 text-white"
        style={{ backgroundImage: "url('/mine-bg.jpg')" }}
      >
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-[#1d3b12]/45" />
      <div className="absolute inset-0 bg-black/40" />
      
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
        <div className="absolute -right-28 top-16 h-[500px] w-[500px] rounded-full bg-[#5FAF2D]/15 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#3E7A1B]/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1.08fr_.92fr] md:items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-5 inline-flex rounded-full border border-[#5FAF2D]/40 bg-[#5FAF2D]/10 px-4 py-2 text-sm text-[#B9F59C]">Монголын уул уурхайн найдвартай түнш</div>
            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Хүнд техник, олборлолт, ХАБЭА, сургалтын цогц шийдэл
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              Хөмөг Майнинг ХХК нь уул уурхайн салбарт мэргэжлийн баг, найдвартай үйлчилгээ, аюулгүй ажиллагаа, бодит ур чадварт суурилсан сургалтаар үнэ цэн бүтээнэ.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#services" className="group inline-flex items-center gap-2 rounded-full bg-[#5FAF2D] px-6 py-3 font-semibold text-white hover:bg-[#3E7A1B]">
                Үйлчилгээ үзэх <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a href="#training" className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white hover:border-[#5FAF2D] hover:text-[#B9F59C]">Core Skills сургалт</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-2x1">
            <div className="rounded-[1.5rem] bg-[#1F1F1F] p-6">
              <div className="mb-5 h-56 rounded-2xl bg-gradient-to-br from-[#5FAF2D] via-[#24351e] to-[#111] p-5">
                <div className="h-full rounded-xl border border-white/15 bg-black/20 p-5">
                  <img
                    src="/khumug.gif"
                    alt="Хөмөг Майнинг ХХК"
                    className="mb-4 h-16 w-auto"
                  />
                  <div className="text-sm text-white/60">Design concept</div>
                  <div className="mt-2 text-2xl font-black md:text-2xl">Орчин үеийн аж үйлдвэрийн корпораци</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stats.map(([num, label]) => (
                  <div key={label} className="rounded-2xl bg-white/5 p-4">
                    <div className="text-2xl font-black text-[#B9F59C]">{num}</div>
                    <div className="mt-1 text-xs text-white/55">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 md:grid-cols-[.9fr_1.1fr] md:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[.22em] text-[#5FAF2D]">Бидний тухай</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Аюулгүй, чанартай, хариуцлагатай уул уурхайн үйлчилгээ</h2>
          </div>
          <p className="text-lg leading-8 text-[#4B5563]">
            Бид хүнд машин механизмын засвар үйлчилгээ, уурхайн олборлолт, менежментийн зөвлөгөө, хүний нөөц, хөдөлмөр зохион байгуулалт, ХАБЭА ба эрсдэлийн үнэлгээний чиглэлээр ажилладаг. Үйлчилгээ бүр мэргэжлийн баг, стандарт ажиллагаа, харилцагчийн хэрэгцээнд төвлөрдөг.
          </p>
        </div>
      </section>

      <section id="services" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-12 max-w-3xl">
            <p className="font-semibold uppercase tracking-[.22em] text-[#5FAF2D]">Үйлчилгээ</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Уул уурхайн үйл ажиллагаанд хэрэгтэй цогц шийдэл</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div whileHover={{ y: -6 }} key={item.title} className="rounded-3xl border border-gray-100 bg-[#F8FAF7] p-6 shadow-sm transition hover:border-[#5FAF2D]/40 hover:shadow-xl">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5FAF2D] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#6B7280]">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="training" className="bg-[#141714] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="font-semibold uppercase tracking-[.22em] text-[#B9F59C]">Core Skills</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Чадамжид суурилсан уул уурхайн сургалт</h2>
            <p className="mt-5 leading-8 text-white/65">
              Уул уурхайн мастерийн мэдлэг, ур чадвар, хандлагыг ажлын байрны бодит хэрэгцээнд нийцүүлэн хөгжүүлэх сургалтын бүтэц.
            </p>
          </div>
          <div className="grid gap-4">
            {["ХАБЭА-н шаардлагыг хангаж ажиллах", "Харилцааны ур чадвар эзэмших", "Уурхайн үйл ажиллагааны талаар мэдэх", "Удирдан, зохион байгуулах арга барил эзэмших", "Уурхайн ээлжийн ажлыг үр дүнтэй удирдах"].map((x, i) => (
              <div key={x} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#5FAF2D] font-black">{i + 1}</div>
                <div className="font-semibold">{x}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partners" className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-semibold uppercase tracking-[.22em] text-[#5FAF2D]">Түншүүд</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Хамтран ажиллагч байгууллагууд</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div key={p} className="rounded-2xl border border-gray-200 bg-white px-5 py-4 font-semibold text-[#374151] shadow-sm">{p}</div>
          ))}
        </div>
      </section>

      <section id="contact" className="bg-[#1F1F1F] py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <p className="font-semibold uppercase tracking-[.22em] text-[#B9F59C]">Холбоо барих</p>
            <h2 className="mt-3 text-3xl font-black md:text-5xl">Төслийн талаар холбогдох</h2>
            <p className="mt-5 leading-8 text-white/65">Үйлчилгээ, сургалт, хамтын ажиллагааны санал илгээнэ үү.</p>
            <div className="mt-8 grid gap-4 text-white/75">
              <div className="flex items-start gap-3"><MapPin className="mt-1 h-5 w-5 text-[#B9F59C]" /> Улаанбаатар хот, Баянгол дүүрэг, 2-р хороо</div>
              <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-[#B9F59C]" /> +976 94004702</div>
              <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-[#B9F59C]" /> info@khumug.mn</div>
            </div>
          </div>

          <form
            onSubmit={handleContactSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                required
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#5FAF2D]"
                placeholder="Нэр"
              />
              <input
                name="phone"
                required
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#5FAF2D]"
                placeholder="Утас"
              />
            </div>

            <input
              name="email"
              type="email"
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#5FAF2D]"
              placeholder="И-мэйл"
            />

            <select
              name="service"
              className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none focus:border-[#5FAF2D]"
            >
              <option className="text-black">Үйлчилгээний төрөл сонгох</option>
              <option className="text-black">Хүнд машин механизмын засвар</option>
              <option className="text-black">Уурхайн олборлолт</option>
              <option className="text-black">Core Skills сургалт</option>
              <option className="text-black">ХАБЭА, эрсдэлийн үнэлгээ</option>
            </select>

            <textarea
              name="message"
              required
              className="mt-4 min-h-36 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-[#5FAF2D]"
              placeholder="Зурвас"
            />

            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#5FAF2D] px-6 py-4 font-bold text-white hover:bg-[#3E7A1B] md:w-auto"
            >
              {formStatus === "loading" ? "Илгээж байна..." : "Илгээх"}
              <Send className="h-4 w-4" />
            </button>

            {formMessage && (
              <p
                className={`mt-4 text-sm ${
                  formStatus === "success" ? "text-[#B9F59C]" : "text-red-300"
                }`}
              >
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="bg-[#111] py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <img
              src="/khumug.gif"
              alt="Хөмөг Майнинг ХХК"
              className="h-12 w-auto"
            />
            <p className="mt-4 max-w-md text-sm leading-7 text-white/55">
              Хөмөг Майнинг ХХК — уул уурхайн хүнд техник, олборлолт, ХАБЭА, менежмент, сургалтын цогц шийдэл.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Цэс</h3>
            <div className="mt-4 grid gap-2 text-sm text-white/55">
              {navItems.map(([label, href]) => <a key={href} href={href} className="hover:text-[#B9F59C]">{label}</a>)}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Холбоо</h3>
            <div className="mt-4 grid gap-2 text-sm text-white/55">
              <span>+976 94004702</span>
              <span>info@khumug.mn</span>
              <span>www.khumug.mn</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 px-5 pt-6 text-sm text-white/35">
          © 2026 Хөмөг Майнинг ХХК. Бүх эрх хуулиар хамгаалагдсан.
        </div>
      </footer>
    </div>
  );
}