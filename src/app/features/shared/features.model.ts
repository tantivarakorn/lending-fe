export interface TitleChange {
  title: string;
  itemNo: string;
}


export interface MainData {
  template: Template;
  product: Product;
  component: [],
  theme: MainTheme;
}

export interface Product {
  template: string;
  endDate: string;
  productChannel: string;
  campaignId: string;
  prodDay: string;
  prodType: string;
  linkChannel: string;
  prodCode: string;
  prodUrl: string;
  businessLine: string;
  prodName: string;
  activeDate: string;
  prodTime: string;
  businessDept: string;
  company: string;
  campaignName: string;
}

export interface Template {
  component: ComponentTemplate[];
  name: string;
  uuid: string;
}

export interface ComponentTemplate {
  code: string;
  name: string;
  uuid: string;
}



//////theme//////
export interface MainTheme {
  bottom: Bottom[];
  logo: Logo;
  header: Body[];
  theme: SubTheme[];
  body: Body[];
}

export interface Body {
  colour: string;
  tag: string;
}

export interface Bottom {
  btmColour: string;
  tag: string;
  fontColour: string;
}

export interface Logo {
  type: string;
  value: string;
}

export interface SubTheme {
  btmColour?: string;
  fontSize?: number;
  tag?: string;
}



export interface DataLog {
  trnId: string;
  source: string;
  productId: string;
  productVersionId: string;
  productComponentId: string;
  taskCategory: string;
  keywords: string;
  trnStatus: string;
  trnSubStatus: string;
  failureReason: string;
  sourceDevice: string;
  sourceDeviceId: string;
  sourceCifId: string;
  accountName: string;
  stateTime: string;
  stateCode: string;
}

export interface InputData {
  template?: any;
  data: any;
  prod: any;
  theme: any;
  prodInfo?: any;
  calculationMonth?: any;
  checkDopa?: any;
  campaign?: any;
}
