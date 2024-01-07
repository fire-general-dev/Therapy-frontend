import Link from "next/link"

const CategoryButton = (props) => {
  const { title, alias } = props

  return (
    <Link href={`/services/${alias}`}>
      <button>{title}</button>
      <style jsx>{`
        button {
          @apply rounded-full bg-gray-150 py-mb6 px-mb20 md:py-8pxt md:px-24pxt lg:py-vw06 lg:px-vw20 text-14pxm md:text-18pxt lg:text-16px text-green-100 cursor-pointer transition-all duration-500 hover:bg-gradient-to-r hover:from-pink-300 hover:to-blue-100 hover:translate-x-0.5 hover:translate-y-0.5;
        }
      `}</style>
    </Link>
  )
}

export default CategoryButton
