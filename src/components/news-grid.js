import NewsCard from '~/components/news-card'
export default function News({ data }) {

  return (
    <div className="relative bg-gray-50 py-8 sm:py-16 lg:py-24">
      <div className="relative">
        {data.Intro && (
          <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h3 id={data.__component} className="mt-3 text-3xl font-thin">{data.Intro.Sub_heading}</h3>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              {data.Intro.Heading}
            </p>
            <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
              {data.Intro.Summary}
            </p>
          </div>
        )}
        <div className="mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl justify-items-center">
          {data.news_items.map(item => (
            <NewsCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}