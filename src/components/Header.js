import Link from 'next/link'
import React, { useState } from 'react'
import Logo from './Logo'
import Button from './Button'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

const Header = () => {

    const [toggle, setToggle] = useState("false");

    const router = useRouter();

  return (
    <header className={`${router.asPath === "/" ? "home" : ""} ${toggle ? "" : "active"}`}>
        <div className='container'>
            <div className='header-wrap'>
        <Logo/>
        <nav>
            <ul>
                <li className='submenu'>
                    <Link href="/">Products</Link>
                    <div className='dropdown'>
                        <ul>
                            <li onClick={()=>setToggle(!toggle)}><Link href="/" className={`${router.asPath === "/" ? "active" : ""}`}>OxAPI</Link></li>
                            <li onClick={()=>setToggle(!toggle)}><Link href="/" className={`${router.asPath === "/" ? "active" : ""}`}>OxCompute <small>(Coming Soon)</small></Link></li>
                        </ul>
                    </div>
                </li>
                <li onClick={()=>setToggle(!toggle)}><Link href="/models" className={`${router.asPath === "/models" ? "active" : ""}`}>Models</Link></li>
                <li onClick={()=>setToggle(!toggle)}><Link href="/pricing" className={`${router.asPath === "/pricing" ? "active" : ""}`}>Pricing</Link></li>
            </ul>
        </nav>
        <div className='header-btn'>
            <nav>
                <ul>
                    <li onClick={()=>setToggle(!toggle)}><Link href="/">Log In</Link></li>
                </ul>
            </nav>
            <Button onClick={()=>setToggle(!toggle)} title="Start Free" link="/" size="btn-md"/>
        </div>
        <div className={`toggle-menu ${toggle ? "" : "active"}`} onClick={()=>setToggle(!toggle)}>
            <div className='toggle-wrap'>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        </div>
        </div>
    </header>
  )
}

export default Header