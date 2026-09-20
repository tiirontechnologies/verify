import api from "./axios";

export interface CreateOrderPayload {
  plan: string; // e.g. "TRIAL" | "STARTER" | "PRO"
}

export interface CreateOrderResponse {
  success: boolean;
  message?: string;
  data: {
    key: string;             // razorpay key id
    razorpayOrderId: string;
    amount: number;
    currency: string;
    plan: string;
    paymentId: string;
  };
}

export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  plan?: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message?: string;
}

export interface PaymentStatusResponse {
  success: boolean;
  status: string; // e.g. "created" | "paid" | "failed"
  order?: any;
}

export const paymentApi = {
  createOrder: (payload: CreateOrderPayload) =>
    api.post<CreateOrderResponse>("/api/payments/create-order", payload),

  verifyPayment: (payload: VerifyPaymentPayload) =>
    api.post<VerifyPaymentResponse>("/api/payments/verify", payload),

  getPaymentStatus: (orderId: string) =>
    api.get<PaymentStatusResponse>(`/api/payments/status/${orderId}`),
};

export default paymentApi;