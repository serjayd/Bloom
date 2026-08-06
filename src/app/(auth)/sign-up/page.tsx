import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SignUpForm from "@/features/auth/components/SignUpForm";

export default function SignUpPage() {
  return (
    <section className="relative mx-auto w-full max-w-md">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 rounded-full bg-violet-600/12 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/2 h-80 w-80 rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Create your workspace
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Let Nexus manage your project workflows
        </p>
      </div>

      {/* Form */}
      <SignUpForm />

      {/* Footer */}
      <div className="mt-6 space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-secondary-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </div>
    </section>
  );
}
