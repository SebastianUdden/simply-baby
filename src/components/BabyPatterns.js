import React, { useState } from "react"
import styled from "styled-components"
import { formatTwoDigits } from "./utils"

const BabyPatterns = styled.div`
  margin: 1.2rem 0;
`
const H2 = styled.h2``
const UL = styled.ul`
  list-style: none;
  margin: 0;
`
const LI = styled.li`
  border-bottom: 1px solid #666;
  text-transform: capitalize;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0 0.2rem 0.2rem;
`
const Column = styled.div``
const Label = styled.label``
const Time = styled.span`
  opacity: 0.5;
`
const Button = styled.button`
  background-color: inherit;
  opacity: 0.5;
  border-radius: 1rem;
  margin-left: 0.5rem;
  font-size: 1rem;
  line-height: 1rem;
`

const getTime = date => {
  if (!date) return ""
  const newDate = new Date(date)
  const hours = formatTwoDigits(newDate.getHours())
  const minutes = formatTwoDigits(newDate.getMinutes())
  return `${hours}:${minutes}`
}

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

const Pattern = ({ id, type, start, end, onDelete }) => {
  const [showEditor, setShowEditor] = useState(false)
  const startTime = getTime(start)
  const endTime = getTime(end)
  return (
    <LI onClick={() => setShowEditor(!showEditor)}>
      <Column>
        <Label>{type}</Label>
      </Column>
      <Column>
        <Time>
          {startTime === endTime ? startTime : `${startTime} - ${endTime}`}
        </Time>
        {showEditor && <Button onClick={() => onDelete(id)}>&times;</Button>}
      </Column>
    </LI>
  )
}

const Day = ({ date, values, onDelete }) => (
  <>
    <H2>{new Date().toLocaleDateString() === date ? "Today" : date}</H2>
    <UL>
      {values.map(pattern => (
        <Pattern {...pattern} onDelete={onDelete} />
      ))}
    </UL>
  </>
)

export default ({ patterns, onDelete }) => {
  const formatedPatterns = formatPatterns(patterns)
  return (
    <BabyPatterns>
      {formatedPatterns.map(pattern => (
        <Day {...pattern} onDelete={onDelete} />
      ))}
    </BabyPatterns>
  )
}
