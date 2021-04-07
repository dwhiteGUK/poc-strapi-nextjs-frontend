import { useState } from 'react'
import Head from 'next/head'
import { useQuery } from 'react-query'

import Header from '~/components/header'
import Footer from '~/components/footer'

import { getPageContent } from '~/lib/page-content'
import { getRegions } from '~/lib/regions'
import { getCasinos } from '~/lib/casinos'
import { getWhatsOn, getWhatsOnCount, getWhatsOnCategories } from '~/lib/whats-on'

function getDate(value) {
  const date = new Date(value)

  return date.getDate()
}

function getMonth(value) {
  const date = new Date(value)

  return new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date)
}

function PromotionCard(item) {
  return (
    <article
      key={item.id}
      className='relative text-white min-h-72 p-1 flex flex-col justify-center items-center overflow-hidden'
    >
      <div className="absolute inset-0 z-10 bg-black bg-opacity-25"></div>
      <h4 className="relative text-2xl font-th z-20 text-center">{item.heading}</h4>
      <p className="relative text-bs text-white z-20 text-center">{item.strapline}</p>
      <div className="absolute inset-0 h-96 overflow-hidden ">
        <img
          className="object-cover object-center absolute inset-0 z-1"
          src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover.url}`}
          width={item.cover.width} height={item.cover.height}
          alt={item.cover.alternativeText}
        />
      </div>
    </article >
  )
}

function TournamentCard(item) {
  return (
    <article key={item.id} className="flex flex-col rounded-sm shadow-md overflow-hidden col-span-1 text-gray-900">
      <div className="flex-shrink-0 h-48 overflow-hidden">
        <img
          className="w-full object-cover"
          src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover.url}`}
          width={item.cover.width}
          height={item.cover.height}
          srcSet={`${process.env.NEXT_PUBLIC_API_URL}${item.cover.url} ${item.cover.width}w
            ${process.env.NEXT_PUBLIC_API_URL}${item.cover.formats.medium.url} ${item.cover.formats.medium.width}w, 
            ${process.env.NEXT_PUBLIC_API_URL}${item.cover.formats.small.url} ${item.cover.formats.small.width}w,`}
          alt=""
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between relative">
        {item.category_fields ? (
          <div className="absolute right-0 top-0 p-2 h-16 w-16 flex justify-center items-center text-center text-gray-100 leading-tight bg-gray-700">
            {getDate(item.category_fields[0]?.start_date)}-{getDate(item.category_fields[0]?.end_date)}
            <br />
            {getMonth(item.category_fields[0]?.start_date)}
          </div>
        ) : null}
        <div className="flex-1">
          <p className="font-thin">{item.whats_on_category.heading}</p>
          <h3 className="text-xl font-semibold">
            {item.heading}
          </h3>

          {item.casinos ? (
            <p className="text-gray-100 text-xs mt-6">
              {item.casinos.map((casino, i) => {

                return `${casino.name}${i + 1 !== item.casinos.length ? ', ' : ''}`
              })}
            </p>
          ) : null}


        </div>
      </div>
    </article>
  )
}

function getWhatsOnCard(item) {
  switch (item.whats_on_category.id) {
    case 1:
      return <PromotionCard {...item} />
    case 3:
      return <TournamentCard {...item} />
    default:
      return <PromotionCard {...item} />
  }

}

const options = {
  page: 0,
  limit: 2,
}

export default function WhatsOn({ casinos, categories, count, pageContent, regions, whatsOn }) {
  const [category, setCategory] = useState()
  const [casino, setCasino] = useState()
  const [region, setRegion] = useState()
  const [sort, setSort] = useState()
  const [currentPage, setCurrentPage] = useState(options.page)

  const { data, isLoading } = useQuery(
    ['whats-on', { casino, category, region, sort, currentPage }],
    () => getWhatsOn({ casino, category, region, sort, page: currentPage, limit: options.limit }),
    {
      initialData: whatsOn,
      keepPreviousData: true,
      refetchOnMount: false,
    }
  )

  function clearAllFilters() {
    setCategory('')
    setCasino('')
    setRegion('')
    setSort('')
  }

  const pagesArray = [];
  for (let i = 0; i < (count / options.limit); i++) {
    pagesArray.push(i + 1);
  }
  console.log('🚀 ~ file: whats-on.js ~ line 133 ~ WhatsOn ~ pagesArray', pagesArray)

  return (
    <div>
      <Head>
        <title>Whats On</title>
      </Head>
      <div className="relative overflow-hidden">
        <Header />
        <main>
          <div className="bg-gray-900 text-gray-100">
            <section className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                {pageContent.intro.Sub_heading && (<p className="text-base font-semibold text-red-600 tracking-wide uppercase">{pageContent.intro.Sub_heading}</p>)}
                <h1 className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">{pageContent.intro.Heading}</h1>
                <p className="max-w-xl mt-5 mx-auto text-xl text-gray-200">{pageContent.intro.Summary}</p>
              </div>
            </section>

            <section className="py-16 bg-gray-700 ">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-center p-2">
                  <h4 className="w-20">What</h4>
                  <div>
                    <label for="casino" className="sr-only">Category</label>
                    <select
                      name="casino"
                      onChange={(event) => setCategory(event.target.value)}
                      value={category}
                      className="text-gray-900"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option value={category.id} key={category.id}>
                          {category.heading}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center">
                  <div className="lg:w-1/2">
                    <div className="flex flex-col md:flex-row md:items-center p-2">
                      <h4 className="w-20">Where</h4>

                      <div className="mr-2">
                        <label for="casino" className="sr-only">Casino</label>
                        <select
                          name="casino"
                          onChange={(event) => setCasino(event.target.value)}
                          value={casino}
                          className="ml-20 -mt-96 md:ml-0 md:mt-0 text-gray-900"
                        >
                          <option value="">All Casinos</option>
                          {casinos.map((casino) => (
                            <option value={casino.id} key={casino.id}>{casino.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label for="region" className="sr-only">Region</label>
                        <select
                          name="region"
                          onChange={(event) => setRegion(event.target.value)}
                          value={region}
                          className="ml-20 mt-2 md:mt-0 md:ml-0 text-gray-900"
                        >
                          <option value="">All Regions</option>
                          {regions.map((region) => (
                            <option value={region.id} key={region.id}>{region.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-2">
                    <h4 className="w-20">When</h4>
                    <div className="mr-2">
                      <label htmlFor="date" className="sr-only">Whats On Date</label>
                      <select name="date" className="text-gray-900">
                      </select>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={clearAllFilters}
                        className=""
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </section>

            <section className="py-24">
              <div className="mx-auto lg:max-w-7xl px-12 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between">
                  <p>Results: <strong>{count}</strong> events found</p>
                  <div>
                    <label className="mr-2">Sort by</label>
                    <select
                      name="sort"
                      onChange={(event) => setSort(event.target.value)}
                      value={sort}
                      className="text-gray-900"
                    >
                      <option value="published_at:ASC">Date Ascending</option>
                      <option value="published_at:DESC">Date Descending</option>
                      <option value="heading:ASC">Heading Ascending</option>
                      <option value="heading:DESC">Heading Descending</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {isLoading ? (
                    <div className="h-72 flex justify-center items-center col-span-2 lg:col-span-3">
                      <svg className="animate-spin mr-3 h-10 w-10 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : null}

                  {!isLoading && data.length > 0 ? (
                    <>
                      {data.map(item => getWhatsOnCard({ ...item }))}
                    </>
                  ) : null}


                  {!isLoading && data.length === 0 ? (
                    <p className="font-semibold text-center col-span-3">There are no results to show</p>
                  ) : null}

                </div>
                <nav className="mt-12 border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
                  <div className="-mt-px w-0 flex-1 flex">
                    <button
                      className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-100 
                      hover:text-red-700 hover:border-red-700
                        disabled:text-gray-600 disabled:hover:border-transparent disabled:hover:cursor-not-allowed"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 0}
                    >
                      <svg className="mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd" />
                      </svg>
                      Previous
                    </button>
                  </div>
                  <div className="hidden md:-mt-px md:flex">
                    {pagesArray.map((page) => (
                      <button
                        className={`${page === Number.parseInt(currentPage) + 1 ? 'border-red-500 text-red-600' : 'border-transparent text-gray-100'}
                          hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium`}
                        onClick={() => setCurrentPage(page - 1)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <div className="-mt-px w-0 flex-1 flex justify-end">
                    <button
                      className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-100 
                      hover:text-red-700 hover:border-red-700
                        disabled:text-gray-600 disabled:hover:border-transparent disabled:hover:cursor-not-allowed"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={(currentPage + 1) >= (count / options.limit)}
                    >
                      Next
                      <svg className="ml-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </nav>
              </div>
            </section>
          </div>

        </main>
        <Footer />
      </div>
    </div >

  )
}

export async function getStaticProps() {
  const casinos = await getCasinos()
  const categories = await getWhatsOnCategories()
  const count = await getWhatsOnCount()
  const pageContent = await getPageContent('whats-on-page')
  const regions = await getRegions()
  const whatsOn = await getWhatsOn({ limit: options.limit })

  return {
    props: {
      casinos,
      categories,
      count,
      pageContent,
      regions,
      whatsOn
    }
  }
}
