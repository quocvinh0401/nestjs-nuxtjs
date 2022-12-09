import Card from '~/components/supports/Card.vue';
import Horizontal from '~/components/supports/Horizontal.vue'
import Icon from '~/components/supports/Icon.vue';
import Post from '~/components/supports/Post.vue'

export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.component('card', Card);
  nuxtapp.vueApp.component('horizontal', Horizontal)
  nuxtapp.vueApp.component('icon', Icon);
  nuxtapp.vueApp.component('post', Post);
});
