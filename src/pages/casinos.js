import Head from 'next/head'

import Header from '~/components/header'
import CasinoCard from '~/components/casino-card'
import Footer from '~/components/footer'

import { getPageContent } from '~/lib/page-content'
import { getCasinos } from '~/lib/casinos'

export default function Casinos({ data, casinos }) {
  return (
    <div>
      <div className="relative overflow-hidden">
        <Header />
        <main>
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">{data.intro.Sub_heading}</h2>
                <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">{data.intro.Heading}</p>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">{data.intro.Summary}</p>
              </div>
            </div>

            <div className="mb-36 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl">
              {casinos.map(item => (
                <CasinoCard item={item} key={item.id} />
              ))}
            </div>
          </div>

        </main>
        <Footer />
      </div>
    </div>

  )
}

export async function getStaticProps() {
  const data = await getPageContent('casino-page')
  const casinos = await getCasinos('casinos')

  return {
    props: {
      data,
      casinos
    }
  }
}
