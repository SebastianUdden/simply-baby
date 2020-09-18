import React from "react"
import styled from "styled-components"

const SVG = styled.svg`
  width: ${p => p.width};
  transition: ${p => `width ${p.speed}ms ease-in-out`};
`

const Eye = styled.circle`
  transform-origin: center;
  transform: ${p =>
    p.sizeIsLarge ? `translateY(1px) scale(1.05)` : "translateY(0px) scale(1)"};
  transition: transform 2000ms ease-in-out;
  transition-delay: ${p => p.speed + 1000}ms;
`

const Pupil = styled.circle`
  transform: ${p =>
    p.sizeIsLarge ? `translateX(-2px) translateY(2.5px)` : ""};
  transition: transform 800ms ease-in-out;
  transition-delay: ${p => p.speed}ms;
`
const Mouth = styled.path`
  transform-origin: center;
  transform: ${p =>
    p.sizeIsLarge
      ? "translateY(0px) scaleY(1.3)"
      : "translateY(2px) scaleY(0.9)"};
  transition: transform 800ms ease-in-out;
  transition-delay: ${p => p.speed}ms;
`

export default ({ fill = "#9eb5b3", speed = 2000, size = "3.5rem" }) => {
  const sizeIsLarge = size !== "3.5rem"
  return (
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
      <Eye
        cx="44"
        cy="46"
        r="5"
        fill="white"
        speed={speed}
        sizeIsLarge={sizeIsLarge}
      />
      <Pupil
        cx="45"
        cy="46"
        r="2"
        fill="black"
        opacity={0.4}
        speed={speed}
        sizeIsLarge={sizeIsLarge}
      />
      <Eye
        cx="56"
        cy="46"
        r="5"
        fill="white"
        speed={speed}
        sizeIsLarge={sizeIsLarge}
      />
      <Pupil
        cx="57.5"
        cy="46"
        r="2"
        opacity={0.4}
        speed={speed}
        sizeIsLarge={sizeIsLarge}
      />
      <Mouth
        d="M 40 55 C 37 62, 63 63, 60 54"
        fill="white"
        speed={speed}
        sizeIsLarge={sizeIsLarge}
      />
    </SVG>
  )
}
