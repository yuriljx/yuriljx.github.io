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

export const patents = [
  {
    year: "2024",
    title: localize(
      "Preparation method for a high-specific-energy battery and the resulting battery",
      "一种高比能电池制备方法及高比能电池",
      "高比エネルギー電池の製造方法および高比エネルギー電池",
    ),
    type: localize("Patent publication", "发明专利公开", "発明特許公開"),
    publicationNumber: "CN117747967A",
    inventors: localize(
      "Xiaokun Zhang; Chunyue Li; Zhangling Li; Jixiao Li; Guo Wang; Fei Li; Yong Xiang",
      "张晓琨；李春月；李彰凌；李继潇；王果；李飞；向勇",
      "Xiaokun Zhang; Chunyue Li; Zhangling Li; Jixiao Li; Guo Wang; Fei Li; Yong Xiang",
    ),
    link: "https://patents.google.com/patent/CN117747967A",
  },
  {
    year: "2024",
    title: localize(
      "Integrated assembly method for a flexible battery, flexible battery and wearable device",
      "柔性电池的一体化集成方法、柔性电池及可穿戴设备",
      "フレキシブル電池の一体製造方法、フレキシブル電池およびウェアラブル機器",
    ),
    type: localize("Patent publication", "发明专利公开", "発明特許公開"),
    publicationNumber: "CN117747955A",
    inventors: localize(
      "Xiaokun Zhang; Jixiao Li; Xinyan Luo; Zhangling Li; Weili Liao; Fei Li; Yong Xiang",
      "张晓琨；李继潇；骆鑫妍；李彰凌；廖微莉；李飞；向勇",
      "Xiaokun Zhang; Jixiao Li; Xinyan Luo; Zhangling Li; Weili Liao; Fei Li; Yong Xiang",
    ),
    link: "https://patents.google.com/patent/CN117747955A",
  },
  {
    year: "2021",
    title: localize(
      "Rapid detection device for histamine in food",
      "一种食品中组胺成分的快速检测装置",
      "食品中ヒスタミン成分の迅速検出装置",
    ),
    type: localize("Utility model", "实用新型", "実用新案"),
    publicationNumber: "CN212808065U",
    inventors: localize(
      "Jixiao Li; Hui Gao; Zhihong Fan; Yakun Hao",
      "李继潇；高慧；樊志宏；郝雅坤",
      "Jixiao Li; Hui Gao; Zhihong Fan; Yakun Hao",
    ),
    link: "https://patents.google.com/patent/CN212808065U",
  },
  {
    year: "2019",
    title: localize(
      "Tool and process for removing scale from the inner wall of a circular pipe",
      "一种圆管内壁除垢工具及除垢工艺",
      "円管内壁のスケール除去工具および除去方法",
    ),
    type: localize("Patent publication", "发明专利公开", "発明特許公開"),
    publicationNumber: "CN109201659A",
    inventors: localize(
      "Ying Li; Tiegang Hu; Jingyi Wei; Baochun Yao; Xiaofeng Jiang; Baoqing Xue; Kaifeng Li; Shuchang Hua; Qibao Guo; Jian Li; Xiaojun Zhong; Jixiao Li",
      "李颖；胡铁刚；魏靖依；姚保春；姜晓峰；薛宝庆；李凯锋；桦树常；郭启宝；李见；钟晓军；李继潇",
      "Ying Li; Tiegang Hu; Jingyi Wei; Baochun Yao; Xiaofeng Jiang; Baoqing Xue; Kaifeng Li; Shuchang Hua; Qibao Guo; Jian Li; Xiaojun Zhong; Jixiao Li",
    ),
    link: "https://patents.google.com/patent/CN109201659A",
  },
  {
    year: "2015",
    title: localize("Indoor air purifier", "室内空气净化器", "室内空気清浄機"),
    type: localize("Utility model", "实用新型", "実用新案"),
    publicationNumber: "CN204460473U",
    inventors: localize(
      "Jie Xiao; Jixiao Li; Chengjun You; Jianghua Chen",
      "肖杰；李继潇；游成军；陈江华",
      "Jie Xiao; Jixiao Li; Chengjun You; Jianghua Chen",
    ),
    link: "https://patents.google.com/patent/CN204460473U",
  },
  {
    year: "2015",
    title: localize("Solar street light with camera", "带摄像头的太阳能路灯", "カメラ付き太陽光街路灯"),
    type: localize("Utility model", "实用新型", "実用新案"),
    publicationNumber: "CN204420843U",
    inventors: localize(
      "Jixiao Li; Qing Lin; Wenbo Si; Jianghua Chen",
      "李继潇；林庆；司文博；陈江华",
      "Jixiao Li; Qing Lin; Wenbo Si; Jianghua Chen",
    ),
    link: "https://patents.google.com/patent/CN204420843U",
  },
  {
    year: "2014",
    title: localize(
      "Fully automatic pharmaceutical bottle inspection instrument",
      "全自动药瓶检测仪器",
      "全自動薬瓶検査装置",
    ),
    type: localize("Utility model", "实用新型", "実用新案"),
    publicationNumber: "CN203396717U",
    inventors: localize("Jixiao Li", "李继潇", "Jixiao Li"),
    link: "https://patents.google.com/patent/CN203396717U",
  },
] as const;

export const softwareProjects = [
  {
    slug: "rice-dh-record",
    title: "Rice DH Record System",
    subtitle: localize("Anther-culture records and lineage tracking", "花药培养实验记录与谱系追踪", "葯培養記録と系譜追跡"),
    status: "LOCAL RESEARCH SYSTEM · v0.7.2",
    description: localize(
      "A traceable workflow for sowing, panicle collection, cold treatment, anther culture, regeneration and ploidy determination, with planned and observed values linked to source batches.",
      "围绕播种、采穗、低温处理、花药培养、再生与倍性判定组织实验记录，并将计划值、实际值和来源批次保留在同一条可追溯链路中。",
      "播種、穂採取、低温処理、葯培養、再分化、倍数性判定を一つの追跡可能な流れに整理し、計画値・実測値・由来ロットを関連付けます。",
    ),
    features: ["Plan vs actual", "Lineage", "Inventory", "Local SQLite"],
    link: "https://github.com/yuriljx/rice-dh-record-system-showcase",
    visuals: [
      { kind: "image", src: "/software/rice-dh/workflow-overview.png", alt: localize("Synthetic overview of the traceable rice DH workflow", "可追溯水稻 DH 工作流的合成概览", "追跡可能なイネDHワークフローの合成概要"), caption: localize("Workflow stages, checkpoints and handoffs", "工作流阶段、检查点与交接", "ワークフロー段階、チェックポイント、引き継ぎ"), aspect: "1.667", position: "center" },
      { kind: "image", src: "/software/rice-dh/research-dashboard.png", alt: localize("Synthetic operating dashboard for rice DH records", "水稻 DH 记录系统的合成操作面板", "イネDH記録システムの合成運用ダッシュボード"), caption: localize("Plans, material status and QC alerts in one operational view", "在同一操作视图中汇总计划、材料状态与质控提醒", "計画、材料状態、QC通知を一つの運用画面に集約"), aspect: "1.667", position: "center" },
      { kind: "image", src: "/software/rice-dh/lineage-evidence.png", alt: localize("Synthetic lineage and evidence view for rice DH materials", "水稻 DH 材料的合成谱系与证据视图", "イネDH材料の合成系譜・証拠画面"), caption: localize("Source-to-outcome lineage with recorded evidence", "从来源到结果的谱系及其记录证据", "由来源から結果までの系譜と記録証拠"), aspect: "1.667", position: "center" },
    ],
  },
  {
    slug: "callustrack",
    title: "CallusTrack",
    subtitle: localize("Longitudinal callus annotation and quality review", "愈伤组织时序标注与质量复核", "カルスの時系列アノテーションと品質レビュー"),
    status: "LOCAL ANNOTATION SYSTEM · v0.5.0",
    description: localize(
      "A local annotation system that preserves object identity across culture-image sequences, supports editable instance masks and review states, and exports traceable masks, tables and quality overlays.",
      "面向培养图像序列的本地标注系统，在跨时点保留对象身份，支持可编辑实例掩膜与审查状态，并导出可追溯的掩膜、表格和质量叠加图。",
      "培養画像系列で対象の同一性を時系列に保持するローカル注釈システム。編集可能なインスタンスマスクとレビュー状態を管理し、追跡可能なマスク、表、品質オーバーレイを出力します。",
    ),
    features: ["Persistent IDs", "Editable masks", "Review states", "Controlled export"],
    link: "https://github.com/yuriljx/callustrack-showcase",
    visuals: [
      { kind: "image", src: "/software/callustrack/annotation-workspace.png", alt: localize("Synthetic CallusTrack workspace with persistent callus labels", "带持续愈伤组织标签的合成 CallusTrack 工作区", "カルス継続ラベルを備えた合成CallusTrack画面"), caption: localize("Persistent labels, mask review and frame-by-frame state", "持续追踪标签、掩膜复核与逐帧状态", "継続追跡ラベル、マスク確認、フレーム別状態"), aspect: "1.667", position: "center" },
      { kind: "image", src: "/software/callustrack/review-matrix.png", alt: localize("Synthetic CallusTrack human review matrix", "合成 CallusTrack 人工复核矩阵", "合成CallusTrack人手レビュー行列"), caption: localize("Human review matrix and explicit QC states", "人工复核矩阵与明确的质控状态", "人手レビュー行列と明示的なQC状態"), aspect: "1.667", position: "center" },
      { kind: "image", src: "/software/callustrack/controlled-export.png", alt: localize("Synthetic CallusTrack controlled export view", "合成 CallusTrack 受控导出视图", "合成CallusTrack管理付き出力画面"), caption: localize("Controlled export of masks, tables, manifests and QC overlays", "掩膜、表格、清单与质控叠加图的受控导出", "マスク、表、マニフェスト、QCオーバーレイの管理付き出力"), aspect: "1.667", position: "center" },
    ],
  },
  {
    slug: "genome-finder",
    title: "Rice Genome Resource Finder",
    subtitle: localize("Public rice genome discovery and audit", "水稻公共基因组资源筛选与审计", "イネ公開ゲノム資源の探索と監査"),
    status: "LOCAL RESEARCH UTILITY · v7.14.0",
    description: localize(
      "Searches NCBI Assembly, SRA, BioSample, ENA and DDBJ from cultivar names and aliases, merges duplicate accessions and exports an audit workbook with retained evidence and warnings.",
      "从品种名与别名出发，跨 NCBI Assembly、SRA、BioSample、ENA 与 DDBJ 检索公开资源，合并重复 accession，并输出保留证据与警告的审计工作簿。",
      "品種名と別名からNCBI Assembly、SRA、BioSample、ENA、DDBJを横断検索し、重複アクセッションを統合して、根拠と警告を保持した監査ワークブックを出力します。",
    ),
    features: ["Alias expansion", "Multi-source search", "Identity evidence", "Audit workbook"],
    link: "https://github.com/yuriljx/rice-genome-resource-finder-showcase",
    visuals: [
      { kind: "image", src: "/software/genome/interface-overview.png", alt: localize("Synthetic interface overview for rice genome resource discovery", "水稻基因组资源检索的合成界面概览", "イネゲノム資源探索の合成画面概要"), caption: localize("Input scope, source coverage and conservative screening", "输入范围、来源覆盖与保守筛选", "入力範囲、情報源カバレッジ、保守的スクリーニング"), aspect: "1.778", position: "center" },
      { kind: "image", src: "/software/genome/search-options.png", alt: localize("Synthetic search options for public rice genome resources", "公共水稻基因组资源的合成搜索选项", "公開イネゲノム資源の合成検索条件"), caption: localize("Alias-aware connectors and explicit search controls", "别名感知连接器与明确的搜索控制", "別名対応コネクタと明示的な検索制御"), aspect: "1.778", position: "center" },
      { kind: "image", src: "/software/genome/audit-output.png", alt: localize("Synthetic audit output from the rice genome resource finder", "水稻基因组资源检索工具的合成审计输出", "イネゲノム資源検索ツールの合成監査出力"), caption: localize("Candidates, input QC, provenance and retained warnings", "候选结果、输入质控、来源与保留警告", "候補、入力QC、来歴、保持された警告"), aspect: "1.778", position: "center" },
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
    link: "https://github.com/yuriljx/rice-trait-evidence-explorer-showcase",
    visuals: [
      { kind: "image", src: "/software/trait/evidence-overview.png", alt: localize("Synthetic rice trait evidence overview", "合成水稻性状证据概览", "合成イネ形質エビデンス概要"), caption: localize("Cultivar records, evidence status and source provenance", "品种记录、证据状态与来源追踪", "品種記録、エビデンス状態、出典来歴"), aspect: "1.778", position: "center" },
      { kind: "image", src: "/software/trait/comparison-panel.png", alt: localize("Synthetic comparison of rice trait evidence", "合成水稻性状证据对比", "合成イネ形質エビデンス比較"), caption: localize("Trait-level comparison with explicit evidence states", "带明确证据状态的逐性状对比", "明示的なエビデンス状態を伴う形質別比較"), aspect: "1.778", position: "center" },
      { kind: "image", src: "/software/trait/coverage-dashboard.png", alt: localize("Synthetic rice trait evidence coverage dashboard", "合成水稻性状证据覆盖面板", "合成イネ形質エビデンス・カバレッジ画面"), caption: localize("Coverage, gaps and curation priorities", "覆盖范围、证据缺口与校订优先级", "カバレッジ、欠落、キュレーション優先順位"), aspect: "1.778", position: "center" },
    ],
  },
  {
    slug: "riceperturbnet",
    title: "RicePerturbNet",
    subtitle: localize("Claim-calibrated evidence integration", "声明边界校准的证据整合", "主張境界を校正したエビデンス統合"),
    status: "PRIVATE DEVELOPMENT · v0.16.0.dev2",
    description: localize(
      "A private-development framework that organizes public and synthetic evidence by provenance, source identity, biological context and analysis unit, with explicit claim-boundary checks.",
      "一个处于私有开发阶段的框架，按来源追踪、数据源身份、生物学语境与分析单元组织公共和合成证据，并显式检查声明边界。",
      "非公開で開発中のフレームワーク。公開・合成エビデンスを来歴、情報源同一性、生物学的文脈、解析単位で整理し、主張境界を明示的に確認します。",
    ),
    features: ["Evidence registry", "Context resolution", "Source QC", "Claim boundaries"],
    link: "https://github.com/yuriljx/riceperturbnet-showcase",
    visuals: [
      { kind: "image", src: "/software/riceperturb/architecture-overview.png", alt: localize("Synthetic RicePerturbNet architecture overview", "合成 RicePerturbNet 架构概览", "合成RicePerturbNetアーキテクチャ概要"), caption: localize("Evidence registry, context resolution and bounded outputs", "证据登记、语境解析与有边界的输出", "エビデンス登録、文脈解決、境界付き出力"), aspect: "1.778", position: "center" },
      { kind: "image", src: "/software/riceperturb/scope-boundaries.png", alt: localize("Synthetic RicePerturbNet scope and claim boundaries", "合成 RicePerturbNet 范围与声明边界", "合成RicePerturbNetの範囲・主張境界"), caption: localize("Explicit boundary between documentation and scientific claims", "明确区分文档输出与科学声明", "文書化と科学的主張の境界を明示"), aspect: "1.778", position: "center" },
      { kind: "image", src: "/software/riceperturb/pca-qc-public-data.png", alt: localize("PCA quality-control example using public data", "使用公共数据的 PCA 质量控制示例", "公開データを用いたPCA品質管理例"), caption: localize("Public-data PCA used only as a quality-control example", "仅作为质量控制示例的公共数据 PCA", "品質管理例に限定した公開データPCA"), aspect: "1.273", position: "center" },
    ],
  },
  {
    slug: "stride-dh",
    title: "STRIDE-DH",
    subtitle: localize("Recovery-bias framework for rice anther-culture DH populations", "水稻花药培养 DH 群体恢复偏倚框架", "イネ葯培養DH集団の回収バイアス・フレームワーク"),
    status: "SYNTHETIC VALIDATION · v0.2.0",
    description: localize(
      "A private-source methodological framework for linkage-aware investigation of recovery distortion in doubled-haploid populations. Its public showcase is limited to synthetic validation and identifiability boundaries.",
      "用于加倍单倍体群体恢复偏倚研究的私有源码方法框架，明确考虑连锁结构；公共展示仅限于合成验证与可识别性边界。",
      "倍加半数体集団の回収歪みを連鎖構造を考慮して検討する非公開ソースの方法論フレームワーク。公開展示は合成検証と識別可能性の境界に限定しています。",
    ),
    features: ["Synthetic fixtures", "Linkage-aware tests", "Identifiability", "Reproducible audits"],
    link: "https://github.com/yuriljx/stride-dh-showcase",
    visuals: [
      { kind: "image", src: "/software/stride/validation-pipeline.png", alt: localize("Synthetic STRIDE-DH validation pipeline", "合成 STRIDE-DH 验证流程", "合成STRIDE-DH検証パイプライン"), caption: localize("Versioned contracts and a synthetic validation pipeline", "版本化契约与合成验证流程", "バージョン化契約と合成検証パイプライン"), aspect: "1.667", position: "center" },
      { kind: "image", src: "/software/stride/synthetic-calibration.png", alt: localize("Synthetic calibration view for STRIDE-DH", "STRIDE-DH 合成校准视图", "STRIDE-DH合成キャリブレーション画面"), caption: localize("Recovery-bias behavior on fully synthetic fixtures", "完全合成夹具上的恢复偏倚行为", "完全合成フィクスチャ上の回収歪み挙動"), aspect: "1.667", position: "center" },
      { kind: "image", src: "/software/stride/identifiability-boundary.png", alt: localize("Synthetic STRIDE-DH identifiability boundary", "STRIDE-DH 合成可识别性边界", "STRIDE-DH合成識別可能性境界"), caption: localize("What the current framework can and cannot identify", "当前框架能够与不能识别的边界", "現行フレームワークが識別できる範囲と限界"), aspect: "1.667", position: "center" },
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
