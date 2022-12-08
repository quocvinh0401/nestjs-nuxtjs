import Icon from '~/components/supports/Icon.vue';

export default defineNuxtPlugin((nuxtapp) => {
  nuxtapp.vueApp.component('icon', Icon);
});
