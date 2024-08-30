"use client";

import { resolveAccount } from "@/actions/resolve-account";
import { sendOpt } from "@/actions/send-opt";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
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
import { useModal } from "@/hooks/useModalStore";
import { useSessionStore } from "@/hooks/useSessionStore";
import { BankDetailSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type BankData = z.infer<typeof BankDetailSchema>["bankName"];
const BankPage = () => {
  const session = useSessionStore((data) => data.session);
  const { onOpen, data: storeDate, onUpdateClose } = useModal();
  const queryKey = "getBanks";
  const { data, status } = useUserQuery({
    apiUrl: "/api/bank/getBank",
    queryKey,
  });

  const bankData = data?.bankData;
  const bankDetails = data?.bankDetails;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<BankData | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isVerified, setIsVerified] = useState(false);

  const form = useForm<z.infer<typeof BankDetailSchema>>({
    resolver: zodResolver(BankDetailSchema),
    defaultValues: {
      bankName: value,
      bankNumber: undefined,
    },
  });

  const { handleSubmit, watch, setValue: setFormValue, getValues } = form;

  useEffect(() => {
    if (bankDetails) {
      setFormValue("bankName", {
        name: bankDetails?.bankName,
        code: Number(bankDetails?.bankCode),
      }),
        setValue({
          name: bankDetails?.bankName,
          code: Number(bankDetails?.bankCode),
        });

      onUpdateClose();
      setSuccess(bankDetails?.accountName);
      setFormValue("bankNumber", Number(bankDetails?.accountNumber));
    }
  }, [bankDetails, setFormValue, onUpdateClose]);

  const bankName = getValues("bankName");
  const bankNumber = getValues("bankNumber");

  useEffect(() => {
    setIsVerified(false);
    // setSuccess("");
    setError("");
  }, [bankName, bankNumber]);

  const onSubmit = (value: z.infer<typeof BankDetailSchema>) => {
    setError("");
    // setSuccess("");
    startTransition(async () => {
      if (!isVerified) {
        setSuccess("");
        resolveAccount(value).then((data) => {
          if (data?.error) setError(data.error);
          if (data?.data) {
            setSuccess(data.data.account_name);
            setIsVerified(true);
            // setIsDisabled(false);
          }
        });
      } else {
        sendOpt(session?.user?.email!).then((data) => {
          if (data.success) {
            onOpen("updateAccountNumber", {
              createOrUpdate: {
                accountName: success!,
                userId: session?.user?.id!,
                value,
              },
            });
          }

          if (data.error) {
            setError(data.error);
          }
        });
      }
    });
  };

  if (status === "pending") {
    return <div>pending</div>;
  }
  if (status === "error") {
    return <div>Error</div>;
  }

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
                              {bankData &&
                                bankData.map((bank: BankData) => (
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
          <div className="flex flex-col space-y-2">
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={isPending || storeDate?.isUpdate}
          >
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isVerified ? (
              "Update Bank Details"
            ) : (
              "Verify Account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BankPage;
