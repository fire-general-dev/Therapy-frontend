import { useTranslation } from "next-i18next"

const DashbaordPreview = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className="body">
        <span className="subtitle">{t("our_dashboard")}</span>
        {/* <h3 className="title">{t("")}</h3> */}
        <p className="desc"></p>
      </div>
      <div className="dashboard-image"></div>
      {/* <style jsx>{`
        .subtitle {
        }
        .title {
        }
        .desc {
        }
      `}</style> */}
    </div>
  )
}

export default DashbaordPreview
