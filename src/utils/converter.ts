/**
 * 数据类型转换工具
 * 用于前后端数据类型的相互转换
 */

import type { Active, ActiveStatus } from '@/types';
import type { ActivityItem } from '@/types/response';
import type { AddActivityRequest } from '@/types/request';

/**
 * 将后端活动数据转换为前端展示类型
 * @param item 后端返回的活动数据
 * @returns 前端展示的活动数据
 */
export function convertActivityItemToActive(item: ActivityItem): Active {
  return {
    id: item.id,
    imgSrc: item.image || '',
    activeName: item.name,
    startTime: item.startTime.split('T')[0] + ' ' + item.startTime.split('T')[1].split('.')[0], // 转换为 YYYY-MM-DD HH:mm:ss 格式
    endTime: item.endTime.split('T')[0] + ' ' + item.endTime.split('T')[1].split('.')[0], // 转换为 YYYY-MM-DD HH:mm:ss 格式
    position: item.place,
    personNum: item.numberOfApplicants,
    description: item.description || '',
    status: 'open' as ActiveStatus,
  };
}

/**
 * 将前端活动数据转换为后端请求格式
 * @param active 前端活动数据
 * @returns 后端请求体
 */
export function convertActiveToRequest(active: Active): AddActivityRequest {
  return {
    name: active.activeName,
    image: active.imgSrc || null,
    place: active.position,
    numberOfApplicants: active.personNum || 0,
    startTime: active.startTime,
    endTime: active.endTime,
    credit: 0,
    description: active.description || '',
    applicants: [],
  };
}

/**
 * 批量转换活动列表
 * @param items 后端返回的活动数据列表
 * @returns 前端展示的活动数据列表
 */
export function convertActivityItemsToActives(items: ActivityItem[]): Active[] {
  return items.map(item => convertActivityItemToActive(item));
}
