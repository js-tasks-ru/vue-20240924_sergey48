import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref(new Date())
    const formattedTime = computed(() =>
      time.value.toLocaleTimeString(navigator.language,
        { timeStyle: 'medium' }))

    let intervalId = null
    onMounted(() => {
      intervalId = setInterval(() => {
        time.value = new Date()
      }, 1000)
    })
    onUnmounted(() => {
      if (intervalId)
        clearInterval(intervalId)
    })

    return {
      formattedTime,
    }
  },

  template: `<div class="clock">{{ formattedTime }}</div>`,
})
