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
    uuid: string,
    author: string,
    name: string,
    description: string,
    created_at: string,
    updated_at: string,
  }
}

export interface returnListEggs {
  object: string,
  data: returnGetEggs[],
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

export interface returnGetEggs {
  object: string,
  attributes: {
    id: number,
    uuid: string,
    name: string,
    nest: number,
    author: string,
    description: string,
    docker_image: string,
    config: {
      files: { [key: string]: any },
      startup: {
        done: string,
        userInteraction: Array<any>,
      },
      stop: string,
      logs: {
        custom: boolean,
        location: string,
      },
      extends: any,
    },
    startup: string,
    script: {
      privileged: boolean,
      install: string,
      entry: string,
      container: string,
      extends: any,
    },
    created_at: string,
    updated_at: string,
    relationships: relationships | any,
  }
}

interface relationships {
  nest: returnGet,
  servers: returnListServers,
  config: any,
  script: any,
  variables: any,
}