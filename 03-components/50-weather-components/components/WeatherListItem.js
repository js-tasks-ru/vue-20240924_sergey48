import { computed, defineComponent } from 'vue'
import { getConditionIcon, isNignt, tempKelvToCels } from '../weather.utils.js'
import WeatherAlert from './WeatherAlert.js'
import WeatherDetails from './WeatherDetails.js'

export default defineComponent({
  name: 'WeatherListItem',

  components: {
    WeatherAlert,
    WeatherDetails,
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const nignt = computed(() => {
      const { dt, sunrise, sunset } = props.item.current
      return isNignt(dt, sunrise, sunset)
    })
    const icon = computed(() => {
      return getConditionIcon(props.item.current.weather.id)
    })
    const temp = computed(() => {
      return tempKelvToCels(props.item.current.temp)
    })

    return {
      nignt,
      icon,
      temp
    }
  },

  template: `
    <li
      class="weather-card"
      :class="{
        'weather-card--night': nignt
      }"
    >
      <WeatherAlert v-if="item.alert" :alert="item.alert" />

      <div>
        <h2 class="weather-card__name">
          {{ item.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ item.current.dt }}
        </div>
      </div>

      <div class="weather-conditions">
        <div
          class="weather-conditions__icon"
          :title="item.current.weather.description"
        >{{ icon }}</div>
        <div class="weather-conditions__temp">{{ temp }} °C</div>
      </div>

      <WeatherDetails :details="item.current" />
    </li>
  `
});
