/**
 * Fetch service instance
 * @type {FetchService}
 */

import { authOptions } from "@/utils/auth-option";
import { getServerSession } from "next-auth";

/**
 * Get the token from the server
 * @returns {Promise<string>}
 */

export async function getToken() {
  const session = await getServerSession(authOptions);
  return session?.accessToken!;
}

/**
 * Get the type office from the server
 * @returns {Promise<string>}
 */

export async function getTypeOffice() {
  const session = await getServerSession(authOptions);
  return session?.typeOffice!;
}
