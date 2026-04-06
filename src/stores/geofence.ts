import { defineStore } from 'pinia';

export type LngLat = [number, number];

const DEFAULT_FENCE_POINTS: LngLat[] = [
  [116.397, 39.911],
  [116.399, 39.911],
  [116.401, 39.909],
  [116.398, 39.907],
];

const isValidPoint = (point: unknown): point is LngLat => {
  if (!Array.isArray(point) || point.length < 2) return false;
  const lng = Number(point[0]);
  const lat = Number(point[1]);
  return Number.isFinite(lng) && Number.isFinite(lat);
};

const normalizePoint = (point: LngLat): LngLat => [Number(point[0]), Number(point[1])];

const calcCenter = (points: LngLat[]): LngLat | null => {
  if (!points.length) return null;
  const [sumLng, sumLat] = points.reduce((acc, cur) => [acc[0] + cur[0], acc[1] + cur[1]], [0, 0]);
  return [sumLng / points.length, sumLat / points.length];
};

// Ray casting algorithm: true means point is inside polygon or on edge.
const isPointInPolygon = (point: LngLat, polygon: LngLat[]): boolean => {
  if (polygon.length < 3) return false;

  const [x, y] = point;
  let inside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];

    const onSegment =
      Math.abs((yi - yj) * (x - xi) - (xi - xj) * (y - yi)) < 1e-10 &&
      x >= Math.min(xi, xj) &&
      x <= Math.max(xi, xj) &&
      y >= Math.min(yi, yj) &&
      y <= Math.max(yi, yj);

    if (onSegment) return true;

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi || Number.EPSILON) + xi;

    if (intersect) inside = !inside;
  }

  return inside;
};

export const useGeofenceStore = defineStore('geofence', () => {
  const userCoordinate = ref<LngLat | null>(null);
  const fencePoints = ref<LngLat[]>([...DEFAULT_FENCE_POINTS]);

  const setUserCoordinate = (point: LngLat | null) => {
    if (point === null) {
      userCoordinate.value = null;
      return;
    }
    if (!isValidPoint(point)) return;
    userCoordinate.value = normalizePoint(point);
  };

  const setFencePoints = (points: LngLat[]) => {
    if (!Array.isArray(points)) return;
    const validPoints = points.filter(isValidPoint).map(normalizePoint);
    if (validPoints.length !== 4) return;
    fencePoints.value = validPoints;
  };

  const setFencePointAt = (index: number, point: LngLat) => {
    if (!isValidPoint(point)) return;
    if (index < 0 || index > 3) return;
    const next = [...fencePoints.value];
    if (next.length !== 4) return;
    next[index] = normalizePoint(point);
    fencePoints.value = next;
  };

  const getFenceCenter = (): LngLat | null => {
    return calcCenter(fencePoints.value);
  };

  const isInsideFence = (point?: LngLat | null): boolean => {
    const target = point ?? userCoordinate.value;
    if (!target || !isValidPoint(target)) return false;
    if (fencePoints.value.length !== 4) return false;
    return isPointInPolygon(target, fencePoints.value);
  };

  const resetFence = () => {
    fencePoints.value = [...DEFAULT_FENCE_POINTS];
  };

  return {
    userCoordinate,
    fencePoints,
    setUserCoordinate,
    setFencePoints,
    setFencePointAt,
    getFenceCenter,
    isInsideFence,
    resetFence,
  };
});
