'use client';

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiArtificialIntelligence } from "react-icons/gi";


const NavBar = () => {

  const { status, data: session } = useSession()

  const currentPath = usePathname()
  const links = [
    {
      label: 'Dashboard', href: '/'
    },
    {
      label: 'Issues', href: '/issues/list'
    },
  ]
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align='center' gap='3'>
            <Link href="/"><GiArtificialIntelligence /></Link>
            <ul className="flex space-x-6">
              {links.map(link =>
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-slate-900": link.href === currentPath,
                      "text-slate-500": link.href !== currentPath,
                      "hover:text-slate-800 transition-colors": true
                    })}>
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </Flex>
          <Box>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session?.user?.image!}
                  fallback="?"
                  size='2'
                  radius='full'
                  className='cursor-pointer'
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size='2'>
                    {session?.user?.email}
                  </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  {status === 'authenticated' && <Link href='/api/auth/signout'>Log out</Link>}
                  {status === 'unauthenticated' && <Link href='/api/auth/signin'>Login</Link>}
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
        </Flex>
      </Container>
    </nav>
  )
}

export default NavBar