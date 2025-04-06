'use client';

import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import { Skeleton } from '@/app/components'
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiArtificialIntelligence } from "react-icons/gi";


const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align='center' gap='3'>
            <Link href="/"><GiArtificialIntelligence /></Link>
            <NavLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  )
}

const NavLink = () => {
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
    <ul className="flex space-x-6">
      {links.map(link =>
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-stone-900": link.href === currentPath,
            })}>
            {link.label}
          </Link>
        </li>)}
    </ul>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession()

  if (status === 'loading') return <Skeleton width='3rem' />

  if (status === 'unauthenticated') {
    return <Link className='nav-link' href='/api/auth/signin'>Login</Link>
  }

  return (<Box>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar
          src={session!.user!.image!}
          fallback="?"
          size='1'
          radius='full'
          className='cursor-pointer'
          referrerPolicy='no-referrer'
        />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>
          <Text size='2'>
            {session!.user!.email}
          </Text>
        </DropdownMenu.Label>
        <DropdownMenu.Item>
          <Link href='/api/auth/signout'>Log out</Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Box>)
}

export default NavBar