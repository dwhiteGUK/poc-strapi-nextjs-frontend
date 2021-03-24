import Image from 'next/image'


export default function ({ item, mdxSource }) {

  return (
    <div className="relative bg-white">
      {item?.Cover && (
        <div className="lg:absolute lg:inset-0">
          <div className="lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2">
            <Image
              className="h-56 w-full object-cover lg:absolute lg:h-full"
              src={`${process.env.NEXT_PUBLIC_API_URL}${item?.Cover?.url}`}
              layout="fill"
              objectFit="cover"
              objectFit="center"
            />
          </div>
        </div>
      )}
      <div className="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2">
        <div className="lg:col-start-2 lg:pl-8">
          <div className="text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0">
            <h2 className="leading-6 text-indigo-600 font-semibold tracking-wide uppercase">{item?.news_category?.Category}</h2>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{item?.Heading}</h1>
            <p className="mt-8 text-lg text-gray-500">{item?.Summary}</p>
            <div className="mt-5 prose prose-indigo text-gray-500">
              {item?.Body && mdxSource}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
