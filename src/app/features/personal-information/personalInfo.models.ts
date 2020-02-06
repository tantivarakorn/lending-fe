export interface FlagDOPA {
    cardId: string;
    firstName: string;
    lastName: string;
    birthDay: string;
    laser: string
}

export interface CustomerDataInfo {
    data: Data;
}


export interface Data {
    locationCode: LocationCode[];
    occupationCode: OccupationCode[];
    businessTypeCode: BusinessTypeCode[];
    titleCode: TitleCode[];
    genderCode: GenderCode[];
    maritalCode: any[];
    nationalityCode: NationalityCode[];
}

export interface BusinessTypeCode {
    codeBusinessType: number;
    businessTypeName: string;
}

export interface GenderCode {
    codeGender: number;
    genderName: string;
}

export interface LocationCode {
    codeLocation: number;
    subDistrict: string;
    district: string;
    Province: string[];
}

export interface NationalityCode {
    codeNationality: number;
    nationalityName: string;
}

export interface OccupationCode {
    codeOccupation: number;
    occupationName: string;
}

export interface TitleCode {
    codeTitle: number;
    titleName: string;
}
