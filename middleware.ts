import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser || !currentUser.id) {
    throw new Error('Unauthorized');
  }
}

export const config = {
  matcher: ['/dashboard'],
};
