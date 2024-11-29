import { motion, useScroll, useTransform } from "framer-motion"
import { TextRevealEffect } from "./TextReveal"

const Hero = () => {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const y = useTransform(scrollY, [0, 300], [0, 50])
  const gap = useTransform(scrollY, [0, 300], [16, 80])
  const translate = useTransform(scrollY, [0, 300], [0, 150])

  const images = [
    {
      src: "/photos/homme_journal.webp",
      alt: "Photo 1",
      className: "col-span-1 row-span-2",
      translateX: translate,
      floatOffset: 0,
    },
    {
      src: "/photos/italie_02.webp",
      alt: "Photo 2",
      className: "col-span-1",
      translateX: translate,
      floatOffset: 2,
    },
    {
      src: "/photos/urbex_reflets.webp",
      alt: "Photo 3",
      className: "col-span-1",
      translateX: translate,
      floatOffset: 1,
    },
  ]

  return (
    <div className="min-h-screen w-full dark:bg-neutral-900 relative overflow-hidden">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mt-20 md:mt-0 lg:-mt-12 w-full">
          <div className="w-full lg:w-2/5 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              <TextRevealEffect
                text="Sascha fait des vidéos"
                delay={0.15}
                duration={0.4}
                className="text-4xl md:text-6xl font-bold pt-4"
              />
            </h1>
            <p className="text-lg text-gray-400">
              Capturer des moments, raconter des histoires
            </p>
          </div>

          <motion.div
            style={{ opacity }}
            className="w-full lg:w-3/5 relative h-[400px] md:h-[500px] lg:h-[700px] lg:-mt-12"
          >
            <motion.div className="grid grid-cols-2 absolute inset-0" style={{ gap }}>
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`${image.className} relative overflow-hidden rounded-lg`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: [0, -8, 0],
                  }}
                  transition={{
                    delay: image.floatOffset,
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: image.floatOffset,
                    },
                  }}
                  style={{
                    y,
                    x: image.translateX,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Hero
