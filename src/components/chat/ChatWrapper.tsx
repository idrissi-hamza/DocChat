'use client'
import React from 'react'
import ChatInput from './ChatInput'
import Messages from './Messages'
import { trpc } from '@/app/_trpc/client'
import { ChevronLeft, Loader2, XCircle, XCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

const ChatWrapper = ({ fileId }: { fileId: string }) => {
  const { data, isLoading } = trpc.getFileUploadStatus.useQuery({ fileId },
    {
      refetchInterval: (data) => data?.status === 'SUCCESS' || data?.status === 'FAILED' ? false : 500
    })


  if (isLoading) return (
    <div className='relative min-h-full bg-zing-50 flex divide-y divide-zing-200 flex-col justify-between gap-2' >
      <div className='flex-1 flex justify-center items-center flex-col mb-28'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <h3 className='font-semibold text-xl'>Loading...</h3>
          <p className='text-zinc-500 text-sm'>Nous préparons votre PDF.</p>
        </div>
      </div>

      <ChatInput isDisabled />
    </div>
  )

  if (data?.status === 'PROCESSING') return (
    <div className='relative min-h-full bg-zing-50 flex divide-y divide-zing-200 flex-col justify-between gap-2' >
      <div className='flex-1 flex justify-center items-center flex-col mb-28'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          <h3 className='font-semibold text-xl'>Traitement du PDF...</h3>
          <p className='text-zinc-500 text-sm'>Cela ne prendra pas longtemps.</p>
        </div>
      </div>
      <ChatInput isDisabled />
    </div>
  )


  if (data?.status === "FAILED") return (
    <div className='relative min-h-full bg-zing-50 flex divide-y divide-zing-200 flex-col justify-between gap-2' >
      <div className='flex-1 flex justify-center items-center flex-col mb-28'>
        <div className='flex flex-col items-center gap-2'>
          <XCircle className="h-8 w-8 text-red-500 " />
          <h3 className='font-semibold text-xl'>Trop de pages.</h3>
          <p className='text-zinc-500 text-sm'>Votre plan <strong>gratuit</strong> prend en charge seulement 5 pages.</p>
        </div>
      </div>
      <Link href='/dashboard' className={buttonVariants({
        variant: "secondary"
      })}>
        <ChevronLeft className='h-3 w-3 mr-1.5 mt-1' />Retour
      </Link>
    </div>
  )



  return (
    <div className='relative min-h-full bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2' >
      <div className='flex-1 justify-between flex flex-col mb-28'>
        <Messages />
      </div>

      <ChatInput
       />
    </div>
  )
}

export default ChatWrapper