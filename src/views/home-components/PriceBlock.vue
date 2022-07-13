<template>
    <div>
        <PriceChart v-if="chartData.labels && chartData.token0 && chartData.token1 && show" :labels="chartData.labels"
                    :token0="chartData.token0" :token1="chartData.token1"></PriceChart>
    </div>
</template>

<script>
    import moment from 'moment';
    import PriceChart from "@/components/PriceChart";

    export default {
        components: {
            PriceChart
        },
        data: () => ({
            show: true,
            chartData: {
                labels: [],
                token0: [],
                token1: [],
            },
        }),
        methods: {
            async createChartData() {
                this.show = false;
                let array1 = [];
                let token0 = [];
                let token1 = [];
                await this.pairs_info.forEach(function (elem) {
                    array1.push(moment(elem['created_time']).format('YYYY-MM-DD'));
                    token0.push(elem['token0Price']);
                    token1.push(elem['token1Price']);
                });
                this.chartData.labels = array1;
                this.chartData.token0 = token0;
                this.chartData.token1 = token1;
                this.show = true;
            }
        },
        created() {
            this.createChartData();
        },
        watch: {
            pairs_info: {
                handler() {
                    this.createChartData();
                }
            }
        },
        computed: {
            pairs_info() {
                return this.$store.getters.get_pairs_info;
            },
        }
    }
</script>
