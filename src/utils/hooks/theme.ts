/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-20 15:26:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-20 17:45:28
 */
import {watch,ref} from 'vue'
import { handleThemeChange } from '@/utils/utils'
import themeStore from '@/store/theme'

const useTheme = () => {
    const t = ref(1);
    // 切换主题
    const themeSwitch = (event) => {
        if (event === "click") {
            document.documentElement.classList.toggle("dark");
            themeStore.changeTheme(themeStore.theme === 1 ? 2 : 1);
        } else {
            themeStore.changeTheme(handleThemeChange(event))
        }
    };

    const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: light)"
    );

    const init = () => {
        themeSwitch(darkModeMediaQuery);
    }

    const addMediaQuery = () => {
        // 添加一个监听器来监听主题切换
        darkModeMediaQuery.addEventListener("change", themeSwitch);
    }

    const removeMediaQuery = () => {
        // 移除一个监听器来监听主题切换
        darkModeMediaQuery.removeEventListener("change", themeSwitch);
    }

    watch(() => themeStore.theme,(v) => {
        t.value = v;
    })

    return {
        theme: t,
        themeSwitch,
        init,
        addMediaQuery,
        removeMediaQuery,
    }
}

export default useTheme;
