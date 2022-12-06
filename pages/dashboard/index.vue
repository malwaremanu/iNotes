<template>
  <div class="min-h-screen bg-white select-none">
    <Lnavbar :data="user_data" />

    <div class="p-3 border-2 border-gray-300 rounded-xl w-2/3 mx-auto mt-20">
      <div class="px-3" v-show="offline" @click="offline = false">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>

      <div v-show="!offline">
        <div class="text-2xl text-center font-semibold my-2">
          Fill Scribe Details
        </div>

        <div class="justify-center p-3 gap-5">
          <center>
            <div class="w-1/2">
              <div
                @click="go_online"
                class="
                  border
                  p-9
                  m-3
                  border-green-300
                  rounded-xl
                  bg-green-100
                  hover:bg-green-200
                  cursor-pointer
                "
              >
                <div class="mb-2 mt-3 animate-pulse">
                  <center>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/556/556813.png"
                      alt
                      class="w-28 text-center"
                    />
                  </center>
                </div>
                <div class="text-center text-2xl font-semibold">
                  Fill Online
                </div>
                <div class="text-lg text-center font-semibold">
                  (Recommended)
                </div>
              </div>

              <div class="text-xs w-90 text-center mt-1 hidden">
                We recommend you to fill scribe information online and take the
                printout to the examination centre.
              </div>
            </div>
          </center>

          <div>
            <center>
              <div
                class="
                  border
                  w-1/3
                  p-2
                  border-gray-300
                  bg-gray-100
                  hover:bg-red-100 hover:border-red-300
                  rounded-full
                  cursor-pointer
                "
              >
                <div @click="offline = true" class="text-center font-semibold">
                  Offline Form
                  <div class="text-xs font-semibold text-red-400 uppercase">
                    (Less Recommended)
                  </div>
                </div>
              </div>

              <div class="text-xs w-48 text-center mt-1">
                A blank form will be downloaded. <br />Fill it and submit at
                exam center.
              </div>
            </center>
          </div>
        </div>
      </div>

      <div v-show="offline">
        <center>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2541/2541984.png"
            alt
            class="w-40"
          />

          <div class="text-3xl font-semibold py-4">
            Download the form and fill details
          </div>

          <div>
            <button
              @click="go_offline"
              class="
                bg-ibps-800
                px-4
                py-2
                rounded-xl
                text-white
                flex
                items-center
                gap-2
              "
            >
              <div class="font-semibold">{{ tt }}</div>
              <div>
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
              </div>
            </button>
          </div>

          <div class="text-xs py-2">
            Fill and attach this form with Admit card.
          </div>
        </center>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      tt: 'Download Blank Scribe Form',
      offline: false,
      user_data: this.$store.state.data.cand_data,
    }
  },
  mounted() {
    this.check_login()
    this.load_user()
  },
  methods: {
    check_login() {
      if (this.$store.state.data.user_data.otp == '') {
        console.log('user invalid')
        this.$router.push('/')
      }
    },
    load_user() {
      console.clear()
      //this.is_loading = true;
      fetch('http://devops-server.ibps.local:5003/candidate/login/', {
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
          this.$store.commit('data/cand_data', jj.data)
        })
        .catch((error) => console.log('error', error))
    },
    go_offline() {
      const self = this
      self.tt = 'Downloading Now... '
      var url = 'http://devops-server.ibps.local:5003/exam/offline/'
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
          console.clear()
          console.log('Going Offline Now -> ', jj.data)
          if (jj.status == 'success') {
            var print_url =
              'http://devops-server.ibps.local:5003/exam/printPDF/ '
            var dd = self.$store.state.data.user_data
            dd['mode'] = 'OFFLINE'

            let formData = new FormData()
            formData.append('data', JSON.stringify(dd))

            console.log(dd)

            fetch(print_url, {
              method: 'POST',
              body: formData,
            })
              .then((res) => {
                return res.blob()
              })
              .then((data) => {
                var a = document.createElement('a')
                a.href = window.URL.createObjectURL(data)
                a.download = dd['roll_no'] + '_OFFLINE'
                a.click()
                self.tt = 'Download Blank Scribe Form'
              })
          }

          // this.$store.commit('data/cand_data', jj.data)
        })
        .catch((error) => console.log('error', error))
    },
    download_pdf_online() {
      var print_url = 'http://devops-server.ibps.local:5003/exam/printPDF/'
      var dd = self.$store.state.data.user_data
      dd['mode'] = 'ONLINE'

      let formData = new FormData()
      formData.append('data', JSON.stringify(dd))

      console.log(dd)

      fetch(print_url, {
        method: 'POST',
        body: formData,
      })
        .then((res) => {
          return res.blob()
        })
        .then((data) => {
          var a = document.createElement('a')
          a.href = window.URL.createObjectURL(data)
          a.download = dd['roll_no'] + '_ONLINE'
          a.click()
        })
    },
    go_online() {
      const self = this
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
          console.log('online data ', jj)
          if (jj.status == 'success') {
            if (String(jj.data).includes('submitted')) {
              let dd = self.$store.state.data.user_data
              dd['mode'] = 'ONLINE'
              dd = JSON.stringify(dd)
              let footer_button_string =
                `
                <form method="POST" class="hidden" action="http://devops-server.ibps.local:5003/exam/printPDF/">
                  <input type="hidden" name="data" value='` +
                dd +
                `' />
                  <div class="flex items-center gap-3"> 
                  <button type="submit" id="submit_button_to_download"
                    class="bg-ibps-800 px-4 py-2 rounded-xl text-white flex items-center gap-2"><div class="font-semibold">
                    Download PDF
                    </div> <div>
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    </div>
                  </button>
                  </div>
                  

                </form>
                `
              console.log(footer_button_string)

              const swalWithBootstrapButtons = self.$swal.mixin({
                customClass: {
                  confirmButton:
                    'bg-ibps-800 px-4 py-2 rounded-xl text-white flex items-center gap-2',
                  cancelButton:
                    'bg-red-800 px-4 py-2 rounded-xl text-white flex items-center gap-2',
                },
                buttonsStyling: false,
              })

              self
                .$swal({
                  icon: 'success',
                  text: jj.data,
                  footer: footer_button_string,
                  showCancelButton: true,
                  confirmButtonText: 'Change Scribe',
                  cancelButtonText: 'Download PDF',                  
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    // swalWithBootstrapButtons.fire(
                    //   'Deleted!',
                    //   'Your file has been deleted.',
                    //   'success'
                    // )
                    this.resubmit_details()
                  } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === self.$swal.DismissReason.cancel
                  ) {
                    document.getElementById('submit_button_to_download').click()
                  }
                })
            } else {
              this.$router.push('dashboard/enter_data')
            }
          }

          if (jj.status == 'error') {
            var ss = self.$swal(jj.data)
            console.log(ss)
          }
          // this.$store.commit('data/cand_data', jj.data)
        })
        .catch((error) => {
          console.log('error', error)
          self.$swal(error)
        })
    },
    resubmit_details() {
      // this.$swal('You need to fill ')
      this.$router.push('dashboard/enter_data')
    },
  },
}
</script>
