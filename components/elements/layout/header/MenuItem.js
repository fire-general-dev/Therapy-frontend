import * as React from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"]

export const MenuItem = ({ i, to, title, toggle }) => {
  const style = { border: `2px solid ${colors[i]}` }
  const router = useRouter()
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.9 }}
      className="flex list-none mb-5 items-center cursor-pointer"
    >
      {/* <div className="icon-placeholder" style={style} /> */}
      {/* <div className="text-placeholder" style={style} /> */}
      <Link
        // onClick={(e) => {
        //   // e.preventDefault;
        //   toggle();
        //   router.push(to);
        // }}
        passHref
        href={to}
        legacyBehavior
      >
        <a
          onClick={(e) => {
            // e.preventDefault;
            toggle()
            router.push(to)
          }}
          className="w-full z-10 text-2xl font-bold"
          aria-current="page"
        >
          {title}
        </a>
      </Link>
      <style jsx>{`
        .icon-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          flex: 40px 0;
          margin-right: 20px;
        }
        .text-placeholder {
          border-radius: 5px;
          width: 200px;
          height: 20px;
          flex: 1;
        }
      `}</style>
    </motion.li>
  )
}
