import { AnimatePresence, motion } from "framer-motion"
import { Youtube } from "lucide-react"
import { useState } from "react"

interface VideoCardProps {
  id: string
  title: string
  thumbnailUrl: string
  description: string
  date: string
  duration: string
  youtubeUrl: string
  views: number
  className?: string
}

export const VideoCard = ({ className = "", ...props }: VideoCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        layoutId={`card-${props.id}`}
        onClick={() => setIsOpen(true)}
        className={`group relative text-left overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 cursor-pointer ${className}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Double effet de reflet */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[45deg] translate-x-[-100%] group-hover:animate-[shine_1.5s_ease-in-out] group-hover:[animation-fill-mode:forwards] group-[:not(:hover)]:animate-[shine-reverse_1s_ease-in-out] group-[:not(:hover)]:[animation-fill-mode:forwards]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[45deg] translate-x-[-100%] group-hover:animate-[shine-delayed_1.5s_ease-in-out] group-hover:[animation-fill-mode:forwards] group-[:not(:hover)]:animate-[shine-reverse-delayed_1s_ease-in-out] group-[:not(:hover)]:[animation-fill-mode:forwards]" />
        </div>

        {/* Thumbnail et overlay */}
        <motion.div layoutId={`image-container-${props.id}`} className="absolute inset-0">
          <motion.img
            layoutId={`image-${props.id}`}
            src={props.thumbnailUrl}
            alt={props.title}
            className="w-full h-full object-cover"
          />
          <motion.div
            layoutId={`overlay-${props.id}`}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
          />
        </motion.div>

        {/* Contenu de la carte */}
        <motion.div
          layoutId={`content-${props.id}`}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <motion.h3
            layoutId={`title-${props.id}`}
            className="font-bold text-white text-shadow-lg line-clamp-2"
          >
            {props.title}
          </motion.h3>
          <motion.div
            layoutId={`meta-${props.id}`}
            className="mt-2 text-sm text-white/80"
          >
            {props.duration} • {props.views.toLocaleString()} vues
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay avec flou */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <motion.div
                layoutId={`card-${props.id}`}
                className="w-full max-w-3xl bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl overflow-hidden"
              >
                {/* Section image */}
                <motion.div
                  layoutId={`image-container-${props.id}`}
                  className="aspect-video relative"
                >
                  <motion.img
                    layoutId={`image-${props.id}`}
                    src={props.thumbnailUrl}
                    alt={props.title}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    layoutId={`overlay-${props.id}`}
                    className="absolute inset-0 bg-black/30"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <a
                      href={props.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-white/10 p-4 rounded-full backdrop-blur-sm group-hover:bg-white/20 transition-colors"
                      >
                        <Youtube className="w-12 h-12 text-white" />
                      </motion.div>
                    </a>
                  </motion.div>

                  {/* Bouton fermer */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsOpen(false)
                    }}
                    className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors z-50"
                    aria-label="Fermer"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </motion.button>
                </motion.div>

                {/* Section contenu avec slide */}
                <div className="relative group">
                  <motion.div
                    layoutId={`content-${props.id}`}
                    className="p-6 pb-16 relative z-10"
                  >
                    <motion.h2
                      layoutId={`title-${props.id}`}
                      className="text-2xl font-bold text-white"
                    >
                      {props.title}
                    </motion.h2>
                    <motion.div
                      layoutId={`meta-${props.id}`}
                      className="mt-1 text-sm text-white/80"
                    >
                      {props.duration} • {props.views.toLocaleString()} vues
                    </motion.div>
                    <div className="flex gap-2 text-sm text-white/80 mt-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full">
                        {props.date}
                      </span>
                    </div>
                  </motion.div>

                  {/* Section avec le contenu qui slide */}
                  <div className="absolute bottom-0 left-0 right-0 translate-y-[calc(100%-2rem)] group-hover:translate-y-0 transition-transform duration-300 ease-out will-change-transform z-20">
                    <div className="bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-md">
                      <div className="h-8 flex items-center justify-center">
                        <div className="w-12 h-1 bg-white/40 rounded-full" />
                      </div>
                      <div className="px-6 pb-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white">
                            Description
                          </h3>
                          <p className="text-white/90 leading-relaxed">
                            {props.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/20">
                          <div>
                            <dt className="text-sm text-white/60 mb-1">
                              Date de publication
                            </dt>
                            <dd className="text-sm text-white font-medium">
                              {props.date}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-white/60 mb-1">Durée</dt>
                            <dd className="text-sm text-white font-medium">
                              {props.duration}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm text-white/60 mb-1">Vues totales</dt>
                            <dd className="text-sm text-white font-medium">
                              {props.views.toLocaleString()}
                            </dd>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default VideoCard
