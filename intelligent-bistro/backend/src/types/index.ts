export type OrderActionType =
  | "ADD_ITEM"
  | "REMOVE_ITEM"
  | "CLEAR_CART"
  | "RECOMMEND_ITEM"
  | "ASK_CLARIFICATION";

export interface ParsedCustomizations {
  protein?: string;

  rice?: string;

  sauce?: string;

  spiceLevel?: string;
}

export interface OrderAction {
  type: OrderActionType;

  itemId?: number;

  quantity?: number;

  customizations?: ParsedCustomizations;
}

export interface OrderParseResponse {
  message: string;

  actions: OrderAction[];
}