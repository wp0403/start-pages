/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-19 13:52:09
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-26 19:25:01
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
 * 获取本地储存的配置
 */
