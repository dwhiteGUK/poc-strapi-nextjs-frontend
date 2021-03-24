export default function SectionIntro({ data }) {

  return (
    <div className="relative bg-gray-50 pt-8 sm:pt-16 lg:pt-24 -pb-8">
      <div className="relative">
        {data && (
          <div className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">{data.Sub_heading}</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              {data.Heading}
            </p>
            <p className="mt-5 mx-auto max-w-prose text-xl text-gray-500">
              {data.Summary}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}