interface Movement {
  _id: string;
  userId: string;
  cardId: string;
  amount: number;
  status: string;
  detail: string | null;
  messageSys: string;
  codAuth: string;
  additionalData: string;
  created_at: string;
  update_at: string;
  category_id: string | null;
  comment: string | null;
  real_date: string;
  type: string | null;
  payInfo: string | null;
  codOper: string | null;
}