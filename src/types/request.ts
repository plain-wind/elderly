/**
 * 请求类型定义
 * 用于定义发送给后端API的请求体类型
 */

// 参与者信息
export interface ApplicantInfo {
  name: string;
  phone: string;
  community: string;
}

// 添加/更新活动请求体
export interface AddActivityRequest {
  id?: number; // 更新时需要
  name: string; // 活动名称
  image: string | null; // 活动图片URL
  place: string; // 活动地点
  numberOfApplicants: number; // 参与人数
  credit: number; // 积分
  description: string; // 活动描述
  startTime: string; // 开始时间 (YYYY-MM-DD HH:mm:ss)
  endTime: string; // 结束时间 (YYYY-MM-DD HH:mm:ss)
  applicants?: ApplicantInfo[]; // 参与者列表（可选）
}
