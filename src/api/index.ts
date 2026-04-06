import request from '@/utils/request';
import type { userPositionRes } from '@/types/response';

export const userApi = {
  getPositions: async () => {
    const userIds = Array.from({ length: 156 }, (_, i) => i + 1);
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
