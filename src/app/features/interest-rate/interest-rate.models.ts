export interface PromotionResponse {
    response_code: string;
    response_desc: string;
    response_ref: string;
    total_count: number;
    data: Datum[];
}

export interface Datum {
    promotion_identity_id: string;
    product_information: string;
    security_information: null;
    promotion_priority: null;
    promotion_category: null;
    promotion_code: string;
    promotion_name: string;
    promotion_description: null;
    promotion_effective_date: number;
    promotion_expire_date: number;
    url_promotion: null;
    premium: null;
    discount_baht: null;
    discount_percent: null;
    promotion_condition: PromotionCondition[];
}

export interface PromotionCondition {
    promotion_condition_id: string;
    promotion_rate_code: string;
    factor_1: number;
    factor_1_from: number;
    factor_1_to: number;
    factor_2: number;
    factor_2_from: number;
    factor_2_to: number;
    factor_3: number;
    factor_3_from: number;
    factor_3_to: number;
    factor_4: null;
    factor_4_from: null;
    factor_4_to: null;
    factor_5: null;
    factor_5_from: null;
    factor_5_to: null;
    factor_6: null;
    factor_6_from: null;
    factor_6_to: null;
    factor_7: null;
    factor_7_from: null;
    factor_7_to: null;
    factor_8: null;
    factor_8_from: null;
    factor_8_to: null;
    factor_9: number;
    factor_9_from: number;
    factor_9_to: null;
    factor_10: number;
    factor_10_from: number;
    factor_10_to: null;
    fee_rate_code: null;
    promotion_type: null;
    premium: string;
    discount_baht: null;
    discount_percent: number;
}


export interface CalFactorList {
    code: string;
    name: string;
    desc: string;
    formular: string;
    formularDesc: string;
    round: string;
    decimal: string;
    unit: string;
}