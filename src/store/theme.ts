/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-20 16:33:08
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-26 19:49:05
 */
import { reactive } from 'vue'

const themeStore = reactive({
    theme: 1,
    changeTheme(v: number) {
        themeStore.theme = v;
    }
})

export default themeStore;