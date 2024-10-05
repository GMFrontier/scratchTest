interface Periods {
  collections_name: string;
  _id: string;
  month: number;
  year: number;
  total_txs_month: number;
  total_to_debit: number;
  monthly: number;
  description: string;
  user_id: string;
  isPaidCompleted: boolean;
  amountPay: number;
  payStatus: 'PENDING' | 'COMPLETED' | 'FAILED'; // Assuming payStatus can have these potential values
}
