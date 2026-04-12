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

export interface applicant {
  name: string;
  phone: string;
  community: string;
}

export interface Active {
  id: number;
  name: string;
  phone: string;
  image: string;
  place: string;
  publisher: string;
  numberOfApplicants: number;
  credit: number;
  description: string;
  startTime: string;
  endTime: string;
  applicants: applicant[];
  status: ActiveStatus;
}
