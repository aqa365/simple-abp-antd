import { FzGlobalObj } from '@/services/venom/FzGlobalObj';
import { ApplicationConfigDto } from '@/services/venom/dtos/ApplicationConfigDto';

const defaultWeapons  = {
    title: 'Rifle',
    value:'Rifle',
    children: [
        {
            title: 'AK47',
            value: 7,
        },
        {
            title: 'M4A1',
            value: 60,
        },
    ],
};

export default {
    getFz() {
        const fzGlobal: FzGlobalObj = window['FzGlobal'];
        return fzGlobal;
    },
    getAppConfig() {
        let appConfig: ApplicationConfigDto | null = null;
    
        const fzGlobal = this.getFz();
        if (!fzGlobal) return appConfig;
    
        let jsonString = fzGlobal.get();
        appConfig = jsonString ? eval('(' + jsonString + ')') : undefined;
        return appConfig;
    },
    getWeapons(){
        let appConfig = this.getAppConfig();
        if(!appConfig?.weapons){
            return [defaultWeapons];
        }

        let weapons: any = [];
        for (let key in appConfig?.weapons) {
            const groupModel ={
                title: key,
                value:key,
                children:[{}]
            }

            for (let weapon in appConfig?.weapons[key]) {
                groupModel.children.push({
                    title: appConfig?.weapons[key][weapon],
                    value: weapon,
                })
            }

            weapons.push(groupModel);
        }

        return weapons;

    },
    getKeys() {
        let appConfig = this.getAppConfig();
        if(!appConfig?.keys){
            return [{
                label: 'LShift',
                value: 1,
            }]
        }

        let keys: any = [];
        for (let key in appConfig?.keys) {
            keys.push({
                label: key,
                value: appConfig?.keys[key],
            });
        }

        return keys;
    },
    
}