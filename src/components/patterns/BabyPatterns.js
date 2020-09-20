import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Day from "./Day"

const BabyPatterns = styled.div`
  margin: 1.2rem 0;
`
const H2 = styled.h2`
  margin: 0;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0.5rem;
  margin: 1rem 0;
`
const Button = styled.button`
  padding: 0.5rem;
  border-radius: 1rem;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #fefefe;
  opacity: ${p => (p.active ? 1 : 0.5)};
  width: 100%;
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
  const [showSummary, setShowSummary] = useState(true)
  const [showEntries, setShowEntries] = useState(true)
  const formatedPatterns = formatPatterns(patterns).reverse()

  useEffect(() => {
    if (showSummary || showEntries) return
    setShowEntries(true)
  }, [showSummary])

  useEffect(() => {
    if (showSummary || showEntries) return
    setShowSummary(true)
  }, [showEntries])

  return (
    <BabyPatterns>
      <H2>Baby data</H2>
      <Grid>
        <Button
          onClick={() => setShowSummary(!showSummary)}
          active={showSummary}
        >
          Summaries
        </Button>
        <Button
          onClick={() => setShowEntries(!showEntries)}
          active={showEntries}
        >
          Entries
        </Button>
      </Grid>
      {formatedPatterns.map((pattern, index) => (
        <Day
          {...pattern}
          showSummary={showSummary}
          showEntries={showEntries}
          showDate={index === 0}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </BabyPatterns>
  )
}
