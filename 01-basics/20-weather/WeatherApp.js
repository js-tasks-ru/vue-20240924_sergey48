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

    const timeToTimestamp = (time) => {
      return Date.parse('1970-01-01T' + time)
    }

    const isNignt = (dt, sunrise, sunset) => {
      const ts = timeToTimestamp(dt);
      return ts < timeToTimestamp(sunrise) || ts > timeToTimestamp(sunset)
    }

    return {
      weatherData,
      weatherConditionIcons,
      tempKelvToCels,
      pressureHpaToMmhg,
      isNignt,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul v-if="weatherData" class="weather-list unstyled-list">
        <li
          v-for="row in weatherData"
          :class="{
            'weather-card': true,
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
            <!-- Возможно, спорное решение, но хотелось избавится от однотипных блоков разметки -->
            <div class="weather-details__item" v-for="details in [
                {label: 'Давление, мм рт. ст.', value: pressureHpaToMmhg(row.current.pressure)},
                {label: 'Влажность, %', value: row.current.humidity},
                {label: 'Облачность, %', value: row.current.clouds},
                {label: 'Ветер, м/с', value: row.current.wind_speed},
              ]">
              <div class="weather-details__item-label">{{ details.label }}</div>
              <div class="weather-details__item-value">{{ details.value }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
