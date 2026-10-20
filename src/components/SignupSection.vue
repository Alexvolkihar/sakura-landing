<template>
  <section id="hanami" class="signup">
    <div v-reveal class="seal" aria-hidden="true">花</div>
    <h2 v-reveal>Rendez-vous<br />sous l’arbre</h2>
    <p v-reveal>Laissez votre adresse, nous vous prévenons dès que le premier bourgeon s’ouvre.</p>
    <!-- Demo only: the form is not wired to any backend. -->
    <form v-reveal @submit.prevent>
      <input type="email" placeholder="vous@exemple.fr" aria-label="Adresse e-mail" required />
      <button class="btn" type="submit">Me prévenir</button>
    </form>
  </section>
</template>

<style scoped>
.signup {
  padding: clamp(6rem, 14vw, 12rem) 1.2rem;
  text-align: center;
  background: linear-gradient(var(--washi-deep), var(--washi));
}
.seal {
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  margin: 0 auto 2rem;
  border-radius: 4px;
  background: var(--shu);
  color: var(--washi);
  font-family: var(--serif);
  font-size: 2.2rem;
  transform: rotate(5deg);
}
h2 {
  margin-bottom: 1.2rem;
  font-family: var(--serif);
  font-size: clamp(2.2rem, 6vw, 4.6rem);
  font-weight: 500;
  line-height: 1.15;
}
p {
  max-width: 28rem;
  margin: 0 auto 2.2rem;
  color: var(--sumi-soft);
}
form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
}
input {
  min-width: min(20rem, 100%);
  padding: 1rem 1.2rem;
  border: 0;
  border-bottom: 1px solid var(--sumi);
  border-radius: 0;
  outline: none;
  background: transparent;
  color: inherit;
  font: inherit;
  transition: border-color 0.3s;
}
input:focus-visible {
  border-color: var(--shu);
}
</style>
