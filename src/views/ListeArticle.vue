<template>
  <div class="uk-cover-container uk-background-secondary uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-overflow-hidden uk-light" data-uk-height-viewport>
    <div class="uk-position-cover uk-overlay-primary"></div>
    <div class="uk-width-xlarge uk-padding-small uk-position-z-index" uk-scrollspy="cls: uk-animation-fade">
      <div class="uk-text-center uk-margin">
        <h2 class="uk-heading-line uk-text-bold"><span>Liste des articles</span></h2>
      </div>
      <div v-if="loading" class="uk-flex uk-flex-center uk-margin">
        <span data-uk-spinner="ratio: 2"></span>
      </div>
      <div v-if="error" class="uk-alert-danger uk-padding-small uk-margin-small" uk-alert>
        {{ error }}
      </div>
      <div v-if="articles.length" class="uk-child-width-1-1 uk-child-width-1-2@m uk-grid-small" uk-grid>
        <div v-for="article in articles" :key="article.id">
          <router-link
            :to="{ name: 'DetailArticle', query: { id: article.id } }"
            class="uk-link-reset"
            style="display:block"
          >
            <div class="uk-card uk-card-default uk-card-hover uk-card-body uk-border-rounded uk-background-muted">
              <div class="uk-grid-small" uk-grid>
                <div class="uk-width-auto">
                  <img :src="article.imgPath" alt="img" class="uk-border-circle" style="width:80px;height:80px;object-fit:cover;">
                </div>
                <div class="uk-width-expand">
                  <h3 class="uk-card-title uk-margin-remove-bottom">{{ article.title }}</h3>
                  <p class="uk-margin-remove-top">Auteur : {{ article.author }}</p>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-if="!loading && !articles.length && !error" class="uk-text-center uk-margin">
        <span>Aucun article trouvé.</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlesList",
  data() {
    return {
      articles: [],
      loading: false,
      error: ""
    };
  },
  mounted() {
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      this.loading = true;
      this.error = "";
      try {
        const response = await fetch("http://127.0.0.1:3000/articles/", {
          headers: { accept: "application/json" }
        });
        const data = await response.json();
        if (data.code === "200") {
          this.articles = data.data;
        } else {
          this.error = data.message || "Erreur lors de la récupération des articles";
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
.uk-link-reset {
  text-decoration: none;
  color: inherit;
}
</style>