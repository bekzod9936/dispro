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
     
    };

    query?: string;
  }
  
