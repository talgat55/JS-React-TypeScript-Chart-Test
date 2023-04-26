import {Route, Routes} from "react-router-dom"
import React, { useEffect } from "react";
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDispatch } from "react-redux";
import DetailPage from "./pages/DetailPage";
import Home from "./pages/Home";
import routes from "./nav/routes";
import {productsActions as types} from "./store/actions/products"

Chart.register(ChartDataLabels, ...registerables);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: types.FETCH_PRODUCTS });
    }, []);

    return (
        <Routes>
            <Route path={routes.home} element={<Home/>}/>
            <Route path={`${routes.details}/:factory_id/:month`} element={<DetailPage/>}/>
            <Route path='*' element={<Home/>} />
        </Routes>
    )
}

export default App;
