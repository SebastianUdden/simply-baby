import React from "react"
import styled from "styled-components"

const SVG = styled.svg`
  transition: ${p => `width ${p.speed}ms ease-in-out`};
  width: ${p => p.width};
`

export default ({ fill = "#9eb5b3", speed = 2000, size = "3.5rem" }) => (
  <SVG
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width={size}
    speed={speed}
  >
    <polygon
      points="50 0, 70 30,100 40,80 65, 80 95, 50 80, 20 95, 20 65, 0 40, 30 30"
      fill={fill}
    />
    <circle cx="44" cy="46" r="5" fill="white" />
    <circle cx="45" cy="46" r="2" fill="black" opacity={0.4} />
    <circle cx="56" cy="46" r="5" fill="white" />
    <circle cx="57" cy="46" r="2" opacity={0.4} />
    <path d="M 40 55 C 37 62, 63 63, 60 54" fill="white" />
  </SVG>
)
