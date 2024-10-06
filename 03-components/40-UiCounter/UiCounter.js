import { defineComponent } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      default: 0,
    },

    max: {
      type: Number,
      default: Infinity,
    },
  },

  emits: ['update:count'],

  setup(props, ctx) {
    function decrementCount() {
      if (props.count > props.min)
        ctx.emit('update:count', props.count - 1)
    }
    function incrementCount() {
      if (props.count < props.max)
        ctx.emit('update:count', props.count + 1)
    }

    return {
      decrementCount,
      incrementCount,
    }
  },

  template: `
    <div class="counter">
      <UiButton
        aria-label="Decrement"
        @click="decrementCount"
        :disabled="count <= min"
      >➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton
        aria-label="Increment"
        @click="incrementCount"
        :disabled="count >= max"
      >➕</UiButton>
    </div>
  `,
})
