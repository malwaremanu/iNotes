<template>
  <div class="min-h-screen bg-white select-none">
    <div>
      <div
        class="
          px-4
          flex
          items-center
          justify-between
          bg-ibps-900
          select-none
          text-white text-sm
          py-2
        "
      >
        <div>www.ibps.in</div>
        <div class="font-roboto">
          1800 222 366 &nbsp;&nbsp;&nbsp; 1800 103 4566
        </div>
      </div>

      <div class="bg-white flex items-center justify-between border-b-2">
        <center class="w-2/5 px-9 py-6">
          <img src="../assets/ibps_logo.png" />
        </center>
        <center>
          <div class="p-3 text-2xl pr-10 font-semibold">ScribeDB FAQs</div>
          <nuxt-link to="/">
            <button class="bg-ibps-800 rounded-full px-4 py-2 text-white text-sm">
              Go back home
            </button>
          </nuxt-link>
        </center>
      </div>
    </div>
    <div class="p-3 w-2/3 mx-auto mt-10">
      <div v-for="f in faqs" :key="f" class="mb-5 shadow-lg rounded-lg">
        <div class="bg-ibps-900 text-white px-4 py-2 rounded-t-lg">
          {{ f.ques }}
        </div>
        <div class="bg-ibps-200/30 text-gray-900 px-4 py-2 rounded-b-lg">
          {{ f.ans }}
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqs: [
        {
          ques: 'How can I ask a question on Wikipedia?',
          ans: "Each article has its own talk page to ask questions or make constructive comments regarding its content, when you're viewing the article, just click on the Talk tab at the top of the page.",
        },
        {
          ques: 'what is 1 + 4',
          ans: '5',
        },
      ],
    }
  },
}
</script>

<style lang="postcss">
.label_text {
  @apply text-gray-400 text-xs mb-0.5;
}

input,
textarea {
  @apply p-2 border border-gray-400 rounded-lg w-full;
}

.button_with_icon {
  @apply flex items-center gap-2 bg-ibps-800 text-white px-4 py-2 rounded-lg;
}

.round_button_with_icon {
  @apply flex items-center gap-2 border-2 border-ibps-800 text-ibps-800 px-4 py-2 rounded-full font-semibold;
}
</style>
