export function fillTemplateString(templateString: string, params: Record<string, any>) {
  return templateString.replace(/\{(.*?)\}/g, (_, key) => params[key] ?? "");
}
