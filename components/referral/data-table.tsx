"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserWithoutReferrals } from "@/hooks/collect-and-sort-by-index";
import { Check, Link } from "lucide-react";
import { useState } from "react";
import { urlLink } from "../dashboard/referral-link";

type Props = {
  data: UserWithoutReferrals[];
};
export function DataTable({ data }: Props) {
  const [copied, setCopied] = useState<number | null>(null);

  const onCopy = (index: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(index);

    setTimeout(() => {
      setCopied(null);
    }, 1000);
  };
  return (
    <div className="overflow-x-auto">
      <Table className="w-full min-w-[380px]">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-gray-600 text-md">
              Index
            </TableHead>
            <TableHead className="font-bold text-gray-600 text-md">
              Name
            </TableHead>
            <TableHead className="font-bold text-gray-600 text-md">
              Ref Link
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((info, index) => (
            <TableRow key={index}>
              <TableCell>
                <p>{info.index}</p>
              </TableCell>

              <TableCell className="max-w-44 sm:w-fit">
                <p className="truncate">{info.name}</p>
              </TableCell>
              <TableCell className="flex space-x-2 items-center">
                <p className="hidden md:inline-flex">
                  {urlLink(info.invitationCode)}
                </p>
                <p className="md:hidden">{info.invitationCode}</p>
                <div
                  onClick={() => onCopy(index, urlLink(info.invitationCode))}
                  className="cursor-pointer"
                >
                  {copied == index ? (
                    <Check className="size-4" />
                  ) : (
                    <Link className="size-4" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
