"use client";

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

function PasswordInput({ type, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="flex items-center border bg-transparent shadow-xs transition-[color,box-shadow] overflow-hidden rounded-lg has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 has-aria-invalid:dark:ring-destructive/40
  has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px] divide-x divide-accent
  "
    >
      <Input
        {...props}
        type={showPassword ? "text" : "password"}
        className="border-0 rounded-none focus:ring-0 aria-invalid:ring-0"
      />

      {showPassword ? (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowPassword(false)}
          type="button"
          className="!bg-transparent"
        >
          <EyeOffIcon size={10} />
        </Button>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setShowPassword(true)}
          type="button"
          className="!bg-transparent"
        >
          <EyeIcon size={10} />
        </Button>
      )}
    </div>
  );
}

export { PasswordInput };
