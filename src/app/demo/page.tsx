import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold">{title}</h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  );
}

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 p-8">
      <h1 className="text-xl font-bold">Component Demo</h1>

      <Section title="Button">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </Section>

      <Section title="Input">
        <Input placeholder="Type something…" className="max-w-64" />
      </Section>

      <Section title="Input Group">
        <InputGroup className="max-w-64">
          <InputGroupAddon>$</InputGroupAddon>
          <InputGroupInput placeholder="0.00" />
        </InputGroup>
      </Section>

      <Section title="Textarea">
        <Textarea placeholder="Write a message…" className="max-w-64" />
      </Section>

      <Section title="Select">
        <Select defaultValue="apple">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </Section>

      <Section title="Radio Group">
        <RadioGroup defaultValue="one" className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="one" /> One
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="two" /> Two
          </label>
        </RadioGroup>
      </Section>

      <Section title="Toggle">
        <Toggle>Bold</Toggle>
        <Toggle variant="outline">Italic</Toggle>
      </Section>

      <Section title="Slider">
        <Slider defaultValue={[40]} className="max-w-64" />
      </Section>

      <Section title="Progress">
        <Progress value={60} className="max-w-64" />
      </Section>

      <Section title="Skeleton">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </Section>

      <Section title="Separator">
        <div className="w-full">
          <p className="text-sm">Above</p>
          <Separator className="my-2" />
          <p className="text-sm">Below</p>
        </div>
      </Section>

      <Section title="Tooltip">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="outline">Hover me</Button>}
            />
            <TooltipContent>A helpful tip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Section>

      <Section title="Popover">
        <Popover>
          <PopoverTrigger
            render={<Button variant="outline">Open popover</Button>}
          />
          <PopoverContent>Popover content goes here.</PopoverContent>
        </Popover>
      </Section>

      <Section title="Dropdown Menu">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline">Open menu</Button>}
          />
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Section>

      <Section title="Menubar">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>New</MenubarItem>
              <MenubarItem>Open</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>Undo</MenubarItem>
              <MenubarItem>Redo</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Section>

      <Section title="Navigation Menu">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Docs</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Section>

      <Section title="Sheet">
        <Sheet>
          <SheetTrigger
            render={<Button variant="outline">Open sheet</Button>}
          />
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Sheet title</SheetTitle>
              <SheetDescription>Sheet description goes here.</SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Section>

      <Section title="Scroll Area">
        <ScrollArea className="h-32 w-64 rounded-md border p-3">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i} className="text-sm">
              Row {i + 1}
            </p>
          ))}
        </ScrollArea>
      </Section>

      <Section title="Table">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Alice</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Bob</TableCell>
              <TableCell>Inactive</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Section>

      <Section title="Sidebar">
        <div className="h-64 w-full overflow-hidden rounded-md border">
          <SidebarProvider className="h-full min-h-0" defaultOpen>
            <Sidebar collapsible="none" className="border-r">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Menu</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Dashboard</SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>Settings</SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <div className="p-3 text-sm">Page content next to sidebar</div>
          </SidebarProvider>
        </div>
      </Section>
    </div>
  );
}
