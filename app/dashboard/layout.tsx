import { verifySession } from "@/actions/session";
import { Dashboard } from "@/components/dashboard";
import { LoginForm } from "@/components/login-form";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    await verifySession();
    return <Dashboard>{children}</Dashboard>;
  } catch {
    return <LoginForm />;
  }
}
