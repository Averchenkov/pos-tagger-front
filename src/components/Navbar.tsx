import React from "react";
import {NavLink} from 'react-router-dom'

export const Navbar:React.FC = () => (
    <nav>
        <ul className="navLinks">
            <li>
                <NavLink to="ner" className="navLink">Entity recognition</NavLink>
            </li>
            <li>
                <NavLink to="two" className="navLink">And another one</NavLink>
            </li>
            <li>
                <NavLink to="three" className="navLink">And another one</NavLink>
            </li>
            <li>
                <NavLink to="four" className="navLink">And another one</NavLink>
            </li>
        </ul>
    </nav>
)
