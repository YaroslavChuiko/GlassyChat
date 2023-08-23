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
import { isColorTheme } from "~/types/ColorTheme";
import IconButton from "../IconButton";

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
          className={`${className} outline-none data-[state=open]:bg-graya-5`}
          icon={<HamburgerMenuIcon width={20} height={20} />}
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[265px] rounded-lg bg-[rgba(255,_255,_255,0.6)] p-1 text-sm font-medium shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] backdrop-blur will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade  data-[side=top]:animate-slideDownAndFade"
          sideOffset={10}
          align="start"
        >
          <DropdownMenu.Item className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none text-gray-12 outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11 ">
            <PlusIcon height={20} width={20} className="ml-2 mr-5" />
            New Chat
          </DropdownMenu.Item>
          <DropdownMenu.CheckboxItem
            className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none text-gray-12 outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11"
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
            onSelect={preventClosingMenu}
          >
            <MoonIcon height={20} width={20} className="ml-2 mr-5" />
            Night Mode
            <Switch.Root
              className="relative ml-auto  h-[16px] w-[30px] cursor-pointer select-none rounded-full bg-graya-9 outline-none data-[state=checked]:bg-graya-12"
              id="airplane-mode"
              checked={darkMode}
            >
              <Switch.Thumb className="block h-[12px] w-[12px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[14px]" />
            </Switch.Root>
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="group relative my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none text-gray-12 outline-none transition data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[highlighted]:data-[state=open]:bg-graya-5 data-[state=open]:bg-graya-5 data-[disabled]:text-gray-11">
              <BlendingModeIcon height={20} width={20} className="ml-2 mr-5" />
              Theme
              <div className="ml-auto pl-[20px]">
                <ChevronRightIcon width={20} height={20} />
              </div>
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[200px] rounded-lg bg-[rgba(255,_255,_255,0.6)] p-1 text-sm font-medium shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] backdrop-blur will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade  data-[side=top]:animate-slideDownAndFade"
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.RadioGroup
                  value={colorTheme}
                  onValueChange={handleThemeChange}
                >
                  <DropdownMenu.RadioItem
                    className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 pl-[25px] leading-none text-gray-12 outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11"
                    value="blue"
                    onSelect={preventClosingMenu}
                  >
                    <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                      <DotFilledIcon />
                    </DropdownMenu.ItemIndicator>
                    Blue
                    <div className="ml-auto h-5 w-8 rounded-md bg-gradient-to-br from-[#6366f1] to-[#d946ef] pl-[20px]"></div>
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem
                    className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 pl-[25px] leading-none text-gray-12 outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11"
                    value="green"
                    onSelect={preventClosingMenu}
                  >
                    <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                      <DotFilledIcon />
                    </DropdownMenu.ItemIndicator>
                    Green
                    <div className="ml-auto h-5 w-8 rounded-md bg-gradient-to-br from-[#4ADE80] to-[#06B6D4] pl-[20px]"></div>
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem
                    className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 pl-[25px] leading-none text-gray-12 outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11"
                    value="yellow"
                    onSelect={preventClosingMenu}
                  >
                    <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                      <DotFilledIcon />
                    </DropdownMenu.ItemIndicator>
                    Yellow
                    <div className="ml-auto h-5 w-8 rounded-md bg-gradient-to-br from-[#FCD34D] to-[#F97316] pl-[20px]"></div>
                  </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className="m-[5px] h-[1px] bg-gray-9" />

          <DropdownMenu.Item className="my-[2px] flex h-[30px] cursor-pointer select-none items-center rounded-[5px] p-1 leading-none text-gray-12 outline-none transition active:scale-[0.98] data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11">
            <ExitIcon height={20} width={20} className="ml-2 mr-5" />
            Log Out
          </DropdownMenu.Item>
          {/* <DropdownMenu.Arrow className="fill-white" /> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
