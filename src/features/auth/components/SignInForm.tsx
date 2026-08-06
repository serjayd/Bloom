"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignInFormValues, signInSchema } from "../schemas";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    const result = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      toast.error("Couldn't sign in", {
        description: result.error.message,
      });

      return;
    }

    toast.success("Signed in");

    router.push("/");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-white/10 bg-card/70 p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl"
    >
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Enter your password"
            className="pr-11"
            {...register("password")}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <Eye className="size-4" />
            ) : (
              <EyeOff className="size-4" />
            )}
          </Button>
        </div>

        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </Field>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
