<template>
  <div class="p-2 min-h-screen bg-ibps-900 mx-auto">
    <div class="mt-14 lg:flex items-center gap-2 w-full mx-auto">
      <Logo />
      
      <div class="lg:w-1/2">
        <center class="p-2 flex flex-col gap-4 lg:w-3/4 mx-auto">
          <nuxt-link to="/login?p=ibpstest">
            <Buttonsecondary title="Login" />
          </nuxt-link>
          <nuxt-link to="/faq">
            <Buttonsecondary title="FAQs" />
          </nuxt-link>
        </center>
      </div>
    </div>
    <div class="text-center text-xs font-semibold py-8 text-white">
        Ver 0.0.1  Beta
    </div>
  </div>
</template>

<script>
export default {}
</script>