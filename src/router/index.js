import { createRouter, createWebHashHistory } from 'vue-router';
import RegisterPage from "../views/RegisterPage.vue";
import ListeArticle from "../views/ListeArticle.vue";
import Login from "../views/PageLogin.vue";
import DetailArticle from '../views/DetailArticle.vue';
import ModifArticle from "../views/ModifArticle.vue";

const routes = [
    { path: '/register', name: 'Register', component: RegisterPage },
    // Protégé: accessible uniquement si l'utilisateur est connecté
    { path: '/liste-articles', name: 'ListeArticles', component: ListeArticle, meta: { requiresAuth: true } },
    { path: '/detail-article', name: 'DetailArticle', component: DetailArticle },
    { path: '/modif-article', name: 'ModifArticle', component: ModifArticle },

    { path: '/', name: 'Login', component: Login }
];

const router = createRouter({
    history: createWebHashHistory(), // important pour Electron (pas d'historique HTML5)
    routes
});

export default router;