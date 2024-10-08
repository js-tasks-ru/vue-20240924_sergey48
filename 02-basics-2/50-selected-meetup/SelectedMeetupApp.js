import { computed, defineComponent, ref, watchEffect } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const availableMeetups = [1, 2, 3, 4, 5]
    const selectedMeetupId = ref(1)
    const selectedMeetupTitle = ref('')
    const loading = ref(false)

    const prevMeetupDisabled = computed(() => {
      return selectedMeetupId.value <= availableMeetups[0]
    })
    const nextMeetupDisabled = computed(() => {
      return selectedMeetupId.value >= availableMeetups[availableMeetups.length - 1]
    })
    function prevMeetup() {
      if (!prevMeetupDisabled.value)
        selectedMeetupId.value--
    }
    function nextMeetup() {
      if (!nextMeetupDisabled.value)
        selectedMeetupId.value++
    }

    watchEffect(() => {
      loading.value = true
      getMeetup(selectedMeetupId.value)
        .then((data) => {
          selectedMeetupTitle.value = data.title
        })
        .finally(() => {
          loading.value = false
        })
    })

    return {
      prevMeetup,
      prevMeetupDisabled,
      nextMeetup,
      nextMeetupDisabled,
      selectedMeetupId,
      selectedMeetupTitle,
      availableMeetups,
      loading,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          type="button"
          @click="prevMeetup"
          :disabled="prevMeetupDisabled"
        >Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="meetupId in availableMeetups" class="radio-group__button">
            <input
              :id="'meetup-id-' + meetupId"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              v-model="selectedMeetupId"
              :value="meetupId"
            />
            <label :for="'meetup-id-' + meetupId" class="radio-group__label">{{ meetupId }}</label>
          </div>
        </div>

        <button
          class="button button--secondary"
          type="button"
          @click="nextMeetup"
          :disabled="nextMeetupDisabled"
        >Следующий</button>
      </div>

      <div
        class="meetup-selector__cover"
        :class="{'loading': loading}"
      >
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ selectedMeetupTitle }}</h1>
        </div>
      </div>
    </div>
  `,
})
