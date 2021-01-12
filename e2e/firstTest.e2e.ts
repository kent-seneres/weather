import {expect, element, by, device} from 'detox';

describe('Test', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have main weather screen', async () => {
    await expect(element(by.id('mainScreen'))).toBeVisible();
  });
});
