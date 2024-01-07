import * as React from "react"
import { motion } from "framer-motion"
import { MenuItem } from "./MenuItem"

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.07, staggerDirection: -1 },
  },
}

const itemIds = [0, 1, 2, 3, 4]

const items = [
  { id: 0, to: "/", title: "Home" },
  { id: 1, to: "/therapists", title: "Therapists" },
]

export const Navigation = (props) => {
  const { toggle } = props

  return (
    <motion.ul
      className="absolute pt-14 p-7 lg:pt-14 top-24 w-1/2 left-1/2 text-center -translate-x-1/2 z-40"
      variants={variants}
    >
      {items.map((item) => (
        <MenuItem {...item} toggle={toggle} key={item.id} />
      ))}
    </motion.ul>
  )
}
