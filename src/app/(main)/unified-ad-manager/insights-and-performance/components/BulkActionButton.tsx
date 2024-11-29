import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export type BulkActions = "Active" | "Inactive" | "ARCHIVED" | "BUDGET_CHANGE";

export type BudgetChangeType = {
  operation: "increase" | "decrease";
  type: "percentage" | "value";
  amount: string;
};

interface BulkActionButtonProps {
  count: number;
  onChange: (action: BulkActions, budgetChange?: BudgetChangeType) => void;
  disabled?: boolean;
}

export const BulkActionButton: React.FC<BulkActionButtonProps> = ({
  count,
  onChange,
  disabled,
}) => {
  const pathname = usePathname();
  const [budgetChange, setBudgetChange] = useState<BudgetChangeType>({
    operation: "increase",
    type: "percentage",
    amount: "",
  });

  const shouldShowBudgetBidChange = () => {
    return (
      pathname ===
        "/unified-ad-manager/insights-and-performance/campaign-overview" ||
      pathname ===
        "/unified-ad-manager/insights-and-performance/keyword-overview"
    );
  };

  const getBudgetBidLabel = () => {
    return pathname ===
      "/unified-ad-manager/insights-and-performance/campaign-overview"
      ? "Budget Change"
      : "Bid Change";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          Bulk Actions ({count})
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => onChange("Active")}>
          Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("Inactive")}>
          Inactive
        </DropdownMenuItem>
        {shouldShowBudgetBidChange() && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {getBudgetBidLabel()}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="p-2">
              <div className="flex flex-col gap-2">
                <Select
                  value={budgetChange.operation}
                  onValueChange={(value: "increase" | "decrease") =>
                    setBudgetChange((prev) => ({ ...prev, operation: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select operation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="increase">Increase</SelectItem>
                    <SelectItem value="decrease">Decrease</SelectItem>
                  </SelectContent>
                </Select>
                By
                <Select
                  value={budgetChange.type}
                  onValueChange={(value: "percentage" | "value") =>
                    setBudgetChange((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="value">Value</SelectItem>
                  </SelectContent>
                </Select>
                Of
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter value"
                  value={budgetChange.amount}
                  onChange={(e) =>
                    setBudgetChange((prev) => ({
                      ...prev,
                      amount: e.target.value,
                    }))
                  }
                />
                <Button
                  onClick={() => onChange("BUDGET_CHANGE", budgetChange)}
                  disabled={!budgetChange.amount}
                >
                  Apply
                </Button>
              </div>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
