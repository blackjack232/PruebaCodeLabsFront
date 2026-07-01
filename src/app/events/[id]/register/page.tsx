import { RegistrationForm } from "@/features/registrations/components/RegistrationForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventRegistrationPage({ params }: Props) {
  const { id } = await params;

  return <RegistrationForm eventId={id} />;
}
