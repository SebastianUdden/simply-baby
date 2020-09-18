import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Star from "../images/Star"

const Wrapper = styled.div`
  width: 3.5rem;
  margin-right: 0.4rem;
  margin-bottom: -0.5rem;
  transition: transform 8000ms ease-in-out;
`

const H1 = styled.h1`
  margin: 0;
  display: flex;
  align-items: center;
  :hover {
    ${Wrapper} {
      transform: rotate(2160deg);
    }
  }
`

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#9eb5b3`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <H1>
        <Wrapper>
          <Star fill="#8899bb" />
        </Wrapper>
        {siteTitle}
      </H1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
