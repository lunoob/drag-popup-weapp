// 系统信息
export const deviceInfo = wx.getSystemInfoSync()

/**
 * px 转 rpx
 * @param {number} px     像素值
 * @returns {number}
 */
export const px2rpx = (px) => {
	return px * 750 / deviceInfo.windowWidth
}