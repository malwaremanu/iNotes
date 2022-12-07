export const state = () => ({
  url: "https://database.deta.sh/v1/c0qm30mo/",
  api_key: "c0qm30mo_41yLNivjJxRLRnfVe8rs9npm1bMDcm9D",
  user_data: {},
});

export const mutations = {
  add_data(state, data) {
    state.user_data.otp = data.otp;
    state.user_data.exam_id = data.exam_id;
  },
};
