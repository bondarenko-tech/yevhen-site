/* product-engine public API */

export type {
  NormalizedProduct,
  ProduktEntry,
  ProduktTyp
} from "./types";

export {
  normalizeProduct,
  normalizeAll
} from "./normalize";

export {
  getSegment
} from "./segment";

export {
  scoreProduct
} from "./score";

export {
  pickTop,
  pickWeitere
} from "./winners";

export {
  buildInternalLinks
} from "./internalLinks";