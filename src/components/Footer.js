import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import Linkedin from './icons/Linkedin'
import Twitter from './icons/Twitter'
import Telegram from './icons/Telegram'
import Medium from './icons/Medium'
import { useRouter } from 'next/router'
import Github from './icons/Github'
import Discord from './icons/Discord'
import Instagram from './icons/Instagram'
import HuggingFace from './icons/HuggingFace'

const Footer = () => {

    const router = useRouter();

    return (<>
        <footer id="main-footer">
            <div className='container'>
                <div className='footer-wrap'>
                    <div className='fw-content fw-first'>
                        <Logo />
                        <ul className='social'>
                            <li><Link className='twitter' href="https://x.com/Oxlo_ai"><Twitter /></Link></li>
                            <li><Link href="https://www.linkedin.com/company/oxlo-ai/"><Linkedin /></Link></li>
                            <li><Link href="https://discord.gg/qPvNp5X8m6"><Discord /></Link></li>
                            <li><Link href="https://www.instagram.com/oxlo.ai?igsh=MTlyaGJxcGcwN2Rodg=="><Instagram /></Link></li>
                            <li><Link href="https://huggingface.co/OxloAI" title="Hugging Face">
                                <HuggingFace />
                            </Link></li>
                        </ul>
                    </div>
                    <div className='fw-content fw-second'>
                        <div className='content-wrap'>
                            <ul className='fw-link'>
                                <li><Link href="/models" className={`${router.asPath === "/models" ? "active" : ""}`}>Models</Link></li>
                                <li><Link href="https://docs.oxlo.ai/" className={`${router.asPath === "/docs" ? "active" : ""}`}>Docs</Link></li>
                                <li><Link href="/pricing" className={`${router.asPath === "/pricing" ? "active" : ""}`}>Pricing</Link></li>
                                <li><Link href="mailto:hello@oxlo.ai" className={`${router.asPath === "" ? "" : ""}`}>Contact Us</Link></li>
                                <li><Link href="/privacy-policy" className={`${router.asPath === "/privacy-policy" ? "active" : ""}`}>Privacy Policy</Link></li>
                                <li><Link href="/term-of-use" className={`${router.asPath === "/term-of-use" ? "active" : ""}`}>Terms of Service</Link></li>
                                <li><Link href="/data-processing-agreement" className={`${router.asPath === "/data-processing-agreement" ? "active" : ""}`}>Data Processing Agreement</Link></li>
                                <li><Link href="https://www.cyborgnetwork.io/">Our Parent Company</Link></li>
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
