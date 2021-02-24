import Image from 'next/image'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'

import Header from '~/components/header'
import { getNews, getNewsItem } from '~/lib/news'

export default function NewsItem({ item }) {
  const mdxSource = hydrate(item.mdxSource);

  async function exitPreviewMode() {
    const res = await fetch('/api/exit-preview').catch(err => console.error(err))
    debugger

    if (res) {
      window.close()
    }
  }

  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <Header />
        <main>
          <div className="bg-white overflow-hidden">


            <div className="relative bg-indigo-600">
              <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                <div className="pr-16 sm:text-center sm:px-16">
                  <p className="font-medium text-white">
                    <span>
                      Preview mode is on,
                    </span>
                    <span className="block sm:ml-2 sm:inline-block">
                      <button className="text-white font-bold underline" onClick={() => exitPreviewMode()}> turn off</button>
                    </span>
                  </p>
                </div>
              </div>
            </div>


            <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
              <div className="hidden lg:block bg-gray-50 absolute top-0 bottom-0 left-3/4 w-screen"></div>
              <div className="mx-auto text-base max-w-prose lg:max-w-none">
                <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">{item?.news_category?.Category}</h2>
                <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">{item?.Heading}</h3>
              </div>
              <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="relative lg:row-start-1 lg:col-start-2">
                  <svg className="hidden lg:block absolute top-0 right-0 -mt-20 -mr-20" width="404" height="384" fill="none" viewBox="0 0 404 384" aria-hidden="true">
                    <defs>
                      <pattern id="de316486-4a29-4312-bdfc-fbce2132a2c1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="4" height="4" className="text-gray-200" fill="currentColor" />
                      </pattern>
                    </defs>
                    <rect width="404" height="384" fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
                  </svg>
                  {item.Cover &&
                    (<div className="relative text-base mx-auto max-w-prose lg:max-w-none">
                      <figure>
                        <div className="aspect-w-12 aspect-h-7 lg:aspect-none">
                          <Image
                            className="rounded-lg shadow-lg object-cover object-center"
                            src={`${process.env.NEXT_PUBLIC_API_URL}${item?.Cover?.url}`}
                            layout="responsive"
                            width={1184}
                            height={1376}
                          />
                        </div>
                      </figure>
                    </div>)}
                </div>
                <div className="mt-8 lg:mt-0">
                  <div className="text-base max-w-prose mx-auto lg:max-w-none">
                    <p className="text-lg text-gray-500">{item.Summary}</p>
                  </div>
                  <div className="mt-5 prose prose-indigo text-gray-500 mx-auto lg:max-w-none lg:row-start-1 lg:col-start-1">
                    {item?.Body && mdxSource}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export async function getStaticProps({ params, preview }) {
  const item = await getNewsItem(params.id, preview)
  const mdxSource = await renderToString(item.Body)

  return {
    props: {
      item: {
        ...item,
        mdxSource
      }
    }
  }
}

export async function getStaticPaths() {
  const news = await getNews()

  return {
    paths: news?.map((item) => `/news/${item.id}`),
    fallback: false
  }
}