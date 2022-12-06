<template>
  <div class="min-h-screen bg-white select-none">
    <Lnavbar />

    <div class="bg-ibps-900 text-white p-3 text-center font-semibold">IBPS Scribe - Admin Panel</div>

    <div class="container mx-auto border rounded p-3 m-3 grid grid-cols-12 gap-3">
      <div class="col-span-3">
        <div class="button_with_icon" @click="stage = 1">Export Data</div>
        <div class="button_with_icon" @click="stage = 2">Search</div>
        <div class="button_with_icon" @click="stage = 3">Create Exam</div>
      </div>

      <div class="col-span-9 m-1" v-show="stage == 1">
        <div class="font-semibold text-center text-xl py-1">Export Data</div>
        <div>
          <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500">
              <thead class="text-xs text-gray-700 uppercase bg-ibps-200/50">
                <tr>
                  <th scope="col" class="py-3 px-6">Candidate name</th>
                  <th scope="col" class="py-3 px-6">Roll No</th>
                  <th scope="col" class="py-3 px-6">Reg. No.</th>
                  <th scope="col" class="py-3 px-6">Scribe</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in scribes" :key="s" class="bg-white border-b">
                  <th
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >{{ s.candidate_name }}</th>
                  <td class="py-4 px-6">{{ s.roll_no }}</td>
                  <td class="py-4 px-6">{{ s.reg_no }}</td>
                  <td class="py-4 px-6">
                    <div v-show="s.scribe">{{ s.scribe }}</div>
                    <div v-show="!s.scribe">
                      <nuxt-link to="dashboard/enter_data">
                        <button class="button_light">Enter Data</button>
                      </nuxt-link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="col-span-9 m-1" v-show="stage == 2">
        <div class="font-semibold text-center text-xl py-1">Search Scribe</div>

        <div class="bg-gray-200 p-3">
          <div class="grid grid-cols-3 items-center gap-3">
            <div>
              <input type="text" class="mb-2" placeholder="Enter name of Scribe" />
            </div>
            <div>
              <button @click="results = true" class="button_light">Search</button>
            </div>
          </div>

          <div class="text-center p-3 font-semibold" v-show="results">No Results Found.</div>
        </div>
      </div>

      <div class="col-span-9 m-1" v-show="stage == 3">
        <div class="font-semibold text-center text-xl py-1">Search Create New Exam</div>

        <div class="bg-gray-200 p-3">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <label for="asd" class="text-sm p-1">Enter Exam Name</label>
              <input type="text" value="IBPS PS/SO" />
            </div>

            <div>
              <label for="asd" class="text-sm p-1">Starting Date</label>
              <input type="date" value="asd" />
            </div>

            <div>
              <label for="asd" class="text-sm p-1">Ending Date</label>
              <input type="date" value="asd" />
            </div>

            <div>
              <button @click="walert('Saved the Exam Data')" class="button_light">Save</button>
            </div>
            
          </div>
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
      offline: false,
      results: false,
      stage: 3,
      scribes: [
        {
          candidate_name: 'Anubhav',
          roll_no: '9876543210',
          reg_no: '9876543210',
          scribe: 'Anubhav',
        },
        {
          candidate_name: 'Ram',
          roll_no: '234234234',
          reg_no: '45647463425',
          scribe: 'Raj',
        },
        {
          candidate_name: 'Sam',
          roll_no: '234234234',
          reg_no: '45647463425',
          scribe: '',
        },
      ],
    }
  },
  methods : {
    walert(x){
      alert(x)
    }
  }
}
</script>

<style lang="postcss">
  .label_text {
    @apply text-gray-400 text-xs mb-0.5;
  }

  input,
  textarea {
    @apply px-4 py-2 border border-gray-400 rounded-md w-full;
  }

  .button_with_icon {
    @apply flex items-center cursor-pointer gap-2 bg-ibps-800 text-white px-4 py-2 mb-2;
  }

  .button_light {
    @apply flex items-center cursor-pointer gap-2 bg-ibps-700 text-white px-4 py-2 mb-2 rounded-full text-sm;
  }

  .round_button_with_icon {
    @apply flex items-center cursor-pointer gap-2 border-2 border-ibps-800 text-ibps-800 px-4 py-2 rounded-full font-semibold;
  }
</style>
