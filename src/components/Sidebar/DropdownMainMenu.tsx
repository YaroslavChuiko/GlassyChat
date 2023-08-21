import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import React from "react";
import IconButton from "../IconButton";
import {
  BlendingModeIcon,
  ChevronRightIcon,
  DotFilledIcon,
  ExitIcon,
  HamburgerMenuIcon,
  MoonIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

type Props = {
  className?: string;
};

export default function DropdownMainMenu({ className }: Props) {
  const [person, setPerson] = React.useState("pedro");

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
          <DropdownMenu.Item className="my-[2px] flex h-[30px] select-none items-center rounded-[5px] p-1 leading-none text-gray-12 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11">
            <PlusIcon height={20} width={20} className="ml-2 mr-5" />
            New Chat
          </DropdownMenu.Item>
          <DropdownMenu.Item className="my-[2px] flex h-[30px] select-none items-center rounded-[5px] p-1 leading-none text-gray-12 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11">
            <MoonIcon height={20} width={20} className="ml-2 mr-5" />
            Night Mode
          </DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="group relative my-[2px] flex h-[30px] select-none items-center rounded-[5px] p-1 leading-none text-gray-12 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[highlighted]:data-[state=open]:bg-graya-5 data-[state=open]:bg-graya-5 data-[disabled]:text-gray-11">
              <BlendingModeIcon height={20} width={20} className="ml-2 mr-5" />
              Theme
              <div className="ml-auto pl-[20px]">
                <ChevronRightIcon width={20} height={20} />
              </div>
            </DropdownMenu.SubTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.RadioGroup
                  value={person}
                  onValueChange={setPerson}
                >
                  <DropdownMenu.RadioItem
                    className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[30px] select-none items-center rounded-[3px] px-[5px] pl-[25px] leading-none outline-none data-[disabled]:pointer-events-none"
                    value="pedro"
                  >
                    <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                      <DotFilledIcon />
                    </DropdownMenu.ItemIndicator>
                    Red
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem
                    className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[30px] select-none items-center rounded-[3px] px-[5px] pl-[25px] leading-none outline-none data-[disabled]:pointer-events-none"
                    value="colm"
                  >
                    <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                      <DotFilledIcon />
                    </DropdownMenu.ItemIndicator>
                    Green
                  </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          {/* <DropdownMenu.Separator className="m-[5px] h-[1px] bg-gray-9" />

          <DropdownMenu.Label className="text-mauve11 leading-[25p h-[30px]x] pl-[25px] text-sm">
            Theme
          </DropdownMenu.Label>
          <DropdownMenu.RadioGroup value={person} onValueChange={setPerson}>
            <DropdownMenu.RadioItem
              className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] h-[30px] select-none items-center rounded-[3px] px-[5px] pl-[25px] leading-none outline-none data-[disabled]:pointer-events-none"
              value="pedro"
            >
              <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Pedro Duarte
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem
              className="text-violet11 data-[disabled]:text-mauve8 data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1 relative flex h-[25px] h-[30px] select-none items-center rounded-[3px] px-[5px] pl-[25px] leading-none outline-none data-[disabled]:pointer-events-none"
              value="colm"
            >
              <DropdownMenu.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
                <DotFilledIcon />
              </DropdownMenu.ItemIndicator>
              Colm Tuite
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup> */}

          <DropdownMenu.Separator className="m-[5px] h-[1px] bg-gray-9" />

          <DropdownMenu.Item className="my-[2px] flex h-[30px] select-none items-center rounded-[5px] p-1 leading-none text-gray-12 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-graya-4 data-[disabled]:text-gray-11">
            <ExitIcon height={20} width={20} className="ml-2 mr-5" />
            Log Out
          </DropdownMenu.Item>
          {/* <DropdownMenu.Arrow className="fill-white" /> */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
