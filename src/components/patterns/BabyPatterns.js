import React from "react"
import styled from "styled-components"
import Day from "./Day"

const BabyPatterns = styled.div`
  margin: 1.2rem 0;
`

const formatPatterns = patterns => {
  const reversedPatterns = patterns.slice().reverse()
  const existingDates = [
    ...new Set(patterns.map(p => new Date(p.start).toLocaleDateString())),
  ]
  const datesWithEntries = existingDates.map(date => ({
    date,
    values: reversedPatterns.filter(
      p => new Date(p.start).toLocaleDateString() === date
    ),
  }))
  return datesWithEntries
}

export default ({ patterns, onUpdate, onDelete }) => {
  const formatedPatterns = formatPatterns(patterns)
  return (
    <BabyPatterns>
      {formatedPatterns.map(pattern => (
        <Day {...pattern} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </BabyPatterns>
  )
}
