export type PlayerRole = "Batsman" | "Bowler" | "All-Rounder" | "Wicket Keeper";

export interface TeamDetails {
  teamName: string;
  captainName: string;
  contactNumber: string;
  alternateNumber: string;
  email: string;
}

export interface Player {
  name: string;
  age: number;
  role: PlayerRole;
}

export interface Players {
  mainPlayers: Player[];
  substitutes: Player[];
}

export interface Payment {
  transactionId: string;
  paymentScreenshot: File | null;
}

export interface RegistrationFormData {
  teamDetails: TeamDetails;
  players: Players;
  payment: Payment;
}
