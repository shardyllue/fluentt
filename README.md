# Fluentt

```
const fluentt = new Fluentt({
    echoMode: true,
    smartMode: {
        pathFile: "session.json"
    }
});

await fluentt.auth.login(login, password);
const timetable = await fluentt.timetable.get();

console.log(timetable)
```