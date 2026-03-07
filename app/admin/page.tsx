import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Simple check or redirect to login
  redirect('/admin/login');
  
  return null;
}
