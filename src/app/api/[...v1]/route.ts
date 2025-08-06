import { experimental_SmartCoercionPlugin as SmartCoercionPlugin } from "@orpc/json-schema";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod";

import { router } from "@/router";

const openAPIHandler = new OpenAPIHandler(router, {
    plugins: [
        new CORSPlugin(),
        new SmartCoercionPlugin({
            schemaConverters: [
                new ZodToJsonSchemaConverter(),
                // Add other schema converters as needed
            ],
        }),
        new OpenAPIReferencePlugin({
            schemaConverters: [new ZodToJsonSchemaConverter()],
        }),
    ],
});

async function handleRequest(request: Request) {
    const { response } = await openAPIHandler.handle(request, {
        prefix: "/api/v1",
        context: {},
    });

    return response ?? new Response("Not found man", { status: 404 });
}

export const HEAD = handleRequest;
export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
