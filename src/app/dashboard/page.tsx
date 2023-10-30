import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '@/components/EmptyState';
import Dashboard from '@/components/DashboardView';


const page = async () => {
  const currentUser = await getCurrentUser();

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
    />
  );
};

export default page;
