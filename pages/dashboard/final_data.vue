<template>
  <div class="min-h-screen bg-white select-none">
    <Lnavbar :data="user_data" />

    <div class="text-center text-2xl font-semibold py-4 pt-9">
      Please fill details of Scribe.
    </div>

    <div class="px-6 py-3 container mx-auto">
      <div class="mx-auto grid grid-cols-9 gap-2 items-center">
        <div class="grid justify-items-center">
          <div
            class="txt"
            :class="stage >= 0 ? 'text-ibps-600' : 'text-gray-300'"
          >
            Basic Details
          </div>
          <div
            v-show="stage == 0"
            class="h-1 w-1 bg-ibps-600 rounded-full"
          ></div>
        </div>
        <div
          class="hr"
          :class="stage >= 0 ? 'bg-ibps-600' : 'bg-gray-300'"
        ></div>

        <div class="grid justify-items-center">
          <div
            class="txt"
            :class="stage >= 1 ? 'text-ibps-600' : 'text-gray-300'"
          >
            Photo & Sign
          </div>
          <div
            v-show="stage == 1"
            class="h-1 w-1 bg-ibps-600 rounded-full"
          ></div>
        </div>
        <div
          class="hr"
          :class="stage >= 1 ? 'bg-ibps-600' : 'bg-gray-300'"
        ></div>

        <div class="grid justify-items-center">
          <div
            class="txt"
            :class="stage >= 2 ? 'text-ibps-600' : 'text-gray-300'"
          >
            Address
          </div>
          <div
            v-show="stage == 2"
            class="h-1 w-1 bg-ibps-600 rounded-full"
          ></div>
        </div>
        <div
          class="hr"
          :class="stage >= 2 ? 'bg-ibps-600' : 'bg-gray-300'"
        ></div>

        <div class="grid justify-items-center">
          <div
            class="txt"
            :class="stage >= 3 ? 'text-ibps-600' : 'text-gray-300'"
          >
            Academic Details
          </div>
          <div
            v-show="stage == 3"
            class="h-1 w-1 bg-ibps-600 rounded-full"
          ></div>
        </div>
        <div
          class="hr"
          :class="stage >= 3 ? 'bg-ibps-600' : 'bg-gray-300'"
        ></div>

        <div class="grid justify-items-center">
          <div
            class="txt"
            :class="stage >= 4 ? 'text-ibps-600' : 'text-gray-300'"
          >
            Identification
          </div>
          <div
            v-show="stage == 4"
            class="h-1 w-1 bg-ibps-600 rounded-full"
          ></div>
        </div>
      </div>
    </div>

    <div class="p-6 border-2 border-gray-300 rounded-xl w-4/5 mx-auto mt-2">
      <div class="p-6" v-show="stage == 0">
        <form @submit="nnext">
          <div class="flex items-center gap-2 font-semibold mb-2">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Basic Details
          </div>
          <div class="grid grid-cols-3 gap-5">
            <div class="py-2">
              <div class="label_text">First Name</div>
              <input
                type="text"
                required
                v-model="temp_data.fname"
                :readonly="o_data.fname"
                pattern="^([a-zA-Z]+.{0,1}\s{0,1})+$"
              />
            </div>

            <div class="py-2">
              <div class="label_text">Middle Name</div>
              <input
                type="text"
                v-model="temp_data.mname"
                :readonly="o_data.mname"
              />
            </div>

            <div class="py-2">
              <div class="label_text">Last Name</div>
              <input
                type="text"
                v-model="temp_data.lname"
                :readonly="o_data.lname"
              />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-5">
            <div class="py-2">
              <div class="label_text">Father/Mother/Guardian's Name</div>
              <input
                type="text"
                required
                :readonly="o_data.s_father"
                v-model="temp_data.s_father"
                pattern="^([a-zA-Z]+.{0,1}\s{0,1})+$"
              />
            </div>
            <div class="py-2 grid grid-cols-5 gap-5">
              <div class="col-span-2">
                <div class="label_text">Gender</div>
                <select
                  v-model="temp_data.gender"
                  required
                  :disabled="o_data.gender"
                >
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                  <option value="TRANSGENDER">Transgender</option>
                </select>
              </div>

              <div class="col-span-3">
                <div class="label_text">Date of Birth</div>
                <input
                  required
                  :max="check_date_of_birth()"
                  type="date"
                  :readonly="o_data.dob"
                  v-model="temp_data.dob"
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-4 gap-5">
            <div class="py-2 col-span-2">
              <div class="label_text">Mobile Number</div>
              <input type="text" readonly required v-model="temp_data.mobile" />
            </div>

            <div class="py-2 col-span-2">
              <div class="label_text">Email Address</div>
              <input type="text" readonly required v-model="temp_data.email" />
            </div>
          </div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-3">
              <button @click="conso(temp_data.fname)" class="hidden">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Save
              </button>
            </div>
            <div>
              <button type="submit" ref="s0" class="round_button_with_icon">
                next
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="p-6" v-show="stage == 1">
        <form @submit="nnext">
          <div class="flex items-center gap-2 font-semibold mb-2">
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
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Photo
          </div>

          <div class="grid grid-cols-3 gap-5">
            <div class="py-2">
              <img
                ref="photo_show"
                class="w-[180px] h-[200px] shadow-lg border border-2 rounded-md"
                required
                :src="
                  temp_data.photo
                    ? temp_data.photo
                    : 'data:image/png;base64,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'
                "
                alt
              />
            </div>

            <div class="col-span-2">
              <div class="flex items-center gap-5">
                <div class="py-2">
                  <div class="label_text">Change Profile Photo</div>
                  <input
                    :required="temp_data.photo ? false : true"
                    type="file"
                    accept=".png,.jpg"
                    v-on:change="photo_fun"
                    ref="photo_file"
                  />
                </div>

                <div class="py-2 hidden">
                  <button class="button_with_icon mt-5">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    {{ p_title }}
                  </button>
                </div>
              </div>
              <div
                class="
                  text-sm text-ibps-500
                  w-2/3
                  border border-ibps-300
                  px-4
                  py-2
                  bg-ibps-100
                  rounded-md
                "
              >
                Photo (JPG or PNG Format) :
                <br />
                Minimum Dimensions (W x H): 180px x 200px
                <br />
                File Size : 20KB to 100KB
              </div>
            </div>
          </div>

          <hr class="my-6" />

          <div class="grid grid-cols-3 gap-5">
            <div class="py-2">
              <div class="flex items-center gap-2 font-semibold mb-4">
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
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Signature
              </div>

              <img
                ref="sign_show"
                class="w-[180px] h-[100px] shadow-lg border border-2 rounded-md"
                :src="
                  temp_data.sign
                    ? temp_data.sign
                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABkCAMAAAAYLeovAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAFFQTFRF////mpqal5eXvLy8lZWVlpaWsLCwuLi4c3Nz3NzcpaWl5eXl7e3twsLCubm59vb209PTysrKe3t7y8vLwcHBjIyMhISEnp6ejY2Np6enn5+fWOp8gwAAA+pJREFUeJztmWt7qygQgNlzvDALETVqov//hy5zAW2TZrs9VrfPM++HeiW+4IAwNUZRFEVRFEVRFEVRFEVRFOWn8NevX78/eWtRltW3umRqa22NO5B23hLP/v3Jn4q3FjuavUClT5N2AM74S3PxyYSlAzRNA4FLwSUeNK0cGUe3nyhdxEd3cd/23Va66y2dvKZC6y1m4P1zpXtxglV6sImBC43FhEcO6yM1OFfaji6gZZmlfTTqwQBuYti0LZZw8egWt2g/BBhPlvayDUkaq4Ch0ElTY4gD3K29c8FZfuDM8EgXIElXUhMft/EDEqoUQTY2u1TowI44JOlhlS4epAvSS2LhniPc5huPlAZuO27M1qx+b6STGL+OFBB8K0jIhOOk8YX3MXbDJGNBIX4Ty7N0J6+hplCQKoSebnHSZYfjpM2M1suCAjgUkHTfXO/SmjLkYRWqFt/GxFE8Oyg5PKjEcsFrh0lTE/NA60V66tdjkYbU83rIRXp5GXLtwCEvKsj3reKPMnZEhwIj1UGkjb/RTTc6Sdcnl8LfoX1xYEyzN6RJRRo93Hoi48Fv9t1Hl86gOLa99kGlj4Lm04qifDcO2vwxKcqyO9fmU7Qy1+hpQmqf5g1eUsdF+Td4vaLN03cajb8g/YUifwrOyOa6rkaWjiu9/zprOF7a50d6WlFnaWiaK61WvZGNi2c48t0VUzNXnuDRsgWwU/j4l0/R58jhob80XSrS7jWJSmujhNQhLBgw95YPaVGFi4M4/ZQyRFpiEUALGGPyhx+vtD3t+5K7zWUna0vLDNgcovRNOucqLZP+kqWnAmfQWN3X0pywwSwJryR2iqNZ9BbYSKPlBGHYSMcQaGVl4jqMkjBSbmETHk+k7dx1NWUhgB+1zzQm3LYvW6Tx8a3UKNXBbJIDFPt4MZhNR3wiTRdwCfPV8fQjXDWydZt/9yaP38R0tZEe8jIS/kWaOm7uA1bWyjvRjvJo3qTFHmw64io9rw5PpadV2ryX3nVq7qUV2CBlvYan0vHvGNZ2f5C276QxEVIBs09MF5RgToEgBpiLWSQ18CC9zUyKdJWl3ZqkydKGf43aZp+hOnbssmloWHZZmnIx95JC90Ea+9UdXJXCA9O9S9NwVadmtg/SWG6JzXxd7D6zlDXcth1c8i3zM+k0iI8iLWkSqSrnbN5Km/FNJ/hzuhv7TV2qAwWou022gJYf806aRsl+SDEd6lGkKWdT+OJBOv2zY6oesydfxAM8ScUgaSh+T4APWuxFkubDh+xGXcUAD83eY9T3kv5dJUnIn0H659X8g5wxaoe6OzmLqCiKoiiKoiiKoiiKovwf+AfhrkSA9LqIBgAAAABJRU5ErkJggg=='
                "
                alt
              />
            </div>

            <div class="col-span-2">
              <div class="flex items-center gap-5">
                <div class="py-2">
                  <div class="label_text">Change Signature</div>
                  <input
                    type="file"
                    :required="temp_data.sign ? false : true"
                    v-on:change="sign_fun"
                    ref="sign_file"
                    accept=".png,.jpg"
                  />
                </div>
                <div class="py-2 hidden">
                  <button class="button_with_icon mt-5">
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
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    {{ p_title }}
                  </button>
                </div>
              </div>
              <div
                class="
                  text-sm text-ibps-500
                  w-2/3
                  border border-ibps-300
                  px-4
                  py-2
                  bg-ibps-100
                  rounded-md
                "
              >
                Signature Size (JPG or PNG Format) : <br />
                Minimum 180px Width x 100px Height. <br />
                File Size : 10KB to 50KB
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-3">
              <button
                @click="stage = 0"
                type="button"
                class="round_button_with_icon"
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
                    d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                  />
                </svg>
                Back
              </button>
              <button class="hidden">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Save
              </button>
            </div>
            <div>
              <button type="submit" ref="s1" class="round_button_with_icon">
                next
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="p-6" v-show="stage == 2">
        <form @submit="nnext">
          <div class="flex items-center gap-2 font-semibold mb-2">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Address
          </div>

          <div class="grid gap-5">
            <div class="py-2">
              <div class="label_text">Correspondence Address</div>
              <textarea
                required
                @change="cp_addr"
                v-model="temp_data.c_address"
                style="resize: none"
              ></textarea>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-5">
            <div class="py-2">
              <div class="label_text">State</div>
              <select
                required
                @change="stciti(temp_data.c_state)"
                v-model="temp_data.c_state"
              >
                <option
                  v-for="(key, value) in states_cities"
                  :key="value"
                  :value="value"
                >
                  {{ value }}
                </option>
              </select>
            </div>

            <div class="py-2">
              <div class="label_text">District / City</div>
              <select required v-model="temp_data.c_city">
                <option
                  v-for="key in states_cities[temp_data.c_state]"
                  :key="key[0]"
                  :value="key[0]"
                >
                  {{ key[1] }}
                </option>
              </select>
            </div>

            <div class="py-2">
              <div class="label_text">Pin Code</div>
              <input
                type="text"
                maxlength="6"
                required
                @change="cp_addr"
                v-model="temp_data.c_pincode"
              />
              <div
                :class="
                  /^\d{6}$/.test(temp_data.c_pincode)
                    ? 'green_validation'
                    : 'red_validation'
                "
              >
                Please enter valid PIN Code
              </div>
            </div>
          </div>

          <div
            class="
              flex
              items-center
              gap-5
              px-4
              py-2
              border border-ibps-400
              rounded-lg
              my-4
              hidden
            "
          >
            <div>
              <input @change="cp_addr" type="checkbox" v-model="pc_addr" />
            </div>
            <div class="text-md">
              Permanent Address same as Correspondence Address
            </div>
          </div>

          <div v-show="!pc_addr">
            <div class="grid gap-5">
              <div class="py-2">
                <div class="label_text">Permanent Address</div>
                <textarea v-model="temp_data.p_address"></textarea>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-5">
              <div class="py-2">
                <div class="label_text">City</div>
                <input type="text" v-model="temp_data.p_city" />
              </div>

              <div class="py-2">
                <div class="label_text">State</div>
                <input type="text" v-model="temp_data.p_state" />
              </div>

              <div class="py-2">
                <div class="label_text">Pin Code</div>
                <input type="number" v-model="temp_data.p_pincode" />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-3">
              <button
                @click="stage = 1"
                type="button"
                class="round_button_with_icon"
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
                    d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                  />
                </svg>
                Back
              </button>
              <button class="hidden">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Save
              </button>
            </div>
            <div>
              <button type="submit" ref="s2" class="round_button_with_icon">
                next
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="p-6" v-show="stage == 3">
        <form @submit="nnext">
          <div class="flex items-center gap-2 font-semibold mb-2">
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Academic Details
          </div>

          <div class="grid gap-5">
            <div class="py-2">
              <div class="label_text">Select Highest Qualification Type</div>
              <select
                :disabled="o_data.highest_qualification"
                v-model="temp_data.highest_qualification"
              >
                <option v-for="(key, value) in edu" :key="key" :value="value">
                  {{ key }}
                </option>
              </select>
            </div>
          </div>

          <div class="grid gap-5 hidden">
            <div class="py-2">
              <div class="label_text">Enter Details of Qualification</div>
              <input v-model="temp_data.degree_details" />
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-3">
              <button
                @click="stage = 2"
                type="button"
                class="round_button_with_icon"
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
                    d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                  />
                </svg>
                Back
              </button>
              <button class="hidden">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Save
              </button>
            </div>
            <div>
              <button type="submit" ref="s3" class="round_button_with_icon">
                next
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="p-6" v-show="stage == 4">
        <form @submit="stop_default">
          <div class="flex items-center gap-2 font-semibold mb-2">
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
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Identication
          </div>

          <div class="grid grid-cols-2 gap-5 items-center">
            <div class="py-2">
              <div class="label_text">Select Type of Identification</div>
              <select v-model="temp_data.selected_id_type">
                <option value="aadhaar_no">Aadhar Card</option>
                <option value="dl_no">Driving License</option>
                <option value="passport_no">Passport Number</option>
                <option value="pan_no">Pan Card</option>
                <option value="voter_no">Voter No</option>
                <option value="other_no" disabled>Other</option>
              </select>
            </div>

            <div
              class="py-2"
              v-show="temp_data.selected_id_type == 'aadhaar_no'"
            >
              <div class="label_text">
                Aadhar Card
                <span class="text-xs text-red-500">
                  (Enter last 4 digits only)
                </span>

                <span
                  :class="
                    /^\d{4}$/.test(temp_data.nid_details.aadhaar_no)
                      ? 'green_validation'
                      : 'red_validation'
                  "
                >
                  Please enter valid Aadhaar Number.
                </span>
              </div>

              <div class="flex items-center">
                <div class="w-38 text-lg">xxxx-xxxx-xxxx-</div>
                <div>
                  <input
                    type="text"
                    v-model="temp_data.nid_details.aadhaar_no"
                    maxlength="4"
                    pattern="\d{4}"
                    :readonly="o_data.id_details.aadhaar_no"
                  />
                </div>
              </div>
            </div>

            <div class="py-2" v-show="temp_data.selected_id_type == 'dl_no'">
              <div class="label_text">
                Driving License Number
                <span
                  :class="
                    /^[A-Z]{2}\d{13}$/.test(temp_data.nid_details.dl_no)
                      ? 'green_validation'
                      : 'red_validation'
                  "
                >
                  Please enter valid Driving License Number.
                </span>
              </div>
              <input
                pattern="[A-Z]{2}\d{13}"
                type="text"
                :readonly="o_data.id_details.dl_no"
                v-model="temp_data.nid_details.dl_no"
                maxlength="15"
              />
            </div>

            <div
              class="py-2"
              v-show="temp_data.selected_id_type == 'passport_no'"
            >
              <div class="label_text">
                Passport Number
                <span
                  :class="
                    /^[A-PR-WY][1-9]\d\s?\d{4}[1-9]$/.test(
                      temp_data.nid_details.passport_no
                    )
                      ? 'green_validation'
                      : 'red_validation'
                  "
                >
                  Please enter valid Passport Number.
                </span>
              </div>
              <input
                type="text"
                pattern="[A-PR-WY][1-9]\d\s?\d{4}[1-9]"
                maxlength="9"
                :readonly="o_data.id_details.passport_no"
                v-model="temp_data.nid_details.passport_no"
              />
            </div>

            <div class="py-2" v-show="temp_data.selected_id_type == 'pan_no'">
              <div class="label_text">
                PAN Card Number
                <span
                  :class="
                    /^[A-Z]{3}P[A-Z]\d{4}[A-Z]$/.test(
                      temp_data.nid_details.pan_no
                    )
                      ? 'green_validation'
                      : 'red_validation'
                  "
                >
                  Please enter valid PAN Card Number.
                </span>
              </div>
              <input
                type="text"
                maxlength="10"
                pattern="[A-Z]{3}P[A-Z]\d{4}[A-Z]"
                :readonly="o_data.id_details.pan_no"
                v-model="temp_data.nid_details.pan_no"
              />
            </div>

            <div class="py-2" v-show="temp_data.selected_id_type == 'voter_no'">
              <div class="label_text">
                Voter ID Card
                <span
                  :class="
                    /^[A-Z]{3}\d{7}$/.test(temp_data.nid_details.voter_no)
                      ? 'green_validation'
                      : 'red_validation'
                  "
                >
                  Please enter valid Voter ID Card Number.
                </span>
              </div>
              <input
                type="text"
                pattern="[A-Z]{3}\d{7}"
                maxlength="10"
                :readonly="o_data.id_details.voter_no"
                v-model="temp_data.nid_details.voter_no"
              />
            </div>

            <div class="py-2" v-show="temp_data.selected_id_type == 'other_no'">
              <div class="label_text">Any Other ID</div>

              <div class="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Other ID Type"
                  v-model="temp_data.nid_details.other_no_type"
                />
                <input
                  type="text"
                  placeholder="Number"
                  v-model="temp_data.nid_details.other_no"
                />
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center gap-3">
              <button
                class="round_button_with_icon"
                type="button"
                @click="stage = 3"
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
                    d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                  />
                </svg>
                Back
              </button>
              <button class="hidden">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Save
              </button>
            </div>
            <div>
              <button
                type="button"
                @click="submit_data"
                ref="s3"
                class="round_button_with_icon"
              >
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                Save & next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      states_cities: {},
      selected_cities: [],
      p_title: 'Select',
      s_title: 'Select',
      pc_addr: true,
      o_data: {
        id_details: {
          aadhaar_no: null,
          dl_no: null,
          passport_no: null,
          pan_no: null,
          voter_no: null,
        },
      },
      temp_data: {
        photo: '',
        sign: '',
        id_details: {
          aadhaar_no: null,
          dl_no: null,
          passport_no: null,
          pan_no: null,
          voter_no: null,
        },
        nid_details: {
          aadhaar_no: null,
          dl_no: null,
          passport_no: null,
          pan_no: null,
          voter_no: null,
        },
      },
      edu: {
        10: 'Xth / 10th / Matriculation',
        12: 'XIIth / 12th',
        cert: 'Certification',
        diploma: 'Diploma',
        bachelor: "Bachelors' / Under-Graduate",
        master: "Masters' / Post-Graduate",
        phd: 'Doctorate / Ph.D.',
      },
      user_data: this.$store.state.data.cand_data,
      sd: this.$store.state.data,
      stage: 0,
    }
  },
  mounted() {
    this.check_login()
    // this.go_online()

    this.fetch_states_cities()
    this.tdata()
  },
  methods: {
    fetch_states_cities() {
      const self = this
      console.log('looking for cities and states', self.$store.state)
      fetch(self.$store.state.data.surl + 'scribe/getStateCity/')
        .then((response) => response.json())
        .then((data) => {
          this.states_cities = data
          console.log('got cities/states.', this.states_cities)
        })
    },
    conso(x) {
      console.clear()
      console.log(x)
    },
    check_date_of_birth() {
      var today = new Date()
      var dd = today.getDate()
      var mm = today.getMonth() + 1 //January is 0!
      var yyyy = today.getFullYear() - 14 // scribe should be more than 14 years of age.

      if (dd < 10) {
        dd = '0' + dd
      }

      if (mm < 10) {
        mm = '0' + mm
      }

      today = yyyy + '-' + mm + '-' + dd
      return today
    },
    tdata() {
      console.log('tdata started')
      console.log('scribe data', this.$store.state.data.scribe_data)
      var asd = {}
      asd = { ...this.$store.state.data.scribe_data }
      this.o_data = { ...this.$store.state.data.scribe_data }

      asd['nid_details'] = { ...this.$store.state.data.scribe_data.id_details }
      asd['selected_id_type'] = 'aadhaar_no'
      asd['other_no'] = ''
      asd['other_no_type'] = ''

      this.temp_data = asd
      console.log('id', this.temp_data.id_details)
      console.log('nid', this.temp_data.nid_details)
      console.log('----- tracking tdata', asd)
      console.log('this.temp_data', this.temp_data)
      // Static Binding.

      if (this.temp_data.c_state) {
        console.log('got tdata, selecting state', this.temp_data.c_state)
        // this.stciti(this.temp_data.c_state)
      }
    },
    check_login() {
      if (this.$store.state.data.user_data.otp == '') {
        console.log('user invalid')
        this.$router.push('/')
      }
    },
    check_submit_data(e) {
      console.clear()
      const self = this

      console.log(this.temp_data)

      var sdata = { ...this.temp_data }
      if (this.temp_data.selected_id_type != 'other_no') {
        sdata[this.temp_data.selected_id_type] =
          this.temp_data.nid_details[this.temp_data.selected_id_type]
        delete sdata['other_no']
      } else {
        sdata[this.temp_data.selected_id_type] =
          this.temp_data.nid_details.other_no_type.toString().trim() +
          '#' +
          this.temp_data.nid_details.other_no.toString().trim()
      }

      // console.log(sdata['dob'].split('-'))

      // -------------------------------------------

      if (sdata['dob']) {
        var dd = sdata['dob'].split('-')
        sdata['dob'] = dd[2] + '/' + dd[1] + '/' + dd[0]
      } else {
        self.$swal('Please select date')
        sdata['dob'] = '0000/00/00'
      }

      // var dd = sdata['dob'].split("-")
      console.log(dd)

      delete sdata['id_details']
      delete sdata['nid_details']
      delete sdata['other_no_type']
      delete sdata['selected_id_type']
      delete sdata['photo']
      delete sdata['sign']

      // console.log("data", this.$store.state.data.user_data)
      console.log('scribe', sdata)

      var photo = this.$refs.photo_file.files[0]
      var sign = this.$refs.sign_file.files[0]

      const form_data = new FormData()
      form_data.append('photo', photo)
      form_data.append('sign', sign)

      form_data.append('data', JSON.stringify(this.$store.state.data.user_data))
      form_data.append('scribe', JSON.stringify(sdata))

      // console.clear()
      console.log('Posting this to server now ', form_data)
      // fetch(self.$store.state.data.surl + 'scribe/submit/', {
      //   method: 'POST',
      //   body: form_data,
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log('got response from server. find below.')
      //     console.log(data)
      //     self.$swal(data.data)
      //     if (data.status == 'success') {
      //       this.$router.push('/dashboard/success')
      //     }
      //   })

      // post to server
      console.log('Posted now...')
    },
    submit_data() {
      console.clear()
      const self = this

      console.log(this.temp_data)

      var sdata = { ...this.temp_data }
      if (this.temp_data.selected_id_type != 'other_no') {
        sdata[this.temp_data.selected_id_type] =
          this.temp_data.nid_details[this.temp_data.selected_id_type]
        delete sdata['other_no']
      } else {
        sdata[this.temp_data.selected_id_type] =
          this.temp_data.nid_details.other_no_type.toString().trim() +
          '#' +
          this.temp_data.nid_details.other_no.toString().trim()
      }

      // console.log(sdata['dob'].split('-'))

      // -------------------------------------------
      if (!sdata['mname']) {
        sdata['mname'] = ''
      }

      if (!sdata['lname']) {
        sdata['lname'] = ''
      }

      if (sdata['dob']) {
        var dd = sdata['dob'].split('-')
        sdata['dob'] = dd[2] + '/' + dd[1] + '/' + dd[0]
      } else {
        self.$swal('Please select date')
        sdata['dob'] = '0000/00/00'
      }

      // var dd = sdata['dob'].split("-")
      console.log(dd)

      delete sdata['id_details']
      delete sdata['nid_details']
      delete sdata['other_no_type']
      delete sdata['selected_id_type']
      delete sdata['photo']
      delete sdata['sign']

      // console.log("data", this.$store.state.data.user_data)
      console.log('scribe', sdata)

      var photo = this.$refs.photo_file.files[0]
      var sign = this.$refs.sign_file.files[0]

      const form_data = new FormData()
      form_data.append('photo', photo)
      form_data.append('sign', sign)

      form_data.append('data', JSON.stringify(this.$store.state.data.user_data))
      form_data.append('scribe', JSON.stringify(sdata))

      // console.clear()
      console.log('Posting to server now ')
      fetch(self.$store.state.data.surl + 'scribe/submit/', {
        method: 'POST',
        body: form_data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('got response from server. find below.')
          console.log(data)
          self.$swal(data.data)
          if (data.status == 'success') {
            this.$router.push('/dashboard/success')
          }
        })

      // post to server
      console.log('Posted now...')
    },
    validate(stage) {
      console.log(stage)
      // if(stage == 0){
      //   console.log("this is stage 0", stage)
      // }
    },
    nnext(e) {
      e.preventDefault()
      this.validate(e)
      console.log(e)
      // console.clear()
      this.stage += 1
    },
    asd() {
      console.clear()
      console.log(this.$refs.fileInput)
      console.log(this.$refs.fileInput.files[0])
      console.dir(this.$refs.fileInput)

      // this.$refs.fileInput.value = null;
    },
    photo_fun() {
      const self = this
      console.clear()

      var image_input = this.$refs.photo_file
      var img_p = URL.createObjectURL(image_input.files[0])
      // this.$refs.photo_show.src = img_p;

      // posting image to server to validate
      const form_data = new FormData()
      form_data.append('photo', image_input.files[0])
      fetch('http://devops-server.ibps.local:5003/scribe/validateImage/', {
        method: 'POST',
        body: form_data,
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log('got response from server. find below.')
          //console.log(data)
          if (data.status == 'error') {
            self.$swal(data.data)
            image_input.value = ''
          } else {
            self.$swal(data.data)
            this.$refs.photo_show.src = img_p
          }
        })
    },
    sign_fun() {
      const self = this
      console.clear()
      console.dir(this.$refs.sign_file.files[0])
      console.dir(this.$refs.sign_show)

      var image_input = this.$refs.sign_file
      var img_p = URL.createObjectURL(image_input.files[0])

      // posting image to server to validate
      const form_data = new FormData()
      form_data.append('sign', image_input.files[0])
      fetch('http://devops-server.ibps.local:5003/scribe/validateImage/', {
        method: 'POST',
        body: form_data,
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log('got response from server. find below.')
          //console.log(data)
          if (data.status == 'error') {
            self.$swal(data.data)
            image_input.value = ''
          }
          if (data.status == 'success') {
            self.$swal(data.data)
            this.$refs.sign_show.src = img_p
          }
        })
    },
    stop_default(e) {
      e.preventDefault()
    },
    stciti(state) {
      console.clear()
      this.fetch_states_cities()
      const self = this
      // change cities list based on selection of state
      console.log('showing cities...', this.states_cities, state)

      const myTimeout = setTimeout(myGreeting(state), 5000)

      function myGreeting(state) {
        console.log('retrying it')
        console.log('running automatically after 5 seconds....')
        console.log('state ', state)
        console.log(' self.states_cities[state] ', self.states_cities)
        self.selected_cities = self.states_cities[state]
      }

      // console.log('timed out')
      // console.log("running automatically....", state, this.states_cities[state])
      // this.selected_cities = this.states_cities[state]
    },
    cp_addr() {
      // console.clear()
      // if (this.pc_addr) {
      //   this.temp_data.p_address = this.temp_data.c_address
      //   this.temp_data.p_city = this.temp_data.c_city
      //   this.temp_data.p_state = this.temp_data.c_state
      //   this.temp_data.p_pincode = this.temp_data.c_pincode
      // } else {
      //   this.temp_data.p_address = ''
      //   this.temp_data.p_city = ''
      //   this.temp_data.p_state = ''
      //   this.temp_data.p_pincode = ''
      // }
      console.log('-')
    },
  },
}
</script>
