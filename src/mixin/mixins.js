import Vue from "vue";
import { Toast } from 'vant'
import { mapMutations, mapActions } from 'vuex'

Vue.mixin({
    methods: {
        _toast(message = 'toast') {
            Toast({
                message,
                duration: 2500,
            })
        },
        _loading(message = 'loading...') {
            Toast.loading({
                message,
                duration: 0,
                mask: true,
                forbidClick: false,
            })
        },
        _Verifying(message = 'Verifying...') {
            Toast.loading({
                message,
                duration: 0,
                mask: false,
                forbidClick: false,
            })
        },
        _success(message = 'Success') {
            Toast.success({
                message,
                duration: 3000,
                mask: false,
                forbidClick: false,
            })
        },
        _fail(message = "Error") {
            Toast.fail({
                message,
                duration: 3000,
                mask: false,
                forbidClick: false,
            })
        },
        _clear() {
            let timer = setTimeout(() => {
                Toast.clear()
                clearTimeout(timer);
            }, 400)
        },
        encodeURIComponent(url) {
            return encodeURIComponent(url)
        },
    }
})