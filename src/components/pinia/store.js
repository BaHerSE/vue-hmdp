import { defineStore } from 'pinia'
import { getUserApi } from "/src/utils/api.js";
export default defineStore('main', {
    state: () => {
        return {
            id: 1,
            nickName: '123',
            icon: '',
        }
    },
    getters: {

    },
    actions: {

    }
})