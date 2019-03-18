import React from "react"
import gif from '../img/gatsby.gif';

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <div className='container'>
        <div className='hello-gatsby'>
          <h1>Hello Old Sport</h1>
          <p className='lead'>Welcome to <a target='_blank' rel='noopener noreferrer' href='https://gatsbyjs.org'>Gatsby</a>.</p>
          <img src={gif} alt='Gatsby GIF' />
        </div>
      </div>
  </Layout>
)

export default IndexPage
