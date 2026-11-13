/** The error body the backend sends, under both `title` and `detail`. */
interface ApiErrorBody {
  error?: {
    code?: string;
    message?: string;
    details?: string;
  };
}

/** Duck-typed shape read off request errors (Axios-shaped or plain Error). */
interface ErrorLike {
  response?: {
    data?: {
      title?: ApiErrorBody | string;
      detail?: ApiErrorBody | string;
    };
  };
}

export interface ApiErrorMessage {
  message: string;
  details?: string;
}

const readBody = (body: ApiErrorBody | string | undefined): ApiErrorMessage | null => {
  if (typeof body !== 'object' || !body.error?.message) return null;
  const { message, details } = body.error;
  return details ? { message, details } : { message };
};

/**
 * Reads the backend's own error message (`{ title|detail: { error: { message, details } } }`)
 * off a request error. Returns null when the error carries no backend message (network
 * failures, cancellations, plain errors), so callers choose their own fallback.
 */
export const getApiErrorMessage = (error: unknown): ApiErrorMessage | null => {
  if (typeof error !== 'object' || error === null) return null;
  const data = (error as ErrorLike).response?.data;
  return readBody(data?.title) ?? readBody(data?.detail);
};
