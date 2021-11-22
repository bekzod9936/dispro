export interface INewsData {
  title:string,
text:string,
gender: number,
date: string,
  }
  
  export interface INews {
    NewsInfo: {
      data: INewsData[];
      totalCount: number;
      between: string;
      totalCountNews:number;
    };
    setPeriod:{
      dateFrom?:string;
      dateTo?:string;
    };
    selectedNews?: any;
    query?: string;
  }
  
  export interface IDeferred {
    startLifeTime: any;
    endLifeTime:any;
    fullData?: any;
    data:any;
    date:string;
    genderType?: any;
    ageFrom: number,
    ageUnlimited: boolean,
    categoryIds: number[],
    company: null | any,
    companyId: number,
    count: number,
    currencyId: number,
    description: string,
    endDate: string,
    fee: number,
    id: number,
    image: string,
    price: number,
    publishDate: string,
    startDate: string,
    status: number,
    title: string,
    type: number,
    used: number,
    value: number,
    stat?: any
}

