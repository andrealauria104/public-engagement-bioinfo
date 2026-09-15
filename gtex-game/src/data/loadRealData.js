// Loads the precomputed real GTEx v8 slice (samples + marker gene expression,
// exported by gtex-data/src/exportGameData.R) and merges it with the shared
// presentation metadata (colors, organ keys, tissue order) from generateData.js.

import gtexReal from "./gtex_real.json";
import { tissueMeta } from "./generateData";

export function loadRealGtexData() {
  const { tissueColors, tissueOrgan, tissueOrder } = tissueMeta();
  return {
    samples: gtexReal.samples,
    genes: gtexReal.genes,
    tissueColors,
    tissueOrgan,
    tissueOrder,
  };
}
