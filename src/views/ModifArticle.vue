<template>
  <div class="uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <div class="uk-width-large uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
      <div class="uk-text-center uk-margin">
        <h2 class="uk-heading-line uk-text-bold"><span>Modifier l'article</span></h2>
      </div>
      <form @submit.prevent="handleSave" class="uk-card uk-card-default uk-card-body uk-border-rounded uk-background-muted">
        <div class="uk-margin">
          <label class="uk-form-label">Titre</label>
          <input class="uk-input uk-border-pill" v-model="title" required />
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Description</label>
          <textarea class="uk-textarea uk-border-rounded" v-model="desc" required rows="3"></textarea>
        </div>
        <div class="uk-margin">
          <label class="uk-form-label">Auteur</label>
          <input class="uk-input uk-border-pill" v-model="author" required />
        </div>
        <div class="uk-margin">
          <button type="submit" class="uk-button uk-button-primary uk-border-pill uk-width-1-1" :disabled="loading">
            <span v-if="loading" class="uk-margin-small-right" data-uk-spinner="ratio: 0.5"></span>
            Enregistrer les modifications
          </button>
        </div>
        <div v-if="error" class="uk-alert-danger uk-padding-small uk-margin-small" uk-alert>
          {{ error }}
        </div>
        <div v-if="success" class="uk-alert-success uk-padding-small uk-margin-small" uk-alert>
          {{ success }}
        </div>
      </form>
      <div class="uk-text-center uk-margin">
        <router-link
          class="uk-button uk-button-default uk-border-pill"
          :to="{ name: 'DetailArticle', query: { id: id } }"
        >
          Retour à l'article
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModifArticle",
  data() {
    return {
      id: "",
      title: "",
      desc: "",
      author: "",
      loading: false,
      error: "",
      success: ""
    };
  },
  mounted() {
    this.fetchArticle();
  },
  methods: {
    async fetchArticle() {
      const id = this.$route.query.id || this.$route.params.id;
      if (!id) {
        this.error = "Aucun identifiant d'article fourni.";
        return;
      }
      this.loading = true;
      try {
        const response = await fetch(`http://127.0.0.1:3000/articles/${id}`, {
          headers: { accept: "application/json" }
        });
        const data = await response.json();
        if (data.code === "200") {
          this.id = data.data.id;
          this.title = data.data.title;
          this.desc = data.data.desc;
          this.author = data.data.author;
        } else {
          this.error = data.message || "Erreur lors de la récupération de l'article";
        }
      } catch (e) {
        this.error = "Erreur de connexion au serveur";
      } finally {
        this.loading = false;
      }
    },
    async handleSave() {
      this.loading = true;
      this.error = "";
      this.success = "";
      try {
        const response = await fetch("http://127.0.0.1:3000/articles/save", {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: this.id,
            title: this.title,
            desc: this.desc,
            author: this.author
          })
        });
        const data = await response.json();
        if (data.code === "200") {
          this.success = "L'article a été modifié avec succès";
        } else {
          this.error = data.message || "Erreur lors de la modification";
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
.uk-card {
  margin-bottom: 16px;
}
.uk-border-rounded {
  border-radius: 12px;
}

/* Ajout pour rendre le texte et les champs bien visibles */
.uk-card,
.uk-form-label,
.uk-input,
.uk-textarea,
.uk-button,
.uk-card-title,
.uk-alert-danger,
.uk-alert-success {
  color: #111 !important;
}

.uk-input,
.uk-textarea {
  background: #fff !important;
  color: #111 !important;
  border: 1px solid #bbb;
}

.uk-input::placeholder,
.uk-textarea::placeholder {
  color: #888 !important;
  opacity: 1;
}

.uk-button-primary,
.uk-button-default {
  color: #111 !important;
  background: #e2e2e2 !important;
  border: 1px solid #bbb;
}

.uk-button-primary:hover,
.uk-button-default:hover {
  background: #d0d0d0 !important;
}
</style>