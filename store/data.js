export const state = () => ({
    surl : 'http://devops-server.ibps.local:5003/',
    user_data : {
        otp : false,
        roll_no : '',
        reg_no : '',
        project_id : '',
        exam_id : '',
    },
    cand_data : {
        name : '',
        project_name : '',
        project_post : '',
    },
    scribe_data : {
        s_mobile : '',
        s_email : '',
        name : {
            first : '',
            middle : '',
            last : ''
        },
        gender : '',
        photo : '',
        address : {
            permanent : {
                basic : '',
                city : '',
                state : '',
                pinc_code : ''
            },
            correspondence : {
                basic : '',
                city : '',
                state : '',
                pinc_code : ''
            },
        },
        academics : {
            dropdown : ''
        }        

    }
})


export const mutations = {
    insert_roll_reg(state, f_data){
        state.user_data.reg_no = f_data.reg_no
        state.user_data.roll_no = f_data.roll_no
        state.user_data.project_id = f_data.project_id
    },

    insert_otp(state, otp){
        state.user_data.otp = otp
    }, 

    login_data(state, data){
        state.user_data.exam_id = data.exam_id
    },

    cand_data(state, data){
        state.cand_data.name = data.candidate_name
        state.cand_data.project_name = data.project_name
        state.cand_data.project_post  = data.project_post 
    },

    scribe_data(state, data){
        state.scribe_data = data
    },

    resend_otp(state, data){
        state.user_data.otp = data.otp
        state.user_data.exam_id = data.exam_id
    },

}