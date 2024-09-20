"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form";
import { cn } from "#/lib/utils";
import { Button } from "#/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  newPasswordSchema,
  NewPasswordSchema,
} from "../schema/new-password.schema";
import PasswordInput from "#/components/password-input";
import { useNewPassword } from "../hooks/use-new-password";

type Props = {
  id?: string;
  className?: string;
  token: string | null;
};
export default function NewPasswordForm({ className, token, id }: Props) {
  const form = useForm({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: newPasswordMutateAsync } = useNewPassword();

  const onSubmit = useCallback(
    async (data: NewPasswordSchema) => {
      await newPasswordMutateAsync({
        password: data.password,
        confirmPassword: data.confirmPassword,
        token: token || "",
      });
    },
    [newPasswordMutateAsync, token]
  );

  return (
    <Form {...form}>
      <form
        id={id}
        className={cn("space-y-6", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-900">
                New owner password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-900">
                Confirm new owner password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full font-semibold"
          type="submit"
        >
          Save
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
        </Button>
      </form>
    </Form>
  );
}
