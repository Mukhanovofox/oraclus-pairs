<template>
    <el-aside width="240px">
        <p class="label">Select Date:</p>
        <el-date-picker
                v-model="date_range"
                type="daterange"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                range-separator="-"
                start-placeholder="Start date"
                end-placeholder="End date"
                :size="size"
                :editable="false"
                @change="getPairsInfo"
        />
        <p class="label">Select Pairs:</p>
        <ul class="coinsList">
            <li v-bind:key="item.id" v-for="item in list[0]" :class="item.id === pairs_form.pairs_id?'active':''"
                @click="selectPairs(item.id)">{{ item.token0.symbol+' - '+item.token1.symbol }}
            </li>
        </ul>
        <p class="copyr">Version 1.0<br>Oraclus 2022</p>
    </el-aside>
</template>

<script>
    import {SELECT_PAIRS_OR_DATE_RANGE} from '@/store/modules/coins';

    export default {
        name: 'AsideComponent',
        data: () => ({
            loading: false,
            selected_pairs_id: '',
            date_range: [],
            list: [
                {
                    "pairs 1": {
                        "id": "0x00004ee988665cdda9a1080d5792cecd16dc1220",
                        "token0": {
                            "id": "0x4d44d6c288b7f32ff676a4b2dafd625992f8ffbd",
                            "name": "Solution Life Coin",
                            "symbol": "SLC",
                        },
                        "token1": {
                            "id": "0xdac17f958d2ee523a2206206994597c13d831ec7",
                            "name": "Tether USD",
                            "symbol": "USDT",
                        }
                    },
                    "pairs 2": {
                        "id": "0x0000871c95bb027c90089f4926fd1ba82cdd9a8b",
                        "token0": {
                            "id": "0x5152e1cb69a2ffa3997e89cbb4aba76a01d82141",
                            "name": "HARDCORE",
                            "symbol": "HORE",
                        },
                        "token1": {
                            "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                            "name": "Wrapped Ether",
                            "symbol": "WETH",
                        }
                    },
                    "pairs 3": {
                        "id": "0x00030110a7053083a7a160449a0e8f1adce9438d",
                        "token0": {
                            "id": "0x65f9a292f1aeed5d755aa2fd2fb17ab2e9431447",
                            "name": "SoMee.Social",
                            "symbol": "SOMEE",
                        },
                        "token1": {
                            "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                            "name": "Wrapped Ether",
                            "symbol": "WETH",
                        }
                    },
                    "pairs 4": {
                        "id": "0x00031554ee74e4a6d497677e5152d94c3dbe5f46",
                        "token0": {
                            "id": "0x59c8c614bcf74041143710ec09e5837d9383ba16",
                            "name": "DATO Curve x",
                            "symbol": "DATCx",
                        },
                        "token1": {
                            "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                            "name": "Wrapped Ether",
                            "symbol": "WETH",
                        }
                    },
                    "pairs 5": {
                        "id": "0x0003590d5a65a27163b23eb0721235c40f2b49b4",
                        "token0": {
                            "id": "0x36f4d7bfa207223e7324fb2bd2bac7aded147317",
                            "name": "Pizza Hut Metaverse",
                            "symbol": "Pizza Hut",
                        },
                        "token1": {
                            "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                            "name": "Wrapped Ether",
                            "symbol": "WETH",
                        }
                    },
                    "pairs 6": {
                        "id": "0x0003713f74bc8c3435f4499eb0cbc6298cd1529d",
                        "token0": {
                            "id": "0x2432c78801380ba2538f9bddf65c81d525e64db4",
                            "name": "WGRT",
                            "symbol": "WGRT",
                        },
                        "token1": {
                            "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                            "name": "Wrapped Ether",
                            "symbol": "WETH",
                        }
                    },
                    "pairs 7": {
                        "id": "0x00048cf1acdb5fa81a0facf869ef60c3f49bfe36",
                        "token0": {
                            "id": "0x34c3f50e408abac32436d7f744f89379e5c2b972",
                            "name": "CocktailToken",
                            "symbol": "COCK",
                        },
                        "token1": {
                            "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                            "name": "Wrapped Ether",
                            "symbol": "WETH",
                        }
                    },
                    "pairs 8": {
                        "id": "0x0004a5a4fbc295b31680d992626b635f5225fce3",
                        "token0": {
                            "id": "0x164a5597a5cdd38a118703bd90d7b7f46b1f1a60",
                            "name": "ElonRogan",
                            "symbol": "ER",
                        },
                        "token1": {
                            "id": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
                            "name": "Wrapped Ether",
                            "symbol": "WETH",
                        }
                    }
                }
            ]
        }),
        methods: {
            async getPairsInfo() {
                let form = {
                    "pairs_id": this.selected_pairs_id,
                    "start_date": this.date_range[0],
                    "end_date": this.date_range[1]
                };
                await this.$store.dispatch(SELECT_PAIRS_OR_DATE_RANGE, form);
            },
            async selectPairs(id) {
                this.selected_pairs_id = id;
                this.getPairsInfo();
            },
            defaultInfo() {
                this.selected_pairs_id = this.pairs_form.pairs_id;
                this.date_range[0] = this.pairs_form.start_date;
                this.date_range[1] = this.pairs_form.end_date;
            }
        },
        created() {
            this.defaultInfo();
        },
        computed: {
            pairs_form() {
                return this.$store.getters.get_pairs_form;
            },
        }
    }
</script>
