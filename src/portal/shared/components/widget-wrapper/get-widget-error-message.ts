import { getApiErrorMessage } from '@/shared/utils/api-error';

/** Duck-typed shape read off request errors (Axios-shaped or plain Error). */
interface ErrorLike {
  message?: string;
  response?: {
    status?: number;
  };
}

export const DEFAULT_WIDGET_ERROR_MESSAGE = 'Error loading widget. Please try again.';

/**
 * Maps a React Query `error` to the user-facing message a widget shows in place of its content.
 */
export const getWidgetErrorMessage = (error: unknown): string => {
  const errorLike = (typeof error === 'object' && error !== null ? error : {}) as ErrorLike;
  const status = errorLike.response?.status;

  if (status === 400) return getApiErrorMessage(error)?.message || 'Bad request.';
  if (status === 401) return 'Session expired. Please log in again.';
  if (status === 403) return 'Access denied.';
  if (status === 404) return 'Data not found.';
  if (status === 500) return 'Server error. Please try again later.';
  if (errorLike.message?.includes('Network')) return 'Network error. Check your connection.';

  return DEFAULT_WIDGET_ERROR_MESSAGE;
};
