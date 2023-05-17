# moodup-recruitment-task
Zadanie:

Napisz aplikację webową, która będzie wyświetlać przepisy kucharskie różnych potraw (wystarczą 2-3, jedną masz już w załącznikach). Aplikacja webowa czyli interfejs WWW (strona internetowa) napisana w Javascript (Node.js).
 

Wymagana funkcjonalność:

Rejestracja nowego użytkownika (wystarczy e-mail i hasło).
Logowanie użytkownika (zawartość aplikacji powinna być dostępna tylko dla zalogowanych użytkowników).
Implementacja 2 typów użytkowników: zwykły użytkownik oraz admin (nie jest wymagana możliwość rejestracji konta admina z poziomu aplikacji - konto admina może być dodane "na sztywno" do bazy danych).
Strona powitalna z listą przepisów do wyboru (*plusem będzie implementacja paginacji).
Po wyborze przepisu wyświetlenie go na kolejnej stronie (lub przeładowanie zawartości obecnej). 
Dla zalogowanych użytkowników możliwość dodania nowego przepisu oraz edycja i usunięcie istniejącego przepisu (oczywiście przepisu, którego autorem jest zalogowany użytkownik).
Dla zalogowanego administratora powinna być możliwość również edytowania i usuwania przepisów innych użytkowników.
Zdjęcia przepisów powinny być przechowywane na zewnętrznym serwisie (np. Amazon S3).
 
Dodatkowa funkcjonalność - nieobowiązkowe, ale dodatkowo punktowane:

Stworzenie dokumentacji API (np. z użyciem narzędzia Swagger).
Implementacja wyszukiwania przepisu po nazwie (partial lub full text search).
Rozdzielenie aplikacji na dwie osobne aplikacje (jedna odpowiedzialna za backend w Node.js, a druga za frontend).
Zastosowanie RWD.
 
Dodatkowe informacje:

Możesz wykorzystać dowolne biblioteki jakie Ci będą potrzebne do napisania aplikacji.
Wykorzystaj dowolną bazę danych.
Uwierzytelnianie użytkowników powinno być oparte o tokeny, lub sesję.
Oczekiwane technologie: Node.js, Express.js lub NestJS, TypeScript (preferowany) lub JavaScript. (*plusem będzie użycie frontendowego frameworka, np. Angular).
Proszę nie korzystaj z gotowych szablonów (co wcale nie oznacza że nie możesz się na nich wzorować).
Zaprojektuj aplikację tak, by korzystała z nowoczesnych wzorców projektowania aplikacji webowych. Zwróć uwagę przede wszystkim na schludny i czytelny kod oraz sensowną strukturę projektu.