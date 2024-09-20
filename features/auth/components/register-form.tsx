"use client";

import { PhoneInput } from "#/components/phone-input";
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
import { Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import PasswordInput from "#/components/password-input";
import { Checkbox } from "#/components/ui/checkbox";
import HelpTooltip from "#/components/help-tooltip";
import { useForm } from "react-hook-form";
import PrivacyPolicyModals from "./privacy-policy-modals";
import { useRegister } from "../hooks/use-register";
import { registerSchema, RegisterSchema } from "../schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  id?: string;
  className?: string;
};
export default function RegisterForm({ id, className }: Props) {
  const [isAccepte, setIsAccepte] = useState(true);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      officeName: "",
      officeEmail: "",
      officePhoneNumber: "",
      ownerEmail: "",
      ownerPassword: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: registerMutateAsync } = useRegister();

  const onSubmit = useCallback(
    async (data: RegisterSchema) => {
      await registerMutateAsync(data);
    },
    [registerMutateAsync]
  );

  return (
    <Form {...form}>
      <form
        id={id}
        className={cn("my-2 space-y-2  md:space-y-8", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="my-2 grid grid-rows-1 gap-6 px-1 md:grid-cols-2">
          <p className="text-primary-500  md:col-span-2">
            Dental office information
          </p>

          <FormField
            control={form.control}
            name="officeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary-900">Office name</FormLabel>
                <FormControl>
                  <Input placeholder="name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="officeEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary-900">Office email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="info@dentaloffice.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="officePhoneNumber"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-primary-900">
                  Office phone number
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="my-2 grid grid-cols-1 gap-4 px-1 md:grid-cols-2">
          <p className="text-primary-500 md:col-span-2">
            Office owner information
          </p>
          <FormField
            control={form.control}
            name="ownerEmail"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2 text-primary-900">
                  Owner email{" "}
                  <HelpTooltip height={15} width={15}>
                    What is the office owner&apos;s email address? (If multiple
                    owners chose one)
                  </HelpTooltip>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="drsmith@dentaloffice.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ownerPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-primary-900">
                  Owner password
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*****" {...field} />
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
                  Confirm password
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="*****" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <div className="my-5 flex items-center space-x-2">
            <Checkbox onClick={() => setIsAccepte(!isAccepte)} id="terms1" />
            <p className="text-sm">
              I agree to the &nbsp;
              <PrivacyPolicyModals>
                <div className="text-secondary-500">Privacy Policy</div>
              </PrivacyPolicyModals>
              ,&nbsp;
              <PrivacyPolicyModals>
                <div className="text-secondary-500">Terms of Use &nbsp;</div>
              </PrivacyPolicyModals>
              and &nbsp;
              <PrivacyPolicyModals>
                <div className="text-secondary-500">
                  Business Associate Agreement &nbsp;
                </div>
              </PrivacyPolicyModals>
            </p>
          </div>

          <div className="my-5 flex items-center space-x-2">
            <Checkbox id="terms1" />
            <p className="text-sm">
              I agree to subscribe to &nbsp;
              <PrivacyPolicyModals>
                <div className="text-secondary-500">
                  ReferralCatch Newsletter
                </div>
              </PrivacyPolicyModals>
            </p>
          </div>
        </div>

        <Button
          disabled={isAccepte || form.formState.isSubmitting}
          className="my-1 w-full   font-semibold "
          type="submit"
        >
          {form.formState.isSubmitting && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Register
        </Button>
      </form>
    </Form>
  );
}
