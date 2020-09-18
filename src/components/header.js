import PropTypes from "prop-types"
import React, { useState } from "react"
import styled from "styled-components"
import Star from "../images/Star"

const Head = styled.header`
  background: #9eb5b3;
  margin-bottom: 1.45rem;
`
const StarWrapper = styled.span`
  width: ${p => p.size};
  margin-right: 0.4rem;
  margin-bottom: -0.5rem;
  transition: ${p =>
    `transform 8000ms ease-in-out, width ${p.speed}ms ease-in-out`};
`
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: color 3000ms ease-in-out;
  :hover {
    color: #efefef;
    ${StarWrapper} {
      transform: rotate(1080deg);
    }
  }
`
const H1 = styled.h1`
  margin: 0;
`

const Header = ({ siteTitle }) => {
  const largeSize = "100%"
  const smallSize = "3.5rem"
  const speed = 2000
  const [largeStar, setLargeStar] = useState(false)
  return (
    <Head>
      <Wrapper onClick={() => setLargeStar(!largeStar)}>
        <StarWrapper size={largeStar ? largeSize : smallSize} speed={speed}>
          <Star
            fill="#8899bb"
            size={largeStar ? largeSize : smallSize}
            speed={speed}
          />
        </StarWrapper>
        <H1>{siteTitle}</H1>
      </Wrapper>
    </Head>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
