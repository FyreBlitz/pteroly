export interface create {
  short: string,
  long: string | any,
}

export interface update {
  short: string,
  long: string | any,
}

export interface returnGet {
  object: string,
  attributes: {
    id: number,
    short: string,
    long: string | any,
    updated_at: string,
    created_at: string,
  },
  meta: {
    resource: string,
  },
}

export interface returnList {
  object: string,
  data: returnGet[],
  meta: {
    pagination: {
      total: number,
      count: number,
      per_page: number,
      current_page: number,
      total_pages: number,
      links: { [key: string]: any },
    }
  }
}