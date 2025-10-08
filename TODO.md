- [ ] routes med behörighet.

  - Vad händer när jag kommer till ex. /dashboard utan att vara inloggad?
  - Vad visas när jag försöker navigera till admin eller likande och inte har behörighet? (/unautorized)?

- [x] Når inte /signin eller /register när man är inloggad
- [x] Kontrollera att sessions faktiskt försvinner efter expireDate på Både oAutb och Credentials.

  - Cookie försvinner efter expireDate.
  - Rester av sessions i databasen kan ibland ligga kvar - Detta resnsas med github workflow.

- [ ] Unchecked runtime.lastError: The message port closed before a response was received. Varför får jag detta i konsolen?
- [ ] verifering vid registrering med credentials.
- [ ] automatisk inlogg efter lyckad registrering (verifierad credentials signup)
- [ ] Toggle light- darkmode konfiguration. Ska den även gå på systeminställningar? det tar ett tag innan darkmode slås på när sidan uppdateras.

  Funderingar:

- [ ] Credential "account" får ingen av: "refresh_token, access_token, expires_at, token_type, scope, id_token, session_state"
- [ ] Google "account får ingen av: "refresh_token, session_state"
- [ ] Discord "account får ingen av: "id_token, session_state"
