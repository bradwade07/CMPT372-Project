"use server";

import { CredentialResponse } from "@react-oauth/google";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserType } from "@/api/user";
import { UserTypes } from "@/api/user.type";

if (!process.env.SECRET_KEY) {
	throw Error("env variable not set: SECRET_KEY");
}

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

const cookieLength = 1000 * 60 * 60; // 1 hour

export type GoogleCredentials = {
	email: string;
	picture: string;
};

export async function encrypt(payload: any) {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1 hour from now")
		.sign(key);
}

export async function decrypt(input: string): Promise<any> {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});
	return payload;
}

export async function getSessionUserData(): Promise<
	GoogleCredentials | undefined
> {
	const session = await getSession();
	if (session) {
		const userData = <GoogleCredentials>jwt.decode(session.googleJWT);
		return userData;
	} else {
		return undefined;
	}
}

export async function getSessionUserType(): Promise<UserTypes | undefined> {
	const session = await getSession();
	if (session) {
		return session.userType;
	} else {
		return undefined;
	}
}

export async function login(credentialResponse: CredentialResponse) {
	const googleJWT = credentialResponse.credential;

	if (googleJWT) {
		const userType = await getUserType(googleJWT);

		// Create the session
		const expires = new Date(Date.now() + cookieLength);
		const session = await encrypt({ googleJWT, userType, expires });

		// Save the session in a cookie
		cookies().set("session", session, { expires, httpOnly: true });
	}
}

export async function logout() {
	// Destroy the session
	cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<any | null> {
	const session = cookies().get("session")?.value;
	if (!session) return null;
	return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	if (!session) return;

	// Refresh the session so it doesn't expire
	const parsed = await decrypt(session);
	parsed.expires = new Date(Date.now() + cookieLength);
	const res = NextResponse.next();
	res.cookies.set({
		name: "session",
		value: await encrypt(parsed),
		httpOnly: true,
		expires: parsed.expires,
	});
	return res;
}
