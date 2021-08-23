# boss-drag-popup

微信小程序 - boss直聘企业详情上拉框

ios 设备会比 android 设备要快很多

## 预览

<img src="/Users/mac/items/luoob/mp-weixin/boss-drag-popup/images/wpqkp-ypkgn.gif" alt="wpqkp-ypkgn" style="zoom:50%;float:left;" />



## 使用

#### 在 json 文件中引入

```json
{
	"usingComponents": {
		"drag-popup-scroll": "../../components/drag_popup_scroll/index"
	},
	"navigationBarBackgroundColor": "#000",
	"navigationBarTextStyle": "white"
}
```



#### 在 wxml 文件中使用

```html
<!-- 加入滚动内容的组件 -->
<drag-popup-scroll>
  <view class="row-item" wx:for="{{ 30 }}" wx:key="item">{{ item }}</view>
</drag-popup-scroll>
```



## 参数

| 参数  | 数据类型 | 作用       |
| ----- | -------- | ---------- |
| title | string   | 上拉框标题 |



## 参考

- boss 直聘小程序
- [掘金惯性滚动文章](https://juejin.cn/post/6844904185121488910)

