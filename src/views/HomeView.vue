<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-row type="flex" align="middle">
                    <p class="logo">Oraclus Pairs</p>
                </el-row>
            </el-header>
            <el-container class="fatherContainer">
                <Aside/>
                <el-main>
                    <el-empty v-if="pairs_info.length <= 0" description="Select Pairs"></el-empty>
                    <el-row :gutter="20" v-if="pairs_info.length > 0">
                            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                                <TotalLiquidityBlock v-loading="pairs_loading"/>
                            </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12">
                            <TotalSupplyBlock v-loading="pairs_loading"/>
                        </el-col>
                        <el-col :span="10">
                            <el-card>
                                <template #header>
                                    <div class="card-header">
                                        <span>Tokens Price</span>
                                    </div>
                                </template>
                                <PriceBlock v-loading="pairs_loading"/>
                            </el-card>
                        </el-col>
                        <el-col :span="14">
                            <el-card>
                                <template #header>
                                    <div class="card-header">
                                        <span>Information about the selected pair</span>
                                    </div>
                                </template>
                                <CoinInfoTable v-loading="pairs_loading"/>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Aside from "@/views/layout-components/Aside";
    import TotalLiquidityBlock from "@/views/home-components/TotalLiquidityBlock";
    import TotalSupplyBlock from "@/views/home-components/TotalSupplyBlock";
    import PriceBlock from "@/views/home-components/PriceBlock";
    import CoinInfoTable from "@/views/home-components/CoinInfoTable";

    export default {
        components: {
            Aside,
            TotalLiquidityBlock,
            TotalSupplyBlock,
            PriceBlock,
            CoinInfoTable
        },
        watch:{
            pairs_loading:{
                handler(newVal){
                    if(newVal === false){
                        this.$message.success('Data Updated');
                    }
                }
            }
        },
        computed: {
            pairs_loading() {
                return this.$store.getters.get_pairs_loading;
            },
            pairs_info() {
                return this.$store.getters.get_pairs_info;
            },
        }
    }
</script>
