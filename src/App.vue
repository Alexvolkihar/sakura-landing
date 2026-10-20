<script setup>
import SakuraCanvas from './components/SakuraCanvas.vue'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import PhilosophySection from './components/PhilosophySection.vue'
import SeasonsSection from './components/SeasonsSection.vue'
import SignupSection from './components/SignupSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SakuraCanvas />
  <SiteHeader />
  <main>
    <HeroSection />
    <PhilosophySection />
    <SeasonsSection />
    <SignupSection />
  </main>
  <SiteFooter />
</template>
