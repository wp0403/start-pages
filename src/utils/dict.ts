/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-25 17:48:09
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-26 19:41:30
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
        icon: 'https://api.vvhan.com/api/ico?url=bilibili.com'
    },
    {
        id: 6,
        title: 'Chatbot UI',
        url: 'https://ai.qiaomu.pro/zh',
    },
    {
        id: 7,
        title: 'shimmer',
        url: 'https://wp-boke.work/',
    },
];

export const bgList = [
    {
        id: 1,
        title: '少年的笔记',
        background: 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)'
    },
    {
        id: 2,
        title: '褪色的夕阳',
        background: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)'
    },
    {
        id: 3,
        title: '夕阳下的雨',
        background: 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'
    },
]

export const config = {
    isClearSearch: false,  // 是否清空搜索
    isSaveHistory: false,  // 是否保存历史记录
    bg: 'linear-gradient(to top, #9795f0 0%, #fbc8d4 100%)',  // 当前背景
    enginesId: 1, // 当前选中的搜索引擎id
    contentType: true,  // 当前的内容展示页  true为热搜，false为书签
    theme: 'auto',  // 当前的主题 light为亮色，dark为暗色，auto为跟随系统
    searchList,
    bookmark,
    bgList,
};