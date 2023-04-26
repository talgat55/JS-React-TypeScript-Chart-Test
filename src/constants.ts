import {ChartOptions} from "chart.js";
import {IMonthItem, ISelectOptionItem} from "./ts/interfaces";
import {IManufactoryItem} from "./ts/interfaces/manufactories";

export const baseUrl = 'http://localhost:3001'
export const STORAGE_OPTION = 'select_option'
export const PIE_COLOR_YELLOW = '#ff9a23'
export const PIE_COLOR_GREEN = '#007413'
export const BAR_BLUE = 'blue'
export const BAR_RED = 'red'

export const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            grid: {
                display: false,

            },

        }
    },
    plugins: {
        legend: {
            position: 'bottom',
        },
        datalabels: {
            display: false
        }
    }
}

export const pieOptions: ChartOptions<'pie'> = {
    plugins: {
        legend: {
            position: 'bottom',
        },
        datalabels: {
            color: ({dataIndex, dataset: {backgroundColor}}: Record<string, any>) => backgroundColor[dataIndex],
            anchor: 'end',
            align: 'end',
            font: {
                size: 20
            }
        }
    }
}

export const manufactories: IManufactoryItem[] = [
    {
        id: 1,
        label: 'Фабрика А',
        backgroundColor: BAR_RED
    },
    {
        id: 2,
        label: 'Фабрика Б',
        backgroundColor: BAR_BLUE
    }
]

export const selectOptions: ISelectOptionItem[] = [
    {
        label: 'Все продукты',
        value: 'all',
    },
    {
        label: 'Продукт 1',
        value: 'product1',
    },
    {
        label: 'Продукт 2',
        value: 'product2',
    }
]

export const MONTHS: IMonthItem = {
    1: 'Янв',
    2: 'Фев',
    3: 'Мар',
    4: 'Апр',
    5: 'Май',
    6: 'Июн',
    7: 'Июл',
    8: 'Авг',
    9: 'Сен',
    10: 'Окт',
    11: 'Ноя',
    12: 'Дек',
}