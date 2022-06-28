<template>
  <canvas id="PriceChart"></canvas>
</template>
<script>
import Chart from 'chart.js/auto';

export default {
  name: 'LineChart',
  props: {
    labels: [Object, Array],
    values: [Object, Array],
  },
  data: () => ({
    loading: false,
  }),
  mounted() {
    const ctx = document.getElementById('PriceChart').getContext('2d');
    let gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#b654a4');
    gradient.addColorStop(0.3, '#5c4696');
    gradient.addColorStop(0.6, 'transparent');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.values,
          borderColor: '#ff84af',
          fill: true,
          backgroundColor: gradient,
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: '#5c4696',
              padding: 10
            },
            grid: {
              drawBorder: false,
              color: '#323567',
            },
          },
          xAxes: {
            display: false
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            padding: 12,
            intersect: false,
            displayColors: false
          }
        },
        hover: {
          mode: 'index',
          intersect: false
        }
      }
    });
    myChart;
  },
  methods: {},
}
</script>
