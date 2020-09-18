import React from "react"
import styled from "styled-components"
import { formatTime } from "./utils"

const Summary = styled.div`
  background-color: #fefefe;
  padding: 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`
const H3 = styled.h3``
const Sum = styled.p`
  margin: 0.2rem 0;
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
      <Sum>Total: {formatTime(sum, true)}</Sum>
      <Sum>Right: {formatTime(rightSum, true)}</Sum>
      <Sum>Left: {formatTime(leftSum, true)}</Sum>
      <Sum>Sleep: {formatTime(sleepSum, true)}</Sum>
      <Sum>Pee: {peeSum} diapers</Sum>
      <Sum>Poo: {pooSum} diapers</Sum>
    </Summary>
  )
}
