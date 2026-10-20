<template>
  <footer class="footer">
    <span>© 2026 Sakura</span>
    <span class="jp">また来年。</span>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 2rem clamp(1.2rem, 4vw, 3.5rem);
  background: var(--washi);
  font-size: 0.85rem;
  color: var(--sumi-soft);
}
.jp {
  font-family: var(--serif);
}
</style>
