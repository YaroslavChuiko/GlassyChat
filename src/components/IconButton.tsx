import { forwardRef, type ReactElement, type ComponentProps } from "react";

type Props = {
  icon: ReactElement;
} & ComponentProps<"button">;

export default forwardRef<HTMLButtonElement, Props>(function IconButton(
  { className = "", icon, ...props },
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      className={`flex h-10 w-10 items-center justify-center rounded-lg bg-graya-3 text-gray-12 transition hover:bg-graya-4 focus:bg-graya-5 active:scale-[0.98] dark:bg-graydarka-3 dark:text-graydark-12 dark:hover:bg-graydarka-4 dark:focus:bg-graydarka-5  ${className}`}
    >
      {icon}
    </button>
  );
});
