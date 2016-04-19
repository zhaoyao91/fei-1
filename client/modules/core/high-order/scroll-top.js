import React from 'react';

/**
 * 为组件增加滚动到指定位置的功能
 *
 * 简单用法
 * const NewComp = build()(Comp)
 * NewComp接收props.scrollTop(half-controlled)
 * 当scrollTop为非falsy值时，更新滚动高度(默认设置body.scrollTop)
 *
 * 高级用法
 * const NewComp = build(options)(Comp)
 * 详情请参考代码
 *
 * @param options
 * @param options.ignoreFlash - 若为true，则x, falsy, x之类的情况不更新
 * @param options.getInitScrollTop - func(comp): scrollTop
 * @param options.getOldScrollTop - func(comp, oldProps, oldState): scrollTop
 * @param options.getNewScrollTop - func(comp): scrollTop
 * @param options.setScrollTop - func(scrollTop)
 */
export default (options = {}) => {
    const {
        ignoreFlash = true,
        getInitScrollTop = () => 0,
        getOldScrollTop = (comp, oldProps) => oldProps.scrollTop,
        getNewScrollTop = comp => comp.props.scrollTop,
        setScrollTop = (scrollTop) => document.body.scrollTop = scrollTop
        } = options;

    return (Component)=> class extends React.Component {
        componentDidMount() {
            this.tryUpdateScrollTop(
                getInitScrollTop(this),
                getNewScrollTop(this)
            )
        }

        componentDidUpdate(oldProps, oldState) {
            this.tryUpdateScrollTop(
                getOldScrollTop(this, oldProps, oldState),
                getNewScrollTop(this)
            )
        }

        render() {
            return <Component {...this.props}/>
        }

        tryUpdateScrollTop(oldValue, newValue) {
            if (newValue && oldValue !== newValue) {
                if (ignoreFlash) {
                    if (this.lastValidScrollTop !== newValue) {
                        this.lastValidScrollTop = newValue;
                        setScrollTop(newValue)
                    }
                }
                else {
                    setScrollTop(newValue)
                }
            }
        }
    }
}
