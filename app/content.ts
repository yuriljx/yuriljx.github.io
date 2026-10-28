export type Locale = "en" | "zh" | "ja";
export type LocalizedText = Record<Locale, string>;

export const localize = (en: string, zh: string, ja: string): LocalizedText => ({ en, zh, ja });

/* ------------------------------------------------------------------ */
/* Identity — every fact below is aligned with the October 2026 CV.     */
/* ------------------------------------------------------------------ */

export const profile = {
  englishName: "Jixiao Li",
  nativeName: localize("Jixiao Li, PhD", "李继潇", "李 継瀟"),
  role: localize("Postdoctoral Researcher", "博士后研究员", "学術研究員"),
  roleDetail: localize("Postdoctoral Researcher (学術研究員)", "博士后研究员（学術研究員）", "学術研究員（博士研究員）"),
  affiliation: localize(
    "Experimental Farm, Field Science Center for Northern Biosphere, Hokkaido University",
    "北海道大学北方生物圈领域科学中心 生物生产研究农场",
    "北海道大学 北方生物圏フィールド科学センター 生物生産研究農場",
  ),
  affiliationShort: localize(
    "Field Science Center for Northern Biosphere, Hokkaido University",
    "北海道大学北方生物圈领域科学中心",
    "北海道大学 北方生物圏フィールド科学センター",
  ),
  location: localize("Sapporo, Japan", "日本札幌", "札幌"),
  email: "lijixiao327@gmail.com",
  orcid: "0000-0003-2377-1011",
  orcidUrl: "https://orcid.org/0000-0003-2377-1011",
  scholarUrl: "https://scholar.google.com/citations?user=m2FLOrUAAAAJ&hl=en",
  githubUrl: "https://github.com/yuriljx",
  updated: localize("Updated October 2026", "更新于 2026 年 10 月", "2026年10月更新"),
};

export const keyNumbers = [
  { value: 8, label: localize("Peer-reviewed journal articles", "篇同行评审期刊论文", "査読付き原著論文") },
  { value: 4, label: localize("First-author articles", "篇第一作者论文", "筆頭著者論文") },
  { value: 3, label: localize("Manuscripts submitted / under review", "篇稿件已投稿 / 在审", "投稿中・審査中の原稿") },
  { value: 2, label: localize("PI grant proposals under review", "项主持基金申请在审", "研究代表者として審査中の助成申請") },
] as const;

/* ------------------------------------------------------------------ */
/* Latest activity                                                      */
/* ------------------------------------------------------------------ */

export const latest = [
  {
    date: "2026-10",
    label: localize("Oct 2026", "2026.10", "2026年10月"),
    kind: localize("Appointment", "任职", "着任"),
    text: localize(
      "Joined the Experimental Farm of the Field Science Center for Northern Biosphere as a Postdoctoral Researcher.",
      "转入北方生物圈领域科学中心 生物生产研究农场，任博士后研究员。",
      "北方生物圏フィールド科学センター 生物生産研究農場の学術研究員に着任。",
    ),
  },
  {
    date: "2026-10",
    label: localize("Oct 2026", "2026.10", "2026年10月"),
    kind: localize("Manuscript", "稿件", "論文"),
    text: localize(
      "Sole-author study on within-family genomic prediction in rice NAM families submitted to Rice; reproduction package archived on Zenodo.",
      "水稻 NAM 家系内基因组预测的唯一作者研究已投稿 Rice；配套复现软件包已在 Zenodo 存档。",
      "イネNAM家系内のゲノム予測に関する単著論文を Rice に投稿。再現用パッケージを Zenodo に公開。",
    ),
    href: "#publications",
  },
  {
    date: "2026-09",
    label: localize("Sep 2026", "2026.09", "2026年9月"),
    kind: localize("Proposal", "基金申请", "研究費申請"),
    text: localize(
      "Submitted a JSPS KAKENHI Early-Career Scientists proposal as PI: time-series imaging to predict shoot formation in rice culture tissue.",
      "以主持人身份提交 JSPS 科研费若手研究申请：以时间序列图像早期判定水稻培养组织的成苗可能性。",
      "研究代表者として科研費・若手研究に応募：時系列画像によるイネ培養組織のシュート形成可能性の早期判定。",
    ),
    href: "#research",
  },
  {
    date: "2026",
    label: localize("2026", "2026", "2026年"),
    kind: localize("Teaching", "教学", "教育"),
    text: localize(
      "Three Japanese-language video lectures on AI in agriculture, produced for Hokkaido University's Smart Agriculture Education Hub (MAFF-commissioned).",
      "为北海道大学智能农业教育基地制作的 3 部日语 AI 农业教学视频（农林水产省委托项目）。",
      "北海道大学スマート農業教育拠点向けに、農業AIに関する日本語講義動画3本を制作（農林水産省委託事業）。",
    ),
    href: "#teaching",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Research                                                             */
/* ------------------------------------------------------------------ */

export const researchThread = localize(
  "Across crops the question stays the same: what can be measured earlier, more cheaply and without destroying the material — and where do limited measurements change a selection decision?",
  "无论哪种作物，问题都是同一个：哪些性状能更早、更省、且不破坏材料地被测量？有限的测量应该投在哪里，才能真正改变选择决策？",
  "作物が変わっても問いは同じです。何を、より早く、より安価に、材料を壊さずに測れるか。そして限られた測定をどこに配分すれば選抜の判断が変わるか。",
);

export const researchThemes = [
  {
    id: "rice",
    index: "01",
    status: localize("Current", "当前", "現在"),
    title: localize("Rice breeding methods", "水稻育种方法", "イネ育種法"),
    question: localize(
      "Which anther-culture calli will form green shoots — and can that be called early, from images, without disturbing the culture?",
      "哪些花药培养愈伤组织会长出绿色苗？能否在早期仅凭图像、不干扰培养就做出判断？",
      "どの葯培養カルスが緑色シュートを形成するのか。培養を乱さず、画像だけで早期に判定できるか。",
    ),
    body: localize(
      "Rice anther-culture and microspore-isolation experiments for doubled-haploid production, with individual calli tracked by time-series imaging and every step kept in traceable experiment records. In parallel, a sole-author computational study (submitted to Rice) reports that phenotyping part of a target family improves within-family genomic prediction in rice NAM families.",
      "开展面向双单倍体（DH）生产的水稻花药培养与小孢子分离实验，以时间序列图像追踪单个愈伤组织，并保留完整可追溯的实验记录。同时独立完成的计算研究（已投稿 Rice）显示：对目标家系部分个体进行表型测定，可提升水稻 NAM 家系内的基因组预测。",
      "倍加半数体（DH）作出のためのイネ葯培養・小胞子単離実験を行い、個々のカルスを時系列画像で追跡し、全工程を追跡可能な実験記録として残しています。並行して、標的家系の一部を表現型評価するとイネNAM家系内のゲノム予測が向上することを、単著の計算研究として報告しました（Rice 投稿中）。",
    ),
    evidence: [
      { value: "PI", label: localize("JSPS KAKENHI proposal, under review", "JSPS 科研费申请（主持，在审）", "科研費・若手研究（代表、審査中）") },
      { value: "1", label: localize("Sole-author manuscript submitted to Rice", "篇唯一作者稿件已投 Rice", "Rice 投稿中の単著論文") },
      { value: "DOI", label: localize("Open reproduction package (Zenodo)", "开放复现软件包（Zenodo）", "再現用パッケージ（Zenodo）") },
    ],
    links: [
      { label: localize("Reproduction package", "复现软件包", "再現パッケージ"), href: "#software-rice-gs" },
      { label: "CallusTrack", href: "#tool-callustrack" },
      { label: "Rice DH Record System", href: "#tool-rice-dh-record" },
    ],
    tags: ["Anther culture", "Doubled haploids", "Time-series imaging", "Genomic prediction"],
    images: [
      { src: "/research/anther-culture.webp", width: 1600, height: 1067, alt: localize("Rice anther-culture material in a Petri dish with a scale reference", "培养皿中带尺度参照的水稻花药培养材料", "スケール参照を含むシャーレ内のイネ葯培養材料"), caption: localize("Anther-culture material", "花药培养材料", "葯培養材料") },
      { src: "/research/microspore-fluorescence.webp", width: 640, height: 480, alt: localize("Fluorescence micrograph of isolated rice microspores", "分离水稻小孢子的荧光显微图", "単離イネ小胞子の蛍光顕微鏡像"), caption: localize("Isolated microspores, fluorescence", "分离小孢子荧光观察", "単離小胞子の蛍光観察") },
      { src: "/research/rice-greenhouse.webp", width: 1400, height: 1000, alt: localize("Rice plants growing in a greenhouse", "温室中的水稻植株", "温室で栽培中のイネ"), caption: localize("Donor plants in the greenhouse", "温室中的供体植株", "温室の供試植物") },
    ],
  },
  {
    id: "field",
    index: "02",
    status: localize("Published", "已发表", "発表済み"),
    title: localize("Non-destructive phenotyping in the field", "田间无损表型", "圃場における非破壊表現型評価"),
    question: localize(
      "Can ordinary field photographs replace calipers for following fruit growth through a season?",
      "普通的田间照片，能否替代卡尺，追踪果实整个季节的生长？",
      "普通の圃場写真で、ノギスに代わって果実の一季節の成長を追えるか。",
    ),
    body: localize(
      "An end-to-end pipeline recovers grape-berry growth curves from field photographs: object detection (YOLOv8), scale conversion, biology-informed smoothing and double-sigmoid fitting. As co-author, I contributed to related image-based studies on RGB estimation of haskap fruit quality, apple cultivar recognition and foundation-model-assisted leaf and stomatal phenotyping of blueberry (under review).",
      "建立从普通田间照片恢复葡萄果粒生长曲线的完整流程：目标检测（YOLOv8）、尺度换算、生物学约束平滑与双 S 型拟合。作为合作作者，参与蓝靛果 RGB 品质估算、苹果品种识别，以及基础模型辅助的蓝莓叶片与气孔表型品种分类（在审）等相关图像研究。",
      "圃場写真からブドウ果粒の成長曲線を復元する一貫したパイプラインを構築しました：物体検出（YOLOv8）、スケール換算、生物学的制約付き平滑化、二重シグモイド曲線の当てはめ。共著者として、ハスカップのRGB品質推定、リンゴ品種識別、基盤モデルを用いたブルーベリーの葉・気孔表現型（審査中）など、関連する画像研究にも参加しています。",
    ),
    evidence: [
      { value: "0.931", label: localize("Detection mAP50 (validation set)", "检测 mAP50（验证集）", "検出 mAP50（検証用データ）") },
      { value: "0.97", label: localize("R² vs calipers, 89 detached berries", "与卡尺对比 R²（89 个离体果）", "ノギス実測との R²（離脱果 89 個）") },
      { value: "0.8 mm", label: localize("Mean absolute error", "平均绝对误差", "平均絶対誤差") },
    ],
    links: [
      { label: localize("Hortic. J. 2026 (first author)", "Hortic. J. 2026（第一作者）", "Hortic. J. 2026（筆頭）"), href: "https://doi.org/10.2503/hortj.SZD-110" },
      { label: "Grape_Length", href: "#software-grape-length" },
    ],
    tags: ["YOLOv8", "Scale calibration", "Time series", "Double-sigmoid growth"],
    images: [
      { src: "/research/grape-field.webp", width: 1400, height: 1000, alt: localize("Grape berries photographed in the field with a scale reference", "带尺度参照拍摄的田间葡萄果粒", "スケール参照とともに撮影した圃場のブドウ果粒"), caption: localize("Field photograph with scale reference", "带尺度参照的田间照片", "スケール参照付きの圃場写真") },
      { src: "/software/grape/detection-results.webp", width: 1600, height: 720, alt: localize("YOLO detections of individual grape berries", "逐颗葡萄果粒的 YOLO 检测框", "ブドウ果粒ごとのYOLO検出枠"), caption: localize("Berry-level detections", "逐果粒检测", "果粒単位の検出") },
      { src: "/software/grape/growth-curve.webp", width: 1334, height: 780, alt: localize("Time series of mean grape berry diameter with smoothing", "葡萄平均果粒直径时间序列与平滑曲线", "ブドウ平均果粒径の時系列と平滑化曲線"), caption: localize("Growth curve after smoothing", "平滑后的生长曲线", "平滑化後の成長曲線") , fit: "contain" },
    ],
  },
  {
    id: "ploidy",
    index: "03",
    status: localize("PhD series", "博士系列研究", "博士論文研究"),
    title: localize("Ploidy, phenotype and fruit quality", "倍性、表型与果实品质", "倍数性・表現型・果実品質"),
    question: localize(
      "How does ploidy level shape morphology, reproduction and fruit chemistry in haskap — and what does that mean for breeding?",
      "倍性水平如何塑造蓝靛果的形态、繁殖与果实化学组成？这对育种意味着什么？",
      "倍数性はハスカップの形態・繁殖・果実成分をどう形づくるのか。それは育種に何を意味するのか。",
    ),
    body: localize(
      "Polyploid and aneuploid haskap (Lonicera caerulea subsp. edulis) plants and their progeny were characterized and ploidy level was linked to morphology, reproductive traits, biochemical composition and integrated fruit quality — a three-paper first-author series that forms my PhD thesis.",
      "系统表征蓝靛果忍冬（Lonicera caerulea subsp. edulis）多倍体、非整倍体植株及其后代，将倍性水平与形态、繁殖性状、生化组成及综合果实品质相关联，形成 3 篇第一作者系列论文，构成博士学位论文主体。",
      "ハスカップ（Lonicera caerulea subsp. edulis）の倍数体・異数体とその後代を特性評価し、倍数性を形態、繁殖形質、生化学成分、総合的な果実品質と結び付けました。筆頭著者論文3報のシリーズで、博士論文の中核です。",
    ),
    evidence: [
      { value: "3", label: localize("First-author papers in the series", "篇第一作者系列论文", "筆頭著者論文（シリーズ）") },
      { value: "GC–MS", label: localize("Sugars, organic acids and phenolics", "糖、有机酸与酚类", "糖・有機酸・フェノール類") },
      { value: "FCM", label: localize("Ploidy by flow cytometry", "流式细胞术测定倍性", "フローサイトメトリーによる倍数性判定") },
    ],
    links: [
      { label: "Euphytica 2023", href: "https://doi.org/10.1007/s10681-023-03181-6" },
      { label: "Sci. Hortic. 2024", href: "https://doi.org/10.1016/j.scienta.2023.112831" },
      { label: "Euphytica 2025", href: "https://doi.org/10.1007/s10681-025-03532-5" },
    ],
    tags: ["Polyploidy", "Aneuploidy", "Fruit quality", "GC–MS"],
    images: [
      { src: "/research/haskap-field.webp", width: 1600, height: 1200, alt: localize("Haskap fruit on the plant in the field", "田间植株上的蓝靛果果实", "圃場で結実したハスカップ"), caption: localize("Haskap in the field", "田间蓝靛果", "圃場のハスカップ") },
      { src: "/research/haskap-fruit.webp", width: 1600, height: 1200, alt: localize("Harvested haskap fruit", "采收的蓝靛果果实", "収穫したハスカップ果実"), caption: localize("Fruit for quality assessment", "用于品质评价的果实", "品質評価用の果実") },
      { src: "/publications/haskap-flow-cytometry.webp", width: 1000, height: 800, alt: localize("Flow cytometry histograms of haskap plants", "蓝靛果植株的流式细胞直方图", "ハスカップのフローサイトメトリー・ヒストグラム"), caption: localize("Flow cytometry of plants and progeny", "植株及后代流式细胞分析", "植物と後代のフローサイトメトリー") , fit: "contain" },
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Publications                                                         */
/* ------------------------------------------------------------------ */

export type PublicationTopic = "phenotyping" | "ploidy" | "atmospheric";

export const publicationTopics: Array<{ id: PublicationTopic; label: LocalizedText }> = [
  { id: "phenotyping", label: localize("Phenotyping & vision", "表型与视觉", "表現型・画像") },
  { id: "ploidy", label: localize("Ploidy & fruit quality", "倍性与果实品质", "倍数性・果実品質") },
  { id: "atmospheric", label: localize("Atmospheric chemistry", "大气化学", "大気化学") },
];

export const publications = [
  {
    id: "pbt-2026",
    year: "2026",
    authors: ["Zhang, J.", "Li, J.", "Meng, X.", "Yang, Y.", "Lyu, Y.", "Hoshino, Y."],
    self: 1,
    title: "Feature extraction based on RGB images for rapid and non-destructive estimation of haskap fruit quality attributes",
    journal: "Postharvest Biology and Technology",
    details: "240, 114416",
    doi: "10.1016/j.postharvbio.2026.114416",
    topic: "phenotyping",
    thumb: "/publications/rgb-haskap.webp",
    thumbAlt: localize("RGB feature extraction and haskap quality modelling figure", "蓝靛果 RGB 特征提取与品质建模图", "ハスカップのRGB特徴抽出と品質モデル図"),
  },
  {
    id: "hortj-grape-2026",
    year: "2026",
    authors: ["Li, J.", "Sone, T.", "Meng, X.", "Hirayama, K.", "Ikuta, M.", "Inose, Y.", "Hoshino, Y."],
    self: 0,
    title: "Monitoring relative grape berry growth in the field with YOLOv8 and biology-informed smoothing",
    journal: "The Horticulture Journal",
    details: "95(3), 378–388",
    doi: "10.2503/hortj.SZD-110",
    topic: "phenotyping",
    code: "https://github.com/yuriljx/Grape_Length",
    thumb: "/publications/grape-detection.webp",
    thumbAlt: localize("YOLOv8 detections on field grape images", "葡萄田间图像的 YOLOv8 检测结果", "圃場ブドウ画像のYOLOv8検出結果"),
  },
  {
    id: "hortj-apple-2026",
    year: "2026",
    authors: ["Zhang, J.", "Meng, X.", "Li, J.", "Hoshino, Y."],
    self: 2,
    title: "YOLO-APPLE: Accurate identification of apple cultivars using an improved YOLOv7 framework",
    journal: "The Horticulture Journal",
    details: "95(3), 407–418",
    doi: "10.2503/hortj.SZD-115",
    topic: "phenotyping",
    thumb: "/publications/yolo-apple-framework.webp",
    thumbAlt: localize("YOLO-APPLE model framework figure", "YOLO-APPLE 模型框架图", "YOLO-APPLEモデルの構成図"),
  },
  {
    id: "euphytica-2025",
    year: "2025",
    authors: ["Li, J.", "Hoshino, Y."],
    self: 0,
    title: "Exploring the impact of ploidy levels on fruit attributes of haskap (*Lonicera caerulea* L. subsp. *edulis* (Turcz. ex Herder) Hultén)",
    journal: "Euphytica",
    details: "221, 74",
    doi: "10.1007/s10681-025-03532-5",
    topic: "ploidy",
    thumb: "/publications/haskap-pca.webp",
    thumbAlt: localize("Principal component analysis of haskap fruit attributes", "蓝靛果果实性状主成分分析图", "ハスカップ果実形質の主成分分析図"),
  },
  {
    id: "scihortic-2024",
    year: "2024",
    authors: ["Li, J.", "Hoshino, Y."],
    self: 0,
    title: "Elucidating the impact of ploidy level on biochemical content accumulation in haskap (*Lonicera caerulea* L. subsp. *edulis* (Turcz. ex Herder) Hultén) fruits: A comprehensive approach for fruit assessment",
    journal: "Scientia Horticulturae",
    details: "327, 112831",
    doi: "10.1016/j.scienta.2023.112831",
    topic: "ploidy",
    thumb: "/publications/haskap-biochemistry.webp",
    thumbAlt: localize("Biochemical profiles of haskap fruit by ploidy", "不同倍性蓝靛果的生化谱图", "倍数性別ハスカップ果実の生化学プロファイル"),
  },
  {
    id: "euphytica-2023",
    year: "2023",
    authors: ["Li, J.", "Suzuki, Y.", "Hoshino, Y."],
    self: 0,
    title: "Phenotypic analysis of polyploid and aneuploid haskap (*Lonicera caerulea* L. subsp. *edulis* (Turcz. ex Herder) Hultén) plants and their progeny production",
    journal: "Euphytica",
    details: "219, 52",
    doi: "10.1007/s10681-023-03181-6",
    topic: "ploidy",
    thumb: "/publications/haskap-flow-cytometry.webp",
    thumbAlt: localize("Flow cytometry profiles of haskap plants and progeny", "蓝靛果植株及后代的流式细胞分析图", "ハスカップ植物と後代のフローサイトメトリー図"),
  },
  {
    id: "atmosenv-2016",
    year: "2016",
    authors: ["Ladino, L. A.", "Yakobi-Hancock, J. D.", "Kilthau, W. P.", "Mason, R. H.", "Si, M.", "Li, J.", "et al."],
    self: 5,
    title: "Addressing the ice nucleating abilities of marine aerosol: A combination of deposition mode laboratory and field measurements",
    journal: "Atmospheric Environment",
    details: "132, 1–10",
    doi: "10.1016/j.atmosenv.2016.02.028",
    topic: "atmospheric",
    thumb: "/publications/marine-aerosol-map.webp",
    thumbAlt: localize("Marine aerosol sampling and measurement locations", "海洋气溶胶采样与测量位置图", "海洋エアロゾルの採取・測定地点図"),
  },
  {
    id: "acp-2015",
    year: "2015",
    authors: ["Mason, R. H.", "Si, M.", "Li, J.", "Chou, C.", "Dickie, R.", "Toom-Sauntry, D.", "et al."],
    self: 2,
    title: "Ice nucleating particles at a coastal marine boundary layer site: Correlations with aerosol type and meteorological conditions",
    journal: "Atmospheric Chemistry and Physics",
    details: "15(21), 12547–12566",
    doi: "10.5194/acp-15-12547-2015",
    topic: "atmospheric",
    thumb: "/publications/ice-nuclei-microscopy.webp",
    thumbAlt: localize("Microscopy figure of ice-nucleating aerosol particles", "冰核气溶胶颗粒显微图", "氷核エアロゾル粒子の顕微鏡図"),
  },
] as const;

export const manuscripts = [
  {
    id: "M3",
    authors: ["Li, J."],
    self: 0,
    title: "Phenotyping part of the target family improves within-family genomic prediction in rice nested association mapping families",
    journal: "Rice",
    status: localize("Submitted · Oct 2026 · sole author", "已投稿 · 2026 年 10 月 · 唯一作者", "投稿中・2026年10月・単著"),
    extra: { label: localize("Reproduction package", "复现软件包", "再現パッケージ"), href: "https://doi.org/10.5281/zenodo.23438608" },
  },
  {
    id: "M1",
    authors: ["Liu, Z.", "Wei, X.", "Zhang, B.", "Li, J.", "Hao, C.", "Guo, H.", "Zhu, S.", "Wang, X.", "Dong, T.", "Zheng, S.", "Bai, J.", "Li, B."],
    self: 3,
    title: "*Arabidopsis* TTM3 facilitates PIN cycling by modulating clathrin-mediated trafficking",
    journal: "Plant, Cell & Environment",
    status: localize("Revised manuscript under review · Oct 2026", "修改稿在审 · 2026 年 10 月", "修正稿審査中・2026年10月"),
  },
  {
    id: "M2",
    authors: ["Meng, X.", "Nakano, A.", "Zhang, J.", "Li, J.", "Guo, W.", "Li, J.", "Hoshino, Y."],
    self: 3,
    title: "Foundation-model-assisted leaf and stomatal phenotyping for cultivar classification in field-grown young blueberries",
    journal: "The Horticulture Journal",
    status: localize("Revised manuscript under review · Oct 2026", "修改稿在审 · 2026 年 10 月", "修正稿審査中・2026年10月"),
  },
] as const;

/* ------------------------------------------------------------------ */
/* Software                                                             */
/* ------------------------------------------------------------------ */

export type Visual = {
  src: string;
  width: number;
  height: number;
  alt: LocalizedText;
  caption: LocalizedText;
};

const v = (src: string, width: number, height: number, alt: LocalizedText, caption: LocalizedText): Visual => ({ src, width, height, alt, caption });

export const openSoftware = [
  {
    slug: "grape-length",
    title: "Grape_Length",
    meta: localize("Companion code · Hortic. J. 2026", "论文配套代码 · Hortic. J. 2026", "論文付属コード・Hortic. J. 2026"),
    summary: localize(
      "Grape-berry detection, scale conversion, time-series processing and biology-informed smoothing — the companion code to the published field growth study.",
      "葡萄果粒检测、尺度换算、时间序列整理与生物学约束平滑——已发表田间生长研究的配套代码。",
      "ブドウ果粒の検出、スケール換算、時系列整理、生物学的制約付き平滑化。圃場成長研究（既発表）の付属コードです。",
    ),
    points: [
      localize("Detection on ordinary field photographs with a scale reference", "基于带尺度参照的普通田间照片进行检测", "スケール参照付きの普通の圃場写真で検出"),
      localize("Per-sample time series across dates", "跨日期的逐样本时间序列", "日付をまたぐ個体別の時系列"),
      localize("Smoothing that respects how berries actually grow", "遵循果粒真实生长规律的平滑", "果粒の実際の成長様式に沿った平滑化"),
    ],
    stack: ["Python", "YOLOv8", "Time series"],
    links: [
      { label: "GitHub", href: "https://github.com/yuriljx/Grape_Length" },
      { label: localize("Paper", "论文", "論文"), href: "https://doi.org/10.2503/hortj.SZD-110" },
    ],
    visuals: [
      v("/software/grape/detection-results.webp", 1600, 720, localize("YOLO detections of individual grape berries", "逐颗葡萄果粒的 YOLO 检测框", "ブドウ果粒ごとのYOLO検出枠"), localize("Berry-level detections with confidence labels", "带置信度标签的逐果粒检测", "信頼度ラベル付きの果粒単位検出")),
      v("/software/grape/growth-curve.webp", 1334, 780, localize("Time series of mean grape berry diameter", "葡萄平均果粒直径时间序列", "ブドウ平均果粒径の時系列"), localize("Mean diameter and biology-informed smoothing", "平均直径与生物学约束平滑", "平均果粒径と生物学的制約付き平滑化")),
      v("/software/grape/mature-stage.webp", 1600, 1067, localize("Mature-stage field image of a grape sample", "葡萄样本成熟期田间图像", "ブドウ試料の成熟期圃場画像"), localize("Mature-stage image with scale and colour references", "带尺度与色彩参照的成熟期图像", "スケール・色参照を含む成熟期画像")),
    ],
  },
  {
    slug: "rice-gs",
    title: "Rice genomic selection: frozen-prediction reproduction",
    meta: localize("v1.0.0 · Zenodo DOI · MIT", "v1.0.0 · Zenodo DOI · MIT", "v1.0.0・Zenodo DOI・MIT"),
    summary: localize(
      "A Python/NumPy package that re-scores archived genomic-prediction outputs from rice NAM, MAGIC and IRRI analyses and reproduces the reported accuracy metrics for the target-family phenotyping study.",
      "Python/NumPy 软件包：对水稻 NAM、MAGIC、IRRI 分析中存档的基因组预测结果重新评分，复现目标家系表型研究所报告的预测精度指标。",
      "イネNAM・MAGIC・IRRI解析で保存したゲノム予測結果を再採点し、標的家系表現型研究で報告した予測精度を再現する Python/NumPy パッケージです。",
    ),
    points: [
      localize("Scores 4,940 frozen prediction cells into 9,240 metric rows", "对 4,940 个冻结预测单元评分，生成 9,240 行指标", "保存済み予測 4,940 セルを採点し、9,240 行の指標を出力"),
      localize("No downloads, model fitting or tuning — prediction-to-result only", "不下载、不拟合、不调参——只做从预测到结果的复算", "ダウンロード・モデル推定・調整は行わず、予測から結果までのみを再計算"),
      localize("Missing or mismatched inputs fail explicitly", "输入缺失或不匹配时明确报错", "入力の欠落・不一致は明示的にエラー"),
    ],
    stack: ["Python 3.12", "NumPy", "Reproducibility"],
    links: [
      { label: "GitHub", href: "https://github.com/yuriljx/rice-genomic-selection-validation" },
      { label: "doi.org/10.5281/zenodo.23438608", href: "https://doi.org/10.5281/zenodo.23438608" },
    ],
    visuals: [] as Visual[],
  },
] as const;

export const researchTools = [
  {
    slug: "rice-dh-record",
    title: "Rice DH Record System",
    version: "v0.7.2",
    summary: localize(
      "Threads sowing, panicle collection, cold treatment, anther culture, regeneration and ploidy determination into one auditable record chain, with planned values beside observed ones.",
      "把播种、采穗、低温处理、花药培养、再生与倍性判定串成一条可审计的记录链，每一步并置计划值与实际值。",
      "播種・穂採取・低温処理・葯培養・再分化・倍数性判定を一本の監査可能な記録に束ね、各段階で計画値と実測値を並置します。",
    ),
    features: ["Plan vs actual", "Lineage", "Local SQLite"],
    link: "https://github.com/yuriljx/rice-dh-record-system-showcase",
    visuals: [
      v("/software/rice-dh/workflow-overview.webp", 1800, 1080, localize("Synthetic overview of the traceable rice DH workflow", "可追溯水稻 DH 工作流的合成概览", "追跡可能なイネDHワークフローの合成概要"), localize("Workflow stages, checkpoints and handoffs", "工作流阶段、检查点与交接", "ワークフロー段階、チェックポイント、引き継ぎ")),
      v("/software/rice-dh/research-dashboard.webp", 1800, 1080, localize("Synthetic operating dashboard for rice DH records", "水稻 DH 记录系统的合成操作面板", "イネDH記録システムの合成運用ダッシュボード"), localize("Plans, material status and QC alerts in one view", "计划、材料状态与质控提醒集中呈现", "計画・材料状態・QC通知を一画面に集約")),
      v("/software/rice-dh/lineage-evidence.webp", 1800, 1080, localize("Synthetic lineage and evidence view for rice DH materials", "水稻 DH 材料的合成谱系与证据视图", "イネDH材料の合成系譜・証拠画面"), localize("Source-to-outcome lineage with recorded evidence", "从来源到结果的谱系与记录证据", "由来から結果までの系譜と記録証拠")),
    ],
  },
  {
    slug: "callustrack",
    title: "CallusTrack",
    version: "v0.5.0",
    summary: localize(
      "Keeps each callus's identity stable across a culture-image sequence, with editable instance masks, explicit review states and controlled export of masks, tables and QC overlays.",
      "在整段培养图像序列中保持每个愈伤组织身份稳定；实例掩膜可编辑、审查状态明确，并可受控导出掩膜、表格与质控叠加图。",
      "培養画像の系列全体で各カルスの同一性を保ち、編集可能なインスタンスマスク、明示的なレビュー状態、マスク・表・QCオーバーレイの管理付き出力を備えます。",
    ),
    features: ["Persistent IDs", "Editable masks", "Review states"],
    link: "https://github.com/yuriljx/callustrack-showcase",
    visuals: [
      v("/software/callustrack/annotation-workspace.webp", 1800, 1080, localize("Synthetic CallusTrack workspace with persistent callus labels", "带持续愈伤组织标签的合成 CallusTrack 工作区", "カルス継続ラベルを備えた合成CallusTrack画面"), localize("Persistent labels and frame-by-frame review", "持续追踪标签与逐帧复核", "継続追跡ラベルとフレーム別レビュー")),
      v("/software/callustrack/review-matrix.webp", 1800, 1080, localize("Synthetic CallusTrack human review matrix", "合成 CallusTrack 人工复核矩阵", "合成CallusTrack人手レビュー行列"), localize("Human review matrix and explicit QC states", "人工复核矩阵与明确的质控状态", "人手レビュー行列と明示的なQC状態")),
      v("/software/callustrack/controlled-export.webp", 1800, 1080, localize("Synthetic CallusTrack controlled export view", "合成 CallusTrack 受控导出视图", "合成CallusTrack管理付き出力画面"), localize("Controlled export of masks, tables and overlays", "掩膜、表格与叠加图的受控导出", "マスク・表・オーバーレイの管理付き出力")),
    ],
  },
  {
    slug: "genome-finder",
    title: "Rice Genome Resource Finder",
    version: "v7.14.0",
    summary: localize(
      "Searches NCBI Assembly, SRA, BioSample, ENA and DDBJ from cultivar names and aliases, merges duplicate accessions and exports an audit workbook with provenance and warnings.",
      "以品种名及别名一次检索 NCBI Assembly、SRA、BioSample、ENA 与 DDBJ，合并重复 accession，并导出带来源与警告的审计工作簿。",
      "品種名と別名から NCBI Assembly・SRA・BioSample・ENA・DDBJ を一括検索し、重複アクセッションを統合、来歴と警告を保持した監査ワークブックを出力します。",
    ),
    features: ["Alias expansion", "Multi-source search", "Audit workbook"],
    link: "https://github.com/yuriljx/rice-genome-resource-finder-showcase",
    visuals: [
      v("/software/genome/interface-overview.webp", 1800, 1012, localize("Synthetic interface overview for rice genome resource discovery", "水稻基因组资源检索的合成界面概览", "イネゲノム資源探索の合成画面概要"), localize("Input scope and source coverage", "输入范围与来源覆盖", "入力範囲と情報源カバレッジ")),
      v("/software/genome/search-options.webp", 1800, 1012, localize("Synthetic search options for public rice genome resources", "公共水稻基因组资源的合成搜索选项", "公開イネゲノム資源の合成検索条件"), localize("Alias-aware connectors and search controls", "别名感知连接器与搜索控制", "別名対応コネクタと検索制御")),
      v("/software/genome/audit-output.webp", 1800, 1012, localize("Synthetic audit output from the rice genome resource finder", "水稻基因组资源检索工具的合成审计输出", "イネゲノム資源検索ツールの合成監査出力"), localize("Candidates, provenance and retained warnings", "候选结果、来源与保留警告", "候補・来歴・保持された警告")),
    ],
  },
  {
    slug: "trait-explorer",
    title: "Rice Trait Evidence Explorer",
    version: "v0.8.4",
    summary: localize(
      "Cultivar cards, trait search and pairwise comparison in which every value is indexed to its source, so comparisons show the strength of — and gaps in — the evidence.",
      "品种卡、性状检索与双品种对比；每个性状值都索引到来源，对比时同时呈现证据强度与缺口。",
      "品種カード・形質検索・二品種比較。各値を出典に索引付けし、比較の際に根拠の強さと欠落も示します。",
    ),
    features: ["Cultivar cards", "Evidence comparison", "Curation queue"],
    link: "https://github.com/yuriljx/rice-trait-evidence-explorer-showcase",
    visuals: [
      v("/software/trait/evidence-overview.webp", 1800, 1012, localize("Synthetic rice trait evidence overview", "合成水稻性状证据概览", "合成イネ形質エビデンス概要"), localize("Cultivar records and evidence status", "品种记录与证据状态", "品種記録とエビデンス状態")),
      v("/software/trait/comparison-panel.webp", 1800, 1012, localize("Synthetic comparison of rice trait evidence", "合成水稻性状证据对比", "合成イネ形質エビデンス比較"), localize("Trait-level comparison with evidence states", "带证据状态的逐性状对比", "エビデンス状態付きの形質別比較")),
      v("/software/trait/coverage-dashboard.webp", 1800, 1012, localize("Synthetic rice trait evidence coverage dashboard", "合成水稻性状证据覆盖面板", "合成イネ形質エビデンス・カバレッジ画面"), localize("Coverage, gaps and curation priorities", "覆盖范围、缺口与校订优先级", "カバレッジ・欠落・キュレーション優先度")),
    ],
  },
  {
    slug: "riceperturbnet",
    title: "RicePerturbNet",
    version: "v0.16.0.dev2",
    summary: localize(
      "Organizes public and synthetic evidence by provenance, biological context and analysis unit, with an explicit layer separating what data document from what would be a scientific claim.",
      "按来源、生物学语境与分析单元组织公共与合成证据，并以显式层区分“数据所记录的内容”与“构成科学声明的内容”。",
      "公開・合成エビデンスを来歴・生物学的文脈・解析単位で整理し、データが記録する内容と科学的主張を明示的な層で区別します。",
    ),
    features: ["Evidence registry", "Source QC", "Claim boundaries"],
    link: "https://github.com/yuriljx/riceperturbnet-showcase",
    visuals: [
      v("/software/riceperturb/architecture-overview.webp", 1800, 1012, localize("Synthetic RicePerturbNet architecture overview", "合成 RicePerturbNet 架构概览", "合成RicePerturbNetアーキテクチャ概要"), localize("Evidence registry and bounded outputs", "证据登记与有边界的输出", "エビデンス登録と境界付き出力")),
      v("/software/riceperturb/scope-boundaries.webp", 1800, 1012, localize("Synthetic RicePerturbNet scope and claim boundaries", "合成 RicePerturbNet 范围与声明边界", "合成RicePerturbNetの範囲・主張境界"), localize("Boundary between documentation and claims", "文档输出与科学声明的边界", "文書化と主張の境界")),
      v("/software/riceperturb/pca-qc-public-data.webp", 1800, 1414, localize("PCA quality-control example using public data", "使用公共数据的 PCA 质量控制示例", "公開データを用いたPCA品質管理例"), localize("Public-data PCA as a QC example only", "仅作质量控制示例的公共数据 PCA", "QC例に限定した公開データPCA")),
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Talks & teaching                                                     */
/* ------------------------------------------------------------------ */

export const invitedTalk = {
  date: localize("26 Sep 2025", "2025-09-26", "2025年9月26日"),
  title: "Beyond disciplinary boundaries: Learning in a changing world",
  event: localize(
    "Invited alumni talk · Homecoming Day 2025, Graduate School of Environmental Science, Hokkaido University",
    "受邀校友报告 · 北海道大学环境科学院 Homecoming Day 2025",
    "招待講演（卒業生）・北海道大学大学院環境科学院 Homecoming Day 2025",
  ),
  quote: localize(
    "A degree is a toolbox, not a wall.",
    "专业是工具箱，而不是围墙。",
    "専攻は道具箱であって、壁ではない。",
  ),
};

export const presentations = [
  {
    year: "2025",
    title: localize("An end-to-end AI pipeline for computational metabolomics in food-quality assessment", "食品品质评价的端到端 AI 计算代谢组学流程", "食品品質評価のためのエンドツーエンドAI計算メタボロミクス"),
    event: localize("10th China International Artificial Intelligence Summit (CIAI)", "第十届中国国际人工智能峰会暨算力算法大会（CIAI）", "第10回中国国際人工知能サミット（CIAI）"),
  },
  {
    year: "2024",
    title: localize("Multimodal machine learning of fruit soluble solids and organic acids from field images and time series", "基于田间图像与时间序列的果实可溶性固形物及有机酸多模态机器学习预测", "圃場画像と時系列による果実可溶性固形物・有機酸のマルチモーダル機械学習"),
    event: localize("15th International Conference on Computational Systems Biology (ISB)", "第十五届国际计算系统生物学会议（ISB）", "第15回国際計算システム生物学会議（ISB）"),
  },
  {
    year: "2023",
    title: localize("Activated MSTFA silylation for GC–MS quantification of phenols and organic acids in plant matrices", "活化 MSTFA 硅烷化提升植物基质中酚类与有机酸的 GC–MS 定量", "活性化MSTFAシリル化による植物マトリックス中フェノール類・有機酸のGC–MS定量"),
    event: localize("103rd Annual Meeting of the Chemical Society of Japan", "日本化学会第 103 届春季年会", "日本化学会 第103春季年会"),
  },
  {
    year: "2022",
    title: localize("GC–MS analysis of sugars and organic acids in polyploid haskap fruit", "多倍体蓝靛果果实糖类与有机酸的 GC–MS 分析", "倍数体ハスカップ果実の糖・有機酸のGC–MS分析"),
    event: localize("Japanese Society for Horticultural Science, Autumn Meeting", "日本园艺学会秋季大会", "園芸学会 秋季大会"),
  },
] as const;

export const earlierPresentations = [
  {
    year: "2020",
    title: localize("Coupled effects of soil trace-element transfer on flavour-metabolite fingerprints and co-accumulation of toxic elements in specialty crops", "土壤微量元素转移对特种作物风味代谢指纹图谱及有毒元素共积累的耦合效应", "土壌微量元素移行が特産作物の風味代謝フィンガープリントと有害元素共蓄積に及ぼす連関効果"),
    event: localize("3rd International Conference on Agriculture, Food and Biotechnology (ICAFB)", "第三届农业、食品与生物技术国际会议（ICAFB）", "第3回農業・食品・バイオテクノロジー国際会議（ICAFB）"),
  },
  {
    year: "2018",
    title: localize("Rapid HPLC–MS quantification of free amino acids in tea infusions: method optimization and validation", "茶汤中游离氨基酸的快速 HPLC–MS 定量：方法优化与验证", "茶抽出液中遊離アミノ酸の迅速HPLC–MS定量：分析法の最適化と妥当性確認"),
    event: localize("31st Chinese Chemical Society Congress (CCS)", "第 31 届中国化学会年会（CCS）", "第31回中国化学会年会（CCS）"),
  },
  {
    year: "2017",
    title: localize("Headspace GC determination of benzene-series VOCs released from cigarette filters: equilibrium kinetics and sensitivity", "顶空气相色谱法测定卷烟滤嘴释放的苯系挥发性有机物：平衡动力学与灵敏度", "たばこフィルターから放出されるベンゼン系VOCのヘッドスペースGC定量：平衡動力学と感度"),
    event: localize("3rd International Conference on Chemical Materials and Process (ICCMP)", "第三届化学材料与工艺国际会议（ICCMP）", "第3回化学材料・プロセス国際会議（ICCMP）"),
  },
  {
    year: "2015",
    title: localize("Multi-instrument characterization of marine bioaerosols and their links to cloud and precipitation processes", "多仪器表征海洋生物气溶胶及其与云和降水过程的联系", "複数機器による海洋バイオエアロゾルの特性評価と雲・降水過程との関連"),
    event: localize("249th ACS National Meeting", "第 249 届美国化学会全国会议", "第249回米国化学会全国大会"),
  },
  {
    year: "2014",
    title: localize("A controlled pollen aerosolization apparatus for laboratory ice nucleation and optical measurements (poster)", "用于实验室冰成核与光学测量的可控花粉气溶胶发生装置（海报）", "実験室での氷核形成・光学測定のための制御型花粉エアロゾル発生装置（ポスター）"),
    event: localize("247th ACS National Meeting", "第 247 届美国化学会全国会议", "第247回米国化学会全国大会"),
  },
] as const;

export const lectureVideos = [
  {
    id: "tVO-jczRqH4",
    index: "01",
    title: "AIから深層学習へ、その進化の軌跡",
    topic: localize("AI foundations", "AI 基础", "AIの基礎"),
    motif: "network",
  },
  {
    id: "vgzPPp1OPFU",
    index: "02",
    title: "農場現場における深層学習とコンピュータビジョンの実装",
    topic: localize("Computer vision on the farm", "农业图像与计算机视觉", "農業現場のコンピュータビジョン"),
    motif: "vision",
  },
  {
    id: "hOwTLg4ojQg",
    index: "03",
    title: "深層学習の実践授業：Teachable Machine操作徹底ガイド",
    topic: localize("Hands-on tutorial", "实践教学", "実践チュートリアル"),
    motif: "hands-on",
  },
] as const;

export const teaching = [
  {
    period: "2025–2026",
    title: localize("Open educational resources (MAFF-commissioned)", "开放教学资源（农林水产省委托）", "オープン教材（農林水産省委託事業）"),
    text: localize(
      "Developed, recorded and produced three Japanese-language video lectures on AI in agriculture (49 min 51 s in total) for Hokkaido University's Smart Agriculture Education Hub; included in MAFF's smart-agriculture online materials.",
      "为北海道大学智能农业教育基地独立策划、录制并制作 3 部日语 AI 农业教学视频（共 49 分 51 秒），已列入农林水产省智能农业在线教材。",
      "北海道大学スマート農業教育拠点のため、農業AIに関する日本語講義動画3本（計49分51秒）を企画・収録・制作。農林水産省のスマート農業オンライン教材に収録。",
    ),
  },
  {
    period: "2024–",
    title: localize("Research co-mentor", "协助指导研究生", "研究指導補助"),
    text: localize(
      "Co-mentoring one master's student under the faculty supervisor: research planning, field and laboratory work, image analysis and presentations.",
      "在导师框架下协助指导硕士研究生 1 名：研究计划、田间与实验工作、图像分析及学术汇报。",
      "指導教員のもとで修士課程学生1名の研究を補助：研究計画、圃場・実験作業、画像解析、発表。",
    ),
  },
  {
    period: "2023",
    title: localize("JSPS “Hirameki☆Tokimeki Science” co-instructor", "JSPS「ひらめき☆ときめきサイエンス」联合讲师", "JSPS「ひらめき☆ときめきサイエンス」共同講師"),
    text: localize(
      "Hands-on plant and agricultural science activities for secondary-school students at the Field Science Center for Northern Biosphere.",
      "在北方生物圈领域科学中心面向中学生开展植物与农业科学动手实验。",
      "北方生物圏フィールド科学センターで、中高生向けに植物・農業科学の体験活動を担当。",
    ),
  },
  {
    period: "2020–2024",
    title: localize("Teaching assistant, graduate seminars", "研究生研讨课助教", "大学院セミナーTA"),
    text: localize("Hokkaido University, about 10–20 students per class.", "北海道大学，每班约 10–20 人。", "北海道大学（1クラス約10–20名）。"),
  },
  {
    period: "2012–2015",
    title: localize("Graduate teaching assistant, University of Denver", "研究生教学助理，丹佛大学", "大学院TA（デンバー大学）"),
    text: localize(
      "Independently taught undergraduate laboratory sections in English for three academic years — general, organic, analytical and inorganic chemistry and biochemistry (~30 students per section).",
      "连续 3 学年以英语独立承担本科化学实验课，涵盖普通、有机、分析、无机化学及生物化学（每班约 30 人）。",
      "3学年にわたり学部の化学実験（一般・有機・分析・無機化学、生化学）を英語で単独担当（1クラス約30名）。",
    ),
  },
] as const;

/* ------------------------------------------------------------------ */
/* Background                                                           */
/* ------------------------------------------------------------------ */

export type Track = "plant" | "industry" | "chemistry";

export const pathway = [
  { start: 2009, end: 2012, track: "chemistry", label: localize("BS, Chemistry", "化学理学学士", "学士（化学）"), place: localize("Winona State University", "Winona State University", "ウィノナ州立大学") },
  { start: 2012, end: 2015, track: "chemistry", label: localize("MS, Chemistry · bioaerosols", "化学硕士 · 生物气溶胶", "修士（化学）・バイオエアロゾル"), place: localize("University of Denver", "丹佛大学", "デンバー大学") },
  { start: 2016, end: 2017.25, track: "industry", label: localize("Quality-control manager", "质量控制经理", "品質管理マネージャー"), place: localize("YIBO Inc., USA", "YIBO Inc.（美国）", "YIBO Inc.（米国）") },
  { start: 2017.25, end: 2020.55, track: "industry", label: localize("Co-founder · technical manager", "共同创始人 · 技术负责人", "共同創業者・技術責任者"), place: localize("Food-testing laboratory, China", "食品检测实验室（中国）", "食品検査ラボ（中国）") },
  { start: 2020.6, end: 2024.72, track: "plant", label: localize("PhD · ploidy & fruit quality", "博士 · 倍性与果实品质", "博士課程・倍数性と果実品質"), place: localize("Hokkaido University", "北海道大学", "北海道大学") },
  { start: 2024.75, end: 2026.83, track: "plant", label: localize("Postdoc · phenotyping & rice", "博士后 · 表型与水稻", "学術研究員・表現型とイネ"), place: localize("Hokkaido University", "北海道大学", "北海道大学"), current: true },
] as const;

export const pathwayRange = { start: 2009, end: 2027 };

export const trackLabels: Record<Track, LocalizedText> = {
  chemistry: localize("Chemistry & analysis", "化学与分析", "化学・分析"),
  industry: localize("Testing industry", "检测行业", "検査業界"),
  plant: localize("Plant science & breeding", "植物科学与育种", "植物科学・育種"),
};

export const appointments = [
  {
    period: localize("Oct 2026 – present", "2026.10 – 至今", "2026年10月 – 現在"),
    title: localize("Postdoctoral Researcher (学術研究員)", "博士后研究员（学術研究員）", "学術研究員"),
    place: localize("Experimental Farm, Field Science Center for Northern Biosphere, Hokkaido University", "北海道大学北方生物圈领域科学中心 生物生产研究农场", "北海道大学 北方生物圏フィールド科学センター 生物生産研究農場"),
  },
  {
    period: localize("Apr – Sep 2026", "2026.04 – 2026.09", "2026年4月 – 9月"),
    title: localize("Postdoctoral Researcher (学術研究員)", "博士后研究员（学術研究員）", "学術研究員"),
    place: localize("Research Faculty of Agriculture, Hokkaido University", "北海道大学农学研究院", "北海道大学大学院農学研究院"),
  },
  {
    period: localize("Oct 2024 – Mar 2026", "2024.10 – 2026.03", "2024年10月 – 2026年3月"),
    title: localize("Postdoctoral Researcher (専門研究員, 学術研究員)", "博士后研究员（専門研究員、学術研究員）", "専門研究員・学術研究員"),
    place: localize("Field Science Center for Northern Biosphere, Hokkaido University", "北海道大学北方生物圈领域科学中心", "北海道大学 北方生物圏フィールド科学センター"),
  },
] as const;

export const education = [
  {
    year: "2024",
    degree: localize("PhD, Environmental Science", "环境科学博士", "博士（環境科学）"),
    place: localize("Graduate School of Environmental Science, Hokkaido University", "北海道大学大学院环境科学院", "北海道大学大学院環境科学院"),
    note: localize(
      "Thesis: Study on the impact of ploidy levels in shaping morphological and biochemical traits in haskap (Lonicera caerulea L. subsp. edulis). Supervisor: Prof. Yoichiro Hoshino",
      "学位论文：Study on the impact of ploidy levels in shaping morphological and biochemical traits in haskap (Lonicera caerulea L. subsp. edulis)；导师：星野洋一郎 教授",
      "博士論文：Study on the impact of ploidy levels in shaping morphological and biochemical traits in haskap (Lonicera caerulea L. subsp. edulis)（指導教員：星野洋一郎 教授）",
    ),
  },
  {
    year: "2015",
    degree: localize("MS, Chemistry", "化学硕士", "修士（化学）"),
    place: localize("University of Denver, USA", "丹佛大学（美国）", "デンバー大学（米国）"),
    note: localize(
      "Thesis: Fluorescent Biological Aerosol Particles in Coastal Canada and the Link to Atmospheric Ice Nuclei",
      "学位论文：加拿大沿海荧光生物气溶胶颗粒及其与大气冰核的关联",
      "修士論文：カナダ沿岸における蛍光性生物エアロゾル粒子と大気氷晶核との関連",
    ),
  },
  {
    year: "2012",
    degree: localize("BS, Chemistry", "化学理学学士", "学士（化学）"),
    place: localize("Winona State University, USA", "Winona State University（美国）", "ウィノナ州立大学（米国）"),
  },
  {
    year: "2011",
    degree: localize("BEng, Chemical Engineering and Technology", "化学工程与工艺工学学士", "学士（化学工学）"),
    place: localize("City College of Hebei University of Technology, China", "河北工业大学城市学院（中国）", "河北工業大学城市学院（中国）"),
  },
] as const;

export const industry = [
  {
    period: localize("Apr 2017 – Jul 2020", "2017.04 – 2020.07", "2017年4月 – 2020年7月"),
    title: localize("Co-founder, Laboratory Technical Manager and Authorized Report Signatory", "共同创始人、实验室技术负责人、检测报告授权签字人", "共同創業者・試験所技術責任者・報告書授権署名者"),
    place: localize("Hebei Tongbiao Testing Technology Co., Ltd., China", "河北通标检测技术有限公司", "河北通標検測技術有限公司（中国）"),
    text: localize(
      "Led capability building for approximately 1,480 food and related chemical test items/parameters — method verification and validation, personnel authorization and preparation for technical assessment under a quality system referencing ISO/IEC 17025; final technical review and sign-off of test reports.",
      "主导约 1,480 项食品及相关化学检测项目/参数的能力建设，包括方法验证与确认、人员授权及技术评审准备（质量体系参照 ISO/IEC 17025）；承担检测报告的最终技术复核与签发。",
      "食品および関連化学分析の約1,480項目・パラメータについて試験能力の構築を主導（方法の検証・妥当性確認、要員の認定、ISO/IEC 17025を参照した品質システムのもとでの技術審査準備）。試験報告書の最終技術審査と署名を担当。",
    ),
  },
  {
    period: localize("2016 – 2017", "2016 – 2017", "2016 – 2017"),
    title: localize("Quality Control Manager", "质量控制经理", "品質管理マネージャー"),
    place: localize("YIBO Inc., USA", "YIBO Inc.（美国）", "YIBO Inc.（米国）"),
    text: localize("Food-chemistry testing and quality-assurance work.", "食品化学检验及质量保证工作。", "食品化学分析と品質保証業務。"),
  },
] as const;

export const funding = {
  underReview: [
    {
      year: "2026",
      title: localize(
        "JSPS KAKENHI, Grant-in-Aid for Early-Career Scientists (FY2027)",
        "日本学术振兴会（JSPS）科研费 若手研究（2027 年度）",
        "科学研究費助成事業 若手研究（2027年度）",
      ),
      project: "イネ培養組織の時系列画像によるシュート形成可能性の非破壊的早期判定",
      gloss: localize(
        "Non-destructive early prediction of shoot-formation potential in rice culture tissues from time-series images",
        "基于时间序列图像的水稻培养组织成苗可能性无损早期判定",
        "",
      ),
    },
    {
      year: "2026",
      title: localize(
        "Amway Japan Foundation, research grant for sustainable agriculture (FY2027)",
        "日本安利财团 可持续农业研究资助（2027 年度）",
        "日本アムウェイ財団 持続可能な農業の未来づくり研究助成金（2027年度）",
      ),
      project: "水稲の品質選抜を支える収穫後の追加測定配分法の開発",
      gloss: localize(
        "Allocating additional post-harvest measurements to support quality selection in rice",
        "支撑水稻品质选择的收获后追加测定分配方法",
        "",
      ),
    },
  ],
  received: [
    { period: localize("Oct 2021 – Mar 2022", "2021.10 – 2022.03", "2021年10月 – 2022年3月"), title: localize("Hokkaido University DX Doctoral Fellowship", "北海道大学 DX 博士人才 Fellowship", "北海道大学 DX博士人材フェローシップ") },
    { period: localize("2020", "2020", "2020"), title: localize("JASSO Scholarship", "日本学生支援机构（JASSO）奖学金", "日本学生支援機構（JASSO）奨学金") },
    { period: localize("2012", "2012", "2012"), title: localize("University of Denver Dean's Independent Special Research Fund", "丹佛大学 Dean's Independent Special Research Fund", "デンバー大学 Dean's Independent Special Research Fund") },
  ],
};

export const service = [
  { label: localize("Peer review", "同行评审", "査読"), text: localize("BMC Plant Biology and other plant-science journals (2026 – present)", "BMC Plant Biology 及其他植物科学期刊（2026 – 至今）", "BMC Plant Biology ほか植物科学誌（2026年 – 現在）") },
  { label: localize("Memberships", "学会", "所属学会"), text: localize("Japanese Society for Horticultural Science; International Society for Horticultural Science", "日本园艺学会（JSHS）；国际园艺学会（ISHS）", "園芸学会（JSHS）、国際園芸学会（ISHS）") },
  { label: localize("Languages", "语言", "言語"), text: localize("Chinese (native); English (fluent); Japanese (professional working proficiency)", "中文（母语）；英语（流利）；日语（工作熟练）", "中国語（母語）、英語（流暢）、日本語（業務上支障なし）") },
] as const;

export const patents = [
  {
    year: "2024",
    title: localize("Preparation method for a high-specific-energy battery and the resulting battery", "一种高比能电池制备方法及高比能电池", "高比エネルギー電池の製造方法および高比エネルギー電池"),
    kind: "application",
    number: "CN117747967A",
  },
  {
    year: "2024",
    title: localize("Integrated assembly method for a flexible battery, flexible battery and wearable device", "柔性电池的一体化集成方法、柔性电池及可穿戴设备", "フレキシブル電池の一体製造方法、フレキシブル電池およびウェアラブル機器"),
    kind: "application",
    number: "CN117747955A",
  },
  {
    year: "2021",
    title: localize("Rapid detection device for histamine in food", "一种食品中组胺成分的快速检测装置", "食品中ヒスタミン成分の迅速検出装置"),
    kind: "utility",
    number: "CN212808065U",
    highlight: true,
  },
  {
    year: "2019",
    title: localize("Tool and process for removing scale from the inner wall of a circular pipe", "一种圆管内壁除垢工具及除垢工艺", "円管内壁のスケール除去工具および除去方法"),
    kind: "application",
    number: "CN109201659A",
  },
  {
    year: "2015",
    title: localize("Indoor air purifier", "室内空气净化器", "室内空気清浄機"),
    kind: "utility",
    number: "CN204460473U",
  },
  {
    year: "2015",
    title: localize("Solar street light with camera", "带摄像头的太阳能路灯", "カメラ付き太陽光街路灯"),
    kind: "utility",
    number: "CN204420843U",
  },
  {
    year: "2014",
    title: localize("Fully automatic pharmaceutical bottle inspection instrument", "全自动药瓶检测仪器", "全自動薬瓶検査装置"),
    kind: "utility",
    number: "CN203396717U",
  },
] as const;

export const patentKinds = {
  utility: localize("Granted utility model", "授权实用新型", "実用新案（登録）"),
  application: localize("Published invention-patent application", "已公开发明专利申请", "特許出願（公開）"),
};
