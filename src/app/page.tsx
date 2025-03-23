"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SimpleRsvpForm from "../components/simple-rsvp-form"

export default function Home() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const userParam = searchParams.get('user')
    if (userParam) {
      setUserId(userParam)
    }
  }, [searchParams])

  const handleWhatsAppClick = () => {
    window.open('https://chat.whatsapp.com/HmFwoqzPKYT5UFAK7IBuHx', '_blank')
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Invalid Link</h2>
          <p className="text-gray-600">Please make sure you're using the correct invitation link.</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full">
        <Image
          src="/bg_new.jpg"
          alt="Wedding couple"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 sm:p-6 md:p-8">
          <div className="relative -top-18 sm:-top-56 md:-top-54 lg:-top-24">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif mb-2 sm:mb-4">
              Kriti & Maghav
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-light mb-4 sm:mb-8">
              ARE GETTING MARRIED
            </p>
          </div>

          <div className="mt-80 sm:mt-60 md:mt-70 lg:mt-100 animate-bounce">
            <p className="text-xs sm:text-sm uppercase tracking-widest">Scroll to RSVP</p>
            <div className="mt-2 flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 sm:h-6 sm:w-6"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          {!isFormSubmitted && (
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3 sm:mb-4">We'd Love to Have You Join Us</h2>
              <p className="text-gray-600">Please let us know if you can make it by April 10, 2025</p>
            </div>
          )}
          <SimpleRsvpForm onSubmitSuccess={() => setIsFormSubmitted(true)} userId={userId} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50 text-center text-gray-500">
        <div className="container mx-auto px-4">
          <p>We can't wait to celebrate with you!</p>
          <div className="mt-4 flex flex-col items-center justify-center">
            <p className="mb-2">Have any doubt/issue, please report it here</p>
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Join WhatsApp Group</span>
            </button>
          </div>
        </div>
      </footer>
    </main>
  )
}

