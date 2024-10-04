import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const counter = ref(0)
    const minCounter = 0
    const maxCounter = 5

    const decrementCounter = () => {
      if (counter.value > minCounter)
        counter.value--
    }
    const incrementCounter = () => {
      if (counter.value < maxCounter)
        counter.value++
    }

    return {
      counter,
      minCounter,
      maxCounter,
      decrementCounter,
      incrementCounter
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="decrementCounter"
        :disabled="counter <= minCounter"
      >➖
      </button>

      <span class="count" data-testid="count">{{ counter }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click="incrementCounter"
        :disabled="counter >= maxCounter"
      >➕
      </button>
    </div>
  `,
})
