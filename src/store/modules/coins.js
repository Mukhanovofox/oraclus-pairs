import axios from "../../plugins/axios";
import moment from 'moment';
export const GET_PAIRS_INFO = "GET_PAIRS_INFO";
export const SELECT_PAIRS_OR_DATE_RANGE = "SELECT_PAIRS_OR_DATE_RANGE";
export const UPDATE_PAIRS_FORM = "UPDATE_PAIRS_FORM";
export const PAIRS_TOGGLE = "PAIRS_TOGGLE";
export const UPDATE_PAIRS_INFO = "UPDATE_PAIRS_INFO";

const state = {
    pairs_loading: false,
    pairs_form: {
        "pairs_id": "",
        "start_date": moment().subtract(1, 'w').format('YYYY-MM-DD'),
        "end_date": moment().format('YYYY-MM-DD')
    },
    pairs_info: []
}

const actions = {
    [GET_PAIRS_INFO]: async (store) => {
        const {data} = await axios({url: '', method: 'GET'});
        console.log(data);
        let data2 = [{
            "id": 1021338,
            "date": "2022-06-01",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 564669039321.6759,
            "price_USD": 29632.612045788588,
            "total_supply": 19055662.0,
            "circulating_supply": 19055662.0
        }, {
            "id": 1024143,
            "date": "2022-06-02",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 577986087412.4869,
            "price_USD": 30330.268227433735,
            "total_supply": 19056412.0,
            "circulating_supply": 19056412.0
        }, {
            "id": 1026947,
            "date": "2022-06-03",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 568131172992.1445,
            "price_USD": 29811.686274019405,
            "total_supply": 19057331.0,
            "circulating_supply": 19057331.0
        }, {
            "id": 1029751,
            "date": "2022-06-04",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 568127412099.5042,
            "price_USD": 29810.18904653577,
            "total_supply": 19058162.0,
            "circulating_supply": 19058162.0
        }, {
            "id": 1032552,
            "date": "2022-06-05",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 570718012298.9373,
            "price_USD": 29944.62765625897,
            "total_supply": 19059112.0,
            "circulating_supply": 19059112.0
        }, {
            "id": 1035354,
            "date": "2022-06-06",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 600539349351.5684,
            "price_USD": 31507.84731933366,
            "total_supply": 19059993.0,
            "circulating_supply": 19059993.0
        }, {
            "id": 1038157,
            "date": "2022-06-07",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 598883469419.0127,
            "price_USD": 31419.22766159329,
            "total_supply": 19061050.0,
            "circulating_supply": 19061050.0
        }, {
            "id": 1040959,
            "date": "2022-06-08",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 578800033861.6361,
            "price_USD": 30363.849115056793,
            "total_supply": 19062143.0,
            "circulating_supply": 19062143.0
        }, {
            "id": 1043757,
            "date": "2022-06-09",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 574896037851.4813,
            "price_USD": 30157.582077107487,
            "total_supply": 19063068.0,
            "circulating_supply": 19063068.0
        }, {
            "id": 1046541,
            "date": "2022-06-10",
            "coin_id": 1,
            "coin_symbol": "BTC",
            "coin_name": "Bitcoin",
            "market_cap": 557550178293.3081,
            "price_USD": 29246.204986446617,
            "total_supply": 19064018.0,
            "circulating_supply": 19064018.0
        }];
        await store.commit(UPDATE_PAIRS_INFO, data2);
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
