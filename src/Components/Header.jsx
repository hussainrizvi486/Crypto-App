import React from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'


export const Header = () => {
    const openMenu = () => {
        const menu = document.querySelector('ul')
        menu.classList.toggle('active-menu')
    }

    return (
        <nav>
            <h1>iCrypt</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/coins">Coins</Link></li>
                <li><Link to="/exchanges">Exchanges</Link></li>
            </ul>
            <GiHamburgerMenu className='mobile-menu' onClick={openMenu} />
        </nav>
    )
}
