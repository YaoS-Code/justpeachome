
import { client } from '@/lib/sanity'
import SanityImage from '@/components/sanity-image'
import imageUrlBuilder from '@sanity/image-url'

import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder(client)

function urlFor(source: SanityImageSource) {
    return builder.image(source)
}

interface Service {
    _id: string
    title: string
    coverImage: SanityImageSource
}

export const revalidate = 60

export default async function DebugImagesPage() {
    const services = await client.fetch<Service[]>(`*[_type == "service"][0...3]`)

    return (
        <div className="min-h-screen p-8 bg-white text-black">
            <h1 className="text-2xl font-bold mb-8">Image Debugger</h1>

            {services.map((service) => {
                const rawUrl = service.coverImage ? urlFor(service.coverImage).url() : 'No Image'

                return (
                    <div key={service._id} className="mb-12 border-b pb-8">
                        <h2 className="text-xl font-bold mb-4">{service.title}</h2>

                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold mb-2">Standard &lt;img&gt; Tag (Control)</h3>
                                {service.coverImage && (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={rawUrl}
                                            alt="Control"
                                            width={300}
                                            style={{ border: '2px solid red' }}
                                        />
                                    </>
                                )}
                                <p className="mt-2 text-xs break-all font-mono bg-gray-100 p-2">
                                    SRC: {rawUrl}
                                </p>
                            </div>

                            <div>
                                <h3 className="font-bold mb-2">SanityImage Component (Test)</h3>
                                <div className="relative w-[300px] h-[200px] border-2 border-green-500">
                                    <SanityImage
                                        image={service.coverImage}
                                        fill
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold">Raw Data</h3>
                            <pre className="bg-gray-100 p-4 text-xs overflow-auto">
                                {JSON.stringify(service.coverImage, null, 2)}
                            </pre>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
