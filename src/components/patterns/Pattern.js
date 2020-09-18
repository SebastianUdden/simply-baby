import React, { useState } from "react"
import styled from "styled-components"
import { formatTime, formatTwoDigits } from "./utils"

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
  margin-left: 0.5rem;
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
export default ({ id, type, start, end, onDelete }) => {
  const [showEditor, setShowEditor] = useState(false)
  const startTime = getTime(start)
  const endTime = getTime(end)
  const difference = Math.floor(
    ((end ? new Date(end) : new Date()) - new Date(start)) / 1000
  )
  return (
    <LI onClick={() => setShowEditor(!showEditor)}>
      <Column>
        <Label>{type}</Label>
      </Column>
      <Column>
        {startTime === endTime ? startTime : `${startTime} - ${endTime}`}
        {difference !== 0 && <Time>({formatTime(difference, true)})</Time>}
        {showEditor && <Button onClick={() => onDelete(id)}>&times;</Button>}
      </Column>
    </LI>
  )
}
