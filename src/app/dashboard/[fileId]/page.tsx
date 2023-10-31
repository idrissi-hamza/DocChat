import getCurrentUser from "@/app/actions/getCurrentUser"
import ChatWrapper from "@/components/ChatWrapper";
import EmptyState from "@/components/EmptyState";
import PdfRenderer from "@/components/PdfRenderer";

import db from "@/lib/prisma";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: { fileId: string } }) => {
  const { fileId } = params
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <EmptyState
        title="Non autorisé"
        subtitle="Veuillez vous connecter pour accéder à cette page !"
      />
    );
  }

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId: currentUser.id
    }
  }
  )

  if (!file) notFound()

  return (
    <div className='flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]'>
      <div className='mx-auto w-full max-w-8xl grow lg:flex xl:px-2'>

        <div className='flex-1 xl:flex'>
          <div className='px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6'>
            <PdfRenderer url={file.url} />
          </div>
        </div>

        <div className='shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0'>
          <ChatWrapper />
        </div>
      </div>
    </div>
  )
}

export default page