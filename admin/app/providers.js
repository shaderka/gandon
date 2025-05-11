'use client'

import { SessionProvider } from 'next-auth/react'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export const Providers = ({ children }) => {
	return (
		<SessionProvider>
			<SidebarProvider>{children}</SidebarProvider>
		</SessionProvider>
	)
}
