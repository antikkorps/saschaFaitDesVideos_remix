import { BentoGrid, Video } from "./BentoGrid"
const demoVideos: Video[] = [
  {
    id: "1",
    title: "Animation Showreel 2024",
    thumbnailUrl: "/thumbnail1.jpg",
    description: "Une superbe compilation de mes meilleures animations...",
    date: "Mars 2024",
    duration: "3:45",
    youtubeUrl: "https://youtube.com/watch?v=...",
    views: 1500,
    highlight: true,
  },
  {
    id: "2",
    title: "Motion Design - Project X",
    thumbnailUrl: "/thumbnail2.jpg",
    description: "Un projet de motion design réalisé pour...",
    date: "Février 2024",
    duration: "2:30",
    youtubeUrl: "https://youtube.com/watch?v=...",
    views: 800,
  },
  {
    id: "3",
    title: "3D Animation Breakdown",
    thumbnailUrl: "/thumbnail3.jpg",
    description: "Découvrez les coulisses de cette animation 3D...",
    date: "Janvier 2024",
    duration: "4:15",
    youtubeUrl: "https://youtube.com/watch?v=...",
    views: 2200,
  },
  {
    id: "4",
    title: "Character Animation Demo",
    thumbnailUrl: "/thumbnail4.jpg",
    description: "Animation de personnage pour le projet...",
    date: "Décembre 2023",
    duration: "1:45",
    youtubeUrl: "https://youtube.com/watch?v=...",
    views: 1200,
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
