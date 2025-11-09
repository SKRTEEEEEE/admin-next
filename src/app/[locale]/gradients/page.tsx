import { redirect } from "next/navigation";

interface GradientRedirectProps {
  params: { locale: string };
}

export default function GradientRedirect({ params }: GradientRedirectProps) {
  redirect(`/${params.locale}`);
}
