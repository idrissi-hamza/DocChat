import Image from 'next/image';
import MaxWrapper from './components/MaxWrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Step from './components/Step';
import ImageSection from './components/ImageSection';

export default function Home() {
  return (
    <>
      <MaxWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center ">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50 ">
          <p className="text-sm font-semibold text-gray-700">
            DocChat est désormais disponible pour le grand public !
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Discutez avec vos <span className="text-indigo-600"> documents </span>
          en quelques secondes.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          DocChat vous permet d&apos;avoir des conversations avec n&apos;importe
          quel document PDF. Il vous suffit de importer votre fichier et de
          commencer à poser des questions immédiatement.
        </p>
        <Link
          className={buttonVariants({ size: 'lg', className: 'mt-5' })}
          href="/dashboard"
          target="_blank"
        >
          Commencez dès aujourd&apos;hui!
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWrapper>
      {/* value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 translate-gpu transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.187rem]"
            />
          </div>
          <ImageSection
            src="/dashboard-preview.jpg"
            alt="product preview"
            width={1364}
            height={866}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 translate-gpu transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.187rem]"
            />
          </div>
        </div>
      </div>

      {/*Feature section */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold  text-4xl text-gray-900 sm:text-5xl">
              Commencez à chatter en quelques minutes.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Chatter avec vos fichiers n&apos;a jamais été aussi facile
              qu&apos;avec DocChat.
            </p>
          </div>
        </div>
        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex  md:space-x-12 md:space-y-0">
          <Step
            step=" Étape 1"
            title="Créez votre compte "
            description=" Commencez avec notre plan gratuit, ou choisissez "
            linkHref="/pricing"
            linkText="le plan Pro."
          />
          <Step
            step=" Étape 2"
            title="Importez votre fichier PDF. "
            description="  Nous allons traiter votre fichier pour le rendre prêt pour que
            vous puissiez discuter."
          />
          <Step
            step=" Étape 3"
            title="   Posez vos questions. "
            description="  C'est aussi simple que cela. Essayez DocChat dès
            aujourd'hui, cela prend vraiment moins d'une minute."
          />
        </ol>

        <ImageSection
          src="/file-upload-preview.jpg"
          alt="file-upload"
          width={1419}
          height={732}
        />
      </div>
    </>
  );
}
