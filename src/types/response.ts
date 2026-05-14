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

// 手表数据
export interface userWatchRes {
  userId: string;
  stepCount: number;
  heartRate: number;
  bloodOxygen: number;
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

// 活动列表
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


// 志愿信息
export interface voluntaryItem {
  id: string;
  name: string;
  userId?: number;
  image: string | null;
  userName: string;
  place: string;
  description?: string;
  startTime: string;
  endTime: string;
  hasPass: number;
  neededNumber?: number;
  createTime?: string;
}

// 志愿列表
export interface VoluntaryListResponse {
  list: voluntaryItem[];
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