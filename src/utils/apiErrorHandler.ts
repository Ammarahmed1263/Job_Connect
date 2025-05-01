import { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public errorCode?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const handleApiError = (error: unknown) => {
  const axiosError = error as AxiosError;
  console.log('error occured: ', error)
  
  if (!axiosError.response) {
    throw new ApiError("Network error - please check your connection");
  }

  const errorMessage = (axiosError.response.data as { message?: string })?.message;
  const statusCode = axiosError.response.status;

  switch (statusCode) {
    case 400:
      throw new ApiError(errorMessage || "Invalid data", statusCode);
    case 401:
      throw new ApiError(errorMessage || "Unauthorized", statusCode);
    case 409:
      throw new ApiError(errorMessage || "Resource conflict", statusCode);
    case 422:
      throw new ApiError(errorMessage || "Invalid data format", statusCode);
    default:
      throw new ApiError(
        errorMessage || "Operation failed - please try again later",
        statusCode
      );
  }
};

export default handleApiError;