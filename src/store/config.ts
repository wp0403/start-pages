/*
 * @Descripttion: 
 * @version: 
 * @Author: WangPeng
 * @Date: 2023-06-26 19:29:19
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-06-30 19:38:57
 */
import { reactive } from 'vue'
import { initConfig } from '@/utils/dict'

const newConfig = localStorage.getItem('config') ? JSON.parse(localStorage.getItem('config') as any) : false;
if (newConfig && initConfig.version !== newConfig.version) {
    localStorage.clear();
}

const config = reactive(initConfig);

if (newConfig) {
    const configkeyList = Object.keys(newConfig);
    configkeyList.forEach(v => {
        config[v] = newConfig[v];
    })
}

const configStore = reactive({
    config: initConfig,
    changeConfig(key, value) {
        configStore.config[key] = value;
        switch (key) {
            case 'bg':
                configStore.config.bgType = value.includes('url(') ? 'image' : 'color';
                break;
        }
        localStorage.setItem('config', JSON.stringify(configStore.config));
    },
    resetConfig() {
        localStorage.removeItem('config');
        Object.assign(configStore.config, initConfig);
        window.history.go(0);
    }
})

export default configStore;