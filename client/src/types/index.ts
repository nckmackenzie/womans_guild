export type ServerError = Record<string, string[]>;
export type Option = { value: string; label: string };
export interface WithId {
  id: string;
}

export interface WithName {
  name: string;
}

export interface IdWithName extends WithId, WithName {}

export interface IsEdit {
  isEdit?: boolean;
}
