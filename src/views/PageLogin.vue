<template>
  <div class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
      <div class="uk-text-center uk-margin">
      </div>
      <!-- login -->
      <form @submit.prevent="handleLogin" class="toggle-class">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input class="uk-input uk-border-pill" required placeholder="Email" type="email" v-model="email" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input class="uk-input uk-border-pill" required placeholder="Password" type="password" v-model="password" />
            </div>
          </div>
          <div class="uk-margin-small">
            <label><input class="uk-checkbox" type="checkbox" v-model="keepLogged" /> Garder ma session</label>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1" :disabled="loading">
              <span v-if="loading" class="uk-margin-small-right" data-uk-spinner="ratio: 0.5"></span>
              SE CONNECTER
            </button>
          </div>
          <div v-if="error" class="uk-alert-danger uk-padding-small uk-margin-small" uk-alert>
            {{ error }}
          </div>
        </fieldset>
      </form>
      <!-- /login -->
      <div class="uk-text-center uk-margin-small">
        <a class="uk-link-reset uk-text-small" href="#">Mot de passe oublié ?</a>
      </div>
      <div class="uk-text-center uk-margin-small">
        <router-link class="uk-link-reset uk-text-small" to="/register">
          Pas encore de compte ? <span class="uk-text-bold">Créer un compte</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      keepLogged: false,
      loading: false,
      error: ""
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = "";
      try {
        const response = await fetch("http://127.0.0.1:3000/login", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        const data = await response.json();
        if (data.code === "success") {
          // Stocker le token si besoin
          // Rediriger vers la page des articles
          this.$router.push("/liste-articles");
        } else {
          this.error = data.message || "Identifiants invalides";
        }
      } catch (e) {
        this.error = "Erreur de connexion au serveur";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.login {
  min-height: 100vh;
}
</style>