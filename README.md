#Detta är kalender komponenten för GEAB#

Eftersom TFS inte fixar filnamn som är längre än 260 tecken så ligger källkoden kvar här och hanteras av GIT (som är bra mycket bättre :smile:)

Starta en powershell, gå till den katalogen och kör `npm install` första gången så laddas nödvändiga paket ner.

Om man behöver ändra kalendern så gör ändringarna och kör `npm run prod` då läggs filerna under Assets/calendar
Glöm inte följande för att checka in ändringar:

På GEAB's testmaskin ligger filerna i "c:\git\react-calendar"

1.  `git add --all`
1.  `git commit -m "kommentar"`
1.  `git push`

Om man vill ta ner ändringar från denna repo:
1.  git pull
Glöm inte att köra `npm run prod`

Om man vill underlätta utveckling kan man använda **"npm run dev"**. Då startas en utvecklingsserver som publicerar kalendern på **localhost:8090**. Den uppdateras automatiskt om någon fil ändras.

###Det finns scripts för att bygga på GEAB's utvecklingsmaskin.###

`npm run geabtest` för att bygga en testversion som inte komprimerar och som skapar map filer.
`npm run geabprod` för att bygga prod kod som komprimerar m.m.