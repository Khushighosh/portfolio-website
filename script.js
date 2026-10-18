// ---------- Project data (edit here) ----------
const projects = [
  { title: 'Order Ledger', cat: ['ai', 'fullstack'],
    desc: 'Turns messy WhatsApp order chats (English, Hinglish, Kanglish) into structured orders, schedules and pending payments using a local model.',
    tech: ['Python', 'Ollama', 'Web App'], repo: 'https://github.com/Khushighosh/Order-Ledger' },
  { title: 'Same Spot', cat: ['ai'],
    desc: 'Compares photos of the same place on different evenings with a local vision model and writes field notes about what changed.',
    tech: ['Python', 'Ollama', 'gemma3'], repo: 'https://github.com/Khushighosh/same-spot' },
  { title: 'Study Buddy', cat: ['ai'],
    desc: 'Exam-prep assistant built for a friend preparing for GATE. Answers questions and generates quizzes from your own notes, fully offline.',
    tech: ['Ollama', 'Embeddings', 'Chroma', 'SQLite'], repo: 'https://github.com/Khushighosh/study-buddy' },
  { title: 'Mini ERP + CRM Operations Portal', cat: ['fullstack'],
    desc: 'Full-stack portal to manage customers, products, inventory and sales challans with role-based authentication.',
    tech: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'React'], repo: 'https://github.com/Khushighosh/mini-erp-crm' },
  { title: 'GEN-AI Backend', cat: ['fullstack'],
    desc: 'Backend service with JWT authentication: register, login and logout flow with token blacklisting.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'], repo: 'https://github.com/Khushighosh/Gen-AI-project' },
  { title: 'Bi-Directional Smart Communication System', cat: ['hardware', 'ai'],
    desc: 'Final-year major project: a sensor glove that helps deaf and non-speaking hospital patients communicate, with ML sign recognition and an ISL avatar.',
    tech: ['ESP32', 'MPU6050', 'Raspberry Pi 5', 'ML'], status: 'In progress' },
  { title: 'Smart Helmet for Heavy Machinery Safety', cat: ['hardware'],
    desc: 'Helmet that predicts collisions around heavy machinery using UWB/BLE positioning and an IMU, with an IoT dashboard.',
    tech: ['UWB/BLE', 'IMU', 'IoT'] },
  { title: 'Employee Leave & Attendance System', cat: ['fullstack'],
    desc: 'Attendance tracking, leave requests, approval workflow, authentication and database management.',
    tech: ['Java', 'Spring Boot', 'REST API'] },
  { title: 'Personal Portfolio Website', cat: ['fullstack'],
    desc: 'This responsive, light/dark portfolio, deployed on GitHub Pages.',
    tech: ['HTML', 'CSS', 'JavaScript'], repo: 'https://github.com/Khushighosh/portfolio-website' }
];

const grid = document.getElementById('projectGrid');
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function renderProjects(filter = 'all') {
  grid.innerHTML = projects
    .filter(p => filter === 'all' || p.cat.includes(filter))
    .map(p => {
      const inner = `
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="chips small">${p.tech.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        <span class="cta-link">${p.repo ? 'View repository ↗' : (p.status || 'Repository coming soon')}</span>`;
      return p.repo
        ? `<a class="card" href="${p.repo}" target="_blank" rel="noopener">${inner}</a>`
        : `<div class="card static">${inner}</div>`;
    }).join('');
}

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
