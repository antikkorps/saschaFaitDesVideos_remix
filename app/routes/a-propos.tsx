"use client"
import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="min-h-screen dark:bg-neutral-900 pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12 sm:mb-20"
        >
          <motion.div
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              scale: { type: "spring", stiffness: 400, damping: 10 },
              rotate: { duration: 0.5, ease: "easeInOut" },
            }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 group cursor-pointer"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-75 transition-all duration-500"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative w-full h-full rounded-full overflow-hidden ring-4 ring-neutral-200 dark:ring-neutral-700">
              <img
                src="/images/photo1.webp"
                alt="Sascha Portrait"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
              />
            </div>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mt-8 mb-4">
            Sascha
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400">
            Vidéaste & Photographe
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6 text-sm sm:text-base text-neutral-800 dark:text-neutral-200"
          >
            <p>
              Passionné par l&apos;image depuis mon plus jeune âge, j&apos;ai transformé
              cette fascination en une véritable vocation. À travers mon objectif, je
              capture l&apos;essence des moments, des émotions et des histoires qui
              méritent d&apos;être racontées.
            </p>
            <p>
              Mon approche combine créativité et authenticité, cherchant toujours à
              révéler la beauté unique de chaque instant. Que ce soit dans mes projets
              documentaires, mes travaux urbains ou mes portraits, je m&apos;efforce de
              créer des images qui résonnent et inspirent.
            </p>
            <p>
              Basé en France, je voyage régulièrement pour de nouveaux projets, toujours à
              la recherche de perspectives originales et d&apos;histoires captivantes à
              partager à travers mes vidéos et photographies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              scale: { type: "spring", stiffness: 400, damping: 10 },
              rotate: { duration: 0.5, ease: "easeInOut" },
            }}
            className="aspect-[4/3] rounded-lg overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-75 transition-all duration-500"
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <motion.img
              src="/images/photo2.webp"
              alt="Sascha en action"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
