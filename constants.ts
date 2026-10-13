import { Language, Subject, Lesson, Question, QuestionType, LOPerformance, PathNode, PathNodeType, PathNodeStatus } from './types';

export const TRANSLATIONS = {
  [Language.ENGLISH]: {
    portalTitle: "Adaptive Learning Pathway",
    portalSubtitle: "Sindh Textbook Board (STBB) • Future Learning Portal",
    welcome: "Welcome back",
    dashboard: "Dashboard",
    lessons: "Curriculum & Topics",
    readLesson: "Read Notes",
    practice: "Practice Concepts",
    quiz: "Topic Quiz",
    learningPath: "Learning Path",
    assessment: "Assessments",
    tutor: "AI Tutor",
    coach: "Status",
    language: "Language",
    logout: "Log Out",
    preEngineering: "Pre-Engineering (PE)",
    preMedical: "Pre-Medical (PM)",
    stream: "Academic Stream",
    grade: "Grade",
    grade9: "Grade 9 (SSC-I)",
    grade10: "Grade 10 (SSC-II)",
    grade11: "Grade 11 (HSC-I)",
    grade12: "Grade 12 (HSC-II)",
    boardTitle: "Sindh Textbook Board (STBB)",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    math: "Mathematics",
    english: "English",
    topicList: "Chapter Topics (Sindh Board)",
    readNotesTitle: "Theory & Textbook Notes",
    practiceTitle: "Worked Examples & Key Formulas",
    quizTitle: "Topic Assessment & Exam MCQs",
    startQuiz: "Start Assessment",
    submit: "Submit Answer",
    next: "Next",
    finish: "Finish",
    score: "Score",
    explanation: "Explanation",
    correct: "Correct",
    incorrect: "Incorrect",
    summary: "Summary",
    accuracy: "Accuracy",
    predictedMarks: "Predicted Board Marks",
    totalTopics: "Total Topics",
    completedTopics: "Topics Mastered",
    activeStreak: "Day Streak",
    listenAudio: "Read Aloud (TTS)",
    pauseAudio: "Pause Audio",
    stopAudio: "Stop",
    improveWithAI: "Explain with AI",
    timetable: "Study Timetable",
    generateTimetable: "Generate Schedule",
    dailyAvailability: "Daily Availability",
    subjectPriorities: "Subject Priorities",
    backToDashboard: "Back to Dashboard",
    backToTopics: "Back to Topics"
  },
  [Language.URDU]: {
    portalTitle: "ایڈاپٹو لرننگ پاتھ وے",
    portalSubtitle: "سندھ ٹیکسٹ بک بورڈ (STBB) • جدید تعلیمی پورٹل",
    welcome: "خوش آمدید",
    dashboard: "ڈیش بورڈ",
    lessons: "نصاب اور موضوعات",
    readLesson: "نوٹس پڑھیں",
    practice: "مشق اور تصورات",
    quiz: "ٹاپک کوئز",
    learningPath: "تعلیمی روڈ میپ",
    assessment: "امتحانات",
    tutor: "AI ٹیوٹر",
    coach: "اسٹیٹس",
    language: "زبان",
    logout: "لاگ آؤٹ",
    preEngineering: "پری انجینئرنگ (PE)",
    preMedical: "پری میڈیکل (PM)",
    stream: "تعلیمی شعبہ",
    grade: "کلاس / گریڈ",
    grade9: "گریڈ 9 (SSC-I)",
    grade10: "گریڈ 10 (SSC-II)",
    grade11: "گریڈ 11 (HSC-I)",
    grade12: "گریڈ 12 (HSC-II)",
    boardTitle: "سندھ ٹیکسٹ بک بورڈ، جامشورو",
    physics: "طبیعیات (Physics)",
    chemistry: "کیمیا (Chemistry)",
    biology: "حیاتیات (Biology)",
    math: "ریاضی (Mathematics)",
    english: "انگریزی (English)",
    topicList: "اسباق و ابواب (سندھ بورڈ)",
    readNotesTitle: "نظریاتی نوٹس اور کتابی مواد",
    practiceTitle: "حل شدہ سوالات اور اہم فارمولے",
    quizTitle: "ٹاپک کی جانچ اور امتحانی MCQs",
    startQuiz: "کوئز شروع کریں",
    submit: "جواب جمع کریں",
    next: "اگلا سوال",
    finish: "مکمل کریں",
    score: "اسکور",
    explanation: "وضاحت",
    correct: "درست",
    incorrect: "غلط",
    summary: "خلاصہ",
    accuracy: "درستگی کا تناسب",
    predictedMarks: "متوقع بورڈ نمبرز",
    totalTopics: "کل اسباق",
    completedTopics: "مکمل شدہ اسباق",
    activeStreak: "مطالعہ کا تسلسل",
    listenAudio: "آواز میں سنیں (TTS)",
    pauseAudio: "روکیں",
    stopAudio: "بند کریں",
    improveWithAI: "AI سے گہرائی میں سمجھیں",
    timetable: "اسٹڈی ٹائم ٹیبل",
    generateTimetable: "شیڈول تیار کریں",
    dailyAvailability: "روزانہ کا وقت اور دستیابی",
    subjectPriorities: "مضامین کی ترجیحات",
    backToDashboard: "ڈیش بورڈ پر واپس",
    backToTopics: "اسباق پر واپس"
  }
};

// 10 Topics per subject aligned with Sindh Textbook Board (STBB)
export const SINDH_BOARD_LESSONS: Lesson[] = [
  // ===================== PHYSICS (10 Topics) =====================
  {
    id: 'phy-01',
    chapterNumber: 1,
    grade: '9',
    subject: Subject.PHYSICS,
    title: {
      en: "Physical Quantities and Measurement",
      ur: "طبعی مقداریں اور پیمائش"
    },
    description: {
      en: "Introduction to base and derived SI units, vernier callipers, screw gauge, and scientific notation.",
      ur: "بنیادی اور ماخوذ SI اکائیاں، ورنیئر کیلیپرز، اسکرو گیج اور سائنسی اشاریہ کا تعارف۔"
    },
    content: {
      en: `<h3>1.1 Physical Quantities</h3>
      <p>A physical quantity is any characteristic that can be measured accurately. They are classified into:</p>
      <ul>
        <li><strong>Base Quantities:</strong> Minimum seven fundamental quantities: Length (m), Mass (kg), Time (s), Electric Current (A), Temperature (K), Amount of Substance (mol), and Luminous Intensity (cd).</li>
        <li><strong>Derived Quantities:</strong> Quantities expressed in terms of base quantities, such as Speed ($m/s$), Acceleration ($m/s^2$), Force ($N$), and Work ($J$).</li>
      </ul>
      <h3>1.2 Measuring Instruments in Sindh Board Labs</h3>
      <p><strong>Vernier Callipers:</strong> Used to measure internal/external diameter with least count of 0.01 cm or 0.1 mm.</p>
      <p><strong>Screw Gauge (Micrometer):</strong> Measures thin wires with higher precision, least count typically 0.01 mm.</p>`,
      ur: `<h3>1.1 طبعی مقداریں</h3>
      <p>تمام قابل پیمائش مقداروں کو طبعی مقداریں کہا جاتا ہے۔ یہ دو اقسام میں منقسم ہیں:</p>
      <ul>
        <li><strong>بنیادی مقداریں:</strong> سات بنیادی مقداریں جیسے لمبائی (میٹر)، کمیت (کلوگرام)، وقت (سیکنڈ)، برقی رو (ایمپیئر)، درجہ حرارت (کیلون) وغیرہ۔</li>
        <li><strong>ماخوذ مقداریں:</strong> وہ مقداریں جو بنیادی مقداروں سے اخذ کی جائیں جیسے رفتار، اسراع اور قوت۔</li>
      </ul>
      <h3>1.2 پیمائشی آلات</h3>
      <p>ورنیئر کیلیپرز اور اسکرو گیج باریک لمبائی اور موٹائی کی درست پیمائش کے لیے استعمال کیے جاتے ہیں۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Least Count (LC) = Smallest division on main scale / Total vernier divisions", ur: "لیسٹ کاؤنٹ = مین اسکیل کا چھوٹا درجہ / ورنیئر کے کل درجے" },
        { en: "Zero error must be subtracted algebraically from observed reading.", ur: "زیرو ایرر کو حتمی ریڈنگ سے الجبرائی طور پر تفریق کیا جاتا ہے۔" }
      ],
      formulas: ["Least Count = Pitch / Number of circular divisions", "Total Reading = Main Scale Reading + (Vernier Div × LC)"],
      workedExamples: [
        {
          question: {
            en: "A screw gauge has a pitch of 1 mm and 100 divisions on its circular scale. What is its least count?",
            ur: "ایک اسکرو گیج کی پچ 1 ملی میٹر ہے اور سرکلر اسکیل پر 100 درجے ہیں۔ اس کا لیسٹ کاؤنٹ کیا ہوگا؟"
          },
          solution: {
            en: "Least Count = Pitch / Circular Divisions = 1 mm / 100 = 0.01 mm (or 0.001 cm).",
            ur: "لیسٹ کاؤنٹ = پچ / سرکلر درجے = 1 ملی میٹر / 100 = 0.01 ملی میٹر۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-1',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "Which of the following is a base SI quantity?",
          ur: "مندرجہ ذیل میں سے کون سی بنیادی SI مقدار ہے؟"
        },
        options: [
          { en: "Speed", ur: "رفتار" },
          { en: "Electric Current", ur: "برقی رو" },
          { en: "Force", ur: "قوت" },
          { en: "Pressure", ur: "دباؤ" }
        ],
        correctAnswer: "Electric Current",
        explanation: {
          en: "Electric Current (Ampere) is one of the 7 base SI quantities.",
          ur: "برقی رو (ایمپیئر) 7 بنیادی SI اکائیوں میں شامل ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-02',
    chapterNumber: 2,
    grade: '9',
    subject: Subject.PHYSICS,
    title: {
      en: "Kinematics: Motion in One Dimension",
      ur: "حرکیات: خط مستقیم میں حرکت"
    },
    description: {
      en: "Scalar and vector quantities, velocity, acceleration, and the three equations of motion.",
      ur: "اسکیلر اور ویکٹر مقداریں، اسراع، رفتار اور حرکت کی تین بنیادی مساواتیں۔"
    },
    content: {
      en: `<h3>2.1 Scalars vs Vectors</h3>
      <p>Scalars have magnitude only (distance, speed, mass). Vectors require both magnitude and direction (displacement, velocity, force).</p>
      <h3>2.2 Three Equations of Uniformly Accelerated Motion</h3>
      <ol>
        <li>$v_f = v_i + at$</li>
        <li>$S = v_i t + \\frac{1}{2} a t^2$</li>
        <li>$2aS = v_f^2 - v_i^2$</li>
      </ol>`,
      ur: `<h3>2.1 اسکیلر اور ویکٹر</h3>
      <p>اسکیلر صرف عددی قیمت رکھتے ہیں جبکہ ویکٹر کے لیے سمت بھی ضروری ہوتی ہے۔</p>
      <h3>2.2 حرکت کی تین مساواتیں</h3>
      <p>1. $v_f = v_i + at$<br/>2. $S = v_i t + \\frac{1}{2} a t^2$<br/>3. $2aS = v_f^2 - v_i^2$</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Acceleration due to gravity on Earth surface is approximately 9.8 m/s² (or 10 m/s²).", ur: "زمین پر کشش ثقل کا اسراع تقریباً 9.8 میٹر فی سیکنڈ مربع ہے۔" },
        { en: "Slope of distance-time graph represents speed; slope of velocity-time graph represents acceleration.", ur: "فاصلہ اور وقت کے گراف کی ڈھلوان رفتار ظاہر کرتی ہے۔" }
      ],
      formulas: ["v_f = v_i + at", "S = v_i t + 0.5 a t^2", "2aS = v_f^2 - v_i^2"],
      workedExamples: [
        {
          question: {
            en: "A car starts from rest with an acceleration of 2 m/s². Find its velocity after 5 seconds.",
            ur: "ایک کار ساکن حالت سے 2 میٹر فی سیکنڈ مربع کے اسراع سے چلتی ہے۔ 5 سیکنڈ بعد رفتار معلوم کریں۔"
          },
          solution: {
            en: "Using v_f = v_i + at: v_f = 0 + (2 × 5) = 10 m/s.",
            ur: "v_f = 0 + (2 × 5) = 10 میٹر فی سیکنڈ۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-2',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "What does the slope of a velocity-time graph represent?",
          ur: "رفتار اور وقت کے گراف کی ڈھلوان کیا ظاہر کرتی ہے؟"
        },
        options: [
          { en: "Displacement", ur: "ہٹاؤ" },
          { en: "Acceleration", ur: "اسراع" },
          { en: "Speed", ur: "رفتار" },
          { en: "Force", ur: "قوت" }
        ],
        correctAnswer: "Acceleration",
        explanation: {
          en: "The gradient dv/dt of velocity-time graph gives acceleration.",
          ur: "وقت اور رفتار کے گراف کی ڈھلوان اسراع بتاتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-03',
    chapterNumber: 3,
    grade: '9',
    subject: Subject.PHYSICS,
    title: {
      en: "Dynamics: Newton's Laws and Friction",
      ur: "حرکی قوت: نیوٹن کے قوانین اور رگڑ"
    },
    description: {
      en: "Newton's three laws of motion, momentum, friction (limiting & rolling), and centripetal force.",
      ur: "نیوٹن کے قوانین حرکت، مومینٹم، رگڑ کی اقسام اور مرکز مائل قوت۔"
    },
    content: {
      en: `<h3>3.1 Newton's Laws of Motion</h3>
      <p><strong>1st Law (Law of Inertia):</strong> An object remains in its state of rest or uniform motion unless acted upon by an external net force.</p>
      <p><strong>2nd Law:</strong> Force is proportional to acceleration: $F = ma$ or $F = \\Delta p / \\Delta t$.</p>
      <p><strong>3rd Law:</strong> To every action there is always an equal and opposite reaction.</p>
      <h3>3.2 Friction</h3>
      <p>Opposing force between surfaces in contact. $F_s = \\mu_s R$. Rolling friction is much smaller than sliding friction.</p>`,
      ur: `<h3>3.1 نیوٹن کے قوانین</h3>
      <p>پہلا قانون جمود (Inertia)، دوسرا قانون $F = ma$ اور تیسرا قانون عمل اور ردعمل کا برابری کا اصول ہے۔</p>
      <h3>3.2 رگڑ (Friction)</h3>
      <p>رگڑ حرکت کی مخالف قوت ہے۔ گھومنے والی رگڑ (Rolling friction) پھسلنے والی رگڑ سے بہت کم ہوتی ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Momentum is p = mv (kg m/s). It is conserved in closed systems.", ur: "مومینٹم کمیت اور رفتار کا حاصل ضرب ہے: p = mv" },
        { en: "Centripetal force is Fc = m v² / r directed toward the center of circular path.", ur: "مرکز مائل قوت دائرے کے مرکز کی جانب ہوتی ہے: Fc = m v² / r" }
      ],
      formulas: ["F = m × a", "p = m × v", "F_c = (m × v^2) / r"],
      workedExamples: [
        {
          question: {
            en: "Calculate the force required to accelerate a 1200 kg car at 2.5 m/s².",
            ur: "1200 کلوگرام وزنی کار کو 2.5 میٹر فی سیکنڈ مربع اسراع دینے کے لیے درکار قوت معلوم کریں۔"
          },
          solution: {
            en: "F = m × a = 1200 kg × 2.5 m/s² = 3000 N.",
            ur: "F = 1200 × 2.5 = 3000 نیوٹن۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-3',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "What is the SI unit of momentum?",
          ur: "مومینٹم کی SI اکائی کیا ہے؟"
        },
        options: [
          { en: "N/s", ur: "N/s" },
          { en: "kg·m/s", ur: "kg·m/s" },
          { en: "Joule", ur: "جول" },
          { en: "Watt", ur: "واٹ" }
        ],
        correctAnswer: "kg·m/s",
        explanation: {
          en: "Momentum p = mass (kg) × velocity (m/s) = kg·m/s (or N·s).",
          ur: "مومینٹم کی اکائی کلوگرام میٹر فی سیکنڈ ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-04',
    chapterNumber: 4,
    grade: '9',
    subject: Subject.PHYSICS,
    title: {
      en: "Turning Effect of Forces & Equilibrium",
      ur: "قوتوں کا گردشی اثر اور توازن"
    },
    description: {
      en: "Torque, couple, centre of gravity, and conditions of equilibrium for rigid bodies.",
      ur: "ٹارک، کپل، مرکز ثقل اور توازن کی بنیادی شرائط۔"
    },
    content: {
      en: `<h3>4.1 Torque (Moment of Force)</h3>
      <p>Turning effect of a force about a pivot: $\\tau = F \\times d$, where $d$ is moment arm.</p>
      <h3>4.2 Conditions of Equilibrium</h3>
      <ul>
        <li><strong>First Condition:</strong> Vector sum of external forces is zero: $\\sum F = 0$.</li>
        <li><strong>Second Condition:</strong> Vector sum of external torques is zero: $\\sum \\tau = 0$.</li>
      </ul>`,
      ur: `<h3>4.1 ٹارک (گردشی اثر)</h3>
      <p>کسی محور کے گرد قوت کا گھماؤ ٹارک کہلاتا ہے: $\\tau = F \\times d$</p>
      <h3>4.2 توازن کی شرائط</h3>
      <p>پہلی شرط: تمام قوتوں کا مجموعہ صفر ہو ($\\sum F = 0$)۔ دوسری شرط: تمام ٹارکس کا مجموعہ صفر ہو۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "A rigid body is in complete equilibrium when both conditions are satisfied.", ur: "کوئی جسم مکمل توازن میں تب ہوتا ہے جب دونوں شرائط پوری ہوں۔" }
      ],
      formulas: ["Torque = Force × Moment Arm", "Σ F = 0", "Σ τ = 0"],
      workedExamples: [
        {
          question: {
            en: "A 50 N force acts perpendicular to a wrench of length 0.25 m. Find the torque.",
            ur: "ایک رینچ کی لمبائی 0.25 میٹر ہے اور 50 نیوٹن عمودی قوت لگائی جاتی ہے۔ ٹارک معلوم کریں۔"
          },
          solution: {
            en: "Torque = F × d = 50 N × 0.25 m = 12.5 N·m.",
            ur: "ٹارک = 50 × 0.25 = 12.5 نیوٹن میٹر۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-4',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "What is the SI unit of torque?",
          ur: "ٹارک کی بین الاقوامی اکائی کیا ہے؟"
        },
        options: [
          { en: "Newton", ur: "نیوٹن" },
          { en: "Newton meter (N·m)", ur: "نیوٹن میٹر" },
          { en: "Pascal", ur: "پاسکل" },
          { en: "Joule/s", ur: "جول فی سیکنڈ" }
        ],
        correctAnswer: "Newton meter (N·m)",
        explanation: {
          en: "Torque is force multiplied by distance, resulting in N·m.",
          ur: "ٹارک کی اکائی نیوٹن میٹر ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-05',
    chapterNumber: 5,
    grade: '9',
    subject: Subject.PHYSICS,
    title: {
      en: "Gravitation & Satellites",
      ur: "کشش ثقل اور سیارچے"
    },
    description: {
      en: "Newton's law of universal gravitation, mass of Earth, variation of g, and orbital velocity.",
      ur: "نیوٹن کا قانون تجاذب، زمین کی کمیت، بلندی کے ساتھ g میں تبدیلی اور سیارچوں کی رفتار۔"
    },
    content: {
      en: `<h3>5.1 Law of Universal Gravitation</h3>
      <p>Every particle in the universe attracts every other particle with force $F = G \\frac{m_1 m_2}{r^2}$, where $G = 6.673 \\times 10^{-11} \\text{ N m}^2/\\text{kg}^2$.</p>
      <h3>5.2 Mass of Earth</h3>
      <p>$M_e = \\frac{g R_e^2}{G} \\approx 6.0 \\times 10^{24} \\text{ kg}$.</p>`,
      ur: `<h3>5.1 نیوٹن کا قانون تجاذب</h3>
      <p>کائنات کا ہر مادہ دوسرے مادے کو اپنی طرف کھینچتا ہے: $F = G \\frac{m_1 m_2}{r^2}$</p>
      <h3>5.2 زمین کی کمیت</h3>
      <p>زمین کی کمیت تقریباً $6.0 \\times 10^{24}$ کلوگرام ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Acceleration g decreases with altitude inversely with square of distance from centre.", ur: "بلندی بڑھنے سے کشش ثقل کی قیمت کم ہوتی جاتی ہے۔" }
      ],
      formulas: ["F = G (m1 m2) / r^2", "v_orbital = sqrt(g R)"],
      workedExamples: [
        {
          question: {
            en: "What happens to the gravitational force between two bodies if the distance between them is doubled?",
            ur: "اگر دو اجسام کے درمیان فاصلہ دوگنا کر دیا جائے تو کشش ثقل کی قوت پر کیا اثر پڑے گا؟"
          },
          solution: {
            en: "Since force is inversely proportional to r², doubling distance reduces force to 1/4th (one quarter).",
            ur: "فاصلہ دوگنا ہونے سے قوت ایک چوتھائی (1/4) رہ جاتی ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-5',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "What is the value of gravitational constant G?",
          ur: "تجاذبی مستقل G کی قیمت کیا ہے؟"
        },
        options: [
          { en: "9.8 m/s²", ur: "9.8 m/s²" },
          { en: "6.67 × 10⁻¹¹ N m²/kg²", ur: "6.67 × 10⁻¹¹ N m²/kg²" },
          { en: "3 × 10⁸ m/s", ur: "3 × 10⁸ m/s" },
          { en: "1.6 × 10⁻¹⁹ C", ur: "1.6 × 10⁻¹⁹ C" }
        ],
        correctAnswer: "6.67 × 10⁻¹¹ N m²/kg²",
        explanation: {
          en: "Universal gravitational constant G = 6.673 × 10⁻¹¹ N m²/kg².",
          ur: "تجاذبی مستقل کی قیمت 6.67 × 10⁻¹¹ ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-06',
    chapterNumber: 6,
    grade: '9',
    subject: Subject.PHYSICS,
    title: {
      en: "Work, Power and Energy",
      ur: "کام، طاقت اور توانائی"
    },
    description: {
      en: "Kinetic energy, gravitational potential energy, conservation of energy, and efficiency.",
      ur: "حرکی توانائی، پوتینشل توانائی، بقائے توانائی اور کارکردگی (ایفیشینسی)۔"
    },
    content: {
      en: `<h3>6.1 Work Done</h3>
      <p>$W = F d \\cos(\\theta)$. In SI units, work is measured in Joules ($J$).</p>
      <h3>6.2 Forms of Mechanical Energy</h3>
      <ul>
        <li><strong>Kinetic Energy:</strong> $K.E. = \\frac{1}{2} m v^2$</li>
        <li><strong>Potential Energy:</strong> $P.E. = m g h$</li>
      </ul>
      <p><strong>Power:</strong> Rate of doing work $P = W / t$ (Watt).</p>`,
      ur: `<h3>6.1 کام اور توانائی</h3>
      <p>کام = قوت × فاصلہ ($W = F d$)۔ حرکی توانائی $K.E = \\frac{1}{2} m v^2$ اور پوتینشل توانائی $P.E = m g h$ ہے۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "1 Horsepower (hp) = 746 Watts.", ur: "ایک ہارس پاور 746 واٹ کے برابر ہوتی ہے۔" }
      ],
      formulas: ["W = F × d", "KE = 0.5 × m × v^2", "PE = m × g × h", "Power = Work / Time"],
      workedExamples: [
        {
          question: {
            en: "Find kinetic energy of a 50 kg athlete running at 6 m/s.",
            ur: "50 کلوگرام وزنی ایتھلیٹ جو 6 میٹر فی سیکنڈ سے دوڑ رہا ہو، اس کی حرکی توانائی نکالیں۔"
          },
          solution: {
            en: "KE = 0.5 × 50 × 6² = 25 × 36 = 900 Joules.",
            ur: "حرکی توانائی = 0.5 × 50 × 36 = 900 جول۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-6',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "What is 1 Watt defined as?",
          ur: "ایک واٹ کی تعریف کیا ہے؟"
        },
        options: [
          { en: "1 Joule per second", ur: "1 جول فی سیکنڈ" },
          { en: "1 Newton per meter", ur: "1 نیوٹن فی میٹر" },
          { en: "1 Kilogram per second", ur: "1 کلوگرام فی سیکنڈ" },
          { en: "1 Joule meter", ur: "1 جول میٹر" }
        ],
        correctAnswer: "1 Joule per second",
        explanation: {
          en: "Power is work per unit time; 1 Watt = 1 J/s.",
          ur: "ایک واٹ ایک جول فی سیکنڈ کے برابر ہوتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-07',
    chapterNumber: 7,
    grade: '9',
    subject: Subject.PHYSICS,
    title: {
      en: "Properties of Matter & Pascal's Principle",
      ur: "مادے کی خصوصیات اور پاسکل کا اصول"
    },
    description: {
      en: "Kinetic molecular model, density, pressure, Pascal's law, and Archimedes principle.",
      ur: "مالیکیولر تھیوری، کثافت، دباؤ، پاسکل کا قانون اور ارشمیدس کا اصول۔"
    },
    content: {
      en: `<h3>7.1 Pressure in Fluids</h3>
      <p>$P = F / A$. In a liquid column at depth $h$, pressure is $P = \\rho g h$.</p>
      <h3>7.2 Pascal's Law</h3>
      <p>Pressure applied anywhere in an enclosed fluid is transmitted equally in all directions, as applied in hydraulic brakes and hydraulic lifts.</p>`,
      ur: `<h3>7.1 پاسکل کا اصول</h3>
      <p>کسی بند برتن میں مائع پر لگایا جانے والا دباؤ تمام سمتوں میں یکساں منتقل ہوتا ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Archimedes principle states buoyant force equals weight of displaced fluid.", ur: "ارشمیدس کے اصول کے مطابق اچھال کی قوت ہٹائے گئے مائع کے وزن کے برابر ہوتی ہے۔" }
      ],
      formulas: ["P = F / A", "P = ρ × g × h", "F1 / A1 = F2 / A2"],
      workedExamples: [
        {
          question: {
            en: "A 500 N force acts over an area of 0.05 m². Calculate the pressure in Pascals.",
            ur: "0.05 مربع میٹر کے رقبے پر 500 نیوٹن قوت لگتی ہے۔ دباؤ معلوم کریں۔"
          },
          solution: {
            en: "P = F / A = 500 / 0.05 = 10,000 Pa (10 kPa).",
            ur: "دباؤ = 500 / 0.05 = 10,000 پاسکل۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-7',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "Which device operates on Pascal's Law?",
          ur: "کون سا آلہ پاسکل کے قانون پر کام کرتا ہے؟"
        },
        options: [
          { en: "Hydraulic Car Lift", ur: "ہائیڈرولک کار لفٹ" },
          { en: "Electric Motor", ur: "الیکٹرک موٹر" },
          { en: "Telescope", ur: "دوربین" },
          { en: "Thermometer", ur: "تھرمامیٹر" }
        ],
        correctAnswer: "Hydraulic Car Lift",
        explanation: {
          en: "Hydraulic brakes and lifts work by transmitting fluid pressure undiminished.",
          ur: "ہائیڈرولک کار لفٹ پاسکل کے قانون کے اصول پر کام کرتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-08',
    chapterNumber: 8,
    grade: '9',
    subject: Subject.PHYSICS,
    title: {
      en: "Thermal Properties of Matter",
      ur: "مادے کے حرارتی خواص"
    },
    description: {
      en: "Temperature scales, specific heat capacity, latent heat of fusion and vaporization.",
      ur: "درجہ حرارت کے پیمانے، مخصوص حرارت اور پوشیدہ حرارت۔"
    },
    content: {
      en: `<h3>8.1 Heat vs Temperature</h3>
      <p>Temperature is the measure of average kinetic energy of molecules, while heat is thermal energy transferred.</p>
      <h3>8.2 Specific Heat Capacity ($c$)</h3>
      <p>$Q = m c \\Delta T$. Water has unusually high specific heat ($4200 \\text{ J/(kg K)}$), making it an excellent coolant.</p>`,
      ur: `<h3>8.1 حرارت اور درجہ حرارت</h3>
      <p>حرارت توانائی کی ایک قسم ہے جبکہ درجہ حرارت اوسط حرکی توانائی کا پیمانہ ہے۔ پانی کی مخصوص حرارت سب سے زیادہ (4200 J/kg K) ہوتی ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Latent heat is absorbed or released during phase change without changing temperature.", ur: "حالت کی تبدیلی کے دوران درجہ حرارت میں تبدیلی کے بغیر جذب ہونے والی حرارت پوشیدہ حرارت کہلاتی ہے۔" }
      ],
      formulas: ["Q = m × c × ΔT", "Q = m × L_f", "T(K) = T(°C) + 273"],
      workedExamples: [
        {
          question: {
            en: "Convert 25°C to Kelvin scale.",
            ur: "25 ڈگری سینٹی گریڈ کو کیلون اسکیل میں تبدیل کریں۔"
          },
          solution: {
            en: "T(K) = 25 + 273 = 298 K.",
            ur: "کیلون درجہ حرارت = 25 + 273 = 298 K۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-8',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "What is the specific heat capacity of water?",
          ur: "پانی کی مخصوص حرارت گنجائش کتنی ہے؟"
        },
        options: [
          { en: "4200 J/(kg·K)", ur: "4200 J/(kg·K)" },
          { en: "2100 J/(kg·K)", ur: "2100 J/(kg·K)" },
          { en: "900 J/(kg·K)", ur: "900 J/(kg·K)" },
          { en: "380 J/(kg·K)", ur: "380 J/(kg·K)" }
        ],
        correctAnswer: "4200 J/(kg·K)",
        explanation: {
          en: "Water has a high specific heat capacity of 4200 Joules per kg per Kelvin.",
          ur: "پانی کی مخصوص حرارت گنجائش 4200 جول فی کلوگرام کیلون ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-09',
    chapterNumber: 9,
    grade: '10',
    subject: Subject.PHYSICS,
    title: {
      en: "Transfer of Heat & Radiation",
      ur: "حرارت کا انتقال اور اخراج"
    },
    description: {
      en: "Conduction, convection, radiation, greenhouse effect, and practical thermal applications.",
      ur: "ایصال، حمل حرارت، اشعاع اور گرین ہاؤس اثر۔"
    },
    content: {
      en: `<h3>9.1 Modes of Heat Transfer</h3>
      <ul>
        <li><strong>Conduction:</strong> Transfer through direct molecular collisions in solids (metals).</li>
        <li><strong>Convection:</strong> Transfer through bulk movement of heated fluids (liquids and gases).</li>
        <li><strong>Radiation:</strong> Transfer via electromagnetic infrared waves requiring no medium.</li>
      </ul>`,
      ur: `<h3>9.1 انتقالِ حرارت کے طریقے</h3>
      <p>ٹھوس اشیاء میں ایصال (Conduction)، مائعات اور گیسوں میں حمل حرارت (Convection)، اور خلا میں اشعاع (Radiation) کے ذریعے حرارت منتقل ہوتی ہے۔</p>`
    },
    weightage: 8,
    practice: {
      keyPoints: [
        { en: "Black surfaces are both the best absorbers and best emitters of radiation.", ur: "سیاہ اور کھردری سطحیں حرارت کو تیزی سے جذب اور خارج کرتی ہیں۔" }
      ],
      formulas: ["Rate of heat transfer Q/t = k A (T1 - T2) / L"],
      workedExamples: [
        {
          question: {
            en: "Why are cooking utensils made of metals while their handles are made of wood or plastic?",
            ur: "کھانا پکانے کے برتن دھاتوں کے اور دستے لکڑی یا پلاسٹک کے کیوں بنائے جاتے ہیں؟"
          },
          solution: {
            en: "Metals are good conductors of heat for cooking, whereas wood/plastic are insulators protecting the hands.",
            ur: "دھاتیں حرارت کی اچھی موصل ہوتی ہیں جبکہ لکڑی اور پلاسٹک غیر موصل ہیں جو جلنے سے بچاتے ہیں۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-9',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "Which method of heat transfer does NOT require any material medium?",
          ur: "حرارت کی منتقلی کا کون سا طریقہ کسی مادی واسطے کا محتاج نہیں؟"
        },
        options: [
          { en: "Conduction", ur: "ایصال" },
          { en: "Convection", ur: "حمل حرارت" },
          { en: "Radiation", ur: "اشعاع (Radiation)" },
          { en: "Diffusion", ur: "انتشار" }
        ],
        correctAnswer: "Radiation",
        explanation: {
          en: "Radiation travels via electromagnetic waves and can propagate through vacuum.",
          ur: "اشعاع برقی مقناطیسی لہروں کے ذریعے خلا میں بھی سفر کرتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'phy-10',
    chapterNumber: 10,
    grade: '10',
    subject: Subject.PHYSICS,
    title: {
      en: "Current Electricity & Ohm's Law",
      ur: "برقی رو اور اوہم کا قانون"
    },
    description: {
      en: "Electric current, potential difference, Ohm's law (V=IR), series & parallel circuits.",
      ur: "برقی رو، پوٹینشل کا فرق، اوہم کا قانون، سیریز اور پیرلل سرکٹس۔"
    },
    content: {
      en: `<h3>10.1 Ohm's Law</h3>
      <p>At constant temperature, current through a conductor is directly proportional to the potential difference across its terminals: $V = I R$.</p>
      <h3>10.2 Circuit Connections</h3>
      <ul>
        <li><strong>Series:</strong> $R_{eq} = R_1 + R_2 + \\dots$; same current through all components.</li>
        <li><strong>Parallel:</strong> $1/R_{eq} = 1/R_1 + 1/R_2 + \\dots$; same voltage across branches.</li>
      </ul>`,
      ur: `<h3>10.1 اوہم کا قانون</h3>
      <p>مستقل درجہ حرارت پر موصل میں سے گزرنے والی برقی رو پوٹینشل کے فرق کے راست متناسب ہوتی ہے: $V = I R$</p>
      <h3>10.2 سرکٹ کی اقسام</h3>
      <p>سیریز سرکٹ میں کرنٹ یکساں رہتا ہے جبکہ پیرلل سرکٹ میں وولٹیج یکساں رہتا ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Electrical power P = V × I = I² R = V² / R.", ur: "برقی طاقت P = V × I = I² R واٹ میں ناپی جاتی ہے۔" }
      ],
      formulas: ["V = I × R", "R_series = R1 + R2", "1/R_parallel = 1/R1 + 1/R2", "P = V × I"],
      workedExamples: [
        {
          question: {
            en: "A 220 V supply is connected across a 44 Ohm heater resistor. Calculate the current.",
            ur: "220 وولٹ سپلائی کو 44 اوہم کے ہیٹر سے جوڑا گیا ہے۔ کرنٹ معلوم کریں۔"
          },
          solution: {
            en: "I = V / R = 220 V / 44 Ω = 5 Amperes.",
            ur: "I = 220 / 44 = 5 ایمپیئر۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-phy-10',
        subject: Subject.PHYSICS,
        type: QuestionType.MCQ,
        text: {
          en: "What happens to the total resistance when two identical resistors are connected in parallel?",
          ur: "جب دو یکساں ریزسٹرز کو پیرلل جوڑا جائے تو کل مزاحمت کیا ہوگی؟"
        },
        options: [
          { en: "It doubles", ur: "دوگنی ہو جائے گی" },
          { en: "It reduces to half", ur: "نصف رہ جائے گی" },
          { en: "It remains unchanged", ur: "کوئی تبدیلی نہیں آئے گی" },
          { en: "It quadruples", ur: "چار گنا ہو جائے گی" }
        ],
        correctAnswer: "It reduces to half",
        explanation: {
          en: "For two equal resistors R in parallel, R_eq = R / 2.",
          ur: "دو مساوی ریزسٹرز پیرلل میں آدھی مزاحمت بناتے ہیں: R/2۔"
        }
      }
    ]
  },

  // ===================== CHEMISTRY (10 Topics) =====================
  {
    id: 'chem-01',
    chapterNumber: 1,
    grade: '9',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Fundamentals of Chemistry & The Mole",
      ur: "کیمیا کے بنیادی اصول اور مول کا تصور"
    },
    description: {
      en: "Elements, compounds, mixtures, Avogadro's number, molar mass, and stoichiometric formulas.",
      ur: "عناصر، مرکبات، مکسچرز، ایوگیڈرو نمبر، مولر ماس اور فارمولا۔"
    },
    content: {
      en: `<h3>1.1 Basic Definitions</h3>
      <p>Matter is divided into pure substances (elements and compounds) and mixtures (homogeneous & heterogeneous).</p>
      <h3>1.2 The Mole Concept & Avogadro's Number</h3>
      <p>One mole of any substance contains exactly $6.022 \\times 10^{23}$ particles. Number of moles $n = \\text{Mass in grams} / \\text{Molar mass}$.</p>`,
      ur: `<h3>1.1 مول کا تصور</h3>
      <p>ایک مول میں $6.022 \\times 10^{23}$ ذرات ہوتے ہیں جنہیں ایوگیڈرو نمبر کہا جاتا ہے۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Empirical formula gives simplest ratio; Molecular formula gives actual number of atoms.", ur: "ایمپریکل فارمولا سادہ ترین نسبت اور مالیکیولر فارمولا اصل تعداد ظاہر کرتا ہے۔" }
      ],
      formulas: ["Moles = Mass (g) / Molar Mass (g/mol)", "Particles = Moles × 6.022 × 10²³"],
      workedExamples: [
        {
          question: {
            en: "Calculate the mass of 2 moles of water (H2O).",
            ur: "پانی (H2O) کے 2 مول کی کمیت معلوم کریں۔"
          },
          solution: {
            en: "Molar mass of H2O = (2×1) + 16 = 18 g/mol. Mass = 2 × 18 = 36 grams.",
            ur: "پانی کا مولر ماس 18 گرام ہے۔ 2 مول کی کمیت = 36 گرام۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-1',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "What is Avogadro's number?",
          ur: "ایوگیڈرو نمبر کی قیمت کیا ہے؟"
        },
        options: [
          { en: "6.022 × 10²³", ur: "6.022 × 10²³" },
          { en: "3.00 × 10⁸", ur: "3.00 × 10⁸" },
          { en: "9.8 × 10⁶", ur: "9.8 × 10⁶" },
          { en: "1.602 × 10⁻¹⁹", ur: "1.602 × 10⁻¹⁹" }
        ],
        correctAnswer: "6.022 × 10²³",
        explanation: {
          en: "One mole of any chemical entity contains 6.022 × 10²³ representative particles.",
          ur: "ایک مول میں 6.022 × 10²³ ذرات ہوتے ہیں۔"
        }
      }
    ]
  },
  {
    id: 'chem-02',
    chapterNumber: 2,
    grade: '9',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Structure of Atoms & Isotopes",
      ur: "ایٹم کی ساخت اور آئسوٹوپس"
    },
    description: {
      en: "Rutherford and Bohr models, subatomic particles, isotopes of hydrogen and carbon.",
      ur: "ردرفورڈ اور بوہر کا ایٹمی ماڈل، الیکٹرانک کنفیگریشن اور آئسوٹوپس۔"
    },
    content: {
      en: `<h3>2.1 Atomic Structure</h3>
      <p>Protons (+) and Neutrons (neutral) reside in the dense nucleus; electrons (-) occupy quantized shells (K, L, M, N) according to Bohr's postulate.</p>
      <h3>2.2 Isotopes</h3>
      <p>Atoms of the same element with identical atomic number ($Z$) but differing mass numbers ($A$). Hydrogen has Protium, Deuterium, and Tritium.</p>`,
      ur: `<h3>2.1 ایٹم کی ساخت</h3>
      <p>پروٹان اور نیوٹران مرکزے میں ہوتے ہیں جبکہ الیکٹران مداروں میں گردش کرتے ہیں۔ آئسوٹوپس وہ ایٹم ہیں جن کا ایٹمی نمبر ایک جیسا لیکن ماس نمبر مختلف ہو۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Maximum electrons in shell n is given by 2n² (K=2, L=8, M=18, N=32).", ur: "کسی شیل میں الیکٹرانز کی زیادہ سے زیادہ تعداد 2n² کے فارمولے سے معلوم ہوتی ہے۔" }
      ],
      formulas: ["Max electrons in shell = 2n²", "Mass Number A = Protons (Z) + Neutrons (N)"],
      workedExamples: [
        {
          question: {
            en: "An atom has 11 protons and 12 neutrons. What is its atomic number and mass number?",
            ur: "ایک ایٹم میں 11 پروٹان اور 12 نیوٹران ہیں۔ اس کا ایٹمی نمبر اور ماس نمبر بتائیں۔"
          },
          solution: {
            en: "Atomic number Z = 11 (Sodium). Mass number A = 11 + 12 = 23.",
            ur: "ایٹمی نمبر 11 اور ماس نمبر 23 (سوڈیم) ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-2',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "What is the maximum number of electrons that can fit in the L shell?",
          ur: "L شیل میں زیادہ سے زیادہ کتنے الیکٹران آ سکتے ہیں؟"
        },
        options: [
          { en: "2", ur: "2" },
          { en: "8", ur: "8" },
          { en: "18", ur: "18" },
          { en: "32", ur: "32" }
        ],
        correctAnswer: "8",
        explanation: {
          en: "For L shell (n=2), 2n² = 2(2)² = 8 electrons.",
          ur: "L شیل (n=2) کے لیے 2(2)² = 8 الیکٹرانز بنتے ہیں۔"
        }
      }
    ]
  },
  {
    id: 'chem-03',
    chapterNumber: 3,
    grade: '9',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Periodic Table & Periodic Properties",
      ur: "پیریاڈک ٹیبل اور دوری خواص"
    },
    description: {
      en: "Modern periodic law, groups, periods, atomic radius, ionization energy, and electronegativity trends.",
      ur: "ماڈرن پیریاڈک لا، گروپس اور پیریڈز، ایٹمی رداس اور آئنائزیشن انرجی کے رجحانات۔"
    },
    content: {
      en: `<h3>3.1 Modern Periodic Law</h3>
      <p>Properties of elements are periodic functions of their atomic numbers. Organized into 7 horizontal periods and 18 vertical groups.</p>
      <h3>3.2 Periodic Trends</h3>
      <ul>
        <li><strong>Atomic Radius:</strong> Decreases across a period (left to right); increases down a group.</li>
        <li><strong>Ionization Energy:</strong> Increases across a period; decreases down a group.</li>
        <li><strong>Electronegativity:</strong> Fluorine is the most electronegative element (4.0).</li>
      </ul>`,
      ur: `<h3>3.1 پیریاڈک رجحانات</h3>
      <p>پیریڈ میں بائیں سے دائیں ایٹمی سائز چھوٹا اور آئنائزیشن انرجی زیادہ ہوتی ہے۔ گروپ میں اوپر سے نیچے سائز بڑھتا ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Noble gases (Group 18) have completely filled octet and highest stability.", ur: "نوبل گیسز کا بیرونی مدار مکمل ہوتا ہے اور وہ کیمیائی طور پر غیر عامل ہوتی ہیں۔" }
      ],
      formulas: ["Periodic Law: Properties = f(Atomic Number Z)"],
      workedExamples: [
        {
          question: {
            en: "Why does ionization energy decrease down a group in the periodic table?",
            ur: "پیریاڈک ٹیبل میں گروپ میں نیچے کی طرف آئنائزیشن انرجی کیوں کم ہوتی ہے؟"
          },
          solution: {
            en: "Because the number of shells increases, increasing atomic size and shielding effect, reducing nuclear hold on outer valence electrons.",
            ur: "کیونکہ نئے شیلز کے اضافے سے ایٹم کا سائز بڑا ہو جاتا ہے اور شیلڈنگ اثر کی وجہ سے بیرونی الیکٹران کو نکالنا آسان ہو جاتا ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-3',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "Which element has the highest electronegativity in the periodic table?",
          ur: "پیریاڈک ٹیبل میں سب سے زیادہ الیکٹرو نیگیٹیوٹی کس عنصر کی ہے؟"
        },
        options: [
          { en: "Chlorine", ur: "کلورین" },
          { en: "Fluorine", ur: "فلورین" },
          { en: "Oxygen", ur: "آکسیجن" },
          { en: "Sodium", ur: "سوڈیم" }
        ],
        correctAnswer: "Fluorine",
        explanation: {
          en: "Fluorine has the highest electronegativity of 4.0 on the Pauling scale.",
          ur: "فلورین کی الیکٹرو نیگیٹیوٹی سب سے زیادہ (4.0) ہے۔"
        }
      }
    ]
  },
  {
    id: 'chem-04',
    chapterNumber: 4,
    grade: '9',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Chemical Bonding & Intermolecular Forces",
      ur: "کیمیائی بانڈنگ اور بین المالیکیولی قوتیں"
    },
    description: {
      en: "Octet rule, ionic bonds, single/double/triple covalent bonds, coordinate bonds, and hydrogen bonding.",
      ur: "اوکٹٹ رول، آئونک بانڈ، کوویلنٹ بانڈ اور ہائیڈروجن بانڈنگ۔"
    },
    content: {
      en: `<h3>4.1 Types of Chemical Bonds</h3>
      <ul>
        <li><strong>Ionic Bond:</strong> Complete electrostatic transfer of electrons from metal to non-metal (e.g., NaCl).</li>
        <li><strong>Covalent Bond:</strong> Mutual sharing of electrons between non-metals (e.g., H2O, CH4).</li>
        <li><strong>Coordinate Covalent Bond:</strong> Shared pair contributed by only one donor atom.</li>
      </ul>
      <p><strong>Hydrogen Bonding:</strong> Strong dipole attraction when hydrogen is bonded to N, O, or F.</p>`,
      ur: `<h3>4.1 بانڈز کی اقسام</h3>
      <p>الیکٹرانز کی منتقلی سے آئونک بانڈ بنتا ہے جبکہ باہمی اشتراک سے کوویلنٹ بانڈ بنتا ہے۔ ہائیڈروجن بانڈنگ پانی کے غیر معمولی نقطہ کھولاؤ کی وجہ ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Ionic compounds have high melting points and conduct electricity in molten/aqueous state.", ur: "آئونک مرکبات کے میلٹنگ پوائنٹس بلند ہوتے ہیں اور وہ محلول کی حالت میں بجلی گزارتے ہیں۔" }
      ],
      formulas: ["ΔEN > 1.7 typically forms ionic bond; ΔEN < 1.7 forms polar/nonpolar covalent bond"],
      workedExamples: [
        {
          question: {
            en: "What type of bond is formed between Sodium (Na) and Chlorine (Cl)?",
            ur: "سوڈیم اور کلورین کے درمیان کس قسم کا بانڈ بنتا ہے؟"
          },
          solution: {
            en: "Sodium loses 1 electron (Na+) and Chlorine gains 1 electron (Cl-), forming an Ionic Bond (NaCl).",
            ur: "سوڈیم ایک الیکٹران دے کر اور کلورین لے کر آئونک بانڈ (NaCl) بناتے ہیں۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-4',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "What kind of bond involves equal sharing of electron pairs between two atoms?",
          ur: "دو ایٹموں کے درمیان الیکٹرانز کے باہمی اشتراک سے کون سا بانڈ بنتا ہے؟"
        },
        options: [
          { en: "Ionic Bond", ur: "آئونک بانڈ" },
          { en: "Covalent Bond", ur: "کوویلنٹ بانڈ" },
          { en: "Metallic Bond", ur: "دھاتی بانڈ" },
          { en: "Hydrogen Bond", ur: "ہائیڈروجن بانڈ" }
        ],
        correctAnswer: "Covalent Bond",
        explanation: {
          en: "Covalent bonds form by mutual sharing of electrons.",
          ur: "کوویلنٹ بانڈ الیکٹرانز کے باہمی اشتراک سے بنتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'chem-05',
    chapterNumber: 5,
    grade: '9',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Physical States of Matter & Gas Laws",
      ur: "مادے کی طبعی حالتیں اور گیس کے قوانین"
    },
    description: {
      en: "Gaseous, liquid, solid states, Boyle's law, Charles's law, and evaporation factors.",
      ur: "بوائل کا قانون، چارلس کا قانون، گیسوں کا دباؤ اور تبخیر کے عوامل۔"
    },
    content: {
      en: `<h3>5.1 Gas Laws</h3>
      <ul>
        <li><strong>Boyle's Law:</strong> Pressure is inversely proportional to volume at constant temperature: $P_1 V_1 = P_2 V_2$.</li>
        <li><strong>Charles's Law:</strong> Volume is directly proportional to absolute temperature at constant pressure: $V_1 / T_1 = V_2 / T_2$.</li>
      </ul>`,
      ur: `<h3>5.1 گیس کے قوانین</h3>
      <p>بوائل کا قانون: مستقل درجہ حرارت پر گیس کا دباؤ اس کے حجم کے الٹ متناسب ہوتا ہے ($P_1 V_1 = P_2 V_2$)۔ چارلس کا قانون درجہ حرارت اور حجم کا تعلق ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Absolute zero is 0 Kelvin (-273.15 °C) where molecular motion ceases.", ur: "ایبسلوٹ زیرو 0 کیلون یا -273.15 ڈگری سینٹی گریڈ ہے۔" }
      ],
      formulas: ["P1 × V1 = P2 × V2 (Boyle's Law)", "V1 / T1 = V2 / T2 (Charles's Law)"],
      workedExamples: [
        {
          question: {
            en: "A gas has volume 4 L at 2 atm pressure. If pressure is increased to 4 atm at constant temperature, find new volume.",
            ur: "ایک گیس کا حجم 2 ایٹموسفیئر دباؤ پر 4 لیٹر ہے۔ اگر دباؤ 4 ایٹموسفیئر کر دیا جائے تو نیا حجم کیا ہوگا؟"
          },
          solution: {
            en: "Using Boyle's Law: P1 V1 = P2 V2 => 2 × 4 = 4 × V2 => V2 = 2 Liters.",
            ur: "P1 V1 = P2 V2 کے تحت نیا حجم 2 لیٹر ہوگا۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-5',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "What relationship does Boyle's Law describe?",
          ur: "بوائل کا قانون کس کے درمیان تعلق بیان کرتا ہے؟"
        },
        options: [
          { en: "Pressure and Volume at constant temperature", ur: "دباؤ اور حجم (مستقل درجہ حرارت پر)" },
          { en: "Volume and Temperature at constant pressure", ur: "حجم اور درجہ حرارت" },
          { en: "Pressure and Temperature", ur: "دباؤ اور درجہ حرارت" },
          { en: "Mass and Volume", ur: "کمیت اور حجم" }
        ],
        correctAnswer: "Pressure and Volume at constant temperature",
        explanation: {
          en: "Boyle's Law states P ∝ 1/V when temperature is kept constant.",
          ur: "بوائل کا قانون مستقل درجہ حرارت پر دباؤ اور حجم کا الٹ تعلق بتاتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'chem-06',
    chapterNumber: 6,
    grade: '9',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Solutions, Solubility & Concentration",
      ur: "محلول، حل پذیری اور ارتکاز"
    },
    description: {
      en: "Saturated, unsaturated, supersaturated solutions, molarity, mass percentage, and solubility factors.",
      ur: "سیر شدہ اور غیر سیر شدہ محلول، مولیرٹی اور حل پذیری کے اثرات۔"
    },
    content: {
      en: `<h3>6.1 Solution Types</h3>
      <p>A solution is a homogeneous mixture of solute and solvent. Saturated solution contains maximum solute at given temperature.</p>
      <h3>6.2 Molarity ($M$)</h3>
      <p>$M = \\frac{\\text{Moles of Solute}}{\\text{Volume of Solution in Liters}} = \\frac{\\text{Mass in grams}}{\\text{Molar mass} \\times V(L)}$.</p>`,
      ur: `<h3>6.1 مولیرٹی (Molarity)</h3>
      <p>ایک لیٹر محلول میں حل شدہ سولیوٹ کے مولز کی تعداد کو مولیرٹی کہتے ہیں: $M = \\text{Moles} / V(L)$۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Like dissolves like: Polar solutes dissolve in polar solvents (e.g. NaCl in water).", ur: "پولر اشیاء پولر سالوینٹس میں ہی حل ہوتی ہیں۔" }
      ],
      formulas: ["Molarity (M) = Moles of solute / Liters of solution", "Mass % = (Mass of Solute / Total Mass) × 100"],
      workedExamples: [
        {
          question: {
            en: "What is the molarity of a solution containing 40 g of NaOH (molar mass 40 g/mol) in 1 liter of water?",
            ur: "ایک لیٹر پانی میں 40 گرام NaOH (مولر ماس 40) حل ہو تو مولیرٹی کیا ہوگی؟"
          },
          solution: {
            en: "Moles = 40 / 40 = 1 mol. Molarity = 1 mol / 1 L = 1.0 M.",
            ur: "مولیرٹی 1.0 M ہوگی۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-6',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "What is the unit of Molarity?",
          ur: "مولیرٹی کی اکائی کیا ہے؟"
        },
        options: [
          { en: "mol/dm³ (mol/L)", ur: "mol/dm³ (یا mol/L)" },
          { en: "g/L", ur: "g/L" },
          { en: "mol/kg", ur: "mol/kg" },
          { en: "g/mol", ur: "g/mol" }
        ],
        correctAnswer: "mol/dm³ (mol/L)",
        explanation: {
          en: "Molarity is moles of solute per cubic decimeter (liter) of solution.",
          ur: "مولیرٹی کی اکائی مول فی لیٹر ہے۔"
        }
      }
    ]
  },
  {
    id: 'chem-07',
    chapterNumber: 7,
    grade: '9',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Electrochemistry & Redox Reactions",
      ur: "الیکٹروکیمسٹری اور ریڈوکس ردعمل"
    },
    description: {
      en: "Oxidation states, electrolytic and galvanic cells, electrolysis of water, and prevention of corrosion.",
      ur: "آکسیڈیشن اسٹیٹس، الیکٹرولائٹک سیل، گیلوانک سیل اور زنگ لگنے سے بچاؤ۔"
    },
    content: {
      en: `<h3>7.1 Oxidation and Reduction</h3>
      <ul>
        <li><strong>Oxidation:</strong> Loss of electrons / Increase in oxidation number. (OIL - Oxidation Is Loss).</li>
        <li><strong>Reduction:</strong> Gain of electrons / Decrease in oxidation number. (RIG - Reduction Is Gain).</li>
      </ul>
      <h3>7.2 Electrochemical Cells</h3>
      <p><strong>Galvanic (Daniel) Cell:</strong> Converts chemical energy into electrical energy.</p>
      <p><strong>Electrolytic Cell:</strong> Uses external electrical energy to drive non-spontaneous chemical reactions.</p>`,
      ur: `<h3>7.1 آکسیڈیشن اور ریڈکشن</h3>
      <p>الیکٹرانز کا اخراج آکسیڈیشن اور الیکٹرانز کا حصول ریڈکشن کہلاتا ہے۔ گیلوانک سیل کیمیائی توانائی کو برقی توانائی میں بدلتا ہے۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Galvanizing is coating iron with a layer of zinc to protect it from rusting.", ur: "لوہے پر زنک کی تہہ چڑھا کر زنگ سے بچانے کے عمل کو گیلوانائزنگ کہتے ہیں۔" }
      ],
      formulas: ["Anode = Site of Oxidation", "Cathode = Site of Reduction"],
      workedExamples: [
        {
          question: {
            en: "In the reaction Zn + Cu²⁺ -> Zn²⁺ + Cu, which species is oxidized?",
            ur: "ردعمل Zn + Cu²⁺ -> Zn²⁺ + Cu میں کون سا عنصر آکسیڈائز ہوا ہے؟"
          },
          solution: {
            en: "Zinc (Zn) loses 2 electrons to form Zn²⁺, so Zinc is oxidized.",
            ur: "زنک نے 2 الیکٹران خارج کیے ہیں، اس لیے زنک آکسیڈائز ہوا ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-7',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "At which electrode does oxidation occur in an electrochemical cell?",
          ur: "الیکٹرو کیمیکل سیل میں آکسیڈیشن کس الیکٹروڈ پر ہوتی ہے؟"
        },
        options: [
          { en: "Anode", ur: "اینوڈ (Anode)" },
          { en: "Cathode", ur: "کیتھوڈ (Cathode)" },
          { en: "Salt bridge", ur: "سالٹ برج" },
          { en: "Voltmeter", ur: "وولٹ میٹر" }
        ],
        correctAnswer: "Anode",
        explanation: {
          en: "Oxidation always occurs at the anode (An Ox, Red Cat).",
          ur: "آکسیڈیشن ہمیشہ اینوڈ پر ہوتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'chem-08',
    chapterNumber: 8,
    grade: '9',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Chemical Reactivity & Halogens",
      ur: "کیمیائی ردعمل پذیری اور ہیلوجنز"
    },
    description: {
      en: "Reactivity series of metals, inertness of noble metals, and reactions of halogens.",
      ur: "دھاتوں کی ری ایکٹیویٹی سیریز، غیر فعال دھاتیں اور ہیلوجنز کے خواص۔"
    },
    content: {
      en: `<h3>8.1 Metals vs Non-Metals</h3>
      <p>Metals are electropositive elements that readily lose electrons to form cations. Reactivity decreases down the reactivity series: Potassium > Sodium > Calcium > Magnesium > Aluminium > Zinc > Iron > Copper > Gold.</p>`,
      ur: `<h3>8.1 دھاتوں کی ردعمل پذیری</h3>
      <p>پوٹاشیم اور سوڈیم سب سے زیادہ سرگرم دھاتیں ہیں جبکہ سونا اور پلاٹینم غیر عامل (نوبل) دھاتیں ہیں۔</p>`
    },
    weightage: 8,
    practice: {
      keyPoints: [
        { en: "Gold and Platinum do not corrode in air, known as noble metals.", ur: "سونا اور پلاٹینم ہوا میں زنگ آلود نہیں ہوتے، اس لیے نوبل میٹلز کہلاتے ہیں۔" }
      ],
      formulas: ["Metal + Acid -> Salt + H2(g)"],
      workedExamples: [
        {
          question: {
            en: "Why is Sodium stored under kerosene oil?",
            ur: "سوڈیم کو مٹی کے تیل میں کیوں رکھا جاتا ہے؟"
          },
          solution: {
            en: "Sodium reacts vigorously with atmospheric moisture and oxygen, so it is kept isolated under kerosene.",
            ur: "سوڈیم ہوا میں موجود آکسیجن اور نمی سے فوری ردعمل کرتا ہے، اس لیے اسے مٹی کے تیل میں محفوظ رکھا جاتا ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-8',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "Which metal is the most reactive?",
          ur: "سب سے زیادہ ردعمل پذیر دھات کون سی ہے؟"
        },
        options: [
          { en: "Potassium (K)", ur: "پوٹاشیم (K)" },
          { en: "Copper (Cu)", ur: "تانبا (Cu)" },
          { en: "Iron (Fe)", ur: "لوہا (Fe)" },
          { en: "Silver (Ag)", ur: "چاندی (Ag)" }
        ],
        correctAnswer: "Potassium (K)",
        explanation: {
          en: "Potassium is at the top of the metal reactivity series.",
          ur: "پوٹاشیم ری ایکٹیویٹی سیریز میں سب سے اوپر ہے۔"
        }
      }
    ]
  },
  {
    id: 'chem-09',
    chapterNumber: 9,
    grade: '10',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Acids, Bases and Salts & The pH Scale",
      ur: "تیزاب، اساس، نمکیات اور پی ایچ سکیل"
    },
    description: {
      en: "Arrhenius and Bronsted-Lowry concepts, pH scale, neutralization reactions, and salts preparation.",
      ur: "تیزاب اور اساس کے نظریات، پی ایچ سکیل، نیوٹرلائزیشن اور نمکیات کی تیاری۔"
    },
    content: {
      en: `<h3>9.1 Theories of Acids and Bases</h3>
      <ul>
        <li><strong>Arrhenius:</strong> Acids produce H+ ions in water; Bases produce OH- ions.</li>
        <li><strong>Bronsted-Lowry:</strong> Acid is a proton (H+) donor; Base is a proton acceptor.</li>
      </ul>
      <h3>9.2 The pH Scale</h3>
      <p>$pH = -\\log[H^+]$. Pure water has $pH = 7$ (neutral). $pH < 7$ is acidic, $pH > 7$ is basic.</p>`,
      ur: `<h3>9.1 تیزاب اور اساس کے نظریات</h3>
      <p>آرہیئنس کے مطابق تیزاب پانی میں H+ آئنز اور اساس OH- آئنز پیدا کرتے ہیں۔ پی ایچ 7 نیوٹرل، 7 سے کم تیزابی اور 7 سے زیادہ اساسی ہوتا ہے۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Neutralization reaction: Acid + Base -> Salt + Water.", ur: "تیزاب اور اساس کے ملاپ سے نمک اور پانی بنتا ہے (نیوٹرلائزیشن)۔" }
      ],
      formulas: ["pH = -log[H+]", "pOH = -log[OH-]", "pH + pOH = 14 at 25°C"],
      workedExamples: [
        {
          question: {
            en: "What is the pH of a solution with [H+] = 10⁻³ M?",
            ur: "اگر [H+] = 10⁻³ M ہو تو محلول کا pH کیا ہوگا؟"
          },
          solution: {
            en: "pH = -log(10⁻³) = -(-3) = 3 (Strongly acidic).",
            ur: "pH = -log(10⁻³) = 3 (تیزابی)۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-9',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "What is the pH of pure neutral water at 25°C?",
          ur: "25 ڈگری سینٹی گریڈ پر خالص پانی کا pH کتنا ہوتا ہے؟"
        },
        options: [
          { en: "7", ur: "7" },
          { en: "0", ur: "0" },
          { en: "14", ur: "14" },
          { en: "1", ur: "1" }
        ],
        correctAnswer: "7",
        explanation: {
          en: "Neutral water has equal concentrations of H+ and OH- ions, giving pH = 7.",
          ur: "خالص پانی کا pH ٹھیک 7 ہوتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'chem-10',
    chapterNumber: 10,
    grade: '10',
    subject: Subject.CHEMISTRY,
    title: {
      en: "Organic Chemistry & Hydrocarbons",
      ur: "نامیاتی کیمیا اور ہائیڈرو کاربنز"
    },
    description: {
      en: "Catenation of carbon, alkanes, alkenes, alkynes, functional groups, and combustion reactions.",
      ur: "کاربن کی کیٹینیشن، الکینز، الکینز، الکائنز اور نامیاتی مرکبات۔"
    },
    content: {
      en: `<h3>10.1 Unique Nature of Carbon</h3>
      <p>Carbon forms diverse stable chains due to <strong>catenation</strong> (self-linking) and tetravalency.</p>
      <h3>10.2 Saturated vs Unsaturated Hydrocarbons</h3>
      <ul>
        <li><strong>Alkanes:</strong> Saturated single bonds $C_n H_{2n+2}$ (e.g. Methane $CH_4$, Ethane $C_2H_6$).</li>
        <li><strong>Alkenes:</strong> Double bond $C_n H_{2n}$ (e.g. Ethene $C_2H_4$).</li>
        <li><strong>Alkynes:</strong> Triple bond $C_n H_{2n-2}$ (e.g. Ethyne $C_2H_2$).</li>
      </ul>`,
      ur: `<h3>10.1 ہائیڈرو کاربنز</h3>
      <p>کاربن اور ہائیڈروجن کے مرکبات کو ہائیڈرو کاربنز کہتے ہیں۔ الکینز ($C_n H_{2n+2}$)، الکینز ($C_n H_{2n}$) اور الکائنز ($C_n H_{2n-2}$) ان کی بنیادی اقسام ہیں۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Methane (CH4) is known as Marsh gas and is the main component of natural gas (Sui gas).", ur: "قدرتی گیس (سوئی گیس) کا بنیادی جزو میتھین (CH4) گیس ہے۔" }
      ],
      formulas: ["Alkanes: CnH2n+2", "Alkenes: CnH2n", "Alkynes: CnH2n-2"],
      workedExamples: [
        {
          question: {
            en: "What is the molecular formula of an alkane containing 3 carbon atoms?",
            ur: "3 کاربن ایٹمز والے الکین کا مالیکیولر فارمولا کیا ہوگا؟"
          },
          solution: {
            en: "For n = 3: C_n H_(2n+2) = C3 H_(2×3 + 2) = C3H8 (Propane).",
            ur: "فارمولے CnH2n+2 کے تحت C3H8 (پروپین) ہوگا۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-chem-10',
        subject: Subject.CHEMISTRY,
        type: QuestionType.MCQ,
        text: {
          en: "What is the general formula of alkenes?",
          ur: "الکینز (Alkenes) کا عمومی فارمولا کیا ہے؟"
        },
        options: [
          { en: "CnH2n", ur: "CnH2n" },
          { en: "CnH2n+2", ur: "CnH2n+2" },
          { en: "CnH2n-2", ur: "CnH2n-2" },
          { en: "CnHn", ur: "CnHn" }
        ],
        correctAnswer: "CnH2n",
        explanation: {
          en: "Alkenes have one double bond and the formula CnH2n.",
          ur: "الکینز کا عمومی فارمولا CnH2n ہے۔"
        }
      }
    ]
  },

  // ===================== BIOLOGY (10 Topics - Pre-Medical Track) =====================
  {
    id: 'bio-01',
    chapterNumber: 1,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "Introduction to Biology & Life Organization",
      ur: "حیاتیات کا تعارف اور حیات کی تنظیم"
    },
    description: {
      en: "Major branches of biology, Muslim scientists (Jabir ibn Hayyan, Bu Ali Sina), and levels of biological organization.",
      ur: "حیاتیات کی اہم شاخیں، مسلم سائنسدان اور حیات کی تنظیمی سطحیں۔"
    },
    content: {
      en: `<h3>1.1 Branches of Biology</h3>
      <p>Zoology (animals), Botany (plants), Microbiology (microorganisms), Anatomy, Physiology, Genetics, Biotechnology, and Ecology.</p>
      <h3>1.2 Levels of Biological Organization</h3>
      <p>Subatomic particles -> Atoms -> Molecules -> Organelles -> Cells -> Tissues -> Organs -> Organ Systems -> Individual Organism -> Population -> Community -> Biosphere.</p>`,
      ur: `<h3>1.1 حیاتیات کی شاخیں</h3>
      <p>حیاتیات جانداروں کے مطالعے کا علم ہے۔ اس کی بنیادی شاخوں میں باٹنی (پودے)، زولوجی (جانور) اور مائیکرو بائیولوجی شامل ہیں۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Cell is the fundamental structural and functional unit of living organisms.", ur: "سیل تمام جانداروں کی بنیادی ساختی اور فعلی اکائی ہے۔" }
      ],
      formulas: ["Biological Hierarchy: Cell -> Tissue -> Organ -> Organ System -> Organism"],
      workedExamples: [
        {
          question: {
            en: "Name two prominent Muslim scientists and their contributions to biology.",
            ur: "دو مشہور مسلم سائنسدانوں اور ان کی خدمات کے نام بتائیں۔"
          },
          solution: {
            en: "Jabir ibn Hayyan (wrote Al-Nabatat on plants) and Bu Ali Sina (wrote Al-Qanun fi al-Tibb, the Canon of Medicine).",
            ur: "جابر بن حیان (کتاب النباتات) اور بو علی سینا (القانون فی الطب کے مصنف)۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-1',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "Who is known as the founder of modern medicine and author of Al-Qanun fi al-Tibb?",
          ur: "جدید طب کے بانی اور القانون فی الطب کے مصنف کون ہیں؟"
        },
        options: [
          { en: "Bu Ali Sina (Avicenna)", ur: "بو علی سینا" },
          { en: "Jabir ibn Hayyan", ur: "جابر بن حیان" },
          { en: "Abdul Malik Asmai", ur: "عبدالملک اصمعی" },
          { en: "Al-Razi", ur: "الرازی" }
        ],
        correctAnswer: "Bu Ali Sina (Avicenna)",
        explanation: {
          en: "Bu Ali Sina authored the famous Canon of Medicine.",
          ur: "بو علی سینا کو طب کا عظیم استاد اور القانون فی الطب کا مصنف مانا جاتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'bio-02',
    chapterNumber: 2,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "Solving a Biological Problem",
      ur: "حیاتیاتی مسئلہ حل کرنا"
    },
    description: {
      en: "Scientific method steps, hypothesis formulation, deduction, and Ronald Ross's malaria discovery.",
      ur: "سائنسی طریقہ کار، مفروضہ، استخراج، تجربات اور ملیریا کی دریافت۔"
    },
    content: {
      en: `<h3>2.1 Steps in Biological Method</h3>
      <ol>
        <li>Recognition of Biological Problem</li>
        <li>Observations (Qualitative and Quantitative)</li>
        <li>Hypothesis (A tentative explanation)</li>
        <li>Deductions (Logical consequences of hypothesis)</li>
        <li>Experimentation (Control group vs Experimental group)</li>
        <li>Summarization of Results and Reporting</li>
      </ol>
      <h3>2.2 The Malaria Case Study</h3>
      <p>Laveran observed Plasmodium in malaria patient blood; Ronald Ross proved Anopheles mosquitoes transmit malaria to humans.</p>`,
      ur: `<h3>2.1 حیاتیاتی طریقہ کار</h3>
      <p>مشاہدات، مفروضہ سازی، استخراج اور تجربات کے ذریعے حیاتیاتی مسائل حل کیے جاتے ہیں۔ ملیریا پر رونالڈ راس نے تجربات کیے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Hypothesis must be testable and falsifiable through controlled experiments.", ur: "مفروضے کو تجربات کے ذریعے غلط یا درست ثابت کیا جا سکتا ہے۔" }
      ],
      formulas: ["Scientific Method: Observation -> Hypothesis -> Deduction -> Experiment"],
      workedExamples: [
        {
          question: {
            en: "What vector transmits Plasmodium in humans to cause malaria?",
            ur: "انسانوں میں ملیریا پھیلانے والا مچھر کون سا ہے؟"
          },
          solution: {
            en: "Female Anopheles mosquito transmits Plasmodium parasite causing malaria.",
            ur: "مادہ اینوفیلیز مچھر انسانوں میں ملیریا کے پلازموڈیم منتقل کرتا ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-2',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "Which mosquito species transmits malaria to humans?",
          ur: "کون سا مچھر انسانوں میں ملیریا منتقل کرتا ہے؟"
        },
        options: [
          { en: "Female Anopheles", ur: "مادہ اینوفیلیز" },
          { en: "Culex", ur: "کیولیکس" },
          { en: "Aedes aegypti", ur: "ایڈیز ایجپٹی" },
          { en: "Male Anopheles", ur: "نر اینوفیلیز" }
        ],
        correctAnswer: "Female Anopheles",
        explanation: {
          en: "Female Anopheles bites humans for egg nourishment and transmits Plasmodium.",
          ur: "مادہ اینوفیلیز انسانوں کو کاٹ کر پلازموڈیم منتقل کرتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'bio-03',
    chapterNumber: 3,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "Biodiversity & Five Kingdom Classification",
      ur: "حیاتیاتی تنوع اور پانچ کنگڈم نظام"
    },
    description: {
      en: "Robert Whittaker's Five Kingdom system (Monera, Protista, Fungi, Plantae, Animalia) and binomial nomenclature.",
      ur: "پانچ کنگڈم کلاسیفیکیشن، جانداروں کی جماعت بندی اور بائی نومیل نام رکھنے کا طریقہ۔"
    },
    content: {
      en: `<h3>3.1 Five Kingdom Classification</h3>
      <ul>
        <li><strong>Monera:</strong> Unicellular prokaryotes without membrane-bound nucleus (Bacteria).</li>
        <li><strong>Protista:</strong> Unicellular or colonial eukaryotes (Amoeba, Paramecium, Algae).</li>
        <li><strong>Fungi:</strong> Eukaryotic absorptive heterotrophs with chitin cell walls (Moulds, Mushrooms).</li>
        <li><strong>Plantae:</strong> Multicellular autotrophic photosynthetic organisms with cellulose walls.</li>
        <li><strong>Animalia:</strong> Multicellular ingestive heterotrophs lacking cell walls.</li>
      </ul>`,
      ur: `<h3>3.1 پانچ کنگڈم درجہ بندی</h3>
      <p>رابرٹ وائٹیکر کے مطابق جاندار پانچ کنگڈمز میں تقسیم ہیں: مونیرا، پروٹسٹا، فنجائی، پلانٹی اور اینیملیا۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Carolus Linnaeus introduced binomial nomenclature (Genus species, e.g. Homo sapiens).", ur: "کارل لینیس نے سائنسی نام رکھنے کا بائی نومیل طریقہ وضع کیا۔" }
      ],
      formulas: ["Taxonomic Hierarchy: Kingdom -> Phylum -> Class -> Order -> Family -> Genus -> Species"],
      workedExamples: [
        {
          question: {
            en: "What is the scientific name of the onion plant according to binomial nomenclature?",
            ur: "پیاز کا سائنسی نام کیا ہے؟"
          },
          solution: {
            en: "Allium cepa.",
            ur: "ایلیم سیپا (Allium cepa)۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-3',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "Which kingdom includes prokaryotic organisms?",
          ur: "پروکیریوٹک جاندار کس کنگڈم میں شامل ہیں؟"
        },
        options: [
          { en: "Kingdom Monera", ur: "کنگڈم مونیرا" },
          { en: "Kingdom Protista", ur: "کنگڈم پروٹسٹا" },
          { en: "Kingdom Fungi", ur: "کنگڈم فنجائی" },
          { en: "Kingdom Plantae", ur: "کنگڈم پلانٹی" }
        ],
        correctAnswer: "Kingdom Monera",
        explanation: {
          en: "Bacteria and cyanobacteria lack a true membrane-bound nucleus and belong to Monera.",
          ur: "بیکٹیریا بغیر واضح مرکزے کے مونیرا میں آتے ہیں۔"
        }
      }
    ]
  },
  {
    id: 'bio-04',
    chapterNumber: 4,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "Cells and Tissues",
      ur: "سیلز اور ٹشوز"
    },
    description: {
      en: "Microscopy, organelle functions (Mitochondria, Ribosomes, Nucleus), and plant vs animal cells.",
      ur: "مائیکروسکوپی، سیل کے آرگنیلز (مائٹوکونڈریا، رائبوسوم، نیوکلیئس) اور پودوں اور جانوروں کے سیلز۔"
    },
    content: {
      en: `<h3>4.1 Cell Organelles</h3>
      <ul>
        <li><strong>Nucleus:</strong> Contains DNA/chromatin, directs cellular activities.</li>
        <li><strong>Mitochondria:</strong> Powerhouse of the cell, site of aerobic cellular respiration (ATP synthesis).</li>
        <li><strong>Ribosomes:</strong> Non-membrane sites of protein synthesis.</li>
        <li><strong>Endoplasmic Reticulum & Golgi Apparatus:</strong> Protein folding and packaging.</li>
      </ul>
      <p>Plant cells uniquely possess chloroplasts for photosynthesis and a rigid cellulose cell wall.</p>`,
      ur: `<h3>4.1 سیل کے اجزاء</h3>
      <p>مائٹوکونڈریا کو سیل کا پاور ہاؤس کہتے ہیں جہاں توانائی (ATP) بنتی ہے۔ پودوں کے سیل میں سیل وال اور کلوروپلاسٹ موجود ہوتے ہیں۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Diffusion and Osmosis are passive transports requiring no ATP.", ur: "ڈیفیوژن اور اوسموسس میں توانائی خرچ نہیں ہوتی۔" }
      ],
      formulas: ["Magnification = Image size / Actual size"],
      workedExamples: [
        {
          question: {
            en: "Why are mitochondria called the powerhouses of the cell?",
            ur: "مائٹوکونڈریا کو سیل کا پاور ہاؤس کیوں کہا جاتا ہے؟"
          },
          solution: {
            en: "Because they generate adenosine triphosphate (ATP), the universal chemical energy currency of cellular work.",
            ur: "کیونکہ وہ سیلولر ریسپائریشن کے ذریعے زندگی کی بنیادی توانائی ATP پیدا کرتے ہیں۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-4',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "Which organelle is responsible for synthesizing ATP?",
          ur: "ATP بنانے کا ذمہ دار کون سا آرگنیل ہے؟"
        },
        options: [
          { en: "Mitochondria", ur: "مائٹوکونڈریا" },
          { en: "Ribosome", ur: "رائبوسوم" },
          { en: "Lysosome", ur: "لائسوسوم" },
          { en: "Vacuole", ur: "ویکیول" }
        ],
        correctAnswer: "Mitochondria",
        explanation: {
          en: "Mitochondria carry out cellular respiration to produce ATP.",
          ur: "مائٹوکونڈریا سیل کو توانائی (ATP) فراہم کرتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'bio-05',
    chapterNumber: 5,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "The Cell Cycle: Mitosis & Meiosis",
      ur: "سیل سائیکل: مائٹوسس اور میوسس"
    },
    description: {
      en: "Interphase (G1, S, G2), stages of mitosis (Prophase, Metaphase, Anaphase, Telophase), and meiosis crossing over.",
      ur: "سیل سائیکل کے مراحل، مائٹوسس اور میوسس کی اہمیت اور کراسنگ اوور۔"
    },
    content: {
      en: `<h3>5.1 Mitosis</h3>
      <p>Equational cell division producing two genetically identical diploid (2n) daughter cells. Essential for growth, tissue repair, and asexual reproduction.</p>
      <ol>
        <li><strong>Prophase:</strong> Chromatin condenses into visible chromosomes; nuclear membrane vanishes.</li>
        <li><strong>Metaphase:</strong> Chromosomes align at equatorial plate.</li>
        <li><strong>Anaphase:</strong> Sister chromatids separate toward opposite poles.</li>
        <li><strong>Telophase:</strong> Nuclear envelope re-forms; followed by cytokinesis.</li>
      </ol>`,
      ur: `<h3>5.1 مائٹوسس کے مراحل</h3>
      <p>پروفیز، میٹافیز، اینافیز اور ٹیلوفیز کے ذریعے ایک سیل سے دو ایک جیسے سیلز بنتے ہیں۔ میوسس میں چار ہیپلائڈ سیلز بنتے ہیں۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Crossing over during Meiosis I creates genetic variation in offspring.", ur: "میوسس کے دوران کراسنگ اوور جانداروں میں جینیاتی تنوع پیدا کرتی ہے۔" }
      ],
      formulas: ["Mitosis: 1 Diploid (2n) -> 2 Diploids (2n)", "Meiosis: 1 Diploid (2n) -> 4 Haploids (1n)"],
      workedExamples: [
        {
          question: {
            en: "At what phase of mitosis do chromosomes align at the cell equator?",
            ur: "مائٹوسس کے کس مرحلے میں کروموسومز سیل کے درمیان میں قطار بناتے ہیں؟"
          },
          solution: {
            en: "Metaphase.",
            ur: "میٹافیز (Metaphase) میں۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-5',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "How many daughter cells are produced at the end of meiosis?",
          ur: "میوسس کے اختتام پر کتنے نئے سیلز بنتے ہیں؟"
        },
        options: [
          { en: "4 Haploid cells", ur: "4 ہیپلائڈ سیلز" },
          { en: "2 Diploid cells", ur: "2 ڈپلوئڈ سیلز" },
          { en: "1 Cell", ur: "1 سیل" },
          { en: "8 Cells", ur: "8 سیلز" }
        ],
        correctAnswer: "4 Haploid cells",
        explanation: {
          en: "Meiosis undergoes two nuclear divisions to yield 4 haploid gamete cells.",
          ur: "میوسس کے نتیجے میں 4 ہیپلائڈ سیلز بنتے ہیں۔"
        }
      }
    ]
  },
  {
    id: 'bio-06',
    chapterNumber: 6,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "Enzymes & Biocatalysis",
      ur: "انزائمز اور بائیو کیٹالیسس"
    },
    description: {
      en: "Characteristics of enzymes, activation energy, Lock and Key model, induced fit, temperature and pH effects.",
      ur: "انزائمز کے خواص، ایکٹیویشن انرجی، لاک اینڈ کی ماڈل اور درجہ حرارت اور پی ایچ کا اثر۔"
    },
    content: {
      en: `<h3>6.1 Nature of Enzymes</h3>
      <p>Enzymes are protein biological catalysts that accelerate chemical reactions by lowering the activation energy without being consumed.</p>
      <h3>6.2 Mechanisms</h3>
      <p><strong>Lock and Key Model (Emil Fischer):</strong> Active site is rigid and fits substrate precisely.</p>
      <p><strong>Induced Fit Model (Daniel Koshland):</strong> Active site undergoes conformational change upon substrate binding.</p>`,
      ur: `<h3>6.1 انزائمز</h3>
      <p>انزائمز پروٹین پر مشتمل بائیولوجیکل کیٹالسٹس ہیں جو ایکٹیویشن انرجی کو کم کر کے کیمیائی ردعمل کو تیز کرتے ہیں۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Extreme temperature or abnormal pH permanently denatures enzyme protein structure.", ur: "بہت زیادہ درجہ حرارت پر انزائمز ڈینیچر (ناکارہ) ہو جاتے ہیں۔" }
      ],
      formulas: ["Enzyme + Substrate <-> Enzyme-Substrate Complex -> Enzyme + Product"],
      workedExamples: [
        {
          question: {
            en: "What is the optimum operating temperature for human enzymes?",
            ur: "انسانی انزائمز کے کام کرنے کا بہترین درجہ حرارت کیا ہے؟"
          },
          solution: {
            en: "37 °C (normal human body temperature).",
            ur: "37 ڈگری سینٹی گریڈ۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-6',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "How do enzymes speed up chemical reactions?",
          ur: "انزائمز کیمیائی ردعمل کی رفتار کیسے بڑھاتے ہیں؟"
        },
        options: [
          { en: "By lowering activation energy", ur: "ایکٹیویشن انرجی کو کم کر کے" },
          { en: "By increasing temperature", ur: "درجہ حرارت بڑھا کر" },
          { en: "By changing the products", ur: "پراڈکٹس کو تبدیل کر کے" },
          { en: "By increasing substrate mass", ur: "سولیوٹ کی مقدار بڑھا کر" }
        ],
        correctAnswer: "By lowering activation energy",
        explanation: {
          en: "Enzymes catalyze reactions by lowering required activation energy.",
          ur: "انزائمز درکار ایکٹیویشن انرجی کو کم کر کے رفتار تیز کرتے ہیں۔"
        }
      }
    ]
  },
  {
    id: 'bio-07',
    chapterNumber: 7,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "Bioenergetics: Photosynthesis & Respiration",
      ur: "بائیو انرجیٹکس: ضیائی تالیف اور ریسپائریشن"
    },
    description: {
      en: "ATP cycle, Light and Dark reactions (Calvin cycle), Glycolysis, Krebs cycle, and Electron Transport Chain.",
      ur: "فوٹوسنتھیسز کے نوری اور تاریک مراحل، سیلولر ریسپائریشن، گلائکولائسز اور کریبس سائیکل۔"
    },
    content: {
      en: `<h3>7.1 Photosynthesis</h3>
      <p>$6CO_2 + 12H_2O + \\text{Light} \\rightarrow C_6H_{12}O_6 + 6O_2 + 6H_2O$. Occurs in chloroplast thylakoids (light reactions) and stroma (Calvin cycle).</p>
      <h3>7.2 Cellular Respiration</h3>
      <p>Aerobic breakdown of glucose yielding ~36-38 ATP: Glycolysis -> Krebs Cycle -> Electron Transport Chain.</p>`,
      ur: `<h3>7.1 فوٹوسنتھیسز اور ریسپائریشن</h3>
      <p>پودے سورج کی روشنی، کاربن ڈائی آکسائیڈ اور پانی سے گلوکوز اور آکسیجن بناتے ہیں۔ ریسپائریشن میں گلوکوز ٹوٹ کر ATP بناتا ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Chlorophyll reflects green light and absorbs blue and red wavelengths.", ur: "کلوروفل نیلی اور سرخ روشنی کو جذب کر کے سبز کو خارج کرتا ہے۔" }
      ],
      formulas: ["6 CO2 + 6 H2O -> C6H12O6 + 6 O2", "ATP <-> ADP + Phosphate + Energy (7.3 kcal/mol)"],
      workedExamples: [
        {
          question: {
            en: "Where does glycolysis take place inside the cell?",
            ur: "سیل کے اندر گلائکولائسز کا عمل کہاں ہوتا ہے؟"
          },
          solution: {
            en: "In the cytoplasm (cytosol).",
            ur: "سائٹوپلازم (Cytoplasm) کے اندر۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-7',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "What gas is released as a byproduct during photosynthesis?",
          ur: "فوٹوسنتھیسز کے عمل میں کون سی گیس خارج ہوتی ہے؟"
        },
        options: [
          { en: "Oxygen (O2)", ur: "آکسیجن (O2)" },
          { en: "Carbon Dioxide (CO2)", ur: "کاربن ڈائی آکسائیڈ" },
          { en: "Nitrogen (N2)", ur: "نائٹروجن" },
          { en: "Methane (CH4)", ur: "میتھین" }
        ],
        correctAnswer: "Oxygen (O2)",
        explanation: {
          en: "Photolysis of water during light reactions releases oxygen gas.",
          ur: "پانی کے ٹوٹنے سے آکسیجن گیس خارج ہوتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'bio-08',
    chapterNumber: 8,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "Nutrition & Human Digestive System",
      ur: "غذائیت اور انسانی نظامِ انہضام"
    },
    description: {
      en: "Mineral nutrition, balanced diet, human alimentary canal (oral cavity, stomach, intestines, liver, pancreas).",
      ur: "متوازن غذا، انسانی نظام انہضام کے حصے (معدہ، جگر، آنتیں) اور ہاضمہ کے خامرے۔"
    },
    content: {
      en: `<h3>8.1 Human Digestive System</h3>
      <ul>
        <li><strong>Oral Cavity:</strong> Teeth masticate; Salivary amylase begins starch digestion.</li>
        <li><strong>Stomach:</strong> Gastric juice (HCl + Pepsin) digests proteins.</li>
        <li><strong>Small Intestine:</strong> Bile from liver emulsifies fats; Pancreatic enzymes complete digestion; Villi absorb nutrients into blood.</li>
      </ul>`,
      ur: `<h3>8.1 نظامِ انہضام</h3>
      <p>منہ میں نشاستہ، معدے میں پروٹین اور چھوٹی آنت میں خوراک کی مکمل ہضم اور انجذاب ولاء (Villi) کے ذریعے ہوتا ہے۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Bile produced by liver has no enzymes; it emulsifies large fat globules.", ur: "جگر کا بائل چربی کو تحلیل (ایملسیفائی) کرتا ہے۔" }
      ],
      formulas: ["Digestive Flow: Mouth -> Pharynx -> Esophagus -> Stomach -> Small Intestine -> Large Intestine"],
      workedExamples: [
        {
          question: {
            en: "What is the function of hydrochloric acid (HCl) in gastric juice?",
            ur: "معدے میں ہائیڈروکلورک ایسڈ (HCl) کا کیا کام ہے؟"
          },
          solution: {
            en: "It creates an acidic pH to kill ingested bacteria and activates pepsinogen into active pepsin.",
            ur: "یہ جراثیم کو مارتا ہے اور پیپسن انزائم کو فعال کر کے پروٹین ہضم کرنے میں مدد دیتا ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-8',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "Where does the maximum absorption of digested nutrients occur in humans?",
          ur: "انسان میں ہضم شدہ غذا کا سب سے زیادہ انجذاب کہاں ہوتا ہے؟"
        },
        options: [
          { en: "Small Intestine (Villi)", ur: "چھوٹی آنت (Villi)" },
          { en: "Stomach", ur: "معدہ" },
          { en: "Large Intestine", ur: "بڑی آنت" },
          { en: "Esophagus", ur: "خوراک کی نالی" }
        ],
        correctAnswer: "Small Intestine (Villi)",
        explanation: {
          en: "The microvilli of the small intestine provide a massive surface area for nutrient absorption.",
          ur: "چھوٹی آنت میں ولاء کی مدد سے غذا خون میں جذب ہوتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'bio-09',
    chapterNumber: 9,
    grade: '9',
    subject: Subject.BIOLOGY,
    title: {
      en: "Transport: Circulation & Plant Transport",
      ur: "ٹرانسپورٹ: پودوں میں ترسیل اور انسانی خون کی گردش"
    },
    description: {
      en: "Xylem and phloem, transpiration pull, human heart structure, cardiac cycle, and ABO blood groups.",
      ur: "پودوں میں زائلم اور فلوئم، انسانی دل کی ساخت، خون کی گردش اور ABO بلڈ گروپس۔"
    },
    content: {
      en: `<h3>9.1 Transport in Plants</h3>
      <p><strong>Xylem:</strong> Transports water and minerals upward via transpiration pull.</p>
      <p><strong>Phloem:</strong> Translocates organic food (sucrose) from source to sink.</p>
      <h3>9.2 Human Circulatory System</h3>
      <p>Four-chambered heart (2 atria, 2 ventricles). Double circulation: Pulmonary (heart to lungs) and Systemic (heart to body tissues).</p>`,
      ur: `<h3>9.1 ٹرانسپورٹ سسٹم</h3>
      <p>پودوں میں زائلم پانی اور فلوئم خوراک لے جاتا ہے۔ انسان میں دل کے چار خانے اور دوہری گردش خون ہوتی ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Universal donor blood group is O-negative; universal recipient is AB-positive.", ur: "بلڈ گروپ O یونیورسل ڈونر اور AB یونیورسل وصول کنندہ کہلاتا ہے۔" }
      ],
      formulas: ["Cardiac Output = Heart Rate × Stroke Volume"],
      workedExamples: [
        {
          question: {
            en: "Differentiate between arteries and veins.",
            ur: "شریانوں (Arteries) اور وریدوں (Veins) میں فرق بتائیں۔"
          },
          solution: {
            en: "Arteries carry oxygenated blood away from the heart under high pressure with thick walls; veins carry deoxygenated blood back to heart with valves.",
            ur: "شریانیں دل سے صاف خون لے جاتی ہیں جبکہ وریدیں غیر صاف خون دل کی طرف واپس لاتی ہیں۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-9',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "Which plant tissue conducts water from roots to leaves?",
          ur: "پودوں میں جڑوں سے پتوں تک پانی کون سا ٹشو پہنچاتا ہے؟"
        },
        options: [
          { en: "Xylem", ur: "زائلم (Xylem)" },
          { en: "Phloem", ur: "فلوئم (Phloem)" },
          { en: "Parenchyma", ur: "پیرنکائما" },
          { en: "Collenchyma", ur: "کولنکائما" }
        ],
        correctAnswer: "Xylem",
        explanation: {
          en: "Xylem vessels conduct water and dissolved minerals from roots to aerial parts.",
          ur: "زائلم ٹشو جڑوں سے پانی پورے پودے کو فراہم کرتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'bio-10',
    chapterNumber: 10,
    grade: '10',
    subject: Subject.BIOLOGY,
    title: {
      en: "Gaseous Exchange & Respiratory System",
      ur: "گیسوں کا تبادلہ اور انسانی نظامِ تنفس"
    },
    description: {
      en: "Stomata in plants, human respiratory tract, alveoli structure, mechanism of breathing, and respiratory disorders.",
      ur: "پودوں میں اسٹوماٹا، انسانی ہوا کی نالی، پھیپھڑے اور سانس لینے کا طریقہ کار۔"
    },
    content: {
      en: `<h3>10.1 Human Respiratory System</h3>
      <p>Nasal Cavity -> Pharynx -> Larynx -> Trachea -> Bronchi -> Bronchioles -> Alveoli.</p>
      <h3>10.2 Mechanism of Breathing</h3>
      <ul>
        <li><strong>Inhalation:</strong> Diaphragm contracts and flattens; ribs move upward and outward; thoracic volume increases; air rushes in.</li>
        <li><strong>Exhalation:</strong> Passive relaxation of diaphragm and intercostal muscles pushes air out.</li>
      </ul>`,
      ur: `<h3>10.1 نظامِ تنفس</h3>
      <p>سانس کی نالی، برونکائی اور ایلویولائی مل کر گیسوں کا تبادلہ کرتے ہیں۔ ایلویولائی پھیپھڑوں کی بنیادی فعال اکائی ہیں۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "Alveoli have rich capillary networks and single-cell-thick walls for rapid diffusion of O2 and CO2.", ur: "ایلویولائی میں خون کی کیپلریز کا جال پھیلا ہوتا ہے جہاں سے آکسیجن خون میں جاتی ہے۔" }
      ],
      formulas: ["Gas Exchange: Alveoli (High O2) -> Blood Capillaries (Low O2)"],
      workedExamples: [
        {
          question: {
            en: "What is the structural unit of the human lung where gas exchange occurs?",
            ur: "انسانی پھیپھڑوں کی ساختی اکائی کیا ہے جہاں گیسوں کا تبادلہ ہوتا ہے؟"
          },
          solution: {
            en: "Alveoli (microscopic air sacs).",
            ur: "ایلویولائی (Alveoli)۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-bio-10',
        subject: Subject.BIOLOGY,
        type: QuestionType.MCQ,
        text: {
          en: "What happens to the diaphragm during inhalation?",
          ur: "سانس اندر کھینچتے وقت ڈایافرام کی کیا حالت ہوتی ہے؟"
        },
        options: [
          { en: "It contracts and flattens", ur: "یہ سکڑ کر سیدھا (فلیٹ) ہو جاتا ہے" },
          { en: "It relaxes into a dome shape", ur: "یہ گنبد نما ہو جاتا ہے" },
          { en: "It moves upward", ur: "یہ اوپر کی طرف اٹھتا ہے" },
          { en: "No change occurs", ur: "کوئی تبدیلی نہیں ہوتی" }
        ],
        correctAnswer: "It contracts and flattens",
        explanation: {
          en: "During inhalation, the diaphragm contracts and moves downward to expand chest cavity.",
          ur: "سانس اندر لیتے وقت ڈایافرام سکڑ کر نیچے ہو جاتا ہے تاکہ پھیپھڑوں میں ہوا بھر سکے۔"
        }
      }
    ]
  },

  // ===================== MATHEMATICS (10 Topics - Pre-Engineering Track) =====================
  {
    id: 'math-01',
    chapterNumber: 1,
    grade: '9',
    subject: Subject.MATH,
    title: {
      en: "Real and Complex Numbers",
      ur: "حقیقی اور غیر حقیقی (کمپلیکس) اعداد"
    },
    description: {
      en: "Properties of real numbers, radicals, indices, imaginary unit i, conjugate, and operations on complex numbers.",
      ur: "حقیقی اعداد کے خواص، ریڈیکلز، امیجنری یونٹ (i) اور کمپلیکس اعداد کے الجبرائی اصول۔"
    },
    content: {
      en: `<h3>1.1 Real Numbers</h3>
      <p>Union of rational numbers ($Q$) and irrational numbers ($Q'$). Obeys closure, commutative, associative, and distributive properties.</p>
      <h3>1.2 Complex Numbers ($z = a + bi$)</h3>
      <p>where $a = \\text{Re}(z)$ and $b = \\text{Im}(z)$, and $i = \\sqrt{-1}$ ($i^2 = -1$). Conjugate $\\bar{z} = a - bi$. Modulus $|z| = \\sqrt{a^2 + b^2}$.</p>`,
      ur: `<h3>1.1 حقیقی اور کمپلیکس اعداد</h3>
      <p>کمپلیکس نمبر کی عام شکل $z = a + bi$ ہے جہاں $i^2 = -1$ ہے۔ اس کا کنجوگیٹ $a - bi$ اور ماڈیولس $\\sqrt{a^2 + b^2}$ ہوتا ہے۔</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "i² = -1, i³ = -i, i⁴ = 1.", ur: "i² کی قیمت -1 ہوتی ہے اور i⁴ = 1 ہے۔" }
      ],
      formulas: ["z = a + bi", "Conjugate: a - bi", "|z| = sqrt(a^2 + b^2)", "(a+bi)(a-bi) = a^2 + b^2"],
      workedExamples: [
        {
          question: {
            en: "Find the modulus of complex number z = 3 + 4i.",
            ur: "کمپلیکس نمبر z = 3 + 4i کا ماڈیولس معلوم کریں۔"
          },
          solution: {
            en: "|z| = √(3² + 4²) = √(9 + 16) = √25 = 5.",
            ur: "|z| = √(9 + 16) = 5۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-1',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "What is the value of i² (iota squared)?",
          ur: "i² (ایوٹا اسکوائر) کی قیمت کیا ہے؟"
        },
        options: [
          { en: "-1", ur: "-1" },
          { en: "1", ur: "1" },
          { en: "0", ur: "0" },
          { en: "√-1", ur: "√-1" }
        ],
        correctAnswer: "-1",
        explanation: {
          en: "By definition, the imaginary unit i = √(-1), so i² = -1.",
          ur: "تعریف کے مطابق ایوٹا کا مربع -1 ہوتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'math-02',
    chapterNumber: 2,
    grade: '9',
    subject: Subject.MATH,
    title: {
      en: "Sets and Functions",
      ur: "سیٹس اور فنکشنز"
    },
    description: {
      en: "Set operations, De Morgan's laws, Venn diagrams, binary relations, and types of functions (bijective, injective).",
      ur: "سیٹس کے آپریشنز، ڈی مورگن کے قوانین، وین ڈایاگرام اور فنکشنز کی اقسام۔"
    },
    content: {
      en: `<h3>2.1 Set Operations</h3>
      <ul>
        <li><strong>Union ($A \\cup B$):</strong> Elements belonging to $A$ or $B$ or both.</li>
        <li><strong>Intersection ($A \\cap B$):</strong> Common elements.</li>
        <li><strong>Difference ($A - B$):</strong> Elements in $A$ not in $B$.</li>
      </ul>
      <h3>2.2 De Morgan's Laws</h3>
      <p>1. $(A \\cup B)' = A' \\cap B'$<br/>2. $(A \\cap B)' = A' \\cup B'$</p>`,
      ur: `<h3>2.1 سیٹس اور ڈی مورگن کے قوانین</h3>
      <p>ڈی مورگن کے قوانین: $(A \\cup B)' = A' \\cap B'$ اور $(A \\cap B)' = A' \\cup B'$۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "A bijective function is both one-to-one (injective) and onto (surjective).", ur: "بائیجیکٹو فنکشن وہ ہوتا ہے جو ون ٹو ون بھی ہو اور آن ٹو بھی۔" }
      ],
      formulas: ["(A ∪ B)' = A' ∩ B'", "(A ∩ B)' = A' ∪ B'", "n(A ∪ B) = n(A) + n(B) - n(A ∩ B)"],
      workedExamples: [
        {
          question: {
            en: "If A = {1, 2, 3} and B = {3, 4, 5}, find A ∩ B.",
            ur: "اگر A = {1, 2, 3} اور B = {3, 4, 5} ہوں تو A ∩ B معلوم کریں۔"
          },
          solution: {
            en: "A ∩ B = {3} (the common element).",
            ur: "A ∩ B = {3} (مشترک عنصر)۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-2',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "According to De Morgan's Law, what is (A ∪ B)' equal to?",
          ur: "ڈی مورگن کے قانون کے مطابق (A ∪ B)' کس کے برابر ہے؟"
        },
        options: [
          { en: "A' ∩ B'", ur: "A' ∩ B'" },
          { en: "A' ∪ B'", ur: "A' ∪ B'" },
          { en: "A ∩ B", ur: "A ∩ B" },
          { en: "A' - B'", ur: "A' - B'" }
        ],
        correctAnswer: "A' ∩ B'",
        explanation: {
          en: "Complement of union is intersection of complements: (A ∪ B)' = A' ∩ B'.",
          ur: "یونین کا کمپلیمنٹ انفرادی کمپلیمنٹس کا انٹرسیکشن ہوتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'math-03',
    chapterNumber: 3,
    grade: '9',
    subject: Subject.MATH,
    title: {
      en: "Matrices and Determinants",
      ur: "میٹرکس اور ڈیٹرمیننٹس"
    },
    description: {
      en: "Order of matrix, addition, multiplication, adjoint, multiplicative inverse, and solving linear systems by Cramer's Rule.",
      ur: "میٹرکس کا مرتبہ، ضرب، ایڈجوائنٹ، ملٹیپلیکیٹو انورس اور کرائمر کے قانون سے مساوات کا حل۔"
    },
    content: {
      en: `<h3>3.1 Determinant & Inverse of a 2x2 Matrix</h3>
      <p>For $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, $\\det(A) = |A| = ad - bc$.</p>
      <p>If $|A| \\neq 0$ (non-singular), $A^{-1} = \\frac{1}{|A|} \\text{Adj}(A) = \\frac{1}{ad - bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.</p>
      <h3>3.2 Cramer's Rule</h3>
      <p>$x = D_x / D$ and $y = D_y / D$.</p>`,
      ur: `<h3>3.1 میٹرکس کا مقطع اور انورس</h3>
      <p>اگر ڈیٹرمیننٹ صفر نہ ہو تو میٹرکس کا معکوس $A^{-1} = \\frac{1}{|A|} \\text{Adj}(A)$ ہوتا ہے۔ کرائمر کے طریقے سے مساوات حل کی جاتی ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "A matrix with determinant 0 is singular and has no multiplicative inverse.", ur: "جس میٹرکس کا مقطع صفر ہو وہ سنگولر کہلاتا ہے اور اس کا انورس ممکن نہیں۔" }
      ],
      formulas: ["det(A) = ad - bc", "Adj(A) = [d, -b; -c, a]", "x = Dx / D, y = Dy / D (Cramer's Rule)"],
      workedExamples: [
        {
          question: {
            en: "Find determinant of matrix A = [4, 2; 1, 3].",
            ur: "میٹرکس A = [4, 2; 1, 3] کا ڈیٹرمیننٹ معلوم کریں۔"
          },
          solution: {
            en: "|A| = (4)(3) - (2)(1) = 12 - 2 = 10.",
            ur: "|A| = (4×3) - (2×1) = 12 - 2 = 10۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-3',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "What is a matrix called if its determinant is equal to 0?",
          ur: "اگر کسی میٹرکس کا مقطع (Determinant) صفر ہو تو وہ کیا کہلاتا ہے؟"
        },
        options: [
          { en: "Singular Matrix", ur: "سنگولر (نادر) میٹرکس" },
          { en: "Non-singular Matrix", ur: "نان سنگولر میٹرکس" },
          { en: "Identity Matrix", ur: "شناختی میٹرکس" },
          { en: "Diagonal Matrix", ur: "وتری میٹرکس" }
        ],
        correctAnswer: "Singular Matrix",
        explanation: {
          en: "A matrix with det(A) = 0 is singular and cannot be inverted.",
          ur: "صفر مقطع والا میٹرکس سنگولر کہلاتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'math-04',
    chapterNumber: 4,
    grade: '9',
    subject: Subject.MATH,
    title: {
      en: "Algebraic Expressions & Formulas",
      ur: "الجبری جملے اور بنیادی فارمولے"
    },
    description: {
      en: "Polynomials, rational expressions, expanding squares and cubes, and surds rationalization.",
      ur: "کثیر رقمی جملے، الجبری کلیات (مربعات اور مکعب) اور سرڈز کو ناطق بنانا۔"
    },
    content: {
      en: `<h3>4.1 Essential Algebraic Formulas</h3>
      <ul>
        <li>$(a + b)^2 = a^2 + 2ab + b^2$</li>
        <li>$(a - b)^2 = a^2 - 2ab + b^2$</li>
        <li>$a^2 - b^2 = (a - b)(a + b)$</li>
        <li>$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$</li>
        <li>$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$</li>
      </ul>`,
      ur: `<h3>4.1 الجبری کلیات</h3>
      <p>$(a + b)^2 = a^2 + 2ab + b^2$<br/>$a^2 - b^2 = (a - b)(a + b)$<br/>$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$</p>`
    },
    weightage: 12,
    practice: {
      keyPoints: [
        { en: "To rationalize the denominator of a + √b, multiply numerator and denominator by its conjugate a - √b.", ur: "ڈینومینیٹر کو ناطق بنانے کے لیے اس کے کنجوگیٹ سے ضرب اور تقسیم کرتے ہیں۔" }
      ],
      formulas: ["(a+b)^2 = a^2 + 2ab + b^2", "a^2 - b^2 = (a+b)(a-b)", "(a+b+c)^2 = a^2+b^2+c^2+2(ab+bc+ca)"],
      workedExamples: [
        {
          question: {
            en: "Evaluate 51² - 49² using algebraic formulas.",
            ur: "فارمولے کی مدد سے 51² - 49² کی قیمت نکالیں۔"
          },
          solution: {
            en: "Using a² - b² = (a - b)(a + b): (51 - 49)(51 + 49) = (2)(100) = 200.",
            ur: "(51 - 49)(51 + 49) = 2 × 100 = 200۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-4',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "What is (a - b)(a + b) equal to?",
          ur: "(a - b)(a + b) کس کے برابر ہے؟"
        },
        options: [
          { en: "a² - b²", ur: "a² - b²" },
          { en: "a² + b²", ur: "a² + b²" },
          { en: "(a - b)²", ur: "(a - b)²" },
          { en: "2a - 2b", ur: "2a - 2b" }
        ],
        correctAnswer: "a² - b²",
        explanation: {
          en: "Difference of two squares formula: (a - b)(a + b) = a² - b².",
          ur: "دو مربعوں کے فرق کا کلیہ a² - b² ہے۔"
        }
      }
    ]
  },
  {
    id: 'math-05',
    chapterNumber: 5,
    grade: '9',
    subject: Subject.MATH,
    title: {
      en: "Factorization, HCF & LCM",
      ur: "اجزائے ضربی، عاد اعظم اور ذواضعاف اقل"
    },
    description: {
      en: "Techniques of factoring, remainder theorem, factor theorem, and algebraic fractions simplification.",
      ur: "اجزائے ضربی کے طریقے، مسئلہ باقی (Remainder Theorem) اور مسئلہ تجزی۔"
    },
    content: {
      en: `<h3>5.1 Factoring Techniques</h3>
      <p>Taking common factor, grouping terms, completing the square, and using identities ($a^3 \\pm b^3$).</p>
      <h3>5.2 Remainder & Factor Theorem</h3>
      <p>If polynomial $P(x)$ is divided by $(x - a)$, the remainder is $P(a)$. If $P(a) = 0$, then $(x - a)$ is an exact factor of $P(x)$.</p>`,
      ur: `<h3>5.1 مسئلہ باقی اور تجزی</h3>
      <p>اگر کثیر رقمی $P(x)$ کو $(x - a)$ پر تقسیم کیا جائے تو باقی $P(a)$ بچتا ہے۔ اگر $P(a) = 0$ ہو تو $(x - a)$ اس کا جزو ضربی ہوتا ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Product of two polynomials equals HCF × LCM.", ur: "دو الجبری جملوں کا حاصل ضرب = عاد اعظم × ذواضعاف اقل۔" }
      ],
      formulas: ["P(x) = Q(x)(x - a) + R", "P(a) = 0 => (x - a) is a factor", "A × B = HCF × LCM"],
      workedExamples: [
        {
          question: {
            en: "Factorize completely: x² - 5x + 6.",
            ur: "x² - 5x + 6 کے اجزائے ضربی بنائیں۔"
          },
          solution: {
            en: "We need two numbers with sum -5 and product 6: -2 and -3. So (x - 2)(x - 3).",
            ur: "(x - 2)(x - 3)۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-5',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "If P(2) = 0 for polynomial P(x), which term is a factor?",
          ur: "اگر کسی کثیر رقمی کے لیے P(2) = 0 ہو تو اس کا جزو ضربی کون سا ہوگا؟"
        },
        options: [
          { en: "(x - 2)", ur: "(x - 2)" },
          { en: "(x + 2)", ur: "(x + 2)" },
          { en: "(x - 4)", ur: "(x - 4)" },
          { en: "(2x)", ur: "(2x)" }
        ],
        correctAnswer: "(x - 2)",
        explanation: {
          en: "By Factor Theorem, P(a) = 0 implies (x - a) is a factor.",
          ur: "مسئلہ تجزی کے تحت P(2)=0 پر (x - 2) جزو ضربی بنتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'math-06',
    chapterNumber: 6,
    grade: '9',
    subject: Subject.MATH,
    title: {
      en: "Linear Equations & Inequalities",
      ur: "یک درجی مساواتیں اور غیر مساواتیں"
    },
    description: {
      en: "Solving linear equations in one variable, absolute value equations, and linear inequalities on number line.",
      ur: "یک درجی مساواتوں کا حل، مطلق قیمت والی مساواتیں اور نمبر لائن پر غیر مساواتوں کا حل۔"
    },
    content: {
      en: `<h3>6.1 Linear Equation in One Variable</h3>
      <p>Standard form: $ax + b = 0$ ($a \\neq 0$), solution is $x = -b/a$.</p>
      <h3>6.2 Absolute Value Equations</h3>
      <p>$|x| = a \\implies x = a \\text{ or } x = -a$. Always check for extraneous roots in radical equations.</p>
      <h3>6.3 Linear Inequalities</h3>
      <p>When multiplying or dividing both sides by a negative number, the inequality sign flips (e.g. $-2x < 6 \\implies x > -3$).</p>`,
      ur: `<h3>6.1 لکیری مساواتیں اور غیر مساواتیں</h3>
      <p>مطلق قیمت $|x| = a$ کا مطلب $x = \\pm a$ ہے۔ منفی عدد سے ضرب یا تقسیم پر غیر مساوات کی علامت الٹ جاتی ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Multiplying or dividing an inequality by a negative number reverses the inequality direction.", ur: "منفی عدد سے ضرب یا تقسیم کرنے سے غیر مساوات کی سمت تبدیل ہو جاتی ہے۔" }
      ],
      formulas: ["ax + b = 0 => x = -b/a", "|x - c| = d => x - c = ±d"],
      workedExamples: [
        {
          question: {
            en: "Solve for x: |2x - 3| = 7.",
            ur: "x کی قیمت معلوم کریں: |2x - 3| = 7"
          },
          solution: {
            en: "Case 1: 2x - 3 = 7 => 2x = 10 => x = 5. Case 2: 2x - 3 = -7 => 2x = -4 => x = -2. Solution set: {-2, 5}.",
            ur: "حل سیٹ: {-2, 5}۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-6',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "If -3x < 12, what is the correct inequality for x?",
          ur: "اگر -3x < 12 ہو تو x کی صحیح قیمت کیا ہوگی؟"
        },
        options: [
          { en: "x > -4", ur: "x > -4" },
          { en: "x < -4", ur: "x < -4" },
          { en: "x > 4", ur: "x > 4" },
          { en: "x < 4", ur: "x < 4" }
        ],
        correctAnswer: "x > -4",
        explanation: {
          en: "Dividing by -3 flips '<' to '>': x > 12 / (-3) = -4.",
          ur: "-3 پر تقسیم کرنے سے علامت الٹ جائے گی: x > -4۔"
        }
      }
    ]
  },
  {
    id: 'math-07',
    chapterNumber: 7,
    grade: '10',
    subject: Subject.MATH,
    title: {
      en: "Quadratic Equations",
      ur: "دو درجی مساواتیں"
    },
    description: {
      en: "Standard form ax²+bx+c=0, factoring, completing square, quadratic formula, and nature of roots.",
      ur: "دو درجی مساوات کے حل کے طریقے (تجزی، تکمیل مربع اور کلیہ) اور روٹس کی نوعیت۔"
    },
    content: {
      en: `<h3>7.1 Standard Quadratic Equation</h3>
      <p>$ax^2 + bx + c = 0$ with $a \\neq 0$.</p>
      <h3>7.2 Quadratic Formula</h3>
      <p>$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$</p>
      <h3>7.3 Nature of Roots (Discriminant $\\Delta = b^2 - 4ac$)</h3>
      <ul>
        <li>If $\\Delta > 0$ and perfect square: Real, rational, and unequal roots.</li>
        <li>If $\\Delta > 0$ and not a perfect square: Real, irrational, and unequal roots.</li>
        <li>If $\\Delta = 0$: Real, rational, and equal roots.</li>
        <li>If $\\Delta < 0$: Imaginary / Complex conjugate roots.</li>
      </ul>`,
      ur: `<h3>7.1 دو درجی کلیہ اور روٹس کی نوعیت</h3>
      <p>دو درجی کلیہ $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ ہے۔ فرق کنندہ $b^2 - 4ac$ اگر صفر ہو تو روٹس برابر اور حقیقی ہوتے ہیں۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "Sum of roots S = -b/a; Product of roots P = c/a.", ur: "روٹس کا مجموعہ S = -b/a اور حاصل ضرب P = c/a ہوتا ہے۔" }
      ],
      formulas: ["x = (-b ± sqrt(b^2 - 4ac)) / (2a)", "Discriminant = b^2 - 4ac", "x^2 - S x + P = 0"],
      workedExamples: [
        {
          question: {
            en: "Find the discriminant of 2x² - 4x + 2 = 0 and state the nature of its roots.",
            ur: "مساوات 2x² - 4x + 2 = 0 کا فرق کنندہ اور روٹس کی نوعیت بتائیں۔"
          },
          solution: {
            en: "Δ = b² - 4ac = (-4)² - 4(2)(2) = 16 - 16 = 0. Since Δ = 0, roots are Real, Rational, and Equal.",
            ur: "Δ = 16 - 16 = 0۔ اس لیے روٹس حقیقی، ناطق اور برابر ہیں۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-7',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "What is the nature of roots if discriminant b² - 4ac = 0?",
          ur: "اگر فرق کنندہ b² - 4ac = 0 ہو تو روٹس کیسے ہوں گے؟"
        },
        options: [
          { en: "Real and Equal", ur: "حقیقی اور برابر" },
          { en: "Imaginary (Complex)", ur: "غیر حقیقی (امیجنری)" },
          { en: "Real and Unequal", ur: "حقیقی اور غیر برابر" },
          { en: "Zero only", ur: "صرف صفر" }
        ],
        correctAnswer: "Real and Equal",
        explanation: {
          en: "When discriminant is zero, the ± term vanishes, yielding equal repeated real roots.",
          ur: "فرق کنندہ صفر ہونے پر دونوں روٹس مساوی اور حقیقی ہوتے ہیں۔"
        }
      }
    ]
  },
  {
    id: 'math-08',
    chapterNumber: 8,
    grade: '10',
    subject: Subject.MATH,
    title: {
      en: "Fundamentals of Trigonometry",
      ur: "مثلثیات کے بنیادی اصول"
    },
    description: {
      en: "Degree and radian measure, six trigonometric ratios, fundamental identities, and right triangle applications.",
      ur: "ڈگری اور ریڈین کا تعلق، بنیادی مثلثیاتی نسبتیں (sin, cos, tan) اور بنیادی کلیات۔"
    },
    content: {
      en: `<h3>8.1 Angle Measurement</h3>
      <p>$180^\\circ = \\pi \\text{ radians}$. Length of circular arc $l = r \\theta$ (where $\\theta$ is in radians).</p>
      <h3>8.2 Fundamental Trigonometric Identities</h3>
      <ul>
        <li>$\\sin^2 \\theta + \\cos^2 \\theta = 1$</li>
        <li>$1 + \\tan^2 \\theta = \\sec^2 \\theta$</li>
        <li>$1 + \\cot^2 \\theta = \\csc^2 \\theta$</li>
      </ul>`,
      ur: `<h3>8.1 مثلثیات کے بنیادی فارمولے</h3>
      <p>180 ڈگری $\\pi$ ریڈین کے برابر ہوتا ہے۔ $l = r \\theta$ اور $\\sin^2 \\theta + \\cos^2 \\theta = 1$۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "sin(30°) = 1/2, cos(30°) = √3/2, tan(45°) = 1.", ur: "tan(45°) کی قیمت 1 اور sin(30°) کی قیمت 1/2 ہوتی ہے۔" }
      ],
      formulas: ["l = r × θ", "sin^2(θ) + cos^2(θ) = 1", "1 + tan^2(θ) = sec^2(θ)", "180° = π rad"],
      workedExamples: [
        {
          question: {
            en: "An arc of length 10 cm subtends an angle of 2 radians at the center of a circle. Find the radius.",
            ur: "ایک دائرے میں 10 سینٹی میٹر لمبی قوس مرکز پر 2 ریڈین کا زاویہ بناتی ہے۔ رداس معلوم کریں۔"
          },
          solution: {
            en: "Using l = r θ: 10 = r (2) => r = 10 / 2 = 5 cm.",
            ur: "l = r θ کے فارمولے سے r = 10 / 2 = 5 سینٹی میٹر۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-8',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "What is sin²(θ) + cos²(θ) always equal to?",
          ur: "sin²(θ) + cos²(θ) ہمیشہ کس کے برابر ہوتا ہے؟"
        },
        options: [
          { en: "1", ur: "1" },
          { en: "0", ur: "0" },
          { en: "tan(θ)", ur: "tan(θ)" },
          { en: "-1", ur: "-1" }
        ],
        correctAnswer: "1",
        explanation: {
          en: "sin²(θ) + cos²(θ) = 1 is the fundamental Pythagorean trigonometric identity.",
          ur: "یہ مثلثیات کا سب سے بنیادی کلیہ ہے جس کی قیمت 1 ہے۔"
        }
      }
    ]
  },
  {
    id: 'math-09',
    chapterNumber: 9,
    grade: '10',
    subject: Subject.MATH,
    title: {
      en: "Coordinate Geometry: Distance & Slope",
      ur: "مختصائی ہندسہ: فاصلہ، درمیانی نقطہ اور ڈھلوان"
    },
    description: {
      en: "Cartesian plane, distance formula between two points, midpoint formula, and collinearity.",
      ur: "دو نقاط کے درمیان فاصلہ، درمیانی نقطہ، اسلوپ (ڈھلوان) اور خط مستقیم۔"
    },
    content: {
      en: `<h3>9.1 Coordinate Geometry Formulas</h3>
      <p>For points $P(x_1, y_1)$ and $Q(x_2, y_2)$:</p>
      <ul>
        <li><strong>Distance Formula:</strong> $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$</li>
        <li><strong>Midpoint Formula:</strong> $M = \\left( \\frac{x_1 + x_2}{2}, \\frac{y_1 + y_2}{2} \\right)$</li>
        <li><strong>Slope ($m$):</strong> $m = \\frac{y_2 - y_1}{x_2 - x_1}$</li>
      </ul>`,
      ur: `<h3>9.1 فاصلہ اور مڈ پوائنٹ</h3>
      <p>فاصلے کا فارمولا $d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$ اور درمیانی نقطہ $M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})$ ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Parallel lines have equal slopes (m1 = m2); Perpendicular lines have product of slopes m1 × m2 = -1.", ur: "متوازی خطوط کی ڈھلوان برابر ہوتی ہے؛ عمودی خطوط کی ڈھلوان کا حاصل ضرب -1 ہوتا ہے۔" }
      ],
      formulas: ["d = sqrt((x2 - x1)^2 + (y2 - y1)^2)", "Midpoint = ((x1+x2)/2, (y1+y2)/2)", "Slope m = (y2 - y1)/(x2 - x1)"],
      workedExamples: [
        {
          question: {
            en: "Find the distance between points A(1, 2) and B(4, 6).",
            ur: "نقاط A(1, 2) اور B(4, 6) کے درمیان فاصلہ معلوم کریں۔"
          },
          solution: {
            en: "d = √((4 - 1)² + (6 - 2)²) = √(3² + 4²) = √(9 + 16) = √25 = 5 units.",
            ur: "فاصلہ = √(9 + 16) = 5 اکائیاں۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-9',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "What is the slope of two perpendicular lines related by?",
          ur: "دو عمودی خطوط کی ڈھلوان (Slope) کا باہمی تعلق کیا ہوتا ہے؟"
        },
        options: [
          { en: "m1 × m2 = -1", ur: "m1 × m2 = -1" },
          { en: "m1 = m2", ur: "m1 = m2" },
          { en: "m1 + m2 = 0", ur: "m1 + m2 = 0" },
          { en: "m1 / m2 = 1", ur: "m1 / m2 = 1" }
        ],
        correctAnswer: "m1 × m2 = -1",
        explanation: {
          en: "Perpendicular lines have negative reciprocal slopes, so m1 × m2 = -1.",
          ur: "عمودی خطوط کی ڈھلوانوں کا حاصل ضرب -1 ہوتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'math-10',
    chapterNumber: 10,
    grade: '10',
    subject: Subject.MATH,
    title: {
      en: "Practical Geometry & Circle Theorems",
      ur: "عملی ہندسہ اور دائرے کے مسائل"
    },
    description: {
      en: "Chords, tangents to a circle, angle in semicircle theorem, cyclic quadrilaterals, and circumcircle.",
      ur: "وتر، مماس، نصف دائرے کا زاویہ اور دائرے سے متعلق اہم امتحانی تھیورمز۔"
    },
    content: {
      en: `<h3>10.1 Key Circle Theorems</h3>
      <ul>
        <li>A straight line drawn from the centre of a circle to bisect a chord is perpendicular to the chord.</li>
        <li>The angle subtended by an arc at the centre is double the angle subtended by it at the circumference.</li>
        <li>The angle in a semi-circle is a right angle ($90^\\circ$).</li>
        <li>Opposite angles of any cyclic quadrilateral are supplementary ($A + C = 180^\\circ$).</li>
      </ul>`,
      ur: `<h3>10.1 دائرے کے بنیادی تھیورمز</h3>
      <p>نصف دائرے میں بننے والا زاویہ ہمیشہ قائمہ ($90^\\circ$) ہوتا ہے۔ دائرے کی چار دیواری والے چوکور کے مخالف زاویوں کا مجموعہ 180 ڈگری ہوتا ہے۔</p>`
    },
    weightage: 14,
    practice: {
      keyPoints: [
        { en: "The tangent at any point of a circle is perpendicular to the radius through the point of contact.", ur: "دائرے کے کسی نقطے پر مماس (Tangent) اس کے رداس پر عمود ہوتا ہے۔" }
      ],
      formulas: ["Angle in semicircle = 90°", "Angle at centre = 2 × Angle at circumference", "Cyclic Quad: Opp angles sum = 180°"],
      workedExamples: [
        {
          question: {
            en: "If the angle subtended by an arc at the circumference is 35°, what is the angle at the centre?",
            ur: "اگر کسی قوس سے دائرے کے محیط پر بننے والا زاویہ 35 ڈگری ہو تو مرکز پر زاویہ کتنا ہوگا؟"
          },
          solution: {
            en: "Central angle = 2 × Circumference angle = 2 × 35° = 70°.",
            ur: "مرکزی زاویہ دوگنا ہوتا ہے: 2 × 35 = 70 ڈگری۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-math-10',
        subject: Subject.MATH,
        type: QuestionType.MCQ,
        text: {
          en: "What is the measure of an angle inscribed in a semicircle?",
          ur: "نصف دائرے میں محصور زاویہ کتنے ڈگری کا ہوتا ہے؟"
        },
        options: [
          { en: "90° (Right angle)", ur: "90 ڈگری (قائمہ زاویہ)" },
          { en: "45°", ur: "45 ڈگری" },
          { en: "60°", ur: "60 ڈگری" },
          { en: "180°", ur: "180 ڈگری" }
        ],
        correctAnswer: "90° (Right angle)",
        explanation: {
          en: "Thales theorem states that any angle inscribed in a semicircle is 90°.",
          ur: "تھیلس کے تھیورم کے مطابق نصف دائرے کا زاویہ ہمیشہ 90 ڈگری ہوتا ہے۔"
        }
      }
    ]
  },

  // ===================== ENGLISH (10 Topics - Compulsory) =====================
  {
    id: 'eng-01',
    chapterNumber: 1,
    grade: '9',
    subject: Subject.ENGLISH,
    title: {
      en: "Reading Comprehension & Critical Analysis",
      ur: "تفہیم عبارت اور تنقیدی جائزہ"
    },
    description: {
      en: "Extracting main ideas, contextual vocabulary, inference questions, and answering Sindh Board comprehension passages.",
      ur: "پیراگراف کا مفہوم سمجھنا، سیاق و سباق سے الفاظ کے معانی اور بورڈ پیٹرن سوالات کے جوابات۔"
    },
    content: {
      en: `<h3>1.1 Mastering Sindh Board Comprehension</h3>
      <p>Board exams include seen and unseen passages. Success requires identifying the central thesis, topic sentences, and supporting details.</p>
      <ul>
        <li><strong>Skimming:</strong> Rapid reading to capture general overview.</li>
        <li><strong>Scanning:</strong> Locating specific factual information (dates, names, metrics).</li>
        <li><strong>Inference:</strong> Deducing unstated implications logically from context.</li>
      </ul>`,
      ur: `<h3>1.1 تفہیم عبارت (Comprehension)</h3>
      <p>عبارت کو غور سے پڑھ کر مرکزی خیال اور مخصوص معلومات کو تلاش کرنا اور اپنے الفاظ میں جامع جواب دینا۔</p>`
    },
    weightage: 15,
    practice: {
      keyPoints: [
        { en: "Always answer comprehension questions in complete grammatical sentences using the tense of the prompt.", ur: "سوال کا جواب ہمیشہ مکمل جملے میں اور سوال کے زمانے (Tense) کے مطابق دیں۔" }
      ],
      formulas: ["Answer = Restate prompt stem + Factual evidence from text"],
      workedExamples: [
        {
          question: {
            en: "How should a student approach vocabulary questions based on context?",
            ur: "سیاق و سباق کی بنیاد پر الفاظ کے معانی کا اندازہ کیسے لگایا جائے؟"
          },
          solution: {
            en: "Examine surrounding words, antonym clues, and tone to determine the precise contextual meaning rather than memorized synonyms.",
            ur: "جملے کے آگے پیچھے کے الفاظ اور مفہوم کو دیکھ کر سیاق و سباق کے مطابق معنی کا تعین کریں۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-1',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "What reading technique is best to quickly locate a specific year or number in a text?",
          ur: "کسی عبارت میں مخصوص تاریخ یا نمبر تلاش کرنے کے لیے کون سی تکنیک بہترین ہے؟"
        },
        options: [
          { en: "Scanning", ur: "اسکیننگ (Scanning)" },
          { en: "Skimming", ur: "اسکمنگ (Skimming)" },
          { en: "Proofreading", ur: "پروف ریڈنگ" },
          { en: "Summarizing", ur: "خلاصہ نگاری" }
        ],
        correctAnswer: "Scanning",
        explanation: {
          en: "Scanning involves searching for a specific keyword, date, or metric.",
          ur: "مخصوص لفظ یا تاریخ تلاش کرنے کے لیے اسکیننگ کا طریقہ استعمال کیا جاتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-02',
    chapterNumber: 2,
    grade: '9',
    subject: Subject.ENGLISH,
    title: {
      en: "Parts of Speech & Grammatical Syntax",
      ur: "اجزائے کلام اور قواعدِ زبان"
    },
    description: {
      en: "Nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections in context.",
      ur: "اسم، ضمیر، فعل، صفت، متعلق فعل اور حروفِ ربط کی پہچان اور درست استعمال۔"
    },
    content: {
      en: `<h3>2.1 The Eight Parts of Speech</h3>
      <ul>
        <li><strong>Noun:</strong> Name of person, place, or concept.</li>
        <li><strong>Pronoun:</strong> Replaces noun (he, they, which).</li>
        <li><strong>Verb:</strong> Denotes action or state of being.</li>
        <li><strong>Adjective:</strong> Modifies or describes noun.</li>
        <li><strong>Adverb:</strong> Modifies verb, adjective, or another adverb (quickly, very).</li>
        <li><strong>Preposition:</strong> Shows relationship in time/space (in, on, under).</li>
        <li><strong>Conjunction:</strong> Connects clauses (and, but, because).</li>
      </ul>`,
      ur: `<h3>2.1 اجزائے کلام (Parts of Speech)</h3>
      <p>اسم، ضمیر، فعل، صفت، متعلق فعل، حرفِ جار اور حرفِ عطف کا درست استعمال انگریزی قواعد کی بنیاد ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Prepositions depend on fixed collocations (e.g., 'depend on', 'interested in', 'accused of').", ur: "انگریزی میں مخصوص افعال کے ساتھ مخصوص پریپوزیشنز آتی ہیں۔" }
      ],
      formulas: ["Subject + Verb + Object (SVO Word Order)"],
      workedExamples: [
        {
          question: {
            en: "Identify the part of speech of 'swiftly' in 'The cheetah ran swiftly.'",
            ur: "جملے میں 'swiftly' کون سا جزو کلام ہے؟"
          },
          solution: {
            en: "It is an Adverb of manner modifying the verb 'ran'.",
            ur: "یہ متعلق فعل (Adverb) ہے جو فعل 'ran' کی وضاحت کرتا ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-2',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "Which part of speech describes or modifies a noun?",
          ur: "اسم کی خوبی یا خامی بیان کرنے والا لفظ کیا کہلاتا ہے؟"
        },
        options: [
          { en: "Adjective", ur: "صفت (Adjective)" },
          { en: "Adverb", ur: "متعلق فعل (Adverb)" },
          { en: "Pronoun", ur: "ضمیر" },
          { en: "Preposition", ur: "حرفِ جار" }
        ],
        correctAnswer: "Adjective",
        explanation: {
          en: "An adjective qualifies or describes a noun.",
          ur: "صفت کسی اسم کی خصوصیت کو ظاہر کرتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-03',
    chapterNumber: 3,
    grade: '9',
    subject: Subject.ENGLISH,
    title: {
      en: "Active and Passive Voice",
      ur: "معروف اور مجہول (Active & Passive Voice)"
    },
    description: {
      en: "Rules of transformation across all tenses, modal auxiliaries, imperative sentences, and board past paper problems.",
      ur: "ایکٹو سے پیسو میں تبدیلی کے اصول، تمام زمانوں کی تبدیلیاں اور امتحانی مشق۔"
    },
    content: {
      en: `<h3>3.1 Voice Transformation Rules</h3>
      <ol>
        <li>Object of active sentence becomes Subject of passive sentence.</li>
        <li>Appropriate form of helping verb 'to be' is used according to tense.</li>
        <li>Past participle (3rd form of verb) is ALWAYS used in passive.</li>
        <li>Subject becomes Object preceded by preposition 'by'.</li>
      </ol>
      <p>Example: <em>He writes a letter.</em> &rarr; <em>A letter is written by him.</em></p>`,
      ur: `<h3>3.1 ایکٹو اور پیسو وائس کے اصول</h3>
      <p>مفعول کو فاعل بنایا جاتا ہے، مناسب امدادی فعل لگایا جاتا ہے اور ہمیشہ فعل کی تیسری فارم (3rd form) استعمال ہوتی ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Continuous tenses require 'being' before 3rd form (e.g. 'is being done').", ur: "جاری زمانوں (Continuous) میں 'being' کا اضافہ ضروری ہوتا ہے۔" },
        { en: "Perfect tenses require 'been' (e.g. 'has been finished').", ur: "پرفیکٹ زمانوں میں 'been' لگایا جاتا ہے۔" }
      ],
      formulas: ["Active: S + V + O => Passive: O + Be-verb + V3 + by + S"],
      workedExamples: [
        {
          question: {
            en: "Convert to passive voice: 'The teacher praised the honest student.'",
            ur: "پیسو وائس میں تبدیل کریں: 'The teacher praised the honest student.'"
          },
          solution: {
            en: "The honest student was praised by the teacher.",
            ur: "The honest student was praised by the teacher."
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-3',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "What is the passive form of: 'She has completed the project'?",
          ur: "'She has completed the project' کا پیسو کیا ہوگا؟"
        },
        options: [
          { en: "The project has been completed by her.", ur: "The project has been completed by her." },
          { en: "The project was completed by her.", ur: "The project was completed by her." },
          { en: "The project is completed by her.", ur: "The project is completed by her." },
          { en: "The project had been completed by her.", ur: "The project had been completed by her." }
        ],
        correctAnswer: "The project has been completed by her.",
        explanation: {
          en: "Present perfect passive uses 'has/have been + V3'.",
          ur: "پریزنٹ پرفیکٹ میں 'has been + 3rd form' استعمال ہوتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-04',
    chapterNumber: 4,
    grade: '9',
    subject: Subject.ENGLISH,
    title: {
      en: "Direct and Indirect Narration",
      ur: "روایتِ مستقیم اور بالواسطہ (Narration)"
    },
    description: {
      en: "Reporting verb changes, tense backshifts, pronoun shifts, time/place adverb shifts, and interrogative/imperative sentences.",
      ur: "ڈائریکٹ سے ان ڈائریکٹ میں تبدیلی، زمانوں اور ضمائر کی تبدیلی، سوالیہ اور حکمیہ جملے۔"
    },
    content: {
      en: `<h3>4.1 Rules of Direct to Indirect Speech</h3>
      <ul>
        <li><strong>Tense Shifts:</strong> Present Simple &rarr; Past Simple; Present Continuous &rarr; Past Continuous; Past Simple &rarr; Past Perfect.</li>
        <li><strong>Pronoun Shifts:</strong> 1st person changes by Subject of reporting clause; 2nd person changes by Object; 3rd person remains unchanged (SON rule).</li>
        <li><strong>Time/Place Words:</strong> now &rarr; then, today &rarr; that day, tomorrow &rarr; the next day, here &rarr; there.</li>
      </ul>`,
      ur: `<h3>4.1 ڈائریکٹ اور ان ڈائریکٹ اسپیچ</h3>
      <p>اگر رپورٹنگ ورب ماضی میں ہو تو رپورٹڈ کلاز کا زمانہ بھی ماضی میں بدل جاتا ہے۔ ضمائر اور الفاظِ وقت میں تبدیلی کی جاتی ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Universal truths and habitual actions never shift tense (e.g. 'The sun rises in the east').", ur: "آفاقی سچائیوں کا زمانہ تبدیل نہیں ہوتا۔" }
      ],
      formulas: ["Said to -> Told", "Said (Questions) -> Asked", "that / if / whether connectors"],
      workedExamples: [
        {
          question: {
            en: "Change into indirect speech: Ali said, 'I am learning physics.'",
            ur: "ان ڈائریکٹ میں بدلیں: Ali said, 'I am learning physics.'"
          },
          solution: {
            en: "Ali said that he was learning physics.",
            ur: "Ali said that he was learning physics."
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-4',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "In indirect speech, what does 'tomorrow' change into?",
          ur: "ان ڈائریکٹ اسپیچ میں 'tomorrow' کس میں بدل جاتا ہے؟"
        },
        options: [
          { en: "The next day / following day", ur: "The next day / following day" },
          { en: "The previous day", ur: "The previous day" },
          { en: "Yesterday", ur: "Yesterday" },
          { en: "That day", ur: "That day" }
        ],
        correctAnswer: "The next day / following day",
        explanation: {
          en: "'Tomorrow' shifts to 'the next day' or 'the following day'.",
          ur: "کل کا لفظ 'the next day' میں تبدیل ہو جاتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-05',
    chapterNumber: 5,
    grade: '9',
    subject: Subject.ENGLISH,
    title: {
      en: "Tenses & Conditional Sentences",
      ur: "زمانے اور شرطیہ جملے (Conditionals)"
    },
    description: {
      en: "The twelve English tenses, Zero, First, Second, and Third conditional sentence structures with board exam rules.",
      ur: "تمام بارہ زمانے اور شرطیہ جملوں کی اقسام (Zero, 1st, 2nd, 3rd Conditionals)۔"
    },
    content: {
      en: `<h3>5.1 Conditional Sentences</h3>
      <ul>
        <li><strong>First Conditional (Probable):</strong> If + Present Simple, will + base verb. (<em>If you work hard, you will pass.</em>)</li>
        <li><strong>Second Conditional (Hypothetical):</strong> If + Past Simple, would + base verb. (<em>If I had money, I would buy a car.</em>)</li>
        <li><strong>Third Conditional (Impossible Past):</strong> If + Past Perfect, would have + V3. (<em>If he had studied, he would have passed.</em>)</li>
      </ul>`,
      ur: `<h3>5.1 شرطیہ جملے (Conditionals)</h3>
      <p>فرسٹ کنڈیشنل: If + پریزنٹ، will + ورب۔ تھرڈ کنڈیشنل: If + پاسٹ پرفیکٹ، would have + 3rd فارم۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Do not use 'will' or 'would' inside the 'if' clause itself.", ur: "'if' والے حصے میں 'will' یا 'would' استعمال نہیں کیا جاتا۔" }
      ],
      formulas: ["Type 1: If + V1, will + V1", "Type 2: If + V2, would + V1", "Type 3: If + had + V3, would have + V3"],
      workedExamples: [
        {
          question: {
            en: "Complete the sentence: 'If it rains tomorrow, we _______ (cancel) the cricket match.'",
            ur: "جملہ مکمل کریں: 'If it rains tomorrow, we _______ the cricket match.'"
          },
          solution: {
            en: "will cancel (First conditional).",
            ur: "will cancel (پہلا شرطیہ جملہ)۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-5',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "What is the correct structure for a Third Conditional sentence?",
          ur: "تھرڈ کنڈیشنل جملے کی صحیح بناوٹ کیا ہے؟"
        },
        options: [
          { en: "If + had + V3, would have + V3", ur: "If + had + V3, would have + V3" },
          { en: "If + V1, will + V1", ur: "If + V1, will + V1" },
          { en: "If + V2, would + V1", ur: "If + V2, would + V1" },
          { en: "If + V1, would + V1", ur: "If + V1, would + V1" }
        ],
        correctAnswer: "If + had + V3, would have + V3",
        explanation: {
          en: "Third conditional describes an unfulfilled past condition using past perfect and would have + past participle.",
          ur: "تھرڈ کنڈیشنل میں If + had + V3 اور دوسرے حصے میں would have + V3 آتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-06',
    chapterNumber: 6,
    grade: '10',
    subject: Subject.ENGLISH,
    title: {
      en: "Vocabulary, Idioms & Phrasal Verbs",
      ur: "ذخیرہ الفاظ، محاورات اور فریزل وربز"
    },
    description: {
      en: "Frequently tested Sindh Board idioms, pair of words, homophones, synonyms, antonyms, and correct sentence formulation.",
      ur: "سندھ بورڈ میں بار بار آنے والے محاورات، ہم آواز الفاظ (Pair of words) اور ان کا جملوں میں استعمال۔"
    },
    content: {
      en: `<h3>6.1 High-Yield Sindh Board Idioms</h3>
      <ul>
        <li><strong>A blessing in disguise:</strong> Something that seems bad at first, but produces good results.</li>
        <li><strong>Burn the midnight oil:</strong> Study or work late into the night.</li>
        <li><strong>Once in a blue moon:</strong> Very rarely.</li>
        <li><strong>Leave no stone unturned:</strong> Try every possible course of action in order to achieve something.</li>
      </ul>`,
      ur: `<h3>6.1 اہم محاورات (Idioms)</h3>
      <p>امتحانات میں محاورات کے جملے بنانے کا سوال آتا ہے۔ ان کا لغوی معنی کی بجائے مجازی مفہوم سمجھنا ضروری ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "In 'Pair of Words' questions, sentences must clearly demonstrate the distinct meanings of both words.", ur: "الفاظ کے جوڑے والے سوال میں جملہ ایسا بنائیں جس سے دونوں کا فرق واضح ہو۔" }
      ],
      formulas: ["Pair of words: Principal (Head of school) vs Principle (Fundamental truth)"],
      workedExamples: [
        {
          question: {
            en: "Use 'burn the midnight oil' in a meaningful sentence.",
            ur: "'burn the midnight oil' کو جملے میں استعمال کریں۔"
          },
          solution: {
            en: "Ahmed burned the midnight oil to secure first position in the Sindh Board examinations.",
            ur: "احمد نے بورڈ کے امتحان میں اول پوزیشن کے لیے رات دیر تک محنت کی۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-6',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "What is the meaning of the idiom 'once in a blue moon'?",
          ur: "محاورہ 'once in a blue moon' کا کیا مطلب ہے؟"
        },
        options: [
          { en: "Very rarely", ur: "کبھی کبھار (شاذ و نادر)" },
          { en: "Every night", ur: "ہر رات" },
          { en: "Immediately", ur: "فوری طور پر" },
          { en: "In the morning", ur: "صبح کے وقت" }
        ],
        correctAnswer: "Very rarely",
        explanation: {
          en: "'Once in a blue moon' denotes an event that happens very seldom.",
          ur: "اس کا مطلب شاذ و نادر یا کبھی کبھار ہونا ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-07',
    chapterNumber: 7,
    grade: '10',
    subject: Subject.ENGLISH,
    title: {
      en: "Formal Letters & Applications Writing",
      ur: "باضابطہ خطوط اور درخواست نگاری"
    },
    description: {
      en: "Official formats, address block, salutation, body paragraphs, complementary close, and board exam marking rubrics.",
      ur: "پرنسپل کے نام درخواستیں اور ایڈیٹر کے نام خطوط لکھنے کا درست امتحانی فارمیٹ۔"
    },
    content: {
      en: `<h3>7.1 Standard Application Format</h3>
      <ol>
        <li>To, The Principal, [College/School Name], [City]</li>
        <li>Subject: [Concise statement of purpose]</li>
        <li>Respected Sir/Madam,</li>
        <li>Body Paragraphs: Purpose &rarr; Justification &rarr; Specific Request.</li>
        <li>Thanking you, Yours obediently, Name/Roll Number, Date.</li>
      </ol>`,
      ur: `<h3>7.1 درخواست کا درست نمونہ</h3>
      <p>عنوان، تعظیم، درخواست کا بنیادی متن اور اختتام کا درست طریقہ بورڈ کے پورے نمبر دلاتا ہے۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "Keep the Subject line brief (under 8 words) and centered or aligned properly.", ur: "سبجیکٹ کو مختصر اور واضح رکھیں۔" }
      ],
      formulas: ["Formal Format: Sender -> Date -> Receiver -> Subject -> Salutation -> Body -> Sign-off"],
      workedExamples: [
        {
          question: {
            en: "What is the correct complementary close for an application addressed to the Principal?",
            ur: "پرنسپل کے نام درخواست میں اختتامی کلمہ کیا لکھا جاتا ہے؟"
          },
          solution: {
            en: "Yours obediently (Note: no apostrophe in 'Yours').",
            ur: "Yours obediently (کبھی بھی Your's مت لکھیں)۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-7',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "Which punctuation mark is correct for the sign-off?",
          ur: "درخواست کے اختتام پر کون سا لفظ درست لکھا جاتا ہے؟"
        },
        options: [
          { en: "Yours obediently", ur: "Yours obediently" },
          { en: "Your's obediently", ur: "Your's obediently" },
          { en: "You're obediently", ur: "You're obediently" },
          { en: "Yours' obediently", ur: "Yours' obediently" }
        ],
        correctAnswer: "Yours obediently",
        explanation: {
          en: "Possessive pronouns like 'Yours' never take an apostrophe.",
          ur: "ضمائر میں اپاسٹروفی (apostrophe) نہیں لگائی جاتی، صرف 'Yours' درست ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-08',
    chapterNumber: 8,
    grade: '10',
    subject: Subject.ENGLISH,
    title: {
      en: "Essay and Summary (Precis) Writing",
      ur: "مضمون نویسی اور تلخیص نگاری (Precis Writing)"
    },
    description: {
      en: "Five-paragraph essay architecture (introduction, body, conclusion) and 1/3rd summary rules with appropriate title.",
      ur: "مضمون نگاری کی تکنیک اور ایک تہائی تلخیص (Summary) لکھنے کا سائنسی طریقہ۔"
    },
    content: {
      en: `<h3>8.1 Five-Paragraph Essay Architecture</h3>
      <ul>
        <li><strong>Introduction:</strong> Hook sentence, background context, and clear thesis statement.</li>
        <li><strong>Body Paragraphs (3):</strong> Topic sentence, evidence/examples, and concluding sentence.</li>
        <li><strong>Conclusion:</strong> Restate thesis in new words, synthesize main points, final thought.</li>
      </ul>
      <h3>8.2 Summary (Precis) Rules</h3>
      <p>Reduce passage to approximately one-third (1/3) of original length in your own words. Never copy exact sentences. Provide a fitting title.</p>`,
      ur: `<h3>8.1 تلخیص اور مضمون</h3>
      <p>تلخیص اصل پیراگراف کی ایک تہائی لمبائی میں اپنے الفاظ میں لکھی جاتی ہے اور اس کا ایک موزوں عنوان دینا لازمی ہوتا ہے۔</p>`
    },
    weightage: 15,
    practice: {
      keyPoints: [
        { en: "Precis length = Total words in passage / 3. It must be written in the third person and past tense.", ur: "تلخیص اصل الفاظ کا ایک تہائی ہونی چاہیے اور تیسرے صیغے (Third person) میں لکھی جائے۔" }
      ],
      formulas: ["Precis length = Word count / 3 (±10% tolerance)"],
      workedExamples: [
        {
          question: {
            en: "What are the three essential components of an introductory paragraph in an essay?",
            ur: "کسی مضمون کے ابتدائی پیراگراف کے تین بنیادی اجزاء کیا ہیں؟"
          },
          solution: {
            en: "1. The Hook (attention grabber), 2. Background Information, 3. The Thesis Statement.",
            ur: "1. تعارفی جملہ (Hook)، 2. پس منظر، 3. تھیسس اسٹیٹمنٹ۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-8',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "What proportion of the original passage should an ideal precis (summary) be?",
          ur: "ایک معیاری تلخیص (Precis) اصل عبارت کے کتنے حصے کے برابر ہونی چاہیے؟"
        },
        options: [
          { en: "One-third (1/3)", ur: "ایک تہائی (1/3)" },
          { en: "One-half (1/2)", ur: "نصف (1/2)" },
          { en: "One-fourth (1/4)", ur: "ایک چوتھائی (1/4)" },
          { en: "Two-thirds (2/3)", ur: "دو تہائی (2/3)" }
        ],
        correctAnswer: "One-third (1/3)",
        explanation: {
          en: "A standard precis should be roughly one-third of the original text's word count.",
          ur: "معیاری تلخیص اصل عبارت کے ایک تہائی الفاظ پر مشتمل ہوتی ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-09',
    chapterNumber: 9,
    grade: '10',
    subject: Subject.ENGLISH,
    title: {
      en: "Figures of Speech & Poetry Analysis",
      ur: "صنائع بدائع اور شاعری کا تجزیہ"
    },
    description: {
      en: "Simile, metaphor, personification, alliteration, hyperbole, rhyme schemes, and central ideas of board poems.",
      ur: "تشبیہ، استعارہ، تجسیم، مبالغہ اور سندھ بورڈ نصابی نظموں کا مرکزی خیال۔"
    },
    content: {
      en: `<h3>9.1 Poetic Devices</h3>
      <ul>
        <li><strong>Simile:</strong> Comparison using 'like' or 'as' (e.g. <em>brave as a lion</em>).</li>
        <li><strong>Metaphor:</strong> Direct comparison without 'like' or 'as' (e.g. <em>time is a thief</em>).</li>
        <li><strong>Personification:</strong> Giving human qualities to non-human things (e.g. <em>the wind whispered</em>).</li>
        <li><strong>Alliteration:</strong> Repetition of initial consonant sounds (e.g. <em>sweet birds sing</em>).</li>
      </ul>`,
      ur: `<h3>9.1 شعری صنائع</h3>
      <p>تشبیہ (Simile)، استعارہ (Metaphor)، تجسیم (Personification) اور اوزان و قوافی اشعار کا حسن بڑھاتے ہیں۔</p>`
    },
    weightage: 10,
    practice: {
      keyPoints: [
        { en: "In poem stanzas, explain the literal meaning followed by the deeper symbolic and moral theme.", ur: "اشعار کی تشریح میں پہلے لغوی مفہوم اور پھر علامتی اخلاقی پیغام بیان کریں۔" }
      ],
      formulas: ["Simile uses 'like/as'; Metaphor equates directly; Personification attributes human traits"],
      workedExamples: [
        {
          question: {
            en: "Identify the figure of speech in: 'The stars danced playfully in the moonlit sky.'",
            ur: "جملے میں کون سی شعری صفت استعمال ہوئی ہے؟"
          },
          solution: {
            en: "Personification (stars are given the human ability to 'dance playfully').",
            ur: "تجسیم (Personification) کیونکہ ستاروں کو رقص کرتے دکھایا گیا ہے۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-9',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "What figure of speech compares two things using 'like' or 'as'?",
          ur: "'like' یا 'as' کا استعمال کر کے دو چیزوں کا موازنہ کیا کہلاتا ہے؟"
        },
        options: [
          { en: "Simile", ur: "تشبیہ (Simile)" },
          { en: "Metaphor", ur: "استعارہ (Metaphor)" },
          { en: "Personification", ur: "تجسیم (Personification)" },
          { en: "Hyperbole", ur: "مبالغہ (Hyperbole)" }
        ],
        correctAnswer: "Simile",
        explanation: {
          en: "A simile explicitly compares using words 'like' or 'as'.",
          ur: "تشبیہ میں 'like' یا 'as' کے ذریعے موازنہ کیا جاتا ہے۔"
        }
      }
    ]
  },
  {
    id: 'eng-10',
    chapterNumber: 10,
    grade: '10',
    subject: Subject.ENGLISH,
    title: {
      en: "Sindh Board Model Paper & Exam Strategy",
      ur: "سندھ بورڈ ماڈل پیپر اور امتحانی حکمت عملی"
    },
    description: {
      en: "Section A (20% MCQs), Section B (40% Short Questions), Section C (40% Descriptive & Essay), time management tips.",
      ur: "سندھ بورڈ پیپر کا ڈھانچہ (MCQs، مختصر سوالات، تفصیلی سوالات) اور وقت کی تقسیم۔"
    },
    content: {
      en: `<h3>10.1 Sindh Board Exam Paper Pattern</h3>
      <ul>
        <li><strong>Section A (20 Marks / 20%):</strong> Multiple Choice Questions covering grammar, vocabulary, and text comprehension.</li>
        <li><strong>Section B (40 Marks / 40%):</strong> Short answer questions from textbook chapters, poetry reference to context, and grammatical transformations.</li>
        <li><strong>Section C (40 Marks / 40%):</strong> Detailed essay writing, formal letter/application, precis writing, and unseen comprehension passage.</li>
      </ul>`,
      ur: `<h3>10.1 امتحانی پرچے کا ڈھانچہ</h3>
      <p>حصہ اول: 20 نمبر کے MCQs۔ حصہ دوم: 40 نمبر کے مختصر سوالات۔ حصہ سوم: 40 نمبر کے تفصیلی مضامین، خطوط اور تلخیص۔</p>`
    },
    weightage: 15,
    practice: {
      keyPoints: [
        { en: "Allocate 20 mins for MCQs, 60 mins for Section B, and 80 mins for Section C, leaving 20 mins for revision.", ur: "پرچے کے آخری 20 منٹ ہمیشہ نظر ثانی کے لیے بچائیں۔" }
      ],
      formulas: ["Board Paper: 20% Section A + 40% Section B + 40% Section C"],
      workedExamples: [
        {
          question: {
            en: "What is the most effective time distribution for a 3-hour Sindh Board examination?",
            ur: "تین گھنٹے کے پرچے میں وقت کی بہترین تقسیم کیا ہونی چاہیے؟"
          },
          solution: {
            en: "Section A (20 min) -> Section B (60 min) -> Section C (80 min) -> Final Proofreading (20 min).",
            ur: "20 منٹ MCQs + 60 منٹ مختصر سوالات + 80 منٹ تفصیلی سوالات + 20 منٹ نظر ثانی۔"
          }
        }
      ]
    },
    quizQuestions: [
      {
        id: 'q-eng-10',
        subject: Subject.ENGLISH,
        type: QuestionType.MCQ,
        text: {
          en: "What percentage of the Sindh Board final paper is allocated to Section A (MCQs)?",
          ur: "سندھ بورڈ کے پرچے میں سیکشن A (MCQs) کا کتنا فیصد حصہ ہوتا ہے؟"
        },
        options: [
          { en: "20%", ur: "20%" },
          { en: "10%", ur: "10%" },
          { en: "30%", ur: "30%" },
          { en: "50%", ur: "50%" }
        ],
        correctAnswer: "20%",
        explanation: {
          en: "Section A consists of 20% objective multiple-choice questions.",
          ur: "سندھ بورڈ میں 20 فیصد نمبر معروضی (MCQs) کے ہوتے ہیں۔"
        }
      }
    ]
  }
];

// Combine all quiz questions for mock exams
export const MOCK_QUESTIONS: Question[] = SINDH_BOARD_LESSONS.flatMap(l => l.quizQuestions);

// User performance records
export const MOCK_USER_PERFORMANCE: LOPerformance[] = SINDH_BOARD_LESSONS.slice(0, 8).map((lesson, idx) => ({
  lessonId: lesson.id,
  attempts: idx % 2 === 0 ? 3 : 1,
  correct: idx % 2 === 0 ? 3 : 1,
  totalQuestions: idx % 2 === 0 ? 3 : 2,
  avgTimePerQuestion: 24,
  lastAttemptDate: new Date()
}));

export const MOCK_LESSONS: Lesson[] = SINDH_BOARD_LESSONS;
