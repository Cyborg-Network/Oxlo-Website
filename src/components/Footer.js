import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import Linkedin from './icons/Linkedin'
import Twitter from './icons/Twitter'
import Telegram from './icons/Telegram'
import Medium from './icons/Medium'
import { useRouter } from 'next/router'
import Github from './icons/Github'

const Footer = () => {

    const router = useRouter();

  return (<>
    <footer id="main-footer">
        <div className='container'>
        <div className='footer-wrap'>
            <div className='fw-content fw-first'>
            <Logo/>
            <ul className='social'>
                <li><Link className='twitter' href="/"><Twitter/></Link></li>
                <li><Link href="/"><Linkedin/></Link></li>
                <li><Link href="/"><Telegram/></Link></li>
                <li><Link href="/"><Medium/></Link></li>
                <li><Link href="/"><Github/></Link></li>
            </ul>
            </div>
            <div className='fw-content fw-second'>
                <div className='content-wrap'>
                <ul className='fw-link'>
                <li><Link href="/" className={`${router.asPath === "" ? "" : ""}`}>OxAPI</Link></li>
                <li><Link href="/" className={`${router.asPath === "" ? "" : ""}`}>OxCompute <small>(Coming Soon)</small></Link></li>
                <li><Link href="/models" className={`${router.asPath === "/models" ? "" : ""}`}>Models</Link></li>
                <li><Link href="/pricing" className={`${router.asPath === "/pricing" ? "" : ""}`}>Pricing</Link></li>
                <li><Link href="mailto:hello@oxlo.ai" className={`${router.asPath === "" ? "" : ""}`}>Contact Us</Link></li>
                <li><Link href="/privacy-policy" className={`${router.asPath === "/privacy-policy" ? "" : ""}`}>Privacy Policy</Link></li>
                </ul>
                </div>
            </div>
        </div>
        <div className='footer-credit'>
            <div className='fc-left'>
                <p>© Oxlo.ai {new Date().getFullYear()}, All right reserved.</p>
                {/* <Link href='mailto:info@cyborgnetwork.io'>info@cyborgnetwork.io</Link> */}
            </div>
            <div className='fc-right'>
                {/* <Link href="https://www.f6s.com/company/cyborg-network" target='_blank'>
                    <Image src={f6s} alt="ai"/>
                </Link> */}
            </div>
            </div>
        </div>
    </footer>
    </>
  )
}

export default Footer
