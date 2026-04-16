export interface userPositionRes {
  id: number;
  userId: number;
  username: string;
  latitude: number;
  longitude: number;
  createTime: string;
  updateTime: string;
}

export interface userRes {
  id: number;
  name: string;
  phone: string;
  credit: number;
  provinceOrCity: string;
  county: string;
  community: string;
  guardianName: string;
  guardianPhone: string;
  adminName: string;
  adminPhone: string;
}

// 参与者信息
export interface ApplicantInfo {
  name: string;
  phone: string;
  community: string;
}

// 活动项信息
export interface ActivityItem {
  id: number;
  name: string;
  image: string | null;
  startTime: string; // ISO 8601格式或YYYY-MM-DD HH:mm:ss
  endTime: string;
  place: string;
  numberOfApplicants: number;
  credit?: number;
  description?: string;
  publisher?: string;
  phone?: string;
  applicants?: ApplicantInfo[];
}

// 活动列表響應
export interface ActivityListResponse {
  list: ActivityItem[];
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
