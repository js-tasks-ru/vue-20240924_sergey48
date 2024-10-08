import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(null);
    const seconOperand = ref(null);
    const operator = ref(null);
    const result = computed(() => {
      if (!Number.isFinite(firstOperand.value)
          || !Number.isFinite(seconOperand.value)) return ''

       switch (operator.value) {
         case 'sum':
           return firstOperand.value + seconOperand.value
         case 'subtract':
           return firstOperand.value - seconOperand.value
         case 'multiply':
           return firstOperand.value * seconOperand.value
         case 'divide':
           return seconOperand.value !== 0
             ? firstOperand.value / seconOperand.value
             : 'упс!'
         default:
           return '';
       }
    });

    return {
      firstOperand,
      seconOperand,
      operator,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input
        type="number"
        aria-label="First operand"
        v-model="firstOperand"
      />

      <div class="calculator__operators">
        <label><input type="radio" v-model="operator" name="operator" value="sum"/>➕</label>
        <label><input type="radio" v-model="operator" name="operator" value="subtract"/>➖</label>
        <label><input type="radio" v-model="operator" name="operator" value="multiply"/>✖</label>
        <label><input type="radio" v-model="operator" name="operator" value="divide"/>➗</label>
      </div>

      <input
        type="number"
        aria-label="Second operand"
        v-model="seconOperand"
      />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
