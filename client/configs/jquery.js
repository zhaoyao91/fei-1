/**
 * 将npm的jquery应用到全局
 * 因为目前有些库依赖全局jquery变量（比如bootstrap），这是很糟糕的，但是没办法只能适应它
 * 注意，meteor自带了老版本的jquery，也是应用到全局的，这段代码会覆盖它
 */

import $ from 'jquery';
const global = this;

export default function () {
    global.$ = global.jQuery = $;
}
