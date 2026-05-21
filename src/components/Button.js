import Link from 'next/link'
import React, { useRef, useCallback } from 'react'
import Image from 'next/image';

const Button = ({title, link, size, theme="", icon, onClick}) => {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = '';
  }, []);

  return (
    <div
      ref={ref}
      className="magnetic-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={link || "/"} className={`btn ${size || ''} ${theme}`} onClick={onClick}>
        {icon && <Image src={icon} alt="btn-icon" className='btn-icon' />} {title}
      </Link>
    </div>
  )
}

export default Button
