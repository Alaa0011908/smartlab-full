// lib/scenarioEngine.js
// ============================================================
// Scenario Engine - Intelligent Client Simulator
// Enhanced NLP, feedback generation, and conversation tracking
// ============================================================

export class ScenarioEngine {
    constructor(scenarioId, history = [], userLevel = 'beginner') {
        this.scenarioId = scenarioId;
        this.history = history;
        this.userLevel = userLevel;
        this.scenario = this.getScenarioData(scenarioId);
        this.conversationState = this.extractConversationState(history);
    }

    getScenarioData(scenarioId) {
        const scenarios = {
            cafe: {
                name: 'مقهى كوفي شوب',
                client: 'أبو أحمد',
                role: 'صاحب المقهى',
                keyTopics: ['access_point', 'vlan', 'equipment', 'security', 'budget', 'cable', 'switch', 'router'],
                requiredQuestions: [
                    { id: 'budget', text: 'كم ميزانيتك التقريبية للمشروع؟', keyword: 'ميزانيه' },
                    { id: 'area', text: 'كم مساحة المقهى بالمتر المربع؟', keyword: 'مساحه' },
                    { id: 'customers', text: 'كم عدد الزبائن المتوقع في وقت الذروة؟', keyword: 'زبون' },
                    { id: 'internet', text: 'ما نوع اتصالك الحالي بالإنترنت؟', keyword: 'انترنت' }
                ],
                keyAnswers: {
                    access_point: {
                        correct: ['3', '4', 'ثلاث', 'اربع', '3-4', '3 4', 'اي بي', 'access', 'ap'],
                        ideal: ['3 points', '4 points', '3 نقاط', '4 نقاط', 'توزيع', 'استراتيجي'],
                        explanation: 'لمقهى 50 زبون، تحتاج 3-4 نقاط وصول لتغطية صالة الجلوس والكاشير والمكاتب'
                    },
                    vlan: {
                        correct: ['vlan', 'شبكات', 'تقسيم', 'عزل', 'فصل'],
                        ideal: ['vlan 10', 'vlan 20', 'vlan 30', 'vlan 40', 'عزل', 'شبكت منفصله'],
                        explanation: 'تصميم VLANs يفصل بين شبكة الزبائن والكاشير والإدارة للأمان'
                    },
                    security: {
                        correct: ['امن', 'حمايه', 'جدار ناري', 'firewall', 'كلمه مرور', 'تشفير'],
                        ideal: ['wpa2', 'wpa3', 'تشفير', '802.1x', 'aes'],
                        explanation: 'أمان الشبكة ضروري لحماية بيانات المقهى والزبائن'
                    },
                    equipment: {
                        correct: ['تجهيزات', 'معدات', 'اجهزه', 'راوتر', 'سويتش', 'كابل'],
                        ideal: ['24 port', 'poe', 'cat6', 'cat6a', 'راوتر', 'سويتش'],
                        explanation: 'التجهيزات تشمل راوتر وسويتش ونقاط وصول وكابلات'
                    },
                    budget: {
                        correct: ['سعر', 'تكلفه', 'ميزانيه', 'ميزانيه'],
                        ideal: ['1000', '2000', '3000', 'economy', 'mid-range', 'premium'],
                        explanation: 'الميزانية تحدد جودة الأجهزة والخيارات المتاحة'
                    }
                }
            },
            hospital: {
                name: 'مركز طبي',
                client: 'د. خالد',
                role: 'مدير المركز الطبي',
                keyTopics: ['vlan', 'security', 'firewall', 'speed', 'backup', 'isolation'],
                requiredQuestions: [
                    { id: 'departments', text: 'كم عدد الأقسام الطبية في المركز؟', keyword: 'اقسام' },
                    { id: 'hipaa', text: 'هل تحتاجون للالتزام بمعايير HIPAA؟', keyword: 'hipaa' },
                    { id: 'budget', text: 'ما هي ميزانية الشبكة؟', keyword: 'ميزانيه' },
                    { id: 'redundancy', text: 'هل لديكم متطلبات للنسخ الاحتياطي؟', keyword: 'احتياط' }
                ],
                keyAnswers: {
                    vlan: {
                        correct: ['vlan', 'تقسيم', 'عزل', 'معزول', 'فصل'],
                        ideal: ['معزل تماما', 'منفصل', 'private', 'معزول'],
                        explanation: 'الأقسام الطبية يجب أن تكون معزولة تماماً لحماية بيانات المرضى'
                    },
                    security: {
                        correct: ['امن', 'تشفير', 'حمايه', 'جدار ناري', 'firewall'],
                        ideal: ['wpa3', '802.1x', 'aes-256', 'ips', 'ids'],
                        explanation: 'الأمان في المراكز الطبية حرج بسبب حساسية البيانات الصحية'
                    },
                    speed: {
                        correct: ['سرعه', 'استقرار', 'استمر'],
                        ideal: ['10gb', '1gb', 'lacp', 'تجميع'],
                        explanation: 'السرعة مهمة للوصول السريع للملفات الطبية'
                    }
                }
            },
            office: {
                name: 'شركة ناشئة',
                client: 'أ. سارة',
                role: 'مسؤولة التقنية',
                keyTopics: ['vpn', 'ip', 'scalability', 'wifi', 'security'],
                requiredQuestions: [
                    { id: 'employees', text: 'كم عدد الموظفين حالياً وما هو النمو المتوقع؟', keyword: 'موظف' },
                    { id: 'remote', text: 'كم نسبة العمل عن بعد؟', keyword: 'بعد' },
                    { id: 'apps', text: 'ما هي التطبيقات الرئيسية المستخدمة؟', keyword: 'تطبيق' },
                    { id: 'budget', text: 'ما هي ميزانية الـ IT؟', keyword: 'it' }
                ],
                keyAnswers: {
                    vpn: {
                        correct: ['vpn', 'اتصال امن', 'نفق', 'tunnel', 'بعد'],
                        ideal: ['wireguard', 'openvpn', 'ipsec', '2fa', 'مصادقه'],
                        explanation: 'الـ VPN الآمن ضروري للموظفين العاملين عن بعد'
                    },
                    ip: {
                        correct: ['ip', 'عنونه', 'subnet', 'dhcp'],
                        ideal: ['192.168', '10.0.0', 'vlsm', 'cidr'],
                        explanation: 'توزيع الـ IPs بشكل منظم يسهل الإدارة والتوسع'
                    }
                }
            }
        };
        return scenarios[scenarioId] || scenarios.cafe;
    }

    extractConversationState(history) {
        const state = {
            askedTopics: new Set(),
            answeredTopics: new Set(),
            correctAnswers: 0,
            incorrectAnswers: 0,
            neutralAnswers: 0,
            currentPhase: 'greeting',
            askedQuestions: new Set(),
            totalQuestions: 0,
            totalAnswers: 0
        };

        history.forEach(msg => {
            if (msg.role === 'user') {
                state.totalAnswers++;
                const topics = this.detectTopics(msg.content);
                topics.forEach(t => state.askedTopics.add(t));
            } else {
                state.totalQuestions++;
            }
        });

        return state;
    }

    normalizeArabic(text) {
        if (!text) return '';
        return text
            .toLowerCase()
            .replace(/[إأآا]/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ى/g, 'ي')
            .replace(/[ًٌٍَُِّْ]/g, '')
            .replace(/[^\w\s\u0600-\u06FF]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    detectIntent(message) {
        const normalized = this.normalizeArabic(message);
        const intents = {
            isQuestion: false,
            isGreeting: false,
            isThanks: false,
            isConfusion: false,
            isNegation: false,
            isAnswer: false
        };

        const questionWords = ['كم', 'كيف', 'ما', 'ايش', 'شو', 'وين', 'متى', 'ليش', 'هل', 'اشرح', 'وضح'];
        const greetingWords = ['مرحبا', 'اهلا', 'سلام', 'هلا', 'صباح', 'مساء'];
        const thanksWords = ['شكرا', 'ممتاز', 'رائع', 'يسلمو', 'يعطيك'];
        const confusionWords = ['مش', 'ما فهمت', 'صعب', 'معقد', 'مو واضح', 'لا اعرف'];
        const negationWords = ['ما', 'مش', 'لا', 'ليس', 'لا يوجد'];
        const answerWords = ['اريد', 'اعتقد', 'اظن', 'الحل', 'نقترح', 'نستخدم', 'نحتاج'];

        if (questionWords.some(w => normalized.includes(w))) {
            intents.isQuestion = true;
        }
        if (greetingWords.some(w => normalized.includes(w))) {
            intents.isGreeting = true;
        }
        if (thanksWords.some(w => normalized.includes(w))) {
            intents.isThanks = true;
        }
        if (confusionWords.some(w => normalized.includes(w))) {
            intents.isConfusion = true;
        }
        if (negationWords.some(w => normalized.includes(w))) {
            intents.isNegation = true;
        }
        if (answerWords.some(w => normalized.includes(w))) {
            intents.isAnswer = true;
        }

        return intents;
    }

    detectTopics(message) {
        const normalized = this.normalizeArabic(message);
        const topicKeywords = {
            access_point: ['access point', 'ap', 'نقطه وصول', 'نقطه', 'واي فاي', 'wifi', 'تغطيه', 'cover'],
            vlan: ['vlan', 'شبكت', 'تقسيم', 'عزل', 'فصل', 'virtu'],
            equipment: ['تجهيزات', 'معدات', 'اجهزه', 'راوتر', 'سويتش', 'كابل', 'cable', 'جهاز'],
            security: ['امن', 'حمايه', 'جدار ناري', 'firewall', 'كلمه مرور', 'تشفير', 'wpa'],
            budget: ['سعر', 'تكلفه', 'ميزانيه', 'كم يكلف', 'budget', 'تكلفه'],
            speed: ['سرعه', 'استقرار', 'استمر', 'بطء', 'بطيء'],
            cable: ['كابل', 'cat6', 'cat5e', 'utp', 'الياف', 'fiber'],
            vpn: ['vpn', 'اتصال امن', 'نفق', 'tunnel', 'بعد', 'remote'],
            ip: ['ip', 'عنونه', 'subnet', 'dhcp', 'عنوان']
        };

        const detected = [];
        for (const [topic, keywords] of Object.entries(topicKeywords)) {
            if (keywords.some(kw => normalized.includes(kw))) {
                detected.push(topic);
            }
        }
        return detected;
    }

    analyzeAndRespond(message) {
        const intents = this.detectIntent(message);
        const detectedTopics = this.detectTopics(message);

        let response = {
            text: '',
            feedback: { type: 'neutral', score: 0.5, points: [], suggestions: [] },
            score: 0.5,
            suggestions: []
        };

        if (intents.isGreeting) {
            response = this.handleGreeting();
        } else if (intents.isConfusion) {
            response = this.handleConfusion();
        } else if (intents.isThanks) {
            response = this.handleThanks();
        } else if (intents.isQuestion && detectedTopics.length > 0) {
            response = this.handleTopicQuestion(detectedTopics[0]);
        } else if (detectedTopics.length > 0) {
            response = this.evaluateTopicResponse(detectedTopics[0], message, intents);
        } else {
            response = this.handleGeneralResponse();
        }

        return response;
    }

    handleGreeting() {
        const greetings = {
            beginner: `مرحباً بك في سيناريو ${this.scenario.name}! ☕

أنا ${this.scenario.client}، ${this.scenario.role}. أحتاج مساعدتك في تصميم شبكة لمكاني.

💡 نصيحة: اسألني أسئلة أولاً قبل ما تقدم عرضك!`,

            intermediate: `أهلاً! أنا ${this.scenario.client}.

أبحث عن مهندس شبكات محترف. لدي متطلبات محددة وأحتاج تصميم شبكة مناسب.

🎯 المطلوب: ناقش معي المتطلبات وقدم لي الحل المناسب.`,

            advanced: `مرحباً! أنا ${this.scenario.client}.

عندي مشروع تصميم شبكة وأحتاج خبير. المتطلبات واضحة والتحديات محددة.

⚡ المطلوب: حلول مبتكرة ومتكاملة.`
        };

        return {
            text: greetings[this.userLevel] || greetings.beginner,
            feedback: { type: 'neutral', score: 0.5, points: ['بداية المحادثة'], suggestions: this.getSuggestions() },
            score: 0.5,
            suggestions: this.getSuggestions()
        };
    }

    handleConfusion() {
        const tips = this.getSuggestions();
        return {
            text: `لا تقلق! دعني أساعدك. 💪

**الخطوات البسيطة:**
1. اسأل عن الميزانية
2. اسأل عن المساحة
3. حدد عدد المستخدمين
4. قدم اقتراحك

💡 جرب تسألني سؤال الآن...`,
            feedback: { type: 'helpful', score: 0.5, points: ['طلب مساعدة'], suggestions: tips },
            score: 0.5,
            suggestions: tips
        };
    }

    handleThanks() {
        const nextQuestion = this.getNextQuestion();
        return {
            text: `العفو! سعيد بمساعدتك. 😊

${nextQuestion ? `❓ التالي: "${nextQuestion}"` : '✅ أحسنت! لقد أجبت على جميع الأسئلة. حان وقت تقديم عرضك النهائي!'}`,
            feedback: { type: 'positive', score: 0.7, points: ['تفاعل إيجابي'], suggestions: this.getSuggestions() },
            score: 0.7,
            suggestions: this.getSuggestions()
        };
    }

    handleTopicQuestion(topic) {
        const questionResponses = {
            access_point: `سؤال ممتاز! عدد Access Points يعتمد على:
• مساحة المكان (كم متر مربع؟)
• عدد الزبائن المتزامنين
• نوع الاستخدام (تصفح عادي أم بث فيديو؟)

💡 الإجابة المثالية: لمقهى 50 زبون، نحتاج 3-4 نقاط وصول موزعة استراتيجياً.

هل تريد مساعدة في تحديد المواقع المثالية؟`,

            vlan: `سؤال ذكي! تصميم VLANs ضروري للأمان:

**التصميم المقترح:**
• VLAN 10: شبكة الزبائن (معزولة)
• VLAN 20: شبكة الكاشير
• VLAN 30: شبكة الإدارة
• VLAN 40: إدارة الأجهزة

⚠️ نصيحة: لا تنسَ إعداد ACLs لمنع الاتصال بين VLANs!

هل تريد شرح كيفية الإعداد؟`,

            security: `سؤال مهم جداً! الأمان أولوية:

**الأساسيات:**
• فعّل WPA2/WPA3
• استخدم جدار حماية (Firewall)
• غيّر كلمات المرور الافتراضية
• حدّث البرامج الثابتة بانتظام

💡 نصيحة: فعّل المصادقة الثنائية للإدارة.

هل تريد تفاصيل أكثر؟`,

            equipment: `سؤال جيد! التجهيزات تشمل:

**الأساسيات:**
• راوتر (Router) للاتصال بالإنترنت
• سويتش (Switch) 24 منفذ
• 3-4 نقاط وصول (Access Points)
• كابلات UTP Cat6
• جدار حماية (Firewall)

هل تريد تفاصيل عن أي قطعة؟`,

            budget: `سؤال ذكي! الميزانية تحدد الخيارات:

**الخيارات:**
• اقتصادي: 700-1200$
• متوسط: 1100-1900$
• متقدم: 2100-3500$

💡 نصيحة: قدم 3 خيارات للعملي ليختار.

ما هي ميزانيتك التقريبية؟`,

            vpn: `سؤال ممتاز! VPN ضروري للعمل عن بعد:

**الخيارات:**
• WireGuard: الأسرع والأكثر أماناً
• OpenVPN: الأكثر شيوعاً
• IPsec: مدعوم في أغلب الأجهزة

💡 نصيحة: فعّل المصادقة الثنائية (2FA).

هل تريد شرح الإعداد؟`,

            ip: `سؤال جيد! توزيع الـ IPs:

**المقترح:**
• الموظفين: 192.168.1.0/24
• الإدارة: 192.168.100.0/24
• VPN: 10.8.0.0/24
• الضيوف: 192.168.200.0/24

💡 نصيحة: استخدم VLSM لتوزيع دقيق.

هل تريد شرح VLSM؟`
        };

        const text = questionResponses[topic] || `سؤال جيد! دعني أساعدك في هذا الموضوع.

💡 نصيحة: اسأل العميل عن متطلباته بدقة قبل تقديم الحل.

هل تريد أن أساعدك في صياغة عرضك؟`;

        return {
            text,
            feedback: { type: 'good_question', score: 0.7, points: ['طرح سؤال ذكي'], suggestions: this.getSuggestions() },
            score: 0.7,
            suggestions: this.getSuggestions()
        };
    }

    evaluateTopicResponse(topic, message, intents) {
        const topicData = this.scenario.keyAnswers[topic];
        if (!topicData) {
            return this.handleGeneralResponse();
        }

        const normalizedMsg = this.normalizeArabic(message);
        const hasCorrect = topicData.correct.some(kw => normalizedMsg.includes(this.normalizeArabic(kw)));
        const hasIdeal = topicData.ideal.some(kw => normalizedMsg.includes(this.normalizeArabic(kw)));
        const hasNegation = intents.isNegation;

        if (hasIdeal && !hasNegation) {
            this.conversationState.correctAnswers++;
            this.conversationState.answeredTopics.add(topic);
            return {
                text: `🌟 إجابة ممتازة!

${topicData.explanation}

**نقاط قوة:**
• فهمت المتطلبات بشكل صحيح
• ذكرت العناصر الأساسية

✅ الدرجة: 9/10 - إجابة احترافية!

${this.getNextQuestionPrompt()}`,
                feedback: { type: 'excellent', score: 0.9, points: ['إجابة شاملة', 'فهم عميق'], suggestions: ['استمر في هذا الأداء!'] },
                score: 0.9,
                suggestions: this.getSuggestions()
            };
        } else if (hasCorrect && !hasNegation) {
            this.conversationState.correctAnswers++;
            this.conversationState.answeredTopics.add(topic);
            const missing = this.getMissingPoints(topic);
            return {
                text: `👍 إجابة جيدة، لكن ينقصها بعض التفاصيل!

${topicData.explanation}

**ما ينقص إجابتك:**
${missing.map(p => `• ${p}`).join('\n')}

✅ الدرجة: 6/10 - جيد مع مجال للتحسين

${this.getNextQuestionPrompt()}`,
                feedback: { type: 'good_incomplete', score: 0.6, points: ['فهم أساسي صحيح', 'يحتاج تفاصيل أكثر'], suggestions: missing },
                score: 0.6,
                suggestions: missing
            };
        } else if (hasNegation) {
            this.conversationState.incorrectAnswers++;
            const correction = this.getCorrection(topic);
            return {
                text: `⚠️ يبدو أن هناك سوء فهم!

${correction.explanation}

**التصحيح:**
${correction.points.map(p => `• ${p}`).join('\n')}

💡 نصيحة للتعامل مع العميل: "${correction.clientScript}"

❌ الدرجة: 2/10 - يحتاج مراجعة

${this.getNextQuestionPrompt()}`,
                feedback: { type: 'incorrect', score: 0.2, points: ['فهم غير كامل', 'يحتاج مراجعة'], suggestions: correction.improvement },
                score: 0.2,
                suggestions: correction.improvement
            };
        }

        this.conversationState.neutralAnswers++;
        return {
            text: `إجابة مثيرة للاهتمام! دعني أضيف بعض النقاط:

**لمناقشة العميل باحترافية:**
1. ابدأ بالأسئلة المفتوحة
2. استمع جيداً لإجاباته
3. قدم حلولاً متنوعة
4. اشرح الفوائد ببساطة

💡 تلميح: العميل لا يفهم المصطلحات التقنية، فاشرح له بلغة بسيطة!

${this.getNextQuestionPrompt()}`,
            feedback: { type: 'neutral', score: 0.5, points: ['تم استلام الإجابة'], suggestions: this.getSuggestions() },
            score: 0.5,
            suggestions: this.getSuggestions()
        };
    }

    handleGeneralResponse() {
        const tips = this.getSuggestions();
        return {
            text: `أفهم! دعني أساعدك:

**نصائح للتعامل مع العميل:**
• اسأل عن الميزانية أولاً
• حدد المساحة وعدد المستخدمين
• قدم خيارات متعددة
• اشرح الفوائد ببساطة

💡 جرب تسألني سؤال عن المقهى...`,
            feedback: { type: 'neutral', score: 0.5, points: ['تفاعل عام'], suggestions: tips },
            score: 0.5,
            suggestions: tips
        };
    }

    getMissingPoints(topic) {
        const points = {
            access_point: [
                'حدد العدد المحدد (3 أو 4 APs)',
                'اذكر نوع الـ AP (Wi-Fi 5 أو Wi-Fi 6)',
                'حدد المواقع المثالية للتوزيع'
            ],
            vlan: [
                'حدد VLAN ID لكل شبكة',
                'اذكر كيفية العزل بين VLANs',
                'حدد أي VLAN يحتاج إنترنت'
            ],
            security: [
                'حدد نوع التشفير (WPA2/WPA3)',
                'اذكر جدار الحماية',
                'حدد سياسة كلمات المرور'
            ],
            equipment: [
                'حدد مودلات الأجهزة',
                'حدد عدد المنافذ المطلوبة',
                'اذكر البدائل المتاحة'
            ],
            budget: [
                'حدد الميزانية التقريبية',
                'اذكر البدائل المتاحة',
                'قدم 3 خيارات'
            ],
            vpn: [
                'حدد البروتوكول المناسب',
                'اذكر المصادقة الثنائية',
                'حدد صلاحيات الوصول'
            ],
            ip: [
                'حدد الشبكات المطلوبة',
                'اذكر توزيع الـ IPs',
                'حدد طريقة التوزيع (DHCP/Static)'
            ]
        };
        return points[topic] || ['أضف تفاصيل أكثر', 'حدد الأرقام', 'اذكر البدائل'];
    }

    getCorrection(topic) {
        const corrections = {
            access_point: {
                explanation: 'يبدو أنك بحاجة لمراجعة أساسيات تغطية الشبكات اللاسلكية.',
                points: [
                    'كل AP يغطي 100-150 متر مربع',
                    'لـ 50 زبون، تحتاج 3-4 APs كحد أدنى',
                    'وزعهم في المواقع الاستراتيجية',
                    'استخدم Wi-Fi 6 للكثافة العالية'
                ],
                clientScript: 'دعني أوضح لك يا أستاذ أحمد، بناءً على مساحة المقهى، نحتاج 3-4 نقاط وصول لتغطية كاملة...',
                improvement: ['راجع حسابات التغطية', 'تدرب على تصميم الشبكات اللاسلكية']
            },
            vlan: {
                explanation: 'تصميم VLANs يحتاج مراجعة لمفاهيم العزل والأمان.',
                points: [
                    'VLAN = شبكة منطقية معزولة',
                    'كل قسم يحتاج VLAN منفصل',
                    'استخدم ACLs للتحكم بالوصول',
                    'شبكة الزبائن يجب أن تكون معزولة تماماً'
                ],
                clientScript: 'أمان شبكتكم مهم جداً. سنقسم الشبكة لـ 4 أقسام معزولة لحماية بياناتكم...',
                improvement: ['راجع أساسيات VLAN', 'تدرب على تصميم شبكات آمنة']
            },
            security: {
                explanation: 'أمان الشبكة أساسي ولا يمكن تجاهله.',
                points: [
                    'استخدم WPA2/WPA3 للتشفير',
                    'فعّل جدار حماية (Firewall)',
                    'غيّر كلمات المرور الافتراضية',
                    'حدّث البرامج الثابتة بانتظام'
                ],
                clientScript: 'حماية بياناتكم وبيانات زبائنكم أولوية. سنستخدم أحدث تقنيات التشفير...',
                improvement: ['راجع أساسيات أمان الشبكات', 'تعرف على بروتوكولات التشفير']
            }
        };
        return corrections[topic] || {
            explanation: 'راجع هذا الموضوع أكثر.',
            points: ['ارجع للأساسيات', 'تدرب أكثر'],
            clientScript: 'دعني أوضح لك هذا الموضوع بشكل أفضل...',
            improvement: ['راجع الدرس مرة أخرى']
        };
    }

    getNextQuestion() {
        const remaining = this.scenario.requiredQuestions.filter(q => {
            return !this.conversationState.askedQuestions.has(q.keyword);
        });
        return remaining.length > 0 ? remaining[0] : null;
    }

    getNextQuestionPrompt() {
        const nextQ = this.getNextQuestion();
        if (nextQ) {
            return `❓ التالي: "${nextQ.text}"`;
        }
        return '✅ أحسنت! لقد أجبت على جميع الأسئلة. حان وقت تقديم عرضك النهائي!';
    }

    getSuggestions() {
        const allSuggestions = [
            'اسأل عن الميزانية',
            'اسأل عن المساحة',
            'اسأل عن عدد المستخدمين',
            'قدم خيارات متعددة',
            'اشرح الفوائد ببساطة'
        ];
        return allSuggestions.slice(0, 3);
    }
}
