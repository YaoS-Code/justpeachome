// import { ArrowDown } from 'lucide-react'

interface ProcessStep {
    _key: string
    title: string
    description: string
    order: number
}

interface ServiceProcessProps {
    steps: ProcessStep[]
}

export default function ServiceProcess({ steps }: ServiceProcessProps) {
    // Sort steps just in case
    const sortedSteps = [...steps].sort((a, b) => a.order - b.order)

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-accent-clay font-bold tracking-wider text-sm uppercase">Workflow</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-olive mt-2">
                        How We Work
                    </h2>
                    <p className="text-secondary mt-4 max-w-2xl mx-auto">
                        A transparent, step-by-step approach to ensure your project succeeds.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border-light -translate-x-1/2" />

                    <div className="space-y-12 relative">
                        {sortedSteps.map((step, index) => {
                            const isEven = index % 2 === 0
                            return (
                                <div key={step._key || index} className={`md:flex items-center justify-between ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>

                                    {/* Text Content */}
                                    <div className={`md:w-[45%] mb-6 md:mb-0 ${isEven ? 'text-right' : 'text-left'}`}>
                                        <div className="inline-block relative">
                                            <span className="text-accent-clay font-bold text-sm tracking-widest uppercase mb-1 block">
                                                Step 0{step.order}
                                            </span>
                                            <h3 className="text-2xl font-display font-semibold text-olive mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-secondary leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Dot/Circle */}
                                    <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-background-warm border-2 border-accent-clay flex items-center justify-center z-10">
                                            <div className="w-2 h-2 rounded-full bg-accent-clay" />
                                        </div>
                                    </div>

                                    {/* Empty Space for the other side */}
                                    <div className="md:w-[45%]" />

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
