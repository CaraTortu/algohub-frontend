import { Minus, Plus } from "lucide-react"
import Link from "next/link"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "~/app/_components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from "~/app/_components/ui/sidebar"
import { ThemeToggle } from "../ui/theme-toggle"

// This is sample data.
const nav = [
    {
        title: "Getting Started",
        url: "#",
        items: [
            {
                title: "Installation",
                url: "#",
            },
            {
                title: "Project Structure",
                url: "#",
            },
        ],
    },
    {
        title: "Building Your Application",
        url: "#",
        items: [
            {
                title: "Routing",
                url: "#",
            },
            {
                title: "Data Fetching",
                url: "#",
                isActive: true,
            },
        ],
    }
]


export const ContentNavbar: React.FC<Readonly<{ children: React.ReactNode }>> = ({ children }) => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href="#">
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">Documentation</span>
                                        <span className="">v1.0.0</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu>
                            {nav.map((item, index) => (
                                <Collapsible
                                    key={item.title}
                                    defaultOpen={index === 0}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton>
                                                {item.title}{" "}
                                                <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                                                <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        {item.items?.length && (
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map((item) => (
                                                        <SidebarMenuSubItem key={item.title}>
                                                            <SidebarMenuSubButton
                                                                asChild
                                                                isActive={item.isActive}
                                                            >
                                                                <Link href={item.url}>{item.title}</Link>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        )}
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <ThemeToggle />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

