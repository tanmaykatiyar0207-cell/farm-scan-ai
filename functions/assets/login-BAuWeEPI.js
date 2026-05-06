import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { s as supabase } from "./router-B23tt4C4.js";
import { Leaf, User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import "react-i18next";
import "@supabase/supabase-js";
import "i18next";
function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: ""
  });
  const navigate = useNavigate();
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({
      type: "",
      text: ""
    });
    try {
      if (isSignUp) {
        const {
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name
            }
          }
        });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Check your email for the confirmation link!"
        });
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        navigate({
          to: "/profile"
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong."
      });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-[85vh] items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-soft", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-primary/5 px-8 pb-6 pt-10 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary", children: /* @__PURE__ */ jsx(Leaf, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsx("h1", { className: "mt-5 font-display text-2xl font-bold", children: isSignUp ? "Create an account" : "Welcome back" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: isSignUp ? "Join Farmassist to save your crop scans." : "Enter your details to sign in to your account." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-8", children: [
      message.text && /* @__PURE__ */ jsx("div", { className: `mb-6 rounded-xl p-4 text-sm font-medium ${message.type === "success" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`, children: message.text }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleAuth, className: "space-y-5", children: [
        isSignUp && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1.5 block text-sm font-medium text-foreground", children: "Full Name" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(User, { className: "absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsx("input", { type: "text", required: true, value: name, onChange: (e) => setName(e.target.value), className: "w-full rounded-xl border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary", placeholder: "John Doe" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "mb-1.5 block text-sm font-medium text-foreground", children: "Email" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Mail, { className: "absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "w-full rounded-xl border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary", placeholder: "farmer@example.com" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("label", { className: "mb-1.5 flex items-center justify-between text-sm font-medium text-foreground", children: [
            "Password",
            !isSignUp && /* @__PURE__ */ jsx("a", { href: "#", className: "text-xs font-semibold text-primary hover:underline", children: "Forgot?" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Lock, { className: "absolute left-3.5 top-3 h-5 w-5 text-muted-foreground" }),
            /* @__PURE__ */ jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full rounded-xl border border-border bg-background py-2.5 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary", placeholder: "••••••••" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading, className: "mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:scale-[1.01] disabled:opacity-70", children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          " Processing..."
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          isSignUp ? "Sign Up" : "Sign In",
          " ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 text-center text-sm text-muted-foreground", children: [
        isSignUp ? "Already have an account?" : "Don't have an account?",
        " ",
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setIsSignUp(!isSignUp);
          setMessage({
            type: "",
            text: ""
          });
        }, className: "font-semibold text-primary hover:underline", children: isSignUp ? "Sign In" : "Sign Up" })
      ] })
    ] })
  ] }) });
}
export {
  LoginPage as component
};
