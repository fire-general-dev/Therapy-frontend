import TextHeighlited from "./textHighlited"

function ContentSections(props) {
  const { data } = props
  return (
    <div className="section-wrapper">
      <TextHeighlited data={data} />

      <style jsx>{`
        .section-wrapper {
          @apply max-w-screen-xl w-full mx-auto px-4 mt-40 lg:mt-52 mb-20 lg:mb-28 relative;
        }
      `}</style>
    </div>
  )
}

export default ContentSections
