/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-20 15:26:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-29 18:15:18
 */
import { handleThemeChange } from '@/utils/utils'
import configStore from "@/store/config";

const { changeConfig, config } = configStore;

const useTheme = () => {
    // 切换主题
    const themeSwitch = (event) => {
        if (event === "click") {
            document.documentElement.classList.toggle("dark");
            const isDark = document.documentElement.classList.contains('dark');
            changeConfig('theme', !isDark)
        } else {
            config.isAutoChangeTheme && changeConfig('theme', handleThemeChange(event))
        }
    };

    const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: light)"
    );

    const init = () => {
        if(config.isAutoChangeTheme){
            themeSwitch(darkModeMediaQuery);
        }else{
            if(config.theme){
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }else{
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
            }
        }
    }

    const addMediaQuery = () => {
        // 添加一个监听器来监听主题切换
        darkModeMediaQuery.addEventListener("change", themeSwitch);
    }

    const removeMediaQuery = () => {
        // 移除一个监听器来监听主题切换
        darkModeMediaQuery.removeEventListener("change", themeSwitch);
    }

    return {
        themeSwitch,
        init,
        addMediaQuery,
        removeMediaQuery,
    }
}

export default useTheme;
