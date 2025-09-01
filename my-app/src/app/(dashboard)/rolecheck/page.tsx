'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function getRoleFromToken(token: string | null): string | null {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check for expiration
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      return null; // Token expired
    }
    return payload.role || null;
  } catch {
    return null;
  }
}

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = getRoleFromToken(token);

    switch (role) {
      case 'admin':
        router.replace('/admin');
        break;
      case 'staff':
        router.replace('/staff');
        break;
      case 'cashier':
        router.replace('cashier');
        break;
      case 'chef':
        router.replace('chef');
        break;
      default:
        router.replace('/auth/login');
    }
  }, [router]);

  return <div>Redirecting...</div>;
}