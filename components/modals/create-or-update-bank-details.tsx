"use client";

import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { OtpSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@/hooks/useModalStore";
import { useEffect, useState, useTransition } from "react";
import { createOrUpdateBankDetails } from "@/actions/create-or-update-bank-details";
import { useSessionStore } from "@/hooks/useSessionStore";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { toast } from "sonner";

export const CreateOrUpdateBankDetails = () => {
  const session = useSessionStore((state) => state.session);
  const { isOpen, type, onClose, data, onUpdate } = useModal();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  useEffect(() => {
    setError("");
    form.setValue("pin", "");
  }, [form, isOpen]);

  const { createOrUpdate } = data;

  const onSubmit = (value: z.infer<typeof OtpSchema>) => {
    setError("");
    startTransition(() => {
      createOrUpdateBankDetails(
        createOrUpdate?.value!,
        createOrUpdate?.accountName!,
        createOrUpdate?.userId!,
        value.pin,
        session?.user?.email!
      ).then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          onUpdate();
          onClose();
          toast.success(data.success);
        }
      });
    });
  };

  const isModalOpen = isOpen && type === "updateAccountNumber";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6 ">
          <DialogTitle className="text-xl text-center font-bold">
            Update Bank Detail
          </DialogTitle>
          {/* <DialogDescription className="text-muted-foreground">
            To continue with your request, please enter the two factor code sent
            to your registered email address: emekarexchukwu@gmail.com
          </DialogDescription> */}
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full mx-auto text-center"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <div className="mx-auto w-fit">
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>
                  <div className="w-fit mx-auto">
                    <FormError message={error} />
                  </div>
                  <FormDescription>
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isPending}>Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
