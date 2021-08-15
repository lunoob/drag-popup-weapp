import { deviceInfo, px2rpx } from '../../utils/util'

Component({
    properties: {
        title: {
            type: String,
            value: '拖拽上拉'
        }
    },
    data: {
        result: 0,
        transform: '',
        isBindEvent: true,
        touchStart: '',
        touchMove: ''
    },
    lifetimes: {
        created() {
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
                    this.setData({
                        result: {
                            // 可视窗口高度
                            windowHeight: deviceInfo.windowHeight,
                            // 初始位移值
                            initHeight: offsetY,
                            // 底部安全区域
                            bottomSafeArea: `${safeBottomArea}px`
                        },
                        transform: `translate3d(0, ${offsetY}px, 0)`
                    })
                    this.headerHeight = safeBottomArea + height
                }).exec()
        }
    },
    methods: {
        listenTouchEvent() {
            if (this.data.isBindEvent) return
            console.log('listen start')
            this.setData({ 
                isBindEvent: true
            })
        },
        offTouchEvent() {
            if (!this.data.isBindEvent) return
            console.log('listen off')
            this.setData({ 
                isBindEvent: false
            })
        },
        onTouchStart(event) {
            if (this.data.isBindEvent) return
            this.offset.start = event.changedTouches[0].clientY
        },
        onTouchMove(event) {
            console.log('object move')
            if (this.data.isBindEvent) return
            // 触发 touch move 说明，已经到底或者到顶
            const offsetY = event.changedTouches[0].clientY - this.offset.start
            if (offsetY > 0) {
                if (this.data.isBindEvent) return
                // 到达顶部，并且往下拉
                this.listenTouchEvent()
            }
        },
        onScroll({ detail }) {
            if (this.data.isBindEvent) return
            if (detail.scrollTop <= 0) {
                console.log('hit')
                this.listenTouchEvent()
            }
            console.log('top')
        }
    }
})
