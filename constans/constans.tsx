import React from 'react'
import { IconHome, IconLogin, IconUserPlus, IconAbc, IconSettings, IconUser, IconLogout } from '@tabler/icons-react'

const home = <IconHome />
const login = <IconLogin />
const register = <IconUserPlus />
const quiz = <IconAbc />
const settings = <IconSettings />
const user = <IconUser />
const logout = <IconLogout />

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
export const quizzes = [
	{ name: 'Technik Informatyk', isNew: false, pathname: '/quiz1', image: '/it.png' },
	{ name: 'Technik Kucharz', isNew: false, pathname: '/quiz2', image: '/cooker.png' },
	{ name: 'Technik Mechanik', isNew: true, pathname: '/quiz3', image: '/mechanic.png' },
	{ name: 'Aplikacja prawnicza', isNew: true, pathname: '/quiz4', image: '/judge.png' },
	{ name: 'Technik Hotelarstwa', isNew: true, pathname: '/quiz5', image: '/hotel.png' },
	{ name: 'Technik Dekarz', isNew: true, pathname: '/quiz5', image: '/roofer.png' },
]
export const userMenuElements = [
	{ name: 'Profil', pathname: '/profil', icon: settings },
	{ name: 'Ustawienia', pathname: '/ustawienia', icon: user },
	{ name: 'Wyloguj', pathname: '/wyloguj', icon: logout },
]
