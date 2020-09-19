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
      .map(({ start, end }) => (end ? new Date(end) - new Date(start) : 0))
      .reduce((a, b) => a + b, 0) / 1000
  )

export default ({ values }) => {
  const sum = summarizeValues(values)
  const sumCount = values.filter(v => v.end).length
  const rightSum = summarizeValues(values.filter(v => v.type === "right"))
  const rightCount = values.filter(v => v.type === "right" && v.end).length
  const rightAverage = Math.round(rightSum / rightCount) || 0
  const leftSum = summarizeValues(values.filter(v => v.type === "left"))
  const leftCount = values.filter(v => v.type === "left" && v.end).length
  const leftAverage = Math.round(leftSum / leftCount) || 0
  const sleepSum = summarizeValues(values.filter(v => v.type === "sleep"))
  const sleepCount = values.filter(v => v.type === "sleep" && v.end).length
  const sleepAverage = Math.round(sleepSum / sleepCount) || 0
  const peeCount = values.filter(v => v.type === "pee").length
  const pooCount = values.filter(v => v.type === "poo").length

  return (
    sumCount > 3 && (
      <Summary>
        <H3>Summary</H3>
        <Sum>
          <Label>Total:</Label> {formatTime(sum, true)}
        </Sum>
        {rightSum !== 0 && (
          <Sum>
            <Label>Right:</Label> {formatTime(rightSum, true)} ({rightCount}{" "}
            times)
          </Sum>
        )}
        {leftSum !== 0 && (
          <Sum>
            <Label>Left:</Label> {formatTime(leftSum, true)} ({leftCount} times)
          </Sum>
        )}
        {sleepSum !== 0 && (
          <Sum>
            <Label>Sleep:</Label> {formatTime(sleepSum, true)} ({sleepCount}{" "}
            times)
          </Sum>
        )}
        {peeCount !== 0 && (
          <Sum>
            <Label>Pee:</Label> {peeCount} diapers
          </Sum>
        )}
        {pooCount !== 0 && (
          <Sum>
            <Label>Poo:</Label> {pooCount} diapers
          </Sum>
        )}
        {(rightCount > 1 || leftCount > 1 || sleepCount > 1) && (
          <>
            <H3>Average</H3>
            {rightCount > 1 && (
              <Sum>
                <Label>Right:</Label> {formatTime(rightAverage, true)}
              </Sum>
            )}
            {leftCount > 1 && (
              <Sum>
                <Label>Left:</Label> {formatTime(leftAverage, true)}
              </Sum>
            )}
            {sleepCount > 1 && (
              <Sum>
                <Label>Sleep:</Label> {formatTime(sleepAverage, true)}
              </Sum>
            )}
          </>
        )}
      </Summary>
    )
  )
}
