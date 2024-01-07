import React from "react"
import PropTypes from "prop-types"
import SiteLinks from "./SiteLinks"
import Copyright from "./Copyright"
import SiteCategories from "./SiteCategories"
import SiteTerms from "./SiteTerms"

function Footer({ specailities, ...props }) {
  return (
    <div className="wrapper">
      <SiteCategories specailities={specailities} />
      <SiteLinks />
      <Copyright />
      <SiteTerms />
      <style jsx>{`
        .wrapper {
          @apply z-20 relative;
        }
      `}</style>
    </div>
  )
}

Footer.propTypes = {}

export default Footer
