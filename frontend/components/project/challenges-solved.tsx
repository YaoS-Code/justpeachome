'use client'

interface Challenge {
    _key?: string
    challenge: string
    solution?: string
}

interface ChallengesSolvedProps {
    challenges: Challenge[]
}

export default function ChallengesSolved({ challenges }: ChallengesSolvedProps) {
    if (!challenges || challenges.length === 0) {
        return null
    }

    return (
        <div className="space-y-6">
            {challenges.map((item, index) => (
                <div
                    key={item._key || index}
                    className="bg-white rounded-xl border-2 border-border-light p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-start gap-4">
                        {/* Number Badge */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold font-display shrink-0">
                            {index + 1}
                        </div>

                        <div className="flex-1">
                            {/* Challenge */}
                            <div className="mb-4">
                                <h4 className="text-sm font-bold uppercase tracking-wide text-red-600 mb-2">
                                    ⚠️ Challenge
                                </h4>
                                <p className="text-primary font-medium leading-relaxed">
                                    {item.challenge}
                                </p>
                            </div>

                            {/* Solution */}
                            {item.solution && (
                                <div className="pl-6 border-l-4 border-green-500">
                                    <h4 className="text-sm font-bold uppercase tracking-wide text-green-700 mb-2">
                                        ✅ Solution
                                    </h4>
                                    <p className="text-secondary leading-relaxed">
                                        {item.solution}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
