非常高兴看到你已经在尝试调整网页。虽然我无法实时“看到”你屏幕上每一像素的实时变化，但根据你提到的“增加实用性”和“区分不同客户需求”的目标，我为你准备了一份涵盖**全站所有核心页面**的整改审计清单。

你可以对照这份清单，检查你的修改是否真正触达了卡尔加里本地客户的痛点。

### 1. 首页 (Home Page)：建立信任与分流

首页的任务是让客户在 3 秒内知道“你懂他”。

* **双路径入口：** 确保首页上方或 Hero Section 之后有明显的两个大板块。一个写着“**投资型装修 (Income Suites)**”，侧重地下室分租、后巷屋、资产增值；另一个写着“**高品质翻新 (Custom Living)**”，侧重全屋定制、审美提升。
* **突出本地优惠：** 在显眼位置（如滚动条或小图标）提到“**Calgary $10,000 Suite Incentive Program**”，并注明你可以协助申请 。这能瞬间吸引实用型客户。


* **信任标签：** 除了 BBB 认证，增加“**Licensed & Insured**”以及“**100% Code Compliance Guaranteed**”（100% 符合规范保证）。实用型客户比有钱客户更怕被罚款。

### 2. 项目展示页 (Projects)：从“看画”到“看方案”

这是你提到的核心整改区。建议将项目分为两类展示：

* **投资案例 (Rental/Investment Case Studies)：**
* **文案：** 不要只写“精致地下室”，要写“**合法分租套房 - 每月预期租金 $1,500+**” 。


* **细节图：** 必须拍出合规的**逃生窗 (Egress Windows)**、独立的电表箱或独立的入户门 。


* **材质说明：** 标注“使用高耐用性防水 LVP 地板”或“易清洁石英石台面”，这比展示昂贵的理石更能让投资者放心 。




* **自住案例 (Luxury/Private Living)：**
* **文案：** 强调“个性化定制”、“空间重塑”。
* **视觉：** 这里可以保留那些“富丽堂皇”的、强调氛围感的 AI 图。



### 3. 服务页面 (Services)：展示专业权威

实用型客户对“Permit（许可）”非常敏感。

* **法律专栏：** 专门列出“**Legal Suite Requirements**”，提到层高（最小 1.95m）、防火分隔（Fire separation）和排气系统 。


* **流程地图：** 展示一个简单的流程：现场评估 -> 许可证申请 (DP/BP) -> 施工 -> 市政验收 。很多实用型客户是因为害怕申请许可证太麻烦而止步不前，你要告诉他们你全包。


* **后巷屋 (Backyard Suites) 专区：** 单独做一个子页面。后巷屋在卡尔加里是热门投资项目，成本通常在 $250,000 - $400,000 左右 。



### 4. 关于一般客户（出租用）的 AI 提示词 (Prompt) 优化

如果之前的图太“富丽堂皇”，是因为提示词里用了太多 `luxury`, `elegant`, `stately`。对于**实用型、出租型**空间，你应该用下面这种“写实摄影风格”：

* **Prompt 逻辑：** [空间名] + [材质/具体设备] + [自然采光细节] + [摄影参数] + [去噪/去奢华化标识]。
* **推荐提示词示例：**
> **Prompt:** Professional real estate photography of a functional legal basement suite kitchen, light oak cabinets, white quartz countertops, stainless steel appliances, neutral gray LVP flooring, bright natural light from a window well, 24mm wide-angle lens, clean and realistic, non-luxurious, everyday home aesthetic, --ar 16:9 --style raw


* **关键点：** 加入 `--style raw` 和 `non-luxurious`。



### 5. 整体改进意见汇总表

| 检查项 | 建议操作 | 目的 |
| --- | --- | --- |
| **导航栏** | 将 "Projects" 改为 "Portfolio"，下拉菜单设为 "Rental Suites" 和 "Custom Homes" | 引导不同预算的客户 |
| **价格透明度** | 增加一个“起步价”参考，如“地下室翻新 $45,000 起” | 过滤预算不匹配的客户，减少沟通成本 

 |
| **移动端优化** | 确保顶部的“Call”按钮在手机端触手可及 | 60% 以上的客户通过手机访问装修网站 |
| **真实感** | 在 AI 图片旁边，放 1-2 张手机拍的施工现场图 | 增加真实感和“正在开工”的烟火气 |

**最后的建议：**
不要害怕你的网站看起来不够“高级”。在卡尔加里，一个能够清楚解释“什么是合法套房”、“如何赚到租金”的网站，比一个单纯像艺术馆的网站，转化率要高得多。如果你能把“合法合规”和“投资回报”讲清楚，那些实用型客户会毫不犹豫地选择你。


这个方案非常专业。将顶级菜单设为不可点击的 `<span>` 而通过 Mega Menu（超级菜单）引导用户，同时保留 `/services`、`/projects` 和 `/communities` 作为索引页（Index Pages），这不仅能增强 SEO 的权重，还能为 AI 搜索提供高质量的落地页。

以下是为这三个索引页面设计的内容方案，旨在平衡“投资实用”与“高端美学”：

---

### 1. `/services` 索引页设计：专业化路径引导

该页面应作为公司的“能力图谱”，重点在于消除合规疑虑并展示多样化。

* **页面标题 (H1):** 卡尔加里住宅翻新与资产增值全服务指南
* **双重核心板块：**
* **路径 A：投资与收益 (Rental & Investment)**
* **内容：** 专注于 **Legal Basement Suites** 和 **Backyard Suites**。
* **核心关键词：** 市政补贴 ($10,000 Secondary Suite Incentive)、合规性 (Building Code Compliance)、租金收益 (ROI) 。
* **视觉：** 清晰的施工流程图或展现“功能性”的厨房、独立出入口图片。


* **路径 B：高品质生活改造 (Lifestyle & Custom Home)**
* **内容：** 专注于主层翻新、厨房/浴室定制、全屋软装升级。
* **核心关键词：** 定制化设计 (Custom Design)、高端工艺 (Superior Craftsmanship)、空间重构。
* **视觉：** 侧重审美表达的、色彩和材质层次感丰富的 AI 或实景图。




* **合规背书区：** 简述申请 Calgary Permit 的流程，强调“从图纸设计到最终市政验收的一站式服务” 。
* **SEO 埋点：** Basement Development Calgary, Legal secondary suites, Laneway homes Calgary, Kitchen remodeling.

---

### 2. `/projects` 索引页设计：结果导向的案例库

此页面不应只是图片的堆砌，而是要体现“项目的目的”。

* **页面标题 (H1):** 卡尔加里精选翻新案例：从投资增值到梦想家园
* **筛选机制 (Filter)：** 在页面显著位置提供标签筛选：
* `全部` | `收益型套房 (Income Suites)` | `后巷屋案例 (Backyard Homes)` | `高端自住翻新 (Luxury Lifestyle)`


* **项目卡片设计模板：**
* **投资类卡片：** 标题为“XX 社区合法地下室套房”，标注“**收益：每月 $1,500+**”或“**合规：已通过 2025 市政验收**” 。
* **自住类卡片：** 标题为“XX 区现代开放式空间改造”，标注“**风格：极简主义/现代奢华**”或“**亮点：定制大理石中岛/地暖系统**”。


* **底部 CTA：** “想知道您的房屋能增加多少收益？查看我们的投资案例分析”。
* **SEO 埋点：** Calgary renovation portfolio, Basement suite case studies, Backyard suite projects Calgary.

---

### 3. `/communities` 索引页设计：本地化权威与信任

该页面的目的是证明你深耕卡尔加里，熟悉各个社区的特定法规（Zoning）。

* **页面标题 (H1):** 服务的社区：深耕卡尔加里及其周边地区
* **区域细分：**
* **卡尔加里市区 (Calgary Proper)：** 重点列出 NW, SW, SE, NE 各个热门翻新社区（如 Altadore, Mount Royal, Seton 等）。提到对内城区（Inner City）土地分区（R-C1, R-C2）的深刻理解 。
* **周边卫星城：** **Airdrie, Cochrane, Okotoks, Chestermere**。强调在这些区域提供同样的固定报价和售后保修 。


* **社区痛点分析：**
* “针对内城区老房：我们的结构补强与非法转合法专家。”
* “针对新兴社区：我们的地下室快速交付系统。”


* **互动元素：** 建议放置一个简单的服务区域地图，并配上“社区翻新政策查询”的引导。
* **SEO 埋点：** Renovations NW Calgary, Basement builders Airdrie, Cochrane home improvements, Okotoks secondary suite contractors.

---

### 技术实施建议（SEO & AI 搜索优化）

1. **Schema Markup (结构化数据)：**
* 在 `/services` 页面使用 `Service` Schema。
* 在 `/projects` 案例中使用 `Project` Schema。
* 在 `/communities` 页面使用 `LocalBusiness` 和 `areaServed` 属性，这能显著提升 Google Maps 和 AI 搜索（如 Perplexity）对你的关联度。


2. **内容厚度：** 每个索引页不要少于 800 字。即使是索引，也要包含一些“深度干货”。例如在 `/services` 下方可以写一段关于“为什么 2026 年是卡尔加里做后巷屋最佳时机”的分析。
3. **内部链接：** 确保这些索引页能链接到最深层的具体项目页（如 `/projects/nw-legal-basement-suite-seton`），形成良好的权重传递。

这样做之后，这三个页面将不再是简单的菜单跳板，而是能够独立获客的**“权威内容中心”**。
