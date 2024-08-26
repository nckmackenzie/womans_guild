export interface SendMessageFormValues {
  members: {
    value: string[];
    error: string | null;
  };
  message: {
    value: string;
    error: string | null;
  };
}

export interface SendMessageValues {
  recipients: string[];
  message: string;
}
