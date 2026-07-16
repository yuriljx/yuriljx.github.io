export type Locale = "en" | "zh" | "ja";
export type LocalizedText = Record<Locale, string>;

export const localize = (en: string, zh: string, ja: string): LocalizedText => ({ en, zh, ja });

export const profile = {
  englishName: "Jixiao Li",
  role: localize("Postdoctoral Researcher", "博士后研究员", "博士研究員"),
  affiliation: localize(
    "Graduate School of Agriculture, Hokkaido University",
    "北海道大学农学院",
    "北海道大学大学院農学院",
  ),
  email: "lijixiao327@gmail.com",
  scholarUrl: "https://scholar.google.com/citations?user=m2FLOrUAAAAJ&hl=en",
  githubUrl: "https://github.com/yuriljx",
};

export const researchFocus = [
  {
    code: "01",
    title: localize("Crop phenotyping & quality", "作物表型与品质", "作物表現型と品質"),
    description: localize(
      "Extracting interpretable crop traits from field images, experimental measurements and time series.",
      "从田间影像、实验测量与时间序列中提取可解释的作物性状。",
      "圃場画像、実験計測、時系列から解釈可能な作物形質を抽出します。",
    ),
  },
  {
    code: "02",
    title: localize("Breeding & culture systems", "育种与培养体系", "育種と培養系"),
    description: localize(
      "Investigating ploidy, anther culture and non-Mendelian recovery bias in crop breeding.",
      "关注倍性变化、花药培养与非孟德尔恢复偏倚等育种问题。",
      "倍数性、葯培養、非メンデル型回収バイアスなどの育種課題を研究します。",
    ),
  },
  {
    code: "03",
    title: localize("Research software & evidence", "研究软件与证据", "研究ソフトウェアとエビデンス"),
    description: localize(
      "Supporting research decisions with traceable data structures, audit boundaries and reproducible workflows.",
      "以可追溯数据结构、审计边界和可复现流程支撑研究判断。",
      "追跡可能なデータ構造、監査境界、再現可能なワークフローで研究判断を支えます。",
    ),
  },
] as const;

export const publications = [
  {
    year: "2026",
    title: "Feature extraction based on RGB images for rapid and non-destructive estimation of haskap fruit quality attributes",
    authors: "J. Zhang, J. Li, X. Meng, Y. Yang, Y. Lyu, Y. Hoshino",
    venue: "Postharvest Biology and Technology, 240, 114416",
    doi: "https://doi.org/10.1016/j.postharvbio.2026.114416",
    label: "Computer Vision",
    thumb: "/publications/rgb-haskap.webp",
    thumbAlt: localize("RGB feature extraction and haskap quality modelling figure", "蓝靛果 RGB 特征提取与品质建模图", "ハスカップのRGB特徴抽出と品質モデル図"),
  },
  {
    year: "2026",
    title: "Monitoring Relative Grape Berry Growth in the Field with YOLOv8 and Biology-informed Smoothing",
    authors: "J. Li, T. Sone, X. Meng, K. Hirayama, M. Ikuta, Y. Inose, Y. Hoshino",
    venue: "The Horticulture Journal, SZD-110",
    doi: "https://doi.org/10.2503/hortj.SZD-110",
    label: "Field Phenotyping",
    thumb: "/publications/grape-detection.webp",
    thumbAlt: localize("YOLOv8 detections on field grape images", "葡萄田间图像的 YOLOv8 检测结果", "圃場ブドウ画像のYOLOv8検出結果"),
  },
  {
    year: "2026",
    title: "YOLO-APPLE: Accurate Identification of Apple Cultivars Using an Improved YOLOv7 Framework",
    authors: "J. Zhang, X. Meng, J. Li, Y. Hoshino",
    venue: "The Horticulture Journal, SZD-115",
    doi: "https://doi.org/10.2503/hortj.SZD-115",
    label: "Cultivar Detection",
    thumb: "/publications/yolo-apple-framework.webp",
    thumbAlt: localize("YOLO-APPLE model framework figure", "YOLO-APPLE 模型框架图", "YOLO-APPLEモデルの構成図"),
  },
  {
    year: "2025",
    title: "Exploring the impact of ploidy levels on fruit attributes of haskap",
    authors: "J. Li, Y. Hoshino",
    venue: "Euphytica, 221(6), 74",
    doi: "https://doi.org/10.1007/s10681-025-03532-5",
    label: "Polyploid Breeding",
    thumb: "/publications/haskap-pca.webp",
    thumbAlt: localize("Principal component analysis of haskap fruit attributes", "蓝靛果果实性状主成分分析图", "ハスカップ果実形質の主成分分析図"),
  },
  {
    year: "2024",
    title: "Elucidating the impact of ploidy level on biochemical content accumulation in haskap fruits: A comprehensive approach for fruit assessment",
    authors: "J. Li, Y. Hoshino",
    venue: "Scientia Horticulturae, 327, 112831",
    doi: "https://doi.org/10.1016/j.scienta.2023.112831",
    label: "Fruit Biochemistry",
    thumb: "/publications/haskap-biochemistry.webp",
    thumbAlt: localize("Biochemical profiles of haskap fruit by ploidy", "不同倍性蓝靛果的生化谱图", "倍数性別ハスカップ果実の生化学プロファイル"),
  },
  {
    year: "2023",
    title: "Phenotypic analysis of polyploid and aneuploid haskap plants and their progeny production",
    authors: "J. Li, Y. Suzuki, Y. Hoshino",
    venue: "Euphytica, 219(5), 52",
    doi: "https://doi.org/10.1007/s10681-023-03181-6",
    label: "Plant Phenotyping",
    thumb: "/publications/haskap-flow-cytometry.webp",
    thumbAlt: localize("Flow cytometry profiles of haskap plants and progeny", "蓝靛果植株及后代的流式细胞分析图", "ハスカップ植物と後代のフローサイトメトリー図"),
  },
  {
    year: "2016",
    title: "Addressing the ice nucleating abilities of marine aerosol: A combination of deposition mode laboratory and field measurements",
    authors: "L. A. Ladino, J. D. Yakobi-Hancock, W. P. Kilthau, R. H. Mason, M. Si, J. Li, et al.",
    venue: "Atmospheric Environment, 132, 1–10",
    doi: "https://doi.org/10.1016/j.atmosenv.2016.02.028",
    label: "Atmospheric Chemistry",
    thumb: "/publications/marine-aerosol-map.webp",
    thumbAlt: localize("Marine aerosol sampling and measurement locations", "海洋气溶胶采样与测量位置图", "海洋エアロゾルの採取・測定地点図"),
  },
  {
    year: "2015",
    title: "Ice nucleating particles at a coastal marine boundary layer site: correlations with aerosol type and meteorological conditions",
    authors: "R. H. Mason, M. Si, J. Li, C. Chou, R. Dickie, D. Toom-Sauntry, et al.",
    venue: "Atmospheric Chemistry and Physics, 15(21), 12547–12566",
    doi: "https://doi.org/10.5194/acp-15-12547-2015",
    label: "Bioaerosol",
    thumb: "/publications/ice-nuclei-microscopy.webp",
    thumbAlt: localize("Microscopy figure of ice-nucleating aerosol particles", "冰核气溶胶颗粒显微图", "氷核エアロゾル粒子の顕微鏡図"),
  },
] as const;

export const presentations = [
  {
    year: "2025",
    event: localize("10th China International AI Summit and Computing Power & Algorithms Conference (CIAI)", "第十届中国国际人工智能峰会暨算力算法大会（CIAI）", "第10回中国国際AIサミット・計算力アルゴリズム大会（CIAI）"),
    title: localize("An end-to-end AI pipeline for computational metabolomics in food quality assessment", "用于食品质量评估的计算代谢组学端到端 AI 管线", "食品品質評価のための計算メタボロミクス・エンドツーエンドAIパイプライン"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2024",
    event: localize("15th International Conference on Systems Biology (ISB)", "第十五届国际计算系统生物学会议（ISB）", "第15回国際システム生物学会議（ISB）"),
    title: localize("Multimodal machine learning of fruit soluble solids and organic acids from field images and time series", "基于田间图像和时间序列的多模态机器学习预测果实糖度与有机酸", "圃場画像と時系列を用いた果実糖度・有機酸のマルチモーダル機械学習"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2023",
    event: localize("103rd Annual Meeting of the Chemical Society of Japan (CSJ)", "第 103 届日本化学会（CSJ）年会", "日本化学会第103春季年会（CSJ）"),
    title: localize("Activated MSTFA silylation for enhanced GC–MS quantification of phenols and organic acids in plant matrices", "活化 MSTFA 硅烷化反应增强植物基质中酚类和有机酸的 GC–MS 定量分析", "活性化MSTFAシリル化による植物マトリックス中フェノール類・有機酸のGC–MS定量強化"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2022",
    event: localize("Autumn Meeting of the Japanese Society for Horticultural Science (JSHS)", "日本园艺学会（JSHS）秋季会议", "園芸学会（JSHS）秋季大会"),
    title: localize("GC–MS analysis of sugars and organic acids in polyploid haskap fruit", "多倍体蓝靛果果实中糖类和有机酸的 GC–MS 分析", "倍数性ハスカップ果実における糖・有機酸のGC–MS分析"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2020",
    event: localize("3rd International Conference on Agriculture, Food and Biotechnology (ICAFB)", "第三届农业、食品与生物技术国际会议（ICAFB）", "第3回農業・食品・バイオテクノロジー国際会議（ICAFB）"),
    title: localize("Coupled effects of soil trace-element transfer on flavor-metabolite fingerprints and co-accumulation of toxic elements in specialty crops", "土壤微量元素转移对特种作物风味代谢指纹图谱及有毒元素共积累的耦合效应", "土壌微量元素移行が特殊作物の風味代謝フィンガープリントと有害元素共蓄積に及ぼす連関効果"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2018",
    event: localize("31st Chinese Chemical Society Congress (CCS)", "第31届中国化学会（CCS）年会", "第31回中国化学会年会（CCS）"),
    title: localize("Rapid HPLC–MS quantification of free amino acids in tea infusions: method optimization and validation", "茶汤中游离氨基酸的快速 HPLC–MS 定量：方法优化与验证", "茶抽出液中遊離アミノ酸の迅速HPLC–MS定量：分析法の最適化と妥当性確認"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2017",
    event: localize("3rd International Conference on Chemical Materials and Process (ICCMP)", "第三届化学材料与工艺国际会议（ICCMP）", "第3回化学材料・プロセス国際会議（ICCMP）"),
    title: localize("Headspace gas chromatographic determination of benzene-series VOCs released from cigarette filters: equilibrium kinetics and sensitivity analysis", "顶空气相色谱法测定卷烟滤嘴释放的苯系挥发性有机物：平衡动力学与灵敏度分析", "たばこフィルターから放出されるベンゼン系VOCのヘッドスペースGC定量：平衡動力学と感度解析"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2015",
    event: localize("249th ACS National Meeting", "第249届美国化学会（ACS）全国会议", "第249回米国化学会（ACS）全国大会"),
    title: localize("Multi-instrument characterization of marine bioaerosols and their links to cloud and precipitation processes", "多仪器表征海洋生物气溶胶及其与云和降水过程的联系", "複数機器による海洋バイオエアロゾルの特性評価と雲・降水過程との関連"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2014",
    event: localize("247th ACS National Meeting", "第247届美国化学会（ACS）全国会议", "第247回米国化学会（ACS）全国大会"),
    title: localize("A controlled pollen aerosolization apparatus for laboratory ice nucleation and optical measurements", "用于实验室冰成核与光学测量的可控花粉气溶胶发生装置", "実験室での氷核生成・光学測定に用いる制御型花粉エアロゾル発生装置"),
    format: localize("Poster presentation", "海报发表", "ポスター発表"),
  },
  {
    year: "2012",
    event: localize("Minnesota State Science and Engineering Fair", "明尼苏达州科学与工程博览会", "ミネソタ州科学工学フェア"),
    title: localize("Differential effects and mechanisms of regional soil microbial communities on the degradation of plasticized polylactic acid (PLA)", "不同地区土壤微生物群落对增塑聚乳酸（PLA）降解的差异性影响与机制", "地域別土壌微生物群集が可塑化ポリ乳酸（PLA）の分解に及ぼす差異と機構"),
    format: localize("Oral presentation", "口头报告", "口頭発表"),
  },
  {
    year: "2011",
    event: localize("Minnesota State Science and Engineering Fair", "明尼苏达州科学与工程博览会", "ミネソタ州科学工学フェア"),
    title: localize("Effects of plasticizer type on degradation behavior and efficiency of polylactic acid (PLA) films in simulated soil environments", "增塑剂类型对模拟土壤环境中聚乳酸（PLA）薄膜降解行为与效率的影响", "可塑剤の種類が模擬土壌環境におけるポリ乳酸（PLA）フィルムの分解挙動と効率に及ぼす影響"),
    format: localize("Poster presentation", "海报发表", "ポスター発表"),
  },
] as const;

export const softwareProjects = [
  {
    slug: "rice-dh-record",
    title: "Rice DH Record System",
    subtitle: localize("Anther-culture records and lineage tracking", "花药培养实验记录与谱系追踪", "葯培養記録と系譜追跡"),
    status: "LOCAL APPLICATION · v0.5.12",
    description: localize(
      "A traceable workflow for sowing, panicle collection, cold treatment, anther culture, regeneration and ploidy determination, with planned and observed values linked to source batches.",
      "围绕播种、采穗、低温处理、花药培养、再生与倍性判定组织实验记录，并将计划值、实际值和来源批次保留在同一条可追溯链路中。",
      "播種、穂採取、低温処理、葯培養、再分化、倍数性判定を一つの追跡可能な流れに整理し、計画値・実測値・由来ロットを関連付けます。",
    ),
    features: ["Plan vs actual", "Lineage", "Inventory", "Local SQLite"],
    link: null,
    visuals: [
      { kind: "image", src: "/software/p2/dashboard.png", alt: localize("Rice DH record system dashboard", "水稻 DH 实验记录系统首页", "イネDH実験記録システムのダッシュボード"), caption: localize("Workflow dashboard and local operating boundary", "工作流首页与本地运行边界", "ワークフロー概要とローカル運用範囲"), aspect: "2.16", mask: "record-brand", position: "center 48%" },
      { kind: "image", src: "/software/p2/workflow.png", alt: localize("Anther batches and culture treatment arms", "花药批次与培养处理臂界面", "葯ロットと培養処理群の画面"), caption: localize("Anther batches, source panicles and culture arms", "花药批次、来源穗批次与培养处理臂", "葯ロット、由来穂ロット、培養処理群"), aspect: "2.16", mask: "record-brand", position: "center 48%" },
      { kind: "image", src: "/software/p2/lineage.png", alt: localize("Lineage query interface", "谱系查询界面", "系譜検索画面"), caption: localize("Upstream and downstream lineage by core ID", "按核心 ID 检索上游与下游谱系", "コアIDによる上流・下流系譜の検索"), aspect: "2.16", mask: "record-brand", position: "center 48%" },
    ],
  },
  {
    slug: "genome-finder",
    title: "Rice Genome Resource Finder",
    subtitle: localize("Public rice genome discovery and audit", "水稻公共基因组资源筛选与审计", "イネ公開ゲノム資源の探索と監査"),
    status: "INTERNAL BETA · v7.9.8",
    description: localize(
      "Searches NCBI Assembly, SRA, BioSample, ENA and DDBJ from cultivar names and aliases, merges duplicate accessions and exports an audit workbook with retained evidence and warnings.",
      "从品种名与别名出发，跨 NCBI Assembly、SRA、BioSample、ENA 与 DDBJ 检索公开资源，合并重复 accession，并输出保留证据与警告的审计工作簿。",
      "品種名と別名からNCBI Assembly、SRA、BioSample、ENA、DDBJを横断検索し、重複アクセッションを統合して、根拠と警告を保持した監査ワークブックを出力します。",
    ),
    features: ["Alias expansion", "Multi-source search", "Identity evidence", "Audit workbook"],
    link: null,
    visuals: [
      { kind: "image", src: "/software/genome/overview.png", alt: localize("Rice genome resource finder home screen", "水稻基因组资源检索工具首页", "イネゲノム資源検索ツールのホーム画面"), caption: localize("Input template, database scope and operating boundary", "输入模板、数据库范围与工具边界", "入力テンプレート、データベース範囲、ツール境界"), aspect: "1.78", crop: "genome-ui", position: "center 49%" },
      { kind: "image", src: "/software/genome/options.png", alt: localize("Rice genome resource search options", "水稻基因组资源筛选参数", "イネゲノム資源の検索オプション"), caption: localize("Connectors, platform compatibility and conservative ranking", "连接器、平台兼容性与保守排序逻辑", "コネクタ、プラットフォーム互換性、保守的ランキング"), aspect: "1.78", crop: "genome-ui", position: "center 51%" },
      { kind: "panel", panel: "audit-workbook", caption: localize("Output structure: summary, candidates, input QC and source audit", "输出结构：摘要、候选、输入质控与来源审计", "出力構造：概要、候補、入力QC、情報源監査") },
    ],
  },
  {
    slug: "trait-explorer",
    title: "Rice Trait Evidence Explorer",
    subtitle: localize("Evidence-indexed rice cultivar traits", "水稻品种性状证据库", "根拠に紐づくイネ品種形質データベース"),
    status: "LOCAL EVIDENCE TOOL · v0.8.4",
    description: localize(
      "Brings cultivar cards, trait search, source tracking, pairwise comparison, coverage metrics and curation queues into one local evidence interface.",
      "将品种卡、性状检索、来源追踪、双品种对比、数据覆盖率与校订队列集中到一个本地证据界面。",
      "品種カード、形質検索、出典追跡、二品種比較、カバレッジ指標、キュレーション・キューを一つのローカル画面に統合します。",
    ),
    features: ["Cultivar cards", "Evidence comparison", "Source tracking", "Curation queue"],
    link: null,
    visuals: [
      { kind: "image", src: "/software/trait/home.png", alt: localize("Rice trait evidence search interface", "水稻性状证据检索界面", "イネ形質エビデンス検索画面"), caption: localize("Cultivar search, trait coverage and evidence scale", "品种检索、性状覆盖与证据规模", "品種検索、形質カバレッジ、エビデンス規模"), aspect: "2.16", crop: "trait-home", position: "center 58%" },
      { kind: "image", src: "/software/trait/dashboard.png", alt: localize("Rice trait data coverage dashboard", "水稻性状数据覆盖概览", "イネ形質データのカバレッジ画面"), caption: localize("Coverage, gaps and priorities for the next data cycle", "覆盖率、缺口和下一轮数据补充优先级", "カバレッジ、欠落、次回データ補充の優先順位"), aspect: "2.16", crop: "trait-top", position: "center 54%" },
      { kind: "image", src: "/software/trait/compare.png", alt: localize("Evidence comparison between two rice cultivars", "两个水稻品种的证据对比", "二つのイネ品種のエビデンス比較"), caption: localize("Trait-level evidence comparison for Yumepirika and Koshihikari", "Yumepirika 与越光的逐性状证据对比", "ゆめぴりかとコシヒカリの形質別エビデンス比較"), aspect: "2.16", crop: "trait-top", position: "center 54%" },
    ],
  },
  {
    slug: "riceperturbnet",
    title: "RicePerturbNet",
    subtitle: localize("Public-data integration and candidate evidence tiers", "公共数据整合与候选证据分层", "公開データ統合と候補エビデンス階層"),
    status: "INTERNAL RESEARCH FRAMEWORK",
    description: localize(
      "Integrates public transcriptomes, reproductive-tissue context, regulatory priors and external evidence to stratify and audit candidate relationships.",
      "整合公开转录组、繁殖组织语境、调控因子先验与外部证据，对候选关系进行分层与审计。",
      "公開トランスクリプトーム、生殖組織コンテキスト、制御因子の事前情報、外部根拠を統合し、候補関係を階層化・監査します。",
    ),
    features: ["Public data", "Cell-type context", "Evidence tiers", "Claim gates"],
    link: null,
    visuals: [
      { kind: "image", src: "/software/riceperturb/framework.png", alt: localize("RicePerturbNet research framework", "RicePerturbNet 研究框架", "RicePerturbNet研究フレームワーク"), caption: localize("From public data to candidates, evaluation gates and evidence gaps", "从公开数据到候选层、评估门与证据缺口", "公開データから候補、評価ゲート、エビデンス欠落まで"), aspect: "1.53", position: "center" },
      { kind: "image", src: "/software/riceperturb/candidate-network.png", alt: localize("Candidate network and evidence summary", "候选关系网络与证据摘要", "候補ネットワークとエビデンス概要"), caption: localize("Context-limited candidate relationships and evidence tiers", "限定语境的候选关系与证据层级", "文脈を限定した候補関係とエビデンス階層"), aspect: "1.27", position: "center" },
      { kind: "image", src: "/software/riceperturb/evidence-gaps.png", alt: localize("Evidence tiers and gaps for candidate directions", "候选方向的证据层与缺口", "候補方向のエビデンス階層と欠落"), caption: localize("Evidence layers, uncovered sources and explicit claim limits", "证据层、未覆盖来源与明确的声明边界", "エビデンス層、未収載ソース、明示的な主張限界"), aspect: "1.49", position: "center" },
    ],
  },
  {
    slug: "stride-dh",
    title: "STRIDE-DH",
    subtitle: localize("Recovery-bias framework for rice anther-culture DH populations", "水稻花药培养 DH 群体恢复偏倚框架", "イネ葯培養DH集団の回収バイアス・フレームワーク"),
    status: "CONDITIONAL FEASIBILITY · v0.1.1",
    description: localize(
      "A falsifiable endpoint framework for non-Mendelian allelic recovery in anther-culture-derived rice doubled-haploid populations, with sample-dependence and data-availability audits.",
      "围绕水稻花药培养来源加倍单倍体群体中的非孟德尔等位恢复，建立可证伪的终点净恢复偏倚模型，并审计样本依赖与数据可用性。",
      "葯培養由来イネ倍加半数体集団における非メンデル型対立遺伝子回収について、検証可能な終点モデルを構築し、サンプル依存性とデータ可用性を監査します。",
    ),
    features: ["Public-matrix QC", "Recovery bias", "Dependence audit", "Reproducible tests"],
    link: null,
    visuals: [
      { kind: "panel", panel: "stride-inventory", caption: localize("Two public matrices acquired and structurally verified", "已获取并结构核验的两套公开矩阵", "取得・構造確認済みの二つの公開行列") },
      { kind: "panel", panel: "stride-dependence", caption: localize("Sun 2023 sample-dependence audit", "Sun 2023 样本依赖审计", "Sun 2023サンプル依存性監査") },
      { kind: "panel", panel: "stride-smoke", caption: localize("QC smoke test on a bundled synthetic fixture", "内置合成夹具的 QC 烟雾测试", "同梱合成フィクスチャによるQCスモークテスト") },
    ],
  },
  {
    slug: "grape-length",
    title: "Grape Length",
    subtitle: localize("Field monitoring of grape berry growth", "田间葡萄果粒生长监测", "圃場におけるブドウ果粒成長モニタリング"),
    status: "PUBLIC REPOSITORY",
    description: localize(
      "Estimates relative berry size from field images with scale references, constructs sample-level time series and applies biology-informed smoothing to reduce detection noise.",
      "用带尺度参照的田间影像估计果粒相对尺寸，构建跨日期的样本时间序列，并通过生物学约束平滑减少检测波动。",
      "スケール参照を含む圃場画像から果粒の相対サイズを推定し、個体別時系列を構築して、生物学的制約を用いた平滑化により検出ノイズを抑えます。",
    ),
    features: ["Object detection", "Scale reference", "Time series", "Biological smoothing"],
    link: "https://github.com/yuriljx/Grape_Length",
    visuals: [
      { kind: "image", src: "/software/grape/detection-results.webp", alt: localize("YOLO detections of individual grape berries", "逐颗葡萄果粒的 YOLO 检测框", "個々のブドウ果粒に対するYOLO検出枠"), caption: localize("Individual berry detections with confidence-labelled bounding boxes", "逐颗果粒的检测框与置信度标签", "各果粒のバウンディングボックスと信頼度ラベル"), aspect: "2.22", crop: "detection", position: "center 52%" },
      { kind: "image", src: "/software/grape/mature-stage.webp", alt: localize("Mature-stage field image of grape sample Z5", "葡萄 Z5 样本成熟期田间图像", "ブドウZ5サンプルの成熟期圃場画像"), caption: localize("Mature-stage field image with scale and colour references", "成熟期田间影像，保留尺度与色彩参照", "スケール・色参照を含む成熟期圃場画像"), aspect: "1.65", position: "center" },
      { kind: "image", src: "/software/grape/growth-curve.png", alt: localize("Time series of mean grape berry diameter", "葡萄平均果粒直径时间序列", "ブドウ平均果粒径の時系列"), caption: localize("Mean berry diameter and biology-informed smoothing", "平均果粒直径与生物学约束平滑", "平均果粒径と生物学的制約による平滑化"), aspect: "1.55", position: "center" },
    ],
  },
] as const;

export const researchProjects = [
  {
    code: "A",
    title: localize("Ploidy, fruit phenotype and biochemical quality", "倍性、果实表型与生化品质", "倍数性、果実表現型、生化学的品質"),
    description: localize("Connecting ploidy variation in haskap with fruit morphology, sugars, organic acids and related quality traits.", "围绕蓝靛果倍性变化，连接果实形态、糖与有机酸等品质信息。", "ハスカップの倍数性変異を、果実形態、糖、有機酸などの品質形質と結び付けます。"),
    tags: ["Ploidy", "Fruit quality", "GC–MS"],
  },
  {
    code: "B",
    title: localize("Field vision and non-destructive estimation", "田间视觉与非破坏估计", "圃場ビジョンと非破壊推定"),
    description: localize("Applying object detection, RGB features and time series to phenotyping in grapes, apples and haskap.", "将目标检测、RGB 特征和时间序列用于葡萄、苹果及蓝靛果的表型研究。", "物体検出、RGB特徴、時系列をブドウ、リンゴ、ハスカップの表現型研究に応用します。"),
    tags: ["Computer vision", "Time series", "Field imaging"],
  },
  {
    code: "C",
    title: localize("Rice culture systems and experimental provenance", "水稻培养体系与实验数据链", "イネ培養系と実験プロヴェナンス"),
    description: localize("Structuring anther culture, source batches, treatment arms and ploidy determination as traceable experimental records.", "把花药培养、批次来源、处理臂和倍性判定组织为可追溯的实验记录。", "葯培養、由来ロット、処理群、倍数性判定を追跡可能な実験記録として構造化します。"),
    tags: ["Anther culture", "DH", "Provenance"],
  },
  {
    code: "D",
    title: localize("Public omics data and claim control", "公共组学数据与声明控制", "公開オミクスデータと主張制御"),
    description: localize("Defining what public-data integration, candidate evidence tiers and sample-dependence audits can and cannot support.", "在水稻公共数据整合、候选证据分层和样本依赖审计中明确可支持与不可支持的结论。", "公開データ統合、候補エビデンス階層、サンプル依存性監査が支持できる主張とできない主張を明確にします。"),
    tags: ["Public data", "Evidence audit", "Reproducibility"],
  },
] as const;
