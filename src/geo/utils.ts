import { Vector3 } from "@babylonjs/core";

export const cleanPoints = (points: Vector3[]): void => {
  // Sort points into counter-clockwise order around the centroid in the XZ plane
  const cx = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const cz = points.reduce((sum, p) => sum + p.z, 0) / points.length;

  points.sort((a, b) => {
    return Math.atan2(a.z - cz, a.x - cx) - Math.atan2(b.z - cz, b.x - cx);
  });

  // Verify winding is counter-clockwise; reverse if not
  let signedArea = 0;
  for (let i = 0; i < points.length; i++) {
    const curr = points[i];
    const next = points[(i + 1) % points.length];
    signedArea += (next.x - curr.x) * (next.z + curr.z);
  }
  if (signedArea > 0) {
    points.reverse();
  }
};
