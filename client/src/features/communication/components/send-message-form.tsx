import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { MultiSelect, MultiSelectItem } from '@tremor/react';

import { Button } from '@/components/ui/button';
import FormGroup from '@/components/ui/form-group';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';

import type { Option } from '@/types';
import type { SendMessageFormValues } from '@/features/communication/types';
import { sendSMS } from '@/features/communication/api';
import { toast } from 'sonner';

interface SendMessageFormProps {
  isLoading: boolean;
  members: Option[];
}

const initialState = {
  members: {
    value: [],
    error: null,
  },
  message: {
    value: '',
    error: null,
  },
};
export default function SendMessageForm({
  isLoading,
  members,
}: SendMessageFormProps) {
  const [messageDetails, setMessageDetails] =
    useState<SendMessageFormValues>(initialState);
  const { isPending, mutate: send } = useMutation({
    mutationFn: sendSMS,
    onSuccess: data => {
      if (data?.status === 'success') {
        setMessageDetails(initialState);
        toast.success('Messages sent successfully');
      }
    },
  });

  function handleClick() {
    if (messageDetails.members.value.length === 0) {
      setMessageDetails(prev => ({
        ...prev,
        members: {
          ...prev.members,
          error: 'Please select at least one member',
        },
      }));
    }
    if (messageDetails.message.value.trim().length === 0) {
      setMessageDetails(prev => ({
        ...prev,
        message: {
          ...prev.message,
          error: 'Please enter a message',
        },
      }));
    }

    if (
      messageDetails.members.value.length === 0 &&
      messageDetails.message.value.trim().length === 0
    )
      return;

    const message = {
      recipients: messageDetails.members.value,
      message: messageDetails.message.value,
    };

    send(message);
  }

  return (
    <div className="space-y-4">
      <FormGroup>
        <Label>Members</Label>
        {isLoading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <>
            <MultiSelect
              onValueChange={value => {
                setMessageDetails(prev => ({
                  ...prev,
                  members: {
                    value,
                    error: null,
                  },
                }));
              }}
              disabled={isPending}
              value={messageDetails.members.value}
            >
              {members.map(member => (
                <MultiSelectItem key={member.value} value={member.value}>
                  {member.label}
                </MultiSelectItem>
              ))}
            </MultiSelect>
            {messageDetails.members.error && (
              <div className="text-xs text-rose-500 font-medium">
                {messageDetails.members.error}
              </div>
            )}
          </>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Message</Label>
        <Textarea
          className="resize-none"
          value={messageDetails.message.value}
          disabled={isPending}
          placeholder="Enter message"
          onChange={e =>
            setMessageDetails(prev => ({
              ...prev,
              message: { value: e.target.value, error: null },
            }))
          }
        ></Textarea>
        {messageDetails.message.error && (
          <div className="text-xs text-rose-500 font-medium">
            {messageDetails.message.error}
          </div>
        )}
      </FormGroup>
      <div className="space-x-2">
        <Button disabled={isPending} onClick={handleClick}>
          Send
        </Button>
        <Button
          type="reset"
          variant="outline"
          disabled={isPending}
          onClick={() => setMessageDetails(initialState)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
