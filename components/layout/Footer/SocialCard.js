import Image from "next/image"
import Link from "next/link"

const SocialCard = ({ title, info, image, children, isLink = false }) => {
  return (
    <div className="social-card">
      <div className="image-wrapper">
        <Image src={image} alt="icon" />
      </div>
      <div>
        <span className="title">{title}</span>
        <div className="info">
          {isLink ? (
            <Link href={`mailto:${children}`}>{children}</Link>
          ) : (
            <span>{info}</span>
          )}
        </div>
      </div>
      <style jsx>{`
        .social-card {
          @apply flex flex-col items-center lg:items-start lg:flex-row gap-3;
        }
        .title {
          @apply text-center lg:text-left text-[#9CA1AA] text-xs block mb-1;
        }
        .info {
          @apply text-center lg:text-left text-[#2E3333] text-base;
        }
        .image-wrapper {
          @apply rounded-full w-11 h-11 flex items-center justify-center;
          border: 1px solid #eeeff0;
          background: rgba(255, 255, 255, 0.5);
        }
        :global(.rtl) {
          .title {
            @apply lg:text-right;
          }

          .info {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default SocialCard
