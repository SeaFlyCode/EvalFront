// Module d'accès à l'API https://dummyjson.com/users
// Valide les réponses avec zod et expose des helpers typés.

import { z } from 'zod';
import type { User } from '../type/user';

const CoordinatesSchema = z.object({ lat: z.number(), lng: z.number() }).optional();

const AddressSchema = z
  .object({
    address: z.string(),
    city: z.string(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    coordinates: CoordinatesSchema,
  })
  .optional();

const HairSchema = z.object({ color: z.string(), type: z.string() }).optional();

const BankSchema = z
  .object({
    cardExpire: z.string().optional(),
    cardNumber: z.string().optional(),
    cardType: z.string().optional(),
    currency: z.string().optional(),
    iban: z.string().optional(),
  })
  .optional();

const CompanySchema = z
  .object({
    department: z.string().optional(),
    name: z.string().optional(),
    title: z.string().optional(),
    address: AddressSchema,
  })
  .optional();

const CryptoSchema = z
  .object({
    coin: z.string().optional(),
    wallet: z.string().optional(),
    network: z.string().optional(),
  })
  .optional();

const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  maidenName: z.string().optional(),
  age: z.number(),
  gender: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  birthDate: z.string().optional(),
  image: z.string().optional(),
  bloodGroup: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  eyeColor: z.string().optional(),
  hair: HairSchema,
  ip: z.string().optional(),
  address: AddressSchema,
  macAddress: z.string().optional(),
  university: z.string().optional(),
  bank: BankSchema,
  company: CompanySchema,
  ein: z.string().optional(),
  ssn: z.string().optional(),
  userAgent: z.string().optional(),
  crypto: CryptoSchema,
  role: z.string().optional(),
});

const UsersListSchema = z.object({
  users: z.array(UserSchema),
  total: z.number().optional(),
  skip: z.number().optional(),
  limit: z.number().optional(),
});

function handleFetchErrors(response: Response) {
  if (!response.ok) throw new Error(`API Error ${response.status}: ${response.statusText}`);
  return response;
}

export async function fetchUsers(options?: { limit?: number; skip?: number; q?: string }): Promise<User[]> {
  const url = new URL('https://dummyjson.com/users');
  if (options?.limit != null) url.searchParams.set('limit', String(options.limit));
  if (options?.skip != null) url.searchParams.set('skip', String(options.skip));
  if (options?.q) url.searchParams.set('q', options.q);

  const res = await fetch(url.toString());
  handleFetchErrors(res);
  const json = await res.json();

  const parsed = UsersListSchema.safeParse(json);
  if (!parsed.success) throw new Error(`Invalid users list response: ${parsed.error.message}`);
  return parsed.data.users as User[];
}

export async function fetchUserById(id: number): Promise<User> {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  handleFetchErrors(res);
  const json = await res.json();

  const parsed = UserSchema.safeParse(json);
  if (!parsed.success) throw new Error(`Invalid user response for id=${id}: ${parsed.error.message}`);
  return parsed.data as User;
}

export function parseUser(raw: unknown): User {
  return UserSchema.parse(raw) as User;
}

