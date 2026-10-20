<template>
  <header class="header">
    <a href="#top" class="logo"><span class="hanko">桜</span> Sakura</a>
    <nav>
      <a href="#philosophie" class="nav-link">Philosophie</a>
      <a href="#saisons" class="nav-link">Les trois temps</a>
      <a href="#hanami" class="pill">Réserver</a>
    </nav>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.4rem clamp(1.2rem, 4vw, 3.5rem);
  font-size: 0.9rem;
}
nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}
a {
  position: relative;
}
.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.08em;
}
.hanko {
  display: inline-grid;
  place-items: center;
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 3px;
  background: var(--shu);
  color: var(--washi);
  font-size: 1.05rem;
  transform: rotate(-4deg);
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 1px;
  background: var(--shu);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease);
}
.nav-link:hover::after {
  transform: scaleX(1);
}
.pill {
  padding: 0.45rem 1.1rem;
  border: 1px solid var(--sumi);
  border-radius: 99px;
  transition: background 0.3s, color 0.3s;
}
.pill:hover {
  background: var(--sumi);
  color: var(--washi);
}

@media (max-width: 700px) {
  .nav-link {
    display: none;
  }
}
</style>
