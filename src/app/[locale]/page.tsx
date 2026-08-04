import type { Metadata } from 'next';
import ClientPage from '@/components/ClientPage';

export const metadata: Metadata = {
  title: 'Tales Lima de Paula — Cybersecurity Portfolio',
};

export default function HomePage() {
  return <ClientPage />;
}
