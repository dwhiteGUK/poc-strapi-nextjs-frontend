
import Image from 'next/image'

export default function WhatsOn({ data }) {
  console.log('🚀 ~ file: gallery.js ~ line 3 ~ gallery ~ data', data.whats_ons)
  return (
    <div className="bg-gray-800 py-8 md:py-16 text-white">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h3 id={data.__component} className="mt-3 text-3xl font-thin">Take a look inside</h3>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {data.whats_ons.map((item, i) => (
            <div
              className={`${i == 0 ? 'row-span-2 h-96' : 'h-46'} relative text-white flex flex-col justify-center items-center overflow-hidden`}
            >

              <h4 className="relative text-2xl font-th z-10">{item.heading}</h4>
              <p className="relative text-bs text-white z-10">{item.strapline}</p>
              <div className="absolute inset-0 h-96 overflow-hidden ">
                <img
                  className="object-cover object-center absolute inset-0 z-1"
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover.url}`}
                  width={item.cover.width} height={item.cover.height}
                  alt={item.cover.alternativeText}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  )

}