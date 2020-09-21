import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Day from "./Day"
import download from "../../images/download.svg"
import upload from "../../images/upload.svg"

const BabyPatterns = styled.div`
  margin: 1.2rem 0;
`
const H2 = styled.h2`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Column = styled.div``
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
const TextButton = styled.button`
  background-color: inherit;
  border: none;
`
const Img = styled.img`
  margin: 0;
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

  const handleDownload = () => {
    const data = localStorage.getItem("baby-patterns")
    navigator.clipboard.writeText(data)
  }

  const handleUpload = () => {
    navigator.clipboard.readText().then(response => {
      const userResponse = window.confirm(
        "Are you sure you want to overwrite the data? This can't be undone!"
      )
      if (userResponse) localStorage.setItem("baby-patterns", response)
      window.location.reload()
    })
  }

  return (
    <BabyPatterns>
      <H2>
        <Column>Baby data</Column>
        <Column>
          <TextButton onClick={handleUpload}>
            <Img src={upload} width="20px" height="20px" />
          </TextButton>
          <TextButton onClick={handleDownload}>
            <Img src={download} width="20px" height="20px" />
          </TextButton>
        </Column>
      </H2>
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
      {formatedPatterns.map((day, index) => (
        <Day
          key={day.date}
          {...day}
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
