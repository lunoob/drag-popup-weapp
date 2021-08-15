Component({
    data: {
        result: null
    },
    properties: {
        onScrollEnd: {
            type: Object,
            value: {}
        },
        bounce: {
            type: Boolean,
            value: true
        }
    },
    lifetimes: {
        async attached() {
            const scroller = this.createSelectorQuery().select('#t-scroll-scroller')
            const wrapper = this.createSelectorQuery().select('#t-scroll-wrapper')
            const [ scrollerRect, wrapperRect ] = await Promise.all([
                this.invoke(scroller, 'boundingClientRect'),
                this.invoke(wrapper, 'boundingClientRect'),
            ])
            this.data.onScrollEnd.fn()
            this.setData({
                result: { 
                    msg: 'hello word',
                    scrollerHeight: scrollerRect.height,
                    wrapperHeight: wrapperRect.height,
                    bounce: this.data.bounce
                }
            })
        }
    },
    methods: {
        /**
         * 调用元素的异步方法
         * @param {any} el          元素
         * @param {string} method   方法名
         * @returns {Promise}
         */
        invoke(el, method) {
            return new Promise((resolve) => {
                el[method](resolve).exec()
            }).catch(err => {
                console.log(err)
            })
        }
    }
})
