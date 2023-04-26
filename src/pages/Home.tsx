import React, {memo, useEffect, useRef, useState, ChangeEvent, MouseEvent} from 'react';
import {ChartData} from "chart.js";
import {useNavigate} from "react-router-dom";
import {Bar, getElementAtEvent} from 'react-chartjs-2';
import {useAppSelector} from '../store/store'
import BaseLayout from '../components/layouts/BaseLayout';
import {chartOptions, manufactories, selectOptions, STORAGE_OPTION} from "../constants";
import {getMonth, getParsedDataBar} from '../utils/products';
import routes from "../nav/routes";

const Home = () => {
    const products = useAppSelector((store) => store.products.products);
    const navigate = useNavigate();
    const bartRef = useRef(null)
    const [chooseProduct, setChooseProduct] = useState(()=> localStorage.getItem(STORAGE_OPTION) || selectOptions[0].value);
    const [chartData, setChartData] = useState<ChartData<"bar", number[]> | null>(null);

    useEffect(() => {
        setChartData(getParsedDataBar(products, chooseProduct))

        return () => setChartData(null)
    }, [products, chooseProduct]);

    const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
        const {current: chart} = bartRef;
        if (!chart) return
        const [element] = getElementAtEvent(chart, event);
        if (!element) return
        const {datasetIndex, index} = element
        const findManufactor = manufactories.find((_, index) => index === datasetIndex)
        if (!findManufactor) return;
        const month = getMonth(index);
        navigate(`${routes.details}/${findManufactor.id}/${month}`)
    }

    const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value
        setChooseProduct(value)
        localStorage.setItem(STORAGE_OPTION, value)
    }

    return (
        <BaseLayout>
            <div className="select">
                <div className="select_content">
                    <p>
                        Фильтр по типу продукции
                    </p>
                    <select
                        defaultValue={chooseProduct}
                        onChange={onChangeSelect}
                        name="choose_product"
                    >
                        {selectOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="chat">
                {
                    chartData &&
                    <Bar
                        ref={bartRef}
                        data={chartData}
                        onClick={onClick}
                        options={chartOptions}
                    />
                }
            </div>
        </BaseLayout>
    )
}

export default memo(Home)