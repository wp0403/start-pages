/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-26 10:40:17
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-27 20:24:54
 */
// 获取热搜
export const getHotSearchList = async (v?) => {
    const res = await fetch(v || `https://api.vvhan.com/api/wbhot`);
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