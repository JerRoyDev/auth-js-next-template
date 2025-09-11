"use client";

import { SignInForm } from "@/components/auth/SignInForm";

export default function SignInPage() {
	return (
		<div className="max-w-sm mx-auto mt-16 p-6 border rounded-lg shadow">
			<h1 className="text-2xl font-bold mb-4">Logga in</h1>
			<SignInForm />
		</div>
	);
}
