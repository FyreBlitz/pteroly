import { returnList as returnListServers } from "./Servers.js";

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

export interface returnGet {
  object: string,
  attributes: {
    id: number,
    external_id: string,
    uuid: string,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    language: string,
    root_admin: boolean,
    "2fa": boolean,
    created_at: string,
    updated_at: string,
    relationships: relationships,
  }
}

export interface create {

}

export interface update {

}

interface relationships {
  servers: returnListServers,
}