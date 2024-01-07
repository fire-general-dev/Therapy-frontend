import Image from "next/image"
import { useTranslation } from "next-i18next"

const MainServiceCard = ({ cardImage, title, contents }) => {
  const { t } = useTranslation()
  return (
    <div className="main-service-card">
      <Image className={"rounded-[1.25rem]"} src={cardImage} alt="card" />
      <div className="body">
        <span className="intro">{t("introduction")}</span>
        <h1 className="title">{title}</h1>
        <div className="content">
          {contents.map((para, index) => (
            <p key={index} className="para">
              {para}
            </p>
          ))}
        </div>
      </div>
      <style jsx>{`
        .main-service-card {
          @apply flex flex-col-reverse lg:flex-row gap-5 lg:gap-[5.5rem] max-w-screen-xl w-full mx-auto px-4 py-10 lg:py-20;
        }
        .body {
          @apply max-w-lg text-center lg:text-left;
        }
        .intro {
          @apply text-[#1BBEC3] text-base font-medium uppercase mb-1;
        }
        .title {
          @apply text-3xl text-[#2E3333] font-medium capitalize mb-5 leading-[3rem];
        }

        .content {
          @apply text-gray-64 text-base;
          .para {
            @apply mb-7;
          }
          .para:last-child {
            @apply mb-0;
          }
        }

        :global(.rtl) {
          .body {
            @apply lg:text-right;
          }
        }
      `}</style>
    </div>
  )
}

export default MainServiceCard
