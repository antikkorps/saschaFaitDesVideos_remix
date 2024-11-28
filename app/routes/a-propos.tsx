"use client"
import { motion } from "framer-motion"

export default function About() {
  return (
    <div className="min-h-screen dark:bg-neutral-900 py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mb-8 ring-4 ring-neutral-200 dark:ring-neutral-700">
            <img
              src="/images/photo1.webp"
              alt="Sascha Portrait"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
            Sascha Vansteenkiste
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Vidéaste & Photographe
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-neutral-800 dark:text-neutral-200"
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
            transition={{ duration: 0.6, delay: 0.4 }}
            className="aspect-[4/3] rounded-lg overflow-hidden"
          >
            <img
              src="/images/photo2.webp"
              alt="Sascha en action"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
