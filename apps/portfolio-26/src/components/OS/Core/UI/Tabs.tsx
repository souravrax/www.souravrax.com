import React from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

export const Tabs = RadixTabs.Root;

export const TabsList = React.forwardRef<HTMLDivElement, RadixTabs.TabsListProps>(
  ({ className = "", ...props }, ref) => (
    <RadixTabs.List
      ref={ref}
      className={`flex flex-col gap-3 pr-2 w-40 ${className}`}
      {...props}
    />
  )
);
TabsList.displayName = "TabsList";

export const TabsTrigger = React.forwardRef<HTMLButtonElement, RadixTabs.TabsTriggerProps>(
  ({ className = "", ...props }, ref) => (
    <RadixTabs.Trigger
      ref={ref}
      className={`h-11 px-4 border-neo font-black uppercase text-xs text-left bg-os-surface shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all data-[state=active]:!bg-neo-blue data-[state=active]:text-white data-[state=active]:!shadow-none data-[state=active]:translate-x-1 data-[state=active]:translate-y-1 ${className}`}
      {...props}
    />
  )
);
TabsTrigger.displayName = "TabsTrigger";

export const TabsContent = React.forwardRef<HTMLDivElement, RadixTabs.TabsContentProps>(
  ({ className = "", ...props }, ref) => (
    <RadixTabs.Content
      ref={ref}
      className={`flex-1 border-neo p-6 bg-os-surface shadow-neo overflow-auto custom-scrollbar animate-in fade-in slide-in-from-bottom-2 duration-300 ${className}`}
      {...props}
    />
  )
);
TabsContent.displayName = "TabsContent";