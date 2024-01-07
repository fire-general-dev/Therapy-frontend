import React, { useEffect, useRef, useState } from "react"
import { usePrevious } from "@/utils/usePrevious"

const transitionTime = 200
const transitionStyle = `left ${transitionTime}ms, right ${transitionTime}ms`

const Tabs = (props) => {
  const { children, active, onChange } = props

  const [sizes, setSizes] = useState({})
  const mainWrapper = useRef(null)

  const els = useRef({})

  const prevChilderen = usePrevious(children)
  const prevActive = usePrevious(active)

  const getSizes = () => {
    const rootBounds = mainWrapper?.current?.getBoundingClientRect()

    const sizes = {}

    Object.keys(els.current).forEach((key) => {
      const el = els.current[key]
      const bounds = el.getBoundingClientRect()

      const left = bounds.left - rootBounds.left
      const right = rootBounds.right - bounds.right

      sizes[key] = { left, right }
    })
    setSizes(sizes)
    return sizes
  }

  const getUnderlineStyle = () => {
    if (active == null || Object.keys(sizes).length === 0) {
      return { left: "0", right: "100%" }
    }

    const size = sizes[active]
    return {
      left: `${size.left}px`,
      right: `${size.right}px`,
      transition: transitionStyle,
    }
  }

  // once on render
  useEffect(() => {
    getSizes()
  }, [])

  useEffect(() => {
    if (children !== prevChilderen && active !== prevActive) getSizes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, active])

  return (
    <div className="Tabs" ref={mainWrapper}>
      {React.Children.map(children, (child, i) => {
        let className = `Tabs__Tab`
        if (child.key === active) {
          className = `${className} Tabs__Tab--active`
        }
        return (
          <>
            <div
              className={className}
              onClick={() => {
                onChange(child.key)
              }}
              ref={(el) => (els.current[child.key] = el)}
            >
              {child}
            </div>
            {i != children.length - 1 ? (
              <span className="separator"></span>
            ) : null}
          </>
        )
      })}
      <div className="Tabs__Underline" style={getUnderlineStyle()} />
      <style jsx>{`
        .Tabs {
          @apply relative flex justify-between items-center rounded-t-md mb-mb6 md:mb-6pxt lg:mb-vw04 px-mb30 md:px-100pxt lg:px-vw100;
          background: rgba(51, 51, 51, 0.05);
        }

        .Tabs__Tab {
          @apply pt-mb30 md:pt-30pxt lg:pt-vw30 pb-mb16 md:pb-16pxt lg:pb-vw16 inline-block text-20pxm md:text-24pxt lg:text-20px text-[#333] cursor-pointer;
        }

        .Tabs__Tab:hover,
        .Tabs__Tab--active {
          color: #25a9ad;
        }

        .Tabs__Underline {
          position: absolute;
          bottom: 0px;
          left: 0;
          right: 0;
          border-bottom: 2px solid #25a9ad;
        }

        .separator {
          @apply inline-block h-40pxm md:h-40pxt lg:h-40px w-[1px] bg-[#999];
        }
      `}</style>
    </div>
  )
}

export default Tabs
