import request from '@/api/request';
import type { userPositionRes, activityListRes, activityRes } from '@/types/response';
import type { activityReq } from '@/types/request';

export const userApi = {
  getPositions: async () => {
    const userIds = Array.from({ length: 1 }, (_, i) => i + 1);
    const ans = [];
    for (const id of userIds) {
      const { userId, username, latitude, longitude, updateTime } = (await request.get(
        '/user/location/get',
        { params: { userId: id } }
      )) as userPositionRes;
      ans.push({ userId, username, latitude, longitude, updateTime });
    }
    return ans;
  },
};

export const activeApi = {
  get: async () => {
    const { list } = await request.get('/admin/activity/list') as activityListRes;
    return list;
  },
  getDetail: async (id: number) => {
    const res = await request.get('/admin/activity/detail', { params: { id } }) as activityRes;
    return res;
  },
  add: async (data: activityReq) => {
    await request.post('/admin/activity/add', data);
  },
  remove: async (id: number) => {
    await request.delete('/admin/activity/delete', { params: { id } });
  },
};