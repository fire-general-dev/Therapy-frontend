import Link from "next/link"

const CategoryButton = (props) => {
  const { title, alias, active, item, onClick } = props

  return (
    <div onClick={() => onClick(item)}>
      <button className={active ? "selected" : ""}>{title}</button>
      <style jsx>{`
        button {
          @apply rounded-full bg-gray-150 py-mb6 px-mb20 md:py-8pxt md:px-24pxt lg:py-vw06 lg:px-vw20 text-14pxm md:text-18pxt lg:text-16px text-green-100 cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-pink-300 hover:to-blue-100 hover:translate-x-0.5 hover:translate-y-0.5;
        }
        button.selected {
          @apply bg-gradient-to-r from-pink-300 to-blue-100 translate-x-0.5 translate-y-0.5;
        }
      `}</style>
    </div>
  )
}

export default CategoryButton
