# Отсутствующие параметры в запросе Kiwi API

Этот документ сравнивает параметры из официальной документации Kiwi API с текущим запросом пользователя, чтобы выявить недостающие параметры, которые могут быть причиной ошибки `400 Bad Request`.

## 1. Пример запроса из документации Kiwi API

```
https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=Country%3AGB&destination=City%3Adubrovnik_hr&currency=usd&locale=en&adults=1&children=0&infants=0&handbags=1&holdbags=0&cabinClass=ECONOMY&sortBy=QUALITY&sortOrder=ASCENDING&applyMixedClasses=true&allowReturnFromDifferentCity=true&allowChangeInboundDestination=true&allowChangeInboundSource=true&allowDifferentStationConnection=true&enableSelfTransfer=true&allowOvernightStopover=true&enableTrueHiddenCity=true&enableThrowAwayTicketing=true&outbound=SUNDAY%2CWEDNESDAY%2CTHURSDAY%2CFRIDAY%2CSATURDAY%2CMONDAY%2CTUESDAY&transportTypes=FLIGHT&contentProviders=FLIXBUS_DIRECTS%2CFRESH%2CKAYAK%2CKIWI&limit=20
```

## 2. Текущий запрос пользователя

```
https://kiwi-com-cheap-flights.p.rapidapi.com/round-trip?source=airport:New+York+(NYCA)+-+New+York&destination=airport:Los+Angeles+(LAXA)+-+Los+Angeles&currency=usd&locale=en&adults=1&children=0&infants=0&cabinClass=ECONOMY&limit=20&dateFrom=2025-09-13&dateTo=2025-09-20
```

## 3. Сравнение и недостающие параметры

Ниже приведен список параметров, которые присутствуют в примере из документации Kiwi API, но отсутствуют в текущем запросе пользователя:

- `handbags`: Количество ручной клади.
- `holdbags`: Количество регистрируемого багажа.
- `sortBy`: Критерий сортировки результатов (например, `QUALITY`, `PRICE`, `DURATION`).
- `sortOrder`: Порядок сортировки (например, `ASCENDING`, `DESCENDING`).
- `applyMixedClasses`: Разрешить смешанные классы обслуживания.
- `allowReturnFromDifferentCity`: Разрешить возврат из другого города.
- `allowChangeInboundDestination`: Разрешить изменение пункта назначения на обратном пути.
- `allowChangeInboundSource`: Разрешить изменение пункта отправления на обратном пути.
- `allowDifferentStationConnection`: Разрешить пересадку на другой станции.
- `enableSelfTransfer`: Разрешить самостоятельную пересадку.
- `allowOvernightStopover`: Разрешить ночную остановку.
- `enableTrueHiddenCity`: Включить "скрытый город" (hidden city ticketing).
- `enableThrowAwayTicketing`: Включить "выброшенный билет" (throwaway ticketing).
- `outbound`: Дни недели для вылета (используется для гибких дат, в отличие от `dateFrom`/`dateTo` для конкретных дат).
- `transportTypes`: Типы транспорта (например, `FLIGHT`, `BUS`).
- `contentProviders`: Поставщики контента (например, `FLIXBUS_DIRECTS`, `FRESH`, `KAYAK`, `KIWI`).

**Примечание:** Некоторые из этих параметров являются необязательными или используются для более сложных сценариев поиска (например, гибкие даты, смешанные классы). Однако их отсутствие может влиять на результаты или вызывать ошибки, если API ожидает их наличия с определенными значениями по умолчанию.

Также стоит убедиться, что значения для `source` и `destination` (например, `airport:New+York+(NYCA)+-+New+York`) корректно распознаются API Kiwi. Хотя ваш пример работает, иногда API может быть чувствителен к формату и предпочитать коды IATA (например, `airport:JFK`).
