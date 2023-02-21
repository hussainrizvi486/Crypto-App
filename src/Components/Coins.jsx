import { React, useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './Loader';
import { Link } from 'react-router-dom';
import ErrorComponent from './ErrorComponent'
import api from '../index'
import { motion } from 'framer-motion'


const Coins = () => {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [page, setPage] = useState(1)
    const [error, setError] = useState(false)
    const [currency, setCurrency] = useState('pkr')
    const currencySymbol =
        currency === "pkr" ? "₨ " : currency === "eur" ? "€" : "$";
    const handelPrevPg = () => {
        setPage(page - 1)
    }

    const handelNextPg = () => {
        setPage(page + 1)
    }

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const { data } = await axios.get(`${api}/coins/markets?vs_currency=${currency}&per_page=100&page=${page}`);
                setCoins(data)
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true)
            }
        }
        fetchExchanges()
    }, [page, currency])

    if (error) return <ErrorComponent message={'Error while fetching Coins with API'} />

    return (
        <main className="coin-pg-main">
            {loading ? <Loader /> :
                <motion.div initial={{
                    opacity: 0,
                }}
                    whileInView={{
                        opacity: 1,
                    }}>
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
                    <section>
                        {coins.map(i => (
                            <CoinCard
                                key={i.market_cap_rank}
                                id={i.id}
                                name={i.name}
                                price={i.current_price}
                                img={i.image}
                                symbol={i.symbol}
                                currencySymbol={currencySymbol}
                            />))}
                    </section>
                    <div className="btns-grounp">
                        <button onClick={handelPrevPg} disabled={page <= 1} >&larr; Previous</button>
                        <button onClick={handelNextPg} disabled={page >= 125} >Next &rarr;</button>
                    </div>
                </motion.div>
            }
        </main>
    )
}



const CoinCard = ({ id, name, img, symbol, price, currencySymbol = '₨' }) => {
    return (
        <Link to={`/coin/${id}`}>
            <div className="coin-card">
                <img src={img} alt="" />
                <section>
                    <p>{symbol}</p>
                    <p>{name}</p>
                    <p>{price ? `${currencySymbol}${price}` : `NA`}</p>
                </section>
            </div>
        </Link >
    )
}


export default Coins