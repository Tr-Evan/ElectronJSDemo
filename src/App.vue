<template>

  <!--  Navigation-->
  <ul uk-tab>
    <li class="uk-active">
      <router-link to="/">Login</router-link>
    </li>
    <li>
      <router-link to="/liste-articles">Liste des articles</router-link>
    </li>
  </ul>

  <!-- Fonctionnement Vue pour en temps remplacer la page activer -->
  <router-view/>
</template>

<script setup lang="ts">
</script>