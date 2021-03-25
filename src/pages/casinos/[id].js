import Image from 'next/image'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'

import Header from '~/components/header'
import CasinoNav from '~/components/casino-nav'
import NewsGrid from '~/components/news-grid'
import Gallery from '~/components/gallery'
import WhatsOn from '~/components/whats-on'
import Footer from '~/components/footer'

import { getCasinos, getCasinosItem } from '~/lib/casinos'

function getContentComponent(item) {
  switch (item.__component) {
    case 'content.news-grid':
      return <NewsGrid data={item} />
    case 'content.news-realation':
      return <NewsGrid data={item} />
    case 'content.gallery':
      return <Gallery data={item} />
    case 'content.whats-on':
      return <WhatsOn data={item} />
    default:
      return <p>{`Component not found ${item.__component}`}</p>
  }
}


function getFriendlyTime(value) {
  const hour = value?.replace(':00:00.000', '') ?? ''
  const current = new Date(Date.now())
  const dateWithHour = current.setHours(hour, 0, 0)

  const formattedHour = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    hour12: true
  }).format(dateWithHour)

  return formattedHour
}

function createIconMarkup(icon) {
  return { __html: icon };
}

export default function CasinosItem({ item, preview }) {
  const mdxSource = (item && item?.Body && hydrate(item?.mdxSource || '')) ?? ''

  async function exitPreviewMode() {
    const res = await fetch('/api/exit-preview').catch(err => console.error(err))

    if (res) {
      window.close()
    }
  }

  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <Header />
        <main>
          <div className="bg-white ">
            <div className="relative bg-gray-900">
              {item?.cover && (
                <div className="absolute inset-0">
                  <Image
                    className="h-full w-full opacity-50 absolute inset-0"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover.url}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"></div>
                </div>
              )}
              <div className="max-w-4xl mx-auto p-8 lg:max-w-7xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                <div className="relative px-8 py-4 xl:col-start-1 xl:pb-24 text-grey-600 bg-white bg-opacity-75">
                  <h1 className="mt-3 text-3xl font-thin">{item?.name}</h1>
                  <div className="space-y-4 mt-4 pb-4 border-gray-400 border-b">
                    <div className="flex items-center ">
                      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <p className="text-xs">
                        {item?.address?.address1}
                        {item?.address?.address2 && (<>, {item?.address?.address2}</>)}
                        {item?.address?.city && (<>, {item?.address?.city}</>)}
                        {item?.address?.county && (<>, {item?.address?.county}</>)}
                        {item?.address?.postcode && (<>, {item?.address?.postcode}</>)}
                      </p>
                    </div>
                    {item?.address?.telephone && (
                      <div className="flex items-center text-xs">
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <p className="text-xs">
                          {item.address.telephone}
                        </p>
                      </div>
                    )}
                    {item?.opening_hour && (
                      <div className="flex items-center">
                        <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-xs">
                          Open daily {getFriendlyTime(item?.opening_hour?.open)} to {getFriendlyTime(item?.opening_hour?.close)}
                          {item?.opening_hour?.gaming && (
                            <>
                              <span className="mx-2"> | </span>Live Gaming from {getFriendlyTime(item?.opening_hour?.gaming)}
                            </>
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                  {item.facilities.length > 0 && (
                    <div className="space-y-4 mt-4 pb-4 text-xs border-gray-400 border-b">
                      <h3>Facilities</h3>
                      <ul className="mt-4 space-y-2">
                        {item.facilities.map((item) => (
                          <li key={item.id} className="flex items-center">
                            <div className="inline-block w-4 h-4 mr-2" dangerouslySetInnerHTML={createIconMarkup(item.icon)} />
                            {item.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-4 pb-4 text-xs flex justify-between">
                    <p className="flex items-center">
                      <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                      Need a restaurant reservation
                    </p>
                    <a className="bg-red-500 p-2 text-white" href="#">
                      Book a table
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {item?.content && (
              <>
                <CasinoNav content={item.content} />
                <div>
                  {item?.content.map(item => {
                    const component = getContentComponent(item);
                    return component
                  })}
                </div>
              </>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export async function getStaticProps(context) {

  const { params, preview } = context
  const item = await getCasinosItem(params.id, preview)

  if (!item) {
    return { notFound: true }
  }

  const mdxSource = await renderToString(item?.Body ?? '')

  return {
    props: {
      item: {
        ...item,
        mdxSource
      },
      preview: preview ? true : null
    }
  }
}

export async function getStaticPaths() {
  const casinos = await getCasinos()
    .catch(err => {
      console.error(err);
      return { notFound: true }
    })

  return {
    paths: casinos?.map((item) => `/casinos/${item.id}`),
    fallback: true
  }
}