import Image from 'next/image'
export default function NewsCaed({ item }) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <Image className="h-48 w-full object-cover" src={`http://localhost:1337${item.Cover.url}`} width={384} height={192} alt="" />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-cyan-600">
            <a href="#" className="hover:underline">
              {item.news_category.Category}
            </a>
          </p>
          <a href="#" className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">
              {item.Heading}
            </p>
            <p className="mt-3 text-base text-gray-500">
              {item.Summary}
            </p>
          </a>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <a href="#">
              <span className="sr-only">Roel Aufderehar</span>
              <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=UsVmjgUMfb&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              <a href="#" className="hover:underline">Roel Aufderehar</a>
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime="2020-03-16">Mar 16, 2020</time>
              <span aria-hidden="true">&middot;</span>
              <span>6 min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}