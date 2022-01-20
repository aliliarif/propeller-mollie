export enum TransactionTypes {
  NA,
  AUTHORIZATION,
  CANCEL_AUTHORIZATION,
  PAID,
  REFUNDED,
  CHARGEBACK,
}

export enum PaymentStatuses {
  OPEN,
  PENDING,
  AUTHORIZED,
  CANCELLED,
  EXPIRED,
  FAILED,
  PAID,
  REFUNDED,
  CHARGEBACK,
}

export enum TransactionStatuses {
  OPEN,
  PENDING,
  FAILED,
  SUCCESS,
}

export type Transactions = {
  transactionId: string;
  amount: number;
  currency: string;
  type: TransactionTypes;
  status?: TransactionStatuses;
};

export type CreatePaymentInput = {
  transactions: Transactions;
  status: PaymentStatuses;
  orderId: number;
  userId: number;
  amount: number;
  currency: string;
  method: string;
  paymentId: string;
};

export type UpdatePaymentInput = {
  status: PaymentStatuses;
  addTransaction: Transactions;
};

export type SearchByInput = {
  id?: number;
  paymentId?: string;
  orderId?: string;
};

export type OrderSetStatusInput = {
  orderId: number;
  status?: string;
  payStatus?: string;
};
