export type TeaStyle = 'steamed-green' | 'roasted' | 'powdered';

export interface BrewingPreset {
  grams: number;
  waterMl: number;
  waterTempC: number;
  firstSteepSeconds?: number;
  whiskSeconds?: number;
}

export const BREWING_PRESETS: Record<TeaStyle, BrewingPreset> = {
  'steamed-green': { grams: 5, waterMl: 200, waterTempC: 70, firstSteepSeconds: 60 },
  roasted: { grams: 5, waterMl: 200, waterTempC: 90, firstSteepSeconds: 60 },
  powdered: { grams: 2, waterMl: 80, waterTempC: 70, whiskSeconds: 30 },
};

/** Matcha latte: whisk the powder into a little water, then top up with steamed milk. */
export const MATCHA_LATTE = { grams: 3, waterMl: 30, waterTempC: 70, whiskSeconds: 15, milkMl: 150 };

/** Iced matcha: whisk with cold water, then pour over ice. */
export const ICED_MATCHA = { grams: 3, waterMl: 90, waterTempC: 10, whiskSeconds: 45, iceGrams: 100 };
