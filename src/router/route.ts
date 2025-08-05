import { implement } from "@orpc/server";

import { contracts } from "@/contrats";

export const route = implement(contracts);
