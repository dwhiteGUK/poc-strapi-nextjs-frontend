import * as Icons from '~/components/icons'

function getIcon(icon) {
  switch (icon) {
    case 'CloudUpload':
      return <Icons.CloudUpload className="w-6 h-6 text-white" />
    case 'LockClosed':
      return <Icons.LockClosed className="w-6 h-6 text-white" />
    case 'Refresh':
      return <Icons.Refresh className="w-6 h-6 text-white" />
    case 'ShieldCheck':
      return <Icons.ShieldCheck className="w-6 h-6 text-white" />
    case 'Cog':
      return <Icons.Cog className="w-6 h-6 text-white" />
    case 'Server':
      return <Icons.Server className="w-6 h-6 text-white" />
    default:
      return <p>{`Icon not found ${icon}`}</p>
  }
}

export default function FeatureGrid({ data }) {
  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">{data.Intro.Sub_heading}</h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          {data.Intro.Heading}</p>
        <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
          {data.Intro.Summary}
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.Feature.map((item) => (
              <div className="pt-6" key={item.id}>
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-lg">
                        {getIcon(item.Icon)}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{item.Heading}</h3>
                    <p className="mt-5 text-base text-gray-500">
                      {item.Summary}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}