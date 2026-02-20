import { GraphQLClient } from "graphql-request";

import { API_URL } from "@/lib/config";

export const graphqlClient = new GraphQLClient(`${API_URL}/graphql`);
