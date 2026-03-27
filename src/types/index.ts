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

export enum VoluntStatus {
  All = 'all',
  Examine = 'examine',
  Pass = 'pass',
  Reject = 'reject',
}

export enum ActiveStatus {
  All = 'all',
  Open = 'open',
  Close = 'close',
}

export interface Volunt {
  id: number;
  imgSrc: string;
  activeName: string;
  name: string;
  position: string;
  status: VoluntStatus;
}

export interface Active {
  id: number;
  imgSrc: string;
  activeName: string;
  date: string;
  position: string;
  personNum: number | null;
  description?: string;
  status: ActiveStatus;
}
