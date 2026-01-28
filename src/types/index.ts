export interface Login {
  telephone: string;
  password: string;
}

export interface Register {
  name: string;
  telephone: string;
  code: string;
  password: string;
  confirmPassword: string;
}