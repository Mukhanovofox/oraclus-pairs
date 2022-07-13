<template>
    <el-aside width="240px" v-loading="loading">
        <p class="label">Select Date:</p>
        <ul class="periodList" v-loading="pairs_loading || !pairs_form.pairs_id">
            <li v-bind:key="item.id" v-for="item in periodArray" :class="item.id == pairs_form.period?'active':''" @click="selectPeriod(item.id)"><p>{{ item.name }}</p></li>
        </ul>
        <p class="label">Select Pairs:</p>
        <el-input
                v-model="filterInput"
                class="searchInput"
                placeholder="Pairs Search"
                :editable="pairs_loading"
        />
        <ul class="coinsList" v-loading="pairs_loading">
            <template v-bind:key="item.id" v-for="(item, index) in filteredList">
                <li :class="item.id === pairs_form.pairs_id?'active':''"
                    @click="selectPairs(item.id)" v-if="index <= 9">{{ item.token0.symbol0+' - '+item.token1.symbol1 }}
                </li>
            </template>
        </ul>
        <p class="copyr">Version 1.0<br>Oraclus 2022</p>
    </el-aside>
</template>

<script>
    import {GET_ALL_PAIRS} from '@/store/modules/coins';
    import {SELECT_PAIRS_OR_DATE_RANGE} from '@/store/modules/coins';

    export default {
        name: 'AsideComponent',
        data: () => ({
            loading: false,
            periodArray:[
                {
                    "id": "1",
                    "name": "7D"
                },
                {
                    "id": "2",
                    "name": "1M"
                },
                {
                    "id": "3",
                    "name": "3M"
                },
                {
                    "id": "4",
                    "name": "6M"
                },
                {
                    "id": "5",
                    "name": "1Y"
                },
                {
                    "id": "6",
                    "name": "All"
                }
            ],
            selected_pairs_id: '',
            selected_period: '',
            filterInput: '',
            list: [],
        }),
        methods: {
            async getAllPairs() {
                try {
                    this.loading = true;
                    let result = await this.$store.dispatch(GET_ALL_PAIRS);
                    this.list = result.data;
                    this.loading = false;
                } catch (e) {
                    console.log(e);
                    this.loading = false;
                }
            },
            async getPairsInfo() {
                let form = {
                    "pairs_id": this.selected_pairs_id,
                    "period": this.selected_period,
                };
                await this.$store.dispatch(SELECT_PAIRS_OR_DATE_RANGE, form);
            },
            async selectPairs(id) {
                this.selected_pairs_id = id;
                this.getPairsInfo();
            },
            async selectPeriod(id) {
                this.selected_period = id;
                this.getPairsInfo();
            },
            defaultInfo(){
                this.selected_pairs_id = this.pairs_form.pairs_id;
                this.selected_period = this.pairs_form.period;
            }
        },
        created() {
            this.getAllPairs();
            this.defaultInfo();
        },
        computed: {
            pairs_loading() {
                return this.$store.getters.get_pairs_loading;
            },
            pairs_form() {
                return this.$store.getters.get_pairs_form;
            },
            filteredList() {
                return this.list.filter((result) => {
                    return result.token0.symbol0.toLowerCase().match(this.filterInput.toLowerCase()) ||
                        result.token1.symbol1.toLowerCase().match(this.filterInput.toLowerCase());
                });
            }
        }
    }
</script>
