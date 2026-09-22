import { Link } from "@tanstack/react-router";
import { SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="size-8 animate-pulse rounded-full bg-foreground/10" />;
  }
  if (user) {
    return (
      <div className="max-w-[11rem] [&_span.text-sm.font-medium]:hidden">
        <UserButton />
      </div>
    );
  }
  return (
    <SignedOut>
      <Link to="/login" className="h-11 text-sm font-medium text-ok">
        Sign in
      </Link>
    </SignedOut>
  );
}
