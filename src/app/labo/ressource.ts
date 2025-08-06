type PrismaFilterArg = Record<string, any>;

export function buildPrismaWhere(
    params: Record<string, string | string[] | undefined>
): PrismaFilterArg {
    const where: PrismaFilterArg = {};

    for (const [key, value] of Object.entries(params)) {
        if (!value) continue;

        // Gérer les opérateurs : ex. age[gte]
        const match = key.match(/^(\w+)\[(\w+)\]$/);

        if (match) {
            const [, field, operator] = match;

            // Convertir les valeurs numériques si nécessaire
            const parsedValue = Array.isArray(value)
                ? value.map(parseValue)
                : parseValue(value);

            if (!where[field]) where[field] = {};
            where[field][mapOperator(operator)] = parsedValue;
        } else {
            // Clé simple : field=value
            const parsedValue = Array.isArray(value)
                ? value.map(parseValue)
                : parseValue(value);
            where[key] = parsedValue;
        }
    }

    return where;
}

// 🔁 Convertit les opérateurs de l'URL vers Prisma
function mapOperator(op: string): string {
    switch (op) {
        case "eq":
            return "equals";
        case "gt":
            return "gt";
        case "gte":
            return "gte";
        case "lt":
            return "lt";
        case "lte":
            return "lte";
        case "ne":
            return "not";
        case "in":
            return "in";
        case "nin":
            return "notIn";
        case "like":
            return "contains";
        case "ilike":
            return "contains"; // à adapter manuellement pour insensibilité
        case "startsWith":
            return "startsWith";
        case "endsWith":
            return "endsWith";
        case "exists":
            return "not"; // Prisma ne gère pas exists, on fait not null
        default:
            return op;
    }
}

// 🔁 Convertit les types (string → number, boolean, etc.)
function parseValue(val: string): string | number | boolean {
    if (val === "true") return true;
    if (val === "false") return false;
    const num = Number(val);
    return isNaN(num) ? val : num;
}
