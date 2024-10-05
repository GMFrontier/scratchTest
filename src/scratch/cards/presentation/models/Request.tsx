export interface RequestPayment {
  type: "ach"
  userId: string
  amount: 5.51
  period?: any
  payInfo?: string,
  sendPush?: boolean
  comment?: string
  bank?: string
  account_type?: string
  account_number?: string
}

export interface Delivery {
  holderReceipt: boolean,
  nameReceipt?: string,
  idReceipt?: string,
  comment?: string
  address?: any
  telephone?: any
}

export interface CardOrderModel {
  collection_name: string;
  _id: string;
  user_id: string;
  user_id_paycaddy: string;
  email: string;
  firstName: string;
  lastName: string;
  occupation: string;
  placeOfWork: string;
  pep: boolean;
  salary: number;
  telephone: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    homeNumber: string | null;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  status: string;
  walletId: string;
  kycUrl: string;
  creationDate: string;
  limit: number | null;
  pdfDocument: string | null;
  holderReceipt: boolean;
  nameReceipt: string;
  idReceipt: string;
  comment: string;
}
