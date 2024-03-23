/*
 * @Descripttion: 
 * @version: 
 * @Author: zhy
 * @Date: 2024-03-22 16:21:58
 * @LastEditors: zhy
 * @LastEditTime: 2024-03-22 17:23:16
 */
let Vue
//myVuex.js
class Store {
    constructor(options) {
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })

        let getters = options.getter || {}
        this.getters = {}
        Object.keys(getters).forEach(getterName => {
            Object.defineProperty(this.getters, getterName, {
                get: () => {
                    return getters[getterName](this.state)
                }
            })
        })

        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = (arg) => {
                mutations[mutationName](this.state, arg)
            }
        })

        let actions = options.actions
        this.actions = {}
        Object.keys(actions).forEach(actionName => {
            this.actions[actionName] = (arg) => {
                actions[actionName](this, arg)
            }
        })

    }
    dispatch(method, arg) {
        this.actions[method](arg)
    }
    // TODO: 这里需要使用箭头函数，不然this为undefined
    commit = (method, arg) => {
        console.log(method);
        console.log(this.mutations);
        this.mutations[method](arg)
    }
    get state() {
        return this.vm.state
    }
}
let install = function (vue) {
    Vue = vue
    Vue.mixin({
        // TODO: 在执行子组件的beforeCreate的时候，父组件已经执行完beforeCreate了，那理所当然父组件已经有$store了。这样就能让所有组件都能公用store

        beforeCreate() {
            if (this.$options && this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

// 辅助函数: 不管是 mapState 还是其他辅助函数，最后都是在响应的{}中通过展开运算符获取其值，所以这些函数执行完之后应该是返回一个对象

// 所有辅助函数只考虑传的值是数组的情况
export function mapState(ary) {
    let obj = {}; // obj每一个属性的值都是一个函数，并且函数中返回的是 store.state的值
    ary.forEach(item => {
        // 要让obj的属性对应上ary的每一项，但是属性值是 Store实例上的state
        obj[item] = function () {
            console.log(this) // =>当前使用这个属性的组件
            return this.$store.state[item]
        }
    });
    console.log(obj);
    return obj;
};

export function mapGetters(ary) {
    let obj = {}; // obj每一个属性的值都是一个函数，并且函数中返回的是 store.state的值
    ary.forEach(item => {
        // 要让obj的属性对应上ary的每一项，但是属性值是 Store实例上的state
        obj[item] = function () {
            return this.$store.getters[item]
        }
    });
    return obj;
};

export function mapMutations(ary) {
    let obj = {};
    ary.forEach(item => {
        obj[item] = function (param) {
            this.$store.commit(item, param)
        }
    });
    return obj;
};

export function mapActions(ary) {
    let obj = {};
    ary.forEach(item => {
        obj[item] = function (param) {
            this.$store.dispatch(item, param);
        }
    })
    return obj;
}

let Vuex = {
    Store,
    install
}

export default Vuex
