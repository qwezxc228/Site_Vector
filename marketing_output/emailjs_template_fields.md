# EmailJS Template Fields for VECTOR

Почта для заявок:

- `yarikbuzwd@gmail.com`

Подключенные данные:

- `Service ID`: `service_z0yb2uj`
- `Template ID`: `template_daoetpi`
- `Public Key`: `uI5IHBISMWrCNYuSe`

## Поля, которые отправляет квиз на `/detail`

Используй их в шаблоне EmailJS:

- `{{lead_name}}`
- `{{lead_phone}}`
- `{{lead_service}}`
- `{{lead_car_type}}`
- `{{lead_timing}}`
- `{{lead_goal}}`
- `{{lead_comment}}`
- `{{source}}`

## Рекомендуемый шаблон письма

Тема:

`Новая заявка с квиза VECTOR PRO`

Тело письма:

```text
Новая заявка с сайта VECTOR PRO

Имя: {{lead_name}}
Телефон: {{lead_phone}}
Услуга: {{lead_service}}
Авто / состояние: {{lead_car_type}}
Когда хочет приехать: {{lead_timing}}
Что важнее всего: {{lead_goal}}
Комментарий: {{lead_comment}}
Источник: {{source}}
```

## Важно

Если в шаблоне EmailJS есть поле получателя вроде `to_email`, задай в нем:

`yarikbuzwd@gmail.com`
