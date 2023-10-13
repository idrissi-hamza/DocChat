import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '@/components/EmptyState';
import Dashboard from '@/components/DashboardView';
import getUserFiles from '../actions/getUserFiles';

const page = async () => {
  const currentUser = await getCurrentUser();

  const files = await getUserFiles(currentUser?.id as string);

  if (!currentUser) {
    return (
      <EmptyState
        title="Non autorisé"
        subtitle="Veuillez vous connecter pour accéder à cette page !"
      />
    );
  }

  return (
    <Dashboard
      currentUser={currentUser}
      files={files}
    />
  );
};

export default page;
