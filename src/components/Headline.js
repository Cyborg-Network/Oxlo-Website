import React, { useState } from 'react'
import Close from './Close';
import Link from 'next/link';

const Headline = () => {
  
  const [status, setStatus] = useState("");

  const updateStatus = () => {
    setStatus("hide");
  };

  return (
    <div className={`headline ${status}`}>
        <p>
          Guaranteed <strong>15% off</strong> your current AI inference bill for team spending up to $20000 / month.
        </p>
        <Link href="https://calendly.com/oxlo_ai/enterprise" target="_blank" rel="noopener" className="headline-cta">
          Book a call →
        </Link>
        <span onClick={updateStatus}><Close/></span>
    </div>
  )
}

export default Headline