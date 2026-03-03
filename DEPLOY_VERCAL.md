# 部署到 Vercel

## 方式 1：通过 Vercel 官网（推荐）

1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择你的 GitHub 仓库 `just_peac_homes`
4. 配置项目：
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. 添加环境变量：
   - `RESEND_API_KEY`
   - `SANITY_API_TOKEN`
   - `SANITY_REVALIDATE_SECRET`
6. 点击 "Deploy"

## 方式 2：通过 CLI 部署

```bash
# 1. 登录 Vercel
cd frontend
npx vercel login

# 2. 首次部署（创建项目）
npx vercel

# 3. 后续部署
npx vercel --prod
```

## 环境变量

在 Vercel 项目设置中添加以下环境变量：
- `RESEND_API_KEY=re_6RbKREyC_KZ83Aq3swMYmUZ8uZuTkL5ga`
- `SANITY_API_TOKEN=skNDJ9N9iJYxSX43iET67BxxNJC0IldAi4Izvb203eV3buSi6VVmsBLMPmMkLbNvjSgbKtRO4xsDpIkLQUMIlU1Wiscn5z47oQ5echdHbIQDHKlRpr8vr2O2xjmqfvKkJ3ukxGunERLlDIVM97H9uWP6zycYpCjLNZJvDZKlUYx29hYgP4GD`
- `SANITY_REVALIDATE_SECRET=94dbaf816d2b21fe084756a032f9c5f5ac3b48844ee434f8c6456587ed7c31e2`

## Vercel 免费计划

- ✅ 每月 100GB 流量
- ✅ 自动 HTTPS
- ✅ 自定义域名
- ✅ 自动部署
- ⚠️ Serverless 执行时间：每月 100 小时

对于内容展示型网站完全够用！
