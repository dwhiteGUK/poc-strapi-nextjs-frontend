
import Image from 'next/image'

export default function Gallery({ data }) {
  return (
    <div className="bg-gray-800 pt-4 sm:pt-8 text-white">
      <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h3 id={data.__component} className="mt-3 text-3xl font-thin">Take a look inside</h3>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {data.images.map(image => (
            <Image
              className="h-48 w-full object-cover"
              src={`${process.env.NEXT_PUBLIC_API_URL}${image.url}`}
              width={image.width} height={image.height}
              alt={image.alternativeText}
            />
          ))}
        </div>
      </div>
    </div>
  )

}