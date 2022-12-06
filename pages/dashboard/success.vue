<template>
  <div class="min-h-screen bg-white select-none">
    <Lnavbar :data="user_data" />

    <div class="p-3 border border-2 border-gray-300 rounded-xl w-2/3 mx-auto mt-20">
      <center>
        <img src="~/assets/success.png" class="w-[50%]" />        

        <div>
            <div class="text-3xl font-semibold py-4">
                Scribe Details have been submitted successfully.
            </div>

            <div>
                <button @click="download_pdf_online" class="button_with_icon">
                    Download Scribe Attachment 
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </button>
            </div>

            <div class="text-xs py-2">
                Print the Attachment and Attach it with Your Admit Card.
            </div>
        </div>
      </center>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user_data: this.$store.state.data.cand_data,
    }
  },
  methods : {
    download_pdf_online(){
      const self = this
      var print_url = "http://devops-server.ibps.local:5003/exam/printPDF/"
      var dd = self.$store.state.data.user_data
      dd["mode"] = "ONLINE"           

      let formData = new FormData();
      formData.append("data", JSON.stringify(dd));

      console.log(dd)
      
      fetch(print_url, {
        method: 'POST',
        body: formData
      }).then((res) => { return res.blob(); })
      .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = dd['roll_no'] + '_ONLINE';
        a.click();                
      }); 
              
    },
  }
}
</script>
