'use client'

import React, { useRef, ChangeEvent, KeyboardEvent } from 'react'
import { Input } from "@/components/ui/input"

interface DualNumericInputProps {
  hours: string;
  minutes: string;
  onTimeChange: (newHours: string, newMinutes: string) => void;
}

export default function DualNumericInput({ hours, minutes, onTimeChange }: DualNumericInputProps) {
  const secondInputRef = useRef<HTMLInputElement>(null)

  const handleFirstInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2) // 数字以外を除去し、最大2桁に制限
    const numericValue = Number(value); // 条件に使うため数字に変換

    // 0から24までの範囲内でなければ何もしない
    if (numericValue <= 24) {
      onTimeChange(value, minutes); // Update hours only
      if (value.length === 1 && numericValue >= 3 && numericValue <= 9) {
        secondInputRef.current?.focus();
        onTimeChange(`0${value}`, minutes); // 頭に0を追加
      }
      if (value.length === 2) {
        secondInputRef.current?.focus();
      }
    }
  }

  const handleSecondInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2)
    const numericValue = Number(value); // 条件に使うため数字に変換

    if (numericValue <= 59){
      onTimeChange(hours, value); // Update minutes only
      if (value.length === 1 && numericValue >= 6 && numericValue <= 9){
        onTimeChange(hours ,`0${value}` ); // 頭に0を追加
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, isFirstInput: boolean) => {
    const target = e.currentTarget;
    // Enterで次のフィールドに移動
    if (e.key === 'Enter') {
      e.preventDefault()
      if (isFirstInput && secondInputRef.current) {
        secondInputRef.current.focus()
      } 
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const target = e.currentTarget;
      const isCursorAtEnd = target.selectionStart === target.value.length; // カーソルがフィールドの最後にあるか確認
  
      if (e.key === 'ArrowRight' && isFirstInput && isCursorAtEnd) {
        e.preventDefault();
        secondInputRef.current?.focus(); // 1つ目のフィールドのカーソルが最後にあれば2つ目に移動
      } else if (e.key === 'ArrowLeft' && !isFirstInput && isCursorAtEnd) {
        e.preventDefault();
        const firstInput = document.getElementById('first-input') as HTMLInputElement;
        firstInput?.focus(); // 2つ目のフィールドのカーソルが最後にあれば1つ目に移動
      }
    }
  }

  return (
      <div className="flex items-center space-x-2">
        <Input
          id="first-input"
          type="text"
          inputMode="numeric"
          value={hours}
          onChange={handleFirstInputChange}
          onKeyDown={(e) => handleKeyDown(e, true)}
          className="w-14 text-center"
          maxLength={2}
          placeholder="00"
        />
        <span>:</span>
        <Input
          ref={secondInputRef}
          id="second-input"
          type="text"
          inputMode="numeric"
          value={minutes}
          onChange={handleSecondInputChange}
          onKeyDown={(e) => handleKeyDown(e, false)}
          className="w-14 text-center"
          maxLength={2}
          placeholder="00"
          disabled={hours.length < 2}
        />
      {/* <div className="text-sm text-muted-foreground">
        Current value: {firstValue}:{secondValue}
      </div> */}
    </div>
  )
}