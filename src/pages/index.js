import React, { useEffect, useState } from "react"
import BabyPatterns from "../components/patterns/BabyPatterns"
import BabyPatternTracker from "../components/patterns/BabyPatternTracker"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const [show, setShow] = useState(false)
  const [patterns, setPatterns] = useState([])

  useEffect(() => {
    setShow(true)
    setPatterns(JSON.parse(localStorage.getItem("baby-patterns")) || [])
  }, [])

  useEffect(() => {
    if (!patterns || !patterns.length) return

    localStorage.setItem("baby-patterns", JSON.stringify(patterns))
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
            onDelete={id => setPatterns(patterns.filter(p => p.id !== id))}
          />
        </>
      )}
    </Layout>
  )
}

export default IndexPage
