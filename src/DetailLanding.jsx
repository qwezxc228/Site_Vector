import { useEffect, useMemo, useRef, useState } from 'react';
import photoOne from './images/photo_1.jpg';
import photoTwo from './images/photo_2.jpg';
import photoThree from './images/photo_3.jpg';

const THANK_YOU_ACCESS_KEY = 'vector_detail_quiz_completed';
const METRIKA_ID = 108771242;
const SUBMIT_THROTTLE_MS = 30000;
const MIN_QUIZ_FILL_MS = 4000;
const LAST_SUBMIT_KEY = 'vector_detail_last_submit';
const YANDEX_REVIEWS_URL = 'https://yandex.ru/maps/-/CPGwRXIf';

const emailJsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const heroBenefits = [
  'Бесплатный осмотр ЛКП перед расчетом',
  'Керамика кожи в подарок к комплексу',
  'Честный срок, удобный заезд, кофе и зона ожидания',
];

const proof = [
  ['10 лет', 'работаем с новыми, городскими и премиум-авто'],
  ['За 1 день', 'сделаем популярные детейлинг-комплексы и вернем авто уже завтра'],
  ['6 мес.', 'гарантия на услуги после выдачи автомобиля'],
  ['500+', 'авто уже прошли защиту кузова и детейлинг в VECTOR PRO'],
];

const services = [
  {
    title: 'Полировка + керамика',
    price: 'от 40 000 ₽',
    text: 'Убираем паутину и мелкие царапины, возвращаем глубокий блеск и закрываем кузов защитным составом.',
  },
  {
    title: 'Оклейка зон риска',
    price: 'от 65 000 ₽',
    text: 'Капот, бампер, крылья, стойки, пороги, фары, ручки и зеркала получают антигравийную защиту. Заберете автомобиль уже завтра.',
  },
  {
    title: 'Химчистка салона',
    price: 'от 10 000 ₽',
    text: 'Удаляем пятна, запахи и следы эксплуатации. Бережно работаем с кожей, пластиком и текстилем.',
  },
  {
    title: 'Тонировка стекол',
    price: 'от 10 000 ₽',
    text: 'Аккуратная установка пленки для комфорта в салоне, приватности и более собранного внешнего вида авто.',
  },
];

const reasons = [
  {
    title: 'Сначала осмотр, потом цена',
    text: 'Менеджер и мастер сначала смотрят состояние кузова или салона, а уже потом предлагают честный вариант без лишних работ.',
  },
  {
    title: 'Без недельного простоя',
    text: 'Популярные комплексы делаем за день. Это особенно важно, если автомобиль нужен вам каждый день.',
  },
  {
    title: 'Понимаем ценность хорошего авто',
    text: 'Работаем с BMW, Mercedes, Audi, новыми китайскими авто и премиум-сегментом, где особенно важны аккуратность и детали.',
  },
  {
    title: 'Результат, который видно сразу',
    text: 'Блеск, защита, чистый салон или подготовка к продаже - до начала работ фиксируем задачу и ожидаемый эффект.',
  },
];

const cases = [
  {
    img: photoThree,
    title: 'BMW X7',
    tag: 'Полировка + керамика',
    text: 'Глубокий черный цвет, ровные отражения и защита после восстановления блеска.',
  },
  {
    img: photoOne,
    title: 'Bentley Bentayga',
    tag: 'Премиум-уход',
    text: 'Деликатная работа с дорогим ЛКП и внимание к деталям, которые клиент замечает сразу.',
  },
  {
    img: photoTwo,
    title: 'BMW 3 Series',
    tag: 'Защита кузова',
    text: 'Городской автомобиль выдали на следующий день: быстрый цикл работ и аккуратная выдача.',
  },
];

const packages = [
  {
    name: 'Fresh Look',
    target: 'Авто 2-5 лет',
    price: 'от 50 000 ₽',
    points: ['Глубокая полировка кузова', 'Керамическое покрытие', 'Осмотр ЛКП бесплатно'],
  },
  {
    name: 'New Car Protect',
    target: 'Новый автомобиль',
    price: 'от 80 000 ₽',
    points: ['Оклейка зон риска', 'Защита фар, капота и бампера', 'Заберете авто уже завтра'],
  },
  {
    name: 'Interior Reset',
    target: 'Салон и комфорт',
    price: 'от 10 000 ₽',
    points: ['Детейлинг-химчистка', 'Уход за кожей и пластиком', 'Удаление запахов и пятен'],
  },
];

const faq = [
  {
    q: 'Сколько занимает полировка + керамика?',
    a: 'Чаще всего укладываемся в 1 день. Точный срок скажем после осмотра ЛКП и состояния автомобиля.',
  },
  {
    q: 'Можно ли приехать на новом автомобиле сразу после салона?',
    a: 'Да, это один из лучших сценариев для защиты кузова. Особенно если хотите сохранить ЛКП с первых дней.',
  },
  {
    q: 'Как понять, что именно лучше сделать: керамику, полировку или пленку?',
    a: 'Для этого и нужен осмотр. Мы не навязываем максимум работ, а предлагаем то, что действительно даст нужный результат.',
  },
];

const quizSteps = [
  {
    key: 'service',
    title: 'Какая услуга интересует в первую очередь?',
    subtitle: 'Так менеджер сразу поймет, какой специалист нужен.',
    goal: 'quiz_step_1',
    options: [
      { value: 'Полировка + керамика', hint: 'Вернуть блеск и защитить кузов' },
      { value: 'Оклейка зон риска', hint: 'Защитить новый авто от сколов' },
      { value: 'Химчистка салона', hint: 'Освежить интерьер и убрать запахи' },
      { value: 'Тонировка стекол', hint: 'Комфорт, стиль, защита от солнца' },
      { value: 'Нужна консультация', hint: 'Помогите выбрать лучший вариант' },
    ],
  },
  {
    key: 'branch',
    title: 'На какой филиал вам удобнее приехать?',
    subtitle: 'Так менеджер сразу предложит запись в подходящую локацию.',
    goal: 'quiz_step_2',
    options: [
      { value: 'Жуков проезд 15Ас2', hint: 'Павелецкая' },
      { value: 'Жуков проезд 19', hint: 'Павелецкая' },
      { value: 'Садовнический проезд', hint: 'Новокузнецкая' },
      { value: 'Щелковский проезд 7А', hint: 'Щелковская' },
      { value: 'ул. Рассветная аллея 5А', hint: 'Новогиреево' },
      { value: 'Клемента Готвальда 4б', hint: 'Подольск' },
      { value: 'Пятницкое шоссе', hint: 'Митино' },
      { value: 'Тестовская 10', hint: 'Москва-Сити' },
      { value: 'Нужна подсказка по филиалу', hint: 'Помогите выбрать самый удобный вариант' },
    ],
  },
  {
    key: 'carType',
    title: 'Какой у вас автомобиль и его состояние?',
    subtitle: 'Это помогает точнее оценить объем работ и бюджет.',
    goal: 'quiz_step_3',
    options: [
      { value: 'Новый авто из салона', hint: 'Нужна защита с первых дней' },
      { value: 'Авто 2-5 лет', hint: 'Нужно освежить внешний вид' },
      { value: 'Премиум авто', hint: 'Важны деликатность и сервис' },
      { value: 'Перед продажей', hint: 'Хочу повысить визуальную ценность' },
      { value: 'Есть царапины / следы эксплуатации', hint: 'Нужен осмотр и рекомендации' },
    ],
  },
  {
    key: 'timing',
    title: 'Когда удобно приехать?',
    subtitle: 'Так менеджер предложит реалистичное окно записи.',
    goal: 'quiz_step_4',
    options: [
      { value: 'Сегодня или завтра', hint: 'Нужен быстрый слот' },
      { value: 'В течение недели', hint: 'Готов записаться в ближайшие дни' },
      { value: 'В течение месяца', hint: 'Пока планирую и сравниваю' },
      { value: 'Сначала хочу узнать цену', hint: 'Нужен расчет и консультация' },
    ],
  },
  {
    key: 'goal',
    title: 'Что для вас важнее всего?',
    subtitle: 'Ответ поможет сделать более точный оффер уже в первом звонке.',
    goal: 'quiz_step_5',
    options: [
      { value: 'Защитить кузов и ЛКП', hint: 'Главное - долговечность и защита' },
      { value: 'Вернуть блеск как у нового авто', hint: 'Главное - внешний вид и ухоженность' },
      { value: 'Убрать пятна, запахи и грязь', hint: 'Главное - чистый салон и комфорт' },
      { value: 'Комфорт и приватность в салоне', hint: 'Главное - тонировка / атермалка' },
      { value: 'Нужен честный совет, что лучше сделать', hint: 'Хочу консультацию без навязывания' },
    ],
  },
];

const initialAnswers = {
  service: '',
  branch: '',
  carType: '',
  timing: '',
  goal: '',
  name: '',
  phone: '',
  comment: '',
};

const legalContent = {
  privacy: {
    title: 'Политика конфиденциальности',
    sections: [
      {
        heading: '1. Общие положения',
        body: 'Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сайта VECTOR PRO, которые оставляют заявки, проходят опросы, отправляют формы обратной связи или иным способом передают свои данные через сайт.',
      },
      {
        heading: '2. Какие данные обрабатываются',
        body: 'Могут обрабатываться имя, номер телефона, выбранная услуга, филиал, сведения об автомобиле, желаемые сроки обращения, комментарий пользователя, а также технические данные: IP-адрес, cookie, сведения о браузере, UTM-метки, referrer и обезличенные аналитические события.',
      },
      {
        heading: '3. Цели обработки',
        body: 'Персональные данные обрабатываются для связи с пользователем, подготовки расчета стоимости, записи на услугу, сопровождения заявки, улучшения качества сервиса, аналитики рекламных кампаний и исполнения требований законодательства Российской Федерации.',
      },
      {
        heading: '4. Правовые основания',
        body: 'Обработка осуществляется на основании добровольного согласия субъекта персональных данных, а также в случаях, когда обработка необходима для исполнения запроса пользователя до заключения договора на оказание услуг.',
      },
      {
        heading: '5. Передача данных третьим лицам',
        body: 'Данные могут передаваться только тем сервисам, которые технически обеспечивают прием и доставку заявок, аналитику, уведомления и сопровождение обращения пользователя. Передача осуществляется в объеме, необходимом для оказания соответствующей услуги.',
      },
      {
        heading: '6. Хранение и защита',
        body: 'Оператор принимает разумные организационные и технические меры для защиты персональных данных от неправомерного доступа, утраты, изменения, раскрытия и иных неправомерных действий.',
      },
      {
        heading: '7. Права пользователя',
        body: 'Пользователь вправе запросить уточнение, обновление, ограничение обработки или удаление своих персональных данных, а также отозвать ранее данное согласие, направив соответствующее обращение по контактным каналам компании.',
      },
      {
        heading: '8. Аналитика и cookie',
        body: 'На сайте могут использоваться системы аналитики, включая Яндекс.Метрику, а также cookie и иные технологии для анализа поведения пользователей и оценки эффективности рекламы.',
      },
    ],
  },
  consent: {
    title: 'Согласие на обработку персональных данных',
    sections: [
      {
        heading: '1. Суть согласия',
        body: 'Я, как пользователь сайта, свободно, своей волей и в своем интересе даю согласие на обработку моих персональных данных, указанных в формах сайта VECTOR PRO, включая имя, номер телефона, выбранную услугу, филиал, сведения об автомобиле, предпочтительные сроки обращения и иные данные, указанные мною добровольно.',
      },
      {
        heading: '2. Цели обработки',
        body: 'Согласие дается для связи со мной, подготовки расчета стоимости, записи на услугу, консультирования, обработки заявки, ведения внутреннего учета обращений, а также для оценки эффективности рекламных каналов и улучшения качества сервиса.',
      },
      {
        heading: '3. Действия с данными',
        body: 'Согласие распространяется на сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу техническим подрядчикам, блокирование и удаление персональных данных.',
      },
      {
        heading: '4. Срок действия согласия',
        body: 'Согласие действует до момента достижения целей обработки либо до его отзыва пользователем, если иное не требуется законодательством Российской Федерации.',
      },
      {
        heading: '5. Отзыв согласия',
        body: 'Согласие может быть отозвано пользователем путем направления запроса по контактным данным компании. Отзыв согласия не влияет на законность обработки, осуществленной до его отзыва.',
      },
    ],
  },
};

function reachGoal(goal) {
  if (typeof window !== 'undefined' && typeof window.ym === 'function') {
    window.ym(METRIKA_ID, 'reachGoal', goal);
  }
}

function LegalDocumentPage({ title, sections }) {
  return (
    <div className="min-h-screen bg-zinc-950 px-3 py-10 text-white sm:px-4 sm:py-14">
      <div className="mx-auto max-w-4xl rounded-[24px] border border-white/10 bg-zinc-900 p-6 shadow-2xl shadow-black/20 sm:rounded-3xl sm:p-10">
        <a href="/detail" className="text-sm font-semibold text-amber-300 hover:text-amber-200">
          ← Вернуться на /detail
        </a>
        <h1 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">{title}</h1>
        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-black text-white sm:text-2xl">{section.heading}</h2>
              <p className="mt-3 text-sm leading-7 text-zinc-300 sm:text-base">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatPhoneInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  const normalized = digits[0] === '8' ? `7${digits.slice(1)}` : digits;
  const parts = normalized.match(/^(\d)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
  if (!parts) return `+${normalized}`;
  const [, country, code, first, second, third] = parts;
  let result = `+${country}`;
  if (code) result += ` (${code}`;
  if (code.length === 3) result += ')';
  if (first) result += ` ${first}`;
  if (second) result += `-${second}`;
  if (third) result += `-${third}`;
  return result;
}

function DetailThankYouPage() {
  const hasAccess =
    typeof window !== 'undefined' && window.sessionStorage.getItem(THANK_YOU_ACCESS_KEY) === 'true';

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-zinc-950 px-4 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-zinc-900 p-8 text-center shadow-2xl shadow-black/30">
          <div className="text-sm font-semibold uppercase tracking-wide text-amber-300">VECTOR PRO</div>
          <h1 className="mt-4 text-4xl font-black sm:text-5xl">Эта страница доступна после заявки</h1>
          <p className="mt-4 text-base leading-7 text-zinc-300 sm:text-lg">
            Сначала пройдите опрос на лендинге, чтобы оставить заявку. После успешной отправки вы автоматически попадете сюда.
          </p>
          <a
            href="/detail"
            className="mt-8 inline-flex rounded-lg bg-amber-300 px-6 py-4 text-base font-black text-black transition hover:bg-amber-200"
          >
            Перейти к квизу
          </a>
        </div>
      </div>
    );
  }

  return (
    <div id="top" className="min-h-screen bg-zinc-950 text-white">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <img src={photoOne} alt="VECTOR PRO" className="h-full w-full object-cover object-center" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/85 via-zinc-950/80 to-zinc-950" />
        <div className="mx-auto flex min-h-screen max-w-5xl items-center px-4 py-16">
          <div className="w-full rounded-3xl border border-white/10 bg-black/55 p-8 shadow-2xl shadow-black/40 backdrop-blur sm:p-12">
            <div className="text-sm font-semibold uppercase tracking-wide text-amber-300">Спасибо за заявку</div>
            <h1 className="mt-4 text-4xl font-black leading-none sm:text-6xl">
              Мы получили ваши ответы и скоро свяжемся с вами
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-200 sm:text-xl sm:leading-8">
              Менеджер уже видит, какая услуга вам нужна, какой у вас автомобиль, в какой филиал удобно приехать и когда
              вам комфортнее записаться. Это помогает не тратить время на лишние уточнения и быстрее дать точный расчет.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-2xl font-black text-amber-300">1</div>
                <div className="mt-2 text-sm leading-6 text-zinc-300">Проверим заявку и подготовим лучшиее предложение под вашу задачу</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-2xl font-black text-amber-300">2</div>
                <div className="mt-2 text-sm leading-6 text-zinc-300">Свяжемся по телефону и предложим удобное время записи</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-2xl font-black text-amber-300">3</div>
                <div className="mt-2 text-sm leading-6 text-zinc-300">Зафиксируем понятный объем работ, цену и срок до начала работ</div>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="tel:+79850187878"
                onClick={() => reachGoal('phone_click')}
                className="inline-flex items-center justify-center rounded-lg bg-amber-300 px-6 py-4 text-base font-black text-black transition hover:bg-amber-200"
              >
                Позвонить сейчас
              </a>
              <a
                href="/detail"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-6 py-4 text-base font-bold text-white transition hover:border-amber-300 hover:text-amber-300"
              >
                Вернуться на лендинг
              </a>
            </div>
            <p className="mt-6 text-xs leading-5 text-zinc-500">
              Спасибо за заявку <code>/detail/thanks</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailLanding() {
  const isThankYouPage = typeof window !== 'undefined' && window.location.pathname === '/detail/thanks';
  const isPrivacyPage = typeof window !== 'undefined' && window.location.pathname === '/detail/privacy';
  const isConsentPage = typeof window !== 'undefined' && window.location.pathname === '/detail/consent';
  const [quizOpen, setQuizOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [submitState, setSubmitState] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [antiSpamField, setAntiSpamField] = useState('');
  const trackedStepGoalsRef = useRef(new Set());
  const quizOpenedAtRef = useRef(0);

  const totalSteps = quizSteps.length + 1;
  const currentStep = quizSteps[stepIndex];
  const isContactStep = stepIndex === quizSteps.length;
  const progress = useMemo(() => Math.round(((stepIndex + 1) / totalSteps) * 100), [stepIndex, totalSteps]);

  useEffect(() => {
    const reputationHeadings = Array.from(document.querySelectorAll('h2')).filter((heading) =>
      heading.textContent?.trim().includes('Отзывы и впечатления клиентов')
    );

    reputationHeadings.forEach((heading) => {
      const reviewSection = heading.closest('section');
      if (reviewSection) {
        reviewSection.remove();
      }
    });
  }, []);

  useEffect(() => {
    if (!quizOpen || isContactStep) return;
    const goal = quizSteps[stepIndex]?.goal;
    if (goal && !trackedStepGoalsRef.current.has(goal)) {
      trackedStepGoalsRef.current.add(goal);
      reachGoal(goal);
    }
  }, [quizOpen, isContactStep, stepIndex]);

  useEffect(() => {
    if (!quizOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [quizOpen]);

  function openQuiz() {
    setQuizOpen(true);
    setSubmitState('idle');
    setErrorMessage('');
    quizOpenedAtRef.current = Date.now();
    reachGoal('quiz_open');
  }

  function closeQuiz() {
    if (submitState === 'submitting') return;
    setQuizOpen(false);
  }

  function handleOptionSelect(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrorMessage('');
    setTimeout(() => {
      setStepIndex((prev) => Math.min(prev + 1, quizSteps.length));
    }, 120);
  }

  function handleBack() {
    if (submitState === 'submitting') return;
    if (stepIndex === 0) {
      closeQuiz();
      return;
    }
    setErrorMessage('');
    setStepIndex((prev) => prev - 1);
  }

  function handleContactChange(field, value) {
    setAnswers((prev) => ({
      ...prev,
      [field]: field === 'phone' ? formatPhoneInput(value) : value,
    }));
    setErrorMessage('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const now = Date.now();

    if (antiSpamField.trim()) {
      setErrorMessage('Попробуйте отправить заявку еще раз.');
      return;
    }

    if (quizOpenedAtRef.current && now - quizOpenedAtRef.current < MIN_QUIZ_FILL_MS) {
      setErrorMessage('Пожалуйста, проверьте ответы и попробуйте отправить заявку еще раз.');
      return;
    }

    const lastSubmitAt = Number(window.localStorage.getItem(LAST_SUBMIT_KEY) || '0');
    if (lastSubmitAt && now - lastSubmitAt < SUBMIT_THROTTLE_MS) {
      setErrorMessage('Заявка уже отправлялась недавно. Попробуйте снова чуть позже.');
      return;
    }

    if (!answers.name.trim()) {
      setErrorMessage('Укажите имя, чтобы менеджер мог обратиться к вам лично.');
      return;
    }

    if (answers.phone.replace(/\D/g, '').length < 11) {
      setErrorMessage('Укажите корректный номер телефона для связи.');
      return;
    }

    if (!consentAccepted) {
      setErrorMessage('Нужно подтвердить согласие на обработку персональных данных.');
      return;
    }

    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      setErrorMessage('Нужно добавить ключи EmailJS в .env, чтобы квиз отправлял заявки.');
      return;
    }

    setSubmitState('submitting');
    setErrorMessage('');

    const payload = {
      service_id: emailJsConfig.serviceId,
      template_id: emailJsConfig.templateId,
      user_id: emailJsConfig.publicKey,
      template_params: {
        lead_name: answers.name.trim(),
        lead_phone: answers.phone.trim(),
        lead_service: answers.service,
        lead_branch: answers.branch,
        lead_car_type: answers.carType,
        lead_timing: answers.timing,
        lead_goal: answers.goal,
        lead_comment: answers.comment.trim() || 'Без комментария',
        source: 'VECTOR PRO /detail quiz',
      },
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`EmailJS responded with ${response.status}`);
      }

      window.localStorage.setItem(LAST_SUBMIT_KEY, String(now));
      reachGoal('quiz_submit');

      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(THANK_YOU_ACCESS_KEY, 'true');
        window.location.href = '/detail/thanks';
      }
    } catch (error) {
      setSubmitState('idle');
      setErrorMessage('Не удалось отправить заявку. Проверьте EmailJS и попробуйте еще раз.');
    }
  }

  if (isThankYouPage) {
    return <DetailThankYouPage />;
  }

  if (isPrivacyPage) {
    return <LegalDocumentPage title={legalContent.privacy.title} sections={legalContent.privacy.sections} />;
  }

  if (isConsentPage) {
    return <LegalDocumentPage title={legalContent.consent.title} sections={legalContent.consent.sections} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 sm:py-4">
          <a href="#top" className="flex min-w-0 items-center gap-3" aria-label="VECTOR PRO">
            <img
              src="https://i.pinimg.com/736x/e4/71/17/e471179e1459e8428cc88f4542a6ce23.jpg"
              alt="VECTOR PRO"
              className="h-7 w-auto sm:h-9"
            />
            <span className="truncate text-lg font-bold text-amber-300 sm:text-3xl">VECTOR PRO</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#services" className="hover:text-amber-300">Услуги</a>
            <a href="#cases" className="hover:text-amber-300">Работы</a>
            <a href="#price" className="hover:text-amber-300">Цены</a>
            <a href="#faq" className="hover:text-amber-300">FAQ</a>
          </nav>
          <button
            type="button"
            data-quiz-trigger="detailing"
            data-service="vector-detailing"
            onClick={openQuiz}
            className="shrink-0 rounded-lg bg-amber-300 px-3 py-2.5 text-xs font-black text-black transition hover:bg-amber-200 sm:px-4 sm:py-3 sm:text-sm"
          >
            Рассчет стоимости
          </button>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden pt-[4.5rem] sm:pt-24">
          <div className="absolute inset-0 -z-20">
            <img
              src={photoTwo}
              alt="Детейлинг автомобиля VECTOR PRO"
              className="h-full w-full object-cover object-[58%_center] sm:object-center"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-zinc-950/62 to-zinc-950" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(9,9,11,0.94)_0%,rgba(9,9,11,0.78)_48%,rgba(9,9,11,0.24)_100%)]" />

          <div className="mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-start gap-5 px-3 pb-4 pt-4 sm:min-h-[calc(100vh-92px)] sm:gap-8 sm:px-4 sm:pb-6 sm:pt-6 md:grid-cols-[1.08fr_0.92fr] md:items-center md:gap-12 md:pb-10 md:pt-8">
            <div className="max-w-3xl rounded-[24px] border border-white/10 bg-black/40 p-4 shadow-2xl shadow-black/20 backdrop-blur-sm sm:rounded-[28px] sm:p-6 md:p-7">
              <div className="mb-3 inline-flex max-w-full rounded-full border border-amber-300/50 bg-black/65 px-3 py-1.5 text-xs font-semibold text-amber-200 backdrop-blur sm:mb-4 sm:px-4 sm:py-2 sm:text-sm">
                Детейлинг в Москве: блеск, защита и чистый салон уже сегодня!
              </div>

              <h1 className="text-[2rem] font-black leading-[0.94] text-white sm:text-5xl lg:text-6xl">
                Вернем автомобилю блеск, защитим кузов и запишем вас в течение получаса
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-100 sm:mt-4 sm:text-lg sm:leading-8">
                Полировка + керамика, оклейка зон риска, химчистка и тонировка в VECTOR PRO. Пройдите короткий опрос и
                получите быстрый, понятный и честный расчет уже под ваш автомобиль.
              </p>

              <div className="mt-4 grid gap-2 sm:mt-5 sm:max-w-2xl sm:grid-cols-3 sm:gap-3">
                {heroBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-2xl border border-white/10 bg-black/55 px-3 py-3 text-xs font-medium leading-5 text-zinc-100 backdrop-blur sm:px-4 sm:text-sm"
                  >
                    {benefit}
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-2.5 sm:mt-6 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  data-quiz-trigger="detailing"
                  data-service="vector-detailing"
                  onClick={openQuiz}
                  className="w-full rounded-xl bg-amber-300 px-5 py-3.5 text-sm font-black text-black transition hover:bg-amber-200 sm:w-auto sm:rounded-lg sm:px-7 sm:py-4 sm:text-base"
                >
                  Записаться
                </button>
                <a
                  href="tel:+79850187878"
                  onClick={() => reachGoal('phone_click')}
                  className="w-full rounded-xl border border-white/25 bg-white/10 px-5 py-3.5 text-center text-sm font-bold text-white backdrop-blur transition hover:border-amber-300 hover:text-amber-300 sm:w-auto sm:rounded-lg sm:px-7 sm:py-4 sm:text-base"
                >
                  Позвонить в студию
                </a>
              </div>

              <p className="mt-3 text-xs leading-5 text-zinc-300 sm:text-sm sm:leading-6">
                Акция: при комплексе "полировка + керамика" керамика кожи в подарок. Опрос помогает нам не терять ваше
                время на пустые вопросы, а сразу дать нужный вариант.
              </p>
            </div>

            <aside className="mx-auto w-full max-w-[520px] md:mx-0 md:self-center">
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black/50 shadow-2xl shadow-black/40 backdrop-blur sm:rounded-[30px]">
                <img
                  src={photoThree}
                  alt="Результат детейлинга BMW в студии VECTOR PRO"
                  className="h-44 w-full object-cover object-center sm:h-64 md:h-[20rem]"
                />
                <div className="grid grid-cols-2 gap-px bg-white/10">
                  {proof.map(([value, label]) => (
                    <div key={value} className="bg-zinc-950/90 p-3.5 sm:p-5">
                      <div className="text-xl font-black text-amber-300 sm:text-3xl">{value}</div>
                      <p className="mt-1.5 text-[11px] leading-4 text-zinc-300 sm:mt-2 sm:text-sm sm:leading-5">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-3 py-8 sm:px-4 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="rounded-[24px] border border-amber-300/20 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-5 shadow-xl shadow-black/25 sm:rounded-3xl sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-300 sm:text-sm">Умный опрос для заявки</p>
              <h2 className="mt-3 text-2xl font-black leading-tight sm:text-4xl">
                 5 коротких вопросов, после которых менеджер уже понимает, что вам нужно и может сразу предложить удобное время и честный расчет
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-300 sm:mt-4 sm:text-base sm:leading-7">
                Без звонков в стиле “а что вас интересует?”. Менеджер заранее увидит услугу, филиал, тип автомобиля,
                срочность и главную задачу. Вам останется только получить расчет и выбрать удобное время.
              </p>

              <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
                {[
                  'Какую услугу хотите',
                  'Куда удобнее приехать',
                  'Какой у вас автомобиль',
                  'Когда планируете приехать',
                  'Что для вас важнее всего',
                ].map((item, index) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-3.5 sm:p-4">
                    <div className="text-xs font-black text-amber-300 sm:text-sm">0{index + 1}</div>
                    <div className="mt-1.5 text-sm font-medium leading-5 text-zinc-100">{item}</div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                id="detail-quiz-button"
                data-quiz-trigger="detailing"
                data-service="vector-detailing"
                onClick={openQuiz}
                className="mt-5 w-full rounded-xl bg-amber-300 px-5 py-3.5 text-sm font-black text-black transition hover:bg-amber-200 sm:mt-6 sm:w-auto sm:rounded-lg sm:px-6 sm:py-4 sm:text-base"
              >
                Получить рассчет
              </button>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-black p-5 sm:rounded-3xl sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-300 sm:text-sm">Почему это удобно</p>
              <div className="mt-4 space-y-4 sm:space-y-5">
                <div>
                  <div className="text-base font-black text-white sm:text-lg">Быстрее расчет</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-400">
                    Менеджер не начинает с нуля, а звонит уже с пониманием вашей ситуации.
                  </div>
                </div>
                <div>
                  <div className="text-base font-black text-white sm:text-lg">Меньше лишних уточнений</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-400">
                    Вы заранее сообщаете, что важно: защита, блеск, химчистка, срочность и удобный филиал.
                  </div>
                </div>
                <div>
                  <div className="text-base font-black text-white sm:text-lg">Больше шансов записаться сразу</div>
                  <div className="mt-1 text-sm leading-6 text-zinc-400">
                    Когда задача понятна, проще предложить точное время, понятную цену и подходящий комплекс.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-3 py-12 sm:px-4 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-amber-300 sm:text-sm">Что делаем</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Услуги, после которых автомобиль выглядит дороже и ухоженнее
            </h2>
          </div>
          <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article key={service.title} className="rounded-[24px] border border-white/10 bg-zinc-900 p-5 sm:rounded-3xl sm:p-6">
                <div className="mb-5 h-1.5 w-12 rounded-full bg-amber-300 sm:mb-6 sm:w-14" />
                <h3 className="text-lg font-bold sm:text-xl">{service.title}</h3>
                <p className="mt-2 text-xl font-black text-amber-300 sm:text-2xl">{service.price}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-black py-12 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-3 sm:gap-10 sm:px-4 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase text-amber-300 sm:text-sm">Почему выбирают нас</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Закрываем главные страхи перед детейлингом
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-300 sm:mt-5 sm:text-lg sm:leading-8">
                Клиент сравнивает несколько студий и чаще всего боится трех вещей: испортят, затянут сроки или назовут
                цену уже после работ. Мы снимаем это конкретикой, а не общими обещаниями.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              {reasons.map((reason, index) => (
                <div key={reason.title} className="rounded-[24px] border border-white/10 bg-zinc-950 p-5 sm:rounded-3xl sm:p-6">
                  <span className="text-xs font-bold text-amber-300 sm:text-sm">0{index + 1}</span>
                  <h3 className="mt-3 text-lg font-bold sm:mt-4 sm:text-xl">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{reason.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="mx-auto max-w-7xl px-3 py-12 sm:px-4 sm:py-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase text-amber-300 sm:text-sm">Реальные авто</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">Работы, которые помогают сделать выбор</h2>
            </div>
            <button
              type="button"
              data-quiz-trigger="detailing"
              data-service="vector-detailing"
              onClick={openQuiz}
              className="w-full rounded-xl border border-amber-300 px-5 py-3.5 text-sm font-bold text-amber-300 transition hover:bg-amber-300 hover:text-black md:w-auto md:rounded-lg md:px-6 md:py-4 md:text-base"
            >
              Записаться
            </button>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">
            {cases.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[24px] border border-white/10 bg-zinc-900 sm:rounded-3xl">
                <img src={item.img} alt={item.title} className="h-64 w-full object-cover sm:h-72" />
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-semibold text-amber-300 sm:text-sm">{item.tag}</p>
                  <h3 className="mt-2 text-xl font-bold sm:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="price" className="bg-zinc-900 py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-3 sm:px-4">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-amber-300 sm:text-sm">Пакеты</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
                Понятные стартовые цены и точный расчет после осмотра
              </h2>
            </div>
            <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-3">
              {packages.map((pack) => (
                <article key={pack.name} className="rounded-[24px] border border-white/10 bg-black p-5 sm:rounded-3xl sm:p-7">
                  <p className="text-sm font-semibold text-zinc-400">{pack.target}</p>
                  <h3 className="mt-2 text-xl font-black sm:text-2xl">{pack.name}</h3>
                  <p className="mt-4 text-2xl font-black text-amber-300 sm:mt-5 sm:text-3xl">{pack.price}</p>
                  <ul className="mt-5 space-y-3 text-sm text-zinc-300 sm:mt-6">
                    {pack.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-300" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-3 py-12 sm:px-4 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase text-amber-300 sm:text-sm">FAQ</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">Частые вопросы перед записью</h2>
          </div>
          <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3">
            {faq.map((item) => (
              <article key={item.q} className="rounded-[24px] border border-white/10 bg-zinc-900 p-5 sm:rounded-3xl sm:p-6">
                <h3 className="text-lg font-black leading-snug text-white sm:text-xl">{item.q}</h3>
                <p className="mt-4 text-sm leading-6 text-zinc-400">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-3 py-12 sm:px-4 sm:py-20">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase text-amber-300 sm:text-sm">Репутация</p>
              <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">Отзывы и впечатления клиентов</h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                Я не стал выдумывать цитаты. Ниже оставил аккуратный блок с переходом в Яндекс.Карты, чтобы клиент мог
                посмотреть реальные отзывы прямо в карточке филиала.
              </p>
            </div>
            <a
              href={YANDEX_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-amber-300 px-5 py-3 text-sm font-bold text-amber-300 transition hover:bg-amber-300 hover:text-black"
            >
              Читать отзывы на Яндекс.Картах
            </a>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
            {[
              {
                title: 'Что важно клиентам',
                text: 'Аккуратность работы, понятный результат, адекватное общение и спокойное ощущение, что автомобиль в надежных руках.',
              },
              {
                title: 'Что стоит показать в отзывах',
                text: 'Кейсы по полировке, керамике, оклейке и химчистке, особенно на новых и премиум-авто.',
              },
              {
                title: 'Как усилить доверие',
                text: 'Попроси клиентов оставить 5-10 новых отзывов именно про детейлинг, сроки, отношение и итоговый результат.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[24px] border border-white/10 bg-zinc-900 p-5 sm:rounded-3xl sm:p-6">
                <h3 className="text-lg font-black text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden py-12 sm:py-20">
          <img src="/image/car.jpg" alt="VECTOR PRO detailing" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/75" />
          <div className="relative z-10 mx-auto max-w-4xl px-3 text-center sm:px-4">
            <p className="text-xs font-semibold uppercase text-amber-300 sm:text-sm">Финальный оффер</p>
            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-5xl">
              Оставьте заявку и получите осмотр ЛКП бесплатно
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-200 sm:mt-5 sm:text-lg sm:leading-8">
              Посл  е опроса менеджер уже будет понимать вашу задачу, желаемый филиал и срок. Это самый быстрый путь к
              точному расчету и записи без лишних разговоров.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
              <button
                type="button"
                data-quiz-trigger="detailing"
                data-service="vector-detailing"
                onClick={openQuiz}
                className="w-full rounded-xl bg-amber-300 px-5 py-3.5 text-sm font-black text-black transition hover:bg-amber-200 sm:w-auto sm:rounded-lg sm:px-8 sm:py-4 sm:text-base"
              >
                Записаться
              </button>
              <a
                href="tel:+79850187878"
                onClick={() => reachGoal('phone_click')}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-bold text-white transition hover:border-amber-300 hover:text-amber-300 sm:w-auto sm:rounded-lg sm:px-8 sm:py-4 sm:text-base"
              >
                Позвонить прямо сейчас
              </a>
            </div>
          </div>
        </section>
      </main>

      {quizOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="relative flex h-[100svh] w-full max-w-3xl flex-col overflow-hidden rounded-none border-0 bg-zinc-950 shadow-2xl shadow-black/40 sm:h-auto sm:max-h-[92vh] sm:rounded-3xl sm:border sm:border-white/10">
            <div className="relative overflow-hidden border-b border-white/10 bg-black/80 px-5 py-5 sm:px-7">
              <div className="absolute inset-0 opacity-30">
                <img src={photoOne} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">Опрос для точной заявки</p>
                    <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                      {submitState === 'success' ? 'Заявка отправлена' : 'Ответьте на 5 вопросов'}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-300 sm:text-base">
                      {submitState === 'success'
                        ? 'Спасибо. Менеджер получит ваши ответы и свяжется с вами по указанному номеру.'
                        : 'Соберем всю ключевую информацию и поможем быстрее предложить лучший вариант именно под ваш автомобиль.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeQuiz}
                    className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-amber-300 hover:text-amber-300 sm:text-sm"
                  >
                    Закрыть
                  </button>
                </div>

                {submitState !== 'success' && (
                  <>
                    <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-amber-300 transition-all duration-300" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="mt-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                      Шаг {stepIndex + 1} из {totalSteps}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-8">
              {!isContactStep ? (
                <div>
                  <div className="mb-5">
                    <h4 className="text-xl font-black leading-tight text-white sm:text-2xl">{currentStep.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-zinc-400 sm:text-base">{currentStep.subtitle}</p>
                  </div>

                  <div className="grid gap-2.5 sm:gap-3">
                    {currentStep.options.map((option) => {
                      const active = answers[currentStep.key] === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleOptionSelect(currentStep.key, option.value)}
                          className={`rounded-2xl border px-4 py-4 text-left transition sm:px-5 ${
                            active
                              ? 'border-amber-300 bg-amber-300/10 shadow-lg shadow-amber-300/5'
                              : 'border-white/10 bg-zinc-900 hover:border-amber-300/50 hover:bg-zinc-900/80'
                          }`}
                        >
                          <div className="text-sm font-bold leading-5 text-white sm:text-lg">{option.value}</div>
                          <div className="mt-1.5 text-xs leading-5 text-zinc-400 sm:mt-2 sm:text-sm sm:leading-6">{option.hint}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h4 className="text-xl font-black text-white sm:text-2xl">Куда отправить расчет и заявку?</h4>
                    <p className="mt-2 text-sm leading-6 text-zinc-400 sm:text-base">
                      Оставьте имя и номер. Менеджер уже увидит ваши ответы и свяжется с вами по делу, а не с пустыми уточнениями.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-zinc-300">Имя</span>
                      <input
                        type="text"
                        value={answers.name}
                        onChange={(event) => handleContactChange('name', event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-white outline-none transition focus:border-amber-300 sm:py-4"
                        placeholder="Как к вам обращаться"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-sm font-semibold text-zinc-300">Номер телефона</span>
                      <input
                        type="tel"
                        value={answers.phone}
                        onChange={(event) => handleContactChange('phone', event.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-white outline-none transition focus:border-amber-300 sm:py-4"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-zinc-300">Комментарий для менеджера</span>
                    <textarea
                      rows="4"
                      value={answers.comment}
                      onChange={(event) => handleContactChange('comment', event.target.value)}
                      className="w-full resize-none rounded-xl border border-white/10 bg-zinc-900 px-4 py-3.5 text-white outline-none transition focus:border-amber-300 sm:py-4"
                      placeholder="Марка / модель, желаемая дата, что важно учесть"
                    />
                  </label>

                  <div className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none" aria-hidden="true">
                    <label htmlFor="company_name_trap">Компания</label>
                    <input
                      id="company_name_trap"
                      type="text"
                      tabIndex="-1"
                      autoComplete="off"
                      value={antiSpamField}
                      onChange={(event) => setAntiSpamField(event.target.value)}
                    />
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-900/70 p-4">
                    <div className="text-sm font-semibold text-amber-300">Что увидит менеджер</div>
                    <div className="mt-3 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                      <div>Услуга: {answers.service}</div>
                      <div>Филиал: {answers.branch}</div>
                      <div>Авто: {answers.carType}</div>
                      <div>Срок: {answers.timing}</div>
                      <div className="sm:col-span-2">Цель: {answers.goal}</div>
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                      {errorMessage}
                    </div>
                  )}

                  <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-zinc-900/70 p-4 text-sm leading-6 text-zinc-300">
                    <input
                      type="checkbox"
                      checked={consentAccepted}
                      onChange={(event) => setConsentAccepted(event.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-zinc-950 text-amber-300 focus:ring-amber-300"
                    />
                    <span>
                      Я согласен на обработку персональных данных и принимаю условия{' '}
                      <a href="/detail/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200">
                        политики конфиденциальности
                      </a>{' '}
                      и{' '}
                      <a href="/detail/consent" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200">
                        согласия на обработку персональных данных
                      </a>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className="w-full rounded-xl bg-amber-300 px-6 py-3.5 text-sm font-black text-black transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-lg sm:py-4 sm:text-base"
                  >
                    {submitState === 'submitting' ? 'Отправляем заявку...' : 'Отправить заявку'}
                  </button>

                  <p className="text-xs leading-5 text-zinc-500">
                    Позвоним вам в течение получаса, чтобы подтвердить заявку и уточнить детали. Если не ответите, оставим сообщение с кратким описанием ваших ответов и расчетом. 
                  </p>
                </form>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-4 sm:px-7">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-zinc-200 transition hover:border-amber-300 hover:text-amber-300 sm:text-sm"
              >
                {stepIndex === 0 ? 'Закрыть' : 'Назад'}
              </button>
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                {isContactStep ? 'Финальный шаг' : 'Ответьте на вопрос'}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-white/10 bg-black pb-10 pt-8 md:pt-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-3 text-xs text-zinc-400 sm:px-4 sm:text-sm md:flex-row md:items-center md:justify-between">
          <p>© 2026 VECTOR PRO</p>
          <p>Москва. Удобная парковка, заезд по записи, кофе и зона ожидания.</p>
        </div>
      </footer>
    </div>
  );
}

export default DetailLanding;
