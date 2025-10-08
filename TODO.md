- [x] routes med behörighet.

  - Vad händer när jag kommer till ex. /dashboard utan att vara inloggad?
  - Vad visas när jag försöker navigera till admin eller likande och inte har behörighet? (/unautorized)?

- [x] Når inte /signin eller /register när man är inloggad
- [x] Kontrollera att sessions faktiskt försvinner efter expireDate på Både oAutb och Credentials.

  - Cookie försvinner efter expireDate.
  - Rester av sessions i databasen kan ibland ligga kvar - Detta resnsas med github workflow.

- [x] Unchecked runtime.lastError: The message port closed before a response was received. Det är ett oskyldigt devtools/extension-fel, inte ett problem med din kodbas.
- [ ] Kolla på faktiskt aktiva sessions.

  - Just nu kan det bli massa rester av gamla sessioner i databasen. När jag ska använda sessioner från databasen för att exempelvis logga ut manuellt från andra enheter så vill jag egentligen bara se de faktiskta sessionerna. Hur ska jag tänka här? behöver jag mer information i sessionerna i databasen? ip? location? device? Hur ska jag kunna veta att en session faktiskt är aktiv på riktigt (i real-tid). och är detta samma som när man kan se om någon är online eller inte? Det är saker jag funderar på

- [ ] verifering vid registrering med credentials.
- [ ] automatisk inlogg efter lyckad registrering (verifierad credentials signup)
- [ ] Toggle light- darkmode konfiguration. Ska den även gå på systeminställningar? det tar ett tag innan darkmode slås på när sidan uppdateras.

  Funderingar:

- [ ] Credential "account" får ingen av: "refresh_token, access_token, expires_at, token_type, scope, id_token, session_state"
- [ ] Google "account får ingen av: "refresh_token, session_state"
- [ ] Discord "account får ingen av: "id_token, session_state"
