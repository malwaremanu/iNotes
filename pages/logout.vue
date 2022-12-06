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
    </div> -->

    <Gohome />

    <div class="lg:flex items-center gap-2 w-full mx-auto">
      <Logo />
      <div class="lg:w-1/2">
        <div class="px-4 py-3 bg-white rounded-xl lg:w-3/4 mx-auto">
          <div class="py-2">
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png" alt="" class="w-32 mx-auto"
            >          
          </div>
          <div class="py-2 text-2xl text-ibps-700 font-semibold text-center">
            Successfully Logged Out.
          </div>
          <div class="py-2">
              <nuxt-link to="/login">
                <Buttonprimary title="Login Again" />
              </nuxt-link>            
          </div>
        </div>
      </div>      
    </div>

    <div class="text-center text-xs font-semibold py-8 text-white">
        Ver 0.0.1  Beta
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    walert() {
      alert('We will work on it later on.')
    },
  },
}
</script>