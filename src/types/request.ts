import { applicant } from '@/types';

export interface activityReq {
  id: number;
  name: string;
  image: string;
  place: string;
  numberOfApplicants: number;
  credit: number;
  description: string;
  startTime: string;
  endTime: string;
  applicants: applicant[];
}