"use client";

import { Button } from "@/components/ui/button";
import qs from "query-string";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserQuery } from "@/hooks/use-user-query";
import { BankDetailSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { resolveAccount } from "@/actions/resolve-account";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

type BankData = z.infer<typeof BankDetailSchema>["bankName"];
const BankPage = () => {
  const queryKey = "getBanks";
  const { data, status } = useUserQuery({
    apiUrl: "/api/bank/getBank",
    queryKey,
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<BankData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isDisabled, setIsDisabled] = useState(true);

  const form = useForm<z.infer<typeof BankDetailSchema>>({
    resolver: zodResolver(BankDetailSchema),
    defaultValues: {
      bankName: value,
      bankNumber: undefined,
    },
  });

  const { handleSubmit, watch, setValue: setFormValue, getValues } = form;

  // Watch bankNumber field
  const bankNumber = watch("bankNumber");

  useEffect(() => {
    if (bankNumber?.toString().length === 10) {
      handleSubmit(onSubmit)();
    } else {
      setError("");
      setSuccess("");
      setIsDisabled(true);
    }
  }, [bankNumber, handleSubmit]);

  const onSubmit = (value: z.infer<typeof BankDetailSchema>) => {
    startTransition(() => {
      resolveAccount(value).then((data) => {
        if (data?.error) setError(data.error);
        if (data?.data) {
          setSuccess(data.data.account_name);
          setIsDisabled(false);
        }
      });
    });
  };

  const onSave = () => {
    console.log("bankName", getValues("bankName"));
    console.log("bankNumber", getValues("bankNumber"));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white">
      <h2 className="font-semibold text-lg p-4 border-b">
        Update Bank Details
      </h2>

      {/* Bank form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-4">
          <div className="space-y-6 py-3">
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bank Name</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {value ? value.name : "Select Bank..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search Bank..." />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {status == "pending" && (
                                <CommandItem>Loading</CommandItem>
                              )}
                              {data &&
                                data.map((bank: BankData) => (
                                  <CommandItem
                                    key={bank?.name}
                                    value={bank?.name}
                                    onSelect={() => {
                                      setValue(bank);
                                      setOpen(false);
                                      field.onChange(bank);
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        value?.name === bank?.name
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                                    {bank?.name}
                                  </CommandItem>
                                ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter valid account number"
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      disabled={!value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isPending && <Loader2 className="size-4 animate-spin" />}
          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
      <div className="p-4">
        <Button className="w-full" disabled={isDisabled} onClick={onSave}>
          Update Bank Details
        </Button>
      </div>
    </div>
  );
};

export default BankPage;
