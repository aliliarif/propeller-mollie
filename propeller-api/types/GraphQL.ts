export enum TransactionTypes {
  AUTHORIZATION,
  CANCEL_AUTHORIZATION,
  CHARGEBACK,
  PAY,
  REFUND,
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
  OPEN = 'OPEN',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
}

export type Transactions = {
  transactionId: string;
  amount: number;
  currency: string;
  type: TransactionTypes;
  status: TransactionStatuses;
};

export type CreatePaymentInput = {
  addTransaction: Transactions;
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
  sendOrderConfirmationEmail?: boolean;
  addPDFAttachment?: boolean;
  deleteCart?: boolean;
};
