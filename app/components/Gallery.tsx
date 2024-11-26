import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { BentoGrid, Video } from "./BentoGrid"

const demoVideos: Video[] = [
  {
    id: "1",
    title: "Event Happiness Crossfit 2024",
    thumbnailUrl: "/thumbnails/Happiness_Crossfit_Le_Mans_20.webp",
    description:
      "Event Happiness Crossfit 2024... Le but était de proposer une vidéo dynamique et motivante pour promouvoir l'événement.",
    date: "Octobre 2024",
    duration: "1:29",
    youtubeUrl: "https://www.youtube.com/watch?v=TlPJG3g67JQ",
    views: 1000,
    highlight: true,
  },
  {
    id: "2",
    title: "Les garennes 2024",
    thumbnailUrl: "/thumbnails/le_reveil_des_garennes_2024.png",
    description:
      "Suivi du festival pour permettre aux spectateurs de revivre les moments forts de l'événement...",
    date: "Juillet 2024",
    duration: "3:00",
    youtubeUrl: "https://youtu.be/OQTvXn8wQ7w",
    views: 1100,
  },
  {
    id: "3",
    title: "Le reveil des garennes 2023",
    thumbnailUrl: "/thumbnails/le_reveil_desgarennes_2023.jpg",
    description:
      "Suivi du festival pour permettre aux spectateurs de revivre les moments forts de l'événement...",
    date: "Juillet 2023",
    duration: "2:06",
    youtubeUrl: "https://youtu.be/D4-Ak0ccr8s",
    views: 800,
  },
  {
    id: "4",
    title: "Sweet barre à terre par Delphine Letort",
    thumbnailUrl: "/thumbnails/delphineletort.webp",
    description: "Film retraçant le stage de barre à terre de Delphine Letort...",
    date: "Juin 2023",
    duration: "1:30",
    youtubeUrl: "https://youtu.be/tFc8iaRg-aM",
    views: 500,
  },
  {
    id: "5",
    title: "VFX Breakdown",
    thumbnailUrl: "/thumbnail5.jpg",
    description: "Les effets spéciaux expliqués...",
    date: "Novembre 2023",
    duration: "5:30",
    youtubeUrl: "https://youtube.com/watch?v=...",
    views: 3000,
  },
  {
    id: "6",
    title: "Logo Animation Collection",
    thumbnailUrl: "/thumbnail6.jpg",
    description: "Une collection de mes meilleures animations de logos...",
    date: "Octobre 2023",
    duration: "2:15",
    youtubeUrl: "https://youtube.com/watch?v=...",
    views: 1800,
  },
]

export default function Gallery() {
  const titleRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  })

  const titleOpacity = useTransform(titleScrollProgress, [0, 0.2, 0.4, 0.6], [0, 1, 1, 0])

  const titleY = useTransform(titleScrollProgress, [0, 0.2, 0.4, 0.6], [100, 0, 0, -100])

  return (
    <div className="min-h-screen bg-orange-100 dark:bg-neutral-900">
      {/* Espace pour permettre le scroll */}
      <div className="w-full h-[6vh]" />

      <div ref={titleRef} className="w-full h-[20vh] flex items-center justify-center">
        <motion.h2
          className="text-4xl md:text-6xl lg:text-8xl font-bold text-center"
          style={{
            opacity: titleOpacity,
            y: titleY,
          }}
        >
          Mes Projets Vidéos
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:my-10 pb-12">
        <BentoGrid videos={demoVideos} />
      </div>
    </div>
  )
}
