import React from 'react'
import './header.scss';
import { GiHamburgerMenu } from 'react-icons/gi';

function Header() {
    return (
        <div className="app__header">
            <h2 className="app__header--txt">HACKER<span>NEWS</span>.</h2>
            <GiHamburgerMenu size={40} />
        </div>
    )
}

export default Header
