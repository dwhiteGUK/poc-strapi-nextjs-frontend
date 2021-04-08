import { useEffect, useState } from 'react'

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
      <p className="relative text-bs text-white z-20 text-center">{item?.category_fields[0]?.strapline}</p>
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
          <p className="font-thin">{item.category.category}</p>
          <h3 className="text-xl font-semibold">
            {item.heading}
          </h3>

          {item.casinos ? (
            <p className="text-gray-400 text-xs mt-6">
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
  switch (item?.category?.id) {
    case 1:
      return <PromotionCard {...item} />
    case 3:
      return <TournamentCard {...item} />
    default:
      return <PromotionCard {...item} />
  }
}

export default function WhatsOn({ data }) {
  const [categories, setCategories] = useState([])
  const [currentCategory, setCurrentCategory] = useState([])



  useEffect(() => {
    let catSet = new Set()

    data.map((item) => catSet.add(item.category.category))

    const catArray = [...catSet]
    setCategories([...catSet])
    setCurrentCategory(catArray[0])
  }, [data])


  return (
    <div className="bg-gray-800 py-8 md:py-16 text-white">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h3 id="content.whats-on" className="mt-3 text-3xl font-thin">Whats On</h3>

        <div class="border-b border-gray-200">
          <nav class="-mb-px flex  space-x-8" aria-label="Tabs">
            {categories.map((category) => (
              <a
                href="#"
                role="tab"
                aria-selected={category === currentCategory}
                aria-controls={category}
                class={`border-transparent  hover:text-yellow-500 hover:border-yellow-500 
                py-4 px-1 text-center border-b-2 font-medium text-sm
                 ${category === currentCategory ? 'border-red-500 text-red-600' : 'text-gray-200'}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentCategory(category)
                }}
              >
                {category}
              </a>
            ))}
          </nav>
        </div>

        <div className="relative">
          {categories.map((category) => (
            <div className={`
              ${category === currentCategory ? 'block' : 'hidden'}
            `}>
              <div
                role="tabpanel"
                aria-hidden={category === currentCategory}
                aria-labelledby={category}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
              >

                {data.map((item, i) => {
                  if (item.category.category !== category) return

                  return (
                    <>
                      {getWhatsOnCard({ ...item })}
                    </>
                  )
                })}
              </div>
            </div>
          ))}
          <br className="block" />
        </div>
      </div>
    </div>
  )

}