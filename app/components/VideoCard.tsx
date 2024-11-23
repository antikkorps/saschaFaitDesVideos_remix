import { motion } from "framer-motion"
import { useState } from "react"
import { Video } from "../types/types"
import { VideoModal } from "./VideoModal"

interface VideoCardProps extends Video {
  className?: string
}

export const VideoCard = ({ className = "", ...video }: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        onClick={() => setIsOpen(true)}
        className={`group relative text-left overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 cursor-pointer ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[45deg] translate-x-[-100%] group-hover:animate-[shine_1.5s_ease-in-out] group-hover:[animation-fill-mode:forwards] group-[:not(:hover)]:animate-[shine-reverse_1s_ease-in-out] group-[:not(:hover)]:[animation-fill-mode:forwards]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[45deg] translate-x-[-100%] group-hover:animate-[shine-delayed_1.5s_ease-in-out] group-hover:[animation-fill-mode:forwards] group-[:not(:hover)]:animate-[shine-reverse-delayed_1s_ease-in-out] group-[:not(:hover)]:[animation-fill-mode:forwards]" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-bold text-white text-shadow-lg line-clamp-2">
            {video.title}
          </h3>
          <div className="mt-2 text-sm text-white/80">
            {video.duration} • {video.views.toLocaleString()} vues
          </div>
        </div>
      </motion.div>

      {isOpen && <VideoModal video={video} onClose={() => setIsOpen(false)} />}
    </>
  )
}
