<template>
  <div class="">
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

      <div
        class="
          text-xs text-red-400
          animate-pulse
          drop-shadow-md
          px-2
          py-1
          rounded
        "
      >
        Please do not reload the page. otherwise you will be logged out of your
        session.
      </div>
      <div class="font-roboto">
        1800 222 366 &nbsp;&nbsp;&nbsp; 1800 103 4566
      </div>
    </div>

    <div class="bg-white flex items-center justify-between border-b-2">
      <div class="w-2/5 px-9 py-6">
        <img src="../assets/ibps_logo.png" />
      </div>
      <div class="text-ibps-800 flex items-center gap-3 text-right pr-6">
        <div class="font-semibold gap-1">
          <div class="text-sm">Welcome,</div>
          <div class="-text-xs uppercase">{{ data.name }}</div>
          <span class="text-xs uppercase bg-ibps-900 text-white px-2">
            {{ data.project_name }}
            <span class="font-normal"> {{ data.project_post }} </span>
          </span>
        </div>

        <div>
          <img
            class="h-10 rounded-full hidden"
            src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
          />
        </div>

        <nuxt-link to="/logout">
          <div
            class="
              text-red-400
              border-2 border-red-400
              rounded-full
              p-1.5
              flex
              items-center
              text-xs
              font-semibold
              gap-1              
            "
          >
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Logout
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
}
</script>
