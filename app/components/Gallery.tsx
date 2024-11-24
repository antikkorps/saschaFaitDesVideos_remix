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
  return (
    <div className="min-h-screen bg-orange-100 dark:bg-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Mes Projets
        </h1>
        <BentoGrid videos={demoVideos} />
      </div>
    </div>
  )
}
