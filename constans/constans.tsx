import React from 'react'
import { IconHome, IconLogin, IconUserPlus, IconAbc } from '@tabler/icons-react'

const home = <IconHome />
const login = <IconLogin />
const register = <IconUserPlus />
const quiz = <IconAbc />

export const menuElements = [
	{ name: 'Strona główna', isNew: false, pathname: '/', icon: home },
	{ name: 'Quiz 1', isNew: false, pathname: '/quiz1', icon: quiz },
	{ name: 'Quiz 2', isNew: false, pathname: '/quiz2', icon: quiz },
	{ name: 'Quiz 3', isNew: true, pathname: '/quiz3', icon: quiz },
	{ name: 'Quiz 4', isNew: true, pathname: '/quiz4', icon: quiz },
	{ name: 'Quiz 5', isNew: true, pathname: '/quiz5', icon: quiz },
	{ name: 'Logowanie', isNew: false, pathname: '/logowanie', icon: login },
	{ name: 'Rejestracja', isNew: false, pathname: '/rejestracja', icon: register },
]
