<template>
    <div class="home">
        <LineChart v-if="chartData.labels && chartData.values && show" :labels="chartData.labels"
                   :values="chartData.values"></LineChart>
    </div>
</template>

<script>
    import LineChart from "@/components/TotalSupplyChart";

    export default {
        components: {
            LineChart
        },
        data: () => ({
            show: true,
            chartData: {
                labels: [],
                values: [],
            },
        }),
        methods: {
         async createChartData() {
                this.show = false;
                let array1 = [];
                let array2 = [];
                await this.pairs_info.forEach(function (elem) {
                    array1.push(elem['date']);
                    array2.push(elem['total_supply']);
                });
                this.chartData.labels = array1;
                this.chartData.values = array2;
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
