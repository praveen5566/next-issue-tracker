'use client';

import Link from 'next/link'
import React from 'react'
import { GiArtificialIntelligence } from "react-icons/gi";
import { usePathname } from 'next/navigation'
import classNames from 'classnames';


const NavBar = () => {

  const currentPath = usePathname()
  const links = [
    {
      label: 'Dashboard', href: '/'
    },
    {
      label: 'Issues', href: '/issues/list'
    },
  ]
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/"><GiArtificialIntelligence /></Link>
      <ul className="flex space-x-6">
        {links.map(link =>
          <Link
            key={link.href}
            href={link.href}
            className={classNames({
              "text-slate-900": link.href === currentPath,
              "text-slate-500": link.href !== currentPath,
              "hover:text-slate-800 transition-colors": true
            })}>
            {link.label}
          </Link>)}
      </ul>
    </nav>
  )
}

export default NavBar