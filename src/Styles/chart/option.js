import { colors } from "../ui";

export const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  hover: {
    animationDuration: 100,
  },
  scales: {
    x: {
      offset: true,
      ticks: {
        labelOffset: true,
        borderColor: colors.info,
        color: colors.info,
        fontSize: 15,
        padding: 0,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      min: 0,
      max: 10,
      offset: true,
      ticks: {
        labelOffset: true,
        color: colors.info,
        stepSize: 2,
        fontSize: 15,
        padding: 10,
      },

      grid: {
        drawBorder: false,
        color: colors.bg_checkbox,
      },
    },
  },
  plugins: {
    tooltip: {
      intersect: false,
      backgroundColor: "#1d1d1d",
      titleFontSize: 12,
      bodyFontSize: 10,
      displayColors: true,
      boxWidth: 4,
      boxHeight: 4,
      cornerRadius: 10,
      usePointStyle: true,
    },
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
    },
  },
};
