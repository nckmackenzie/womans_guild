import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { toast } from 'sonner';

import axios from '@/lib/axios';

import { User } from '@/types';

export default function UserNav() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as User;
  console.log();
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      await axios.post('/api/logout');
    },
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login');
    },
    onError: error => {
      console.error(`🔥🔥LOGOUT ERROR: ${error.message}`);
      toast.error('😔Failed to log you out');
    },
  });
  // const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none capitalize">
              {user.name || 'John Doe'}
            </p>
            {/* <p className="text-xs leading-none text-muted-foreground">
              johndoe@example.com
            </p> */}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link to="/change-password" className="w-full">
            <KeyRound className="w-4 h-4 mr-3 text-muted-foreground" />
            <span>Change Password</span>
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => mutate()}
          disabled={isPending}
        >
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
