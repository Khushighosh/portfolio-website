// ---------- Project data (edit here) ----------
// cat: hf = Hacktoberfest 2026. Add a `repo` URL to turn a card into a link.
const projects = [
  { title: 'Undead Agent', cat: ['hf', 'ai', 'fullstack'],
    desc: 'A local Gemma agent that survives being killed. Built on Temporal durable workflows, it resumes exactly where it died, with a React "morgue" dashboard and Sentry agent tracing.',
    tech: ['Ollama', 'Gemma', 'Temporal', 'React', 'Sentry'], tag: 'Hacktoberfest · Week 4' },
  { title: 'Let It Die', cat: ['hf', 'ai'],
    desc: 'Email triage agent that decides what to ignore and what to act on. Scores mail with TabPFN, summarises with a local Gemma model and parks decisions in Temporal. Tested on the public Enron corpus.',
    tech: ['Python', 'TabPFN', 'Ollama', 'Temporal', 'Sentry'], tag: 'Hacktoberfest · Week 3' },
  { title: 'Order Ledger', cat: ['hf', 'ai', 'fullstack'],
    desc: 'Turns messy WhatsApp order chats (English, Hinglish, Kanglish) into structured orders, delivery schedules and pending payments for small sellers. Runs on a local model; qwen2.5:7b got 11 of 12 test orders fully right.',
    tech: ['Python', 'Ollama', 'qwen2.5', 'Web App'], repo: 'https://github.com/Khushighosh/Order-Ledger', tag: 'Hacktoberfest · Week 2' },
  { title: 'Same Spot', cat: ['hf', 'ai'],
    desc: 'Compares photos of the same place taken on different evenings with a local vision model and writes field notes about what changed.',
    tech: ['Python', 'Ollama', 'gemma3'], repo: 'https://github.com/Khushighosh/same-spot', tag: 'Hacktoberfest · Week 1' },
  { title: 'Study Buddy', cat: ['hf', 'ai'],
    desc: 'Offline exam-prep assistant built for a friend preparing for GATE. Answers questions and generates quizzes from her own notes using local embeddings and retrieval.',
    tech: ['Ollama', 'Embeddings', 'Chroma', 'SQLite'], repo: 'https://github.com/Khushighosh/study-buddy', tag: 'Hacktoberfest · Weekend' },
  { title: 'Mini ERP + CRM Operations Portal', cat: ['fullstack'],
    desc: 'Full-stack portal for customers, products, inventory and sales challans with role-based authentication. Built in 48 hours.',
    tech: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'React'], repo: 'https://github.com/Khushighosh/mini-erp-crm' },
  { title: 'GEN-AI Backend', cat: ['fullstack'],
    desc: 'Auth backend with a register, login and logout flow, JWT tokens and token blacklisting.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'], repo: 'https://github.com/Khushighosh/Gen-AI-project' },
  { title: 'Employee Leave & Attendance System', cat: ['fullstack'],
    desc: 'Attendance tracking, leave requests, an approval workflow, authentication and database management.',
    tech: ['Java', 'Spring Boot', 'REST API'] },
  { title: 'Bi-Directional Smart Communication System', cat: ['hardware', 'ai'],
    desc: 'Final-year major project: a sensor glove (5 flex sensors + IMU) that helps deaf and non-speaking hospital patients communicate, with ML sign recognition and an ISL avatar.',
    tech: ['ESP32', 'MPU6050', 'Raspberry Pi 5', 'ML'], status: 'In progress' },
  { title: 'Smart Helmet for Heavy Machinery Safety', cat: ['hardware'],
    desc: 'Helmet that predicts collisions around heavy machinery using UWB/BLE positioning and an IMU, with an IoT dashboard.',
    tech: ['UWB/BLE', 'IMU', 'IoT'] },
  { title: 'Personal Portfolio Website', cat: ['fullstack'],
    desc: 'This site: plain HTML, CSS and JavaScript, light and dark mode, no build step.',
    tech: ['HTML', 'CSS', 'JavaScript'], repo: 'https://github.com/Khushighosh/portfolio-website' }
];

// ---------- Writing (add `url` once a post is live) ----------
const posts = [
  { title: 'Local LLMs on a CPU-only laptop',
    desc: 'Honest timings from an i7 with 16 GB RAM and no GPU, measured while building Study Buddy and Order Ledger, plus what to change to make it usable.' },
  { title: 'How HTTPS actually works',
    desc: 'One request, followed from the browser to the server: DNS, TCP, the TLS handshake and what the padlock really guarantees.' }
];

const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const grid = document.getElementById('projectGrid');

function renderProjects(filter = 'all') {
  grid.innerHTML = projects
    .filter(p => filter === 'all' || p.cat.includes(filter))
    .map(p => {
      const inner = `
        ${p.tag ? `<span class="eyebrow" style="font-size:12px">${esc(p.tag)}</span>` : ''}
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="chips small">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        <span class="cta-link">${p.repo ? 'View repository ↗' : (p.status || 'Repository coming soon')}</span>`;
      return p.repo
        ? `<a class="card" href="${p.repo}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="card static">${inner}</div>`;
    }).join('');
}

document.getElementById('postGrid').innerHTML = posts.map(p => {
  const inner = `<h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
    <span class="cta-link">${p.url ? 'Read on DEV ↗' : 'Coming soon on DEV'}</span>`;
  return p.url
    ? `<a class="card" href="${p.url}" target="_blank" rel="noopener">${inner}</a>`
    : `<div class="card static">${inner}</div>`;
}).join('');

document.getElementById('tabs').addEventListener('click', e => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === tab));
  renderProjects(tab.dataset.filter);
});
renderProjects();

// ---------- Smooth scrolling ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    e.preventDefault();
    section.scrollIntoView({ behavior: 'smooth' });
    history.pushState(null, '', link.getAttribute('href'));
  });
});

// ---------- Light / dark mode ----------
document.getElementById('themeToggle').addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ---------- Scroll reveal + active nav link ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('show'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

const navLinks = document.querySelectorAll('.links a');
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section').forEach(s => spy.observe(s));
