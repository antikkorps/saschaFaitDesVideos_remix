import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react"
import { motion, Variants } from "framer-motion"
import { X, Youtube } from "lucide-react"
import { Fragment, useState } from "react"

export interface ProjectStats {
  views: number
  likes: number
  duration: string
  complexity: number
}

export interface ProjectData {
  id: string
  title: string
  date: string
  category: string
  description: string
  youtubeUrl: string
  thumbnailUrl: string
  stats: ProjectStats
  packColor: string
}

interface VideoPackProps {
  project: ProjectData
}

const hoverVariants: Variants = {
  idle: {
    backgroundPosition: "0% 0%",
    scale: 1,
  },
  hover: {
    backgroundPosition: ["0% 0%", "100% 100%"],
    scale: 1.05,
    transition: {
      backgroundPosition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "mirror",
      },
      scale: {
        duration: 0.2,
      },
    },
  },
}

export const VideoPack = ({ project }: VideoPackProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <>
      <motion.div
        className="relative cursor-pointer w-full max-w-sm mx-auto"
        variants={hoverVariants}
        animate={isHovered ? "hover" : "idle"}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
      >
        {/* Pack fermé */}
        <div
          className={`relative overflow-hidden rounded-xl shadow-lg aspect-[3/4] ${project.packColor} dark:brightness-90`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-75 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] mix-blend-overlay" />

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="text-lg font-bold truncate">{project.title}</h3>
            <p className="text-sm opacity-75">{project.category}</p>
          </div>
        </div>
      </motion.div>

      {/* HeadlessUI Dialog */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          {/* Fond sombre avec animation */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75 transition-opacity" />
          </TransitionChild>

          {/* Contenu du dialog centré */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-0 text-left shadow-xl transition-all">
                  {/* Bouton fermer */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-1 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Partie gauche - Vidéo */}
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-900">
                      <a
                        href={project.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center group"
                      >
                        <img
                          src={project.thumbnailUrl}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-colors" />
                        <Youtube className="relative w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                      </a>
                    </div>

                    {/* Partie droite - Infos */}
                    <div className="p-6">
                      <DialogTitle
                        as="h2"
                        className="text-2xl font-bold mb-2 dark:text-white"
                      >
                        {project.title}
                      </DialogTitle>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {project.date}
                          </p>
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {project.category}
                          </p>
                        </div>

                        <Description className="text-gray-600 dark:text-gray-300">
                          {project.description}
                        </Description>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Vues
                            </p>
                            <p className="text-lg font-bold dark:text-white">
                              {project.stats.views.toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Likes
                            </p>
                            <p className="text-lg font-bold dark:text-white">
                              {project.stats.likes.toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Durée
                            </p>
                            <p className="text-lg font-bold dark:text-white">
                              {project.stats.duration}
                            </p>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Complexité
                            </p>
                            <div className="flex gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < project.stats.complexity
                                      ? "bg-blue-500 dark:bg-blue-400"
                                      : "bg-gray-200 dark:bg-gray-700"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
