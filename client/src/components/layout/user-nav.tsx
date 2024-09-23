import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

import axios from '@/lib/axios';

import { User } from '@/types';
import { getInitials } from '@/lib/utils';

export default function UserNav() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as User;
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationFn: async () => {
      await axios.post('/api/logout');
    },
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem('token');
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
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/user.png" alt="Avatar" />
            <AvatarFallback className="bg-transparent">
              {user?.name ? getInitials(user.name) : 'u'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
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
