type Invoice = {
    id: string;
    items: {
        name: string;
        price: number;
        quantity: number;
    }[];
    amount: number;
    status: string;
    created: string;
    is_high: boolean;
    paid_at: string | null;
    updated: string;
    user_id: string;
    currency: string;
    description: string;
    external_id: string;
    paid_amount: number;
    payer_email: string;
    merchant_name: string;
    payment_method: string;
    payment_channel: string;
    credit_card_token?: string;
    failure_redirect_url?: string;
    success_redirect_url?: string;
    credit_card_charge_id?: string;
};
