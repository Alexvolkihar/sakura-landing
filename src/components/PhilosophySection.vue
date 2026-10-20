<template>
  <section id="philosophie" class="philosophy">
    <div class="inner">
      <p v-reveal class="eyebrow">物の哀れ · Mono no aware</p>
      <blockquote v-reveal>
        La beauté n’est pas dans ce qui dure,<br />mais dans ce qui nous <em>traverse</em>.
      </blockquote>
      <p v-reveal class="body">
        Les Japonais ont un mot pour la tendresse mêlée de mélancolie que l’on éprouve devant les choses
        éphémères. Le cerisier en est l’emblème : une floraison éclatante, une dizaine de jours, puis la
        neige rose du sol.
      </p>
    </div>
  </section>
</template>

<style scoped>
.philosophy {
  padding: clamp(6rem, 16vw, 14rem) clamp(1.2rem, 8vw, 8rem);
  background: linear-gradient(var(--washi), var(--washi-deep));
}
.inner {
  max-width: 52rem;
  margin-inline: auto;
}
blockquote {
  margin-bottom: 2.4rem;
  font-family: var(--serif);
  font-size: clamp(1.8rem, 4.4vw, 3.4rem);
  line-height: 1.35;
}
em {
  font-style: normal;
  color: var(--sakura-deep);
}
.body {
  max-width: 36rem;
  font-size: 1.05rem;
  color: var(--sumi-soft);
}
</style>
