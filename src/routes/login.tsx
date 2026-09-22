import { createFileRoute, Navigate } from "@tanstack/react-router";
import { LoginPanel } from "@/components/login-panel";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-secondary">
        <div className="h-12 w-48 animate-pulse rounded-full bg-foreground/10" />
      </main>
    );
  }
  if (user) return <Navigate to="/" />;
  return (
    <main className="flex min-h-dvh justify-center bg-secondary">
      <LoginPanel />
    </main>
  );
}
