import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import api from '../index';
import ErrorComponent from './ErrorComponent'
import Chart from './Chart';
import Loader from './Loader';
import { motion } from 'framer-motion'

const CoinDetail = () => {
    const params = useParams();
    const [coin, setCoin] = useState({});
    const [error, setError] = useState(false);
    const [currency, setCurrency] = useState('pkr');
    const [chartArray, setChartArray] = useState([]);
    const [days, setDays] = useState('24h');
    const [loading, setLoading] = useState(true)
    const currencySymbol =
        currency === "₨" ? "₹" : currency === "eur" ? "€" : "$";
    const dayBtns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

    const switchChartStats = (key) => {
        switch (key) {
            case "24h":
                setDays("24h");
                setLoading(true);
                break;
            case "7d":
                setDays("7d");
                setLoading(true);
                break;
            case "14d":
                setDays("14d");
                setLoading(true);
                break;
            case "30d":
                setDays("30d");
                setLoading(true);
                break;
            case "60d":
                setDays("60d");
                setLoading(true);
                break;
            case "200d":
                setDays("200d");
                setLoading(true);
                break;
            case "1y":
                setDays("365d");
                setLoading(true);
                break;
            case "max":
                setDays("max");
                setLoading(true);
                break;

            default:
                setDays("24h");
                setLoading(true);
                break;
        }
    }


    useEffect(() => {
        const fetchCoin = async () => {
            try {
                const { data } = await axios.get(`${api}/coins/${params.id}`);
                const { data: chartData } = await axios.get(`${api}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
                console.log(data)
                setCoin(data)
                setChartArray(chartData.prices);
                setLoading(false)
            } catch (error) {
                setError(true);
            }
        }

        fetchCoin();
    }, [params.id, currency, days]);

    if (error) return <ErrorComponent message={'Error while fetching Coin data with API'} />

    return (
        <motion.main className='coin-detail-pg'
            initial={{
                opacity: 0,
            }}
            whileInView={{
                opacity: 1,
            }}>

            {loading ? <Loader /> :
                <section>
                    <p className='update-data'>Last updated on {Date().split('G')[0]}</p>
                    <section className="chart">
                        <h1><Chart arr={chartArray} days={days} /></h1>
                    </section>
                    <section>
                        <div className="chart-btns">{
                            dayBtns.map(i => (
                                <button key={i} onClick={() => switchChartStats(i)}>{i}</button>
                            ))}
                        </div>
                        <div className="currency-switches">
                            <div>
                                <input type="radio" id="html" name="EUR" value="pkr" onChange={e => setCurrency(e.target.value)} checked="checked" /><br />
                                <span>PKR</span>
                            </div>
                            <div>
                                <input type="radio" id="html" name="EUR" value="usd" onChange={e => setCurrency(e.target.value)} /> <br />
                                <span>USD</span>
                            </div>
                            <div>
                                <input type="radio" id="html" name="EUR" value="eur" onChange={e => setCurrency(e.target.value)} /> <br />
                                <span>EUR</span>
                            </div>
                        </div>
                        <section className="info">
                            <div className="coin-img">
                                <img src={coin.image.large} alt="" />
                            </div>

                            <p>{coin.name}</p>
                            <p>{currencySymbol}{coin.market_data.current_price[currency]}</p>
                            <p>{coin.market_data.price_change_percentage_24h}
                                {coin.market_data.price_change_percentage_24h > 0 ? "▲" : '▼'}</p>


                            <div><span>Max supply</span> <p>{coin.market_data.max_supply ? coin.market_data.max_supply : "NA"}</p></div>
                            <div><span>Circulating supply</span><p> {coin.market_data.circulating_supply}</p></div>


                            <div className="rank-bdg">
                                <p>#{coin.market_cap_rank}</p>
                            </div>
                        </section>
                    </section>
                </section>}
        </motion.main>
    )
}

export default CoinDetail


