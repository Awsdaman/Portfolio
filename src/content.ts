// All site content lives here. See README.md for how to add a project or certificate.
// Every claim must be something you can stand behind. `pending` items are visible
// in `npm run dev` only and never appear in a production build.

export type Bi = { en: string; ar: string }

export type Project = {
  name: Bi
  body: Bi
  repo: string
  live?: string
  image?: { src: string; alt: Bi }
  colors?: { bg: string; text: string }
  stats?: { value: string; label: Bi }[]
}

export type Item = { title: Bi; meta?: Bi }

export const links = {
  linkedin: 'https://www.linkedin.com/in/aous-damanhoori',
  github: 'https://github.com/Awsdaman',
  baseera: 'https://github.com/Awsdaman/Baseera',
}

// Split so the full address never sits in the HTML or the bundle as one string.
export const mailParts = ['aousdamanhoori', 'outlook.com']

// Set to true once public/Aous-Damanhoori-CV.pdf exists.
export const cvAvailable = false

export const hero = {
  role: { en: 'Cybersecurity analyst · eJPT', ar: 'محلل أمن سيبراني · eJPT' },
  name: { en: 'Aous Damanhoori', ar: 'أوس دمنهوري' },
  lede: {
    en: 'Intern at SDAIA, working in SOC analysis and incident response. I also ship real software, so I understand the systems I defend from the inside.',
    ar: 'متدرّب في سدايا، أعمل في تحليل العمليات الأمنية والاستجابة للحوادث. وأُطلق برمجيات حقيقية أيضًا، فأفهم الأنظمة التي أحميها من الداخل.',
  },
  facts: [
    { title: { en: 'SDAIA internship', ar: 'تدريب في سدايا' }, meta: { en: 'Riyadh, since Jun 2026', ar: 'الرياض، منذ يونيو 2026' } },
    { title: { en: 'eJPT', ar: 'eJPT' }, meta: { en: 'INE Security, Jan 2026', ar: 'INE Security، يناير 2026' } },
    { title: { en: 'GPA 3.93 / 4', ar: 'المعدل 3.93 من 4' }, meta: { en: 'BSc Cybersecurity, UQU', ar: 'بكالوريوس أمن سيبراني، جامعة أم القرى' } },
    { title: { en: 'Open to opportunities', ar: 'منفتح على الفرص' }, meta: { en: 'Arabic and English', ar: 'العربية والإنجليزية' } },
  ] satisfies Item[],
}

export const statement: Bi = {
  en: 'I distrust unverified input, in a SOC and in the software I build. Baseera treats model output as untrusted and fails closed. It is the same instinct.',
  ar: 'لا أثق بأي مدخل لم يُتحقَّق منه، في مركز العمليات وفي البرمجيات التي أبنيها. «بصيرة» يعامل مخرجات النموذج على أنها غير موثوقة ويمتنع عند الفشل. وهي الغريزة نفسها.',
}

export const baseera = {
  title: { en: 'The model never types a verse.', ar: 'النموذج لا يكتب آية أبدًا.' },
  titleMute: { en: 'Code checks, then places the exact text', ar: 'الكود يتحقق، ثم يضع النص بحروفه' },
  intro: {
    en: 'An Arabic-first Islamic Q&A and verification assistant, built by my team for the AI Challenge Serving Islamic Content. We did not qualify, and I am proud of what we built.',
    ar: 'مساعد عربي أولًا للأسئلة الإسلامية والتحقق، بنيته مع فريقي لتحدي الذكاء الاصطناعي لخدمة المحتوى الإسلامي. لم نتأهل، وأنا فخور بما بنيناه.',
  },
  how: {
    en: 'It emits placeholders and citation ids. Plain code checks them against what was retrieved and substitutes the exact stored text. If verification fails twice, it abstains.',
    ar: 'يُخرج مواضع فارغة ومعرّفات استشهاد، ثم يتحقق كود برمجي منها مقابل ما جرى استرجاعه ويضع النص المخزَّن بحروفه. وإذا فشل التحقق مرتين، يمتنع عن الإجابة.',
  },
  spec: [
    { title: { en: 'Modes', ar: 'الأوضاع' }, meta: { en: 'Ask, with source cards. Verify, with a word-level diff for misquotes.', ar: 'اسأل، مع بطاقات المصادر. وتحقّق، مع مقارنة كلمة بكلمة للاقتباسات الخاطئة.' } },
    { title: { en: 'Corpus', ar: 'المدوّنة' }, meta: { en: '6,236 verses, 3,574 graded hadiths, about 40,000 book passages, 2,489 fiqh encyclopedia articles.', ar: '6,236 آية، و3,574 حديثًا بدرجاتها، ونحو 40,000 مقطع من الكتب، و2,489 مادة من الموسوعة الفقهية.' } },
    { title: { en: 'Retrieval', ar: 'الاسترجاع' }, meta: { en: 'SQLite FTS5 BM25 plus Chroma with bge-m3 embeddings, fused by reciprocal rank.', ar: 'SQLite FTS5 BM25 مع Chroma وتضمينات bge-m3، مدموجة بالترتيب التبادلي.' } },
    { title: { en: 'Runs on', ar: 'يعمل على' }, meta: { en: 'A local open model, Gemma 12B, on one desktop GPU. Python, FastAPI, pytest, a recorded eval suite.', ar: 'نموذج مفتوح محلي، Gemma 12B، على بطاقة رسوميات مكتبية واحدة. Python وFastAPI وpytest وحزمة تقييم مسجّلة.' } },
  ] satisfies Item[],
  rolePending: { en: 'My part: role to confirm', ar: 'دوري: يُستكمل لاحقًا' },
  rules: [
    { title: { en: 'Untrusted output', ar: 'مخرجات غير موثوقة' }, meta: { en: 'Model output is input to be checked, never text to be shown.', ar: 'مخرجات النموذج مدخل يُفحص، لا نص يُعرض.' } },
    { title: { en: 'Validation in code', ar: 'تحقق في الكود' }, meta: { en: 'Plain code decides, not the model.', ar: 'الكود هو من يقرر، لا النموذج.' } },
    { title: { en: 'Fail closed', ar: 'الامتناع عند الفشل' }, meta: { en: 'Two failed checks and it abstains.', ar: 'فشل التحقق مرتين يعني الامتناع.' } },
    { title: { en: 'A test for every rule', ar: 'اختبار لكل قاعدة' }, meta: { en: 'pytest and a recorded eval suite.', ar: 'pytest وحزمة تقييم مسجّلة.' } },
  ] satisfies Item[],
  study: {
    problem: {
      en: 'An Islamic Q&A assistant cannot afford to misquote a verse or a hadith. A language model can write text that looks right and is not, so its output has to be treated as untrusted input.',
      ar: 'لا يحتمل مساعد للأسئلة الإسلامية خطأً في اقتباس آية أو حديث. وقد يكتب النموذج اللغوي نصًا يبدو صحيحًا وهو ليس كذلك، لذا يجب التعامل مع مخرجاته كمدخل غير موثوق.',
    },
    hard: {
      en: 'Keeping answers useful while never letting the model type the text it cites. It writes around placeholders and citation ids, and retrieval has to surface the right source first.',
      ar: 'إبقاء الإجابات مفيدة دون السماح للنموذج بكتابة النص الذي يستشهد به. فهو يكتب حول مواضع فارغة ومعرّفات استشهاد، وعلى الاسترجاع أن يجد المصدر الصحيح أولًا.',
    },
    did: {
      en: 'We built two modes. Ask gives a sourced answer with source cards. Verify takes a pasted viral message and checks each verse and hadith, with a word-level diff for misquotes.',
      ar: 'بنينا وضعين. «اسأل» يقدّم إجابة موثقة مع بطاقات المصادر. و«تحقّق» يستقبل رسالة متداولة ويفحص كل آية وحديث فيها، مع مقارنة كلمة بكلمة للاقتباسات الخاطئة.',
    },
    examplePending: { en: 'Worked Verify example to supply', ar: 'مثال التحقق يُستكمل لاحقًا' },
  },
}

export const threat = {
  count: '23',
  countLabel: { en: 'security and privacy threats identified across the data lifecycle.', ar: 'تهديدًا أمنيًا وخصوصيًا حُدّدت عبر دورة حياة البيانات.' },
  title: { en: 'Threat model: document delivery system', ar: 'نمذجة التهديدات: نظام تسليم المستندات' },
  intro: {
    en: 'A university team project. We mapped attack surfaces including TLS configuration weaknesses, broken access control (OWASP Top 10 A01, A02) and gaps in encryption at rest.',
    ar: 'مشروع جامعي جماعي. حددنا أسطح الهجوم، ومنها ضعف إعدادات TLS، وخلل التحكم في الوصول (OWASP Top 10 A01 وA02)، وثغرات التشفير أثناء التخزين.',
  },
  tags: ['STRIDE', 'LINDDUN', 'OWASP Threat Dragon', 'GDPR', 'NCA-ECC'],
  pending: { en: 'Date and redrawn diagram to confirm', ar: 'التاريخ والرسم يُستكملان لاحقًا' },
  study: {
    problem: {
      en: 'A document delivery system needed an end-to-end threat model covering both security and privacy across the data lifecycle.',
      ar: 'احتاج نظام لتسليم المستندات إلى نمذجة تهديدات شاملة تغطي الأمن والخصوصية عبر دورة حياة البيانات.',
    },
    hard: {
      en: 'Covering security and privacy together meant running both STRIDE and LINDDUN, in OWASP Threat Dragon, across the whole system.',
      ar: 'تغطية الأمن والخصوصية معًا تطلبت تطبيق STRIDE وLINDDUN في OWASP Threat Dragon على النظام كله.',
    },
    did: {
      en: 'We mapped the attack surfaces, then turned the findings into a prioritised mitigation roadmap aligned with GDPR and NCA-ECC.',
      ar: 'حددنا أسطح الهجوم، ثم حوّلنا النتائج إلى خارطة معالجة مرتبة بالأولويات ومتوافقة مع GDPR وNCA-ECC.',
    },
    proof: {
      en: '23 threats identified, and the roadmap presented to academic reviewers.',
      ar: '23 تهديدًا محددًا، وخارطة عُرضت على مراجعين أكاديميين.',
    },
  },
}

export const competitions: Item[] = [
  { title: { en: 'UQU CTF', ar: 'UQU CTF' } },
  { title: { en: 'Cyber Arcade CTF', ar: 'Cyber Arcade CTF' }, meta: { en: 'University of Jeddah Cybersecurity Club, Sep 2025: participant', ar: 'نادي الأمن السيبراني بجامعة جدة، سبتمبر 2025: مشارك' } },
]

export const categories: Item[] = [
  { title: { en: 'Cryptography', ar: 'التشفير' }, meta: { en: 'Hash cracking, RSA', ar: 'كسر التجزئة، RSA' } },
  { title: { en: 'Web exploitation', ar: 'استغلال الويب' }, meta: { en: 'SQLi, XSS', ar: 'SQLi وXSS' } },
  { title: { en: 'Digital forensics', ar: 'الأدلة الرقمية' }, meta: { en: 'Memory and disk images', ar: 'صور الذاكرة والأقراص' } },
  { title: { en: 'OSINT', ar: 'الاستخبارات مفتوحة المصدر' } },
]

export const projects: Project[] = [
  {
    name: { en: 'Dub', ar: 'دوبلاج' },
    body: {
      en: 'Arabic party game: draw a film clip, watch it, dub it live, and it replays instantly with your voice over the original music. Original voices removed with Demucs. One mic or several devices with character roles; rooms and recording transfer over Supabase. About 30 automated test scripts cover recovery, slow networks and multi-device seats.',
      ar: 'لعبة جماعية عربية: اسحب مقطعًا من فيلم، شاهده، ودبلجه مباشرة، ليُعاد فورًا بصوتك فوق الموسيقى الأصلية. أُزيلت الأصوات الأصلية بـDemucs. مايك واحد أو عدة أجهزة بأدوار للشخصيات، والغرف ونقل التسجيلات عبر Supabase. ونحو 30 سكربت اختبار آليًا تغطي الاستعادة والشبكات البطيئة وتعدد الأجهزة.',
    },
    live: 'https://dub-ashen-ten.vercel.app',
    repo: 'https://github.com/Awsdaman/Dub',
    image: { src: 'projects/dub.webp', alt: { en: 'The Dub game’s opening studio screen, with a name field and a microphone level meter.', ar: 'شاشة الاستوديو الافتتاحية في لعبة دوبلاج، مع حقل الاسم ومقياس مستوى المايك.' } },
    colors: { bg: '#f2c218', text: '#141310' },
  },
  {
    name: { en: 'Saudi96', ar: 'هل تعرف السعودية؟' },
    body: {
      en: 'Arabic-only, RTL Saudi knowledge game: trivia, landmarks, people, dishes, regions, and a guess-the-song mode with three audio clues scored 300, 150 and 50. React 19, TypeScript, Vite. No backend at runtime; local scripts prepare and validate all content.',
      ar: 'لعبة معرفية سعودية بالعربية فقط: أسئلة ومعالم وشخصيات وأطباق ومناطق، وطور «خمّن الأغنية» بثلاثة مقاطع تلميح تُحسب 300 و150 و50 نقطة. React 19 وTypeScript وVite. بلا خادم أثناء التشغيل، وسكربتات محلية تجهّز المحتوى كله وتتحقق منه.',
    },
    live: 'https://saudi96.vercel.app',
    repo: 'https://github.com/Awsdaman/Saudi96',
    image: { src: 'projects/saudi96.webp', alt: { en: 'The Saudi96 game’s team setup screen.', ar: 'شاشة إعداد الفرق في لعبة هل تعرف السعودية؟' } },
    colors: { bg: '#0d3b2d', text: '#f4f7f3' },
  },
  {
    name: { en: 'RLCS Predictor', ar: 'RLCS Predictor' },
    body: {
      en: 'Score-prediction game my friend group used live during the Rocket League World Championship 2026: predict before lock, realtime leaderboard. React 19, Supabase Postgres with Realtime, Vercel. Designed for phones.',
      ar: 'لعبة توقّع نتائج استخدمها أصدقائي مباشرة خلال بطولة العالم لروكيت ليغ 2026: توقّع قبل الإغلاق، ولوحة صدارة لحظية. React 19 وSupabase Postgres مع Realtime وVercel. مصممة للجوال.',
    },
    repo: 'https://github.com/Awsdaman/rlcs-predictor',
    stats: [
      { value: '3', label: { en: 'exact score', ar: 'نتيجة صحيحة' } },
      { value: '1', label: { en: 'the winner', ar: 'الفائز' } },
    ],
  },
]

export type PathEntry = { date?: Bi; datePending?: Bi; place?: Bi; title: Bi; body: Bi }

export const path: PathEntry[] = [
  {
    date: { en: 'Jun 2026 – present', ar: 'يونيو 2026 – الآن' },
    place: { en: 'Riyadh, on-site', ar: 'الرياض، حضوريًا' },
    title: { en: 'Cyber Security Analyst (internship), SDAIA', ar: 'محلل أمن سيبراني (تدريب)، سدايا' },
    body: { en: 'Cyber operations, incident response, vulnerability assessment, cyber security risk.', ar: 'العمليات السيبرانية، والاستجابة للحوادث، وتقييم الثغرات، ومخاطر الأمن السيبراني.' },
  },
  {
    date: { en: 'Aug 2023 – present', ar: 'أغسطس 2023 – الآن' },
    place: { en: 'Makkah', ar: 'مكة المكرمة' },
    title: { en: 'BSc Cybersecurity, Umm Al-Qura University', ar: 'بكالوريوس الأمن السيبراني، جامعة أم القرى' },
    body: {
      en: 'GPA 3.93 / 4. Network security, ethical hacking, security operations, incident response and recovery, OS security, applied cryptography, data protection and privacy, cybersecurity governance and risk management.',
      ar: 'المعدل 3.93 من 4. أمن الشبكات، والاختراق الأخلاقي، والعمليات الأمنية، والاستجابة للحوادث والتعافي، وأمن أنظمة التشغيل، والتشفير التطبيقي، وحماية البيانات والخصوصية، وحوكمة الأمن السيبراني وإدارة المخاطر.',
    },
  },
  {
    datePending: { en: 'Jun – Aug, year to confirm', ar: 'يونيو – أغسطس، السنة تُستكمل' },
    place: { en: 'Makkah', ar: 'مكة المكرمة' },
    title: { en: 'Customer Service Supervisor (seasonal), MASHARIQ', ar: 'مشرف خدمة عملاء (موسمي)، مشارق' },
    body: { en: 'Supported customers, resolved complex queries, and worked with technical and operations teams.', ar: 'دعمت العملاء، وحللت الاستفسارات المعقدة، وعملت مع الفرق التقنية والتشغيلية.' },
  },
]

export const headlineCert = {
  name: 'eJPT',
  detail: { en: 'Junior Penetration Tester, INE Security. Awarded January 2026. Certification ID 171415196.', ar: 'مختبِر اختراق مبتدئ، INE Security. مُنحت في يناير 2026. رقم الشهادة 171415196.' },
  verifyUrl: undefined as string | undefined,
  verifyPending: { en: 'Verify link to add', ar: 'رابط التحقق يُضاف لاحقًا' },
}

export const programmes = {
  title: { en: 'KAUST Academy with the NCA', ar: 'أكاديمية كاوست مع الهيئة الوطنية للأمن السيبراني' },
  items: [
    { title: { en: 'Advanced Cybersecurity Training Program', ar: 'البرنامج المتقدم للتدريب في الأمن السيبراني' }, meta: { en: '40 hours, Apr 2025', ar: '40 ساعة، أبريل 2025' } },
    { title: { en: 'Introductory Cybersecurity Training Program', ar: 'البرنامج التمهيدي للتدريب في الأمن السيبراني' }, meta: { en: '40 hours, Feb 2025', ar: '40 ساعة، فبراير 2025' } },
  ] satisfies Item[],
}

export const courses: Bi[] = [
  { en: 'ISC2 courses via Coursera, Jan 2025: Security Principles, Access Control Concepts, Network and Communications Security, Security Operations, Incident Response and Recovery. These are course certificates, not the ISC2 CC certification.', ar: 'دورات ISC2 عبر Coursera، يناير 2025: مبادئ الأمن، ومفاهيم التحكم في الوصول، وأمن الشبكات والاتصالات، والعمليات الأمنية، والاستجابة للحوادث والتعافي. هذه شهادات دورات، وليست شهادة ISC2 CC.' },
  { en: 'Penetration Testing Bootcamp, Umm Al-Qura University Computing Club, 16 hours, Sep 2024.', ar: 'معسكر اختبار الاختراق، نادي الحاسب بجامعة أم القرى، 16 ساعة، سبتمبر 2024.' },
  { en: 'CTF Boot Camp, CyberXbytes and T3Kology: cryptography, web exploitation, digital forensics, OSINT.', ar: 'معسكر CTF، من CyberXbytes وT3Kology: التشفير، واستغلال الويب، والأدلة الرقمية، والاستخبارات مفتوحة المصدر.' },
  { en: 'Capture The Flag Bootcamp, King Faisal University Cybersecurity Club with CyberXbytes, Jan 2025.', ar: 'معسكر Capture The Flag، نادي الأمن السيبراني بجامعة الملك فيصل مع CyberXbytes، يناير 2025.' },
  { en: 'Cybersecurity Fundamentals Bootcamp, Saudi Developers Community, Sep 2024.', ar: 'معسكر أساسيات الأمن السيبراني، مجتمع المطورين السعوديين، سبتمبر 2024.' },
  { en: 'Workshops: Steganography (Cyber Guard, Aug 2025), Cybersecurity Incident Response (King Abdulaziz University, Oct 2024), Global Cybersecurity Framework (Masar, Oct 2024), cybersecurity fundamentals (CyberXbytes, Oct 2024).', ar: 'ورش عمل: إخفاء المعلومات (Cyber Guard، أغسطس 2025)، والاستجابة للحوادث السيبرانية (جامعة الملك عبدالعزيز، أكتوبر 2024)، والإطار العالمي للأمن السيبراني (مسار، أكتوبر 2024)، وأساسيات الأمن السيبراني (CyberXbytes، أكتوبر 2024).' },
  { en: 'Introduction to Cybersecurity Essentials, IBM, Jan 2025.', ar: 'مقدمة في أساسيات الأمن السيبراني، IBM، يناير 2025.' },
  { en: 'McKinsey Forward Program, Dec 2024. Araby.ai Program, May 2024.', ar: 'برنامج McKinsey Forward، ديسمبر 2024. وبرنامج Araby.ai، مايو 2024.' },
]

export const tools: { group: Bi; items: string }[] = [
  { group: { en: 'Penetration testing', ar: 'اختبار الاختراق' }, items: 'Nmap (NSE), Metasploit, Burp Suite, Hydra, Wireshark' },
  { group: { en: 'Forensics', ar: 'الأدلة الرقمية' }, items: 'FTK Imager, Volatility, Autopsy, Sleuth Kit' },
  { group: { en: 'Cryptography', ar: 'التشفير' }, items: 'Hashcat, John the Ripper, OpenSSL' },
  { group: { en: 'Frameworks', ar: 'الأطر' }, items: 'MITRE ATT&CK, OWASP Top 10, NIST CSF, ISO 27001, STRIDE, LINDDUN' },
  { group: { en: 'OSINT', ar: 'الاستخبارات مفتوحة المصدر' }, items: 'Maltego, Shodan' },
  { group: { en: 'Building', ar: 'البناء' }, items: 'Python, FastAPI, TypeScript, React, Supabase, SQLite, pytest' },
]
