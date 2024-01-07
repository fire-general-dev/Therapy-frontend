import YoutubeEmbed from "@/components/elements/YoutubeEmbed/YoutubeEmbed"
import { useTranslation } from "next-i18next"

const DoctorInfo = ({ description, videoURL }) => {
  const { t } = useTranslation()
  return (
    <div className="doctor-info">
      <div className={videoURL ? "col-span-5 lg:col-span-2" : "col-span-5"}>
        <h3 className="title">{t("introduction")}</h3>
        <div
          className="desc"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
      </div>
      {videoURL ? (
        <div className="video-wrapper">
          <YoutubeEmbed width="100%" height="410px" embedId={videoURL} />
        </div>
      ) : null}
      <style jsx>{`
        .doctor-info {
          @apply grid grid-cols-5 gap-7;
        }
        .title {
          @apply hidden lg:block text-[#2E3333] text-2xl font-medium mb-5 capitalize;
        }
        .desc {
          @apply text-gray-64 text-sm;
        }

        .video-wrapper {
          @apply hidden lg:block lg:col-span-3;
        }
      `}</style>
    </div>
  )
}

export default DoctorInfo
