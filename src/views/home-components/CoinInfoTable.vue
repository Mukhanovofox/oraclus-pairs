<template>
  <el-table :data="pairs_info" style="width: 100%">
    <el-table-column :sortable="true" prop="date" label="Date" min-width="180" />
    <el-table-column :sortable="true" prop="market_cap" label="Market Cap" min-width="250" />
    <el-table-column :sortable="true" prop="price_USD" label="Price (USD)" min-width="250" />
    <el-table-column :sortable="true" prop="total_supply" label="Total Supply" min-width="180" />
    <el-table-column :sortable="true" prop="circulating_supply" label="Circulating Supply" min-width="200" />
  </el-table>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  computed: {
    pairs_info() {
      return this.$store.getters.get_pairs_info;
    },
  }
}
</script>
