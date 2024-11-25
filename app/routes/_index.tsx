import type { MetaFunction } from "@remix-run/node"
import FluidText from "~/components/FluidText"
import Gallery from "~/components/Gallery"
import Hero from "~/components/Hero"
import PhotoGallery from "~/components/PhotoGallery"

export const meta: MetaFunction = () => {
  return [
    { title: "Sascha fait des vidéos" },
    { name: "description", content: "Un vidéaste passionné et créatif" },
  ]
}

export default function Index() {
  return (
    <>
      <Hero />

      <Gallery />

      <FluidText />
      <PhotoGallery />
    </>
  )
}
