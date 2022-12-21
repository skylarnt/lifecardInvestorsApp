import { Bar } from 'vue-chartjs'

export default {
    extends: Bar,
    props: {
        chartData: {}
    },
    data() {
        return {
            options: {
                scales: {
                    xAxes: [{
                        stacked: false,
                        // gridLines: { display: true }
                    }],
                    yAxes: [{
                        stacked: false
                    }]
                },
                legend: { display: true },
                responsive: true,
                maintainAspectRatio: false
            },
        }
    },
    mounted() {
        // this.renderChart({
        //     labels: ['Land', 'Mall', 'Yatch', 'Office space'],
        //     datasets: [{
        //             label: 'Investors',
        //             backgroundColor: 'rgba(115, 103, 240, 0.5)',
        //             borderColor: 'rgba(115, 103, 240, 0.5)',
        //             borderWidth: 1,
        //             hoverBackgroundColor: 'rgba(115, 103, 240, 1)',
        //             hoverBorderColor: 'rgba(115, 103, 240)',
        //             borderCapStyle: 'round',
        //             // barPercentage: 0.5,
        //             // barThickness: 9,
        //             data: [30, 50, 67, 150]
        //         },
        //     ]
        // }, this.options)
    },
    watch: {
        chartData() {
            this.renderChart({
                labels: this.chartData.name,
                datasets: [{
                        label: 'Investors',
                        backgroundColor: 'rgba(115, 103, 240, 0.5)',
                        borderColor: 'rgba(115, 103, 240, 0.5)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(115, 103, 240, 1)',
                        hoverBorderColor: 'rgba(115, 103, 240)',
                        borderCapStyle: 'round',
                        // barPercentage: 0.5,
                        // barThickness: 9,
                        data: this.chartData.values
                    },
                ]
            }, this.options)
        }
    },
}
