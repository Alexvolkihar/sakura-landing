<template>
  <section id="top" class="hero">
    <p class="vertical" aria-hidden="true">桜の下で</p>

    <div class="copy">
      <p class="eyebrow">花見 · Hanami</p>
      <h1>
        <span class="line"><span>L’instant</span></span>
        <span class="line"><span>avant la <em>chute</em></span></span>
      </h1>
      <p class="lead">
        Une pause d’une saison, sous les cerisiers en fleur. Chaque année, quelques jours seulement —
        et c’est précisément pour ça que l’on regarde.
      </p>
      <div class="actions">
        <a href="#hanami" class="btn">Rejoindre le hanami</a>
        <a href="#philosophie" class="link">Comprendre l’idée →</a>
      </div>
    </div>

    <div class="scroll-cue" aria-hidden="true"><span /></div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  display: grid;
  align-items: center;
  min-height: 100svh;
  padding: 7rem clamp(1.2rem, 8vw, 8rem) 4rem;
}
.copy {
  max-width: 46rem;
}

h1 {
  font-family: var(--serif);
  font-size: clamp(2.8rem, 8vw, 6.6rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: -0.01em;
}
.line {
  display: block;
  padding-bottom: 0.08em;
  overflow: hidden;
}
.line > span {
  display: block;
  transform: translateY(110%);
  animation: rise 1.3s var(--ease) forwards;
}
.line:nth-child(2) > span {
  animation-delay: 0.15s;
}
em {
  font-style: normal;
  color: var(--sakura-deep);
}

.lead,
.actions,
.vertical {
  opacity: 0;
  animation: fade 1.2s var(--ease) forwards;
}
.lead {
  max-width: 34rem;
  margin-top: 2rem;
  font-size: 1.1rem;
  color: var(--sumi-soft);
  animation-delay: 0.7s;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  margin-top: 2.6rem;
  animation-delay: 0.95s;
}
.link {
  padding-bottom: 2px;
  border-bottom: 1px solid var(--sumi-soft);
  transition: color 0.3s, border-color 0.3s;
}
.link:hover {
  color: var(--shu);
  border-color: var(--shu);
}

.vertical {
  position: absolute;
  right: clamp(1.2rem, 9vw, 9rem);
  bottom: 14%;
  writing-mode: vertical-rl;
  font-family: var(--serif);
  font-size: clamp(1.4rem, 2.4vw, 2.2rem);
  letter-spacing: 0.4em;
  color: var(--sumi-soft);
  animation-duration: 1.6s;
  animation-delay: 1.4s;
}

.scroll-cue {
  position: absolute;
  left: 50%;
  bottom: 1.8rem;
  width: 1px;
  height: 3.2rem;
  overflow: hidden;
  background: rgba(31, 27, 26, 0.15);
}
.scroll-cue span {
  display: block;
  width: 100%;
  height: 40%;
  background: var(--sumi);
  animation: drip 2.2s var(--ease) infinite;
}

@keyframes rise { to { transform: translateY(0); } }
@keyframes fade { to { opacity: 1; } }
@keyframes drip {
  from { transform: translateY(-100%); }
  to { transform: translateY(260%); }
}

@media (max-width: 700px) {
  .vertical {
    display: none;
  }
}
</style>
