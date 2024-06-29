"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { InvitePeopleSchema } from "@/schemas";

import { reset } from "@/actions/reset";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { AlertTriangle, Loader2, SendHorizontal } from "lucide-react";
import { inviteUser } from "@/actions/invite-user";
import { toast } from "sonner";

export const InvitePeople = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof InvitePeopleSchema>>({
    resolver: zodResolver(InvitePeopleSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof InvitePeopleSchema>) => {
    setError("");
    setSuccess("");
    console.log({ values });

    startTransition(() => {
      inviteUser(values).then((data) => {
        form.reset();
        setError(data?.error);
        toast.success(data?.error);
        //   setSuccess(data?.success);
      });
    });
  };
  return (
    <div className="flex flex-col space-y-3 p-4 h-full bg-white shadow-lg rounded-lg text-[#4b2e9b]">
      <h3 className="text-2xl font-bold">Invite People</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex items-center gap-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1 h-full">
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      onFocus={() => setError("")}
                      placeholder="Enter Email Address"
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-[#4b2e9b] text-white"
              disabled={isPending}
            >
              {isPending ? <Loader2 className="size-5 animate-spin" /> : "Send"}
              <SendHorizontal className="size-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
      <div className="flex-1 border rounded-lg flex flex-col justify-center p-4 gap-y-3">
        <h3 className="font-semibold text-lg">
          We&apos;ll include this message for you in the email:
        </h3>
        <p className="text-sm">
          Hi Dear, I&apos;d like to introduce you to Opes App.
          <br />
          Opes Can help you convert more of your visitors into actively Engaged,
          Confirmed, Lead, Delivered straight into your marketing funnel where
          you need them.
        </p>
      </div>
    </div>
  );
};
