import { useEffect } from "react"
import Chart from 'chart.js/auto';

const LineBarChart = () => {

    useEffect(() => {

        var ctx = document.getElementById('lineChart').getContext('2d');
        var lineChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["2021","2022","2023","2024","2025"],
            datasets: [{
                type: 'bar',
                label: 'Number of edge sites',
                backgroundColor: "#08AE53",
                data: [100, 200, 500, 1250, 2000],
                yAxisID: 'y',
                order: 2,
              },{
                type: 'line',
                label: 'Number of edge servers',
                borderColor: "#99EDC3",
                borderWidth: 2,
                fill: false,
                borderDash: [6, 5],
                data: [6000, 15000, 47000, 120000, 198000],
                yAxisID: 'y1',
                order: 1,
              }]

        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            barPercentage: 0.4,
            elements:{
                point:{
                    borderWidth: 2,
                    radius: 3,
                    backgroundColor: '#99EDC3',
                }
            },
            layout: {
                padding: {
                    left: -10
                }
            },
            scales: {
              x: {
                ticks:{
                    color: "rgba(255, 255, 255, 0.87)",
                    font: {
                        size: 14,
                        family: 'Accord Alternate'
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                    display: false,
                },
                border:{
                    display: false
                },
              },
              y: {
                stacked: true,
                ticks:{
                    stepSize: 500,
                    padding: 10,
                    color: "rgba(255, 255, 255, 0.87)",
                    font: {
                        size: 14,
                        family: 'Accord Alternate'
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                border:{
                    display: false
                }
              },
              y1: {
                stacked: true,
                position: "right",
                ticks:{
                    stepSize: 50000,
                    padding: 0,
                    color: "rgba(255, 255, 255, 0.87)",
                    font: {
                        size: 14,
                        family: 'Accord Alternate'
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0)",
                },
                border:{
                    display: false
                }
              }
            },
            plugins: {
                tooltip: {
                    padding: 10,
                    caretSize: 6,
                    titleMarginBottom: 3,
                    boxWidth: 12,
                    boxHeight:11,
                    boxPadding: 3,
                    titleFont:{
                        size: 14,
                        family: 'Accord Alternate'
                    },
                    bodyFont:{
                        size: 13,
                        family: 'Accord Alternate'
                    }
                },
                legend: {
                    labels: {
                        font: {
                            size: 13,
                            family: 'Accord Alternate'
                        },
                        boxWidth: 16,
                        boxHeight: 8,
                        padding: 15,
                        color: "rgba(255, 255, 255, 0.68)",
                    },
                    position: "bottom",
                }
            }
            },
        });
        
        return () => {
            lineChart.destroy();
        }
    }, [])

  return (
        <canvas id='lineChart'></canvas>
  )
}

export default LineBarChart