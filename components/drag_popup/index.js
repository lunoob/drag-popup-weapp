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
        transform: ''
    },
    lifetimes: {
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
                }).exec()
        }
    }
})
