/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-19 13:52:09
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-28 21:26:29
 */
export const getWeather = async () => {
  const key = '20561291894a3365e0a71cad618749e0';
  // 使用第三方IP地址查询API来获取当前IP地址
  fetch(`https://restapi.amap.com/v3/ip?key=${key}`)
    .then(response => response.json())
    .then(data => {
      fetch(`https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${data.adcode}&extensions=base`)
        .then(response => response.json())
        .then(res => {
          return res;
        })
    })
    .catch(error => console.error(error));
}

/**
 * 主题切换
 * @returns 
 */
export const handleThemeChange = (event) => {
  if (event.matches) {
    // console.log('light')
    document.documentElement.classList.remove("dark");
    return 2;
  } else {
    // console.log('dark')
    document.documentElement.classList.add("dark");
    return 1;
  }
}

/**
 * 分割数组成对象数组
 */
export const splitArray = (list, number) => {
  const result = [...list,false].reduce((acc, curr, index) => {
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
