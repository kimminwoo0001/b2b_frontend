import { colors } from "../ui";
export const tooltip = {
  intersect: false,
  enabled: true,
  backgroundColor: colors.border_light,
  titleFont: { size: 12 },
  body: { size: 10 },
  displayColors: true,
  boxPadding: 8,
  boxWidth: 4,
  boxHeight: 4,
  usePointStyle: true,
  cornerRadius: 10,
};
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
        font: {
          size: 15,
        },
        padding: 0,
      },
      grid: {
        drawBorder: false,
        display: false,
      },
    },
    y: {
      suggestedMin: 0,
      suggestedMax: 10,
      offset: true,
      ticks: {
        labelOffset: true,
        color: colors.info,
        stepSize: 2,
        font: {
          size: 15,
        },
        padding: 10,
      },

      grid: {
        drawBorder: false,
        color: colors.bg_checkbox,
      },
    },
  },
  plugins: {
    tooltip,
    legend: {
      display: false,
      position: "top",
    },
    title: {
      display: false,
    },
  },
};

export const barOptions = {
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
        font: {
          size: 15,
        },
        padding: 0,
      },
      grid: {
        display: false,
        drawBorder: false,
        color: colors.bg_checkbox,
      },
    },

    y: {
      ticks: {
        labelOffset: true,
        borderColor: colors.info,
        color: colors.info,
        font: {
          size: 15,
        },
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
      ...tooltip,
      usePointStyle: false,
    },
    legend: {
      display: false,
    },
  },
};

export const radarOptions = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    mode: "index",
  },
  hover: {
    animationDuration: 100,
  },
  scales: {
    r: {
      min: 0,
      max: 100,
      pointLabels: {
        padding: 15,
        color: colors.info,
        font: {
          family: "'Spoqa Han Sans'",
          size: 15,
        },
      },
      ticks: {
        display: false,

        stepSize: 20,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
      },
      angleLines: {
        color: "#7f7c89",
        lineWidth: 1,
      },
      grid: {
        lineWidth: 1,
        color: colors.border_light,
      },
    },
  },
  plugins: {
    tooltip,
    legend: {
      display: true,
      position: "top",
      align: "start",
      labels: {
        // usePointStyle: true,
        boxWidth: 28,
        boxHeight: 3,

        font: {
          size: 15,
        },
        color: colors.text,
      },
    },
  },
};
