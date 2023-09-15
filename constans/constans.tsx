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

export const learnTrick = [
	'Wyciszenie Telefonu: Warto wyciszyć lub wyłączyć telefon podczas nauki. Powiadomienia z mediów społecznościowych i wiadomości mogą być rozpraszające. Jeśli musisz korzystać z telefonu do nauki, wyłącz powiadomienia, aby skoncentrować się na materiale.',

	'Planowanie i Organizacja: Stwórz plan nauki, który obejmuje określone godziny i cele. Dzięki temu unikniesz chaosu i pozwolisz sobie na skupienie się na konkretnej dziedzinie w danym czasie.',

	'Zapisywanie Pytań: Wykorzystaj funkcję zapisywania pytań na których nie znasz odpowiedzi. To świetny sposób na śledzenie luk w Twojej wiedzy i późniejsze skoncentrowanie się na tych obszarach.',

	'Rozumienie Materiału: Nie ucz się na pamięć, ale staraj się zrozumieć materiał. Zamiast powtarzać tekst bezmyślnie, próbuj wyjaśnić go sobie w własnych słowach. To pomaga w lepszym zrozumieniu i utrwaleniu informacji.',

	'Variety in Learning: Urozmaicaj swoją naukę. Nie polegaj tylko na jednym źródle materiałów. Korzystaj z podręczników, notatek, konspektów, filmów, czy też aplikacji edukacyjnych.',

	'Przerwy i Regeneracja: Nie zapominaj o przerwach. Krótkie przerwy co godzinę pomagają zachować skoncentrowanie. Pamiętaj też o regularnym snu i odpowiednim odżywianiu.',

	'Ćwiczenia i Zdrowy Tryb Życia: Aktywność fizyczna ma ogromny wpływ na mózg. Staraj się regularnie ćwiczyć i dbać o zdrową dietę.',

	'Testowanie Siebie: Wykorzystuj testy i quizy do sprawdzania swojej wiedzy. To pomoże Ci ocenić, które obszary wymagają więcej uwagi.',

	'Nauczanie Innych: Spróbuj nauczyć kogoś innego materiału, który się uczysz. Nauczanie jest doskonałym sposobem na utrwalenie wiedzy.',

	'Motywacja i Pozytywne Myślenie: Zawsze pamiętaj o swoim celu i motywacji do nauki. Pozytywne myślenie może znacząco wpłynąć na Twoje wyniki.',
]

export const testimonials = [
	{
		id: 0,
		name: 'Wojtek K.',
		image: '/feedbakcFemale.png',
		text: 'NaukaQuizy4U to strona, która uratowała mi skórę! Gdy zbliżał się mój egzamin na poziomie B, poczułem się zdezorientowany ogromem materiału. Na szczęście, trafiłem na tę stronę, która oferowała losowanie zestawów pytań. To dało mi możliwość efektywnej nauki i skupienia się na słabych punktach. Rywalizacja z moimi kolegami była świetnym dodatkiem, który dodatkowo motywował mnie do nauki. Dzięki "NaukaQuizy4U" zdałem egzamin z doskonałym wynikiem, a teraz polecam ją każdemu, kto potrzebuje pomocy w nauce',
	},
	{
		id: 1,
		name: 'Anna S.',
		image: '/feedbakcMale.png',
		text: 'NaukaQuizy4U to moje tajne narzędzie do sukcesów na egzaminach! Dzięki tej stronie, którą odkryłam niedawno, miałam dostęp do praktycznych quizów, które świetnie przygotowały mnie do egzaminu na poziomie C. Losowanie jednego pytania po drugim było dla mnie niesamowicie pomocne, ponieważ mogłam skupić się na zagadnieniach, które sprawiały mi najwięcej problemów. Efekty? Zdałam egzamin z wysokim wynikiem! Polecam każdemu, kto potrzebuje solidnej nauki',
	},
]
