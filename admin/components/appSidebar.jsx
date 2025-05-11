'use client'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from './ui/sidebar'
import Link from 'next/link'
import { Grid2X2 } from 'lucide-react'
import { redirect, usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { LogOut, CircleUser, SlidersHorizontal } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useSession } from 'next-auth/react'

export default function AppSidebar() {
	const path = usePathname()
	const { data: session } = useSession()

	return (
		<Sidebar>
			<SidebarHeader>
				<div
					className='flex justify-start pt-4 pl-2 cursor-pointer'
					onClick={() => redirect('/')}
				>
					<img
						src='logo.png'
						className='select-none drag-none w-8 rounded-md border-2 border-[#08d4ec] mr-4'
					/>
					<h1 className=' text-2xl font-bold'>POIZON IS</h1>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Меню</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild isActive={path.includes('items')}>
									<Link href='/items'>
										<Grid2X2 />
										<span>Товары</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									asChild
									isActive={path.includes('categories')}
								>
									<Link href='/categories'>
										<SlidersHorizontal />
										<span>Категории</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton asChild isActive={path.includes('profile')}>
									<Link href='/profile'>
										<CircleUser />
										<span>Профиль</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<div className='flex items-center'>
					<Avatar className='size-10 mr-2'>
						<AvatarFallback>
							{session?.user.email.substring(0, 2).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<Button variant='outline' onClick={() => signOut()} className='grow'>
						<LogOut />
					</Button>
				</div>
			</SidebarFooter>
		</Sidebar>
	)
}
