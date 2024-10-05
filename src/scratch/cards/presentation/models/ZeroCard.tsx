export interface ZeroCard {
  collection_name: string;
  _id: string;
  user_id: string;
  user_id_paycaddy: string;
  wallet_id: string;
  card_id_paycaddy: string;
  exp_year: string | null;
  exp_month: string | null;
  code: string;
  brand: string | null;
  is_physical: boolean;
  is_active: boolean;
  create_date: string;
  lastUsed: string;
  status: string;
  due_date: any;
  name: string | null;
  address: string | null;
  visibleNum: string | null;
  zeroStatus?: "DELIVERY" | "ACTIVATE" | "ACTIVATED" | "BLOCKED" | "BLOCKED_PIN" | "ERROR"
}
export interface ZeroCardDetails {
  cardId: string;
  pan: string;
  expDate: string;
  cvv: string;
  cardOwner: string,
  address: string
}
