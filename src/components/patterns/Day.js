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

  useEffect(() => {
    setShowDay(showDate)
  }, [showDate])

  return (
    <Day>
      <H3 onClick={() => setShowDay(!showDay)}>
        <span>{new Date().toLocaleDateString() === date ? "Today" : date}</span>
        <span>{showDay ? "-" : "+"}</span>
      </H3>
      {showDay && (
        <>
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
        </>
      )}
    </Day>
  )
}
