import { defineComponent } from 'vue'
import WeatherListItem from './WeatherListItem.js'

export default defineComponent({
  name: 'WeatherList',

  components: {
    WeatherListItem
  },

  props: {
    list: {
      type: Array,
      required: true
    }
  },

  template: `
    <ul v-if="list" class="weather-list unstyled-list">
      <WeatherListItem :item="item" v-for="item in list" />
    </ul>
  `
});
