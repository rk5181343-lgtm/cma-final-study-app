export function useAttempts(ids: string[]) {
  return [];
}

export function masteryOf(ids: string[], done: Record<string, { mark: string }>) {
  return ids.every((id) => id in done);
}

export function clear(ids?: string[]) {
  return;
}
