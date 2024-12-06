import { Link } from "@remix-run/react"
import { motion } from "framer-motion"
import { Camera, PenTool, Scissors, Video } from "lucide-react"
import PropTypes from "prop-types"

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  delay: number
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col h-full p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-900/50">
          <Icon className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
        </div>
        <h3 className="ml-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}

ServiceCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  delay: PropTypes.number.isRequired,
}

const ServicesPage = () => {
  const services = [
    {
      icon: Camera,
      title: "Photographie",
      description:
        "Shootings professionnels, événementiel, portraits, mariages. Équipement haute qualité pour des résultats exceptionnels.",
      delay: 0.1,
    },
    {
      icon: Video,
      title: "Vidéographie",
      description:
        "Captation vidéo 4K, films d'entreprise, clips musicaux, événements. Narration visuelle impactante.",
      delay: 0.2,
    },
    {
      icon: Scissors,
      title: "Montage Vidéo",
      description:
        "Montage professionnel, color grading, effets spéciaux, sound design pour des vidéos qui captent l'attention.",
      delay: 0.3,
    },
    {
      icon: PenTool,
      title: "Retouche Photo",
      description:
        "Retouche professionnelle, correction colorimétrique, retouche beauté, photomontage créatif.",
      delay: 0.4,
    },
  ]

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 dark:bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Mes Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 md:text-3xl"
          >
            De la capture à la retouche, je vous accompagne dans tous vos projets visuels
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={service.delay}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600 text-white rounded-full font-medium transition-colors"
          >
            Démarrer un projet
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ServicesPage
