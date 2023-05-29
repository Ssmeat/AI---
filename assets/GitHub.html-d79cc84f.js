import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as l,a as n,b as s,d as a,e as t}from"./app-35a5f568.js";const r={},p=t('<h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions" aria-hidden="true">#</a> GitHub Actions</h2><p>GitHub Actions 是一个持续集成和持续交付 (CI/CD) 平台，可用于自动执行构建、测试和部署管道。您可以创建工作流程来构建和测试存储库的每个拉取请求，或将合并的拉取请求部署到生产环境。将 GitHub Actions 命令保存为 <code>main.yml</code>，放于 <code>.github\\workflows</code> 目录下，repo 发生指定调节的改变时，Actions 会自动运行。<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></p>',2),u={href:"https://github.com/marketplace?type=actions",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/sdras/awesome-actions",target:"_blank",rel:"noopener noreferrer"},h=n("p",null,[s("如果 GitHub Actions 命令中有涉及密码等私密信息，则进入项目仓库的「Settings」>「Secrets and variables」>「Actions」，添加密钥进行加密处理。比如新建密钥 PERSONAL_TOKEN，Actions 命令中使用 "),n("code",null,"${{ secrets.PERSONAL_TOKEN }}"),s(" 来指代该密钥。")],-1),m=n("h3",{id:"不同仓库间复制",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#不同仓库间复制","aria-hidden":"true"},"#"),s(" 不同仓库间复制")],-1),k={href:"http://README.md",target:"_blank",rel:"noopener noreferrer"},f=n("code",null,"clean: true",-1),b={href:"https://docs.github.com/cn/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#creating-a-token",target:"_blank",rel:"noopener noreferrer"},_={href:"https://github.com/settings/tokens",target:"_blank",rel:"noopener noreferrer"},v=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Copy file
  <span class="token key atrule">uses</span><span class="token punctuation">:</span> andstor/copycat<span class="token punctuation">-</span>action@v3
  <span class="token key atrule">with</span><span class="token punctuation">:</span>
    <span class="token key atrule">personal_token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.PERSONAL_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">src_path</span><span class="token punctuation">:</span> docs/README.md
    <span class="token key atrule">dst_path</span><span class="token punctuation">:</span> /
    <span class="token key atrule">dst_owner</span><span class="token punctuation">:</span> rockbenben
    <span class="token key atrule">dst_repo_name</span><span class="token punctuation">:</span> LearnData
    <span class="token key atrule">dst_branch</span><span class="token punctuation">:</span> main
    <span class="token key atrule">src_branch</span><span class="token punctuation">:</span> main
    <span class="token comment">#clean: true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="actions-失败重试" tabindex="-1"><a class="header-anchor" href="#actions-失败重试" aria-hidden="true">#</a> Actions 失败重试</h3><p>在 job 和 step 中使用 if 语句，只有满足条件时才执行具体的 job 或 step。<sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2"></a></sup></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 任务状态检查函数</span>
success<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 当上一步执行成功时返回 true</span>
always<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 总是返回 true</span>
cancelled<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 当 workflow 被取消时返回 true</span>
failure<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment"># 当上一步执行失败时返回 true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>first_step 会总是执行，second_step 需要上一步 first_step 执行成功才会执行，third_step 只有上一步 second_step 执行失败才执行。当 third_step 与 second_step 命令相同时，就可以达到失败重试的效果了。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">first_job</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> My first job
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> first_step
        <span class="token key atrule">if</span><span class="token punctuation">:</span> always()

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> second_step
        <span class="token key atrule">if</span><span class="token punctuation">:</span> success()

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> third_step
        <span class="token key atrule">if</span><span class="token punctuation">:</span> failure()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="uses-版本号" tabindex="-1"><a class="header-anchor" href="#uses-版本号" aria-hidden="true">#</a> uses 版本号</h3><p><code>uses: SamKirkland/FTP-Deploy-Action@4.3.1</code>：uses 会指定此步骤运行 SamKirkland/FTP-Deploy-Action 存储库中的 4.3.1 版本。</p><p>但有时 Actions 的版本不会这么快更新，又必须使用最新版，可以将版本号改为 branch name，比如 <code>uses: SamKirkland/FTP-Deploy-Action@master</code>。</p><h2 id="git-commit" tabindex="-1"><a class="header-anchor" href="#git-commit" aria-hidden="true">#</a> Git Commit</h2>`,10),g={href:"https://www.conventionalcommits.org/zh-hans/",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&lt;</span>type<span class="token operator">&gt;</span><span class="token punctuation">[</span>optional scope<span class="token punctuation">]</span>: <span class="token operator">&lt;</span>description<span class="token operator">&gt;</span>

<span class="token punctuation">[</span>optional body<span class="token punctuation">]</span>

<span class="token punctuation">[</span>optional footer<span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> Type</h3><p>Type 用于说明 git commit 的类别，只允许使用下面的标识。<sup class="footnote-ref"><a href="#footnote3">[3]</a><a class="footnote-anchor" id="footnote-ref3"></a></sup></p><ul><li>feat: 新特性或功能（feature）</li><li>fix: 修复 bug</li><li>docs: 文档更新（documentation）</li><li>style: 代码风格或者组件样式更新（不影响代码运行的变动）</li><li>refactor: 代码重构，不引入新功能和缺陷修复</li><li>perf: 优化相关，比如提升性能、体验</li><li>test: 增加测试</li><li>chore: 构建过程或辅助工具的变动</li><li>revert: 回滚到上一个版本</li></ul><h3 id="scope" tabindex="-1"><a class="header-anchor" href="#scope" aria-hidden="true">#</a> Scope</h3><p>Scope 用于说明 commit 影响的范围，比如 Controller、DAO、View 等等，视项目不同而不同。如果其中包含了多个 scope，可以使用 <code>*</code> 代替。</p><h3 id="footer" tabindex="-1"><a class="header-anchor" href="#footer" aria-hidden="true">#</a> Footer</h3><p>如果当前代码与上一个版本不兼容，则 Footer 部分以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动理由和迁移方法。<sup class="footnote-ref"><a href="#footnote4">[4]</a><a class="footnote-anchor" id="footnote-ref4"></a></sup></p><p>如果当前 commit 针对某个 issue，那么可以在 Footer 部分使用 <code>Closes #265</code> 关闭这个 issue。也可以在任意位置输入 <code>#265</code>，将 commit 与对应问题相关联。</p><h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2><h3 id="github-忽略指定文件" tabindex="-1"><a class="header-anchor" href="#github-忽略指定文件" aria-hidden="true">#</a> GitHub 忽略指定文件</h3><p>项目路径新建一个命名为 .gitignore 的文件，将想要忽略的文件夹和文件写入 .gitignore 文件，换行分隔。</p><p>比如要忽略 node_modules 文件夹，就直接在文件中输入 node_modules。</p><hr class="footnotes-sep">`,14),A={class:"footnotes"},x={class:"footnotes-list"},w={id:"footnote1",class:"footnote-item"},E={href:"https://docs.github.com/cn/actions/learn-github-actions/understanding-github-actions",target:"_blank",rel:"noopener noreferrer"},C=n("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎",-1),G={id:"footnote2",class:"footnote-item"},N={href:"https://blog.csdn.net/Ber_Bai/article/details/120310024",target:"_blank",rel:"noopener noreferrer"},H=n("a",{href:"#footnote-ref2",class:"footnote-backref"},"↩︎",-1),S={id:"footnote3",class:"footnote-item"},D={href:"https://www.jianshu.com/p/6433679cd10f",target:"_blank",rel:"noopener noreferrer"},T=n("a",{href:"#footnote-ref3",class:"footnote-backref"},"↩︎",-1),F={id:"footnote4",class:"footnote-item"},K={href:"http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html",target:"_blank",rel:"noopener noreferrer"},L=n("a",{href:"#footnote-ref4",class:"footnote-backref"},"↩︎",-1);function O(R,j){const e=i("ExternalLinkIcon");return c(),l("div",null,[p,n("ul",null,[n("li",null,[n("a",u,[s("GitHub Actions 官方市场"),a(e)])]),n("li",null,[n("a",d,[s("Awesome Actions"),a(e)])])]),h,m,n("p",null,[s("复制文件到目的地，文档没变化则不会执行。案例为将当前仓库 main 分支下 docs 的 "),n("a",k,[s("README.md"),a(e)]),s(" 文件复制到另一个仓库 rockbenben/LearnData/ 路径下，如果目标路径存在相同文件，则将覆盖。如果让 "),f,s(" 生效，Actions 会将目标路径情况，然后执行复制。")]),n("p",null,[s("此动作需按 "),n("a",b,[s("Creating a personal access token"),a(e)]),s(" 建立"),n("a",_,[s("个人访问令牌"),a(e)]),s("，勾选权限「repo Full control of private repositories」，然后将该 token 值其保存在项目仓库的 Action 密钥。")]),v,n("p",null,[s("Commit message 远比你想象中的重要，它可以帮助你自动生成 Change log。在我最初的项目中，每次提交都写 update，这导致很难回溯，我也不知道更新了什么。建议新手全部按照 "),n("a",g,[s("Conventional Commits"),a(e)]),s(" 的规范来进行提交。")]),y,n("section",A,[n("ol",x,[n("li",w,[n("p",null,[n("a",E,[s("了解 GitHub Actions"),a(e)]),s(),C])]),n("li",G,[n("p",null,[n("a",N,[s("最全总结，GitHub Action 自动化部署"),a(e)]),s(),H])]),n("li",S,[n("p",null,[n("a",D,[s("Git Commit 规范"),a(e)]),s(),T])]),n("li",F,[n("p",null,[n("a",K,[s("Commit message 和 Change log 编写指南"),a(e)]),s(),L])])])])])}const V=o(r,[["render",O],["__file","GitHub.html.vue"]]);export{V as default};
