/**
 * The name to save an export under: the server's suggested `file_name` from the export status
 * response when it sent one, otherwise the table's fallback name. The extension is added unless
 * the name already ends with it, since the API does not say whether `file_name` includes it.
 */
export const getExportFileName = (
  serverFileName: string | null | undefined,
  fallbackName: string,
  extension: string
): string => {
  const name = serverFileName?.trim() || fallbackName;
  return name.toLowerCase().endsWith(`.${extension.toLowerCase()}`) ? name : `${name}.${extension}`;
};
