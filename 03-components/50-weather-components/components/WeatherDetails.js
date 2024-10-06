import { computed, defineComponent } from 'vue'
import { pressureHpaToMmhg } from './../weather.utils.js'
import WeatherDetailsItem from './WeatherDetailsItem.js'

export default defineComponent({
  name: 'WeatherDetails',

  components: {
    WeatherDetailsItem
  },

  props: {
    details: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const list = computed(() => {
      const { pressure, humidity, clouds, wind_speed } = props.details
      return [
        {label: 'Давление, мм рт. ст.', value: pressureHpaToMmhg(pressure)},
        {label: 'Влажность, %', value: humidity},
        {label: 'Облачность, %', value: clouds},
        {label: 'Ветер, м/с', value: wind_speed},
      ]
    })

    return {
      list
    }
  },

  template: `
    <div class="weather-details">
        <WeatherDetailsItem v-for="item in list" :label="item.label" :value="item.value" />
    </div>
  `
});
