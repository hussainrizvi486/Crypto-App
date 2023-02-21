import React, { useEffect, useState } from 'react'
import coverImg from '../assets/btc.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Loader from './Loader';


export const Home = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <>
            {loading ? <Loader /> :
                <motion.main className='pg-home-main' initial={{
                    opacity: 0,
                }}
                    whileInView={{
                        opacity: 1,
                    }}
                >
                    <section>
                        <motion.div
                            animate={{
                                translateY: '10px'
                            }}

                            transition={{
                                duration: 2,
                                repeatType: 'reverse',
                                repeat: Infinity,
                            }}>
                            <img src={coverImg} alt="" />
                        </motion.div>
                        <div className="home-pg-text">
                            <h1>Find information about <span className="text-gold-darken"> Cryptocurrency.</span></h1>
                        </div>
                        <div className="btn-group">
                            <Link to={'/coins'}>View Coins</Link>
                            <Link to={'/exchanges'}>View Exchanges</Link>
                        </div>
                    </section>
                </motion.main>
            }
        </>
    )
}
