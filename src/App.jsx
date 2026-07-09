import { useState, useEffect, useRef } from 'react'
import './App.css'

// ─── DATA ────────────────────────────────────────────────────────────────────
const bmcData = [
  { id: 'key-partners',       title: 'Key Partners',        emoji: '🤝', accent: '#6366f1',
    items: ['Organisasi mahasiswa & BEM','Himpunan jurusan','Percetakan & fotokopi kampus','Freelancer akademik'] },
  { id: 'key-activities',     title: 'Key Activities',      emoji: '⚙️', accent: '#8b5cf6',
    items: ['Pengetikan dokumen','Proofreading & editing','Formatting profesional','Promosi & pemasaran digital'] },
  { id: 'key-resources',      title: 'Key Resources',       emoji: '🗂️', accent: '#a855f7',
    items: ['Laptop & komputer','Microsoft Word & Office','Koneksi internet stabil','Kemampuan mengetik & editing'] },
  { id: 'value-proposition',  title: 'Value Proposition',   emoji: '💎', accent: '#10b981',
    items: ['Harga terjangkau mahasiswa','Pengerjaan cepat & tepat waktu','Revisi gratis tanpa batas','Konsultasi gratis sebelum order','Hasil dokumen profesional'] },
  { id: 'customer-relationship', title: 'Customer Relationship', emoji: '💬', accent: '#06b6d4',
    items: ['Fast response & ramah','Konsultasi one-on-one','Promo & diskon mahasiswa','Pelayanan personal & solutif'] },
  { id: 'channels',           title: 'Channels',            emoji: '📣', accent: '#0ea5e9',
    items: ['Instagram @taskhelper.id','WhatsApp Business','TikTok konten edukatif','Google Form order','Grup WA mahasiswa'] },
  { id: 'customer-segment',   title: 'Customer Segment',    emoji: '🎓', accent: '#1d6feb',
    items: ['🎯 Mahasiswa (target utama)','📚 Pelajar SMA/SMK','👩‍🏫 Guru & dosen','🔬 Peneliti & akademisi'] },
  { id: 'cost-structure',     title: 'Cost Structure',      emoji: '💰', accent: '#f59e0b',
    items: ['Biaya internet bulanan','Listrik & operasional','Biaya promosi digital','Transportasi (jika diperlukan)','Langganan Microsoft Office'] },
  { id: 'revenue-streams',    title: 'Revenue Streams',     emoji: '📈', accent: '#ef4444',
    items: ['Jasa pengetikan dokumen','Editing & proofreading','Formatting laporan/skripsi','Bantuan skripsi & proposal','Sitasi & daftar pustaka','Konversi PDF ↔ Word'] },
]

const services = [
  { icon: '⌨️', name: 'Pengetikan Dokumen',     desc: 'Laporan, makalah, tugas kuliah diketik rapi dan cepat',             price: 'Rp 5.000/hal',   popular: false },
  { icon: '✏️', name: 'Editing & Proofreading', desc: 'Koreksi tata bahasa, ejaan, dan gaya penulisan ilmiah',             price: 'Rp 3.000/hal',   popular: false },
  { icon: '📐', name: 'Formatting Profesional', desc: 'Penataan margin, heading, daftar isi otomatis, dan layout rapi',    price: 'Rp 15.000/dok',  popular: true  },
  { icon: '🎓', name: 'Skripsi & Proposal',     desc: 'Bantuan pengetikan, editing, dan formatting skripsi lengkap',       price: 'Hubungi kami',   popular: true  },
  { icon: '📑', name: 'Sitasi & Daftar Pustaka',desc: 'APA, IEEE, Vancouver, Harvard, dan berbagai gaya lainnya',          price: 'Rp 10.000',      popular: false },
  { icon: '🔄', name: 'Konversi PDF ↔ Word',   desc: 'Konversi dokumen dengan hasil layout yang tetap sempurna',          price: 'Rp 5.000/dok',   popular: false },
]

const personas = [
  {
    name: 'Rina Aulia', age: 20, role: 'Mahasiswa Teknik Semester 4',
    avatar: '👩‍💻', color: '#6366f1',
    pain: 'Laporan praktikum terlalu banyak dan format institusi sangat ketat. Sering kena nilai minus karena margin dan heading tidak sesuai.',
    gain: 'Butuh jasa formatting cepat dengan harga miring sebelum deadline jam 11 malam.',
    quote: '"Udah capek ngerjain praktikum, giliran ngeformat malah bingung lagi."',
    tags: ['#LaporanPraktikum', '#Formatting', '#Deadline'],
  },
  {
    name: 'Dimas Pratama', age: 23, role: 'Mahasiswa Akhir — Prodi Manajemen',
    avatar: '👨‍🎓', color: '#10b981',
    pain: 'Proposal skripsi sudah ditolak dua kali karena penulisan dan sitasi yang tidak konsisten. Tidak punya waktu belajar APA style dari nol.',
    gain: 'Perlu partner yang paham format akademik dan bisa diajak konsultasi kapan saja.',
    quote: '"Deadline skripsi tinggal 2 bulan, banyak yang harus dibenerin tapi nggak tahu mulai dari mana."',
    tags: ['#Skripsi', '#APAStyle', '#Proposal'],
  },
]

const instagramPosts = [
  { type: 'Promo', tag: '🎉 GRAND OPENING', gradient: 'linear-gradient(135deg,#667eea,#764ba2)',
    title: 'DISKON 50% untuk 20 Pelanggan Pertama!',
    body: 'TaskHelper resmi hadir! Jasa pengetikan & formatting dokumen profesional untuk mahasiswa. Fast response, harga bersahabat, hasil memuaskan.',
    cta: 'Hubungi sekarang via WhatsApp atau Google Form 👇',
    hashtags: '#TaskHelper #JasaKetik #MahasiswaBisa #TugasRapi', likes: '342', comments: '58' },
  { type: 'Portfolio', tag: '✅ BEFORE & AFTER', gradient: 'linear-gradient(135deg,#1D6FEB,#10B981)',
    title: 'Laporan Praktikum jadi rapi dalam 3 jam!',
    body: 'Dari dokumen berantakan → format sesuai panduan institusi, daftar isi otomatis, heading konsisten, margin sempurna.',
    cta: 'Mau hasil serupa? DM atau klik link di bio 📩',
    hashtags: '#FormattingDokumen #SkripsiRapi #TaskHelper', likes: '521', comments: '92' },
  { type: 'Price List', tag: '💰 PRICE LIST', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)',
    title: 'Harga Transparan, Kualitas Terjamin ✨',
    body: '⌨️ Pengetikan: Rp 5.000/hal\n✏️ Editing: Rp 3.000/hal\n📐 Formatting: Rp 15.000/dok\n📑 Sitasi: Rp 10.000\n🔄 Konversi: Rp 5.000/dok',
    cta: '🎁 Revisi GRATIS & Konsultasi GRATIS!',
    hashtags: '#PriceList #JasaMahasiswa #TugasRapiNilaiLebihPasti', likes: '689', comments: '124' },
]

const marqueeItems = [
  '⌨️ Pengetikan Dokumen', '✏️ Editing & Proofreading', '📐 Formatting Profesional',
  '🎓 Skripsi & Proposal', '📑 Sitasi APA/IEEE', '🔄 Konversi PDF', '⚡ Fast Response',
  '✅ Revisi Gratis', '💬 Konsultasi Gratis', '🔒 Privasi Terjaga',
]

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const close = () => setOpen(false)
  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Navigasi utama">
      <div className="nav-inner">
        <a href="#home" className="nav-brand" onClick={close} aria-label="TaskHelper - Beranda">
          <div className="logo-mark" aria-hidden="true">
            <span>📄</span>
            <span className="logo-check-dot">✓</span>
          </div>
          <div className="brand-text">
            <span className="brand-name">TaskHelper</span>
            <span className="brand-tag">Tugas Rapi, Nilai Lebih Pasti</span>
          </div>
        </a>
        <ul className="nav-links" role="list">
          {[['#bmc','BMC'],['#layanan','Layanan'],['#persona','Persona'],['#medsos','Medsos']].map(([h,l]) => (
            <li key={h}><a href={h}>{l}</a></li>
          ))}
          <li><a href="#kontak" className="nav-cta">Pesan Sekarang 🚀</a></li>
        </ul>
        <button className={`hamburger${open ? ' open' : ''}`} onClick={() => setOpen(!open)}
          aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open}>
          <span /><span /><span />
        </button>
      </div>
      <div className={`mobile-menu${open ? ' open' : ''}`} aria-hidden={!open}>
        {[['#bmc','📊 BMC'],['#layanan','🛠️ Layanan'],['#persona','👥 Persona'],['#medsos','📱 Media Sosial'],['#kontak','🚀 Pesan Sekarang']].map(([h,l]) => (
          <a href={h} key={h} onClick={close}>{l}</a>
        ))}
      </div>
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="grid-lines" />
      </div>
      <div className="hero-content">
        <div className="hero-pill animate-fade-up" style={{'--d':'0ms'}}>
          <span className="pill-dot" aria-hidden="true" />
          <span>🎓 Dipercaya 200+ Mahasiswa Se-Indonesia</span>
        </div>
        <h1 id="hero-heading" className="animate-fade-up" style={{'--d':'100ms'}}>
          <span className="grad-title">TaskHelper</span><br/>
          <span className="hero-sub">Solusi Dokumen Akademik</span><br/>
        </h1>
        <p className="hero-desc animate-fade-up" style={{'--d':'200ms'}}>
          Jasa pengetikan, editing, formatting, dan bantuan skripsi untuk mahasiswa.
          <br className="br-hide" />Fast response · Revisi gratis · Hasil memuaskan.
        </p>
        <div className="hero-tagline-wrap animate-fade-up" style={{'--d':'280ms'}}>
          <span className="hero-tagline">"Tugas Rapi, Nilai Lebih Pasti"</span>
        </div>
        <div className="hero-actions animate-fade-up" style={{'--d':'360ms'}}>
          <a href="#kontak" className="btn-primary">Pesan Sekarang 🚀</a>
          <a href="#layanan" className="btn-ghost">Lihat Layanan →</a>
        </div>
        <div className="hero-stats animate-fade-up" style={{'--d':'440ms'}} role="list" aria-label="Statistik layanan">
          {[['500+','Tugas Selesai'],['200+','Pelanggan Puas'],['4.9★','Rating'],['<24 Jam','Pengerjaan']].map(([n,l]) => (
            <div className="stat-pill" key={l} role="listitem">
              <strong>{n}</strong><span>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────
function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee-track">
        {items.map((t, i) => <span className="marquee-item" key={i}>{t}</span>)}
      </div>
    </div>
  )
}

// ─── BRANDING ─────────────────────────────────────────────────────────────────
function BrandingSection() {
  const [ref, inView] = useInView()
  return (
    <section className="section branding-section" id="branding" ref={ref}
      aria-labelledby="branding-heading">
      <div className="section-inner">
        <div className={`section-header${inView ? ' visible' : ''}`}>
          <span className="chip">✦ Identitas Merek</span>
          <h2 id="branding-heading">Branding <span className="grad">TaskHelper</span></h2>
          <p>Identitas visual yang mencerminkan profesionalisme, kepercayaan, dan solusi.</p>
        </div>
        <div className={`branding-grid${inView ? ' visible' : ''}`}>
          <div className="brand-showcase">
            <div className="brand-logo-card">
              <div className="brand-glow" aria-hidden="true" />
              <div className="brand-logo-inner" aria-label="Logo TaskHelper">
                <div className="brand-icon-wrap" aria-hidden="true">
                  <span className="brand-doc">📄</span>
                  <span className="brand-check">✓</span>
                </div>
                <div className="brand-wordmark">
                  <span className="wm-task">Task</span><span className="wm-helper">Helper</span>
                </div>
                <div className="brand-slogan">"Tugas Rapi, Nilai Lebih Pasti"</div>
              </div>
            </div>
            <div className="brand-identity-card">
              <h3>📋 Brand Identity</h3>
              <div className="identity-rows">
                {[
                  ['Nama Bisnis','TaskHelper'],
                  ['Tagline','"Tugas Rapi, Nilai Lebih Pasti"'],
                  ['Konsep Logo','Dokumen + Checklist ✓'],
                  ['Warna Biru','Profesional & Terpercaya'],
                  ['Warna Hijau','Solutif & Growth Mindset'],
                ].map(([k,v]) => (
                  <div className="identity-row" key={k}>
                    <span className="id-key">{k}</span>
                    <span className="id-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="brand-colors-col">
            <div className="colors-card">
              <h3>🎨 Palet Warna</h3>
              <div className="swatches">
                {[
                  { name:'Biru Utama',    hex:'#1D6FEB', meaning:'Profesional & Terpercaya' },
                  { name:'Hijau Aksen',   hex:'#10B981', meaning:'Solutif & Segar' },
                  { name:'Indigo',        hex:'#6366F1', meaning:'Kreatif & Modern' },
                  { name:'Gelap',         hex:'#1E293B', meaning:'Teks & Kontras' },
                ].map(c => (
                  <div className="swatch-row" key={c.name}>
                    <div className="swatch-block" style={{background:c.hex}} aria-label={c.name} />
                    <div className="swatch-info">
                      <strong>{c.name}</strong>
                      <span className="swatch-hex">{c.hex}</span>
                      <span className="swatch-mean">{c.meaning}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="typography-card">
              <h3>🔤 Tipografi & Gaya</h3>
              <div className="typo-samples">
                <div className="typo-h1">TaskHelper</div>
                <div className="typo-h2">Dokumen Profesional</div>
                <div className="typo-body">Teks body bersih dan mudah dibaca untuk semua platform.</div>
                <div className="typo-caps">HEADING CAPS · TRACKING</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── BMC ──────────────────────────────────────────────────────────────────────
function BMCSection() {
  const [ref, inView] = useInView()
  return (
    <section className="section bmc-section" id="bmc" ref={ref} aria-labelledby="bmc-heading">
      <div className="section-inner">
        <div className={`section-header${inView ? ' visible' : ''}`}>
          <span className="chip chip-dark">✦ Business Model Canvas</span>
          <h2 id="bmc-heading">Model Bisnis <span className="grad">TaskHelper</span></h2>
          <p>Kerangka bisnis yang menggambarkan bagaimana TaskHelper menciptakan, menyampaikan, dan menangkap nilai.</p>
        </div>
        <div className="bmc-grid" role="list" aria-label="Business Model Canvas">
          {bmcData.map((card, i) => (
            <div className={`bmc-card${inView ? ' visible' : ''}`} key={card.id} id={card.id} role="listitem"
              style={{'--accent': card.accent, '--delay': `${i * 60}ms`}}>
              <div className="bmc-top">
                <div className="bmc-icon-wrap" aria-hidden="true">
                  <span>{card.emoji}</span>
                </div>
                <h3>{card.title}</h3>
              </div>
              <ul className="bmc-items" role="list">
                {card.items.map(item => (
                  <li key={item}>
                    <span className="bmc-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bmc-bar" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function ServicesSection() {
  const [ref, inView] = useInView()
  return (
    <section className="section services-section" id="layanan" ref={ref}
      aria-labelledby="services-heading">
      <div className="section-inner">
        <div className={`section-header${inView ? ' visible' : ''}`}>
          <span className="chip">✦ Revenue Streams</span>
          <h2 id="services-heading">Layanan <span className="grad">Kami</span></h2>
          <p>Semua kebutuhan dokumen akademikmu tersedia di sini dengan harga terjangkau.</p>
        </div>
        <div className="services-grid" role="list" aria-label="Daftar layanan">
          {services.map((s, i) => (
            <div className={`service-card${s.popular ? ' popular' : ''}${inView ? ' visible' : ''}`}
              key={s.name} role="listitem" style={{'--delay': `${i * 80}ms`}}>
              {s.popular && <div className="popular-badge" aria-label="Paling populer">⭐ Populer</div>}
              <div className="service-icon-bg" aria-hidden="true">
                <span className="service-icon">{s.icon}</span>
              </div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
              <div className="service-price-tag">{s.price}</div>
            </div>
          ))}
        </div>
        <div className={`services-features${inView ? ' visible' : ''}`} role="note"
          style={{'--delay': '480ms'}}>
          {['✅ Revisi Gratis','⚡ Fast Response','🎓 Konsultasi Gratis','🔒 Privasi Terjaga'].map(f => (
            <div className="feature-pill" key={f}>{f}</div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── PERSONAS ──────────────────────────────────────────────────────────────────
function PersonaSection() {
  const [ref, inView] = useInView()
  return (
    <section className="section persona-section" id="persona" ref={ref}
      aria-labelledby="persona-heading">
      <div className="section-inner">
        <div className={`section-header${inView ? ' visible' : ''}`}>
          <span className="chip chip-dark">✦ Customer Persona</span>
          <h2 id="persona-heading">Mengenal <span className="grad">Pelanggan Kami</span></h2>
          <p>Profil nyata mahasiswa yang kami bantu setiap harinya untuk meraih prestasi terbaik.</p>
        </div>
        <div className="persona-grid">
          {personas.map((p, i) => (
            <article className={`persona-card${inView ? ' visible' : ''}`} key={p.name}
              aria-labelledby={`persona-${p.name}`} style={{'--delay': `${i * 150}ms`, '--color': p.color}}>
              <div className="persona-header">
                <div className="persona-avatar-wrap" aria-hidden="true">
                  <div className="avatar-ring" />
                  <span className="avatar-emoji">{p.avatar}</span>
                </div>
                <div className="persona-meta">
                  <h3 id={`persona-${p.name}`}>{p.name}</h3>
                  <span className="persona-age">{p.age} tahun</span>
                  <span className="persona-role-tag">{p.role}</span>
                </div>
              </div>
              <blockquote className="persona-quote">{p.quote}</blockquote>
              <div className="persona-box pain-box">
                <h4>😓 Pain Points</h4>
                <p>{p.pain}</p>
              </div>
              <div className="persona-box gain-box">
                <h4>🎯 Yang Dibutuhkan</h4>
                <p>{p.gain}</p>
              </div>
              <div className="persona-tags" role="list" aria-label="Tag persona">
                {p.tags.map(tag => <span className="p-tag" key={tag} role="listitem">{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SOCIAL MEDIA ──────────────────────────────────────────────────────────────
function SocialMediaSection() {
  const [ref, inView] = useInView()
  return (
    <section className="section social-section" id="medsos" ref={ref}
      aria-labelledby="social-heading">
      <div className="section-inner">
        <div className={`section-header${inView ? ' visible' : ''}`}>
          <span className="chip">✦ Media Sosial Bisnis</span>
          <h2 id="social-heading">Konten Instagram <span className="grad">@taskhelper.id</span></h2>
          <p>Contoh konten yang digunakan untuk menarik dan menginformasikan pelanggan.</p>
        </div>
        <div className={`social-channels${inView ? ' visible' : ''}`} role="list"
          aria-label="Platform media sosial">
          {[
            { icon:'📸', name:'Instagram',          handle:'@taskhelper.id',        grad:'linear-gradient(135deg,#f093fb,#f5576c)' },
            { icon:'💬', name:'WhatsApp Business',  handle:'TaskHelper Official',   grad:'linear-gradient(135deg,#11998e,#38ef7d)' },
            { icon:'🎵', name:'TikTok',             handle:'@taskhelper.id',        grad:'linear-gradient(135deg,#667eea,#764ba2)' },
            { icon:'📋', name:'Google Form',        handle:'Form Order Online',     grad:'linear-gradient(135deg,#1D6FEB,#10B981)' },
          ].map((ch, i) => (
            <div className="social-chip" key={ch.name} role="listitem"
              style={{'--grad': ch.grad, '--delay': `${i * 80}ms`}}>
              <span className="sc-icon" aria-hidden="true">{ch.icon}</span>
              <div className="sc-text">
                <strong>{ch.name}</strong>
                <span>{ch.handle}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="ig-posts-grid" role="list" aria-label="Contoh konten Instagram">
          {instagramPosts.map((post, i) => (
            <article className={`ig-card${inView ? ' visible' : ''}`} key={post.type}
              aria-labelledby={`post-${post.type}`}
              style={{'--grad': post.gradient, '--delay': `${i * 100}ms`}}>
              <div className="ig-card-header">
                <div className="ig-profile-row">
                  <div className="ig-avatar-circle" aria-hidden="true">TH</div>
                  <div className="ig-profile-text">
                    <strong>taskhelper.id</strong>
                    <span>Sponsored</span>
                  </div>
                </div>
                <span className="ig-badge">{post.tag}</span>
              </div>
              <div className="ig-card-body">
                <h3 id={`post-${post.type}`}>{post.title}</h3>
                <p className="ig-text">{post.body}</p>
                <p className="ig-cta-text">{post.cta}</p>
              </div>
              <div className="ig-card-footer">
                <div className="ig-stats" aria-label="Statistik postingan" role="group">
                  <span title="Suka">❤️ {post.likes}</span>
                  <span title="Komentar">💬 {post.comments}</span>
                  <span title="Bagikan">📤 Bagikan</span>
                </div>
                <p className="ig-tags">{post.hashtags}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CONCLUSION ────────────────────────────────────────────────────────────────
function ConclusionSection() {
  const [ref, inView] = useInView()
  return (
    <section className="section conclusion-section" id="kesimpulan" ref={ref}
      aria-labelledby="conclusion-heading">
      <div className="section-inner">
        <div className={`section-header${inView ? ' visible' : ''}`}>
          <span className="chip chip-dark">✦ Kesimpulan</span>
          <h2 id="conclusion-heading">Peluang Bisnis yang <span className="grad">Menjanjikan</span></h2>
        </div>
        <div className="conclusion-layout">
          <div className={`conclusion-text-block${inView ? ' visible' : ''}`} style={{'--delay':'0ms'}}>
            <p><strong>TaskHelper</strong> hadir sebagai solusi nyata atas kebutuhan jutaan mahasiswa Indonesia yang memerlukan bantuan pengetikan dan pengaturan format dokumen akademik.</p>
            <p>Dengan keunggulan <strong>harga terjangkau</strong>, <strong>proses cepat</strong>, dan <strong>hasil dokumen profesional</strong>, TaskHelper memiliki proposisi nilai yang kuat di segmen pasar mahasiswa yang terus tumbuh.</p>
            <p>Didukung ekosistem digital Instagram, WhatsApp Business, dan TikTok serta komunitas mahasiswa, TaskHelper punya jalur distribusi efektif dengan biaya operasional yang efisien.</p>
            <div className="market-stat">
              <span className="market-num">8+ Juta</span>
              <span className="market-label">Mahasiswa aktif di Indonesia — pasar yang terus berkembang</span>
            </div>
          </div>
          <div className={`conclusion-cards${inView ? ' visible' : ''}`} style={{'--delay':'150ms'}}>
            {[
              { icon:'💰', title:'Harga Terjangkau',  desc:'Disesuaikan dengan kantong mahasiswa' },
              { icon:'⚡', title:'Proses Cepat',       desc:'Pengerjaan kurang dari 24 jam' },
              { icon:'🏆', title:'Hasil Profesional',  desc:'Kualitas setara jasa premium' },
              { icon:'🔄', title:'Revisi Gratis',      desc:'Sampai pelanggan benar-benar puas' },
              { icon:'📈', title:'Pasar Besar',        desc:'8+ juta mahasiswa aktif' },
              { icon:'🤝', title:'Kepercayaan',        desc:'Dibangun dari pelayanan terbaik' },
            ].map((pt, i) => (
              <div className="concl-card" key={pt.title}
                style={{'--delay': `${150 + i * 60}ms`}}>
                <span className="concl-icon" aria-hidden="true">{pt.icon}</span>
                <div>
                  <strong>{pt.title}</strong>
                  <span>{pt.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const [ref, inView] = useInView()
  return (
    <section className="section contact-section" id="kontak" ref={ref}
      aria-labelledby="contact-heading">
      <div className="section-inner">
        <div className={`contact-card${inView ? ' visible' : ''}`}>
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-content">
            <div className="contact-badge" aria-hidden="true">🚀</div>
            <h2 id="contact-heading">Siap Mulai?<br />Hubungi Kami Sekarang!</h2>
            <p>Konsultasi gratis, tidak ada biaya tersembunyi. Kami siap bantu tugasmu menjadi sempurna.</p>
            <div className="contact-btns" role="group" aria-label="Opsi kontak">
              <a href="https://wa.me/6281234567890" className="cta-wa"
                target="_blank" rel="noopener noreferrer">
                <span>💬</span> WhatsApp Sekarang
              </a>
              <a href="https://instagram.com/taskhelper.id" className="cta-ig"
                target="_blank" rel="noopener noreferrer">
                <span>📸</span> Instagram Kami
              </a>
            </div>
            <div className="contact-meta">
              <span>⏰ Setiap hari 08.00 – 23.00 WIB</span>
              <span>⚡ Respon dalam 5 menit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo-mark" aria-hidden="true">📄<span>✓</span></div>
            <div>
              <strong>TaskHelper</strong>
              <span>"Tugas Rapi, Nilai Lebih Pasti"</span>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="footer-links" role="list">
              {[['#bmc','BMC'],['#layanan','Layanan'],['#persona','Persona'],['#medsos','Medsos'],['#kontak','Kontak']].map(([h,l]) => (
                <li key={h}><a href={h}>{l}</a></li>
              ))}
            </ul>
          </nav>
          <div className="footer-socials" aria-label="Media sosial">
            {[['💬','WhatsApp','https://wa.me/6281234567890'],['📸','Instagram','https://instagram.com/taskhelper.id'],['🎵','TikTok','#']].map(([ic,nm,hr]) => (
              <a href={hr} key={nm} className="footer-social-btn"
                target="_blank" rel="noopener noreferrer" aria-label={nm}>
                {ic}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 TaskHelper. Dibuat dengan ❤️ untuk mahasiswa Indonesia.</p>
          <p>Semua harga dapat berubah sewaktu-waktu. Hubungi kami untuk info terkini.</p>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────────
function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Langsung ke konten</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Marquee />
        <BrandingSection />
        <BMCSection />
        <ServicesSection />
        <PersonaSection />
        <SocialMediaSection />
        <ConclusionSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

export default App
