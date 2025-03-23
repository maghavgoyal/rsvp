import { Suspense } from "react"
import RsvpPage from "../components/rsvp-page"

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RsvpPage />
    </Suspense>
  )
}

