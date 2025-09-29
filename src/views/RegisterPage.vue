<!--UX/UI de la vue-->
<template>
  <div class="login uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <div class="uk-width-medium uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
      <div class="uk-text-center uk-margin"></div>
      <form @submit.prevent="handleRegister" class="toggle-class">
        <fieldset class="uk-fieldset">
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: mail"></span>
              <input class="uk-input uk-border-pill" required placeholder="Email" type="email" v-model="email" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input class="uk-input uk-border-pill" required placeholder="Mot de passe" type="password" v-model="password" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: lock"></span>
              <input class="uk-input uk-border-pill" required placeholder="Confirmer le mot de passe" type="password" v-model="passwordConfirm" />
            </div>
          </div>
          <div class="uk-margin-small">
            <div class="uk-inline uk-width-1-1">
              <span class="uk-form-icon uk-form-icon-flip" data-uk-icon="icon: user"></span>
              <input class="uk-input uk-border-pill" required placeholder="Champ supplémentaire" type="text" v-model="fieldfield" />
            </div>
          </div>
          <div class="uk-margin-bottom">
            <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1" :disabled="loading">
              <span v-if="loading" class="uk-margin-small-right" data-uk-spinner="ratio: 0.5"></span>
              CRÉER LE COMPTE
            </button>
          </div>
          <div v-if="error" class="uk-alert-danger uk-padding-small uk-margin-small" uk-alert>
            {{ error }}
          </div>
        </fieldset>
      </form>
      <div class="uk-text-center uk-margin-small">
        <router-link class="uk-link-reset uk-text-small" to="/">Déjà un compte ? Se connecter</router-link>
      </div>
    </div>
  </div>
</template>

<!--Partie logique de la vue-->
<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      fieldfield: "",
      loading: false,
      error: ""
    };
  },
  methods: {
    async handleRegister() {
      this.loading = true;
      this.error = "";
      try {
        const response = await fetch("http://127.0.0.1:3000/signup", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            fieldfield: this.fieldfield
          })
        });
        const data = await response.json();
        if (data.code === "success") {
          // Redirection directe vers la liste des articles
          this.$router.push("/liste-articles");
        } else {
          this.error = data.message || "Erreur lors de la création du compte";
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