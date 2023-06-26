/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-26 19:29:19
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-26 19:45:39
 */
import { reactive } from 'vue'
import { config } from '@/utils/dict'

const newConfig = localStorage.getItem('config') ? JSON.parse(localStorage.getItem('config') as any) : false;

const configStore = reactive({
    config: newConfig || config,
    changeConfig(key, value) {
        configStore.config[key] = value;
        localStorage.setItem('config', JSON.stringify(configStore.config));
    },
    resetConfig() {
        localStorage.clear();
        configStore.config = config;

    }
})

export default configStore;