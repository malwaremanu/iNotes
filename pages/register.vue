<template>
  <div class="p-2 min-h-screen bg-ibps-900 select-none">
    <Gohome />

    <div class="lg:flex items-center gap-2 w-full my-2 mx-auto lg:p-9">
      <center class="py-5 lg:w-1/3">
        <Logo />
      </center>

      <div>
        asdasd
      </div>
    </div>

    <Footer />
  </div>
</template>


<script>
export default {
  methods : {
    counts(){
      console.log('asdasdsad')
    }
  }
}
</script>


<style lang="postcss" scoped>
input {
  @apply border border-ibps-400 w-full rounded-md py-2 px-3 text-sm;
}

div label {
  @apply text-gray-500 text-xs py-1;
}
</style>