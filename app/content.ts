export const profile = {
  name: "李继潇",
  englishName: "Jixiao Li",
  affiliation: "北海道大学农学院",
  affiliationEnglish: "Graduate School of Agriculture, Hokkaido University",
  email: "yuriljx@gmail.com",
  scholarUrl: "https://scholar.google.com/citations?user=m2FLOrUAAAAJ&hl=zh-CN",
  githubUrl: "https://github.com/yuriljx",
  scholarStats: [
    { value: "10", label: "Scholar 收录成果" },
    { value: "195", label: "引用次数" },
    { value: "4", label: "h 指数" },
  ],
};

export const researchFocus = [
  {
    code: "01",
    title: "智能农业与作物表型",
    english: "Intelligent Agriculture & Phenotyping",
    description: "以田间影像、计算机视觉和时间序列建模连接作物性状、品质与生长过程。",
  },
  {
    code: "02",
    title: "倍性育种与植物生理",
    english: "Ploidy Breeding & Plant Physiology",
    description: "关注倍性变化对果实形态、生化组成和繁育策略的影响。",
  },
  {
    code: "03",
    title: "生物化学与品质分析",
    english: "Biochemistry & Quality Analytics",
    description: "将代谢物测定、统计建模与无损图像特征用于农产品品质评价。",
  },
];

export const publications = [
  {
    year: "2026",
    title: "Feature extraction based on RGB images for rapid and non-destructive estimation of haskap fruit quality attributes",
    authors: "J. Zhang, J. Li, X. Meng, Y. Yang, Y. Lyu, Y. Hoshino",
    venue: "Postharvest Biology and Technology, 240, 114416",
    label: "Computer Vision",
  },
  {
    year: "2026",
    title: "Monitoring Relative Grape Berry Growth in the Field with YOLOv8 and Biology-informed Smoothing",
    authors: "J. Li, T. Sone, X. Meng, K. Hirayama, M. Ikuta, Y. Inose, Y. Hoshino",
    venue: "The Horticulture Journal, SZD-110",
    label: "Field Phenotyping",
  },
  {
    year: "2026",
    title: "YOLO-APPLE: Accurate Identification of Apple Cultivars Using an Improved YOLOv7 Framework",
    authors: "J. Zhang, X. Meng, J. Li, Y. Hoshino",
    venue: "The Horticulture Journal, SZD-115",
    label: "Cultivar Detection",
  },
  {
    year: "2025",
    title: "Exploring the impact of ploidy levels on fruit attributes of haskap",
    authors: "J. Li, Y. Hoshino",
    venue: "Euphytica, 221(6), 74",
    label: "Polyploid Breeding",
  },
  {
    year: "2024",
    title: "Elucidating the impact of ploidy level on biochemical content accumulation in haskap fruits: A comprehensive approach for fruit assessment",
    authors: "J. Li, Y. Hoshino",
    venue: "Scientia Horticulturae, 327, 112831",
    label: "Fruit Biochemistry",
  },
  {
    year: "2023",
    title: "Phenotypic analysis of polyploid and aneuploid haskap plants and their progeny production",
    authors: "J. Li, Y. Suzuki, Y. Hoshino",
    venue: "Euphytica, 219(5), 52",
    label: "Plant Phenotyping",
  },
  {
    year: "2016",
    title: "Addressing the ice nucleating abilities of marine aerosol: A combination of deposition mode laboratory and field measurements",
    authors: "L. A. Ladino, J. D. Yakobi-Hancock, W. P. Kilthau, R. H. Mason, M. Si, J. Li, et al.",
    venue: "Atmospheric Environment, 132, 1-10",
    label: "Atmospheric Chemistry",
  },
  {
    year: "2015",
    title: "Ice nucleating particles at a coastal marine boundary layer site: correlations with aerosol type and meteorological conditions",
    authors: "R. H. Mason, M. Si, J. Li, C. Chou, R. Dickie, D. Toom-Sauntry, et al.",
    venue: "Atmospheric Chemistry and Physics, 15(21), 12547-12566",
    label: "Bioaerosol",
  },
];

export const presentations = [
  {
    year: "2025",
    event: "第十届中国国际人工智能峰会暨算力算法大会（CIAI）",
    title: "用于食品质量评估的计算代谢组学端到端 AI 管线",
    format: "口头报告",
  },
  {
    year: "2024",
    event: "第十五届国际计算系统生物学会议（ISB）",
    title: "基于田间图像和时间序列的多模态机器学习预测果实糖度与有机酸",
    format: "口头报告",
  },
  {
    year: "2023",
    event: "第 103 届日本化学会（CSJ）年会",
    title: "活化 MSTFA 硅烷化反应增强植物基质中酚类和有机酸的 GC-MS 定量分析",
    format: "口头报告",
  },
  {
    year: "2022",
    event: "日本园艺学会（JSHS）秋季会议",
    title: "多倍体蓝靛果果实中糖类和有机酸的 GC-MS 分析",
    format: "口头报告",
  },
];

export const softwareProjects = [
  {
    slug: "stride",
    title: "STRIDE-DH",
    subtitle: "水稻加倍单倍体研究分析工作台",
    status: "研究原型 · 界面示意",
    description: "面向水稻花药培养与加倍单倍体研究的分析工作台，用于组织阶段数据、比较处理条件并形成候选因子清单。当前不展示内部数据。",
    features: ["阶段比较", "候选因子排序", "实验记录", "可追溯报告"],
    link: null,
  },
  {
    slug: "field",
    title: "RiceVision Field Lab",
    subtitle: "水稻田间表型识别与批量质控",
    status: "概念模块 · 界面示意",
    description: "将田间图像整理、目标检测、地块级表型汇总与异常复核放在同一流程中，服务于规模化表型采集和模型验证。",
    features: ["地块分组", "目标检测", "批量推理", "异常复核"],
    link: null,
  },
  {
    slug: "trait",
    title: "TraitFlow",
    subtitle: "影像—时间序列—品质性状建模管线",
    status: "概念模块 · 输出示意",
    description: "连接图像特征、时间序列与糖度/有机酸等品质指标，提供特征审查、模型比较和可解释性摘要。",
    features: ["多模态特征", "模型比较", "质量控制", "解释性摘要"],
    link: null,
  },
  {
    slug: "grape",
    title: "Grape Growth Monitor",
    subtitle: "田间葡萄果粒生长监测流程",
    status: "公开代码 · 输出示意",
    description: "使用 YOLOv8 识别时间序列图像中的果粒，并结合尺度换算与生物学引导平滑，形成相对生长轨迹和质量检查结果。",
    features: ["YOLOv8", "时间序列", "尺度换算", "生长曲线"],
    link: "https://github.com/yuriljx/Grape_Length",
  },
];

export const researchProjects = [
  {
    phase: "CURRENT",
    title: "作物田间表型与智能诊断",
    description: "围绕田间影像、果实检测、时间序列与作物品质预测建立可复现的数据管线。",
    tags: ["Computer Vision", "Phenotyping", "Time Series"],
  },
  {
    phase: "PLANT SCIENCE",
    title: "倍性、果实品质与繁育评价",
    description: "研究倍性变化对植物表型、生化组成和后代繁育表现的影响。",
    tags: ["Polyploidy", "Fruit Quality", "Breeding"],
  },
  {
    phase: "ATMOSPHERIC CHEMISTRY",
    title: "海洋生物气溶胶与冰核机制",
    description: "结合实验室与田间测量，分析气溶胶类型、气象条件与冰核能力之间的关系。",
    tags: ["Bioaerosol", "Ice Nucleation", "Field Measurement"],
  },
  {
    phase: "EARLY RESEARCH",
    title: "环境材料与分析方法",
    description: "围绕可降解材料、环境分析和检测流程开展方法开发与应用研究。",
    tags: ["Analytical Chemistry", "Environmental Materials", "Method Development"],
  },
];
