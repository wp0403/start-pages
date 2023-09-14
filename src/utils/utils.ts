/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-19 13:52:09
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-09-14 15:40:23
 */
import device from 'current-device'

/**
 * 主题切换
 * @returns 
 */
export const handleThemeChange = (event) => {
  if (event.matches) {
    // console.log('light')
    document.documentElement.classList.remove("dark");
    return true;
  } else {
    // console.log('dark')
    document.documentElement.classList.add("dark");
    return false;
  }
}

/**
 * 分割数组成对象数组
 */
export const splitArray = (list, number) => {
  const result = [...list,false,false].reduce((acc, curr, index) => {
    const pageIndex = Math.floor(index / number); // 计算当前元素属于哪一页
    if (!acc[pageIndex]) {
      // 如果当前页不存在，则创建一个新的页对象
      acc[pageIndex] = { page: pageIndex + 1, data: [] };
    }
    // 将当前元素添加到对应的页对象的 data 数组中
    acc[pageIndex].data.push(curr);
    return acc;
  }, []);
  return result;
}

/**
 * 判断设备
 * @returns {isTablet | isPhone | isPc} {平板 | 手机 | 电脑}
 */
export const os = (function () {
  return {
    isTablet: device.ipad() || device.androidTablet() || device.mobile(), // 平板
    isPhone: device.mobile(), // 手机
    isPc: device.desktop() // 电脑
  }
})()

