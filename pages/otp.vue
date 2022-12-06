<template>
  <div class="p-2 min-h-screen bg-ibps-900 mx-auto">
    <!-- <div class="bg-ibps-900">
      <button class="p-4 text-white text-center">
        <nuxt-link to="/">
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
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
        </nuxt-link>
      </button>
    </div>-->

    <Gohome />
    <div class="lg:flex items-center gap-2 w-full mx-auto">
      <Logo />
      <div class="lg:w-1/2">
        <div class="px-4 py-6 bg-white rounded-xl lg:w-3/4 mx-auto">
          <div class="text-ibps-900 text-center font-semibold pt-2 text-xl">
            Enter One Time Password
          </div>

          <div class="text-center text-ibps-700 text-sm">
            <center>
              <img src="~/assets/otp.png" class="h-28 p-3" alt="" />
            </center>
            <div class="text-gray-600">
              We emailed you a six-digit code to your registered Email Id. Enter
              the code below to verify your details.
            </div>

            <div v-if="count != 0">
              <span class="font-semibold">Resend OTP</span> in {{ count }} seconds
            </div>
            <div v-else @click="resend">
              <button class="px-2 py-1 border border-ibps-800 rounded-full text-ibps-900 m-2 hover:bg-ibps-800 hover:text-white"> Resend OTP</button>
            </div>

          </div>

          <div class="py-2">
            <!-- 
              <div class="text-gray-400">Enter OTP</div>
              <input type="password" class="p-2 border border-gray-400 rounded-lg w-full" />         
            -->
            <div class="grid grid-cols-6 gap-2 text-center py-3">
              <input
                type="text" minlength="1" maxlength="1"
                class="otp" ref="0" @keyup="shift_to(0, 1, $event)"
                v-model="otp_data[0]"
              />
              <input
                type="text" minlength="1" maxlength="1"
                class="otp" ref="1" @keyup="shift_to(1, 2, $event)"
                v-model="otp_data[1]"
              />
              <input
                type="text" minlength="1" maxlength="1"
                class="otp" ref="2" @keyup="shift_to(2, 3, $event)"
                v-model="otp_data[2]"
              />
              <input
                type="text" minlength="1" maxlength="1"
                class="otp" ref="3" @keyup="shift_to(3, 4, $event)"
                v-model="otp_data[3]"
              />
              <input
                type="text" minlength="1" maxlength="1"
                class="otp" ref="4" @keyup="shift_to(4, 5, $event)"
                v-model="otp_data[4]"
              />
              <input
                type="text" minlength="1" maxlength="1"
                class="otp" ref="5" @keyup="shift_to(5, 6, $event)"
                v-model="otp_data[5]"
              />
            </div>
          </div>

          <div class="py-2" ref="vdt" @click="validate_otp" v-show="!resend_prompt">
            <Buttonprimary  :title="val_text" :disabled="data_validated == 1"/>          
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
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      val_text : 'Validate',
      count: 120,
      resend_prompt: false,
      otp_data : ['', '', '', '', '', ''],
      data_validated : 0
    }
  },
  mounted() {
    this.resend_link()
  },
  methods: {
    shift_to(current_index, next_index, event){
      current_index = parseInt(current_index);
      next_index = parseInt(next_index);      

      var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Backspace", "Delete"];
      
      if(numbers.includes(event.key)){     
        // check delete events
        if(event.key == "Backspace"){
          this.otp_data[current_index] = '';
          if (current_index < next_index && current_index > 0){
            this.$refs[current_index - 1].focus();
          } else {
            this.$refs[current_index].focus();
          }
        } else if (event.key == "Delete"){
          this.otp_data[current_index] = '';
          if (current_index < next_index && current_index < 5){
            this.$refs[next_index].focus();
          } else {
            this.$refs[current_index].focus();
          }          
        } else {    
          this.otp_data[current_index] = event.key;
          if(next_index == 6){
            let proceed_flag = true;
            for (let index in this.otp_data){
              if ( this.otp_data[index] == ''){
                this.$refs[index].focus();
                proceed_flag = false;
                break;
              }
            }
            if (proceed_flag){
              // focus on validate button
              this.$refs['vdt'].click();
            }            
          } else {
            // focusing now next -> 'x'
            this.$refs[next_index].focus();
          }
        }
      } else {
        this.otp_data[current_index] = '';
        this.$refs[current_index].focus();
      }
    },

    walert() {
      alert('We will work on it later on.');
    },
    resend_link() {
      const self = this;
      this.$refs[0].focus();
      let abcd = window.setInterval(function () {
        /// call your function here
        if (self.count == 0) {
          this.resend_prompt = true;
          self.count = 0;
          console.log(this);
          clearInterval(abcd);
        } else {
          self.count = self.count - 1;
        }
      }, 1000)
      
    },
    resend(){
      console.clear()
      console.log("resending data")
      console.log(this.$store.state.data.user_data)
      console.log("resending data...")
      // we will resend the otp in this function
      //Change the fucntion 
      
      const self = this
      fetch('http://devops-server.ibps.local:5003/candidate/getLoginOTP/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: self.$store.state.data.user_data }),
      })
        .then((response) => response.text())
        .then((result) => {
          var jj = JSON.parse(result)
          console.log('jj', jj)
          if (jj.status == 'success') {
            console.log(jj.data)
            
            self.$store.commit('data/resend_otp', jj.data)
            console.log("commited.")
            console.log(self.$store.state)
            // self.$router.push('/otp') // ----

            this.is_loading = false
          } else {
            //this.is_loading = false
            self.$swal(jj.data)
          }
        })
        .catch((error) => console.log('error', error))
      


      // this.otp_data = ['', '', '', '', '', ''];
      // this.count = 120;
      // this.resend_prompt = false;
      // this.resend_link();
    },
    validate_otp(){
      console.log(this.otp_data.toString());
      this.data_validated = 0;
      this.val_text = 'Validating...';
      var ac_hash = this.$store.state.data.user_data.otp;
      var oo = this.otp_data.toString().replace(/,/g, "");
      console.log('oo', oo);
      let pattern = /^\d+$/;
      if(pattern.test(oo)){
        var aa = CryptoJS.SHA256(oo).toString(CryptoJS.enc.Base64);
        console.clear();
        console.log(oo, aa, ac_hash);

        if(aa == ac_hash){
          this.data_validated = 1;
          this.val_text = 'Validated.';          
          setTimeout(() =>{
            this.val_text = 'Redirecting..';      
            setTimeout( () => this.$router.push({ path: '/dashboard'}), 500);
            // this.$router.go("/dashboard");  
          }, 1000);
        }
        else{
          this.$swal("OTP is not correct. Kindly Re-enter the correct OTP.");
          this.val_text = 'Validate';
        }
      } else {
        this.$swal("OTP contains digits only!! Kindly Re-enter the correct OTP.");
        this.val_text = 'Validate';
        this.otp_data = ['', '', '', '', '', ''];
        this.$refs[1].focus();
      }      
    }
  },
}
</script>