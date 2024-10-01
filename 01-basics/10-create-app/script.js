import { defineComponent, createApp } from 'vue'


const appConfig = defineComponent({
  name: '01Basics',

  setup: () => {

    function formatAsLocalLongDate(date) {
      return new Date(date).toLocaleDateString(navigator.language, {
        dateStyle: 'long'
      })
    }
    return {
      formatAsLocalLongDate
    }
  },

  template: '<div>Сегодня {{ formatAsLocalLongDate(new Date()) }}</div>>',
})

const app = createApp(appConfig)

app.mount('#app');
