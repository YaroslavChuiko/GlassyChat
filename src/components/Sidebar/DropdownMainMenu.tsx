import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BlendingModeIcon,
  ChevronRightIcon,
  DotFilledIcon,
  ExitIcon,
  HamburgerMenuIcon,
  MoonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import * as Switch from "@radix-ui/react-switch";
import { useAppStore } from "~/store/store";
import { ALL_COLOR_THEMES, isColorTheme } from "~/types/ColorTheme";
import IconButton from "../IconButton";
import { THEME_GRADIENTS } from "~/const/const";

type Props = {
  className?: string;
};

export default function DropdownMainMenu({ className }: Props) {
  const { colorTheme, setColorTheme, darkMode, toggleDarkMode } = useAppStore();

  const preventClosingMenu = (e: Event) => {
    e.preventDefault();
  };

  const handleThemeChange = (value: string) => {
    if (isColorTheme(value)) {
      setColorTheme(value);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton
          className={`${className} outline-none data-[state=open]:bg-graya-5 dark:data-[state=open]:bg-graydarka-5`}
          icon={<HamburgerMenuIcon width={20} height={20} />}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[265px] rounded-lg bg-[rgba(255,_255,_255,0.7)] p-1 text-sm font-medium text-gray-12 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] backdrop-blur will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade  data-[side=top]:animate-slideDownAndFade dark:bg-[rgba(0,_0,_0,0.7)] dark:text-graydark-12 dark:shadow-[0px_10px_38px_-10px_rgba(62,_63,_64,_0.35),_0px_10px_20px_-15px_rgba(62,_63,_64,_0.2)]"
          sideOffset={10}
          align="start"
        >
          <DropdownMenu.Item className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none  outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11 dark:data-[highlighted]:bg-graydarka-4 dark:data-[disabled]:text-graydark-11">
            <PlusIcon height={20} width={20} className="ml-2 mr-5" />
            New Chat
          </DropdownMenu.Item>
          <DropdownMenu.CheckboxItem
            className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11 dark:data-[highlighted]:bg-graydarka-4 dark:data-[disabled]:text-graydark-11"
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
            onSelect={preventClosingMenu}
          >
            <MoonIcon height={20} width={20} className="ml-2 mr-5" />
            Night Mode
            <Switch.Root
              className="relative ml-auto  h-[16px] w-[30px] cursor-pointer select-none rounded-full bg-graya-9 outline-none data-[state=checked]:bg-graydarka-9"
              id="airplane-mode"
              checked={darkMode}
            >
              <Switch.Thumb className="block h-[12px] w-[12px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[14px]" />
            </Switch.Root>
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="group relative my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none outline-none transition data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[highlighted]:data-[state=open]:bg-graya-5 data-[state=open]:bg-graya-5 data-[disabled]:text-gray-11 dark:data-[highlighted]:bg-graydarka-4 dark:data-[highlighted]:data-[state=open]:bg-graydarka-5 dark:data-[state=open]:bg-graydarka-5 dark:data-[disabled]:text-graydark-11">
              <BlendingModeIcon height={20} width={20} className="ml-2 mr-5" />
              Theme
              <div className="ml-auto pl-[20px]">
                <ChevronRightIcon width={20} height={20} />
              </div>
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[200px] rounded-lg bg-[rgba(255,_255,_255,0.7)] p-1 text-sm font-medium text-gray-12 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] backdrop-blur will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade  data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade dark:bg-[rgba(0,_0,_0,0.7)] dark:text-graydark-12 dark:shadow-[0px_10px_38px_-10px_rgba(62,_63,_64,_0.35),_0px_10px_20px_-15px_rgba(62,_63,_64,_0.2)]"
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.RadioGroup
                  value={colorTheme}
                  onValueChange={handleThemeChange}
                >
                  {ALL_COLOR_THEMES.map((themeName) => {
                    return (
                      <DropdownMenu.RadioItem
                        key={themeName}
                        value={themeName}
                        onSelect={preventClosingMenu}
                        className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 pl-[25px] leading-none outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11 dark:data-[highlighted]:bg-graydarka-4 dark:data-[disabled]:text-graydark-11"
                      >
                        <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                          <DotFilledIcon />
                        </DropdownMenu.ItemIndicator>
                        {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                        <div
                          className={`ml-auto h-5 w-8 rounded-md pl-[20px] ${THEME_GRADIENTS[themeName]}`}
                        ></div>
                      </DropdownMenu.RadioItem>
                    );
                  })}
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="m-[5px] h-[1px] bg-gray-9 transition-colors dark:bg-graydark-9" />

          <DropdownMenu.Item className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11 dark:data-[highlighted]:bg-graydarka-4 dark:data-[disabled]:text-graydark-11">
            <ExitIcon height={20} width={20} className="ml-2 mr-5" />
            Log Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
