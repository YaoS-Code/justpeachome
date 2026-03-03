'use client'

import { useState } from 'react'
import { Calculator, TrendingUp, Home as HomeIcon, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface ROICalculatorProps {
    enabled?: boolean
    title?: string
    subtitle?: string
    disclaimer?: string
}

export default function ROICalculator({
    enabled = true,
    title = 'Calculate Your Basement Suite ROI',
    subtitle = 'Get instant estimates for your Calgary basement renovation project and see your potential rental income.',
    disclaimer = 'Estimates are based on 2025 Calgary market data. Final costs may vary based on specific project requirements. Contact us for a detailed quote.'
}: ROICalculatorProps) {
    const [squareFeet, setSquareFeet] = useState<string>('800')
    const [hasRoughIns, setHasRoughIns] = useState<boolean>(false)
    const [quality, setQuality] = useState<'basic' | 'mid' | 'high'>('mid')

    if (!enabled) return null

    // Cost per square foot based on quality level
    const costPerSqFt = {
        basic: { min: 35, max: 60 },
        mid: { min: 60, max: 100 },
        high: { min: 100, max: 175 }
    }

    // Calculate estimates
    const sqft = parseInt(squareFeet) || 0
    const baseCostMin = sqft * costPerSqFt[quality].min
    const baseCostMax = sqft * costPerSqFt[quality].max

    // Rough-ins save about $5,000-$10,000
    const roughInSavings = hasRoughIns ? 7500 : 0
    const totalCostMin = Math.max(0, baseCostMin - roughInSavings)
    const totalCostMax = Math.max(0, baseCostMax - roughInSavings)

    // Calgary rental rates (2025 market data)
    const monthlyRentMin = quality === 'basic' ? 1200 : quality === 'mid' ? 1400 : 1600
    const monthlyRentMax = quality === 'basic' ? 1400 : quality === 'mid' ? 1800 : 2200

    // Annual rental income
    const annualIncomeMin = monthlyRentMin * 12
    const annualIncomeMax = monthlyRentMax * 12

    // ROI calculation (simple, before expenses)
    const roiMin = totalCostMax > 0 ? ((annualIncomeMin / totalCostMax) * 100).toFixed(1) : '0'
    const roiMax = totalCostMin > 0 ? ((annualIncomeMax / totalCostMin) * 100).toFixed(1) : '0'

    // Payback period in years
    const paybackMin = totalCostMax > 0 ? (totalCostMax / annualIncomeMax).toFixed(1) : '0'
    const paybackMax = totalCostMin > 0 ? (totalCostMin / annualIncomeMin).toFixed(1) : '0'

    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('en-CA', {
            style: 'currency',
            currency: 'CAD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(num)
    }

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-accent-clay/5">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-accent-clay/10 rounded-full">
                        <Calculator className="w-5 h-5 text-accent-clay" />
                        <span className="text-sm font-semibold text-accent-clay">Interactive Tool</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* LEFT: Input Form */}
                        <div className="p-8 md:p-12 bg-gradient-to-br from-white to-gray-50">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <HomeIcon className="w-6 h-6 text-accent-clay" />
                                Your Project Details
                            </h3>

                            <div className="space-y-6">
                                {/* Square Footage */}
                                <div>
                                    <label htmlFor="sqft" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Basement Square Footage
                                    </label>
                                    <input
                                        id="sqft"
                                        type="number"
                                        min="200"
                                        max="2000"
                                        step="50"
                                        value={squareFeet}
                                        onChange={(e) => setSquareFeet(e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-accent-clay focus:ring-2 focus:ring-accent-clay/20 outline-none transition-all text-lg font-semibold"
                                        placeholder="800"
                                    />
                                    <p className="mt-2 text-xs text-gray-500">Typical range: 600-1200 sq ft</p>
                                </div>

                                {/* Quality Level */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Finish Quality Level
                                    </label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { value: 'basic', label: 'Basic', price: '$35-60/sf' },
                                            { value: 'mid', label: 'Mid-Range', price: '$60-100/sf' },
                                            { value: 'high', label: 'High-End', price: '$100-175/sf' }
                                        ].map(({ value, label, price }) => (
                                            <button
                                                key={value}
                                                onClick={() => setQuality(value as 'basic' | 'mid' | 'high')}
                                                className={`p-3 rounded-xl border-2 transition-all text-center ${quality === value
                                                        ? 'border-accent-clay bg-accent-clay/10 shadow-md'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                <div className="font-bold text-sm">{label}</div>
                                                <div className="text-xs text-gray-600 mt-1">{price}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rough-ins */}
                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer p-4 rounded-xl border-2 border-gray-200 hover:border-accent-clay/30 transition-all">
                                        <input
                                            type="checkbox"
                                            checked={hasRoughIns}
                                            onChange={(e) => setHasRoughIns(e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 text-accent-clay focus:ring-accent-clay"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold text-gray-900">Existing Rough-ins</div>
                                            <div className="text-xs text-gray-600">Plumbing/electrical already in place (saves ~$7,500)</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Results */}
                        <div className="p-8 md:p-12 bg-gradient-to-br from-accent-clay to-accent-clay-dark text-white">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-6 h-6" />
                                Your Estimated Returns
                            </h3>

                            <div className="space-y-6">
                                {/* Total Cost */}
                                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                                    <div className="text-sm font-medium text-white/80 mb-2">Total Project Cost</div>
                                    <div className="text-3xl font-bold">
                                        {formatCurrency(totalCostMin)} - {formatCurrency(totalCostMax)}
                                    </div>
                                    {hasRoughIns && (
                                        <div className="mt-2 text-xs text-green-200">
                                            ✓ Savings applied for existing rough-ins
                                        </div>
                                    )}
                                </div>

                                {/* Monthly Rental Income */}
                                <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                                    <div className="text-sm font-medium text-white/80 mb-2">Expected Monthly Rent</div>
                                    <div className="text-3xl font-bold flex items-baseline gap-2">
                                        <DollarSign className="w-6 h-6" />
                                        {monthlyRentMin.toLocaleString()} - {monthlyRentMax.toLocaleString()}
                                    </div>
                                    <div className="mt-2 text-xs text-white/70">
                                        Based on 2025 Calgary rental market
                                    </div>
                                </div>

                                {/* ROI */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                                        <div className="text-xs font-medium text-white/80 mb-1">Annual ROI</div>
                                        <div className="text-2xl font-bold">{roiMin}% - {roiMax}%</div>
                                    </div>
                                    <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
                                        <div className="text-xs font-medium text-white/80 mb-1">Payback Period</div>
                                        <div className="text-2xl font-bold">{paybackMin}-{paybackMax} yrs</div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link
                                    href="/contact?subject=basement-quote"
                                    className="block w-full py-4 px-6 bg-white text-accent-clay font-bold text-center rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                                >
                                    Get Detailed Quote →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                        <p className="text-xs text-gray-600 text-center leading-relaxed">
                            {disclaimer}
                        </p>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        <strong>Note:</strong> ROI calculations assume 100% occupancy and do not include property taxes, insurance, utilities, or maintenance costs.
                        Consult with a financial advisor for comprehensive investment analysis.
                    </p>
                </div>
            </div>
        </section>
    )
}
