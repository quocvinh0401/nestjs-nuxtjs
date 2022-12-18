export interface Query {
  search?: string;
  searchType?: string;
  filters?: any;
}

export interface ApiOptions {
  loading?: boolean;
  alert?: {
    is: boolean;
    title?:
      | Record<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', string>
      | string;
    success?: boolean;
    error?: boolean;
  };
}

export interface Modal {
  isOpen: boolean,
  title: string,
  data: any
}

export interface DateOfBirth {
  day: number,
  month: number,
  year: number
}