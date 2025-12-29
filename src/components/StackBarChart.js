import { useEffect } from "react"
import Chart from 'chart.js/auto';

const StackBarChart = () => {

    useEffect(() => {

        var ctx = document.getElementById('barChart').getContext('2d');
        var barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["2020","2021","2022","2023","2024","2025","2026","2027","2028","2029","2030"],
            datasets: [{
                label: 'Hardware',
                backgroundColor: "#64A47F",
                data: [6, 12, 20, 32, 44, 56, 72, 86, 100, 120, 130],
            }, {
                label: 'Connectivity',
                backgroundColor: "#006229",
                data: [12, 24, 36, 48, 64, 80, 98, 120, 145, 160, 175],
            }, {
                label: 'Application',
                backgroundColor: "#00A445",
                data: [7, 18, 28, 43, 58, 75, 90, 115, 125, 140, 155],
            }, {
                label: 'Edge Infrastructure',
                backgroundColor: "#00FF6B",
                data: [7, 14, 21, 28, 35, 42, 47, 56, 63, 70, 77],
            }, {
                label: 'Integration & Support',
                backgroundColor: "#EAFFF3",
                data: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            barPercentage: 0.65,
            layout: {
                padding: {
                    left: -10
                }
            },
            scales: {
              x: {
                stacked: true,
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
                    stepSize: 100,
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
            barChart.destroy();
        }
    }, [])

  return (
        <canvas id='barChart'></canvas>
  )
}

export default StackBarChart