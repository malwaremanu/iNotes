<template>
  <div class="p-2 min-h-screen bg-ibps-900 mx-auto">
    <Gohome />

    <div class="lg:flex items-center gap-2 w-full mx-auto">
      <Logo />

      <div class="lg:w-1/2">
        <div class="py-3 px-4 bg-white rounded-xl lg:w-3/4 mx-auto">
          <div v-if="is_loading" class="flex items-center justify-center h-52">
            <div class="animate-pulse text-red-500 text-center">
              Loading....
              <br />
              <br />
              Please Wait....
            </div>
          </div>
          <div v-else>
            <div v-if="proj_status == 'success'">
              <div class="text-ibps-900 text-center font-semibold pt-2 text-xl">
                Candidate's Login Panel
              </div>
              <div class="" v-show="!is_showing_alert">
                <div class="py-2">
                  <div class="text-gray-400">Exam Name</div>
                  <div class="p-2 border border-gray-400 rounded-lg w-full">
                    <span v-text="exam"></span>
                  </div>
                </div>
                <div class="py-2">
                  <div class="text-gray-400">Post</div>
                  <div class="p-2 border border-gray-400 rounded-lg w-full">
                    <span v-text="post"></span>
                  </div>
                </div>

                <div class="py-2">
                  <div class="text-gray-400">
                    Candidate's Roll No.<sup class="text-red-600">*</sup>
                  </div>
                  <input
                    type="text"
                    v-model="roll_no"
                    class="p-2 border border-gray-400 rounded-lg w-full"
                  />
                  <div class="red_validation" v-if="error_msg.roll_no">
                    {{ error_msg.roll_no }}
                  </div>
                </div>

                <div class="py-2">
                  <div class="text-gray-400">
                    Candidate's Registration No.<sup class="text-red-600"
                      >*</sup
                    >
                  </div>
                  <input
                    type="text"
                    v-model="reg_no"
                    class="p-2 border border-gray-400 rounded-lg w-full"
                  />
                  <div class="red_validation" v-if="error_msg.reg_no">
                    {{ error_msg.reg_no }}
                  </div>

                  <div class="text-right hidden">
                    <span
                      class="
                        text-gray-400
                        hover:text-ibps-900
                        font-light
                        cursor-pointer
                        text-sm
                      "
                      >reset password ?</span
                    >
                  </div>
                </div>

                <div class="py-2">
                  <div>
                    <Buttonprimary title="Submit" @click.native="login_test" />
                  </div>
                </div>
              </div>

              <div class="" v-show="is_showing_alert">
                <div class="p-2">
                  <div
                    class="
                      text-xs
                      p-3
                      bg-green-100
                      font-semibold
                      border border-green-600
                      rounded-xl
                      mb-2
                      text-center text-green-600
                    "
                  >
                    Please Make sure that you have below mentioned details ready
                    with you.
                  </div>
                  <div v-for="d in get_ready_list" :key="d">
                    <label
                      :for="d"
                      class="flex border-2 p-2 rounded-md mb-1 cursor-pointer"
                    >
                      <input
                        class="w-20 p-2 rounded-full cursor-pointer text-xs"
                        :id="d"
                        :name="d"
                        v-model="ch_list"
                        type="checkbox"
                        :value="d"
                      />
                      <span class="text-xs"> {{ d }} </span>
                    </label>
                  </div>
                </div>
                <div class="p-2">
                  <center>
                    <div v-show="get_ready_list.length == ch_list.length" class="mb-2">
                      <button
                        @click="is_showing_alert = false"
                        class="button_with_icon animate-pulse"
                      >
                        Proceed to login
                      </button>
                    </div>

                    <div v-show="get_ready_list.length != ch_list.length">
                      <div
                        class="
                          text-sm
                          p-3
                          bg-red-100
                          font-semibold
                          border border-red-600
                          rounded-xl
                          mb-2
                          text-center text-red-600
                        "
                      >
                        Please tick all checkboxes.
                      </div>
                    </div>

                    <nuxt-link to="/faq">
                      <button
                        class="bg-ibps-800 rounded-full px-4 py-2 text-white"
                      >
                        Check FAQs
                      </button>
                    </nuxt-link>
                  </center>
                </div>
              </div>

              <!-- Admin Console Hidden as of now -->
              <div class="py-2 hidden">
                <nuxt-link to="/admin">
                  <Buttonprimary title="Admin Panel" />
                </nuxt-link>
              </div>
            </div>
            <div v-else-if="proj_status == 'error'">
              <div class="py-2">
                <div class="text-red-700 text-center text-xl">
                  {{ proj_data }}
                </div>
              </div>
            </div>
            <div v-else>
              <div class="py-2">
                <div class="text-red-700 text-center text-xl">
                  Something is wrong with the data!!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center text-xs font-semibold py-8 text-white">
      Ver 0.0.1 Beta
    </div>
  </div>
</template>


   


<script>
export default {
  data() {
    return {
      is_showing_alert: true,
      ch_list: [],
      get_ready_list: [
        "Candidate's E-mail ID",
        "Candidate's Phone Number",
        "Scribe's E-mail",
        "Scribe's Phone Number",
        "Scribe's Photo",
        "Scribe's Signature",
      ],
      is_loading: true,
      post: '',
      exam: '',
      roll_no: '',
      reg_no: '',
      p_data: {},
      proj_status: 'success',
      proj_data: '',
      f_data: {
        roll_no: '',
        reg_no: '',
        project_id: '',
      },
      error_msg: [],
    }
  },
  watch: {
    roll_no(value) {
      // binding this to the data value in the email input
      this.roll_no = value
      this.validateDigits('roll_no')
    },
    reg_no(value) {
      this.reg_no = value
      this.validateDigits('reg_no')
    },
  },
  mounted() {
    this.get_proj_details()
  },
  methods: {
    conso() {
      console.clear()
      console.log(this.f_data)
    },
    alerts() {
      alert('this is an alert')
    },
    validateDigits(input_type) {
      let value = ''
      if (input_type == 'roll_no') {
        value = this.roll_no
      } else if (input_type == 'reg_no') {
        value = this.reg_no
      }
      if (/^\d+$/.test(value)) {
        this.f_data[input_type] = value
        this.error_msg[input_type] = ''
      } else {
        this.f_data[input_type] = ''
        this.error_msg[input_type] =
          'Invalid Format!! Only Digits are allowed.!!'
      }
    },
    get_proj_details() {
      this.is_loading = true
      fetch(
        'http://devops-server.ibps.local:5003/project/' +
          this.$route.query.p +
          '/'
      )
        .then((response) => response.text())
        .then((result) => {
          var jj = JSON.parse(result)
          console.log(jj.data)
          if (jj.status == 'success') {
            this.post = jj.data.post
            this.exam = jj.data.exam
            this.f_data.project_id = jj.data.project_id
            sessionStorage.setItem('project_id', jj.data.project_id)
          } else {
            this.proj_status = jj.status
            this.proj_data = jj.data
          }
          this.is_loading = false
        })
        .catch((error) => console.log('error', error))
    },
    login_test() {
      let stop_Flag = false
      for (let key in this.f_data) {
        if (this.f_data[key] == '') {
          stop_Flag = true
          break
        }
      }
      if (stop_Flag) {
        this.$swal('Required Field is empty!!')
      } else {
        this.is_loading = true
        const self = this
        fetch('http://devops-server.ibps.local:5003/candidate/getLoginOTP/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: self.f_data }),
        })
          .then((response) => response.text())
          .then((result) => {
            var jj = JSON.parse(result)
            console.log('jj', jj)
            if (jj.status == 'success') {
              console.log(jj.data)
              self.$store.commit('data/insert_roll_reg', self.f_data)
              self.$store.commit('data/login_data', jj.data)
              self.$store.commit('data/insert_otp', jj.data.otp)

              console.log(self.$store.state.data)
              self.$router.push('/otp')

              //this.is_loading = false
            } else {
              //this.is_loading = false
              self.$swal(jj.data)
            }
          })
          .catch((error) => console.log('error', error))
        this.is_loading = false
      }
    },
  },
}
</script>
