- [ ] routes med behörighet.
- [ ] verifering vid registrering med credentials.
- [ ] automatisk inlogg efter lyckad registrering (verifierad credentials signup)
- [ ] Toggle light- darkmode konfiguration. Ska den även gå på systeminställningar?
- [ ] Credential "account" får ingen av: "refresh_token, access_token, expires_at, token_type, scope, id_token, session_state"
- [ ] Google "account får ingen av: "refresh_token, session_state"
- [ ] Discord "account får ingen av: "id_token, session_state"

1. När jag har registrerat en användare > är inloggad på denna användare > navigerar till /signin eller /register och väljer en annan mail med google-oauth (medans jag fortfarande är inloggad sedan tidigare) > ingen ny användare skapas > jag kommer till dashboard och är fortfarande inloggad på den första användaren > kollar i prisma och ser att den användaren som jag är inloggad har fått ett "account" -row.

   Det är som att jag kom runt systemet och råkade länka de båda google-kontona med samma user. Detta ska inte kunna ske. Nu när jag har loggar in på mail nr 2 så blir jag ändå inloggad på usern (den enda usern) med två account.

2.
