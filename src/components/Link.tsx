import { cn } from "@/lib/utils";

export default function Link({
  className,
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<"a">>) {
  return (
    <a className={cn(className)} {...props}>
      {children}
    </a>
  );
}
