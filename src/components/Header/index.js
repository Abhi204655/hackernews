import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import './header.scss';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaTimes } from 'react-icons/fa';

function Header() {

    const [show, setShow] = useState(false);

    return (
        <>
            <div className="app__header">
                <h2 className="app__header--txt">HACKER<span>NEWS</span>.</h2>
                {show ? <FaTimes id="hamburger" onClick={() => setShow(!show)} size={40} /> : <GiHamburgerMenu id="hamburger" onClick={() => setShow(!show)} size={40} />}
            </div>
            <div className={`nav-wrapper ${show ? "nav-bar-show" : ""}`}>
                <nav className="nav-bar">
                    <NavLink to="/stories/topstories" exact activeClassName="nav-item-active">Top Stories</NavLink>
                    <NavLink to="/stories/beststories" exact activeClassName="nav-item-active">Best Stories</NavLink>
                    <NavLink to="/stories/newstories" exact activeClassName="nav-item-active">New Stories</NavLink>
                </nav>
            </div>
        </>
    )
}

export default Header
