import { deviceInfo } from '../../utils/util'

Component({
    properties: {
        title: {
            type: String,
            value: '拖拽上拉'
        }
    },
    data: {
        sResult: 0,
        result: 0,
        transform: '',
        isBindEvent: true,
        touchStart: '',
        touchMove: '',
        contentHeight: '100%'
    },
    lifetimes: {
        created() {
            this.headerHeight = 0
            this.offset = {
                start: 0
            }
        },
        attached() {
            this.createSelectorQuery()
                .in(this)
                .select('.popup-header')
                .boundingClientRect(({ height }) => {
                    const { windowHeight, statusBarHeight, screenHeight } = deviceInfo
                    // 底部安全区域高度： 屏幕高度 - 可视窗口高度 - 状态栏高度
                    const safeBottomArea = screenHeight - windowHeight - statusBarHeight
                    // 偏移量：可视窗口高度 - 底部安全区域高度 - 组件 header 高度
                    const offsetY = windowHeight - safeBottomArea - height
                    this.headerHeight = safeBottomArea + height
                    this.setData({
                        result: {
                            // 可视窗口高度
                            windowHeight: deviceInfo.windowHeight,
                            // 初始位移值
                            initHeight: offsetY,
                            // 底部安全区域
                            bottomSafeArea: `${safeBottomArea}px`
                        },
                        transform: `translate3d(0, ${offsetY}px, 0)`,
                        contentHeight: windowHeight - this.headerHeight + 'px'
                    })
                }).exec(() => {
                    this.scrollInit()
                })
        }
    },
    methods: {
        // t-scroll
        async scrollInit() {
            const wrapper = this.createSelectorQuery().select('#t-scroll-wrapper')
            const scroller = this.createSelectorQuery().select('#t-scroll-scroller')
            const [ scrollerRect, wrapperRect ] = await Promise.all([
                this.invoke(scroller, 'boundingClientRect'),
                this.invoke(wrapper, 'boundingClientRect'),
            ])
            this.setData({
                sResult: { 
                    scrollerHeight: scrollerRect.height,
                    wrapperHeight: wrapperRect.height,
                    bounce: false
                }
            })
        },
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
