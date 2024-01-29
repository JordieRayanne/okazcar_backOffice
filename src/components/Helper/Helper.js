export const helper = (object, navigate) => {
    if (object.hasOwnProperty("Error")) {
        if (object.Error === "Your token is expired") {
            localStorage.clear()
            navigate("/auth/login")
            return true
        }
    }
    return false
}

let colors = {
    gray: {
        100: "#f6f9fc",
        200: "#e9ecef",
        300: "#dee2e6",
        400: "#ced4da",
        500: "#adb5bd",
        600: "#8898aa",
        700: "#525f7f",
        800: "#32325d",
        900: "#212529",
    },
    theme: {
        default: "#172b4d",
        primary: "#5e72e4",
        secondary: "#f4f5f7",
        info: "#11cdef",
        success: "#2dce89",
        danger: "#f5365c",
        warning: "#fb6340",
    },
    black: "#12263F",
    white: "#FFFFFF",
    transparent: "transparent",
};

export let plotChartData= (rows) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let values = []
    let d
    for (let month of months) {
        d = Object.entries(rows).filter(([key]) => key === month);
        values.push(d[1])
    }
    return {
        options: {
            scales: {
                yAxes: [
                    {
                        gridLines: {
                            color: colors.gray[900],
                            zeroLineColor: colors.gray[900],
                        },
                        ticks: {
                            callback: function (value) {
                                if (!(value % 10)) {
                                    return "Ar " + value;
                                }
                            },
                        },
                    },
                ],
            },
            tooltips: {
                callbacks: {
                    label: function (item, data) {
                        let label = data.datasets[item.datasetIndex].label || "";
                        let yLabel = item.yLabel;
                        let content = "";

                        if (data.datasets.length > 1) {
                            content += label;
                        }

                        content += "Ar " + yLabel;
                        return content;
                    },
                },
            },
        },
        datas: () => {
            return {
                labels: months,
                datasets: [
                    {
                        label: "Revenues",
                        data: values,
                    },
                ],
            };
        }
    }
}