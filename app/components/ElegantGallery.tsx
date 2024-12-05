import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

interface Project {
  id: number
  title: string
  category: string
  image: string
  year: string
  description: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "L'essence de la nature",
    category: "Photo",
    image: "/photos/foret_01.webp",
    year: "2024",
    description:
      "Un voyage par les sensations à travers le mouvement perpétuel de la forêt",
  },
  {
    id: 2,
    title: "Fragments de lumière",
    category: "Photo",
    image: "/photos/italie_03.webp",
    year: "2024",
    description: "Lorsque la couleur et la lumière se rencontrent",
  },
  {
    id: 3,
    title: "Mer de solitude",
    category: "Photo",
    image: "/photos/mer_00.webp",
    year: "2023",
    description: "La mer se retire, laissant place à l'immensité",
  },
  {
    id: 4,
    title: "Métamorphose",
    category: "Photo",
    image: "/photos/urbex_machineAEcrire.webp",
    year: "2023",
    description: "Une fusion entre modernité et passé",
  },
  {
    id: 5,
    title: "Résonnance",
    category: "Photo",
    image: "/photos/le_joueur_de_guitare.webp",
    year: "2023",
    description: "La transformation subtile de la solitude en musique",
  },
  {
    id: 6,
    title: "Reflets",
    category: "Photo",
    image: "/photos/italie_04.webp",
    year: "2023",
    description: "Silence et reflets, une harmonie parfaite où haut et bas se mêlent",
  },
]

const RefinedGallery = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState<number | null>(null)

  return (
    <div className="w-full h-[calc(100vh)] bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="relative w-full h-full md:flex">
        {/* Section Image (gauche sur desktop) */}
        <AnimatePresence mode="wait">
          {selectedId && (
            <motion.div
              className="hidden md:block relative w-1/2 h-full bg-white dark:bg-neutral-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div className="absolute inset-0 z-10">
                <motion.img
                  src={projects.find((p) => p.id === selectedId)?.image}
                  alt={projects.find((p) => p.id === selectedId)?.title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </motion.div>
              <motion.div
                className="absolute inset-0 z-20 bg-black/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Titres (droite sur desktop) */}
        <div className="relative w-full md:w-1/2 h-full md:ml-auto bg-white dark:bg-neutral-950">
          <div className="absolute inset-0 overflow-y-auto">
            <div className="px-8 md:px-16 py-12 md:py-16 min-h-full">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="mb-24 last:mb-0"
                  onHoverStart={() => setIsHovered(project.id)}
                  onHoverEnd={() => setIsHovered(null)}
                  onClick={() =>
                    setSelectedId(selectedId === project.id ? null : project.id)
                  }
                >
                  {/* Mobile image preview */}
                  <motion.div
                    className="block md:hidden w-full aspect-[16/9] mb-6 overflow-hidden"
                    initial={false}
                    animate={{ height: selectedId === project.id ? "auto" : 0 }}
                  >
                    <motion.div className="relative w-full h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4 cursor-pointer">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm tracking-wider text-neutral-500 dark:text-neutral-400">
                        {project.category}
                      </span>
                      <span className="text-sm tracking-wider text-neutral-400 dark:text-neutral-500">
                        {project.year}
                      </span>
                    </div>

                    <motion.h2
                      className="text-3xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-white"
                      animate={{
                        opacity:
                          isHovered === project.id || selectedId === project.id ? 1 : 0.8,
                      }}
                    >
                      {project.title}
                    </motion.h2>

                    <motion.div
                      className="h-px bg-neutral-900 dark:bg-white origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX:
                          isHovered === project.id || selectedId === project.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <motion.p
                      className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg"
                      initial={false}
                      animate={{
                        height: selectedId === project.id ? "auto" : 0,
                        opacity: selectedId === project.id ? 1 : 0,
                        marginTop: selectedId === project.id ? "1rem" : "0",
                      }}
                    >
                      {project.description}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefinedGallery
