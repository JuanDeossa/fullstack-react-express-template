export interface ServiceResponse {
  status: "success" | "error";
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
