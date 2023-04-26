import {ChartData} from "chart.js";
import {manufactories, MONTHS, PIE_COLOR_GREEN, PIE_COLOR_YELLOW} from "../constants";
import {IMappedNumberItem} from "../ts/interfaces";
import {IProductItem} from "../ts/interfaces/products";

export const getMonth = (value: number) => {
    return value + 1
}

export const getParsedDataBar = (products: IProductItem[], filter = 'all'): ChartData<"bar", number[]> => ({
    labels: getMonthsLabels(products).texts,
    datasets: manufactories.map(({backgroundColor, id, label}) => ({
        backgroundColor,
        label,
        data: getPreparedDataForChart(getMonthsLabels(products).numbers, getParsedDataByManufactoryAndProducts(id, getFilterItemsByProduct(products, filter))),
    })),
})

export const getParsedDataPie = (products: IProductItem[], labelsItems: string[]): ChartData<"pie", number[]> => ({
    labels: labelsItems,
    datasets: [
        {
            label: 'value',
            backgroundColor: [PIE_COLOR_GREEN, PIE_COLOR_YELLOW],
            data: getPreparedDataForPieChart(products),
        }
    ],
})

export const getPreparedDataForPieChart = (products: IProductItem[]) => {
    const data = products.reduce((acc: number[], item) => {
        acc = [acc[0] += item.product1, acc[1] += item.product2]
        return acc
    }, [0, 0])
    return [parseInt(String(data[0] / 1000)), parseInt(String(data[1] / 1000))]
}

export const getFilterItemsByProduct = (products: IProductItem[], filter: string) => {
    return products.map(item => ({
        ...item,
        value: ((filter !== 'all'  ? item[filter as keyof IProductItem] ?  item[filter as keyof IProductItem] as number : 0 : item.product1 + item.product2 + item.product3) / 1000).toFixed(2)
    }))
}

export const getPreparedDataForChart = (months: string[], products: IProductItem[]) => {
    return months.map(item => products.reduce((acc: number, {date, value}) => {
        if (value && date?.split('/')?.[1] === item) acc += +value;
        return acc
    }, 0))
}

export const getParsedDataByManufactoryAndProducts = (factory_id: number, products: IProductItem[]) => products.filter(filterItem => filterItem.factory_id === factory_id)

export const getMonthsLabels = (products: IProductItem[]) => {
    const months = products.reduce((acc: IMappedNumberItem, {date}) => (acc[date?.split('/')?.[1]] = 1, acc), {})
    const prepared = Object.keys(months).filter(item => item !== 'undefined').sort((a, b) => +a - +b);
    return {
        texts: prepared.map(item => MONTHS[item]),
        numbers: prepared
    }
}