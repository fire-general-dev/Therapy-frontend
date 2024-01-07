import Image from "next/image"

const TipsCard = ({ icon, title, children }) => {
  return (
    <div className="tips-card">
      <div className="image-wrapper">
        <Image src={icon} />
      </div>
      <div className="body">
        <h3 className="title">{title}</h3>
        <dev className="desc">{children}</dev>
      </div>
      <style jsx>{`
        .tips-card {
          @apply flex items-start gap-4 mb-5;
        }
        .image-wrapper {
          @apply min-w-[2.75rem] w-11 h-11 bg-[#1A4FBA] rounded-full p-3;
        }
        .body {
          @apply flex-1;
        }
        .title {
          @apply text-black-3232 text-base font-semibold mb-2;
        }
        .desc {
          @apply text-gray-64 text-sm;
        }
      `}</style>
    </div>
  )
}

export default TipsCard
