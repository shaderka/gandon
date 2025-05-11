'use client'

import { SessionProvider } from 'next-auth/react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Providers = ({ children }) => {
	return (
		<TooltipProvider>
			<SessionProvider>
				<SidebarProvider>{children}</SidebarProvider>
			</SessionProvider>
		</TooltipProvider>
	)
}
