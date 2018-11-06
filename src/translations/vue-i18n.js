import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messagesEn from './es'
import messagesEs from './en'

Vue.use(VueI18n);
const messages = {
  ...messagesEn,
  ...messagesEs
};

export const i18n = new VueI18n({
  locale: 'es', // set locale
  messages // set locale messages
})