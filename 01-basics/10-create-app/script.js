import { defineComponent, createApp } from 'vue'


const App = defineComponent({
  name: 'CreateApp',

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

  template: '<div>Сегодня {{ formatAsLocalLongDate(new Date()) }}</div>',
})

createApp(App).mount('#app')
