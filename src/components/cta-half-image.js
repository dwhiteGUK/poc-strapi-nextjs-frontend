import Image from 'next/image'

import * as Icons from '~/components/icons'

function getIcon(icon, classes) {
  switch (icon) {
    case 'ExternalLink':
      return <Icons.ExternalLink className={classes} />
    default:
      return <p>{`Icon not found ${icon}`}</p>
  }
}
export default function CtaHalfImage({ data }) {

  return (
    <div className="relative bg-gray-900">
      <div className="relative h-56 bg-indigo-600 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
        <Image className="w-full h-full object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${data.Cover.url}`} layout="fill" alt="" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-teal-500 to-cyan-600" style={{ mixBlendMode: 'multiply' }}></div>
      </div>
      <div className="relative mx-auto max-w-md px-4 py-12 sm:max-w-7xl sm:px-6 sm:py-20 md:py-28 lg:px-8 lg:py-32">
        <div className="md:ml-auto md:w-1/2 md:pl-10">
          <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
            {data.Strapline}
          </h2>
          <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">
            {data.Heading}
          </p>
          <p className="mt-3 text-lg text-gray-300">
            {data.Summary}
          </p>
          {data.Button ? (
            <div className="mt-8">
              <div className="inline-flex rounded-md shadow">
                <a href={data.Button.Link} className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50">
                  {data.Button.Text}
                  {getIcon(data.Button.Icon, "-mr-1 ml-3 h-5 w-5")}
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}