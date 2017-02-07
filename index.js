import createRegions from 'point-in-region';
import geojsonRewind from 'geojson-rewind';

export const fenceStates = {
  LEAVE: 'LEAVE',
  ENTER: 'ENTER',
  OUTSIDE: 'OUTSIDE',
  INSIDE: 'INSIDE'
};

export const isInsideRegion = (regionCoordinates, point) => {
  const geoJson = {
    "type": "Feature",
    "geometry": {
      "type": "Polygon",
      "coordinates": [regionCoordinates]
    }
  };
  const rewindGeoJson = geojsonRewind(geoJson, false);
  const arrayKeys = rewindGeoJson.geometry.coordinates[0].map((v, i) => i);
  const classifyPoint = createRegions(rewindGeoJson.geometry.coordinates[0], [[arrayKeys]]);

  return classifyPoint(point) !== -1;
};

export const hasMovingState = (regionCoordinates, pointBefore, pointAfter) => {
  const beforeInside = isInsideRegion(regionCoordinates, pointBefore);
  const afterInside = isInsideRegion(regionCoordinates, pointAfter);
  if (beforeInside && afterInside){
    return fenceStates.INSIDE;
  }else if(beforeInside && !afterInside){
    return fenceStates.LEAVE;
  }else if(!beforeInside && afterInside){
    return fenceStates.ENTER;
  }else{
    return fenceStates.OUTSIDE;
  }
};
