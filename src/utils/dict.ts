/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-25 17:48:09
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-07-14 11:53:07
 */
export const searchList = [
    {
        id: 1,
        title: "百度",
        icon: "",
        url: "https://www.baidu.com/s?ie=utf-8&word=",
        regular: true,
    },
    {
        id: 2,
        title: "谷歌",
        icon: "",
        url: "https://www.google.com/search?q=",
        regular: true,
    },
    {
        id: 3,
        title: "必应",
        icon: "",
        url: "https://www.bing.com/search?q=",
        regular: true,
    },
    {
        id: 4,
        title: "抖音",
        icon: "",
        url: "https://www.douyin.com/search/",
        regular: false,
    },
    {
        id: 5,
        title: "掘金",
        icon: "",
        url: "https://juejin.cn/search?query=",
        regular: false,
    }
];

// 热搜渠道列表
export const hotSearchList = [
    {
        id: 1,
        title: '百度',
        url: 'https://api.wp-boke.work/baidu',
    },
    {
        id: 2,
        title: '微博',
        url: 'https://api.wp-boke.work/weibo',
    },
    {
        id: 3,
        title: '抖音',
        url: 'https://api.wp-boke.work/douyin_new',
    },
    {
        id: 5,
        title: '36氪',
        url: 'https://api.wp-boke.work/36kr',
    },
    {
        id: 6,
        title: '头条',
        url: 'https://api.wp-boke.work/toutiao',
    },
    {
        id: 7,
        title: '知乎',
        url: 'https://api.wp-boke.work/zhihu',
    },
    {
        id: 8,
        title: 'bilibili',
        url: 'https://api.wp-boke.work/bilibili',
    },
    {
        id: 9,
        title: '少数派',
        url: 'https://api.wp-boke.work/sspai',
    },
    {
        id: 10,
        title: '腾讯新闻',
        url: 'https://api.wp-boke.work/newsqq',
    },
    {
        id: 11,
        title: '澎湃新闻',
        url: 'https://api.wp-boke.work/thepaper',
    },
    {
        id: 12,
        title: '百度贴吧',
        url: 'https://api.wp-boke.work/tieba',
    },
    {
        id: 13,
        title: '掘金',
        url: 'https://api.wp-boke.work/juejin',
    },
    {
        id: 14,
        title: 'IT之家',
        url: 'https://api.wp-boke.work/ithome',
    },
]

export const bookmark = [
    {
        id: 1,
        title: '掘金',
        url: 'https://juejin.cn/',
    },
    {
        id: 2,
        title: '知乎',
        url: 'https://www.zhihu.com/',
    },
    {
        id: 3,
        title: '语雀',
        url: 'https://www.yuque.com/',
    },
    {
        id: 4,
        title: '力扣',
        url: 'https://leetcode.cn/',
    },
    {
        id: 5,
        title: 'bilibili',
        url: 'https://www.bilibili.com/',
    },
    {
        id: 7,
        title: 'shimmer',
        url: 'https://wp-boke.work/',
    },
    {
        id: 8,
        title: '韩小韩API接口站',
        url: 'https://api.vvhan.com/',
    },
];

export const bgList = [
    {
        id: 1,
        title: '少年的笔记',
        background: 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)',
        type: 'color',
    },
    {
        id: 2,
        title: '褪色的夕阳',
        background: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
        type: 'color',
    },
    {
        id: 3,
        title: '夕阳下的雨',
        background: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
        type: 'color',
    },
    {
        id: 4,
        title: 'bg00001',
        background: 'url(/images/bg00001.jpg)',
        type: 'image',
    },
    {
        id: 5,
        title: 'bg00003',
        background: 'url(/images/bg00003.jpg)',
        type: 'image',
    },
]

export const themeList = [
    {
        id: 'auto',
        name: '跟随系统'
    },
    {
        id: 'light',
        name: '亮色'
    },
    {
        id: 'dark',
        name: '暗色'
    },
]

export const initConfig = {
    version: '1.0.6',
    // 是否清空搜索
    isClearSearch: false,
    // 是否保存历史记录 
    isSaveHistory: false,
    // 是否展示热搜 
    isHotSearch: true,
    // 当前背景
    bg: 'url(/images/bg00001.jpg)',
    // 背景类型
    bgType: 'color',
    // 是否展示壁纸暗色滤镜
    isBgDarkFilter: true,
    // 当前选中的搜索引擎id
    enginesId: 1,
    // 当前的内容展示页  1为热搜，2为书签
    contentType: 1,
    // 是否自动切换主题
    isAutoChangeTheme: false,
    // 当前的主题 true为亮色，false为暗色
    theme: true,
    currentHotSearch: 1,  // 当前热搜
    // 是否展示一言
    isIan: true,
    searchList,
    bookmark,
    bgList,
    hotSearchList,
};