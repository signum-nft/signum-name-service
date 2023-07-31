import localforage from "localforage";

localforage.config({
  name: "signum_name_service_storage",
  version: 1,
  storeName: "signum_name_service",
});

export const storage = localforage;
