import { getServerSession } from "next-auth/next";

import { Dashboard } from "@/components/dashboard";
import { LoginForm } from "@/components/login-form";

import authOptions from "../api/auth/auth-options";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return session ? <Dashboard>{children}</Dashboard> : <LoginForm />;
}
