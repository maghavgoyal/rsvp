"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface SimpleRsvpFormProps {
  onSubmitSuccess?: () => void
  userId: string
}

export default function SimpleRsvpForm({ onSubmitSuccess, userId }: SimpleRsvpFormProps) {
  const [mounted, setMounted] = useState(false)
  const [attending, setAttending] = useState<string | null>(null)
  const [guests, setGuests] = useState("1")
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('https://wedding-app-bs4a.onrender.com/update_attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userId,
          attending: attending === 'yes',
          attendees: parseInt(guests, 10),
          diet: attending === 'yes' ? dietaryRestrictions : ''
        })
      })

      const result = await response.text()

      if (result === 'Marked') {
        setIsSubmitted(true)
        onSubmitSuccess?.()
      } else {
        setError('Something went wrong. Please try submitting again.')
      }
    } catch {
      setError('Failed to submit RSVP. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) {
    return null // or a loading placeholder
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-4">
          Your RSVP has been received.
          {attending === 'yes' && ' We look forward to celebrating with you!'}
        </p>
        {attending === 'yes' && <div className="text-pink-500 text-5xl mb-4">❤️</div>}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold">RSVP</h2>
        <p className="text-gray-600">Please fill out this form to let us know if you can attend.</p>
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <span className="block text-sm font-medium mb-2">Will you be attending?</span>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="attending"
                value="yes"
                checked={attending === "yes"}
                onChange={() => setAttending("yes")}
                required
                className="h-4 w-4"
              />
              <span>Yes, I&apos;ll be there</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="attending"
                value="no"
                checked={attending === "no"}
                onChange={() => setAttending("no")}
                className="h-4 w-4"
              />
              <span>Sorry, I can&apos;t make it</span>
            </label>
          </div>
        </div>

        {attending === "yes" && (
          <>
            <div>
              <label htmlFor="guests" className="block text-sm font-medium mb-1">
                Number of Guests (including yourself)
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="1">1 (Just me)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            <div>
              <label htmlFor="dietary" className="block text-sm font-medium mb-1">
                Dietary Restrictions
              </label>
              <textarea
                id="dietary"
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                placeholder="Please let us know if you have any dietary restrictions or allergies"
                className="w-full px-3 py-2 border rounded-md h-24"
              />
              <p className="text-xs text-gray-500 mt-1">
                Example: If you don&apos;t eat Garlic, please indicate here.
              </p>
            </div>
          </>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit RSVP"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

