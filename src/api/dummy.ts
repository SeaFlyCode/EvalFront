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

export async function fetchUsers(options?: { limit?: number; skip?: number; q?: string }): Promise<User[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.set('limit', String(options.limit));
    if (options?.skip) params.set('skip', String(options.skip));
    if (options?.q) params.set('q', options.q);

    const url = `https://dummyjson.com/users${params.toString() ? '?' + params.toString() : ''}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        const data = await res.json();
        if (!data || !Array.isArray(data.users)) throw new Error('Format de réponse inattendu');
        return data.users as User[];
    } catch (err) {
        console.error('fetchUsers error:', err);
        throw err instanceof Error ? err : new Error(String(err));
    }
}

export async function fetchUserById(id: number): Promise<User> {
  try {
    if (!id || id <= 0) {
      throw new Error('ID utilisateur invalide');
    }

    const res = await fetch(`https://dummyjson.com/users/${id}`);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const json = await res.json();

    const parsed = UserSchema.safeParse(json);
    if (!parsed.success) {
      throw new Error(`Format de données invalide pour l'utilisateur ${id}: ${parsed.error.message}`);
    }

    return parsed.data as User;
  } catch (err) {
    console.error('fetchUserById error:', err);
    throw err instanceof Error ? err : new Error(String(err));
  }
}

export function parseUser(raw: unknown): User {
  try {
    return UserSchema.parse(raw) as User;
  } catch (err) {
    console.error('parseUser error:', err);
    throw new Error('Impossible de parser les données utilisateur: ' + (err instanceof Error ? err.message : String(err)));
  }
}

