
export interface applicant {
  name: string;
  phone: string;
  community: string;
}

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