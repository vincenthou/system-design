import { defineConfig, DefaultTheme } from 'islandjs';
import { remarkCodeHike } from "@code-hike/mdx";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const codeHikeTheme = require("shiki/themes/nord.json");
const version = require('../../package.json').version;

function getI18nHelper(lang: 'zh' | 'en') {
  const cn = lang === 'zh';
  const prefix = cn ? '/zh' : '/en';
  const getLink = (str: string) => `${prefix}${str}`;
  const getText = (cnText: string, enText: string) => (cn ? cnText : enText);
  return { getText, getLink };
}

export default defineConfig({
  lang: 'en-US',
  title: 'System Design',
  icon: '/logo.png',
  vite: {
    // custom config for vite
  },
  markdown: {
    rehypePlugins: [],
    remarkPlugins: [
      [
        remarkCodeHike, 
        { 
          theme: codeHikeTheme, 
          autoImport: true, 
          showCopyButton: true 
        }
      ],
    ],
  },
  themeConfig: {
    locales: {
      '/zh/': {
        lang: 'zh',
        label: '简体中文',
        lastUpdatedText: '上次更新',
        nav: getNavbar('zh'),
        sidebar: getSidebar('zh'),
        title: '系统设计',
        outlineTitle: '目录',
        prevPageText: '上一页',
        nextPageText: '下一页',
        description: '逐步可交互学习系统设计',
        editLink: {
          pattern:
            'https://github.com/vincenthou/system-design/tree/master/docs/:path',
          text: '📝 在 GitHub 上编辑此页'
        }
      },
      '/en/': {
        lang: 'en',
        label: 'English',
        lastUpdated: 'Last Updated',
        nav: getNavbar('en'),
        sidebar: getSidebar('en'),
        title: 'System Design',
        description: 'An interactive site to learn system design step by step',
        lastUpdatedText: 'Last Updated',
        editLink: {
          pattern:
            'https://github.com/vincenthou/system-design/tree/master/docs/:path',
          text: '📝 Edit this page on GitHub'
        }
      }
    },
  },
});

// the sidebar on the left
function getSidebar(lang: 'zh' | 'en'): DefaultTheme.Sidebar {
  const { getLink, getText } = getI18nHelper(lang);

  return {
    [getLink('/playground/')]: [
      {
        text: getText('快速使用', 'Quick Start'),
        items: [
          {
            text: getText('层层下钻', 'Layer-to-Layer'),
            link: getLink('/playground/play')
          },
          {
            text: getText('关系图谱', 'Relation Diagram'),
            link: getLink('/playground/relation')
          }
        ]
      }
    ],
    [getLink('/guide/')]: [
      {
        text: getText('介绍', 'Getting Started'),
        items: [
          {
            text: getText('快速开始', 'Getting Started'),
            link: getLink('/guide/getting-started')
          },
        ]
      },
      {
        text: getText('架构', 'Architecture'),
        items: [
          {
            text: getText('渲染器和编辑器', 'Renderer and Editor'),
            link: getLink('/guide/renderer-and-editor')
          }
        ]
      },
      {
        text: getText('高级能力', 'Advanced'),
        items: [
          {
            text: getText('插件能力', 'Plugins'),
            link: getLink('/guide/plugins')
          }
        ]
      }
    ],
    [getLink('/resource/')]: [
      {
        text: getText('资源', 'Resources'),
        items: [
          {
            text: getText('链接', 'Links'),
            link: getLink('/resource/links')
          },
        ]
      }
    ],
  };
}

// the navbar on the top right
function getNavbar(lang: 'zh' | 'en') {
  const { getLink, getText } = getI18nHelper(lang);

  return [
    {
      text: getText('游乐场', 'Playground'),
      link: getLink('/playground/play'),
      activeMatch: '/playground/'
    },
    {
      text: getText('指南', 'Guide'),
      link: getLink('/guide/getting-started'),
      activeMatch: '/guide/'
    },
    {
      text: getText('资源', 'Resources'),
      link: getLink('/resource/links'),
      activeMatch: '/resource/'
    },
    {
      text: `v${version}`,
      items: [
        {
          text: getText('更新日志', 'Changelog'),
          link: 'https://github.com/vincenthou/system-design/blob/master/CHANGELOG.md'
        },
        {
          text: getText('贡献指南', 'Contributing'),
          link: 'https://github.com/vincenthou/system-design/blob/master/.github/contributing.md'
        }
      ]
    }
  ];
}