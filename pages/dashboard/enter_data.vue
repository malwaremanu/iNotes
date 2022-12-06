<template>
  <div class="min-h-screen bg-white select-none">
    <Lnavbar :data="user_data" />

    <div
      v-if="loaded"
      class="p-6 border-2 border-gray-300 rounded-xl w-2/3 mx-auto mt-20"
    >
      <div class="text-center text-2xl font-semibold">
        Enter Details of Scribe
      </div>

      <div class="p-3">

        <form
          id="app"
          @submit="check_scribe"
          action="#"
          method="POST"
        >

        <div class="flex items-center justify-between gap-3">
          <div class="py-2">
            <div class="text-gray-400 text-xs">Mobile Number</div>
            <input required
              v-model="scribe.s_mobile"
              type="text" maxlength="10"
              class="p-2 border border-gray-400 rounded-lg w-full"
              placeholder="9876543210" pattern="[6-9]{1}[0-9]{9}"
            />
            <span 
            :class="/^[6-9]{1}[0-9]{9}$/.test(scribe.s_mobile) ? 'green_validation' : 'red_validation'">
              Enter a valid mobile number 
            </span>
          </div>

          <div class="py-2">
            <div class="text-gray-400 text-xs">E-mail ID</div>
            <input required
              type="text"
              v-model="scribe.s_email"
              class="p-2 border border-gray-400 rounded-lg w-full"
              placeholder="scribe@gmail.com" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />            
            <span 
            :class="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(scribe.s_email) ? 'green_validation' : 'red_validation'">
               Enter valid e-mail id 
            </span>
          </div>
        </div>

        <div class="py-2 flex items-center justify-between">
          <div></div>
          <div>
            <button type="submit"
              class="px-4 py-2 bg-ibps-800 text-white rounded-lg w-full flex items-center gap-2"
            >
              {{ check_scribe_text }}
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <div></div>
        </div>
        </form>
      </div>
    </div>

    <div
      v-if="!loaded"
      class="p-6 border-2 border-gray-300 rounded-xl w-2/3 mx-auto mt-20"
    ></div>

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_data: this.$store.state.data.cand_data,
      loaded: true,
      check_scribe_text: 'Proceed',
      scribe: {
        s_mobile: '',
        s_email: '',
      },
    }
  },
  mounted() {
    this.check_login()
    // this.go_online()
  },
  methods: {
    check_login() {
      if (this.$store.state.data.user_data.otp == '') {
        console.log('user invalid')
        this.$router.push('/')
      }
    },
    check_scribe(e) {
      e.preventDefault();

      const self = this
      self.check_scribe_text = 'Checking...'
      var url = 'http://devops-server.ibps.local:5003/scribe/getDetails/'
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: self.$store.state.data.user_data,
          scribe: self.scribe,
        }),
      })
        .then((response) => response.text())
        .then((result) => {
          var jj = JSON.parse(result)
          console.clear()
          console.log('jj', jj)

          if (jj.status == 'error') {
            console.log('this is an error')
            self.$swal(jj.data)
          }

          if (jj.status == 'success') {
            console.log('All good')
            this.$store.commit('data/scribe_data', jj.data)
            this.$router.push('/dashboard/final_data')
          }

          self.check_scribe_text = 'Fetch'
        })
        .catch((error) => console.log('error', error))
        console.clear()
    },
    go_online() {
      var url = 'http://devops-server.ibps.local:5003/exam/online/'
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: this.$store.state.data.user_data }),
      })
        .then((response) => response.text())
        .then((result) => {
          var jj = JSON.parse(result)
          console.log('jj', jj.data)
          // this.$store.commit('data/cand_data', jj.data)
        })
        .catch((error) => console.log('error', error))
    },
  },
}
</script>
