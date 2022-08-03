// type DriverValueRef = { value: unknown } | { field: string; model?: string };


export default interface DriverValueRef {
    value?: unknown;
    field?: string;
    model?: string;
};
