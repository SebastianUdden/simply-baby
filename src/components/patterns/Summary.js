import React from "react"
import styled from "styled-components"
import { formatTime } from "./utils"

const Summary = styled.div`
  background-color: #fefefe;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`
const H3 = styled.h3`
  margin: 0 0 0.8rem;
`
const Sum = styled.p`
  margin: 0.2rem 0;
`
const Label = styled.label`
  opacity: 0.5;
`

const summarizeValues = values =>
  Math.floor(
    values
      .map(({ start, end }) => new Date(end) - new Date(start))
      .reduce((a, b) => a + b, 0) / 1000
  )

export default ({ values }) => {
  const sum = summarizeValues(values)
  const rightSum = summarizeValues(values.filter(v => v.type === "right"))
  const leftSum = summarizeValues(values.filter(v => v.type === "left"))
  const sleepSum = summarizeValues(values.filter(v => v.type === "sleep"))
  const peeSum = values.filter(v => v.type === "pee").length
  const pooSum = values.filter(v => v.type === "poo").length
  return (
    <Summary>
      <H3>Summary</H3>
      <Sum>
        <Label>Total:</Label> {formatTime(sum, true)}
      </Sum>
      <Sum>
        <Label>Right:</Label> {formatTime(rightSum, true)}
      </Sum>
      <Sum>
        <Label>Left:</Label> {formatTime(leftSum, true)}
      </Sum>
      <Sum>
        <Label>Sleep:</Label> {formatTime(sleepSum, true)}
      </Sum>
      <Sum>
        <Label>Pee:</Label> {peeSum} diapers
      </Sum>
      <Sum>
        <Label>Poo:</Label> {pooSum} diapers
      </Sum>
    </Summary>
  )
}
