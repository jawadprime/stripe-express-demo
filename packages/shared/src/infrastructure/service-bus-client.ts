import { ServiceBusClient } from "@azure/service-bus";

export const serviceBusClient = (connectionString: string) => new ServiceBusClient(
  connectionString
);
