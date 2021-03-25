
import Image from 'next/image'

export default function CasinoNav({ content }) {
  return (
    <>
      {content ? (
        <div className="bg-gray-800 pt-4 sm:py-8 text-white">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <nav className="hidden lg:py-4 lg:px-8 lg:flex lg:space-x-8 bg-white text-gray-900" aria-label="Global">
              {content.map(item => (
                <a
                  href={`#${item.__component}`}
                  className="text-gray-900 hover:bg-gray-50 hover:text-gray-900 rounded-md py-2 px-3 inline-flex items-center text-sm font-medium capitalize"
                >
                  {item.__component.replace('content.', '').replace('-', ' ')}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )

}