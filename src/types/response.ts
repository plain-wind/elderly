import { applicant } from '@/types';

export interface userPositionRes {
  id: number;
  userId: number;
  username: string;
  latitude: number;
  longitude: number;
  createTime: string;
  updateTime: string;
}

export interface activityRes {
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
}

export interface activityListRes {
  list: activityRes[];
  total: number;
  pageNum: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  navigatePages: number[];
  firstPage: boolean;
  lastPage: boolean;
}
