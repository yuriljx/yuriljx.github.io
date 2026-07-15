export const profile = {
  name: "Jixiao Li",
  githubHandle: "yuriljx",
  githubUrl: "https://github.com/yuriljx",
};

export const researchAreas = [
  {
    title: "研究问题",
    description: "从简历、论文摘要与项目经历中提炼核心科学问题，建立稳定且可持续更新的研究主线。",
    tags: ["研究对象", "关键问题", "应用价值"],
  },
  {
    title: "方法与证据",
    description: "解释使用的方法、数据与验证路径，让同行能快速判断工作的技术边界与可信程度。",
    tags: ["方法体系", "数据", "验证"],
  },
  {
    title: "贡献与影响",
    description: "区分个人贡献、团队成果和后续影响，并连接论文、软件、数据及可复现实验。",
    tags: ["个人贡献", "研究产出", "开放科学"],
  },
];

export const publicationSlots = [
  {
    year: "YEAR",
    type: "代表性成果",
    title: "论文题目、作者、发表平台与个人贡献",
    description: "优先放置最能说明研究能力的 3–5 项成果，而不是按时间堆叠全部记录。",
  },
  {
    year: "YEAR",
    type: "数据 / 方法",
    title: "可复用的数据集、实验方法或研究资源",
    description: "为非论文产出保留同等清晰的位置，并连接文档、许可与复现说明。",
  },
  {
    year: "YEAR",
    type: "报告 / 演讲",
    title: "重要报告、海报、学术演讲或公众传播",
    description: "根据简历内容判断是否公开，避免把内部材料误当作公开成果。",
  },
];

export const projects = [
  {
    title: "Grape Length",
    status: "公开项目",
    description: "基于 YOLOv8 的葡萄图像检测与时间序列直径测量流程，包含训练、推理、平滑和生长曲线可视化。",
    tags: ["Python", "YOLOv8", "Computer Vision", "Time Series"],
    url: "https://github.com/yuriljx/Grape_Length",
    placeholder: false,
  },
  {
    title: "下一项代表性软件",
    status: "内容槽位",
    description: "简历导入后，从研究价值、完成度与公开条件三个维度选择最适合展示的项目。",
    tags: ["问题", "方法", "文档", "复现"],
    url: null,
    placeholder: true,
  },
];

export const experienceSlots = [
  {
    period: "YYYY — YYYY",
    type: "EDUCATION",
    title: "教育经历与学术训练",
    description: "学校、学位、专业、导师与论文主题将在确认公开范围后填入。",
  },
  {
    period: "YYYY — NOW",
    type: "RESEARCH",
    title: "研究经历与职责",
    description: "以研究问题和实际贡献为主，避免只复制职位名称与机构信息。",
  },
  {
    period: "YYYY — NOW",
    type: "DEVELOPMENT",
    title: "软件开发与技术实践",
    description: "连接工程实现、研究复现、协作方式与可公开的软件产出。",
  },
];
