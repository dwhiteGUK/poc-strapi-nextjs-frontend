import { useState } from 'react'

import { MenuDesktop, MenuMobile } from '~/components/menu'
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(true)

  return (
    <header className="relative">
      <div className="bg-gray-900 py-6">
        <MenuDesktop menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden z-50">
        <MenuMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
    </header>
  )
}