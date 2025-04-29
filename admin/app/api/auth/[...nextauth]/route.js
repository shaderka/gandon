import NextAuth from 'next-auth'
import Admin from '@/app/models/Admin'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectMongoDB } from '@/lib/mongodb'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {},

			async authorize(credentials) {
				const { email, password } = credentials
				try {
					await connectMongoDB()
					const user = await Admin.findOne({ email })
					if (!user) return null
					const passMatch = await bcrypt.compare(password, user.password)
					if (!passMatch) return null
					return user
				} catch (error) {
					console.log(error)
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.uid = user
			}

			return token
		},
		session: async ({ session, token }) => {
			session.userData = {
				fio: token.uid.fio,
			}
			return session
		},
	},
	strategy: 'jwt',
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: '/',
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// const handler = NextAuth({
// 	providers: [
// 		CredentialsProvider({
// 			name: 'Credentials',
// 			credentials: {
// 				username: {
// 					label: 'Email',
// 					type: 'email',
// 					placeholder: 'test@example.com',
// 				},
// 				password: { label: 'Password', type: 'password' },
// 			},
// 			async authorize(credentials, req) {
// 				// Add logic here to look up the user from the credentials supplied
// 				const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' }

// 				if (user) {
// 					// Any object returned will be saved in `user` property of the JWT
// 					return user
// 				} else {
// 					// If you return null then an error will be displayed advising the user to check their details.
// 					return null

// 					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
// 				}
// 			},
// 		}),
// 	],
// })

// export { handler as GET, handler as POST }
