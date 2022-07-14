<template>
    <el-table :data="pairs_info" style="width: 100%">
        <el-table-column :sortable="true" min-width="150">
            <template #header>
                Date
            </template>
            <template #default="scope">
                {{ moment(scope.row.created_time) }}
            </template>
        </el-table-column>
        <el-table-column :sortable="true" min-width="150">
            <template #header>
                Reserve0
            </template>
            <template #default="scope">
                {{ Number(scope.row.reserve0).toFixed(2) }}
            </template>
        </el-table-column>
        <el-table-column :sortable="true" min-width="150">
            <template #header>
                Reserve1
            </template>
            <template #default="scope">
                {{ Number(scope.row.reserve1).toFixed(2) }}
            </template>
        </el-table-column>
        <el-table-column :sortable="true" min-width="150">
            <template #header>
                ReserveETH
            </template>
            <template #default="scope">
                {{ Number(scope.row.reserveETH).toFixed(2) }}
            </template>
        </el-table-column>
        <el-table-column :sortable="true" min-width="150">
            <template #header>
                ReserveUSD
            </template>
            <template #default="scope">
                {{ Number(scope.row.reserveUSD).toFixed(2) }}
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import moment from 'moment';

    export default {
        data: () => ({
            loading: false,
        }),
        methods: {
            moment: function (data) {
                return moment(data).format('YYYY-MM-DD');
            }
        },
        computed: {
            pairs_info() {
                return this.$store.getters.get_pairs_info;
            },
        }
    }
</script>
