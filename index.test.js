import {expect} from 'chai';
import {isInsideRegion, hasMovingState, fenceStates} from './index';

describe('Geofence', () => {
  const clockwiseRegion = [
    [-7.899169921875001,42.553080288955826],
    [-5.789794921875001,58.263287052486035],
    [6.514892578125001,57.70414723434193],
    [4.405517578125001,42.8115217450979],
    [-7.899169921875001,42.553080288955826]
  ];
  const counterClockwiseRegion = [
    [5.811767578125,53.54030739150022],
    [-10.711669921875,53.330872983017066],
    [-9.305419921875002,44.59046718130883],
    [4.405517578125001,45.336701909968134],
    [5.811767578125,53.54030739150022]
  ];

  const pointOutside = [1, 2];
  const pointOutside2 = [2, 4];
  const pointInside = [-3, 47];
  const pointInside2 = [-4, 48];

  describe('Clockwise region', () => {
    it('should verify point outside region', () => {
      expect(isInsideRegion(clockwiseRegion, pointOutside)).to.be.false;
    });
    it('should verify point inside region', () => {
      expect(isInsideRegion(clockwiseRegion, pointInside)).to.be.true;
    });
    it('should enter region', () => {
      expect(hasMovingState(clockwiseRegion, pointOutside, pointInside)).to.equal(fenceStates.ENTER);
    });
    it('should leave region', () => {
      expect(hasMovingState(clockwiseRegion, pointInside, pointOutside)).to.equal(fenceStates.LEAVE);
    });
    it('should stay inside region', () => {
      expect(hasMovingState(clockwiseRegion, pointInside, pointInside2)).to.equal(fenceStates.INSIDE);
    });
    it('should stay outside region', () => {
      expect(hasMovingState(clockwiseRegion, pointOutside, pointOutside2)).to.equal(fenceStates.OUTSIDE);
    });
  });

  describe('Counter clockwise region', () => {
    it('should verify point outside region', () => {
      expect(isInsideRegion(counterClockwiseRegion, pointOutside)).to.be.false;
    });
    it('should verify point inside region', () => {
      expect(isInsideRegion(counterClockwiseRegion, pointInside)).to.be.true;
    });
    it('should enter region', () => {
      expect(hasMovingState(counterClockwiseRegion, pointOutside, pointInside)).to.equal(fenceStates.ENTER);
    });
    it('should leave region', () => {
      expect(hasMovingState(counterClockwiseRegion, pointInside, pointOutside)).to.equal(fenceStates.LEAVE);
    });
    it('should stay inside region', () => {
      expect(hasMovingState(counterClockwiseRegion, pointInside, pointInside2)).to.equal(fenceStates.INSIDE);
    });
    it('should stay outside region', () => {
      expect(hasMovingState(counterClockwiseRegion, pointOutside, pointOutside2)).to.equal(fenceStates.OUTSIDE);
    });
  });
});
