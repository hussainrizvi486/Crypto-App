import { React, useEffect, useState } from 'react'
import axios from 'axios';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent'
import api from '../index'
import { motion } from 'framer-motion'


const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchExchanges = async () => {

            try {
                const { data } = await axios.get(`${api}/exchanges`);
                setExchanges(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
            }
        }
        fetchExchanges();
    }, [])

    if (error) return <ErrorComponent message={'Error while fetching Exchanges with API'} />

    return (
        <main className='exchanges-pg-main'>
            {loading ? <Loader /> :
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}>

                    {exchanges.map(i => (
                        <ExchangeCard
                            key={i.id}
                            name={i.name}
                            img={i.image}
                            rank={i.trust_score_rank}
                            url={i.url}
                        />
                    ))}
                </motion.div>}
        </main>
    )
}


const ExchangeCard = ({ name, img, rank, url }) => {
    return (
        <a href={url} target='blank'>
            <div className="exchange-card">
                <img src={img} alt="" />

                <section>
                    <p>#{rank}</p>
                    <p>{name}</p>
                </section>
            </div>
        </a>
    )
}

export default Exchanges 