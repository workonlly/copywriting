'use client'

import React, { useState } from 'react'

function page() {
  const [selectedPlan, setSelectedPlan] = useState('5credit')

  const plans = [
    {
      id: '1credit',
      name: 'Instant Plan',
      credits: '1 credit',
      price: '₹10',
      description: 'can use to make one post',
      discount: '',
      recommended: false
    },
    {
      id: '5credit',
      name: 'Recommended Plan',
      credits: '5 credit',
      price: '₹25',
      description: '50% discount',
      discount: '50%',
      recommended: true
    },
    {
      id: '15credit',
      name: 'Full Semester Plan',
      credits: '15 credit',
      price: '₹50',
      description: '68% discount',
      discount: '68%',
      recommended: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Buy credits</h1>
          <p className="text-gray-600">
            Your free 5 sign up credits has been expired. Purchase further credits to continue posting writing jobs.
          </p>
        </div>

        {/* Plans Container */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {/* Recommended Badge */}
              {plan.recommended && (
                <div className="absolute -top-3 right-6 bg-purple-600 rounded-full p-2 shadow-lg z-10">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              )}

              {/* Plan Card */}
              <div
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'bg-purple-100 border-2 border-purple-600'
                    : 'bg-white border-2 border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Radio Button */}
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id
                      ? 'border-purple-600 bg-purple-600'
                      : 'border-gray-400'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>

                  {/* Plan Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-2xl font-bold text-gray-900">{plan.credits}</span>
                      <span className="text-gray-600 text-sm">{plan.description}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{plan.price}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Purchase Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-16 rounded-lg transition-colors">
            Proceed to purchase
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
