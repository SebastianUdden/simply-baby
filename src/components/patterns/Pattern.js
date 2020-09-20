import React, { useEffect, useState } from "react"
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
const Column = styled.div`
  display: flex;
`
const RightColumn = styled(Column)`
  width: 100%;
  justify-content: flex-end;
`
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
const Input = styled.input`
  width: 6rem;
  border: none;
  margin-left: 0.4rem;
  padding: 0 0.4rem;
`

const getTime = date => {
  if (!date) return ""
  const newDate = new Date(date)
  const hours = formatTwoDigits(newDate.getHours())
  const minutes = formatTwoDigits(newDate.getMinutes())
  return `${hours}:${minutes}`
}

const validate = time => {
  if (!time) return false
  if (!time.includes(":")) return
  const results = time.split(":")
  if (results[0].length === 2 && results[1].length === 2) return true
}

export default ({ id, type, start, end, onUpdate, onDelete }) => {
  const [showEditor, setShowEditor] = useState(false)
  const [startTime, setStartTime] = useState(getTime(start))
  const [endTime, setEndTime] = useState(getTime(end))
  const difference = Math.floor(
    ((end ? new Date(end) : new Date()) - new Date(start)) / 1000
  )

  useEffect(() => {
    setStartTime(getTime(start))
  }, [start])

  useEffect(() => {
    if (showEditor) return
    const startTimeIsValid = validate(startTime)
    const endTimeIsValid = validate(endTime)
    const newStart = new Date(start)
    const newEnd = new Date(end)
    newStart.setMinutes(startTime.split(":")[1])
    newStart.setHours(startTime.split(":")[0])
    newEnd.setMinutes(endTime.split(":")[1])
    newEnd.setHours(endTime.split(":")[0])
    const endAfterStart = newEnd - newStart > -1
    if (startTimeIsValid && endTimeIsValid && endAfterStart) {
      onUpdate({ id, type, start: newStart, end: newEnd })
      return
    }
    setStartTime(getTime(start))
    setEndTime(getTime(end))
  }, [showEditor])

  return (
    <LI>
      <Column onClick={() => setShowEditor(!showEditor)}>
        <Label>{type}</Label>
      </Column>
      {showEditor && (
        <RightColumn onClick={() => setShowEditor(false)}>
          <Input
            value={startTime}
            onClick={e => e.stopPropagation()}
            onChange={e => setStartTime(e.target.value)}
          />
          {startTime !== endTime && (
            <Input
              value={endTime}
              onClick={e => e.stopPropagation()}
              onChange={e => setEndTime(e.target.value)}
            />
          )}
          <Button onClick={() => onDelete(id)}>&times;</Button>
        </RightColumn>
      )}
      {!showEditor && (
        <RightColumn onClick={() => setShowEditor(true)}>
          {startTime === endTime ? startTime : `${startTime} - ${endTime}`}
          {difference !== 0 && <Time>({formatTime(difference, true)})</Time>}
        </RightColumn>
      )}
    </LI>
  )
}
