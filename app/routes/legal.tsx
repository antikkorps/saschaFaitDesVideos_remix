export default function MentionsLegales() {
  return (
    <div className="min-h-screen px-4 py-16 md:py-24 md:px-8 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-6 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800/50">
            <span className="text-neutral-600 dark:text-neutral-400">
              Informations légales
            </span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
            Mentions Légales
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            Toutes les informations légales concernant notre activité
          </p>
        </div>

        {/* Contenu */}
        <div className="space-y-6">
          <div className="rounded-2xl shadow-lg bg-white dark:bg-neutral-900 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Informations sur l&apos;éditeur
              </h2>
              <div className="text-neutral-600 dark:text-neutral-400 space-y-2">
                <p>Nom de la société : Sascha fait des vidéos</p>
                <p>Forme juridique : micro-entreprise</p>
                <p>Adresse du siège social : [Adresse]</p>
                <p>Numéro de téléphone : +33 6 13 80 65 54</p>
                <p>Email : alexandre.pierron@gmail.com</p>
                <p>Capital social : [Montant] €</p>
                <p>Numéro RCS : [Numéro]</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg bg-white dark:bg-neutral-900 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Directeur de la publication
              </h2>
              <div className="text-neutral-600 dark:text-neutral-400">
                <p>Prénom et nom : Alexandre Pierron</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg bg-white dark:bg-neutral-900 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Hébergeur du site
              </h2>
              <div className="text-neutral-600 dark:text-neutral-400 space-y-2">
                <p>Nom de l&apos;hébergeur : Vercel</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg bg-white dark:bg-neutral-900 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Propriété intellectuelle
              </h2>
              <div className="text-neutral-600 dark:text-neutral-400">
                <p className="leading-relaxed">
                  L&apos;ensemble de ce site relève de la législation française et
                  internationale sur le droit d&apos;auteur et la propriété
                  intellectuelle. Tous les droits de reproduction sont réservés, y compris
                  pour les documents téléchargeables et les représentations
                  iconographiques et photographiques.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl shadow-lg bg-white dark:bg-neutral-900 overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Protection des données personnelles
              </h2>
              <div className="text-neutral-600 dark:text-neutral-400">
                <p className="leading-relaxed">
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978
                  modifiée et au Règlement Général sur la Protection des Données (RGPD),
                  vous disposez d&apos;un droit d&apos;accès, de rectification et de
                  suppression des données vous concernant. Vous pouvez exercer ce droit en
                  nous contactant à l&apos;adresse email suivante :
                  [votre-email@domaine.com]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
