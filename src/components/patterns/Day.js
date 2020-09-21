import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Pattern from "./Pattern"
import Summary from "./Summary"

const Day = styled.div``
const H3 = styled.h3`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #444;
  justify-content: space-between;
  padding: 0.2rem;
`
const UL = styled.ul`
  list-style: none;
  margin: 0;
`
const Panel = styled.div`
  max-height: 0;
  overflow: hidden;
  transition: max-height 300ms ease-in-out;
`

export default ({
  date,
  values,
  showDate,
  showSummary,
  showEntries,
  onUpdate,
  onDelete,
}) => {
  const [showDay, setShowDay] = useState(showDate)

  const onDayUpdate = () => {
    setShowDay(!showDay)
    const panel = document.getElementById(`panel-${date}`)
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`
    }
  }

  useEffect(() => {
    setShowDay(showDate)
    if (!showDate) return

    const panel = document.getElementById(`panel-${date}`)
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`
    }
  }, [showDate])

  return (
    <Day>
      <H3 onClick={() => onDayUpdate()}>
        <span>{new Date().toLocaleDateString() === date ? "Today" : date}</span>
        <span>{showDay ? "-" : "+"}</span>
      </H3>
      <Panel id={`panel-${date}`} showDay={showDay}>
        {showSummary && <Summary values={values} />}
        {showEntries && (
          <UL>
            {values.map(pattern => (
              <Pattern
                key={pattern.id}
                {...pattern}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </UL>
        )}
      </Panel>
    </Day>
  )
}
