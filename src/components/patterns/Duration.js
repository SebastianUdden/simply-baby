import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { formatTime } from "./utils"

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

export default ({ pattern }) => {
  const [seconds, setSeconds] = useState(getDuration(pattern))

  useEffect(() => {
    setTimeout(() => setSeconds(seconds + 1), 1000)
  }, [seconds])

  return <Time>{formatTime(seconds)}</Time>
}
