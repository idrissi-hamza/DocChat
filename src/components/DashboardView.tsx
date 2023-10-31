'use client';
import React, { useState } from 'react';
import Heading from './Heading';
import UploadButton from './UploadButton';
import Link from 'next/link';
import { Loader2, Plus, Trash } from 'lucide-react';
import { format } from 'date-fns';

import Skeleton from 'react-loading-skeleton'
import { trpc } from '@/app/_trpc/client';




const DashboardView = () => {

  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

  const utils = trpc.useContext()
  const { data: files, isLoading } = trpc.getUserFiles.useQuery()

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate()
    },
    onMutate({ id }) {
      setDeletingFileId(id)
    },
    onSettled() {
      setDeletingFileId(null)
    }
  })


  return (
    <main className="mx-auto max-w-7xl md:p-10 px-2 h-full bg-red-30 ">
      <div className="mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray pb-5 sm:flex-row sm:items-center sm:gap-0 ">
        <Heading title="My Files" />
        <UploadButton />
      </div>

      {isLoading ? <Skeleton height={100} className='my-2' count={3} />
        : !files || files.length === 0 ? <div className=" flex flex-col items-center justify-center gap-10 mt-10">

          <Heading
            center
            title="Vous ne possédez aucun document PDF !"
            subtitle="Il est temps d'importer votre premier PDF."
          />
          <UploadButton />
        </div> :
          <ul className="mt-8 grid grid-cols-1 gap-6 divide-y devide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
            {files.map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2"
                >
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="px-6 mt-4 flex items-center justify-between py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {format(new Date(file.createdAt), 'dd MMM yyyy')}
                  </div>

                  <button
                    onClick={() => {
                      deleteFile({ id: file.id });
                    }}
                    className="cursor-pointer w-8 bg-red-50 flex justify-center items-center aspect-square shadow-sm  hover:shadow-md hover:bg-red-100 rounded-md transition disabled:bg-slate-400"
                    disabled={deletingFileId === file.id}
                  >
                    {deletingFileId === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4 text-red-500 " />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>}

    </main >
  );
};

export default DashboardView;
