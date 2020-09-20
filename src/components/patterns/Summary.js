import React from "react"
import styled from "styled-components"
import { formatTime } from "./utils"

const Summary = styled.div`
  background-color: #fefefe;
  padding: 0.1rem 1rem 1rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`
const H3 = styled.h3`
  margin: 1rem 0;
`
const Sum = styled.p`
  margin: 0.2rem 0;
`
const Label = styled.label`
  opacity: 0.5;
`

const getSeconds = ms => Math.floor(ms / 1000)

const getDurationMs = ({ start, end }) =>
  end ? new Date(end) - new Date(start) : 0

const summarizeValues = values =>
  Math.floor(values.reduce((a, b) => a + b, 0) / 1000)

const sortByDuration = (a, b) => {
  if (a < b) return 1
  if (a > b) return -1
  return 0
}

const getAverage = (sum, count) => Math.round(sum / count) || 0

const getMedian = values =>
  values.sort(sortByDuration)[Math.round((values.length - 1) / 2)]

const getTimeBetweenFeeding = values => {
  const feedings = values
    .filter(v => (v.type === "left" || v.type === "right") && v.end)
    .reverse()
  const timeBetweenFeedings = feedings
    .map((f, i) => {
      if (i === feedings.length - 1) {
        return false
      }
      return { start: f.end, end: feedings[i + 1].start }
    })
    .filter(Boolean)
  return timeBetweenFeedings.map(getDurationMs)
}

export default ({ values }) => {
  const feedingValues = values
    .filter(v => (v.type === "left" || v.type === "right") && v.end)
    .map(getDurationMs)
  const feedingSum = summarizeValues(feedingValues)
  const feedingCount = feedingValues.length
  const feedingAverage = getAverage(feedingSum, feedingCount)
  const feedingMedian = getMedian(feedingValues)
  const sumCount = values.filter(v => v.end).length
  const rightValues = values
    .filter(v => v.type === "right" && v.end)
    .map(getDurationMs)
  const rightSum = summarizeValues(rightValues)
  const rightCount = rightValues.length
  const rightAverage = getAverage(rightSum, rightCount)
  const rightMedian = getMedian(rightValues)
  const leftValues = values
    .filter(v => v.type === "left" && v.end)
    .map(getDurationMs)
  const leftSum = summarizeValues(leftValues)
  const leftCount = leftValues.length
  const leftAverage = getAverage(leftSum, leftCount)
  const leftMedian = getMedian(leftValues)
  const sleepValues = values
    .filter(v => v.type === "sleep" && v.end)
    .map(getDurationMs)
  const sleepSum = summarizeValues(sleepValues)
  const sleepCount = sleepValues.length
  const sleepAverage = getAverage(sleepSum, sleepCount)
  const sleepMedian = getMedian(sleepValues)
  const peeCount = values.filter(v => v.type === "pee").length
  const pooCount = values.filter(v => v.type === "poo").length
  const timeBetweenFeedingValues = getTimeBetweenFeeding(values)
  const timeBetweenFeedingSum = summarizeValues(timeBetweenFeedingValues)
  const timeBetweenFeedingCount = timeBetweenFeedingValues.length
  const timeBetweenFeedingAverage = getAverage(
    timeBetweenFeedingSum,
    timeBetweenFeedingCount
  )
  const timeBetweenFeedingMedian = getMedian(timeBetweenFeedingValues)

  return (
    sumCount > 3 && (
      <Summary>
        <H3>Summary</H3>
        <Sum>
          <Label>Feeding:</Label> {formatTime(feedingSum, true)}
        </Sum>
        {leftSum !== 0 && (
          <Sum>
            <Label>Left:</Label> {formatTime(leftSum, true)} ({leftCount} times)
          </Sum>
        )}
        {rightSum !== 0 && (
          <Sum>
            <Label>Right:</Label> {formatTime(rightSum, true)} ({rightCount}{" "}
            times)
          </Sum>
        )}
        {timeBetweenFeedingSum !== 0 && (
          <Sum>
            <Label>Between feeding:</Label>{" "}
            {formatTime(timeBetweenFeedingSum, true)} ({timeBetweenFeedingCount}{" "}
            times)
          </Sum>
        )}
        {sleepSum !== 0 && (
          <Sum>
            <Label>Sleep:</Label> {formatTime(sleepSum, true)} ({sleepCount}{" "}
            times)
          </Sum>
        )}
        {peeCount !== 0 && (
          <Sum>
            <Label>Pee:</Label> {peeCount} diapers
          </Sum>
        )}
        {pooCount !== 0 && (
          <Sum>
            <Label>Poo:</Label> {pooCount} diapers
          </Sum>
        )}
        {(rightCount > 1 || leftCount > 1 || sleepCount > 1) && (
          <>
            <H3>Average</H3>
            {feedingCount > 1 && (
              <Sum>
                <Label>Feeding:</Label> {formatTime(feedingAverage, true)}
              </Sum>
            )}
            {leftCount > 1 && (
              <Sum>
                <Label>Left:</Label> {formatTime(leftAverage, true)}
              </Sum>
            )}
            {rightCount > 1 && (
              <Sum>
                <Label>Right:</Label> {formatTime(rightAverage, true)}
              </Sum>
            )}
            {timeBetweenFeedingCount > 1 && (
              <Sum>
                <Label>Between feeding:</Label>{" "}
                {formatTime(timeBetweenFeedingAverage, true)}
              </Sum>
            )}
            {sleepCount > 1 && (
              <Sum>
                <Label>Sleep:</Label> {formatTime(sleepAverage, true)}
              </Sum>
            )}
            <H3>Median</H3>
            {feedingCount > 1 && (
              <Sum>
                <Label>Feeding:</Label>{" "}
                {formatTime(getSeconds(feedingMedian), true)}
              </Sum>
            )}
            {leftCount > 1 && (
              <Sum>
                <Label>Left:</Label> {formatTime(getSeconds(leftMedian), true)}
              </Sum>
            )}
            {rightCount > 1 && (
              <Sum>
                <Label>Right:</Label>{" "}
                {formatTime(getSeconds(rightMedian), true)}
              </Sum>
            )}
            {timeBetweenFeedingCount > 1 && (
              <Sum>
                <Label>Between feeding:</Label>{" "}
                {formatTime(getSeconds(timeBetweenFeedingMedian), true)}
              </Sum>
            )}
            {sleepCount > 1 && (
              <Sum>
                <Label>Sleep:</Label>{" "}
                {formatTime(getSeconds(sleepMedian), true)}
              </Sum>
            )}
          </>
        )}
      </Summary>
    )
  )
}
