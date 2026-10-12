document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const section = document.querySelector(targetId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', targetId);
    }
  });
});
