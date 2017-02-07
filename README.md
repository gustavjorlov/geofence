# Geofence
Utility for detecting movements across region borders

```
const region = [
  [x1, y1],
  [x2, y2],
  [x3, y3],
  [x4, y4]
];

const point = [x5, y5];
const point2 = [x6, y6];

isInsideRegion(region, point); // true || false

hasMovingState(region, point, point2); // 'INSIDE', 'OUTSIDE', 'ENTER', 'LEAVE'

```
