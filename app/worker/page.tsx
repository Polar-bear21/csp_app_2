"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Company = {
  id: number;
  label: string;
};
const companys: Company[] = [
  { id: 1, label: "P001" },
  { id: 2, label: "P003" },
  { id: 3, label: "P003" },
  { id: 4, label: "P004" },
  { id: 5, label: "P005" },
  { id: 6, label: "P006" },
  { id: 7, label: "P007" },
  { id: 8, label: "P008" },
  { id: 9, label: "P009" },
  { id: 10, label: "P0010" },
];

export default function ProjectSelector() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const selectedvalue = "P0011";
  const selecteint = companys.find(c => c.label === selectedvalue);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {selectedCompany ? selectedCompany.label : "会社選択"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80 h-100 p-0" align="end">
          <Command>
            <CommandInput placeholder="会社検索" className="w-full" />
            <CommandList>
              <CommandEmpty>not found</CommandEmpty>
              <CommandGroup>
                {companys.map((company) => (
                  <CommandItem
                    key={company.id}
                    onSelect={() => setSelectedCompany(company)}
                    value={`${company.id}-${company.label}`}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedCompany?.id === company.id
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-4 w-4")} />
                    </div>
                    <span className="flex-1">{company.label}</span>
                    <span className="text-muted-foreground">
                      ID: {company.id}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
      {selectedCompany?.id}
      {selectedCompany?.label}
      {selecteint?.id}{selecteint?.label}
    </div>
  );
}
