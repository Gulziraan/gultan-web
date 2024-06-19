export const validatedParse = (value: string, parseFunction: (value: string) => number): number => {
    if (value === '') return 0;
    return parseFunction(value);
}