<template>
    <el-row :gutter="20">
        <el-col :span="24">
            <h2>Total Liquidity</h2>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <el-card class="chardCard">
                <div class="content">
                    <h3>Token0</h3>
                    <TotalLiquidityToken0 v-if="chartData.labels && chartData.token0 && show" :labels="chartData.labels"
                                          :values="chartData.token0"></TotalLiquidityToken0>
                </div>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12">
            <el-card class="chardCard">
                <div class="content">
                    <h3>Token1</h3>
                    <TotalLiquidityToken1 v-if="chartData.labels && chartData.token1 && show" :labels="chartData.labels"
                                          :values="chartData.token1"></TotalLiquidityToken1>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import moment from 'moment';
    import TotalLiquidityToken0 from "@/components/TotalLiquidityToken0";
    import TotalLiquidityToken1 from "@/components/TotalLiquidityToken1";

    export default {
        components: {
            TotalLiquidityToken0,
            TotalLiquidityToken1
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
                    token0.push(elem['token0']['totalLiquidity0']);
                    token1.push(elem['token1']['totalLiquidity1']);
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
