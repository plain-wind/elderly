import request from '@/api/request';
import type {
  userPositionRes,
  userRes,
  ActivityItem,
  ActivityListResponse,
  VoluntaryListResponse,
  userWatchRes
} from '@/types/response';
import type { AddActivityRequest } from '@/types/request';

// 用户相关API
export const userApi = {
  getAll: async (): Promise<userRes[]> => {
    return await request.get('/user/list');
  },
  getPositions: async (): Promise<userPositionRes[]> => {
    const userIds = (await userApi.getAll()).map(item => item.id);
    const ans = [];
    for (const id of userIds) {
      const position = (await request.get(
        '/user/location/get',
        { params: { userId: id } }
      )) as userPositionRes;
      position && ans.push(position);
    }
    console.log(ans);
    // ans.pop()
    // const latitudeBase = 39.061144;
    // const longitudeBase = 117.134399;
    // const nearbyOffset = () => (Math.random() - 0.5) * 0.002;
    // ans.push(...[{
    //   id: Math.floor(Math.random() * 100),
    //   userId: Math.floor(Math.random() * 100),
    //   username: '刘志强',
    //   latitude: latitudeBase + nearbyOffset(),
    //   longitude: longitudeBase + nearbyOffset(),
    //   createTime: new Date().toISOString(),
    //   updateTime: new Date().toISOString(),
    // }, {
    //   id: Math.floor(Math.random() * 100),
    //   userId: Math.floor(Math.random() * 100),
    //   username: '张桂兰',
    //   latitude: latitudeBase + nearbyOffset(),
    //   longitude: longitudeBase + nearbyOffset(),
    //   createTime: new Date().toISOString(),
    //   updateTime: new Date().toISOString(),
    // }, {
    //   id: Math.floor(Math.random() * 100),
    //   userId: Math.floor(Math.random() * 100),
    //   username: '李明',
    //   latitude: latitudeBase + nearbyOffset(),
    //   longitude: longitudeBase + nearbyOffset(),
    //   createTime: new Date().toISOString(),
    //   updateTime: new Date().toISOString(),
    // }, {
    //   id: Math.floor(Math.random() * 100),
    //   userId: Math.floor(Math.random() * 100),
    //   username: '王秀英',
    //   latitude: latitudeBase + nearbyOffset(),
    //   longitude: longitudeBase + nearbyOffset(),
    //   createTime: new Date().toISOString(),
    //   updateTime: new Date().toISOString(),
    // }, {
    //   id: Math.floor(Math.random() * 100),
    //   userId: Math.floor(Math.random() * 100),
    //   username: '赵国华',
    //   latitude: latitudeBase + nearbyOffset(),
    //   longitude: longitudeBase + nearbyOffset(),
    //   createTime: new Date().toISOString(),
    //   updateTime: new Date().toISOString(),
    // }, {
    //   id: Math.floor(Math.random() * 100),
    //   userId: Math.floor(Math.random() * 100),
    //   username: '陈桂芳',
    //   latitude: latitudeBase + nearbyOffset(),
    //   longitude: longitudeBase + nearbyOffset(),
    //   createTime: new Date().toISOString(),
    //   updateTime: new Date().toISOString(),
    // }, {
    //   id: Math.floor(Math.random() * 100),
    //   userId: Math.floor(Math.random() * 100),
    //   username: '孙建国',
    //   latitude: latitudeBase + nearbyOffset(),
    //   longitude: longitudeBase + nearbyOffset(),
    //   createTime: new Date().toISOString(),
    //   updateTime: new Date().toISOString(),
    // }, {
    //   id: Math.floor(Math.random() * 100),
    //   userId: Math.floor(Math.random() * 100),
    //   username: '周玉珍',
    //   latitude: latitudeBase + nearbyOffset(),
    //   longitude: longitudeBase + nearbyOffset(),
    //   createTime: new Date().toISOString(),
    //   updateTime: new Date().toISOString(),
    // }]);
    return ans;
  },
  getWatchData: async (): Promise<userWatchRes> => {
    return await request.get('/watchdata/read', { params: { userId: "user001" } }) as userWatchRes;
  }
}

// 活动相关API
export const activityApi = {
  // 获取活动列表
  getList: async (): Promise<ActivityListResponse> => {
    return await request.get('/admin/activity/list');
  },

  // 获取活动详情
  getDetail: async (id: string): Promise<ActivityItem> => {
    return await request.get('/admin/activity/detail', { params: { id } });
  },

  // 添加（创建）活动
  add: async (activity: AddActivityRequest): Promise<string> => {
    return await request.post('/admin/activity/add', activity);
  },

  // 更新活动
  update: async (activity: AddActivityRequest & { id: string }): Promise<string> => {
    return await request.put('/admin/activity/update', activity);
  },

  // 删除活动
  delete: async (id: string): Promise<string> => {
    return await request.delete('/admin/activity/delete', { params: { id } });
  },

  // 上传图片获取URL
  uploadImage: async (file: File, type: number = 1): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', String(type));

    return await request.post('/uploadImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};


// 志愿相关API
export const voluntaryApi = {
  // 获取志愿列表
  getList: async (): Promise<VoluntaryListResponse> => {
    const waitCheckList = await request.get('/admin/voluntary2/list/waitCheck') as VoluntaryListResponse;
    const checkedList = await request.get('/admin/voluntary2/list/hasCheck') as VoluntaryListResponse;
    return { ...waitCheckList, list: [...waitCheckList.list, ...checkedList.list] };
  },

  // 获取志愿详情
  getDetail: async (id: string) => {
    return await request.get('/admin/voluntary2/detail', { params: { id } });
  }
};
