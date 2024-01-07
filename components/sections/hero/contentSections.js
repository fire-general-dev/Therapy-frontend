import TextHeighlited from "./textHighlited"

function ContentSections(props) {
  const { data } = props
  return (
    <div className="section-wrapper">
      <TextHeighlited data={data} />

      <style jsx>{`
        .section-wrapper {
          @apply my-25vw sm:my-13vw md:mb-20vw lg:mb-0 relative px-mb20 lg:px-vw360;
        }
      `}</style>
    </div>
  )
}

export default ContentSections
