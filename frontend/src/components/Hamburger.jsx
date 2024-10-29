import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
// import { Button } from "@/components/ui/button"

export default function Hamburger() {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  }

  const menuItems = ["Reuse", "Add", "Manage"]

  const menuLinks = ["/reuse","/additem","/manageItem"]

  return (
    <div className=" bg-black text-white z-10">
      <button
        variant="ghost"
        size="icon"
        className="fixed top-6 right-4 z-50 text-white hover:bg-gray-800"
        onClick={toggleMenu}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 h-full w-[100%] bg-black p-4 shadow-lg"
          >
            <nav className="mt-20">
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={`${menuLinks[index]}`}
                      className="block py-2 px-4 text-lg hover:bg-gray-800 rounded transition-colors duration-200"
                      onClick={(e) => {
                        // e.preventDefault()
                        console.log(`Clicked on ${menuLinks[index]}`)
                        toggleMenu()
                      }}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}