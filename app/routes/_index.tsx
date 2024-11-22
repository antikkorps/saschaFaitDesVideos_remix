import type { MetaFunction } from "@remix-run/node"
import Hero from "~/components/Hero"

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
    </>
  )
}
