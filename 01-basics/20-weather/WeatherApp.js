import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()
    const weatherConditionIcons = WeatherConditionIcons

    const tempKelvToCels = (tempK) => {
      return (tempK - 273.15).toFixed(1)
    }

    const pressureHpaToMmhg = (pressureHpa) => {
      return Math.round(pressureHpa * 3 / 4)
    }

    const isNignt = (dt, sunrise, sunset) => {
      return dt < sunrise || dt > sunset
    }

    const getDetails = (row) => {
      return [
        {label: 'Давление, мм рт. ст.', value: pressureHpaToMmhg(row.pressure)},
        {label: 'Влажность, %', value: row.humidity},
        {label: 'Облачность, %', value: row.clouds},
        {label: 'Ветер, м/с', value: row.wind_speed},
      ]
    }

    return {
      weatherData,
      weatherConditionIcons,
      tempKelvToCels,
      isNignt,
      getDetails
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul v-if="weatherData" class="weather-list unstyled-list">
        <li
          v-for="row in weatherData"
          class="weather-card"
          :class="{
            'weather-card--night': isNignt(row.current.dt, row.current.sunrise, row.current.sunset)
          }"
        >
          <div class="weather-alert" v-if="row.alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ row.alert.sender_name }}: {{ row.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ row.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ row.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div
              class="weather-conditions__icon"
              :title="row.current.weather.description"
            >{{ weatherConditionIcons[row.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ tempKelvToCels(row.current.temp) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item" v-for="details in getDetails(row.current)">
              <div class="weather-details__item-label">{{ details.label }}</div>
              <div class="weather-details__item-value">{{ details.value }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
