/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-26 10:40:17
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-26 17:30:58
 */
// 获取微博热搜
export const getHotWeiBoSearchList = async () => {
    const res = await fetch(`https://api.vvhan.com/api/wbhot`);
    const data = await res.json();
    return data.data;
}

// 随机一言
export const getIan = async () => {
    const res = await fetch('https://api.vvhan.com/api/ian?type=json');
    const data = await res.json();
    return data.data;
}

// 天气
export const getWeather = async () => {
    const res = await fetch('https://api.vvhan.com/api/weather');
    const data = await res.json();
    return data.data;
}