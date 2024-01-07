import Image from "next/image"
import Link from "next/link"

const BrowserCard = ({ icon, title, href }) => {
  return (
    <Link href={href} target="_blank">
      <div className="browser-card">
        <Image className="min-w-[19px]" src={icon} alt="icon" />
        <span className="title">{title}</span>
        <style jsx>{`
          .browser-card {
            @apply flex items-center gap-2;
          }

          .title {
            @apply text-[#1A4FBA] text-xs lg:text-sm font-medium;
          }
        `}</style>
      </div>
    </Link>
  )
}

export default BrowserCard
