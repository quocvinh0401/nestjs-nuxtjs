export namespace Configuration {
  export interface Database {
    mongoUrl: string;
    mongoDbs: string;
  }

  export interface Configure {
    database: Configuration.Database
  }
}
