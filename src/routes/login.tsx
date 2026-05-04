import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Leaf, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Farmassist AI" },
      { name: "description", content: "Sign in to access your crop history and saved treatments." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: name,
            }
          }
        });
        if (error) throw error;
        setMessage({ type: "success", text: "Check your email for the confirmation link!" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/profile" }); // Redirect to profile after login
      }
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        
        {/* Header */}
        <div className="bg-primary/5 px-8 pb-6 pt-10 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <Leaf className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-2xl font-bold">
            {isSignUp ? "Create an account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignUp ? "Join Farmassist to save your crop scans." : "Enter your details to sign in to your account."}
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          {message.text && (
            <div className={`mb-6 rounded-xl p-4 text-sm font-medium ${
              message.type === "success" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="farmer@example.com"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-foreground">
                Password
                {!isSignUp && <a href="#" className="text-xs font-semibold text-primary hover:underline">Forgot?</a>}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] disabled:opacity-70"
            >
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
              ) : (
                <>{isSignUp ? "Sign Up" : "Sign In"} <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => { setIsSignUp(!isSignUp); setMessage({ type: "", text: "" }); }}
              className="font-semibold text-primary hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
