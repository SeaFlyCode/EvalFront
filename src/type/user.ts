/**
 * Types for User and nested objects (address, bank, company, crypto, ...)
 * Cette définition est conçue pour correspondre aux données fournies et être
 * pratique à utiliser dans un projet React + TypeScript.
 *
 * Remarques :
 * - Les champs présents dans votre exemple sont requis là où c'est logique.
 * - Certains champs additionnels courants sont marqués comme optionnels (?)
 * - Si vous préférez une validation runtime stricte, utilisez une librairie
 *   comme zod ou io-ts et générez les types à partir du schéma.
 */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  // rue / numéro
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  country?: string;
  // coordonnées GPS si disponibles
  coordinates?: Coordinates;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Bank {
  cardExpire?: string; // ex: "03/26"
  cardNumber?: string; // ex: "9289760655481815"
  cardType?: string; // ex: "Elo"
  currency?: string; // ex: "USD"
  iban?: string;
}

export interface Company {
  department?: string;
  name?: string;
  title?: string;
  address?: Address;
}

export interface Crypto {
  coin?: string; // ex: "Bitcoin"
  wallet?: string; // ex: wallet address
  network?: string; // ex: "Ethereum (ERC20)"
}

export type Gender = 'male' | 'female' | 'other' | string;
export type Role = 'admin' | 'user' | 'manager' | string;

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: Gender;
  email: string;
  phone?: string;
  username?: string;
  password?: string;
  birthDate?: string; // ISO date ou chaîne fournie par l'API
  image?: string;
  bloodGroup?: string;
  height?: number; // en cm
  weight?: number; // en kg
  eyeColor?: string;
  hair?: Hair;
  ip?: string;
  address?: Address;
  macAddress?: string;
  university?: string;
  bank?: Bank;
  company?: Company;
  ein?: string;
  ssn?: string;
  userAgent?: string;
  crypto?: Crypto;
  role?: Role;
}

// Exemple d'export : utilisez l'export nommé `User` dans le reste du projet
// import { User } from './type/user';
