import Head from 'next/head'
import Image from 'next/image'

import Header from '~/components/header'
import Footer from '~/components/footer'

import { getPageContent } from '~/lib/page-content'
import { getRegions } from '~/lib/regions'
import { getCasinos } from '~/lib/casinos'
import { getWhatsOn, getWhatsOnCount } from '~/lib/whats-on'

export default function WhatsOn({ data, count, regions, casinos, whatsOn }) {
  return (
    <div>
      <Head>
        <title>Whats On</title>
      </Head>
      <div className="relative overflow-hidden">
        <Header />
        <main>
          <div className="bg-white">
            <section className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                {data.intro.Sub_heading && (<p className="text-base font-semibold text-indigo-600 tracking-wide uppercase">{data.intro.Sub_heading}</p>)}
                <h1 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">{data.intro.Heading}</h1>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">{data.intro.Summary}</p>
              </div>
            </section>

            <section className="my-8 p-8 bg-gray-100">
              <div className="max-w-7xl mx-auto flex">
                <div className="w-1/2 p-2">
                  <div className="flex justify-between">
                    <h4 className="self-start">Where</h4>

                    <div >
                      <label for="casino" className="sr-only">Casino</label>
                      <select name="casino">
                        <option value="-1">All Casinos</option>
                        {casinos.map((casino) => (
                          <option value={casino.id} key={casino.id}>{casino.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label for="region" className="sr-only">Casino</label>
                      <select name="region">
                        <option value="-1">All Casinos</option>
                        {regions.map((region) => (
                          <option value={region.id} key={region.id}>{region.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 p-2">
                  <h4>When</h4>
                </div>
              </div>

            </section>

            <section className="mb-36 mx-auto max-w-md sm:max-w-lg lg:max-w-7xl">
              {/* <pre>{JSON.stringify(whatsOn, null, 2)}</pre> */}
              <div className="flex justify-between">
                <p>Results: <strong>{count}</strong> events found</p>
                <div>
                  <label className="mr-2">Sort by</label>
                  <select>
                    <option value="Ascending">Ascending</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 grid gap-8 lg:px-8 lg:grid-cols-3">
                {whatsOn.map(item => (
                  <article key={item.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                    <div className="flex-shrink-0">
                      <Image className="h-48 w-full object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover.url}`} width={384} height={192} alt="" />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <a className="block mt-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {item.heading}
                          </h3>
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

        </main>
        <Footer />
      </div>
    </div>

  )
}

export async function getStaticProps() {
  const data = await getPageContent('whats-on-page')
  const count = await getWhatsOnCount()
  const regions = await getRegions()
  const casinos = await getCasinos()
  const whatsOn = await getWhatsOn()

  return {
    props: {
      data,
      count,
      regions,
      casinos,
      whatsOn
    }
  }
}
