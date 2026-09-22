import { useState, type FormEvent } from "react";
import { useRouter } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { CivicMark } from "@/components/civic-mark";
import { Button } from "@/components/ui/button";

export function LoginPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<"in" | "up">("up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const reduceMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!authEnabled) return;
    setBusy(true);
    setError(null);
    try {
      if (mode === "up") {
        const result = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || email.trim(),
        });
        if (result.error) throw new Error(result.error.message || "Could not create that account.");
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (result.error) throw new Error(result.error.message || "Email or password did not match.");
      }
      await router.invalidate();
      await router.navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative min-h-dvh w-full">
      {reduceMotion ? (
        <img
          src="/media/login-poster.jpg"
          alt=""
          className="fixed inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          className="fixed inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/login-poster.jpg"
          aria-hidden
        >
          <source src="/media/login-bg.mp4" type="video/mp4" />
        </video>
      )}
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/25" />

      <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-md flex-col">
        <div className="flex min-h-[38vh] flex-1 flex-col justify-end px-6 pb-6 text-primary-foreground">
          <div className="flex items-center gap-2">
            <CivicMark className="size-8" />
            <span className="font-display text-lg tracking-tight">CivicAid</span>
          </div>
          <h1 className="mt-4 max-w-xs font-display text-4xl italic leading-tight tracking-tight">
            {mode === "up" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-foreground/80">
            {mode === "up"
              ? "A few questions after this, so we only show what you qualify for."
              : "Sign in to pick up your screening answers and applications."}
          </p>
        </div>

        <div className="relative mx-4 mb-5 overflow-hidden rounded-[28px] border border-white/40 bg-background/92 px-6 pb-7 pt-6 shadow-[0_24px_50px_rgba(28,26,22,0.22)] supports-[backdrop-filter]:border-white/50 supports-[backdrop-filter]:bg-white/20 supports-[backdrop-filter]:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_24px_50px_rgba(28,26,22,0.22)] supports-[backdrop-filter]:backdrop-blur-xl supports-[backdrop-filter]:backdrop-saturate-150">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/55 to-transparent"
          />
          <div className="relative">
          {authEnabled ? (
            <form onSubmit={submit} className="flex flex-col gap-3">
              {mode === "up" ? (
                <label className="block text-sm font-medium">
                  Full name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                    className="mt-1.5 flex h-12 w-full rounded-2xl border border-white/80 bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                  />
                </label>
              ) : null}
              <label className="block text-sm font-medium">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="mt-1.5 flex h-12 w-full rounded-2xl border border-white/80 bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                />
              </label>
              <label className="block text-sm font-medium">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                  minLength={8}
                  required
                  className="mt-1.5 flex h-12 w-full rounded-2xl border border-white/80 bg-white/75 px-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                />
              </label>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
              <Button type="submit" size="lg" disabled={busy}>
                {busy ? "Please wait…" : mode === "up" ? "Create account" : "Sign in"}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-muted-foreground">Sign-in is disabled.</p>
          )}

          {authEnabled ? (
            <>
              <div className="mt-4 grid grid-cols-2 gap-2">
                {GROK_PROVIDERS.map((p) => (
                  <Button
                    key={p.providerId}
                    type="button"
                    variant="outline"
                    className="border-white/70 bg-white/50 shadow-none hover:bg-white/70"
                    onClick={() => signIn(p.providerId, { callbackURL: "/" })}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
              <button
                type="button"
                className="mt-3 h-11 w-full text-sm font-medium text-ok"
                onClick={() => {
                  setError(null);
                  setMode(mode === "up" ? "in" : "up");
                }}
              >
                {mode === "up" ? "I already have an account" : "Create an account"}
              </button>
            </>
          ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
