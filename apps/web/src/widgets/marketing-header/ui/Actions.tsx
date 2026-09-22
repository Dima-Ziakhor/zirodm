import { Button } from '@ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';

export async function Actions() {
  const isLoggedIn = false;

  return (
    <div className="flex justify-center items-center gap-2">
      {
        isLoggedIn ? (
          <Link href={'/'}>
            <User />
          </Link>

        ) : (
          <>
            <Button
              variant="outline"
            >
              {'Sign in'}
            </Button>

            <Button>
              {'Register'}
            </Button>
          </>
        )
      }
    </div>
  );
}