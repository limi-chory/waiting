import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

import styles from '@style/Menu.module.css'

import MenuIcon from '@icon/menu.svg'
import CloseIcon from '@icon/close.svg'

import { ROUTES } from '@util'

export const Menu = () => {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleClickMenu1 = () => {
    router.push(ROUTES.home)
  }

  const handleClickMenu2 = () => {
    router.push(ROUTES.temp)
  }

  return (
    <div className={styles.menuContainer}>
      <div className={styles.overlay} onClick={toggleMenu} style={{ display: menuOpen ? 'block' : 'none' }} />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className={styles.menuContent}
            transition={{ ease: 'easeOut', duration: 0.4 }} // Adjust duration and ease
          >
            <button className={styles.closeButton} onClick={toggleMenu}>
              <CloseIcon width={24} height={24} fill={'#282828'} />
            </button>
            <p className={styles.menuItem} onClick={handleClickMenu1}>
              Menu Item 1
            </p>
            <p className={styles.menuItem} onClick={handleClickMenu2}>
              Menu Item 2
            </p>
            <p className={styles.menuItem} onClick={handleClickMenu2}>
              Menu Item 3
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <button className={styles.menuButton} onClick={toggleMenu}>
        <MenuIcon width={24} height={24} fill={'#282828'} />
      </button>
    </div>
  )
}
