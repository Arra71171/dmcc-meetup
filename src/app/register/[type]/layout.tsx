import { RegistrationType } from '@/components/forms/specific-registration-form';

const validTypes: RegistrationType[] = ["student", "professional", "family", "others"];

// This function is required for Next.js static export with dynamic routes
// It tells Next.js which paths to pre-render at build time
export function generateStaticParams() {
  return validTypes.map(type => ({
    type: type,
  }));
}

export default function RegistrationTypeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
