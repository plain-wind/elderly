export interface Login {
  username: string;
  password: string;
}

export interface Register {
  username: string;
  password: string;
  confirmPassword: string;
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
  startTime: string;  // YYYY-MM-DD HH:mm:ss
  endTime: string;    // YYYY-MM-DD HH:mm:ss
  position: string;
  personNum: number | null;
  description?: string;
  status: ActiveStatus;
}
