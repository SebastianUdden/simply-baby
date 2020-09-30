import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Duration from "./Duration"
import { uuidv4 } from "./utils"

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
  background-color: ${p => (p.active ? "#6e7a73" : "#fefefe")};
  color: ${p => (p.active ? "#fefefe" : "default")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  :active {
    background-color: #6e7a73;
    color: #fefefe;
  }
`
const SmallButton = styled(Button)`
  width: 100%;
  height: 2rem;
  font-size: 12px;
  padding: 0.5rem;
`
const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
`
const WideButton = styled(Button)`
  grid-column: 1 / 4;
`
const Input = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 12px;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  color: #444;
  border: none;
  outline: none;
  margin: 0.2rem 0;
`
const Label = styled.label`
  display: flex;
  align-items: center;
  font-weight: 800;
`

export default ({ patterns, onUpdatePatterns = () => {} }) => {
  const [active, setActive] = useState("")
  const [formula, setFormula] = useState("")
  const [showFormula, setShowFormula] = useState(false)

  useEffect(() => {
    const latest = patterns[patterns.length - 1]
    if (!latest) return
    const isImmediate = latest.type === "pee" || latest.type === "poo"
    if (latest.start && !latest.end && !isImmediate) {
      setActive(latest.type)
    }
  }, [patterns])

  const changeActive = (current, immediateEnd, formula) => {
    const newPoint = {
      id: uuidv4(),
      type: current,
      start: new Date(),
      end: immediateEnd ? new Date() : undefined,
      formula,
    }
    const endedPatterns = patterns.map(bp => {
      if (bp.end) return bp
      return {
        ...bp,
        end: new Date(),
      }
    })
    const isActive = active === current
    const alwaysCreate =
      current === "pee" || current === "poo" || current === "formula"
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
          onClick={() => {
            setShowFormula(true)
            setTimeout(() => {
              document.getElementById("formula-input").focus()
            }, 100)
          }}
          active={active === "formula" || showFormula}
        >
          {!showFormula && <span>Formula</span>}
          {showFormula && (
            <>
              <Input
                id="formula-input"
                type="number"
                value={formula}
                onChange={e => setFormula(e.target.value)}
              />
              <FlexWrapper>
                <SmallButton
                  onClick={e => {
                    e.stopPropagation()
                    changeActive("formula", true, formula)
                    setShowFormula(false)
                    setFormula("")
                  }}
                >
                  Add
                </SmallButton>
                <SmallButton
                  onClick={e => {
                    e.stopPropagation()
                    setShowFormula(false)
                    setFormula("")
                  }}
                >
                  Cancel
                </SmallButton>
              </FlexWrapper>
            </>
          )}
        </WideButton>
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
