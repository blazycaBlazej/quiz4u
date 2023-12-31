# Strona na żywo 💻

[quiz4u.vercel.app](https://quiz4u.vercel.app)

KONTO ADMINA:
email: admin123@wp.pl
hasło: wsxqaz11

# Prezentacja aplikacji - komputer 🖥️

[youtu.be/Qn0NIxYsEms](https://youtu.be/Qn0NIxYsEms)

# Prezentacja aplikacji - smartfon 📱

[youtube.com/watch?v=eusa6lJT_0Q](https://www.youtube.com/watch?v=eusa6lJT_0Q)

# Technologie użyte w projekcie 🔧

- Next.js
- React
- TypeScript
- Next.Auth.js
- Nodemailer
- Prisma
- Tailwind
- JSON Web Token
- React Hook Form
- i inne...

# Do zrobienia 💪

- sekcja komentarzy,
- ranking,
- gra rankingowa,
- rywalizacja ze znajomym poprzez link,
- menu na smartfonie: zamknięcie menu poprzez wstecz (przycisk smartfona) oraz zamknięcie poprzez kliknięcia poza obszar menu,
- poprawa styli na smartfonie,
- dodac debouncing podczas sprawdzenia czy login i email istnieje w bazie,
- migracja do next.js 14.0,
- dodać przycisk do zapisywania quizów, zamiast automatycznie zapisywać wszystkie quizy,
- dodać statystyki ile osób odpowiedziało na dane pytanie prawidłwo,
- i inne ..

# Opis projektu 🎉

Quiz4u to interaktywna strona internetowa, którą stworzyłem jako część mojej pracy inżynierskiej. Projekt ten powstał, ponieważ gdy ja uczyłem się do egzaminu na technika, czy egzaminu na prawo jazdy to zawsze dnerwowało mnie to, że nie mogę zapisywać pytań na które nie znam odpowiedzi. W moim przypadku skutkowało to dziesiątkami zdjęć na smartfonie z których poźniej uczyłęm się, aby rozwiązać ten problem postanowiłem stworzyć platformę, która wychodzi na przeciw uczniom. Moja strona umożliwia rozwiązywanie testów z wybranej liczby pytań, drukowanie testów, zapisywanie pytań i testów oraz przeglądanie wszystkich pytań z konkretnego zestawu. Użytkownicy mogą również rozwiązywać lub drukować pytania z zapisanych pytań. Aplikacja oferuje tryb ciemny i jasny, aby każdy mógł wybrać preferowany styl do nauki. Jest w pełni responsywna i wyposażona w funkcję PWA, co umożliwia dodanie jej do ekranu startowego urządzenia jak natywną aplikację. Strona zapewnia weryfikację użytkownika poprzez adres email i funkcję resetowania hasła. Posiada także panel administracyjny, przez który admin może zarządzać grami i treścią quizów. W przyszłości planuję rozszerzyć funkcjonalność o sekcję komentarzy, rankingi, gry rankingowe, możliwość rywalizacji z przyjaciółmi przez link i statystyki odpowiedzi na pytania.

# Wyniki wydajności według unlighthouse 💯

![](/READMEimages/stats1.png)
![](/READMEimages/stats2.png)

# Szczegółowy opis projektu

## Strona startowa - dark mode

![](/READMEimages/darkMode.png)

## Strona startowa - light mode

![](/READMEimages/lightMode.png)

## Panel administratora - edycja detali quizy

Administrator może zmieniać opis, nazwę oraz tryby gry quizu.

![](/READMEimages/EditDeatails.png)

## Panel administratora - aktywny quiz

Diody obok nazwy quizu w menu pokazują administratorowi czy quiz jest widczony dla użytkownika.

![](/READMEimages/editQuizVisibility.png)

## Panel administratora - tworzenie quizu

Administrator może stowrzyć nowy quiz.

![](/READMEimages/createQuiz.png)

## Panel administratora - usuwanie quizu

Administrator może usunąć istniejący quiz.

![](/READMEimages/deleteQuiz.png)

## Panel administratora - dodawanie pytań do quizu

Administrator może dodawać nowe pytania do quizu z poziomu strony.

![](/READMEimages/addQuestion.png)

## Panel administratora - zarządzanie pytaniami

Administrator może zobaczyć wszystkie pytania które posiada quiz i zarządzać nimi.

![](/READMEimages/adminAllQuestions.png)

## Panel administratora - zarządzanie pytaniami

Administrator może edytować pytania.

![](/READMEimages/editQuestion.png)

## Panel administratora - zarządzanie pytaniami

Administrator może usuwać pytania.

## ![](/READMEimages/deleteQuestion.png)

## Strona rejestracji

Formluarz zaczyna być walidowany w momencie kiedy użytkownik pierwszy raz wyśle formularz, następnie walidowany jest co wpisany znak.

![](/READMEimages/registerPage.png)

## Strona po rejestracji użytkownika

Po rejestracji użytkownika zostaje wysłany do niego email z linikiem aktywacyjnym.

![](/READMEimages/emailSendPAge.png)

## Próba logowania na nieaktywowane konto

Gdy będziemy chcieli się zalogować bez potwierdzenia adresu email dostaniemy błąd ponieważ konto nie zostało aktywowane.

![](/READMEimages/loginError.png)

## Otrzymany email

Gdy naciśniemy przycisk nasze konto zostanie aktywowane.

![](/READMEimages/activateEmail.png)

## Strona po aktywacji konta

![](/READMEimages/confirmRegister.png)

## Widok quizu

![](/READMEimages/quizDeatailsPage.png)

## Quiz - 1 pytanie

![](/READMEimages/1question.png)

## Quiz - 1 pytanie - prawidłowa odpowiedź

Przy prawidłowej odpowiedzi pojawia się confetti.

![](/READMEimages/1questionCorrect.png)

## Quiz - 1 pytanie - błędna odpowiedź

![](/READMEimages/1questionIncorrect.png)

## Quiz - 20 pytań

Jak wynik będzie większy od 90% to pojawi się confetti w nagrodę 😁

![](/READMEimages/20questions.png)

## Quiz - X pytań

Możemy wygenrowac quiz do maskymalnie 50 pytań chyba, że quiz nie posiada tyle pytań to do maksymalnej ilości pytań, która jest w bazie.

![](/READMEimages/Xquestions.png)

## Quiz - X pytań - wygenerowany quiz

![](/READMEimages/5questions.png)

## Quiz - pokaż wszystkie pytania

Pytania pobierane są z bazy po określonej ilości podanej przez użytkownika (domyślnie po 10).

![](/READMEimages/allQuestions.png)

## Quiz - drukwoanie testu - modal

Możemy wygenrować test maskymalnie z 50 pytaniami chyba, że quiz nie posiada tyle pytań to do maksymalnej ilości pytań, która jest w bazie.

![](/READMEimages/printModal.png)

## Quiz - drukwoanie testu - modal error

Błąd ponieważ podałem 51 pytań.

![](/READMEimages/printError.png)

## Quiz - drukwoanie testu - wygenerowany test

![](/READMEimages/test.png)

## Quiz - drukwoanie testu - wygenerowany test - odpwoedzi

![](/READMEimages/testCorrectAnswer.png)

Na końcu testu znajdują się odpowiedzi dla całego testu.

## Quiz - zapisane quziy

Wszyste quizy gdzie jest więcej niż jedno pytanie zapisują się i można je przeglądać.

![](/READMEimages/savedQuizzes.png)

## Quiz - podgląd zapisanego quizu

![](/READMEimages/savedQuizView.png)

## Quiz - zapisywanie pytań

Użytkownik może zapisywać pytania klikając w gwiazdkę.

![](/READMEimages/saveQuestion.png)

## Quiz - zapisane pytanie

Gdy użytkownik zapisze pytanie to gwiazdka się zmieni w wypełnioną oraz pojawi się komunikat.

![](/READMEimages/savedQuestion.png)

## Quiz - widok zapisanych pytań

Widok zapisanych pytań, które są podzielone według quizów, do których należą. Przy tych pytaniach mamy takie same opcje jak przy całym quizie czyli możemy je zobaczyć, wylosować jedno, wylosować kilka oraz wydrukować. Dodatkowo dochodzi opcja usunięcia wszystkich zapisanych pytań z jednego quizu.

![](/READMEimages/savedQuestions.png)

## Zmiana hasła

Użytkownik może zmienić swoje hasło w ustawieniach.

![](/READMEimages/changePassword.png)

## Reset hasła

Użytkownik może zresetować hasło jeśli go zapomni.

![](/READMEimages/resetPassword.png)

## Reset hasła

Po wpisaniu maila i kliknięciu przycisku pojawia sie informacja że instrukcja została wysłana na maila i użytkownik zostaje przekierowany na stronę główną.

![](/READMEimages/resetPasswordNotification.png)

## Reset hasła - mail

Użytkwnik dostaje maila z przekierowaniem na stronę z formularzem do zaminy hasła.

![](/READMEimages/resetPasswordMail.png)

## Reset hasła - formularz

![](/READMEimages/resetPasswordForm.png)

Po prawidłowym wypełnieniu formularza i kliknięciu przycisku pojawia sie informacja że hasło zostało zmienione i użytkownik zostaje przekierowany na stronę logowania.

## Reset hasła - potwierdzenie

![](/READMEimages/resetPasswordConfirm.png)
