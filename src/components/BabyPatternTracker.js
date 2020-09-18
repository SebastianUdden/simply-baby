import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { formatTwoDigits, uuidv4 } from "./utils"

const BabyPatternTracker = styled.div``
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-row-gap: 0.5rem;
  grid-column-gap: 0.5rem;
`
const Button = styled.button`
  padding: 1rem;
  height: 6rem;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 1rem;
  color: #444;
  font-weight: 800;
  font-size: 20px;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${p => (p.active ? "#6e7a73" : "default")};
  color: ${p => (p.active ? "#fefefe" : "default")};
  :active {
    background-color: #6e7a73;
    color: #fefefe;
  }
`
const WideButton = styled(Button)`
  grid-column: 1 / 4;
`
const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: 800;
`
const Time = styled.div`
  opacity: 0.6;
  font-size: 14px;
`

const getDuration = pattern => {
  const now = new Date()
  const then = new Date(pattern.start)
  const difference = now - then
  const differenceSeconds = Math.round(difference / 1000)
  return differenceSeconds
}

const formatTime = seconds => {
  const minutes = formatTwoDigits(Math.floor(seconds / 60))
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = formatTwoDigits(minutes % 60)
  const remainingSeconds = formatTwoDigits(seconds % 60)
  if (hours) {
    return `${formatTwoDigits(hours)}:${remainingMinutes}:${remainingSeconds}`
  }
  return `${minutes}:${remainingSeconds}`
}

const Duration = ({ pattern }) => {
  const [seconds, setSeconds] = useState(getDuration(pattern))

  useEffect(() => {
    setTimeout(() => setSeconds(seconds + 1), 1000)
  }, [seconds])
  return <Time>{formatTime(seconds)}</Time>
}

export default ({ patterns, onUpdatePatterns = () => {} }) => {
  const [active, setActive] = useState("")

  useEffect(() => {
    const latest = patterns[patterns.length - 1]
    if (!latest) return
    const isImmediate = latest.type === "pee" || latest.type === "poo"
    if (latest.start && !latest.end && !isImmediate) {
      setActive(latest.type)
    }
  }, [patterns])

  const changeActive = (current, immediateEnd) => {
    const newPoint = {
      id: uuidv4(),
      type: current,
      start: new Date(),
      end: immediateEnd ? new Date() : undefined,
    }
    const endedPatterns = patterns.map(bp => {
      if (bp.end) return bp
      return {
        ...bp,
        end: new Date(),
      }
    })
    const isActive = active === current
    const alwaysCreate = current === "pee" || current === "poo"
    const newPatterns = [
      ...endedPatterns,
      (!isActive || alwaysCreate) && newPoint,
    ]
    onUpdatePatterns(newPatterns.filter(Boolean))
    setActive(isActive ? "" : current)
  }

  return (
    <BabyPatternTracker>
      <Grid>
        <Button onClick={() => changeActive("left")} active={active === "left"}>
          <span>Left</span>
          {active === "left" && (
            <Duration pattern={patterns[patterns.length - 1]} />
          )}
        </Button>
        <Label>
          <span>Breast</span>
        </Label>
        <Button
          onClick={() => changeActive("right")}
          active={active === "right"}
        >
          <span>Right</span>
          {active === "right" && (
            <Duration pattern={patterns[patterns.length - 1]} />
          )}
        </Button>
        <WideButton
          onClick={() => changeActive("sleep")}
          active={active === "sleep"}
        >
          <span>Sleep</span>
          {active === "sleep" && (
            <Duration pattern={patterns[patterns.length - 1]} />
          )}
        </WideButton>
        <Button onClick={() => changeActive("pee", true)}>Pee</Button>
        <Label>
          <span>Diaper</span>
        </Label>
        <Button onClick={() => changeActive("poo", true)}>Poo</Button>
      </Grid>
    </BabyPatternTracker>
  )
}
