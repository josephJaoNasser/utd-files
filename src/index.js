import VueFinder from './components/VueFinder.vue';
import './assets/css/style.scss';

export default {
    /**
     * @param {import('vue').App} app
     * @param options
     */
    install(Vue, options = {}) {
        // define global properties with 'options'
        options.i18n = options.i18n ?? {};
        let [firstLanguage] = Object.keys(options.i18n)
        options.locale = options.locale ?? firstLanguage ?? 'en';

        // unique id for the app options
        // app.provide('VueFinderOptions', options);
        Vue.prototype.$VueFinderOptions = options;

        // define main component
        Vue.component("VueFinder", VueFinder);
    }
};


