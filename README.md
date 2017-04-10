# scss-flex

> flexbox，移动端 flex 布局神器，兼容微信，UC，webview 等移动端主流浏览器，可以通过 bower 和 npm 下载

### 参考

> <https://github.com/lzxb/flex.css>
>
> 使用 SASS 语法编写，使用 gulp 前端打包工具进行打包
>
> 针对 flexbox 布局方式的详细介绍：[Flex 布局](https://vxhly.github.io/2016/08/11/flexbox-layout/)

### download

    git clone https://github.com/vxhly/scss-flex.git

### npm

    npm install scss-flex --save

### bower

    bower install scss-flex --save

### 为什么需要 flex.css?

    在移动端开发中，并不是所有的浏览器，webview，微信等各种版本都支持标准的 flex，
    但是基本上都会支持 -webkit-box，所以 scss-flex.css 的主要作用是保证每一个属性都能支持标准 flex 或旧版本的 -webkit-box。
    由于 flex.css 采用了 autoprefixer 编译，所以能够保证在浏览器不支持标准 flex 布局的情况下，
    回滚到旧版本的 -webkit-box，保证移动设备中能呈现出一样的布局效果。
    于是，一款移动端快速布局的神器诞生了...

### support

    flex 布局分为旧版本 `dispaly: box`;过渡版本 `dispaly: flexbox`;以及现在的标准版本 `display: flex`;

    Android
      2.3 开始就支持旧版本 `display:-webkit-box`;
      4.4 开始支持标准版本 `display: flex`;

    IOS
      6.1 开始支持旧版本 `display:-webkit-box`;
      7.1 开始支持标准版本 `display: flex`;

    PC
      如果你不需要兼容 ie10 以下版本，也是可以使用 scss-flex.css

    flex.css同时能兼容新版本和旧版本，保证了浏览器不支持新版本时，回退到旧版本。

![Alt text](https://github.com/vxhly/scss-flex/blob/master/img/caniuse.png)

### use

```html
<link rel="stylesheet" href="./dist/css/scss-flex.css">

<!-- flex 属性匹配，简单的子元素居中例子： -->
  <div flex="main:center cross:center" style="width:500px; height: 500px; background: #108423">
    <div style="background: #fff">看看我是不是居中的</div>
  </div>

<!-- data-flex 属性匹配，简单的子元素居中例子： -->
  <div data-flex="main:center cross:center" style="width:500px; height: 500px; background: #f1d722">
    <div style="background: #fff">看看我是不是居中的</div>
  </div>
```

### flex属性大全

    dir：主轴方向
        top：从上到下
        right：从右到左
        bottom：从下到上
        left：从左到右（默认）

    main：主轴对齐方式
        right：从右到左
        left：从左到右（默认）
        justify：两端对齐
        center：居中对齐

    cross：交叉轴对齐方式
        top：从上到下（默认）
        bottom：从上到下
        baseline：基线对齐
        center：居中对齐
        stretch：高度并排铺满

    box：子元素设置
        mean：子元素平分空间
        first：第一个子元素不要多余空间，其他子元素平分多余空间
        last：最后一个子元素不要多余空间，其他子元素平分多余空间
        justify：两端第一个元素不要多余空间，其他子元素平分多余空间

### flex-box 属性说明

    取值范围(`0-10`)，单独设置子元素多余空间的如何分配，设置为 0，则子元素不占用多余的多余空间
    多余空间分配 = 当前 flex-box 值/子元素的 flex-box 值相加之和
