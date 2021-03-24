import Image from 'next/image'
import Link from 'next/link'
export default function CasinoCard({ item }) {

  return (
    <Link href={`/casinos/${item.id}`} passHref>
      <a>
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          <div className="flex-shrink-0">
            <Image className="h-48 w-full object-cover" src={`${process.env.NEXT_PUBLIC_API_URL}${item.cover.url}`} width={384} height={192} alt="" />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <a className="block mt-2">
                <p className="text-xl font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="mt-3 text-base text-gray-500">
                  {item.address.address1}
                  {item.address.address2 && (<>, {item.address.address2}</>)}
                  {item.address.city && (<>, {item.address.city}</>)}
                  {item.address.county && (<>, {item.address.county}</>)}
                  {item.address.postcode && (<><br />{item.address.postcode}</>)}
                </p>
              </a>
            </div>
          </div>
        </div>
      </a>
    </Link>
  )
}