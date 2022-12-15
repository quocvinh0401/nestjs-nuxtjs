export interface Query {
    search?: string;
    searchType?: string;
    filters?: any;
  }
  
  export interface ApiOptions {
    loading?: boolean,
    alert?: {
      is: boolean,
      title?: Record<'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', string> | string,
      success?: boolean,
      error?: boolean
    }
  }
  