
export interface DataQuestion {
    response_code: string;
    response_desc: string;
    response_ref: string;
    data: DatChoice[];
}

export interface DatChoice {
    question_id: number;
    question_description_thai: string;
    question_description_english: null;
    question_type: number;
    question_type_desc: null;
    hint: string;
    question_group: number;
    question_group_desc: null;
    question_choice: QuestionChoice[];
    value: any;
}

export interface QuestionChoice {
    choice_seq: number;
    choice_value: number;
    choice_description_thai: string;
    choice_description_english: null;
}
