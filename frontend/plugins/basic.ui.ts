import Avatar from '~/components/supports/Avatar.vue';
import Card from '~/components/supports/Card.vue';
import Comment from '~/components/supports/Comment.vue';
import Horizontal from '~/components/supports/Horizontal.vue'
import Icon from '~/components/supports/Icon.vue';
import Modal from '~/components/supports/Modal.vue'
import Post from '~/components/supports/Post.vue';
import Story from '~/components/supports/Story.vue';

export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.component('avatar', Avatar);
  nuxtapp.vueApp.component('card', Card);
  nuxtapp.vueApp.component('comment', Comment);
  nuxtapp.vueApp.component('horizontal', Horizontal)
  nuxtapp.vueApp.component('icon', Icon);
  nuxtapp.vueApp.component('modal', Modal);
  nuxtapp.vueApp.component('post', Post);
  nuxtapp.vueApp.component('story', Story);
});
