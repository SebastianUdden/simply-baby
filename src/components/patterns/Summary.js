import React from "react"
import styled from "styled-components"
import { formatTime } from "./utils"

const Summary = styled.div`
  background-color: #fefefe;
  padding: 0.1rem 1rem 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`
const H3 = styled.h3`
  margin: 1rem 0;
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
  const rightCount = values.filter(v => v.type === "right").length
  const rightAverage = Math.round(rightSum / rightCount) || 0
  const leftSum = summarizeValues(values.filter(v => v.type === "left"))
  const leftCount = values.filter(v => v.type === "left").length
  const leftAverage = Math.round(leftSum / leftCount) || 0
  const sleepSum = summarizeValues(values.filter(v => v.type === "sleep"))
  const sleepCount = values.filter(v => v.type === "sleep").length
  const sleepAverage = Math.round(sleepSum / sleepCount) || 0
  const peeCount = values.filter(v => v.type === "pee").length
  const pooCount = values.filter(v => v.type === "poo").length
  return (
    <Summary>
      <H3>Summary</H3>
      <Sum>
        <Label>Total:</Label> {formatTime(sum, true)}
      </Sum>
      <Sum>
        <Label>Right:</Label> {formatTime(rightSum, true)} ({rightCount} times)
      </Sum>
      <Sum>
        <Label>Left:</Label> {formatTime(leftSum, true)} ({leftCount} times)
      </Sum>
      <Sum>
        <Label>Sleep:</Label> {formatTime(sleepSum, true)} ({sleepCount} times)
      </Sum>
      <Sum>
        <Label>Pee:</Label> {peeCount} diapers
      </Sum>
      <Sum>
        <Label>Poo:</Label> {pooCount} diapers
      </Sum>
      <H3>Average</H3>
      <Sum>
        <Label>Right:</Label> {formatTime(rightAverage, true)}
      </Sum>
      <Sum>
        <Label>Left:</Label> {formatTime(leftAverage, true)}
      </Sum>
      <Sum>
        <Label>Sleep:</Label> {formatTime(sleepAverage, true)}
      </Sum>
    </Summary>
  )
}
