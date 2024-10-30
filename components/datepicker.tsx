"use client"

import * as React from "react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
interface DatePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DatePickerDemo({ date, setDate }: DatePickerDemoProps) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground", {/* 色を薄くする*/}
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4"/>
          {date ? format(date, "yyyy年MM月dd日", { locale: ja}) : <span>日付を選択</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={ja}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}
