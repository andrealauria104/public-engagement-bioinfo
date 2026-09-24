// Placement of the organ illustrations on the skeleton, in the anatomy SVG's
// viewBox units. The skeleton fills the whole viewBox; each organ is an image
// box (x, y, w, h) sized to its PNG's aspect ratio. Positions follow the
// skeleton's landmarks rather than strict anatomy -- organs are nudged apart
// so each one stays clickable and its label readable.
//
// Kept free of JSX/asset imports so the layout can be loaded from plain Node
// for quick previews.

export const VIEW_W = 300;
export const VIEW_H = 625;

// Order is draw order: large/back organs first, small/front last, so where
// boxes overlap the smaller organ sits on top and wins the click.
// lx/ly/anchor place the label; omitted, it is centred just below the image.
export const ORGAN_LAYOUT = [
  { tissue: "Lung", x: 103, y: 157, w: 94, h: 88, lx: 201, ly: 186, anchor: "start" },
  { tissue: "Liver", x: 95, y: 248, w: 58, h: 44, lx: 110, ly: 310 },
  { tissue: "Kidney", x: 117, y: 318, w: 66, h: 42 },
  { tissue: "Heart", x: 146, y: 196, w: 29, h: 56 },
  { tissue: "Pancreas", x: 152, y: 276, w: 48, h: 22, lx: 184, ly: 310 },
  { tissue: "Brain", x: 107, y: 16, w: 86, h: 72 },
  { tissue: "Thyroid", x: 138, y: 140, w: 24, h: 24, lx: 167, ly: 156, anchor: "start" },
  { tissue: "Blood", x: 45, y: 238, w: 20, h: 39 },
  { tissue: "Muscle", x: 212, y: 214, w: 60, h: 76, lx: 250 },
  { tissue: "Adipose", x: 166, y: 426, w: 40, h: 39 },
];
