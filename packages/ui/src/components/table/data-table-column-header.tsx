import { Column } from "@tanstack/react-table";
import { cn } from "@workspace/ui/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ChevronsUpDown,
  EyeOff,
  Pin,
  PinOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide() && !column.getCanPin()) {
    return <div className={cn("px-2.5", className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent text-sm font-semibold gap-5"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown className="!w-3 !h-3" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="!w-3 !h-3" />
            ) : (
              <ChevronsUpDown className="!w-3 !h-3" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() ? (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
                Desc
              </DropdownMenuItem>
            </>
          ) : null}

          {column.getCanSort() &&
          (column.getCanHide() || column.getCanPin()) ? (
            <DropdownMenuSeparator />
          ) : null}

          {column.getCanHide() ? (
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
              Hide
            </DropdownMenuItem>
          ) : null}

          {column.getCanPin() && column.getCanHide() ? (
            <DropdownMenuSeparator />
          ) : null}

          {column.getCanPin() ? (
            column.getIsPinned() ? (
              <DropdownMenuItem onClick={() => column.pin(false)}>
                <PinOff className="h-3.5 w-3.5 text-muted-foreground/70" />
                Unpin
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onClick={() => column.pin("left")}>
                <Pin className="h-3.5 w-3.5 text-muted-foreground/70" />
                Pin
              </DropdownMenuItem>
            )
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
