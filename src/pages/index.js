import Head from 'next/head'


import CtaHalfImage from '~/components/cta-half-image'
import FeatureGrid from '~/components/feature-grid'
import Header from '~/components/header'
import HeroRightImage from '~/components/hero-right-image'
import HeroFullWidthImage from '~/components/hero-full-width-image'
import QuoteFullWidthImage from '~/components/quote-full-width-image'
import NewsGrid from '~/components/news-grid'
import Footer from '~/components/footer'

import { getPageContent } from '~/lib/page-content'

function getContentComponent(item) {
  switch (item.__component) {
    case 'content.hero-with-right-image':
      return <HeroRightImage data={item} />
    case 'content.hero-full-width-image':
      return <HeroFullWidthImage data={item} />
    case 'content.quote':
      return <QuoteFullWidthImage data={item} />
    case 'content.feature-grid':
      return <FeatureGrid data={item} />
    case 'content.cta-half-image':
      return <CtaHalfImage data={item} />
    case 'content.news-grid':
      return <NewsGrid data={item} />
    default:
      return <p>{`Component not found ${item.__component}`}</p>
  }
}

export default function News({ data }) {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <Header />
        <main>
          {data.Content.map(item => {
            const component = getContentComponent(item);
            return component
          })}
        </main>
        <Footer />
      </div>
    </div>

  )
}

export async function getStaticProps(context) {
  const data = await getPageContent('home')

  return {
    props: {
      data
    }
  }
}
