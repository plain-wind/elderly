export interface Login {
  telephone: string;
  password: string;
}

export interface Register {
  name: string;
  telephone: string;
  password: string;
  confirmPassword: string;
  role: string;
}