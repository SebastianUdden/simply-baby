import React, { useEffect, useState } from "react"

import BabyPatternTracker from "../components/patterns/BabyPatternTracker"
import BabyPatterns from "../components/patterns/BabyPatterns"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const [show, setShow] = useState(false)
  const [patterns, setPatterns] = useState([])

  useEffect(() => {
    setShow(true)
    const today = new Date().toLocaleDateString()
    setPatterns(
      JSON.parse(localStorage.getItem(`baby-patterns-${today}`)) || []
    )
  }, [])

  useEffect(() => {
    if (!patterns || !patterns.length) return
    const today = new Date().toLocaleDateString()
    localStorage.setItem(`baby-patterns-${today}`, JSON.stringify(patterns))
  }, [patterns])

  return (
    <Layout>
      <SEO title="Home" />
      {show && (
        <>
          <BabyPatternTracker
            patterns={patterns}
            onUpdatePatterns={babyPatterns => setPatterns(babyPatterns)}
          />
          <BabyPatterns
            patterns={patterns}
            onUpdate={pattern =>
              setPatterns(
                patterns.map(p => (p.id === pattern.id ? pattern : p))
              )
            }
            onDelete={id => setPatterns(patterns.filter(p => p.id !== id))}
          />
        </>
      )}
    </Layout>
  )
}

export default IndexPage
