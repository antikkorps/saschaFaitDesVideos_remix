import { VideoCard } from "./VideoCard"

export interface Video {
  id: string
  title: string
  thumbnailUrl: string
  description: string
  date: string
  duration: string
  youtubeUrl: string
  views: number
  size?: "small" | "medium" | "large"
  highlight?: boolean
}

interface BentoGridProps {
  videos: Video[]
}

export const BentoGrid = ({ videos }: BentoGridProps) => {
  if (!videos?.length) return null

  return (
    <div className="p-4 grid grid-cols-12 auto-rows-[180px] gap-4 max-w-7xl mx-auto">
      {/* Grande carte en vedette */}
      <div className="col-span-12 md:col-span-8 row-span-2">
        <VideoCard {...videos[0]} className="w-full h-full" />
      </div>

      {/* Carte moyenne verticale */}
      <div className="col-span-12 md:col-span-4 row-span-2">
        <VideoCard {...videos[1]} className="w-full h-full" />
      </div>

      {/* 2 cartes moyennes horizontales */}
      <div className="col-span-12 md:col-span-6 row-span-1">
        <VideoCard {...videos[2]} className="w-full h-full" />
      </div>
      <div className="col-span-12 md:col-span-6 row-span-1">
        <VideoCard {...videos[3]} className="w-full h-full" />
      </div>

      {/* Petite carte */}
      <div className="col-span-12 md:col-span-4 row-span-1">
        <VideoCard {...videos[4]} className="w-full h-full" />
      </div>

      {/* Carte moyenne */}
      <div className="col-span-12 md:col-span-8 row-span-1">
        <VideoCard {...videos[5]} className="w-full h-full" />
      </div>

      {/* Carte moyenne verticale */}
      <div className="col-span-12 md:col-span-4 row-span-2">
        <VideoCard {...videos[6]} className="w-full h-full" />
      </div>

      {/* Carte moyenne verticale */}
      <div className="col-span-12 md:col-span-4 row-span-2">
        <VideoCard {...videos[7]} className="w-full h-full" />
      </div>

      {/* Carte moyenne verticale */}
      <div className="col-span-12 md:col-span-4 row-span-2">
        <VideoCard {...videos[8]} className="w-full h-full" />
      </div>
    </div>
  )
}
