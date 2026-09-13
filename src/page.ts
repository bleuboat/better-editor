import "./renderers.ts";
import type { DataType } from "./utils/data.ts";
import { printUser } from "./utils/printuser.ts";
import { DELIM, RULES, Renderer } from "./utils/render.ts";

export class Page {
  renderers: Map<string, Renderer>;
  vars: { [key: string]: unknown };
  tokens: [string, { [key: string]: unknown }][];

  constructor() {
    this.renderers = new Map;
    this.vars = {};
    this.tokens = [];
    this.vars.head = "";

    for (const rule of RULES) {
      const RendererType = Renderer.all.get(rule);
      if (RendererType) {
        const renderer = new RendererType(rule, this);
        this.renderers.set(rule, renderer);
      }
    }
  }

  renderTitle(title: string): void {
    const finalTitle =
      title.length > 0 ? `${title} - The Backrooms中文维基` : `The Backrooms中文维基`;
    this.vars.head += `<title>${finalTitle}</title>\n`;
  }

  renderLoginStatus(): string {
    const params = new URLSearchParams(window.location.search);
    const number = params.get("number");
    if (!number) {
      return `
        <a href="javascript:;" class="login-status-create-account btn">建立账户</a>
        <span>或</span>
        <a href="javascript:;" class="login-status-sign-in btn btn-primary">登入</a>
      `;
    }
    const title = params.get("title");
    const name = params.get("name");
    if (!title || !name) throw Error;
    return `
      ${printUser(number, title, name)}
      |
      <a id="my-account" href="https://www.wikidot.com/account/activity">我的账户</a>
      <a id="account-topbutton" href="javascript:;">▼</a>
      <div id="account-options">
        <ul>
          <li><a href="https://www.wikidot.com/account/activity">活动</a></li>
          <li><a href="https://www.wikidot.com/account/messages">消息</a></li>
          <li><a href="https://www.wikidot.com/account/sites">网站</a></li>
          <li><a href="https://www.wikidot.com/account/settings">设置</a></li>
          <li><a href="https://www.wikidot.com/account/upgrade">升级</a></li>
          <li><a href="javascript:;">登出</a></li>
        </ul>
      </div>
    `;
  }

  renderSource(source: string): string {
    for (const renderer of this.renderers.values()) {
      source = renderer.parseWithFallback(source);
    }
    console.log(source);
    const output: string[] = [];
    const key: string[] = [];
    let in_delim = false;
    for (const char of source) {
      if (in_delim) {
        if (char === DELIM) {
          const num_key = Number(key.join(""));
          const rule = this.tokens[num_key][0];
          const opts = this.tokens[num_key][1];
          const renderer = this.renderers.get(rule);
          if (!renderer) throw Error;
          output.push(renderer.render(opts));
          in_delim = false;
        } else {
          key.push(char);
        }
      } else {
        if (char === DELIM) {
          key.length = 0;
          in_delim = true;
        } else {
          output.push(char);
        }
      }
    }
    this.vars.head += `
      <style type="text/css" id="internal-style">
        @import url(https://github.backroomswiki.cn/Super_Liminal/css/basic-styles.css);
        @import url(https://github.backroomswiki.cn/Old_BHL/css/liminal-impact.css);
      </style>
    `;
    return output.join("");
  }

  renderTags(tags: string): string {
    return tags
      .split(" ")
      .filter((value) => value.length > 0)
      .map((value) => `<a href="/system:page-tags/tag/${value}#pages">${value}</a>`)
      .join("");
  }

  renderHtml({ title, source, tags }: DataType): string {
    this.vars = {};
    this.tokens.length = 0;
    this.vars.head = "";

    this.renderTitle(title);
    const loginStatus = this.renderLoginStatus();
    const content = this.renderSource(source);
    const finalTags = this.renderTags(tags);
    return `
<!DOCTYPE html>
<html>

<head>
  ${this.vars.head}
</head>

<body id="html-body">
    <div id="skrollr-body">
        <a name="page-top"></a>
        <div id="container-wrap-wrap">
            <div id="container-wrap">
                <div id="container">
                    <div id="header">
                        <h1><a href="/"><span>The Backrooms中文维基</span></a></h1>
                        <h2><span>你曾经来过这里</span></h2>
                        <div id="search-top-box" class="form-search">
                            <form id="search-top-box-form" onsubmit="return false;" class="input-append">
                                <input id="search-top-box-input" class="text empty search-query" type="text" size="15" name="query" value="搜索网站">
                                <input class="button btn" type="submit" name="search" value="搜索">
                            </form>
                        </div>
                        <div id="top-bar">
<div class="top-bar">
    <ul>
        <li>
            <a href="javascript:;">网站</a>
            <ul>
                <li><a href="/most-recently-created">最近创建的页面</a></li>
                <li><a href="/top-rated-pages">最高评分的页面</a></li>
                <li><a href="/top-rated-pages-this-month">本月最高评分的页面</a></li>
                <li><a href="/lowest-rated-pages">最低评分的页面</a></li>
                <li><a href="/system:page-tags">标签云</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">图书馆</a>
            <ul>
                <li><a href="/normal-levels-i">层级</a></li>
                <li><a href="/sub-layers">子区集</a></li>
                <li><a href="/enigmatic-levels">隐秘层级</a></li>
                <li><a href="/entities">实体</a></li>
                <li><a href="/enigmatic-entities">隐秘实体</a></li>
                <li><a href="/objects">物品</a></li>
                <li><a href="/phenomena">现象</a></li>
                <li><a href="/groups-list">团体</a></li>
                <li><a href="/tales">故事</a></li>
                <li><a href="/poi-s">相关人士</a></li>
                <li><a href="/canons">设定</a></li>
                <li><a href="/series-hub">文章系列</a></li>
                <li><a href="/joke-entries">搞笑条目</a></li>
                <li><a href="/translations-hub">国际翻译中心</a></li>
                <li><a href="/art-hub">艺术作品</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">原创图书馆</a>
            <ul>
                <li><a href="/normal-levels-cn-i">层级 I</a></li>
                <li><a href="/normal-levels-cn-ii">层级 II</a></li>
                <li><a href="/sub-layers-cn">子区集</a></li>
                <li><a href="/enigmatic-series-cn">隐秘系列</a></li>
                <li><a href="/entities-cn">实体</a></li>
                <li><a href="/objects-cn">物品</a></li>
                <li><a href="/phenomena-cn">现象</a></li>
                <li><a href="/groups-list-cn">团体</a></li>
                <li><a href="/tales-cn">故事</a></li>
                <li><a href="/poi-s-cn">相关人士</a></li>
                <li><a href="/canons-cn">设定</a></li>
                <li><a href="/series-cn">文章系列</a></li>
                <li><a href="/joke-entries-cn">搞笑条目</a></li>
                <li><a href="/crossover-hub">CROSSOVER</a></li>
                <li><a href="/artwork-hub-cn">艺术作品</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">社群</a>
            <ul>
                <li><a href="/forum:start">讨论区</a></li>
                <li><a href="https://discord.gg/jBxwBVQSCk">Discord</a></li>
                <li><a href="http://tieba.baidu.com/wxf/27814845?kw=backrooms%E5%90%8E%E5%AE%A4&amp;fr=sharewise">百度贴吧</a></li>
                <li><a href="/featured-archive">中站精品归档</a></li>
                <li><a href="/contest-archive-cn">中站竞赛归档</a></li>
                <li><a href="/authors-pages-cn">中站作者页</a></li>
                <li><a href="/hubs-hub">中心页一览</a></li>
                <li><a href="/meet-the-staff">会见职员</a></li>
                <li><a href="/site-rules">站规</a></li>
                <li><a href="/system:join">加入网站</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">指导</a>
            <ul>
                <li><a href="/guide-hub">指导中心</a></li>
                <li><a href="/resource-hub">资源中心</a></li>
                <li><a href="/tag-guide">标签指导</a></li>
                <li><a href="/how-to-write-a-level-cn">如何撰写一篇层级</a></li>
                <li><a href="/wikidot-syntax">Wikidot语法指南</a></li>
                <li><a href="/translation-guide">文章翻译与校对指导</a></li>
                <li><a href="/criticism-policy">评价守则</a></li>
                <li><a href="/licensing-guide">授权指导</a></li>
                <li><a href="/deletions-policy">删除政策</a></li>
                <li><a href="/anti-harassment-policy">反骚扰政策</a></li>
            </ul>
        </li>
    </ul>
</div>
<div class="mobile-top-bar">
    <div class="open-menu">
        <p><a href="#side-bar">≡</a></p>
    </div>
    <ul>
        <li>
            <a href="javascript:;">图书馆</a>
            <ul>
                <li><a href="/normal-levels-i">层级</a></li>
                <li><a href="/sub-layers">子区集</a></li>
                <li><a href="/enigmatic-levels">隐秘层级</a></li>
                <li><a href="/objects">物品</a></li>
                <li><a href="/entities">实体</a></li>
                <li><a href="/enigmatic-entities">隐秘实体</a></li>
                <li><a href="/phenomena">现象</a></li>
                <li><a href="/groups-list">团体</a></li>
                <li><a href="/tales">故事</a></li>
                <li><a href="/poi-s">相关人士</a></li>
                <li><a href="/canons">设定</a></li>
                <li><a href="/series-hub">文章系列</a></li>
                <li><a href="/joke-entries">搞笑条目</a></li>
                <li><a href="/translations-hub">国际翻译中心</a></li>
                <li><a href="/art-hub">艺术作品</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">原创图书馆</a>
            <ul>
                <li><a href="/normal-levels-cn-i">层级 I</a></li>
                <li><a href="/normal-levels-cn-ii">层级 II</a></li>
                <li><a href="/sub-layers-cn">子区集</a></li>
                <li><a href="/enigmatic-series-cn">隐秘系列</a></li>
                <li><a href="/entities-cn">实体</a></li>
                <li><a href="/objects-cn">物品</a></li>
                <li><a href="/phenomena-cn">现象</a></li>
                <li><a href="/groups-list-cn">团体</a></li>
                <li><a href="/tales-cn">故事</a></li>
                <li><a href="/poi-s-cn">相关人士</a></li>
                <li><a href="/canons-cn">设定</a></li>
                <li><a href="/series-cn">文章系列</a></li>
                <li><a href="/joke-entries-cn">搞笑条目</a></li>
                <li><a href="/crossover-hub">CROSSOVER</a></li>
                <li><a href="/artwork-hub-cn">艺术作品</a></li>
            </ul>
        </li>
        <li>
            <a href="javascript:;">指导</a>
            <ul>
                <li><a href="/guide-hub">指导中心</a></li>
                <li><a href="/site-rules">站规</a></li>
                <li><a href="/resource-hub">资源中心</a></li>
                <li><a href="/tag-guide">标签指导</a></li>
                <li><a href="/how-to-write-a-level-cn">如何撰写一篇层级</a></li>
                <li><a href="/wikidot-syntax">Wikidot语法指南</a></li>
                <li><a href="/translation-guide">文章翻译与校对指导</a></li>
                <li><a href="/criticism-policy">评价守则</a></li>
                <li><a href="/licensing-guide">授权指导</a></li>
                <li><a href="/deletions-policy">删除政策</a></li>
                <li><a href="/anti-harassment-policy">反骚扰政策</a></li>
                <li><a href="/meet-the-staff">会见职员</a></li>
            </ul>
        </li>
    </ul>
</div>
                        </div>
                        <div id="login-status">
                            ${loginStatus}
                        </div>
                        <div id="header-extra-div-1"><span></span></div>
                        <div id="header-extra-div-2"><span></span></div>
                        <div id="header-extra-div-3"><span></span></div>
                    </div>
                    <div id="content-wrap">
                        <div id="side-bar">
<div class="side-block media" style="padding: 10px 0;">
    <div style="text-align: center;">
        <a href="http://tieba.baidu.com/wxf/27814845?kw=backrooms%E5%90%8E%E5%AE%A4&amp;fr=sharewise">
            <img src="https://7bye.com/hoah/i/2022/11/10/36rq.svg" alt="The Backrooms吧" width="50px" class="image">
        </a>
        <a href="https://backrooms.fandom.com/zh/wiki/Backrooms_Wiki">
            <img src="https://7bye.com/hoah/i/2022/11/10/2nr8.svg" alt="Backrooms Fandom Wiki" width="50px" class="image">
        </a>
        <a href="https://space.bilibili.com/479890976">
            <img src="https://7bye.com/hoah/i/2022/11/10/lgbq.svg" alt="The Backrooms中文wiki官方哔哩哔哩公众号" width="50px" class="image">
        </a>
        <a href="https://discord.gg/jBxwBVQSCk">
            <img src="https://7bye.com/hoah/i/2022/11/10/jkxm.svg" alt="Discord" width="50px" class="image">
        </a>
    </div>
</div>
<div style="clear:both; height: 0px; font-size: 1px"></div>
<div class="side-block">
    <div class="heading">
        <p>站点导航</p>
    </div>
    <div class="menu-item">
        <p><a href="https://backrooms-wiki-cn.wikidot.com/start/">主页</a></p>
    </div>
    <div class="menu-item">
        <p><a href="https://brsandbox-pro.wikidot.com/">后室沙盒站</a></p>
    </div>
</div>
<div class="side-block">
    <div class="heading">
        <p>创作资源</p>
    </div>
    <div class="menu-item">
        <p><a href="/guide-hub">指导中心</a> | <a href="/resource-hub">资源中心　　</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/themes">主题版式</a> | <a href="/themes-cn">原创主题版式</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/components">组件中心</a></p>
    </div>
</div>
<div class="side-block">
    <div class="heading">
        <p>网站</p>
    </div>
    <div class="menu-item">
        <p><a href="/most-recently-created">最近创建的页面</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/system:recent-changes">最近的更新</a> | <a href="/most-recently-edited">最近的编辑</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/top-rated-pages-this-month">本月最高评分页面</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/top-rated-pages">历史最高评分页面</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/lowest-rated-pages">最低评分的页面</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/old-pages">旧页面</a> | <a href="/archived-pages">归档页</a> | <a href="/trimmed:hub">保留页</a></p>
    </div>
</div>
<div class="side-block">
    <div class="heading">
        <p>社群</p>
    </div>
    <div class="menu-item">
        <p><a href="/site-rules">站规　　</a> | <a href="/system:join">加入网站　</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/featured-archive">精品归档</a> | <a href="/contest-archive-cn">竞赛归档　</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/forum:start">讨论区　</a> | <a href="/forum:recent-posts">最近的帖子</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/authors-pages">作者页　</a> | <a href="/authors-pages-cn">中文作者页</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/art-exhibitions-cn">艺术集　</a> | <a href="https://backrooms-tech-cn.wikidot.com/reserve">翻译预定　</a></p>
    </div>
</div>
<div class="side-block">
    <div class="heading">
        <p>随机页面</p>
    </div>
    <div class="menu-item">
        <p><a href="/random:random-level">随机层级</a> | <a href="/random:random-level-cn">随机原创层级</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/random:random-entity">随机实体</a> | <a href="/random:random-entity-cn">随机原创实体</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/random:random-object">随机物品</a> | <a href="/random:random-object-cn">随机原创物品</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/random:random-phenomenon">随机现象</a> | <a href="/random:random-phenomenon-cn">随机原创现象</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/random:random-tale">随机故事</a> | <a href="/random:random-tale-cn">随机原创故事</a></p>
    </div>
</div>
<div class="side-block">
    <div class="heading">
        <p>管理专用</p>
    </div>
    <div class="menu-item">
        <p><a href="http://backrooms-wiki-cn.wikidot.com/_admin">后台管理</a></p>
    </div>
    <div class="menu-item">
        <p><a href="http://backrooms-oversight-cn.wikidot.com/">职员站点</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/system:members">成员一览</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/system:list-all-categories">所有分类</a> | <a href="/system:list-all-pages">所有页面</a></p>
    </div>
    <div class="menu-item">
        <p><a href="/nav:side">侧栏</a> | <a href="/nav:top">顶栏</a></p>
    </div>
</div>
<div style="clear:both; height: 0px; font-size: 1px"></div>
<a class="close-menu" href="##">
    <br>
    <img src="https://scp-wiki.wdfiles.com/local--files/nav:side/black.png" style="z-index: -1; opacity: 0.3;" alt="black.png" class="image">
    <br>
</a>
<div style="height: 150px;">
<p>　</p>
</div>
                        </div>
                        <div id="main-content">
                            <div id="action-area-top"></div>
                            <div id="page-title">${title}</div>
                            <div id="page-content">${content}</div>
                            <div class="page-tags">
                                <span>${finalTags}</span>
                            </div>
                            <div id="page-info-break"></div>
                            <div id="page-options-container"></div>
                            <div id="action-area" style="display: none;"></div>
                        </div>
                    </div>
                    <div id="footer" style="display: block; visibility: visible;">
                        <div class="options" style="display: block; visibility: visible;">
                            <a href="https://www.wikidot.com/doc" id="wikidot-help-button">说明</a>
                            &nbsp;|
                            <a href="https://www.wikidot.com/legal:terms-of-service" id="wikidot-tos-button">服务条款</a>
                            &nbsp;|
                            <a href="https://www.wikidot.com/legal:privacy-policy" id="wikidot-privacy-button">隐私</a>
                            &nbsp;|
                            <a href="javascript:;" id="bug-report-button"">报告错误</a>
                            &nbsp;|
                            <a href="javascript:;" id="abuse-report-button">标记为令人反感的</a>
                        </div>
                        基于 <a href="https://www.wikidot.com">Wikidot.com</a>
                    </div>
                    <div id="license-area" class="license-area">
                        除非特别注明，本页内容采用以下授权方式：
                        <a rel="license" href="https://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 License</a>
                    </div>
                    <div id="extrac-div-1"><span></span></div>
                    <div id="extrac-div-2"><span></span></div>
                    <div id="extrac-div-3"><span></span></div>
                </div>
            </div>
            <div id="extra-div-1"><span></span></div>
            <div id="extra-div-2"><span></span></div>
            <div id="extra-div-3"><span></span></div>
            <div id="extra-div-4"><span></span></div>
            <div id="extra-div-5"><span></span></div>
            <div id="extra-div-6"><span></span></div>
        </div>
    </div>
</body>

</html>
`;
  }
}
