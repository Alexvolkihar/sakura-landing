<script setup>
import { seasons } from '../content'
</script>

<template>
  <section id="saisons" class="seasons">
    <h2 v-reveal>Les trois temps du sakura</h2>
    <ol>
      <li v-for="(season, i) in seasons" :key="season.romaji" v-reveal="i * 120">
        <span class="kanji" aria-hidden="true">{{ season.kanji }}</span>
        <span class="romaji">{{ season.romaji }}</span>
        <h3>{{ season.title }}</h3>
        <p>{{ season.text }}</p>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.seasons {
  padding: clamp(5rem, 12vw, 10rem) clamp(1.2rem, 8vw, 8rem);
  background: var(--washi-deep);
}
h2 {
  margin-bottom: 4rem;
  font-family: var(--serif);
  font-size: clamp(1.8rem, 4vw, 3rem);
  font-weight: 500;
  text-align: center;
}
ol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(1.5rem, 3vw, 3rem);
  max-width: 70rem;
  margin-inline: auto;
  list-style: none;
}
li {
  padding: 2.4rem 1.8rem 2rem;
  border-top: 2px solid var(--sumi);
  background: rgba(246, 240, 230, 0.7);
}
li:nth-child(2) {
  margin-top: 3rem;
}
li.is-visible:hover {
  background: var(--washi);
  transform: translateY(-8px);
  transition: transform 0.6s var(--ease), background 0.4s;
}
.kanji {
  display: block;
  font-family: var(--serif);
  font-size: 3.6rem;
  line-height: 1;
  color: var(--sakura-deep);
}
.romaji {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--sumi-soft);
}
h3 {
  margin: 1.2rem 0 0.6rem;
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 500;
}
li p {
  font-size: 0.98rem;
  color: var(--sumi-soft);
}

@media (max-width: 700px) {
  li:nth-child(2) {
    margin-top: 0;
  }
}
</style>
