export const config = {
	// API_URL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
	headersWithAuth(token: string) {
		return {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`
		}
	},
};
