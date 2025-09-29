<template>

  <!--  Navigation-->
  <ul uk-tab>
    <li class="uk-active">
      <router-link to="/">Login</router-link>
    </li>
    <li>
      <router-link to="/liste-articles">Liste des articles</router-link>
    </li>
    <li v-if="isLoggedIn">
      <a href="#" @click.prevent="logout">Se déconnecter</a>
    </li>
  </ul>

  <!-- Fonctionnement Vue pour en temps remplacer la page activer -->
  <router-view/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const isLoggedIn = computed(() => {
  if (typeof window === 'undefined') return false;
  return Boolean(localStorage.getItem('authToken') || sessionStorage.getItem('authToken'));
});

function logout() {
  try {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  } catch (e) { /* ignore */ }
  router.push('/');
}
</script>