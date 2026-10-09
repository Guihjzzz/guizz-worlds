(function () {
  "use strict";

  const LANGUAGES = [
    ["en", "English", "united_states_flag.png"], ["es", "Español", "spain_flag.png"],
    ["fr", "Français", "france_flag.png"], ["de", "Deutsch", "germany_flag.png"],
    ["it", "Italiano", "italy_flag.png"], ["pt", "Português", "brazil_flag.png"],
    ["ru", "Русский", "russia_flag.png"], ["ja", "日本語", "japan_flag.png"],
    ["ko", "한국어", "south_korea_flag.png"], ["zh", "中文", "china_flag.png"],
    ["ar", "العربية", "saudi_arabia_flag.png"], ["hi", "हिन्दी", "india_flag.png"],
    ["nl", "Nederlands", "netherlands_flag.png"], ["pl", "Polski", "poland_flag.png"],
    ["tr", "Türkçe", "turkey_flag.png"]
  ];
  const SOCIAL_COPY = {
    en: ["Follow Guizz", "Videos, community, and updates."],
    es: ["Sigue a Guizz", "Vídeos, comunidad y novedades."],
    fr: ["Suivez Guizz", "Vidéos, communauté et actualités."],
    de: ["Folge Guizz", "Videos, Community und Neuigkeiten."],
    it: ["Segui Guizz", "Video, community e novità."],
    pt: ["Siga o Guizz", "Vídeos, comunidade e novidades."],
    ru: ["Подписывайтесь на Guizz", "Видео, сообщество и новости."],
    ja: ["Guizzをフォロー", "動画、コミュニティ、お知らせ。"],
    ko: ["Guizz 팔로우하기", "영상, 커뮤니티 및 소식."],
    zh: ["关注 Guizz", "视频、社区与最新消息。"],
    ar: ["تابع Guizz", "فيديوهات ومجتمع وأخبار جديدة."],
    hi: ["Guizz को फ़ॉलो करें", "वीडियो, समुदाय और नई जानकारी।"],
    nl: ["Volg Guizz", "Video's, community en updates."],
    pl: ["Obserwuj Guizz", "Filmy, społeczność i nowości."],
    tr: ["Guizz'i takip et", "Videolar, topluluk ve yenilikler."]
  };
  const SITE_SECTION_COPY = {
    en: ["Guizz websites", "Holoprint website cover", "Textures website cover"],
    es: ["Sitios de Guizz", "Portada del sitio Holoprint", "Portada del sitio Texturas"],
    fr: ["Sites de Guizz", "Couverture du site Holoprint", "Couverture du site Texturas"],
    de: ["Guizz-Websites", "Titelbild der Holoprint-Website", "Titelbild der Texturas-Website"],
    it: ["Siti di Guizz", "Copertina del sito Holoprint", "Copertina del sito Texturas"],
    pt: ["Sites do Guizz", "Capa do site Holoprint", "Capa do site Texturas"],
    ru: ["Сайты Guizz", "Обложка сайта Holoprint", "Обложка сайта Texturas"],
    ja: ["Guizzのサイト", "Holoprintサイトのカバー画像", "Texturasサイトのカバー画像"],
    ko: ["Guizz 웹사이트", "Holoprint 사이트 표지 이미지", "Texturas 사이트 표지 이미지"],
    zh: ["Guizz 网站", "Holoprint 网站封面", "Texturas 网站封面"],
    ar: ["مواقع Guizz", "غلاف موقع Holoprint", "غلاف موقع Texturas"],
    hi: ["Guizz की वेबसाइटें", "Holoprint वेबसाइट का कवर", "Texturas वेबसाइट का कवर"],
    nl: ["Websites van Guizz", "Omslagafbeelding van Holoprint", "Omslagafbeelding van Texturas"],
    pl: ["Witryny Guizz", "Okładka strony Holoprint", "Okładka strony Texturas"],
    tr: ["Guizz web siteleri", "Holoprint sitesi kapak görseli", "Texturas sitesi kapak görseli"]
  };
  const LANGUAGE_MENU_LABELS = {
    en: "Available languages", es: "Idiomas disponibles", fr: "Langues disponibles", de: "Verfügbare Sprachen",
    it: "Lingue disponibili", pt: "Idiomas disponíveis", ru: "Доступные языки", ja: "利用できる言語",
    ko: "사용 가능한 언어", zh: "可用语言", ar: "اللغات المتاحة", hi: "उपलब्ध भाषाएँ",
    nl: "Beschikbare talen", pl: "Dostępne języki", tr: "Kullanılabilir diller"
  };
  const MENU_BUTTON_LABELS = {
    en: "Open menu", es: "Abrir menú", fr: "Ouvrir le menu", de: "Menü öffnen", it: "Apri menu",
    pt: "Abrir menu", ru: "Открыть меню", ja: "メニューを開く", ko: "메뉴 열기", zh: "打开菜单",
    ar: "فتح القائمة", hi: "मेनू खोलें", nl: "Menu openen", pl: "Otwórz menu", tr: "Menüyü aç"
  };
  const SOCIAL_EYEBROW_COPY = {
    en: "GUIZZ · SOCIAL", es: "GUIZZ · REDES", fr: "GUIZZ · RÉSEAUX", de: "GUIZZ · SOCIAL",
    it: "GUIZZ · SOCIAL", pt: "GUIZZ · REDES SOCIAIS", ru: "GUIZZ · СОЦСЕТИ", ja: "GUIZZ · SNS",
    ko: "GUIZZ · 소셜", zh: "GUIZZ · 社交", ar: "GUIZZ · التواصل الاجتماعي", hi: "GUIZZ · सोशल",
    nl: "GUIZZ · SOCIAL", pl: "GUIZZ · MEDIA SPOŁECZNOŚCIOWE", tr: "GUIZZ · SOSYAL"
  };
  const SOCIAL_LINK_LABELS = {
    en: ["Visit Guizz on TikTok", "Join Guizz on Discord", "Visit Guizz on YouTube"],
    es: ["Visita a Guizz en TikTok", "Únete al Discord de Guizz", "Visita a Guizz en YouTube"],
    fr: ["Voir Guizz sur TikTok", "Rejoindre le Discord de Guizz", "Voir Guizz sur YouTube"],
    de: ["Guizz auf TikTok ansehen", "Guizz auf Discord beitreten", "Guizz auf YouTube ansehen"],
    it: ["Visita Guizz su TikTok", "Unisciti al Discord di Guizz", "Visita Guizz su YouTube"],
    pt: ["Acesse o TikTok do Guizz", "Entre no Discord do Guizz", "Acesse o YouTube do Guizz"],
    ru: ["Открыть TikTok Guizz", "Присоединиться к Discord Guizz", "Открыть YouTube Guizz"],
    ja: ["Guizz の TikTok を開く", "Guizz の Discord に参加", "Guizz の YouTube を開く"],
    ko: ["Guizz TikTok 방문", "Guizz Discord 참여", "Guizz YouTube 방문"],
    zh: ["访问 Guizz 的 TikTok", "加入 Guizz 的 Discord", "访问 Guizz 的 YouTube"],
    ar: ["زيارة TikTok الخاص بـ Guizz", "الانضمام إلى Discord الخاص بـ Guizz", "زيارة YouTube الخاص بـ Guizz"],
    hi: ["Guizz का TikTok देखें", "Guizz के Discord से जुड़ें", "Guizz का YouTube देखें"],
    nl: ["Bekijk Guizz op TikTok", "Word lid van Guizz op Discord", "Bekijk Guizz op YouTube"],
    pl: ["Odwiedź Guizz na TikToku", "Dołącz do Discorda Guizz", "Odwiedź Guizz na YouTube"],
    tr: ["Guizz'in TikTok sayfasını açın", "Guizz'in Discord sunucusuna katılın", "Guizz'in YouTube sayfasını açın"]
  };
  const COPY_PROGRESS_COPY = {
    en: { compressing: "Compressing the world", finalizing: "Finishing the archive", label: "World copy progress" },
    es: { compressing: "Comprimiendo el mundo", finalizing: "Finalizando el archivo", label: "Progreso de la copia del mundo" },
    fr: { compressing: "Compression du monde", finalizing: "Finalisation de l’archive", label: "Progression de la copie du monde" },
    de: { compressing: "Welt wird komprimiert", finalizing: "Archiv wird abgeschlossen", label: "Fortschritt der Weltkopie" },
    it: { compressing: "Compressione del mondo", finalizing: "Finalizzazione dell’archivio", label: "Avanzamento della copia del mondo" },
    pt: { compressing: "Compactando o mundo", finalizing: "Finalizando o arquivo", label: "Progresso da cópia do mundo" },
    ru: { compressing: "Сжатие мира", finalizing: "Завершение архива", label: "Ход создания копии мира" },
    ja: { compressing: "ワールドを圧縮中", finalizing: "アーカイブを仕上げ中", label: "ワールドコピーの進行状況" },
    ko: { compressing: "월드 압축 중", finalizing: "압축 파일 마무리 중", label: "월드 복사 진행률" },
    zh: { compressing: "正在压缩世界", finalizing: "正在完成压缩包", label: "世界副本进度" },
    ar: { compressing: "جارٍ ضغط العالم", finalizing: "جارٍ إنهاء الأرشيف", label: "تقدم نسخ العالم" },
    hi: { compressing: "दुनिया संपीड़ित हो रही है", finalizing: "आर्काइव पूरा हो रहा है", label: "दुनिया की कॉपी की प्रगति" },
    nl: { compressing: "Wereld comprimeren", finalizing: "Archief afronden", label: "Voortgang van de wereldkopie" },
    pl: { compressing: "Kompresowanie świata", finalizing: "Kończenie archiwum", label: "Postęp tworzenia kopii świata" },
    tr: { compressing: "Dünya sıkıştırılıyor", finalizing: "Arşiv tamamlanıyor", label: "Dünya kopyası ilerlemesi" }
  };
  const WORLD_META = {
    en: { info: "World information", gameMode: "Game mode", difficulty: "Difficulty", lastPlayed: "Last played", minecraft: "Minecraft", change: "Change", defaultName: "My World", hardcore: "Hardcore", mode: { survival: "Survival", creative: "Creative", adventure: "Adventure", spectator: "Spectator", unknown: "Unknown" }, difficultyName: { peaceful: "Peaceful", easy: "Easy", normal: "Normal", hard: "Hard", unknown: "Unknown" } },
    es: { info: "Información del mundo", gameMode: "Modo de juego", difficulty: "Dificultad", lastPlayed: "Última sesión", minecraft: "Minecraft", change: "Cambiar", defaultName: "Mi mundo", hardcore: "Extremo", mode: { survival: "Supervivencia", creative: "Creativo", adventure: "Aventura", spectator: "Espectador", unknown: "Desconocido" }, difficultyName: { peaceful: "Pacífica", easy: "Fácil", normal: "Normal", hard: "Difícil", unknown: "Desconocida" } },
    fr: { info: "Informations du monde", gameMode: "Mode de jeu", difficulty: "Difficulté", lastPlayed: "Dernière partie", minecraft: "Minecraft", change: "Modifier", defaultName: "Mon monde", hardcore: "Extrême", mode: { survival: "Survie", creative: "Créatif", adventure: "Aventure", spectator: "Spectateur", unknown: "Inconnu" }, difficultyName: { peaceful: "Paisible", easy: "Facile", normal: "Normale", hard: "Difficile", unknown: "Inconnue" } },
    de: { info: "Weltinformationen", gameMode: "Spielmodus", difficulty: "Schwierigkeit", lastPlayed: "Zuletzt gespielt", minecraft: "Minecraft", change: "Ändern", defaultName: "Meine Welt", hardcore: "Hardcore", mode: { survival: "Überleben", creative: "Kreativ", adventure: "Abenteuer", spectator: "Zuschauer", unknown: "Unbekannt" }, difficultyName: { peaceful: "Friedlich", easy: "Leicht", normal: "Normal", hard: "Schwer", unknown: "Unbekannt" } },
    it: { info: "Informazioni sul mondo", gameMode: "Modalità di gioco", difficulty: "Difficoltà", lastPlayed: "Ultima partita", minecraft: "Minecraft", change: "Modifica", defaultName: "Il mio mondo", hardcore: "Estrema", mode: { survival: "Sopravvivenza", creative: "Creativa", adventure: "Avventura", spectator: "Spettatore", unknown: "Sconosciuta" }, difficultyName: { peaceful: "Pacifico", easy: "Facile", normal: "Normale", hard: "Difficile", unknown: "Sconosciuta" } },
    pt: { info: "Informações do mundo", gameMode: "Modo de jogo", difficulty: "Dificuldade", lastPlayed: "Última sessão", minecraft: "Minecraft", change: "Alterar", defaultName: "Meu Mundo", hardcore: "Hardcore", mode: { survival: "Sobrevivência", creative: "Criativo", adventure: "Aventura", spectator: "Espectador", unknown: "Desconhecido" }, difficultyName: { peaceful: "Pacífica", easy: "Fácil", normal: "Normal", hard: "Difícil", unknown: "Desconhecida" } },
    ru: { info: "Информация о мире", gameMode: "Режим игры", difficulty: "Сложность", lastPlayed: "Последняя игра", minecraft: "Minecraft", change: "Изменить", defaultName: "Мой мир", hardcore: "Хардкор", mode: { survival: "Выживание", creative: "Творческий", adventure: "Приключение", spectator: "Наблюдатель", unknown: "Неизвестно" }, difficultyName: { peaceful: "Мирная", easy: "Лёгкая", normal: "Обычная", hard: "Сложная", unknown: "Неизвестно" } },
    ja: { info: "ワールド情報", gameMode: "ゲームモード", difficulty: "難易度", lastPlayed: "最終プレイ", minecraft: "Minecraft", change: "変更", defaultName: "マイワールド", hardcore: "ハードコア", mode: { survival: "サバイバル", creative: "クリエイティブ", adventure: "アドベンチャー", spectator: "観戦者", unknown: "不明" }, difficultyName: { peaceful: "ピースフル", easy: "イージー", normal: "ノーマル", hard: "ハード", unknown: "不明" } },
    ko: { info: "월드 정보", gameMode: "게임 모드", difficulty: "난이도", lastPlayed: "마지막 플레이", minecraft: "Minecraft", change: "변경", defaultName: "내 월드", hardcore: "하드코어", mode: { survival: "서바이벌", creative: "크리에이티브", adventure: "모험", spectator: "관전자", unknown: "알 수 없음" }, difficultyName: { peaceful: "평화로움", easy: "쉬움", normal: "보통", hard: "어려움", unknown: "알 수 없음" } },
    zh: { info: "世界信息", gameMode: "游戏模式", difficulty: "难度", lastPlayed: "上次游玩", minecraft: "Minecraft", change: "更改", defaultName: "我的世界", hardcore: "极限模式", mode: { survival: "生存", creative: "创造", adventure: "冒险", spectator: "旁观", unknown: "未知" }, difficultyName: { peaceful: "和平", easy: "简单", normal: "普通", hard: "困难", unknown: "未知" } },
    ar: { info: "معلومات العالم", gameMode: "وضع اللعب", difficulty: "الصعوبة", lastPlayed: "آخر لعب", minecraft: "Minecraft", change: "تغيير", defaultName: "عالمي", hardcore: "المتطرف", mode: { survival: "البقاء", creative: "الإبداع", adventure: "المغامرة", spectator: "المشاهد", unknown: "غير معروف" }, difficultyName: { peaceful: "سلمي", easy: "سهل", normal: "عادي", hard: "صعب", unknown: "غير معروفة" } },
    hi: { info: "दुनिया की जानकारी", gameMode: "गेम मोड", difficulty: "कठिनाई", lastPlayed: "आखिरी बार खेला", minecraft: "Minecraft", change: "बदलें", defaultName: "मेरी दुनिया", hardcore: "हार्डकोर", mode: { survival: "सर्वाइवल", creative: "क्रिएटिव", adventure: "एडवेंचर", spectator: "दर्शक", unknown: "अज्ञात" }, difficultyName: { peaceful: "शांत", easy: "आसान", normal: "सामान्य", hard: "कठिन", unknown: "अज्ञात" } },
    nl: { info: "Wereldinformatie", gameMode: "Speltype", difficulty: "Moeilijkheid", lastPlayed: "Laatst gespeeld", minecraft: "Minecraft", change: "Wijzigen", defaultName: "Mijn wereld", hardcore: "Hardcore", mode: { survival: "Overleven", creative: "Creatief", adventure: "Avontuur", spectator: "Toeschouwer", unknown: "Onbekend" }, difficultyName: { peaceful: "Vreedzaam", easy: "Makkelijk", normal: "Normaal", hard: "Moeilijk", unknown: "Onbekend" } },
    pl: { info: "Informacje o świecie", gameMode: "Tryb gry", difficulty: "Poziom trudności", lastPlayed: "Ostatnio grano", minecraft: "Minecraft", change: "Zmień", defaultName: "Mój świat", hardcore: "Hardcore", mode: { survival: "Przetrwanie", creative: "Kreatywny", adventure: "Przygodowy", spectator: "Obserwator", unknown: "Nieznany" }, difficultyName: { peaceful: "Pokojowy", easy: "Łatwy", normal: "Normalny", hard: "Trudny", unknown: "Nieznany" } },
    tr: { info: "Dünya bilgileri", gameMode: "Oyun modu", difficulty: "Zorluk", lastPlayed: "Son oynanma", minecraft: "Minecraft", change: "Değiştir", defaultName: "Dünyam", hardcore: "Zorlu", mode: { survival: "Hayatta kalma", creative: "Yaratıcı", adventure: "Macera", spectator: "İzleyici", unknown: "Bilinmiyor" }, difficultyName: { peaceful: "Barışçıl", easy: "Kolay", normal: "Normal", hard: "Zor", unknown: "Bilinmiyor" } }
  };
  const WORLD_FLOW = {
    en: { reasonTitle: "Achievements are off in this world", planTitle: "What World Rescue will change", planCheats: "Turn cheats and commands off", planMode: "Set the game mode to Survival", planCreativeHistory: "Clear the record that this world was played in Creative", planAchievementFlag: "Clear the disabled-achievements marker", originalSafe: "Your original world stays unchanged.", cleanTitle: "No repair needed", blockedTitle: "This world cannot be repaired here", readyTitle: "Your repaired copy is ready", downloadNow: "Download repaired world" },
    es: { reasonTitle: "Los logros están desactivados en este mundo", planTitle: "Qué cambiará World Rescue", planCheats: "Desactivar trucos y comandos", planMode: "Cambiar el modo de juego a Supervivencia", planCreativeHistory: "Eliminar el registro de que el mundo se jugó en Creativo", planAchievementFlag: "Eliminar el indicador de logros desactivados", originalSafe: "El mundo original permanecerá intacto.", cleanTitle: "No se necesita reparar", blockedTitle: "Este mundo no se puede reparar aquí", readyTitle: "Tu copia reparada está lista", downloadNow: "Descargar mundo reparado" },
    fr: { reasonTitle: "Les succès sont désactivés dans ce monde", planTitle: "Modifications de World Rescue", planCheats: "Désactiver les commandes et les triches", planMode: "Passer le mode de jeu en Survie", planCreativeHistory: "Effacer l’historique de jeu en mode Créatif", planAchievementFlag: "Effacer l’indicateur de succès désactivés", originalSafe: "Le monde d’origine restera intact.", cleanTitle: "Aucune réparation nécessaire", blockedTitle: "Ce monde ne peut pas être réparé ici", readyTitle: "Votre copie réparée est prête", downloadNow: "Télécharger le monde réparé" },
    de: { reasonTitle: "Erfolge sind in dieser Welt deaktiviert", planTitle: "Änderungen durch World Rescue", planCheats: "Befehle und Cheats deaktivieren", planMode: "Spielmodus auf Überleben setzen", planCreativeHistory: "Den Eintrag zum Spielen im Kreativmodus entfernen", planAchievementFlag: "Den Marker für deaktivierte Erfolge entfernen", originalSafe: "Die Originalwelt bleibt unverändert.", cleanTitle: "Keine Reparatur nötig", blockedTitle: "Diese Welt kann hier nicht repariert werden", readyTitle: "Deine reparierte Kopie ist bereit", downloadNow: "Reparierte Welt herunterladen" },
    it: { reasonTitle: "Gli obiettivi sono disattivati in questo mondo", planTitle: "Modifiche di World Rescue", planCheats: "Disattivare trucchi e comandi", planMode: "Impostare la modalità su Sopravvivenza", planCreativeHistory: "Rimuovere la registrazione della partita in Creativa", planAchievementFlag: "Rimuovere l’indicatore degli obiettivi disattivati", originalSafe: "Il mondo originale resterà intatto.", cleanTitle: "Nessuna riparazione necessaria", blockedTitle: "Questo mondo non può essere riparato qui", readyTitle: "La copia riparata è pronta", downloadNow: "Scarica il mondo riparato" },
    pt: { reasonTitle: "As conquistas estão desativadas neste mundo", planTitle: "O que o World Rescue vai alterar", planCheats: "Desativar trapaças e comandos", planMode: "Definir o modo de jogo como Sobrevivência", planCreativeHistory: "Remover o registro de que o mundo foi aberto no Criativo", planAchievementFlag: "Limpar o indicador de conquistas desativadas", originalSafe: "Seu mundo original continuará intacto.", cleanTitle: "Nenhuma correção necessária", blockedTitle: "Este mundo não pode ser corrigido por aqui", readyTitle: "Sua cópia corrigida está pronta", downloadNow: "Baixar mundo corrigido" },
    ru: { reasonTitle: "Достижения в этом мире отключены", planTitle: "Что изменит World Rescue", planCheats: "Отключить читы и команды", planMode: "Установить режим выживания", planCreativeHistory: "Удалить отметку об игре в творческом режиме", planAchievementFlag: "Сбросить отметку об отключённых достижениях", originalSafe: "Исходный мир останется без изменений.", cleanTitle: "Исправление не требуется", blockedTitle: "Этот мир нельзя исправить здесь", readyTitle: "Исправленная копия готова", downloadNow: "Скачать исправленный мир" },
    ja: { reasonTitle: "このワールドでは実績が無効です", planTitle: "World Rescueで変更する内容", planCheats: "チートとコマンドを無効にする", planMode: "ゲームモードをサバイバルに設定する", planCreativeHistory: "クリエイティブでプレイした記録を消去する", planAchievementFlag: "実績無効の記録を消去する", originalSafe: "元のワールドは変更されません。", cleanTitle: "修正は必要ありません", blockedTitle: "このワールドはここでは修正できません", readyTitle: "修正したコピーができました", downloadNow: "修正したワールドをダウンロード" },
    ko: { reasonTitle: "이 월드에서는 도전 과제가 비활성화되어 있습니다", planTitle: "World Rescue가 변경할 내용", planCheats: "치트와 명령어 끄기", planMode: "게임 모드를 서바이벌로 설정", planCreativeHistory: "크리에이티브 플레이 기록 지우기", planAchievementFlag: "도전 과제 비활성화 표시 지우기", originalSafe: "원본 월드는 변경되지 않습니다.", cleanTitle: "수정이 필요하지 않습니다", blockedTitle: "이 월드는 여기서 수정할 수 없습니다", readyTitle: "수정된 복사본이 준비되었습니다", downloadNow: "수정된 월드 다운로드" },
    zh: { reasonTitle: "此世界的成就已关闭", planTitle: "World Rescue 将进行的更改", planCheats: "关闭作弊和命令", planMode: "将游戏模式设为生存", planCreativeHistory: "清除曾在创造模式中游玩的记录", planAchievementFlag: "清除成就已关闭标记", originalSafe: "原始世界不会被修改。", cleanTitle: "无需修复", blockedTitle: "此世界无法在此修复", readyTitle: "修复后的副本已准备好", downloadNow: "下载修复后的世界" },
    ar: { reasonTitle: "الإنجازات متوقفة في هذا العالم", planTitle: "ما سيغيّره World Rescue", planCheats: "إيقاف الغش والأوامر", planMode: "ضبط وضع اللعب على البقاء", planCreativeHistory: "مسح سجل اللعب في الوضع الإبداعي", planAchievementFlag: "مسح علامة تعطيل الإنجازات", originalSafe: "سيبقى عالمك الأصلي دون تغيير.", cleanTitle: "لا حاجة إلى إصلاح", blockedTitle: "لا يمكن إصلاح هذا العالم هنا", readyTitle: "أصبحت النسخة المصححة جاهزة", downloadNow: "تنزيل العالم المصحح" },
    hi: { reasonTitle: "इस दुनिया में उपलब्धियाँ बंद हैं", planTitle: "World Rescue क्या बदलेगा", planCheats: "चीट और कमांड बंद करना", planMode: "गेम मोड को सर्वाइवल पर सेट करना", planCreativeHistory: "क्रिएटिव मोड में खेलने का रिकॉर्ड हटाना", planAchievementFlag: "बंद उपलब्धियों का संकेत हटाना", originalSafe: "आपकी मूल दुनिया में कोई बदलाव नहीं होगा।", cleanTitle: "मरम्मत की आवश्यकता नहीं", blockedTitle: "इस दुनिया की यहाँ मरम्मत नहीं हो सकती", readyTitle: "आपकी सुधारी हुई कॉपी तैयार है", downloadNow: "सुधारी हुई दुनिया डाउनलोड करें" },
    nl: { reasonTitle: "Prestaties zijn uitgeschakeld in deze wereld", planTitle: "Wat World Rescue aanpast", planCheats: "Cheats en opdrachten uitschakelen", planMode: "Speltype instellen op Overleven", planCreativeHistory: "Registratie van spelen in Creatief wissen", planAchievementFlag: "Markering voor uitgeschakelde prestaties wissen", originalSafe: "Je oorspronkelijke wereld blijft ongewijzigd.", cleanTitle: "Reparatie niet nodig", blockedTitle: "Deze wereld kan hier niet worden gerepareerd", readyTitle: "Je gerepareerde kopie is klaar", downloadNow: "Gerepareerde wereld downloaden" },
    pl: { reasonTitle: "Osiągnięcia są wyłączone w tym świecie", planTitle: "Co zmieni World Rescue", planCheats: "Wyłączyć kody i polecenia", planMode: "Ustawić tryb gry na Przetrwanie", planCreativeHistory: "Usunąć zapis gry w trybie Kreatywnym", planAchievementFlag: "Wyczyścić znacznik wyłączonych osiągnięć", originalSafe: "Oryginalny świat pozostanie bez zmian.", cleanTitle: "Naprawa nie jest potrzebna", blockedTitle: "Tego świata nie można tu naprawić", readyTitle: "Naprawiona kopia jest gotowa", downloadNow: "Pobierz naprawiony świat" },
    tr: { reasonTitle: "Bu dünyada başarımlar kapalı", planTitle: "World Rescue hangi değişiklikleri yapacak", planCheats: "Hileleri ve komutları kapat", planMode: "Oyun modunu Hayatta Kalma olarak ayarla", planCreativeHistory: "Yaratıcı modda oynama kaydını temizle", planAchievementFlag: "Kapalı başarım işaretini temizle", originalSafe: "Orijinal dünyanız değiştirilmeden kalır.", cleanTitle: "Onarım gerekmiyor", blockedTitle: "Bu dünya burada onarılamaz", readyTitle: "Onarılmış kopyanız hazır", downloadNow: "Onarılmış dünyayı indir" }
  };
  const KEYS = [
    "allTools", "title", "subtitle", "choose", "uploadHelp", "browse", "waiting",
    "reportTitle", "fix", "reset", "copyReady", "download", "how", "why", "whyText", "console",
    "reading", "badFile", "badZip", "missingLevel", "blockedStatus", "foundStatus", "cleanStatus",
    "readFailed", "preparing", "creating", "downloadMessage", "copySuccess", "fixed", "retry",
    "copyFailed", "blockedReport", "blocked", "cleanReport", "foundReport", "fixable"
  ];

  // Translation strings cover the page, recovery controls, and the guidance shown for each device.
  const COPY = {
    en: `All tools|World Rescue|Restore achievement eligibility on a Bedrock world after cheats or Creative. Works on your phone.|Choose your world|The exported .mcworld file. It never leaves this device.|Browse files|Waiting for a .mcworld file|World analysis|Create repaired copy|Choose another world|Copy ready.|Download .mcworld|How do I get my world file?|Why achievements turn off|Minecraft permanently disables achievements after cheats are enabled or a world is played in Creative, even once. Turning cheats off again does not restore them. World Rescue updates a copy of the world so achievements can count again.|Console|Reading and analyzing the world…|Choose a file with the .mcworld extension.|The ZIP library did not load. Open this page with its companion files in the same folder.|Could not find level.dat at the root of the .mcworld. Export the world again from Minecraft.|Analysis complete: the world was kept unchanged for safety.|Analysis complete: repairable settings were found.|Analysis complete: no known settings were found.|Could not read this world.|Preparing copy…|Creating a new file in your browser…|The copy is ready. Download it and import it into Minecraft.|Copy ready. The original file was not replaced.|Repaired copy ready|Try creating the copy again|Could not create the copy.|This world contains states that this tool cannot safely reverse. No file will be changed.|Blocked|No known indicators needing repair were found. The original file remains unchanged.|Settings that can be repaired in a copy were found. Review the items before continuing.|Can repair`.split("|"),
    es: `Todas las herramientas|Rescate del mundo|Recupera los logros de un mundo Bedrock después de activar trucos o jugar en Creativo. Funciona en tu teléfono.|Elige tu mundo|El archivo .mcworld exportado. Nunca sale de este dispositivo.|Buscar archivos|Esperando un archivo .mcworld|Análisis del mundo|Crear copia reparada|Elegir otro mundo|Copia lista.|Descargar .mcworld|¿Cómo obtengo el archivo de mi mundo?|Por qué se desactivan los logros|Minecraft desactiva los logros permanentemente si se activan los trucos o se juega en Creativo, aunque sea una sola vez. Desactivar los trucos después no los restaura. World Rescue actualiza una copia del mundo para que los logros vuelvan a contar.|Consola|Leyendo y analizando el mundo…|Elige un archivo con la extensión .mcworld.|No se cargó la biblioteca ZIP. Abre esta página junto con sus archivos en la misma carpeta.|No se encontró level.dat en la raíz del .mcworld. Exporta el mundo de nuevo desde Minecraft.|Análisis completo: el mundo se mantuvo intacto por seguridad.|Análisis completo: se encontraron ajustes que se pueden reparar.|Análisis completo: no se encontraron ajustes conocidos.|No se pudo leer este mundo.|Preparando la copia…|Creando un archivo nuevo en el navegador…|La copia está lista. Descárgala e impórtala en Minecraft.|Copia lista. El archivo original no se reemplazó.|Copia reparada lista|Intenta crear la copia de nuevo|No se pudo crear la copia.|Este mundo contiene estados que esta herramienta no puede revertir de forma segura. No se cambiará ningún archivo.|Bloqueado|No se encontraron indicadores conocidos que necesiten reparación. El archivo original permanece intacto.|Se encontraron ajustes que se pueden reparar en una copia. Revísalos antes de continuar.|Se puede reparar`.split("|"),
    fr: `Tous les outils|Sauvetage du monde|Récupérez les succès d’un monde Bedrock après l’activation des commandes ou un passage en Créatif. Fonctionne sur téléphone.|Choisir votre monde|Le fichier .mcworld exporté. Il ne quitte jamais cet appareil.|Parcourir les fichiers|En attente d’un fichier .mcworld|Analyse du monde|Créer une copie réparée|Choisir un autre monde|Copie prête.|Télécharger .mcworld|Comment obtenir le fichier de mon monde ?|Pourquoi les succès sont désactivés|Minecraft désactive définitivement les succès si les commandes sont activées ou si le monde est joué en Créatif, même une seule fois. Désactiver les commandes ensuite ne les rétablit pas. World Rescue met à jour une copie du monde pour que les succès soient à nouveau comptabilisés.|Console|Lecture et analyse du monde…|Choisissez un fichier avec l’extension .mcworld.|La bibliothèque ZIP n’a pas été chargée. Ouvrez cette page avec ses fichiers associés dans le même dossier.|level.dat est introuvable à la racine du .mcworld. Exportez à nouveau le monde depuis Minecraft.|Analyse terminée : le monde a été conservé intact par sécurité.|Analyse terminée : des paramètres réparables ont été trouvés.|Analyse terminée : aucun paramètre connu n’a été trouvé.|Impossible de lire ce monde.|Préparation de la copie…|Création d’un nouveau fichier dans le navigateur…|La copie est prête. Téléchargez-la et importez-la dans Minecraft.|Copie prête. Le fichier original n’a pas été remplacé.|Copie réparée prête|Réessayez de créer la copie|Impossible de créer la copie.|Ce monde contient des états que cet outil ne peut pas annuler en toute sécurité. Aucun fichier ne sera modifié.|Bloqué|Aucun indicateur connu à réparer n’a été trouvé. Le fichier original reste intact.|Des paramètres réparables dans une copie ont été trouvés. Vérifiez les éléments avant de continuer.|Réparable`.split("|"),
    de: `Alle Werkzeuge|Weltrettung|Stelle Erfolge in einer Bedrock-Welt wieder her, nachdem Cheats aktiviert oder Kreativmodus verwendet wurden. Funktioniert auf deinem Handy.|Welt auswählen|Die exportierte .mcworld-Datei. Sie verlässt dieses Gerät nicht.|Dateien durchsuchen|Warte auf eine .mcworld-Datei|Weltanalyse|Reparierte Kopie erstellen|Andere Welt auswählen|Kopie bereit.|.mcworld herunterladen|Wie bekomme ich meine Weltdatei?|Warum Erfolge deaktiviert werden|Minecraft deaktiviert Erfolge dauerhaft, wenn Cheats aktiviert oder eine Welt im Kreativmodus gespielt wird, auch nur einmal. Cheats später auszuschalten stellt sie nicht wieder her. World Rescue ändert eine Kopie der Welt, damit Erfolge wieder zählen können.|Konsole|Welt wird gelesen und analysiert…|Wähle eine Datei mit der Endung .mcworld.|Die ZIP-Bibliothek wurde nicht geladen. Öffne diese Seite zusammen mit den zugehörigen Dateien im selben Ordner.|level.dat wurde nicht im Stammverzeichnis der .mcworld-Datei gefunden. Exportiere die Welt erneut aus Minecraft.|Analyse abgeschlossen: Die Welt wurde vorsichtshalber unverändert gelassen.|Analyse abgeschlossen: Reparierbare Einstellungen wurden gefunden.|Analyse abgeschlossen: Keine bekannten Einstellungen gefunden.|Diese Welt konnte nicht gelesen werden.|Kopie wird vorbereitet…|Eine neue Datei wird im Browser erstellt…|Die Kopie ist bereit. Lade sie herunter und importiere sie in Minecraft.|Kopie bereit. Die Originaldatei wurde nicht ersetzt.|Reparierte Kopie bereit|Erstelle die Kopie erneut|Die Kopie konnte nicht erstellt werden.|Diese Welt enthält Zustände, die dieses Werkzeug nicht sicher rückgängig machen kann. Es wird keine Datei geändert.|Blockiert|Es wurden keine bekannten reparaturbedürftigen Hinweise gefunden. Die Originaldatei bleibt unverändert.|Einstellungen, die in einer Kopie repariert werden können, wurden gefunden. Prüfe die Einträge, bevor du fortfährst.|Reparierbar`.split("|"),
    it: `Tutti gli strumenti|Recupero mondo|Recupera gli obiettivi di un mondo Bedrock dopo aver attivato i trucchi o giocato in Creativa. Funziona sul telefono.|Scegli il tuo mondo|Il file .mcworld esportato. Non lascia mai questo dispositivo.|Sfoglia i file|In attesa di un file .mcworld|Analisi del mondo|Crea una copia riparata|Scegli un altro mondo|Copia pronta.|Scarica .mcworld|Come ottengo il file del mio mondo?|Perché gli obiettivi si disattivano|Minecraft disattiva definitivamente gli obiettivi se si attivano i trucchi o si gioca in Creativa, anche una sola volta. Disattivare i trucchi in seguito non li ripristina. World Rescue aggiorna una copia del mondo così gli obiettivi possono essere conteggiati di nuovo.|Console|Lettura e analisi del mondo…|Scegli un file con estensione .mcworld.|La libreria ZIP non è stata caricata. Apri questa pagina insieme ai file necessari nella stessa cartella.|level.dat non è stato trovato nella radice del file .mcworld. Esporta di nuovo il mondo da Minecraft.|Analisi completata: il mondo è stato lasciato intatto per sicurezza.|Analisi completata: sono state trovate impostazioni riparabili.|Analisi completata: non sono state trovate impostazioni note.|Impossibile leggere questo mondo.|Preparazione della copia…|Creazione di un nuovo file nel browser…|La copia è pronta. Scaricala e importala in Minecraft.|Copia pronta. Il file originale non è stato sostituito.|Copia riparata pronta|Prova a creare di nuovo la copia|Impossibile creare la copia.|Questo mondo contiene stati che lo strumento non può ripristinare in sicurezza. Nessun file verrà modificato.|Bloccato|Non sono stati trovati indicatori noti da riparare. Il file originale resta intatto.|Sono state trovate impostazioni riparabili in una copia. Controlla gli elementi prima di continuare.|Riparabile`.split("|"),
    pt: `Todas as ferramentas|Resgate do mundo|Recupere as conquistas de um mundo Bedrock após ativar trapaças ou jogar no Criativo. Funciona no celular.|Escolha seu mundo|O arquivo .mcworld exportado. Ele nunca sai deste dispositivo.|Procurar arquivos|Aguardando um arquivo .mcworld|Análise do mundo|Criar cópia corrigida|Escolher outro mundo|Cópia pronta.|Baixar .mcworld|Como obtenho o arquivo do meu mundo?|Por que as conquistas são desativadas|O Minecraft desativa as conquistas permanentemente quando trapaças são ativadas ou o mundo é jogado no Criativo, mesmo uma única vez. Desativar as trapaças depois não as restaura. O World Rescue atualiza uma cópia do mundo para que as conquistas voltem a contar.|Console|Lendo e analisando o mundo…|Escolha um arquivo com a extensão .mcworld.|A biblioteca ZIP não carregou. Abra esta página junto com os arquivos correspondentes na mesma pasta.|Não encontrei level.dat na raiz do .mcworld. Exporte o mundo novamente pelo Minecraft.|Análise concluída: o mundo foi preservado por segurança.|Análise concluída: foram encontrados ajustes que podem ser corrigidos.|Análise concluída: nenhum ajuste conhecido foi encontrado.|Não foi possível ler este mundo.|Preparando cópia…|Criando um novo arquivo no navegador…|A cópia está pronta. Baixe e importe esse arquivo no Minecraft.|Cópia pronta. O arquivo original não foi substituído.|Cópia corrigida pronta|Tentar criar a cópia novamente|Não foi possível criar a cópia.|Este mundo contém estados que a ferramenta não consegue reverter com segurança. Nenhum arquivo será alterado.|Bloqueado|Não encontrei indicadores conhecidos que precisem de correção. O arquivo original permanece intacto.|Encontrei ajustes que podem ser corrigidos em uma cópia. Revise os itens antes de continuar.|Pode corrigir`.split("|"),
    ru: `Все инструменты|Восстановление мира|Верните достижения в мире Bedrock после включения читов или игры в творческом режиме. Работает на телефоне.|Выберите мир|Экспортированный файл .mcworld. Он не покидает это устройство.|Выбрать файл|Ожидание файла .mcworld|Анализ мира|Создать исправленную копию|Выбрать другой мир|Копия готова.|Скачать .mcworld|Как получить файл мира?|Почему достижения отключаются|Minecraft навсегда отключает достижения, если включить читы или играть в мире в творческом режиме, даже один раз. Повторное отключение читов не вернёт достижения. World Rescue изменяет копию мира, чтобы достижения снова засчитывались.|Консоль|Чтение и анализ мира…|Выберите файл с расширением .mcworld.|Библиотека ZIP не загрузилась. Откройте эту страницу вместе с нужными файлами в одной папке.|В корне .mcworld не найден level.dat. Повторно экспортируйте мир из Minecraft.|Анализ завершён: мир оставлен без изменений в целях безопасности.|Анализ завершён: найдены параметры, которые можно исправить.|Анализ завершён: известные параметры не найдены.|Не удалось прочитать этот мир.|Подготовка копии…|Создание нового файла в браузере…|Копия готова. Скачайте её и импортируйте в Minecraft.|Копия готова. Исходный файл не заменён.|Исправленная копия готова|Попробуйте создать копию ещё раз|Не удалось создать копию.|В этом мире есть состояния, которые нельзя безопасно отменить этим инструментом. Файлы не будут изменены.|Блокировка|Известные признаки для исправления не найдены. Исходный файл не изменён.|Найдены параметры, которые можно исправить в копии. Проверьте их перед продолжением.|Можно исправить`.split("|"),
    ja: `すべてのツール|ワールド救出|チートの有効化やクリエイティブでのプレイ後に、Bedrock ワールドの実績を復旧します。スマートフォンでも使えます。|ワールドを選択|エクスポートした .mcworld ファイルです。この端末から外部へ送信されません。|ファイルを選択|.mcworld ファイルを待っています|ワールドの分析|修復済みコピーを作成|別のワールドを選択|コピーの準備完了|.mcworld をダウンロード|ワールドファイルを取得するには？|実績が無効になる理由|チートを有効にするか、ワールドを一度でもクリエイティブでプレイすると、Minecraft は実績を恒久的に無効にします。その後チートを無効にしても戻りません。World Rescue はワールドのコピーを更新し、実績が再び記録されるようにします。|コンソール|ワールドを読み取り、分析しています…|拡張子が .mcworld のファイルを選択してください。|ZIP ライブラリを読み込めませんでした。このページと必要なファイルを同じフォルダーに置いて開いてください。|.mcworld のルートに level.dat が見つかりません。Minecraft からワールドをもう一度エクスポートしてください。|分析完了：安全のためワールドは変更されていません。|分析完了：修復可能な設定が見つかりました。|分析完了：既知の設定は見つかりませんでした。|このワールドを読み取れませんでした。|コピーを準備しています…|ブラウザーで新しいファイルを作成しています…|コピーの準備ができました。ダウンロードして Minecraft にインポートしてください。|コピーの準備ができました。元のファイルは置き換えていません。|修復済みコピーの準備完了|もう一度コピーを作成してください|コピーを作成できませんでした。|このワールドには安全に元に戻せない状態があります。ファイルは変更されません。|修復不可|修復が必要な既知の項目はありません。元のファイルは変更されていません。|コピーで修復できる設定が見つかりました。続行する前に確認してください。|修復可能`.split("|"),
    ko: `모든 도구|월드 복구|치트 활성화 또는 크리에이티브 플레이 후 Bedrock 월드의 업적을 복구합니다. 휴대폰에서도 사용할 수 있습니다.|월드 선택|내보낸 .mcworld 파일입니다. 이 기기 밖으로 전송되지 않습니다.|파일 찾아보기|.mcworld 파일을 기다리는 중|월드 분석|수정된 사본 만들기|다른 월드 선택|사본 준비 완료|.mcworld 다운로드|월드 파일은 어떻게 가져오나요?|업적이 비활성화되는 이유|치트를 활성화하거나 크리에이티브 모드로 한 번이라도 플레이하면 Minecraft는 업적을 영구적으로 비활성화합니다. 나중에 치트를 꺼도 복구되지 않습니다. World Rescue는 월드 사본을 수정해 업적이 다시 기록되도록 합니다.|콘솔|월드를 읽고 분석하는 중…|.mcworld 확장자의 파일을 선택하세요.|ZIP 라이브러리를 불러오지 못했습니다. 이 페이지와 필요한 파일을 같은 폴더에 두고 여세요.|.mcworld 루트에서 level.dat을 찾을 수 없습니다. Minecraft에서 월드를 다시 내보내세요.|분석 완료: 안전을 위해 월드를 변경하지 않았습니다.|분석 완료: 수정할 수 있는 설정을 찾았습니다.|분석 완료: 알려진 설정을 찾지 못했습니다.|이 월드를 읽을 수 없습니다.|사본 준비 중…|브라우저에서 새 파일을 만드는 중…|사본이 준비되었습니다. 다운로드해 Minecraft로 가져오세요.|사본이 준비되었습니다. 원본 파일은 교체되지 않았습니다.|수정된 사본 준비 완료|사본을 다시 만들어 보세요|사본을 만들 수 없습니다.|이 월드에는 이 도구로 안전하게 되돌릴 수 없는 상태가 있습니다. 파일은 변경되지 않습니다.|차단됨|수정이 필요한 알려진 항목이 없습니다. 원본 파일은 그대로입니다.|사본에서 수정 가능한 설정을 찾았습니다. 계속하기 전에 항목을 확인하세요.|수정 가능`.split("|"),
    zh: `所有工具|世界修复|在启用作弊或进入创造模式后，恢复基岩版世界的成就资格。手机也能使用。|选择你的世界|导出的 .mcworld 文件。文件不会离开此设备。|浏览文件|正在等待 .mcworld 文件|世界分析|创建修复副本|选择另一个世界|副本已准备好。|下载 .mcworld|如何获取世界文件？|成就为何会关闭|启用作弊或进入创造模式后，即使只发生一次，Minecraft 也会永久关闭该世界的成就。之后关闭作弊无法恢复成就。World Rescue 会修改世界副本，让成就重新计入。|主机|正在读取并分析世界…|请选择扩展名为 .mcworld 的文件。|ZIP 库未加载。请将本页及其配套文件放在同一文件夹中再打开。|在 .mcworld 根目录中找不到 level.dat。请从 Minecraft 重新导出世界。|分析完成：为安全起见，世界未被更改。|分析完成：找到可修复的设置。|分析完成：未找到已知设置。|无法读取此世界。|正在准备副本…|正在浏览器中创建新文件…|副本已准备好。下载后将文件导入 Minecraft。|副本已准备好。原文件未被替换。|修复副本已准备好|请重试创建副本|无法创建副本。|此世界包含此工具无法安全还原的状态。不会修改任何文件。|已阻止|未发现需要修复的已知项目。原文件保持不变。|发现可在副本中修复的设置。继续前请检查这些项目。|可修复`.split("|"),
    ar: `كل الأدوات|استعادة العالم|استعد إنجازات عالم Bedrock بعد تفعيل الغش أو اللعب في الوضع الإبداعي. يعمل على هاتفك.|اختر عالمك|ملف .mcworld الذي صدرته. لا يغادر هذا الجهاز.|استعراض الملفات|بانتظار ملف .mcworld|تحليل العالم|إنشاء نسخة مصححة|اختيار عالم آخر|النسخة جاهزة.|تنزيل .mcworld|كيف أحصل على ملف عالمي؟|لماذا تتوقف الإنجازات|يعطّل Minecraft الإنجازات نهائيًا عند تفعيل الغش أو اللعب في الوضع الإبداعي، ولو مرة واحدة. إيقاف الغش لاحقًا لا يعيدها. يحدّث World Rescue نسخة من العالم لتُحتسب الإنجازات مجددًا.|وحدة تحكم|جارٍ قراءة العالم وتحليله…|اختر ملفًا بامتداد .mcworld.|لم يتم تحميل مكتبة ZIP. افتح هذه الصفحة مع الملفات المرافقة في المجلد نفسه.|لم يتم العثور على level.dat في جذر ملف .mcworld. صدّر العالم مجددًا من Minecraft.|اكتمل التحليل: تُرك العالم دون تغيير حفاظًا على سلامته.|اكتمل التحليل: عُثر على إعدادات قابلة للإصلاح.|اكتمل التحليل: لم يتم العثور على إعدادات معروفة.|تعذرت قراءة هذا العالم.|جارٍ تجهيز النسخة…|جارٍ إنشاء ملف جديد في المتصفح…|النسخة جاهزة. نزّلها واستورد الملف إلى Minecraft.|النسخة جاهزة. لم يتم استبدال الملف الأصلي.|النسخة المصححة جاهزة|حاول إنشاء النسخة مرة أخرى|تعذر إنشاء النسخة.|يحتوي هذا العالم على حالات لا تستطيع الأداة التراجع عنها بأمان. لن يتم تغيير أي ملف.|محظور|لم يتم العثور على مؤشرات معروفة تحتاج إلى إصلاح. بقي الملف الأصلي كما هو.|عُثر على إعدادات يمكن إصلاحها في نسخة. راجع العناصر قبل المتابعة.|قابل للإصلاح`.split("|"),
    hi: `सभी टूल|दुनिया बचाव|चीट चालू करने या क्रिएटिव में खेलने के बाद Bedrock दुनिया की उपलब्धियाँ वापस पाएं। फोन पर भी काम करता है।|अपनी दुनिया चुनें|आपकी निर्यात की गई .mcworld फ़ाइल। यह इस डिवाइस से बाहर नहीं जाती।|फ़ाइलें ब्राउज़ करें|.mcworld फ़ाइल की प्रतीक्षा है|दुनिया का विश्लेषण|सुधारी हुई कॉपी बनाएं|दूसरी दुनिया चुनें|कॉपी तैयार है।|.mcworld डाउनलोड करें|दुनिया की फ़ाइल कैसे पाएं?|उपलब्धियाँ बंद क्यों होती हैं|चीट चालू करने या क्रिएटिव में एक बार भी खेलने पर Minecraft उपलब्धियाँ स्थायी रूप से बंद कर देता है। बाद में चीट बंद करने से वे वापस नहीं आतीं। World Rescue दुनिया की कॉपी में बदलाव करता है ताकि उपलब्धियाँ फिर से गिनी जा सकें।|कंसोल|दुनिया पढ़ी और जाँची जा रही है…|.mcworld एक्सटेंशन वाली फ़ाइल चुनें।|ZIP लाइब्रेरी लोड नहीं हुई। इस पेज को इसकी ज़रूरी फ़ाइलों के साथ उसी फ़ोल्डर में खोलें।|.mcworld के मुख्य फ़ोल्डर में level.dat नहीं मिला। Minecraft से दुनिया फिर से निर्यात करें।|जाँच पूरी: सुरक्षा के लिए दुनिया में बदलाव नहीं किया गया।|जाँच पूरी: सुधारी जा सकने वाली सेटिंग मिलीं।|जाँच पूरी: कोई ज्ञात सेटिंग नहीं मिली।|यह दुनिया पढ़ी नहीं जा सकी।|कॉपी तैयार की जा रही है…|ब्राउज़र में नई फ़ाइल बनाई जा रही है…|कॉपी तैयार है। इसे डाउनलोड करके Minecraft में आयात करें।|कॉपी तैयार है। मूल फ़ाइल बदली नहीं गई।|सुधारी हुई कॉपी तैयार|कॉपी फिर से बनाने की कोशिश करें|कॉपी नहीं बन सकी।|इस दुनिया में ऐसी स्थितियाँ हैं जिन्हें यह टूल सुरक्षित रूप से वापस नहीं कर सकता। कोई फ़ाइल नहीं बदलेगी।|अवरुद्ध|सुधार की ज़रूरत वाला कोई ज्ञात संकेत नहीं मिला। मूल फ़ाइल वैसी ही है।|कॉपी में सुधारी जा सकने वाली सेटिंग मिलीं। आगे बढ़ने से पहले उन्हें देखें।|सुधार योग्य`.split("|"),
    nl: `Alle tools|Wereld herstellen|Herstel prestaties in een Bedrock-wereld nadat cheats zijn ingeschakeld of Creatief is gebruikt. Werkt op je telefoon.|Kies je wereld|Het geëxporteerde .mcworld-bestand. Het verlaat dit apparaat niet.|Bestanden bladeren|Wachten op een .mcworld-bestand|Wereldanalyse|Herstelde kopie maken|Andere wereld kiezen|Kopie klaar.|.mcworld downloaden|Hoe krijg ik mijn wereldbestand?|Waarom prestaties worden uitgeschakeld|Minecraft schakelt prestaties permanent uit als cheats worden ingeschakeld of een wereld in Creatief wordt gespeeld, zelfs één keer. Cheats later uitschakelen herstelt ze niet. World Rescue past een kopie van de wereld aan zodat prestaties weer meetellen.|Console|Wereld wordt gelezen en geanalyseerd…|Kies een bestand met de extensie .mcworld.|De ZIP-bibliotheek is niet geladen. Open deze pagina samen met de bijbehorende bestanden in dezelfde map.|level.dat is niet gevonden in de hoofdmap van de .mcworld. Exporteer de wereld opnieuw vanuit Minecraft.|Analyse voltooid: de wereld is voor de veiligheid ongewijzigd gebleven.|Analyse voltooid: herstelbare instellingen gevonden.|Analyse voltooid: geen bekende instellingen gevonden.|Deze wereld kon niet worden gelezen.|Kopie voorbereiden…|Nieuw bestand maken in de browser…|De kopie is klaar. Download en importeer het bestand in Minecraft.|Kopie klaar. Het originele bestand is niet vervangen.|Herstelde kopie klaar|Probeer de kopie opnieuw te maken|De kopie kon niet worden gemaakt.|Deze wereld bevat toestanden die deze tool niet veilig kan herstellen. Er wordt geen bestand gewijzigd.|Geblokkeerd|Geen bekende aanwijzingen gevonden die herstel nodig hebben. Het originele bestand blijft ongewijzigd.|Instellingen gevonden die in een kopie kunnen worden hersteld. Controleer ze voordat je doorgaat.|Herstelbaar`.split("|"),
    pl: `Wszystkie narzędzia|Ratowanie świata|Przywróć osiągnięcia w świecie Bedrock po włączeniu cheatów lub grze w trybie kreatywnym. Działa na telefonie.|Wybierz swój świat|Wyeksportowany plik .mcworld. Nie opuszcza tego urządzenia.|Przeglądaj pliki|Oczekiwanie na plik .mcworld|Analiza świata|Utwórz naprawioną kopię|Wybierz inny świat|Kopia gotowa.|Pobierz .mcworld|Jak uzyskać plik świata?|Dlaczego osiągnięcia są wyłączane|Minecraft trwale wyłącza osiągnięcia po włączeniu cheatów lub grze w trybie kreatywnym, nawet jeden raz. Późniejsze wyłączenie cheatów ich nie przywróci. World Rescue zmienia kopię świata, aby osiągnięcia znów były naliczane.|Konsola|Odczytywanie i analizowanie świata…|Wybierz plik z rozszerzeniem .mcworld.|Biblioteka ZIP nie została wczytana. Otwórz tę stronę razem z potrzebnymi plikami w tym samym folderze.|Nie znaleziono level.dat w katalogu głównym .mcworld. Ponownie wyeksportuj świat z Minecrafta.|Analiza zakończona: ze względów bezpieczeństwa świat pozostał bez zmian.|Analiza zakończona: znaleziono ustawienia możliwe do naprawy.|Analiza zakończona: nie znaleziono znanych ustawień.|Nie można odczytać tego świata.|Przygotowywanie kopii…|Tworzenie nowego pliku w przeglądarce…|Kopia jest gotowa. Pobierz ją i zaimportuj do Minecrafta.|Kopia gotowa. Oryginalny plik nie został zastąpiony.|Naprawiona kopia gotowa|Spróbuj ponownie utworzyć kopię|Nie udało się utworzyć kopii.|Ten świat zawiera stany, których to narzędzie nie może bezpiecznie cofnąć. Żaden plik nie zostanie zmieniony.|Zablokowane|Nie znaleziono znanych wskaźników wymagających naprawy. Oryginalny plik pozostaje bez zmian.|Znaleziono ustawienia, które można naprawić w kopii. Sprawdź je przed kontynuowaniem.|Można naprawić`.split("|"),
    tr: `Tüm araçlar|Dünya Kurtarma|Hileleri açtıktan veya Yaratıcı modda oynadıktan sonra Bedrock dünyasındaki başarıları geri kazanın. Telefonunuzda çalışır.|Dünyanızı seçin|Dışa aktarılan .mcworld dosyasıdır. Bu cihazdan dışarı çıkmaz.|Dosyalara göz at|.mcworld dosyası bekleniyor|Dünya analizi|Düzeltilmiş kopya oluştur|Başka bir dünya seç|Kopya hazır.|.mcworld indir|Dünya dosyamı nasıl alırım?|Başarılar neden kapanır|Hileler açıldığında veya dünyada Yaratıcı modda bir kez bile oynandığında Minecraft başarıları kalıcı olarak devre dışı bırakır. Hileleri sonradan kapatmak başarıları geri getirmez. World Rescue, başarıların yeniden sayılması için dünyanın bir kopyasını günceller.|Konsol|Dünya okunuyor ve analiz ediliyor…|.mcworld uzantılı bir dosya seçin.|ZIP kitaplığı yüklenmedi. Bu sayfayı gerekli dosyalarla aynı klasörde açın.|.mcworld kök dizininde level.dat bulunamadı. Dünyayı Minecraft içinden yeniden dışa aktarın.|Analiz tamamlandı: güvenlik için dünya değiştirilmeden bırakıldı.|Analiz tamamlandı: düzeltilebilir ayarlar bulundu.|Analiz tamamlandı: bilinen bir ayar bulunmadı.|Bu dünya okunamadı.|Kopya hazırlanıyor…|Tarayıcıda yeni bir dosya oluşturuluyor…|Kopya hazır. İndirip Minecraft'a aktarın.|Kopya hazır. Orijinal dosyanın üzerine yazılmadı.|Düzeltilmiş kopya hazır|Kopyayı yeniden oluşturmayı deneyin|Kopya oluşturulamadı.|Bu dünyada aracın güvenle geri alamayacağı durumlar var. Hiçbir dosya değiştirilmez.|Engellendi|Düzeltilmesi gereken bilinen bir gösterge bulunmadı. Orijinal dosya değişmeden kaldı.|Kopyada düzeltilebilecek ayarlar bulundu. Devam etmeden önce öğeleri inceleyin.|Düzeltilebilir`.split("|")
  };

  const GUIDES = {
    en: `Open Minecraft and tap Play.|Tap the pencil next to the world.|Scroll down and tap Export World.|Choose Save to Files, then return here and select the file.|Open Minecraft and tap Play.|Tap the pencil next to the world.|Scroll down and tap Export World.|Save it to Downloads, then return here and select the file.|Open Minecraft and click Play.|Click the pencil next to the world.|Scroll down and click Export World.|Save the file, then drop it here.|Consoles cannot export worlds directly.|If the world is on a Realm, download it from Realm settings on a phone or PC.|Export it from that device, then bring the .mcworld file here.`,
    es: `Abre Minecraft y pulsa Jugar.|Pulsa el lápiz junto al mundo.|Desplázate hacia abajo y pulsa Exportar mundo.|Elige Guardar en Archivos y vuelve para seleccionar el archivo.|Abre Minecraft y pulsa Jugar.|Pulsa el lápiz junto al mundo.|Desplázate hacia abajo y pulsa Exportar mundo.|Guárdalo en Descargas y vuelve para seleccionar el archivo.|Abre Minecraft y haz clic en Jugar.|Haz clic en el lápiz junto al mundo.|Desplázate hacia abajo y haz clic en Exportar mundo.|Guarda el archivo y arrástralo aquí.|Las consolas no pueden exportar mundos directamente.|Si el mundo está en un Realm, descárgalo desde sus ajustes en un teléfono o PC.|Expórtalo desde ese dispositivo y trae aquí el archivo .mcworld.`,
    fr: `Ouvrez Minecraft et appuyez sur Jouer.|Appuyez sur le crayon à côté du monde.|Faites défiler vers le bas et appuyez sur Exporter le monde.|Choisissez Enregistrer dans Fichiers, puis revenez sélectionner le fichier.|Ouvrez Minecraft et appuyez sur Jouer.|Appuyez sur le crayon à côté du monde.|Faites défiler vers le bas et appuyez sur Exporter le monde.|Enregistrez-le dans Téléchargements, puis revenez sélectionner le fichier.|Ouvrez Minecraft et cliquez sur Jouer.|Cliquez sur le crayon à côté du monde.|Faites défiler vers le bas et cliquez sur Exporter le monde.|Enregistrez le fichier, puis déposez-le ici.|Les consoles ne peuvent pas exporter directement les mondes.|Si le monde est sur un Realm, téléchargez-le depuis ses paramètres sur téléphone ou PC.|Exportez-le depuis cet appareil, puis apportez le fichier .mcworld ici.`,
    de: `Öffne Minecraft und tippe auf Spielen.|Tippe auf den Stift neben der Welt.|Scrolle nach unten und tippe auf Welt exportieren.|Wähle In Dateien sichern und kehre zurück, um die Datei auszuwählen.|Öffne Minecraft und tippe auf Spielen.|Tippe auf den Stift neben der Welt.|Scrolle nach unten und tippe auf Welt exportieren.|Speichere sie unter Downloads und kehre zurück, um die Datei auszuwählen.|Öffne Minecraft und klicke auf Spielen.|Klicke auf den Stift neben der Welt.|Scrolle nach unten und klicke auf Welt exportieren.|Speichere die Datei und ziehe sie hierher.|Konsolen können Welten nicht direkt exportieren.|Lade eine Realm-Welt über die Einstellungen auf einem Handy oder PC herunter.|Exportiere sie dort und bringe die .mcworld-Datei hierher.`,
    it: `Apri Minecraft e tocca Gioca.|Tocca la matita accanto al mondo.|Scorri in basso e tocca Esporta mondo.|Scegli Salva su File, poi torna qui e seleziona il file.|Apri Minecraft e tocca Gioca.|Tocca la matita accanto al mondo.|Scorri in basso e tocca Esporta mondo.|Salvalo in Download, poi torna qui e seleziona il file.|Apri Minecraft e fai clic su Gioca.|Fai clic sulla matita accanto al mondo.|Scorri in basso e fai clic su Esporta mondo.|Salva il file e trascinalo qui.|Le console non possono esportare direttamente i mondi.|Se il mondo è in un Realm, scaricalo dalle impostazioni del Realm su telefono o PC.|Esportalo da quel dispositivo e porta qui il file .mcworld.`,
    pt: `Abra o Minecraft e toque em Jogar.|Toque no lápis ao lado do mundo.|Role até o fim e toque em Exportar mundo.|Escolha Salvar em Arquivos e volte para selecionar o arquivo.|Abra o Minecraft e toque em Jogar.|Toque no lápis ao lado do mundo.|Role até o fim e toque em Exportar mundo.|Salve em Downloads e volte para selecionar o arquivo.|Abra o Minecraft e clique em Jogar.|Clique no lápis ao lado do mundo.|Role até o fim e clique em Exportar mundo.|Salve o arquivo e arraste-o para cá.|Consoles não exportam mundos diretamente.|Se o mundo estiver em um Realm, baixe-o nas configurações do Realm usando um celular ou PC.|Exporte nesse dispositivo e traga o arquivo .mcworld para cá.`,
    ru: `Откройте Minecraft и нажмите «Играть».|Нажмите на карандаш рядом с миром.|Прокрутите вниз и нажмите «Экспорт мира».|Выберите «Сохранить в Файлы», затем вернитесь и выберите файл.|Откройте Minecraft и нажмите «Играть».|Нажмите на карандаш рядом с миром.|Прокрутите вниз и нажмите «Экспорт мира».|Сохраните файл в «Загрузки», затем вернитесь и выберите его.|Откройте Minecraft и нажмите «Играть».|Нажмите на карандаш рядом с миром.|Прокрутите вниз и нажмите «Экспорт мира».|Сохраните файл и перетащите его сюда.|На консолях нельзя напрямую экспортировать миры.|Если мир находится в Realm, скачайте его через настройки Realm на телефоне или ПК.|Экспортируйте его на этом устройстве и перенесите сюда файл .mcworld.`,
    ja: `Minecraft を開き、「プレイ」をタップします。|ワールドの横にある鉛筆をタップします。|下までスクロールして「ワールドをエクスポート」をタップします。|「ファイルに保存」を選び、戻ってファイルを選択します。|Minecraft を開き、「プレイ」をタップします。|ワールドの横にある鉛筆をタップします。|下までスクロールして「ワールドをエクスポート」をタップします。|ダウンロードに保存し、戻ってファイルを選択します。|Minecraft を開き、「プレイ」をクリックします。|ワールドの横にある鉛筆をクリックします。|下までスクロールして「ワールドをエクスポート」をクリックします。|ファイルを保存し、ここにドロップします。|コンソールからワールドを直接エクスポートすることはできません。|Realm のワールドは、スマートフォンまたは PC の Realm 設定からダウンロードします。|その端末からエクスポートし、.mcworld ファイルをここに移します。`,
    ko: `Minecraft를 열고 플레이를 누르세요.|월드 옆의 연필을 누르세요.|아래로 내려 월드 내보내기를 누르세요.|파일에 저장을 선택한 다음 돌아와 파일을 선택하세요.|Minecraft를 열고 플레이를 누르세요.|월드 옆의 연필을 누르세요.|아래로 내려 월드 내보내기를 누르세요.|다운로드에 저장한 다음 돌아와 파일을 선택하세요.|Minecraft를 열고 플레이를 클릭하세요.|월드 옆의 연필을 클릭하세요.|아래로 내려 월드 내보내기를 클릭하세요.|파일을 저장한 뒤 여기로 끌어오세요.|콘솔에서는 월드를 직접 내보낼 수 없습니다.|Realm 월드라면 휴대폰이나 PC의 Realm 설정에서 다운로드하세요.|해당 기기에서 내보낸 후 .mcworld 파일을 여기로 가져오세요.`,
    zh: `打开 Minecraft 并点击“游戏”。|点击世界旁边的铅笔图标。|向下滚动并点击“导出世界”。|选择“存储到文件”，然后返回并选择该文件。|打开 Minecraft 并点击“游戏”。|点击世界旁边的铅笔图标。|向下滚动并点击“导出世界”。|将文件保存到“下载”，然后返回并选择它。|打开 Minecraft 并点击“游戏”。|点击世界旁边的铅笔图标。|向下滚动并点击“导出世界”。|保存文件，然后将它拖到这里。|主机无法直接导出世界。|如果世界位于 Realm，请在手机或电脑上的 Realm 设置中下载。|在该设备上导出，然后将 .mcworld 文件传到这里。`,
    ar: `افتح Minecraft واضغط على «العب».|اضغط على القلم بجانب العالم.|مرر إلى الأسفل واضغط على «تصدير العالم».|اختر «حفظ في الملفات»، ثم ارجع واختر الملف.|افتح Minecraft واضغط على «العب».|اضغط على القلم بجانب العالم.|مرر إلى الأسفل واضغط على «تصدير العالم».|احفظه في التنزيلات، ثم ارجع واختر الملف.|افتح Minecraft واضغط على «العب».|اضغط على القلم بجانب العالم.|مرر إلى الأسفل واضغط على «تصدير العالم».|احفظ الملف ثم اسحبه إلى هنا.|لا يمكن لوحدات التحكم تصدير العوالم مباشرة.|إذا كان العالم في Realm، فنزّله من إعدادات Realm على هاتف أو حاسوب.|صدّره من ذلك الجهاز ثم أحضر ملف .mcworld إلى هنا.`,
    hi: `Minecraft खोलें और खेलें पर टैप करें।|दुनिया के पास पेंसिल पर टैप करें।|नीचे स्क्रॉल करके दुनिया निर्यात करें पर टैप करें।|फ़ाइलों में सहेजें चुनें, फिर लौटकर फ़ाइल चुनें।|Minecraft खोलें और खेलें पर टैप करें।|दुनिया के पास पेंसिल पर टैप करें।|नीचे स्क्रॉल करके दुनिया निर्यात करें पर टैप करें।|इसे डाउनलोड में सहेजें, फिर लौटकर फ़ाइल चुनें।|Minecraft खोलें और खेलें पर क्लिक करें।|दुनिया के पास पेंसिल पर क्लिक करें।|नीचे स्क्रॉल करके दुनिया निर्यात करें पर क्लिक करें।|फ़ाइल सहेजें और उसे यहाँ छोड़ें।|कंसोल से दुनिया सीधे निर्यात नहीं की जा सकती।|यदि दुनिया Realm में है, तो फोन या PC पर Realm सेटिंग से डाउनलोड करें।|उस डिवाइस से निर्यात करके .mcworld फ़ाइल यहाँ लाएँ।`,
    nl: `Open Minecraft en tik op Spelen.|Tik op het potlood naast de wereld.|Scroll omlaag en tik op Wereld exporteren.|Kies Bewaar in Bestanden, ga terug en selecteer het bestand.|Open Minecraft en tik op Spelen.|Tik op het potlood naast de wereld.|Scroll omlaag en tik op Wereld exporteren.|Sla het op in Downloads, ga terug en selecteer het bestand.|Open Minecraft en klik op Spelen.|Klik op het potlood naast de wereld.|Scroll omlaag en klik op Wereld exporteren.|Sla het bestand op en sleep het hierheen.|Consoles kunnen werelden niet rechtstreeks exporteren.|Staat de wereld op een Realm? Download hem via de Realm-instellingen op een telefoon of pc.|Exporteer hem daar en zet het .mcworld-bestand hier neer.`,
    pl: `Otwórz Minecraft i dotknij Graj.|Dotknij ołówka obok świata.|Przewiń w dół i dotknij Eksportuj świat.|Wybierz Zapisz w Plikach, wróć i wskaż plik.|Otwórz Minecraft i dotknij Graj.|Dotknij ołówka obok świata.|Przewiń w dół i dotknij Eksportuj świat.|Zapisz w Pobranych, wróć i wskaż plik.|Otwórz Minecraft i kliknij Graj.|Kliknij ołówek obok świata.|Przewiń w dół i kliknij Eksportuj świat.|Zapisz plik i przeciągnij go tutaj.|Konsole nie mogą bezpośrednio eksportować światów.|Jeśli świat jest w Realm, pobierz go w ustawieniach Realm na telefonie lub komputerze.|Wyeksportuj go na tym urządzeniu i przenieś tutaj plik .mcworld.`,
    tr: `Minecraft'i açın ve Oyna'ya dokunun.|Dünyanın yanındaki kaleme dokunun.|Aşağı kaydırıp Dünyayı Dışa Aktar'a dokunun.|Dosyalara Kaydet'i seçin, sonra geri dönüp dosyayı seçin.|Minecraft'i açın ve Oyna'ya dokunun.|Dünyanın yanındaki kaleme dokunun.|Aşağı kaydırıp Dünyayı Dışa Aktar'a dokunun.|İndirilenler'e kaydedin, sonra geri dönüp dosyayı seçin.|Minecraft'i açın ve Oyna'ya tıklayın.|Dünyanın yanındaki kaleme tıklayın.|Aşağı kaydırıp Dünyayı Dışa Aktar'a tıklayın.|Dosyayı kaydedip buraya sürükleyin.|Konsollar dünyaları doğrudan dışa aktaramaz.|Dünya Realm'deyse telefon veya bilgisayardan Realm ayarlarıyla indirin.|O cihazdan dışa aktarın ve .mcworld dosyasını buraya getirin.`
  };

  const LANGUAGE_BUTTON = {
    en: "Change language", es: "Cambiar idioma", fr: "Changer de langue", de: "Sprache ändern",
    it: "Cambia lingua", pt: "Alterar idioma", ru: "Сменить язык", ja: "言語を変更",
    ko: "언어 변경", zh: "切换语言", ar: "تغيير اللغة", hi: "भाषा बदलें",
    nl: "Taal wijzigen", pl: "Zmień język", tr: "Dili değiştir"
  };
  const ACCESSIBILITY = {
    en: ["Switch to light mode", "Switch to dark mode", "Open the AI assistant"],
    es: ["Activar modo claro", "Activar modo oscuro", "Abrir el asistente de IA"],
    fr: ["Activer le mode clair", "Activer le mode sombre", "Ouvrir l’assistant IA"],
    de: ["Hellen Modus aktivieren", "Dunklen Modus aktivieren", "KI-Assistent öffnen"],
    it: ["Attiva la modalità chiara", "Attiva la modalità scura", "Apri l’assistente IA"],
    pt: ["Ativar modo claro", "Ativar modo escuro", "Abrir assistente de IA"],
    ru: ["Включить светлую тему", "Включить тёмную тему", "Открыть ИИ-помощника"],
    ja: ["ライトモードに切り替え", "ダークモードに切り替え", "AI アシスタントを開く"],
    ko: ["라이트 모드로 전환", "다크 모드로 전환", "AI 도우미 열기"],
    zh: ["切换到浅色模式", "切换到深色模式", "打开 AI 助手"],
    ar: ["التبديل إلى الوضع الفاتح", "التبديل إلى الوضع الداكن", "فتح مساعد الذكاء الاصطناعي"],
    hi: ["लाइट मोड चालू करें", "डार्क मोड चालू करें", "AI सहायक खोलें"],
    nl: ["Lichte modus inschakelen", "Donkere modus inschakelen", "AI-assistent openen"],
    pl: ["Włącz jasny motyw", "Włącz ciemny motyw", "Otwórz asystenta AI"],
    tr: ["Açık modu etkinleştir", "Koyu modu etkinleştir", "Yapay zekâ yardımcısını aç"]
  };
  const DOCUMENT_TITLES = {
    en: "Guizz Worlds — World Rescue — Minecraft Bedrock achievement recovery", es: "Guizz Worlds — World Rescue — Recuperación de logros de Minecraft Bedrock",
    fr: "Guizz Worlds — World Rescue — Récupération des succès Minecraft Bedrock", de: "Guizz Worlds — World Rescue — Minecraft-Bedrock-Erfolge wiederherstellen",
    it: "Guizz Worlds — World Rescue — Recupero obiettivi Minecraft Bedrock", pt: "Guizz Worlds — World Rescue — Recuperação de conquistas do Minecraft Bedrock",
    ru: "Guizz Worlds — World Rescue — восстановление достижений Minecraft Bedrock", ja: "Guizz Worlds — World Rescue — Minecraft Bedrock の実績を復旧",
    ko: "Guizz Worlds — World Rescue — Minecraft Bedrock 업적 복구", zh: "Guizz Worlds — World Rescue — Minecraft 基岩版成就恢复",
    ar: "Guizz Worlds — World Rescue — استعادة إنجازات Minecraft Bedrock", hi: "Guizz Worlds — World Rescue — Minecraft Bedrock उपलब्धियाँ वापस पाएं",
    nl: "Guizz Worlds — World Rescue — Minecraft Bedrock-prestaties herstellen", pl: "Guizz Worlds — World Rescue — odzyskiwanie osiągnięć Minecraft Bedrock",
    tr: "Guizz Worlds — World Rescue — Minecraft Bedrock başarılarını kurtarma"
  };
  const HOME_LABELS = {
    en: "Guizz Worlds home", es: "Inicio de Guizz Worlds", fr: "Accueil de Guizz Worlds", de: "Guizz Worlds-Startseite",
    it: "Home di Guizz Worlds", pt: "Página inicial de Guizz Worlds", ru: "Главная Guizz Worlds", ja: "Guizz Worlds ホーム",
    ko: "Guizz Worlds 홈", zh: "Guizz Worlds 首页", ar: "صفحة Guizz Worlds الرئيسية", hi: "Guizz Worlds होम",
    nl: "Guizz Worlds-startpagina", pl: "Strona główna Guizz Worlds", tr: "Guizz Worlds ana sayfası"
  };
  const NOTIFICATION_LABELS = {
    en: "Notifications alt+T", es: "Notificaciones alt+T", fr: "Notifications alt+T", de: "Benachrichtigungen Alt+T",
    it: "Notifiche Alt+T", pt: "Notificações Alt+T", ru: "Уведомления Alt+T", ja: "通知 Alt+T",
    ko: "알림 Alt+T", zh: "通知 Alt+T", ar: "الإشعارات Alt+T", hi: "सूचनाएं Alt+T",
    nl: "Meldingen Alt+T", pl: "Powiadomienia Alt+T", tr: "Bildirimler Alt+T"
  };
  const CTA_COPY = {
    en: ["Start creating", "Create"], es: ["Empezar a crear", "Crear"], fr: ["Commencer", "Créer"],
    de: ["Jetzt erstellen", "Erstellen"], it: ["Inizia a creare", "Crea"], pt: ["Começar a criar", "Criar"],
    ru: ["Начать создание", "Создать"], ja: ["作成を始める", "作成"], ko: ["만들기 시작", "만들기"],
    zh: ["开始创建", "创建"], ar: ["ابدأ الإنشاء", "إنشاء"], hi: ["बनाना शुरू करें", "बनाएं"],
    nl: ["Begin met maken", "Maken"], pl: ["Zacznij tworzyć", "Utwórz"], tr: ["Oluşturmaya başla", "Oluştur"]
  };

  const PROPERTIES = {
    en: { commandsEnabled: "Commands enabled", cheatsEnabled: "Cheats enabled", hasBeenLoadedInCreative: "World was loaded in Creative", GameType: "Saved game mode is Creative or Spectator", achievementsDisabled: "Achievements disabled flag", disableAchievements: "Achievement lock flag", indicator: "Indicator" },
    es: { commandsEnabled: "Comandos activados", cheatsEnabled: "Trucos activados", hasBeenLoadedInCreative: "Mundo abierto en Creativo", GameType: "Modo guardado como Creativo o Espectador", achievementsDisabled: "Indicador de logros desactivados", disableAchievements: "Indicador de bloqueo de logros", indicator: "Indicador" },
    fr: { commandsEnabled: "Commandes activées", cheatsEnabled: "Commandes de triche activées", hasBeenLoadedInCreative: "Monde ouvert en Créatif", GameType: "Mode enregistré en Créatif ou Spectateur", achievementsDisabled: "Indicateur de succès désactivés", disableAchievements: "Indicateur de blocage des succès", indicator: "Indicateur" },
    de: { commandsEnabled: "Befehle aktiviert", cheatsEnabled: "Cheats aktiviert", hasBeenLoadedInCreative: "Welt im Kreativmodus geladen", GameType: "Spielmodus als Kreativ oder Zuschauer gespeichert", achievementsDisabled: "Erfolgsdeaktivierung markiert", disableAchievements: "Erfolgssperre markiert", indicator: "Hinweis" },
    it: { commandsEnabled: "Comandi attivati", cheatsEnabled: "Trucchi attivati", hasBeenLoadedInCreative: "Mondo aperto in Creativa", GameType: "Modalità salvata come Creativa o Spettatore", achievementsDisabled: "Indicatore obiettivi disattivati", disableAchievements: "Indicatore blocco obiettivi", indicator: "Indicatore" },
    pt: { commandsEnabled: "Comandos ativados", cheatsEnabled: "Trapaças ativadas", hasBeenLoadedInCreative: "Mundo já aberto no modo Criativo", GameType: "Modo de jogo salvo como Criativo ou Espectador", achievementsDisabled: "Indicador de conquistas desativadas", disableAchievements: "Indicador de bloqueio de conquistas", indicator: "Indicador" },
    ru: { commandsEnabled: "Команды включены", cheatsEnabled: "Читы включены", hasBeenLoadedInCreative: "Мир открыт в творческом режиме", GameType: "Сохранённый режим: творческий или наблюдатель", achievementsDisabled: "Флаг отключённых достижений", disableAchievements: "Флаг блокировки достижений", indicator: "Индикатор" },
    ja: { commandsEnabled: "コマンドが有効", cheatsEnabled: "チートが有効", hasBeenLoadedInCreative: "クリエイティブでワールドを開いた履歴", GameType: "保存モードがクリエイティブまたはスペクテイター", achievementsDisabled: "実績無効フラグ", disableAchievements: "実績ロックフラグ", indicator: "項目" },
    ko: { commandsEnabled: "명령 사용", cheatsEnabled: "치트 사용", hasBeenLoadedInCreative: "크리에이티브에서 월드를 연 기록", GameType: "저장된 게임 모드가 크리에이티브 또는 관전자", achievementsDisabled: "업적 비활성화 표시", disableAchievements: "업적 잠금 표시", indicator: "표시 항목" },
    zh: { commandsEnabled: "已启用命令", cheatsEnabled: "已启用作弊", hasBeenLoadedInCreative: "世界曾在创造模式中打开", GameType: "保存的模式为创造或旁观者", achievementsDisabled: "成就已关闭标记", disableAchievements: "成就锁定标记", indicator: "指标" },
    ar: { commandsEnabled: "الأوامر مفعّلة", cheatsEnabled: "الغش مفعّل", hasBeenLoadedInCreative: "سبق فتح العالم في الوضع الإبداعي", GameType: "وضع اللعب المحفوظ إبداعي أو متفرج", achievementsDisabled: "مؤشر تعطيل الإنجازات", disableAchievements: "مؤشر قفل الإنجازات", indicator: "مؤشر" },
    hi: { commandsEnabled: "कमांड चालू", cheatsEnabled: "चीट चालू", hasBeenLoadedInCreative: "दुनिया क्रिएटिव में खोली गई", GameType: "सहेजा गया मोड क्रिएटिव या दर्शक है", achievementsDisabled: "उपलब्धियाँ बंद होने का संकेत", disableAchievements: "उपलब्धि लॉक का संकेत", indicator: "संकेत" },
    nl: { commandsEnabled: "Opdrachten ingeschakeld", cheatsEnabled: "Cheats ingeschakeld", hasBeenLoadedInCreative: "Wereld geopend in Creatief", GameType: "Spelmodus opgeslagen als Creatief of Toeschouwer", achievementsDisabled: "Markering prestaties uitgeschakeld", disableAchievements: "Markering prestatieblokkering", indicator: "Aanwijzing" },
    pl: { commandsEnabled: "Polecenia włączone", cheatsEnabled: "Cheaty włączone", hasBeenLoadedInCreative: "Świat otwarto w trybie kreatywnym", GameType: "Zapisany tryb: kreatywny lub widz", achievementsDisabled: "Wskaźnik wyłączonych osiągnięć", disableAchievements: "Wskaźnik blokady osiągnięć", indicator: "Wskaźnik" },
    tr: { commandsEnabled: "Komutlar açık", cheatsEnabled: "Hileler açık", hasBeenLoadedInCreative: "Dünya Yaratıcı modda açılmış", GameType: "Kaydedilen oyun modu Yaratıcı veya İzleyici", achievementsDisabled: "Başarılar devre dışı göstergesi", disableAchievements: "Başarı kilidi göstergesi", indicator: "Gösterge" }
  };

  const BLOCKERS = {
    en: { locked: "Locked template or pack: ", experiments: "The world records that experiments have been used", experimental: "Experimental features are enabled" },
    es: { locked: "Plantilla o paquete bloqueado: ", experiments: "El mundo registra que se usaron experimentos", experimental: "Hay funciones experimentales activadas" },
    fr: { locked: "Modèle ou pack verrouillé : ", experiments: "Le monde indique que des expériences ont été utilisées", experimental: "Des fonctionnalités expérimentales sont activées" },
    de: { locked: "Gesperrte Vorlage oder Pack: ", experiments: "Die Welt speichert, dass Experimente verwendet wurden", experimental: "Experimentelle Funktionen sind aktiviert" },
    it: { locked: "Modello o pacchetto bloccato: ", experiments: "Il mondo registra che sono stati usati esperimenti", experimental: "Sono attive funzioni sperimentali" },
    pt: { locked: "Template ou pacote bloqueado: ", experiments: "O mundo registra experimentos já utilizados", experimental: "Há recursos experimentais ativados" },
    ru: { locked: "Заблокированный шаблон или набор: ", experiments: "В мире записано использование экспериментов", experimental: "Включены экспериментальные функции" },
    ja: { locked: "ロックされたテンプレートまたはパック：", experiments: "ワールドに実験機能の使用履歴があります", experimental: "実験的な機能が有効です" },
    ko: { locked: "잠긴 템플릿 또는 팩: ", experiments: "월드에 실험 기능 사용 기록이 있습니다", experimental: "실험 기능이 활성화되어 있습니다" },
    zh: { locked: "已锁定的模板或包：", experiments: "世界记录显示曾使用实验功能", experimental: "已启用实验性功能" },
    ar: { locked: "قالب أو حزمة مقفلة: ", experiments: "يسجل العالم استخدام الميزات التجريبية", experimental: "الميزات التجريبية مفعّلة" },
    hi: { locked: "लॉक किया गया टेम्पलेट या पैक: ", experiments: "दुनिया में प्रयोगों के उपयोग का रिकॉर्ड है", experimental: "प्रयोगात्मक सुविधाएँ चालू हैं" },
    nl: { locked: "Vergrendelde sjabloon of pack: ", experiments: "De wereld registreert dat experimenten zijn gebruikt", experimental: "Experimentele functies zijn ingeschakeld" },
    pl: { locked: "Zablokowany szablon lub pakiet: ", experiments: "Świat zapisuje użycie funkcji eksperymentalnych", experimental: "Funkcje eksperymentalne są włączone" },
    tr: { locked: "Kilitli şablon veya paket: ", experiments: "Dünya deneylerin kullanıldığını kaydediyor", experimental: "Deneysel özellikler etkin" }
  };

  const ERRORS = {
    en: ["The level.dat file is too small.", "The level.dat header is invalid or incomplete.", "The NBT data is truncated or has an invalid length.", "The NBT data contains an invalid array size.", "The NBT data exceeds the supported nesting depth.", "The NBT list has an invalid size.", "The file contains an unrecognized NBT type.", "The NBT data contains too many tags.", "The level.dat root is not an NBT compound.", "An NBT name exceeds the allowed limit.", "Could not save an unknown NBT type."],
    es: ["El archivo level.dat es demasiado pequeño.", "El encabezado de level.dat no es válido o está incompleto.", "Los datos NBT están truncados o tienen una longitud no válida.", "Los datos NBT contienen un tamaño de matriz no válido.", "Los datos NBT superan la profundidad admitida.", "La lista NBT tiene un tamaño no válido.", "El archivo contiene un tipo NBT desconocido.", "Los datos NBT contienen demasiadas etiquetas.", "La raíz de level.dat no es un compuesto NBT.", "Un nombre NBT supera el límite permitido.", "No se pudo guardar un tipo NBT desconocido."],
    fr: ["Le fichier level.dat est trop petit.", "L’en-tête de level.dat est invalide ou incomplet.", "Les données NBT sont tronquées ou leur longueur est invalide.", "Les données NBT contiennent une taille de tableau invalide.", "Les données NBT dépassent la profondeur prise en charge.", "La liste NBT a une taille invalide.", "Le fichier contient un type NBT non reconnu.", "Les données NBT contiennent trop de balises.", "La racine de level.dat n’est pas un composé NBT.", "Un nom NBT dépasse la limite autorisée.", "Impossible d’enregistrer un type NBT inconnu."],
    de: ["Die level.dat-Datei ist zu klein.", "Der level.dat-Header ist ungültig oder unvollständig.", "Die NBT-Daten sind abgeschnitten oder haben eine ungültige Länge.", "Die NBT-Daten enthalten eine ungültige Array-Größe.", "Die NBT-Daten überschreiten die unterstützte Verschachtelungstiefe.", "Die NBT-Liste hat eine ungültige Größe.", "Die Datei enthält einen unbekannten NBT-Typ.", "Die NBT-Daten enthalten zu viele Tags.", "Die level.dat-Wurzel ist kein NBT-Compound.", "Ein NBT-Name überschreitet die zulässige Länge.", "Ein unbekannter NBT-Typ konnte nicht gespeichert werden."],
    it: ["Il file level.dat è troppo piccolo.", "L’intestazione di level.dat non è valida o è incompleta.", "I dati NBT sono troncati o hanno una lunghezza non valida.", "I dati NBT contengono una dimensione di array non valida.", "I dati NBT superano la profondità supportata.", "La lista NBT ha una dimensione non valida.", "Il file contiene un tipo NBT non riconosciuto.", "I dati NBT contengono troppi tag.", "La radice di level.dat non è un compound NBT.", "Un nome NBT supera il limite consentito.", "Impossibile salvare un tipo NBT sconosciuto."],
    pt: ["O arquivo level.dat é pequeno demais.", "O cabeçalho do level.dat é inválido ou incompleto.", "O NBT está truncado ou contém um tamanho inválido.", "O NBT contém um array com tamanho inválido.", "O NBT excede a profundidade suportada.", "A lista NBT contém um tamanho inválido.", "O arquivo usa um tipo NBT não reconhecido.", "O NBT contém tags demais.", "A raiz do level.dat não é um compound NBT.", "Um nome NBT ultrapassa o limite permitido.", "Não foi possível salvar um tipo NBT desconhecido."],
    ru: ["Файл level.dat слишком мал.", "Заголовок level.dat недействителен или неполон.", "Данные NBT усечены или имеют недопустимую длину.", "Данные NBT содержат массив недопустимого размера.", "Данные NBT превышают допустимую глубину вложенности.", "Список NBT имеет недопустимый размер.", "Файл содержит неизвестный тип NBT.", "Данные NBT содержат слишком много тегов.", "Корень level.dat не является составным тегом NBT.", "Имя NBT превышает допустимый размер.", "Не удалось сохранить неизвестный тип NBT."],
    ja: ["level.dat ファイルが小さすぎます。", "level.dat のヘッダーが無効または不完全です。", "NBT データが途中で切れているか、長さが無効です。", "NBT データの配列サイズが無効です。", "NBT データの入れ子が対応上限を超えています。", "NBT リストのサイズが無効です。", "ファイルに認識できない NBT 型があります。", "NBT データのタグ数が多すぎます。", "level.dat のルートが NBT compound ではありません。", "NBT 名が許可された長さを超えています。", "不明な NBT 型を保存できませんでした。"],
    ko: ["level.dat 파일이 너무 작습니다.", "level.dat 헤더가 잘못되었거나 불완전합니다.", "NBT 데이터가 잘렸거나 길이가 잘못되었습니다.", "NBT 데이터에 잘못된 배열 크기가 있습니다.", "NBT 데이터의 중첩 깊이가 지원 한도를 초과했습니다.", "NBT 목록 크기가 잘못되었습니다.", "파일에 인식할 수 없는 NBT 형식이 있습니다.", "NBT 데이터에 태그가 너무 많습니다.", "level.dat 루트가 NBT 컴파운드가 아닙니다.", "NBT 이름이 허용 길이를 초과했습니다.", "알 수 없는 NBT 형식을 저장할 수 없습니다."],
    zh: ["level.dat 文件太小。", "level.dat 标头无效或不完整。", "NBT 数据已截断或长度无效。", "NBT 数据包含无效的数组大小。", "NBT 数据超过支持的嵌套深度。", "NBT 列表大小无效。", "文件包含无法识别的 NBT 类型。", "NBT 数据包含过多标签。", "level.dat 根节点不是 NBT 复合标签。", "NBT 名称超过允许长度。", "无法保存未知的 NBT 类型。"],
    ar: ["ملف level.dat صغير جدًا.", "ترويسة level.dat غير صالحة أو غير مكتملة.", "بيانات NBT مبتورة أو ذات طول غير صالح.", "تحتوي بيانات NBT على حجم مصفوفة غير صالح.", "تجاوزت بيانات NBT عمق التداخل المدعوم.", "حجم قائمة NBT غير صالح.", "يحتوي الملف على نوع NBT غير معروف.", "تحتوي بيانات NBT على عدد كبير جدًا من العلامات.", "جذر level.dat ليس مركب NBT.", "يتجاوز اسم NBT الحد المسموح.", "تعذر حفظ نوع NBT غير معروف."],
    hi: ["level.dat फ़ाइल बहुत छोटी है।", "level.dat हेडर अमान्य या अधूरा है।", "NBT डेटा अधूरा है या उसकी लंबाई अमान्य है।", "NBT डेटा में अमान्य ऐरे आकार है।", "NBT डेटा समर्थित नेस्टिंग सीमा से अधिक है।", "NBT सूची का आकार अमान्य है।", "फ़ाइल में अपरिचित NBT प्रकार है।", "NBT डेटा में बहुत अधिक टैग हैं।", "level.dat का रूट NBT कंपाउंड नहीं है।", "NBT नाम अनुमत सीमा से लंबा है।", "अज्ञात NBT प्रकार सहेजा नहीं जा सका।"],
    nl: ["Het level.dat-bestand is te klein.", "De level.dat-header is ongeldig of onvolledig.", "De NBT-gegevens zijn afgekapt of hebben een ongeldige lengte.", "De NBT-gegevens bevatten een ongeldige arraygrootte.", "De NBT-gegevens overschrijden de ondersteunde nestingdiepte.", "De NBT-lijst heeft een ongeldige grootte.", "Het bestand bevat een onbekend NBT-type.", "De NBT-gegevens bevatten te veel tags.", "De level.dat-hoofdstructuur is geen NBT-compound.", "Een NBT-naam overschrijdt de toegestane lengte.", "Een onbekend NBT-type kon niet worden opgeslagen."],
    pl: ["Plik level.dat jest zbyt mały.", "Nagłówek level.dat jest nieprawidłowy lub niekompletny.", "Dane NBT są ucięte lub mają nieprawidłową długość.", "Dane NBT zawierają tablicę o nieprawidłowym rozmiarze.", "Dane NBT przekraczają obsługiwaną głębokość zagnieżdżenia.", "Lista NBT ma nieprawidłowy rozmiar.", "Plik zawiera nierozpoznany typ NBT.", "Dane NBT zawierają zbyt wiele znaczników.", "Korzeń level.dat nie jest obiektem NBT.", "Nazwa NBT przekracza dozwolony limit.", "Nie można zapisać nieznanego typu NBT."],
    tr: ["level.dat dosyası çok küçük.", "level.dat başlığı geçersiz veya eksik.", "NBT verisi kesilmiş ya da uzunluğu geçersiz.", "NBT verisinde geçersiz bir dizi boyutu var.", "NBT verisi desteklenen iç içe geçme derinliğini aşıyor.", "NBT listesi boyutu geçersiz.", "Dosyada tanınmayan bir NBT türü var.", "NBT verisinde çok fazla etiket var.", "level.dat kökü bir NBT bileşiği değil.", "Bir NBT adı izin verilen uzunluğu aşıyor.", "Bilinmeyen bir NBT türü kaydedilemedi."]
  };

  let language = "pt";
  try {
    const saved = localStorage.getItem("preferred-language");
    if (COPY[saved]) language = saved;
  } catch (_) {}

  function t(key) {
    const index = KEYS.indexOf(key);
    if (index < 0) return key;
    const selected = COPY[language] || COPY.en;
    return selected[index] || COPY.en[index] || key;
  }

  function guide(index) {
    const all = (GUIDES[language] || GUIDES.en).split("|");
    const ranges = [[0, 4], [4, 8], [8, 12], [12, 15]];
    const range = ranges[index] || ranges[0];
    return all.slice(range[0], range[1]);
  }

  const fileInput = document.getElementById("world-file");
  const dropzone = document.getElementById("dropzone");
  if (fileInput && dropzone) {
    fileInput.accept = ".mcworld,application/zip";
    dropzone.addEventListener("click", function (event) {
      if (event.target !== fileInput && !event.target.closest("a, button")) fileInput.click();
    });
    dropzone.addEventListener("keydown", function (event) {
      if ((event.key === "Enter" || event.key === " ") && event.target === dropzone) {
        event.preventDefault();
        fileInput.click();
      }
    });
  }

  const tabButtons = Array.from(document.querySelectorAll(".tl-tabs .tool-tab"));
  const stepList = document.querySelector(".tl-tabpanel .tl-steps");
  function selectGuide(index) {
    tabButtons.forEach(function (tab, tabIndex) {
      const selected = tabIndex === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.setAttribute("data-active", String(selected));
    });
    if (!stepList) return;
    stepList.replaceChildren.apply(stepList, guide(index).map(function (text, stepIndex) {
      const item = document.createElement("li");
      const number = document.createElement("span");
      number.className = "step-dot";
      number.textContent = String(stepIndex + 1);
      const copy = document.createElement("span");
      copy.textContent = text;
      item.append(number, copy);
      return item;
    }));
  }

  tabButtons.forEach(function (button, index) {
    button.addEventListener("click", function () { selectGuide(index); });
    button.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + delta + tabButtons.length) % tabButtons.length;
      tabButtons[nextIndex].focus();
      selectGuide(nextIndex);
    });
  });

  const languageButton = document.querySelector('button[aria-label="Change language"]');
  let languageMenu = null;
  const menuButton = document.querySelector('button[aria-label="Menu"]');
  const notificationRegion = document.querySelector('section[aria-label^="Notifications"]');
  function closeLanguageMenu(returnFocus) {
    if (!languageMenu) return;
    languageMenu.hidden = true;
    languageButton.setAttribute("aria-expanded", "false");
    languageButton.setAttribute("data-state", "closed");
    if (returnFocus) languageButton.focus();
  }

  function applyLanguage() {
    const current = COPY[language] || COPY.en;
    const socialCopy = SOCIAL_COPY[language] || SOCIAL_COPY.en;
    const siteSectionCopy = SITE_SECTION_COPY[language] || SITE_SECTION_COPY.en;
    const socialLinkLabels = SOCIAL_LINK_LABELS[language] || SOCIAL_LINK_LABELS.en;
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = DOCUMENT_TITLES[language] || DOCUMENT_TITLES.en;
    const localizedDescription = t("subtitle") + " " + t("uploadHelp");
    [
      ['meta[name="description"]', localizedDescription],
      ['meta[property="og:title"]', document.title],
      ['meta[property="og:description"]', localizedDescription],
      ['meta[name="twitter:title"]', document.title],
      ['meta[name="twitter:description"]', localizedDescription]
    ].forEach(function (entry) {
      const meta = document.querySelector(entry[0]);
      if (meta) meta.setAttribute("content", entry[1]);
    });
    const homeLink = document.querySelector(".nav-logo");
    if (homeLink) homeLink.setAttribute("aria-label", HOME_LABELS[language] || HOME_LABELS.en);
    if (notificationRegion) notificationRegion.setAttribute("aria-label", NOTIFICATION_LABELS[language] || NOTIFICATION_LABELS.en);
    if (menuButton) menuButton.setAttribute("aria-label", MENU_BUTTON_LABELS[language] || MENU_BUTTON_LABELS.en);

    const text = function (selector, key) {
      const element = document.querySelector(selector);
      if (element) element.textContent = t(key);
    };
    text("main[data-tools-column=\"true\"] .tl-head > a.tl-mcbtn", "allTools");
    text(".tl-title", "title");
    text(".tl-sub", "subtitle");
    text(".drop-zone__title", "choose");
    text(".drop-zone__subtitle", "uploadHelp");
    text(".drop-zone__browse", "browse");
    text("#status", "waiting");
    text("#recovery-report-title", "reportTitle");
    text("#fix-button", "fix");
    text("#reset-button", "reset");
    text("#download-message", "copyReady");
    text("#download-link", "download");
    const socialTitle = document.getElementById("social-title");
    const socialDescription = document.getElementById("social-description");
    const socialEyebrow = document.querySelector(".guizz-social-eyebrow");
    if (socialTitle) socialTitle.textContent = socialCopy[0];
    if (socialDescription) socialDescription.textContent = socialCopy[1];
    if (socialEyebrow) socialEyebrow.textContent = SOCIAL_EYEBROW_COPY[language] || SOCIAL_EYEBROW_COPY.en;
    [".social-tiktok", ".social-discord", ".social-youtube"].forEach(function (selector, index) {
      const link = document.querySelector(selector);
      if (link) link.setAttribute("aria-label", socialLinkLabels[index] || SOCIAL_LINK_LABELS.en[index]);
    });
    const sitesTitle = document.getElementById("social-sites-title");
    const holoprintCover = document.getElementById("holoprint-cover");
    const texturesCover = document.getElementById("textures-cover");
    if (sitesTitle) sitesTitle.textContent = siteSectionCopy[0];
    if (holoprintCover) holoprintCover.alt = siteSectionCopy[1];
    if (texturesCover) texturesCover.alt = siteSectionCopy[2];
    const guideSection = document.querySelector(".tl-tabs")?.closest("section");
    const guideHeading = guideSection && guideSection.querySelector("h2");
    if (guideHeading) guideHeading.textContent = t("how");
    const tabLabels = document.querySelectorAll(".tl-tabs .tool-tab");
    if (tabLabels[3]) tabLabels[3].textContent = t("console");
    const whySection = document.getElementById("achievements-explainer");
    if (whySection) {
      const heading = whySection.querySelector("h2");
      const paragraph = whySection.querySelector("p");
      if (heading) heading.textContent = t("why");
      if (paragraph) paragraph.textContent = t("whyText");
    }
    document.querySelectorAll(".nav-cta span").forEach(function (node) {
      const labels = CTA_COPY[language] || CTA_COPY.en;
      node.textContent = node.classList.contains("min-[430px]:inline") ? labels[0] : labels[1];
    });

    if (languageButton) {
      const lang = LANGUAGES.find(function (entry) { return entry[0] === language; }) || LANGUAGES[0];
      const flag = languageButton.querySelector("img");
      if (flag) {
        flag.src = "../flags/" + lang[2];
        flag.alt = lang[1];
      }
      languageButton.setAttribute("aria-label", LANGUAGE_BUTTON[language] || LANGUAGE_BUTTON.en);
      languageButton.title = LANGUAGE_BUTTON[language] || LANGUAGE_BUTTON.en;
      languageButton.setAttribute("aria-expanded", String(languageMenu && !languageMenu.hidden));
    }
    const accessibility = ACCESSIBILITY[language] || ACCESSIBILITY.en;
    const themeButton = document.querySelector(".theme-toggle");
    if (themeButton) {
      const light = document.documentElement.getAttribute("data-theme") === "light";
      themeButton.setAttribute("aria-label", light ? accessibility[1] : accessibility[0]);
      themeButton.setAttribute("data-tip", light ? accessibility[1] : accessibility[0]);
    }
    const assistantButton = document.querySelector(".ai-launch");
    if (assistantButton) assistantButton.setAttribute("aria-label", accessibility[2]);
    if (languageMenu) {
      languageMenu.setAttribute("aria-label", LANGUAGE_MENU_LABELS[language] || LANGUAGE_MENU_LABELS.en);
      languageMenu.querySelectorAll("[data-language]").forEach(function (option) {
        const selected = option.dataset.language === language;
        option.setAttribute("aria-checked", String(selected));
        option.classList.toggle("is-selected", selected);
        const check = option.querySelector(".guizz-language-check");
        if (check) check.textContent = selected ? "✓" : "";
      });
    }
    if (window.guizzWorldRescueLanguageChanged) window.guizzWorldRescueLanguageChanged();
    if (tabButtons.length) {
      const selectedIndex = Math.max(0, tabButtons.findIndex(function (button) { return button.getAttribute("aria-selected") === "true"; }));
      selectGuide(selectedIndex);
    }
  }

  window.guizzI18n = {
    get language() { return language; },
    t: t,
    guide: guide,
    progress: function (key) {
      const labels = COPY_PROGRESS_COPY[language] || COPY_PROGRESS_COPY.en;
      return labels[key] || COPY_PROGRESS_COPY.en[key] || key;
    },
    worldMeta: function (key, fallback) {
      const labels = WORLD_META[language] || WORLD_META.en;
      const flow = WORLD_FLOW[language] || WORLD_FLOW.en;
      if (flow[key]) return flow[key];
      const parts = key.split(".");
      if (parts.length === 2 && (parts[0] === "mode" || parts[0] === "difficulty")) {
        const group = parts[0] === "difficulty" ? "difficultyName" : "mode";
        return labels[group][parts[1]] || fallback || WORLD_META.en[group][parts[1]] || key;
      }
      return labels[key] || fallback || WORLD_META.en[key] || key;
    },
    property: function (key, fallback) {
      const labels = PROPERTIES[language] || PROPERTIES.en;
      return labels[key] || (fallback && fallback.indexOf("Indicador:") === 0 ? labels.indicator + ": " + key : fallback);
    },
    blocker: function (item) {
      const labels = BLOCKERS[language] || BLOCKERS.en;
      if (item.type === "locked") return labels.locked + item.name;
      if (item.type === "experiments-used") return labels.experiments;
      return labels.experimental;
    },
    error: function (key, fallback) {
      const indexes = { smallFile: 0, header: 1, truncated: 2, array: 3, depth: 4, list: 5, unknownType: 6, tooManyTags: 7, root: 8, nameTooLong: 9, saveType: 10 };
      const index = indexes[key];
      return index === undefined ? fallback : ((ERRORS[language] || ERRORS.en)[index] || fallback);
    },
    setLanguage: function (next) {
      if (!COPY[next]) return;
      language = next;
      try {
        localStorage.setItem("preferred-language", next);
        localStorage.setItem("guizz-world-rescue-language-set", "1");
      } catch (_) {}
      applyLanguage();
    }
  };

  if (languageButton) {
    const wrapper = languageButton.parentElement;
    languageMenu = document.createElement("div");
    languageMenu.className = "guizz-language-menu";
    languageMenu.hidden = true;
    languageMenu.setAttribute("role", "menu");
    languageMenu.setAttribute("aria-label", "Languages");
    LANGUAGES.forEach(function (entry) {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "guizz-language-option";
      option.dataset.language = entry[0];
      option.setAttribute("role", "menuitemradio");
      option.setAttribute("aria-checked", "false");
      const flag = document.createElement("img");
      flag.src = "../flags/" + entry[2];
      flag.alt = "";
      flag.width = 26;
      flag.height = 18;
      const name = document.createElement("span");
      name.textContent = entry[1];
      const check = document.createElement("span");
      check.className = "guizz-language-check";
      check.setAttribute("aria-hidden", "true");
      option.append(flag, name, check);
      option.addEventListener("click", function () {
        window.guizzI18n.setLanguage(entry[0]);
        closeLanguageMenu(false);
        languageButton.focus();
      });
      languageMenu.appendChild(option);
    });
    wrapper.appendChild(languageMenu);
    languageButton.setAttribute("aria-haspopup", "menu");
    languageButton.addEventListener("click", function (event) {
      event.preventDefault();
      const opening = languageMenu.hidden;
      languageMenu.hidden = !opening;
      languageButton.setAttribute("aria-expanded", String(opening));
      languageButton.setAttribute("data-state", opening ? "open" : "closed");
      if (opening) languageMenu.querySelector('[data-language="' + language + '"]').focus();
    });
    languageMenu.addEventListener("keydown", function (event) {
      const options = Array.from(languageMenu.querySelectorAll("[data-language]"));
      const index = options.indexOf(document.activeElement);
      if (event.key === "Escape") {
        event.preventDefault();
        closeLanguageMenu(true);
      } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const delta = event.key === "ArrowDown" ? 1 : -1;
        options[(index + delta + options.length) % options.length].focus();
      } else if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        options[event.key === "Home" ? 0 : options.length - 1].focus();
      }
    });
    document.addEventListener("click", function (event) {
      if (!wrapper.contains(event.target)) closeLanguageMenu(false);
    });
  }

  const themeButton = document.querySelector(".theme-toggle");
  if (themeButton) {
    themeButton.addEventListener("click", function () {
      const root = document.documentElement;
      const light = root.getAttribute("data-theme") !== "light";
      if (light) root.setAttribute("data-theme", "light");
      else root.removeAttribute("data-theme");
      try { localStorage.setItem("ct-theme", light ? "light" : "dark"); } catch (_) {}
      const accessibility = ACCESSIBILITY[language] || ACCESSIBILITY.en;
      themeButton.setAttribute("aria-label", light ? accessibility[1] : accessibility[0]);
      themeButton.setAttribute("data-tip", light ? accessibility[1] : accessibility[0]);
    });
  }

  applyLanguage();
}());
