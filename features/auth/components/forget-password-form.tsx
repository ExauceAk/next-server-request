"use client";

import { Button } from "#/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "#/components/ui/form";
import { Input } from "#/components/ui/input";
import { cn } from "#/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../hooks/use-forgot-password";
import { forgotPasswordSchema, ForgotPasswordSchema } from "../schema/forgot-password.schema";

type Props = {
  id?: string;
  className?: string;
};

export default function ForgetPasswordForm({ id, className }: Props) {

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const { mutateAsync: forgotPasswordMutateAsync } = useForgotPassword();

  const onSubmit = useCallback(
    async (data: ForgotPasswordSchema) => {
      await forgotPasswordMutateAsync(data);
    },
    [forgotPasswordMutateAsync]
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary-900">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="dental@office.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full  font-semibold "
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Loader2
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Reset password
        </Button>
      </form>
    </Form>
  );
}
