import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <div className='container'>
      <div className='hello-gatsby'>
        <h1>About</h1>
      </div>
    </div>  
  </Layout>
)

export default AboutPage
