<template>
  <div class="uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <div class="uk-width-large uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
      <div class="uk-text-center uk-margin">
        <h2 class="uk-heading-line uk-text-bold"><span>Détail de l'article</span></h2>
      </div>
      <div v-if="loading" class="uk-flex uk-flex-center uk-margin">
        <span data-uk-spinner="ratio: 2"></span>
      </div>
      <div v-if="error" class="uk-alert-danger uk-padding-small uk-margin-small" uk-alert>
        {{ error }}
      </div>
      <div v-if="article" class="uk-card uk-card-default uk-card-body uk-border-rounded uk-background-muted">
        <div class="uk-text-center uk-margin">
          <img :src="article.imgPath" alt="img" class="uk-border-circle" style="width:120px;height:120px;object-fit:cover;">
        </div>
        <h3 class="uk-card-title uk-text-center">{{ article.title }}</h3>
        <p class=" uk-text-center">ID : {{ article.id }}</p>
        <p class=" uk-text-center">Auteur : {{ article.author }}</p>
        <hr>
        <p class=" uk-text-center">{{ article.desc }}</p>
        <div style="position: absolute; top: 12px; right: 20px;">
          <button
            class="uk-button uk-button-danger"
            style="border-radius: 50%; width: 36px; height: 36px; padding: 0; font-size: 22px; line-height: 1;"
            @click="showDeleteModal = true"
            title="Supprimer l'article"
          >
            <span uk-icon="icon: close; ratio: 1.2"></span>
          </button>
        </div>
      </div>
      <div class="uk-text-center uk-margin">
        <router-link
          class="uk-button uk-button-primary uk-border-pill uk-margin-small-right"
          :to="{ name: 'ModifArticle', query: { id: article.id } }"
          v-if="article"
        >
          Modifier l'article
        </router-link>
        <router-link class="uk-button uk-button-default uk-border-pill" to="/liste-articles">
          Retour à la liste
        </router-link>
      </div>
    </div>
  </div>

  <!-- Pop-up de confirmation suppression -->
  <div v-if="showDeleteModal" uk-modal="bg-close: false" class="uk-flex uk-flex-center uk-flex-middle" style="position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:9999;background:rgba(0,0,0,0.5);">
    <div class="uk-card uk-card-default uk-card-body uk-border-rounded" style="min-width:300px;">
      <h3 class="uk-card-title uk-text-danger">Confirmer la suppression</h3>
      <p>Voulez-vous vraiment supprimer cet article ?</p>
      <div class="uk-flex uk-flex-right uk-margin">
        <button class="uk-button uk-button-default uk-margin-small-right" @click="showDeleteModal = false">Annuler</button>
        <button class="uk-button uk-button-danger" @click="deleteArticle">Supprimer</button>
      </div>
      <div v-if="deleteError" class="uk-alert-danger uk-padding-small uk-margin-small" uk-alert>
        {{ deleteError }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailArticle",
  data() {
    return {
      article: null,
      loading: false,
      error: "",
      showDeleteModal: false,
      deleteError: ""
    };
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      this.loading = true;
      this.error = "";
      const id = this.$route.query.id || this.$route.params.id;
      if (!id) {
        this.error = "Aucun identifiant d'article fourni.";
        this.loading = false;
        return;
      }
      try {
        const response = await fetch(`http://127.0.0.1:3000/articles/${id}`, {
          headers: { accept: "application/json" }
        });
        const data = await response.json();
        if (data.code === "200") {
          this.article = data.data;
        } else {
          this.error = data.message || "Erreur lors de la récupération de l'article";
        }
      } catch (e) {
        this.error = "Erreur de connexion au serveur";
      } finally {
        this.loading = false;
      }
    },
    async deleteArticle() {
      this.deleteError = "";
      try {
        const response = await fetch(`http://127.0.0.1:3000/articles/${this.article.id}`, {
          method: "DELETE",
          headers: { accept: "application/json" }
        });
        const data = await response.json();
        if (data.code === "200") {
          this.showDeleteModal = false;
          // Redirige vers la liste après suppression
          this.$router.push("/liste-articles");
        } else {
          this.deleteError = data.message || "Erreur lors de la suppression";
        }
      } catch (e) {
        this.deleteError = "Erreur de connexion au serveur";
      }
    }
  }
};
</script>

<style scoped>
.uk-card {
  margin-bottom: 16px;
}
.uk-border-rounded {
  border-radius: 12px;
}
</style>