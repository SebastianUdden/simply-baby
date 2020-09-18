import React from "react"
import styled from "styled-components"
import Pattern from "./Pattern"
import Summary from "./Summary"

const Day = styled.div``
const H2 = styled.h2``
const UL = styled.ul`
  list-style: none;
  margin: 0;
`

export default ({ date, values, onUpdate, onDelete }) => (
  <Day>
    <H2>{new Date().toLocaleDateString() === date ? "Today" : date}</H2>
    <Summary values={values} />
    <UL>
      {values.map(pattern => (
        <Pattern {...pattern} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </UL>
  </Day>
)
