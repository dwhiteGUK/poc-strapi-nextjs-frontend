import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'

import Header from '~/components/header'
import Footer from '~/components/footer'
import SplitWithImage from '~/components/layouts/split-with-image'
import TwoColumnsWithImage from '~/components/layouts/two-columns-with-image'

import { getNews, getNewsItem } from '~/lib/news'

function getLayoutTemplate(item, mdxSource) {
  switch (item?.news_layout?.name) {
    case "Split with image":
      return (<SplitWithImage item={item} mdxSource={mdxSource} />)
    case "Split with image":
      return (<TwoColumnsWithImage item={item} mdxSource={mdxSource} />)
    default:
      return (<TwoColumnsWithImage item={item} mdxSource={mdxSource} />)
  }
}

export default function NewsItem({ item, preview }) {
  const mdxSource = (item && item?.Body && hydrate(item?.mdxSource || '')) ?? ''

  async function exitPreviewMode() {
    const res = await fetch('/api/exit-preview').catch(err => console.error(err))

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

            {preview ? (
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
            ) : null}

            {getLayoutTemplate(item, mdxSource)}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export async function getStaticProps(context) {

  const { params, preview } = context
  const item = await getNewsItem(params.id, preview)

  if (!item) {
    return { notFound: true }
  }

  const mdxSource = await renderToString(item?.Body ?? '')

  return {
    props: {
      item: {
        ...item,
        mdxSource
      },
      preview: preview ? true : null
    }
  }
}

export async function getStaticPaths() {
  const news = await getNews()
    .catch(err => {
      console.error(err);
      return { notFound: true }
    })

  return {
    paths: news?.map((item) => `/news/${item.id}`),
    fallback: true
  }
}