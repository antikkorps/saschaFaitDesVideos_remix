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
    title: "KPop Girl - Choréo",
    thumbnailUrl: "/photos/reflets.webp",
    description: "KPop Girl - Selena Gomez - Fetish ft. Gucci Mane - Choréo",
    date: "Novembre 2023",
    duration: "1:34",
    youtubeUrl: "https://www.youtube.com/watch?v=dXftLJTGvGU",
    views: 1000,
  },
  {
    id: "6",
    title: "Un mariage au coeur du Mans",
    thumbnailUrl: "/photos/foret_00.webp",
    description: "Un mariage au coeur du Mans",
    date: "Octobre 2023",
    duration: "7:34",
    youtubeUrl: "https://www.youtube.com/watch?v=0f1CSGEPqLk",
    views: 800,
  },
  {
    id: "7",
    title: "Streetjazz - Ckey - Love Nwantiti par Delphine Letort",
    thumbnailUrl: "/thumbnails/delphineletort.webp",
    description: "Streetjazz - Ckey - Love Nwantiti",
    date: "Octobre 2023",
    duration: "2:31",
    youtubeUrl: "https://www.youtube.com/watch?v=i4WN_ZW1liY",
    views: 800,
  },
  {
    id: "8",
    title: "Ils s'aiment. Ils se sont mariés",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1594760234504-d9e16892801c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Streetjazz - Ckey - Love Nwantiti - crédit image : Unsplash",
    date: "Octobre 2023",
    duration: "2:31",
    youtubeUrl: "https://www.youtube.com/watch?v=CAGn6DqtrUA",
    views: 800,
  },
  {
    id: "9",
    title: "Les Balades de Forky - Le Château de l'Anglais Fou",
    thumbnailUrl: "/photos/Hall_Urbex.webp",
    description:
      "Les Balades de Forky - Saison 2, Episode 5 : Le Château de l'Anglais Fou",
    date: "Octobre 2022",
    duration: "3:46",
    youtubeUrl: "https://www.youtube.com/watch?v=2UFtXRpxZZ4",
    views: 800,
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
