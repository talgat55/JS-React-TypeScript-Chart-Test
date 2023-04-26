import React, {useEffect, useState, memo} from 'react';
import { useParams } from 'react-router-dom';
import {Pie} from 'react-chartjs-2';
import BaseLayout from "../components/layouts/BaseLayout";
import { MONTHS, pieOptions, selectOptions } from '../constants';
import {useAppSelector} from "../store/store";
import {getParsedDataPie} from "../utils/products";
import {ChartData} from "chart.js";

const DetailPage = () => {
    const products = useAppSelector((store) => store.products.products);
    const { factory_id, month } = useParams();
    const [chartData, setChartData] = useState<ChartData<"pie", number[]> | null>(null);

    useEffect(() => {
        if(products.length && !!factory_id && !!month){
            const filteredData = products.filter(item => !!item.date && !!item.factory_id && (item.date.split('/')[1] === month && item.factory_id === +factory_id))
            setChartData(getParsedDataPie(filteredData,[selectOptions[1].label, selectOptions[2].label] ))
        }
        return () =>  setChartData(null)
    }, [products,factory_id,month]);

    return (
        <BaseLayout>
            <h1 className="title">Статистика по продукции фабрики {!!factory_id ? +factory_id === 1 ? 'А' : 'Б' : ''} за {!!month ? MONTHS[month] : ''}</h1>
            {chartData && <Pie data={chartData} options={pieOptions} />}
        </BaseLayout>
    )
}

export default memo(DetailPage)