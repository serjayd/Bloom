"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signUp } from "@/lib/auth-client";
import { SignUpFormValues, signUpSchema } from "../schemas";
import { toast } from "sonner";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const result = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (result.error) {
      toast.error("Couldn't create account", {
        description: result.error.message,
      });

      return;
    }

    toast.success("Account Created");

    router.push("/");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-white/10 bg-card/70 p-6 shadow-2xl shadow-violet-950/20 backdrop-blur-xl"
    >
      <Field>
        <FieldLabel htmlFor="name">Full name</FieldLabel>

        <Input
          id="name"
          placeholder="John Doe"
          autoComplete="name"
          {...register("name")}
        />

        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>

        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
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
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
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
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
