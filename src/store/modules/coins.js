import axios from "../../plugins/axios";
import moment from 'moment';
export const GET_ALL_PAIRS = "GET_ALL_PAIRS";
export const GET_PAIRS_INFO = "GET_PAIRS_INFO";
export const SELECT_PAIRS_OR_DATE_RANGE = "SELECT_PAIRS_OR_DATE_RANGE";
export const UPDATE_PAIRS_FORM = "UPDATE_PAIRS_FORM";
export const PAIRS_TOGGLE = "PAIRS_TOGGLE";
export const UPDATE_PAIRS_INFO = "UPDATE_PAIRS_INFO";

const state = {
    pairs_loading: false,
    pairs_form: {
        "pairs_id": "",
        "period": "1"
    },
    pairs_info: []
}

const actions = {
    [GET_ALL_PAIRS]: async () => {
        const {data} = await axios({url: 'uniswap/beta/api/post/shortinfo.php', method: 'GET'});
        console.log(data);
        return data;
    },
    [GET_PAIRS_INFO]: async (store) => {

        let form = {
            "id": state.pairs_form.pairs_id,
            "from_date": '',
            "to_date": moment().format('YYYY-MM-DD'),
        };
        switch (state.pairs_form.period) {
            case "1":
                form.from_date = moment().subtract(1, 'w').format('YYYY-MM-DD');
                break;
            case "2":
                form.from_date = moment().subtract(1, 'M').format('YYYY-MM-DD');
                break;
            case "3":
                form.from_date = moment().subtract(3, 'M').format('YYYY-MM-DD');
                break;
            case "4":
                form.from_date = moment().subtract(6, 'M').format('YYYY-MM-DD');
                break;
            case "5":
                form.from_date = moment().subtract(1, 'Y').format('YYYY-MM-DD');
                break;
            case "6":
                form.from_date = '';
                break;
        }
        const {data} = await axios({url: 'uniswap/beta/api/post/readidtime.php/',params: form , method:'GET'});
        await store.commit(UPDATE_PAIRS_INFO, data.data);
        await store.commit(PAIRS_TOGGLE, false);
        // return data;
    },
    [SELECT_PAIRS_OR_DATE_RANGE]: async (store, value) => {
        await store.commit(UPDATE_PAIRS_FORM, value);
        store.commit(PAIRS_TOGGLE, true);
        store.dispatch(GET_PAIRS_INFO);
    },
}

const mutations = {
    [UPDATE_PAIRS_FORM]: (state, payload) => {
        state.pairs_form = payload
    },
    [PAIRS_TOGGLE]:(state, value)=>{
        state.pairs_loading = value;
    },
    [UPDATE_PAIRS_INFO]:(state, value)=>{
        state.pairs_info = value;
    }
}

const getters = {
    get_pairs_info: (state) => state.pairs_info,
    get_pairs_form: (state) => state.pairs_form,
    get_pairs_loading: (state) => state.pairs_loading,
}
export default {
    state,
    actions,
    mutations,
    getters
}
