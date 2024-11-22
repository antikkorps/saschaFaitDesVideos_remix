import { VideoPackGrid, type ProjectData } from "./VideoPackGrid"

const projects: ProjectData[] = [
  {
    id: "1",
    title: "Projet Vidéo Cool",
    date: "Mars 2024",
    category: "Motion Design",
    description: "Une superbe vidéo avec des effets spéciaux...",
    youtubeUrl: "https://youtube.com/watch?v=...",
    thumbnailUrl: "/path/to/thumbnail.jpg",
    packColor: "bg-blue-500",
    stats: {
      views: 15000,
      likes: 1200,
      duration: "3:45",
      complexity: 4,
    },
  },
]

export default function SectionVideoCard() {
  return <VideoPackGrid projects={projects} />
}
