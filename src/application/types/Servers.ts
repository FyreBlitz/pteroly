import { returnList as returnListAllocations } from "./NodeAllocations.js";
import { returnGet as returnGetUser } from "./Users.js";
import { returnGet as returnGetNest } from "./Nests.js";
import { returnGetEggs as returnGetEgg } from "./Nests.js";
import { returnGet as returnGetLocation } from "./Locations.js";
import { returnGet as returnGetNode } from "./Nodes.js";
import { returnList as returnListDatabases } from "./ServerDatabases.js";

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
    external_id: string | any,
    uuid: string,
    identifier: string,
    name: string,
    description: string,
    suspended: boolean,
    limits: {
      memory: number,
      swap: number,
      disk: number,
      io: number,
      cpu: number,
      threads: number | any,
    },
    feature_limits: {
      databases: number,
      allocations: number,
      backups: number,
    },
    user: number,
    node: number,
    allocation: number,
    nest: number,
    egg: number,
    pack: any,
    container: {
      startup_command: string,
      image: string,
      installed: boolean,
      environment: {
        [key: string]: any,
      }
    },
    updated_at: string,
    created_at: string,
    relationships: relationships,
  }
}

export interface create {
  name: string,
  user: number,
  description: string,
  node: number,
  egg: number,
  docker_image: string,
  startup: string,
  limits: {
    memory: number,
    swap: number,
    disk: number,
    io: number,
    cpu: number,
  },
  feature_limits: {
    databases: number,
    backups: number,
    allocations: number,
  },
  environment: {
    [key: string]: any,
  },
  allocation: {
    default: number,
    additional: number[],
  },
  deploy: any,
  start_on_completion: boolean,
  skip_scripts: boolean,
  oom_disabled: boolean,
}

export interface updateDetails {
  name: string,
  user: string,
  description: string,
  external_id: string,
}

export interface updateBuild {
  id: number,
  allocation: number,
  memory: number,
  swap: number,
  disk: number,
  io: number,
  cpu: number,
  threads: any,
  feature_limits: {
    databases: number,
    allocations: number,
    backups: number,
  }
}

export interface updateStartup {
  startup: string,
  environment: {
    [key: string]: any,
  },
  egg: number,
  image: string,
  skip_scripts: boolean,
}

interface relationships {
  allocations: returnListAllocations,
  user: returnGetUser,
  subusers: any,
  nest: returnGetNest,
  egg: returnGetEgg,
  variables: any,
  location: returnGetLocation,
  node: returnGetNode,
  databases: returnListDatabases,
}