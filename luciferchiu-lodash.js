var luciferchiu = {


  //Array数组方法*********************************************************
  /**
   * 将数组拆分为多个size,最后剩余的会单独组成一个区块
   * _.chunk(['a', 'b', 'c', 'd'], 2); => [['a', 'b'], ['c', 'd']]
   * @param {array[]} array  需要处理的数组
   * @param {number}  size   每个块长度
   *  @return {result[]} 拆分后的新数组
   */
  chunk: function(array, size = 1) {
    return array.reduce((acuu, curr, i) => {
      i % size === 0 ? acuu.push([curr]) : acuu[acuu.length - 1].push(curr);
      return acuu
    }, [])
  },

  /**
   * 创建一个新数组，包含原数组中的所有非假值元素
   * _.compact([0, 1, false, 2, '', 3])  => [1, 2, 3]
   * @param {array[]} array  需要处理的数组
   *  @return {array[]} 拆分后的新数组
   */
  compact: function(array) {
    return array.reduce((acuu, curr, i) => {
      curr ? acuu.push(curr) : void 0;
      return acuu
    }, [])
  },

  /**
   * 创建一个新数组，将array与任何数组或值连接在一起
   * _.concat(array, 2, [3], [[4]])  => [1, 2, 3, [4]]
   * @param {array[]} array  被连接的数组
   * @param {array[],number} [values] 链接的值 
   * @return {result[]} 连接后的的新数组
   */
  concat: function(array, ...values) {
    var result = []
    for (let i = 0; i < array.length; i++) {
      result.push(array[i])
    }
    for (let i = 0; i < values.length; i++) {
      if (Array.isArray(values[i])) {
        for (let j = 0; j < values[i].length; j++) {
          result.push(values[i][j])
        }
      } else {
        result.push(values[i])
      }
    }
    return result
  },


  /**
   * 创建一个新数组，将array与任何数组或值连接在一起
   * _.difference([2, 1], [2, 3]) => [1]
   * @param  {[Array]}    array  [要检查的数组]
   * @param  {...[Array]} values [排除的值 ]
   * @return {[Array]}           [过滤值后的的新数组]
   */
  difference: function(array, ...values) {
    return array.filter(it => values.reduce((acuu, curr) => acuu.concat(curr), []).indexOf(it) == -1)
  },

  /**
   * 接受一个 iteratee,调用array 和 values 中的每个元素以产生比较的标准
   * @param {array[]} a  要检查的数组
   * @param {array[]} b  排除的值 
   * @param {function,string} f 迭代器  
   * @return {array[]}  过滤值后的的新数组
   */
  /**
   * 接受一个 iteratee,调用array 和 values中的每个元素以产生比较的标准
   * @param  {[Array]}    array [要检查的数组]
   * @param  {...[type]} args  [排除的值(最后一个参数为迭代器)]
   * @return {[Array]}          [过滤值后的的新数组]
   */
  differenceBy: function(array, ...args) {
    var iterator = this.iteratee2fn(args.pop())
    args = args.reduce((a, b) => a.concat(b), [])
    return array.filter(it => {
      for (let v of args) {
        if (iterator(it) === iterator(v)) {
          return false
        }
      }
      return true
    })
  },

  /**
   * 接受一个 comparator,调用比较a,b中的元素.结果值是从第一数组中选择
   * _.differenceWith([{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 2 }], _.isEqual) => [{ 'x': 2, 'y': 1 }]
   * @param  {[Array]}    array [要检查的数组]
   * @param  {...[Array]} args  [排除的值]
   * @param [comparator] (Function) 比较器为args最后一个参数，调用两个参数(arrVal,othVal)
   * @return {[type]}          [返回一个过滤值后的新数组]
   */
  differenceWith: function(array, ...args) {
    var comparator = args.pop()
    args = args.reduce((a, b) => a.concat(b), [])
    return array.filter(it => {
      for (let v of args) {
        if (comparator(it, v)) {
          return false
        }
      }
      return true
    })
  },

  /**
   * 去除array前面的n个元素
   * _.drop([1, 2, 3], 2) => [3]
   * @param  {[type]} array [要查询的数组]
   * @param  {Number} n  [要去除的元素个数]
   * @return {[type]}       [返回array剩余切片]
   */
  drop: function(array, n = 1) {
    return array.reduce((acuu, curr, i) => {
      i >= n ? acuu.push(curr) : void 0;
      return acuu
    }, [])
  },

  /**
   * 去除array尾部的n个元素
   * _.dropRight([1, 2, 3], 2) => [1]
   * @param  {[Array]} array [要查询的数组]
   * @param  {Number} n     [ 要去除的元素个数]
   * @return {[Array]}       [返回array剩余切片]
   */
  dropRight: function(array, n = 1) {
    return array.reduce((acuu, curr, i) => {
      i < array.length - n ? acuu.push(curr) : void 0;
      return acuu
    }, [])
  },

  /**
   * 创建一个切片数组，去除array中从起点开始， predicate 返回假值结束部分
   * @param  {[type]} array     [description]
   * @param  {[type]} predicate [description]
   * @return {[type]}           [description]
   */
  dropWhile: function(array, predicate) {
    var predicate = this.iteratee2fn(predicate)
    var result = array.slice()
    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i]) == false) {
        break
      }
      result.shift()
    }
    return result
  },
  /**
   * 创建一个切片数组，array中从右边开始丢，直到 predicate 返回假值结束
   * @param  {[Array]} array     [要查询的数组]
   * @param  {[Function]} predicate [这个函数会在每一次迭代调用]
   * @return {[Array]}           [返回array剩余切片]
   */
  dropRightWhile: function(array, predicate) {
    var predicate = this.iteratee2fn(predicate)
    var result = array.slice()
    for (var i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i]) == false) {
        break
      }
      result.pop()
    }
    return result
  },

  /**
   * 用value填充数组
   * @param  {[type]} array [要填充改变的数组]
   * @param  {[type]} value [填充给array的值]
   * @param  {Number} start [开始位置]
   * @param  {[type]} end   [结束位置]
   * @return {[type]}       [description]
   */
  fill: function(array, value, start = 0, end = array.length) {
    for (var i = start; i <= end - 1; i++) {
      array[i] = value
    }
    return array
  },

  /**
   * 返回第一个通过 predicate 判断为真值的元素的索引值（index）
   * @param  {[Array]} array     [要搜索的数组]
   * @param  {[Array|Function|Object|string]} predicate [判断其]
   * @param  {number} fromIndex [开始位置索引]
   * @return {[number]}           [返回找到元素的 索引值（index），否则返回 -1]
   */
  findIndex: function(array, predicate = this.identity, fromIndex = 0) {
    for (let i = fromIndex; i < array.length; i++) {
      if (this.iteratee2fn(predicate)(array[i])) {
        return i
      }
    }
    return -1
  },

  /**
   * 返回第一个通过 predicate 判断为真值的元素的索引值（index）
   * @param  {[Array]} array     [要搜索的数组]
   * @param  {[Array|Function|Object|string]} predicate [判断其]
   * @param  {number} fromIndex [开始位置索引]
   * @return {[number]}           [返回找到元素的 索引值（index），否则返回 -1]
   */
  findLastIndex: function(array, predicate = this.identity, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (this.iteratee2fn(predicate)(array[i])) return i
    }
    return -1
  },

  /**
   * 减少一级array嵌套深度
   * _.flatten([1, [2, [3, [4]], 5]]) => [1, 2, [3, [4]], 5]
   * @param  {[Array]} array [需要减少嵌套层级的数组]
   * @return {[Array]}       [返回减少嵌套层级后的新数组]
   */
  flatten: function(array) {
    return array.reduce((acuu, curr) => acuu.concat(curr), [])
  },

  /**
   * 将array递归为一维数组
   * _.flattenDeep([1, [2, [3, [4]], 5]]) => [1, 2, 3, 4, 5]
   * @param  {[Array]} array [需要减少嵌套层级的数组]
   * @return {[Array]}       [返一个的新一维数组]
   */
  flattenDeep: function(array) {
    return array.reduce((acuu, curr) => acuu.concat(curr instanceof Array ? this.flattenDeep(curr) : curr), [])
  },

  /**
   * 根据depth递归减少array的嵌套层级
   * @param  {[type]} array [description]
   * @param  {Number} depth [description]
   * @return {[type]}       [description]
   */
  flattenDepth: function(array, depth = 1) {
    for (i = 1; i <= depth; i++) {
      array = this.flatten(array)
    }
    return array
  },

  /**
   * 返回一个由pairs构成的对象
   * _.fromPairs([['fred', 30], ['barney', 40]]) => { 'fred': 30, 'barney': 40 }
   * @param  {[Array]} pairs [键值对]
   * @return {[Object]}       [返回一个新对象]
   */
  fromPairs: function(pairs) {
    return pairs.reduce((acuu, curr) => {
      acuu[curr[0]] = curr[1];
      return acuu
    }, {})
  },

  /**
   * 获取array的第一个元素
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  head: function(array) {
    return array[0]
  },

  /**
   * 返回首次在数组array中被找到的索引值
   * @param  {[type]} array     [description]
   * @param  {[type]} value     [description]
   * @param  {Number} fromIndex [description]
   * @return {[type]}           [description]
   */
  indexOf: function(array, value, fromIndex = 0) {
    if (fromIndex >= 0) {
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i] === value) return i
      }
    } else {
      for (var i = fromIndex + array.length; i < array.length; i++) {
        if (array[i] === value) return i
      }

    }
  },

  /**
   * 获取数组array中除了最后一个元素之外的所有元素
   * _.initial([1, 2, 3]) => [1, 2]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  initial: function(array) {
    return array.reduce((acuu, curr, i) => {
      if (i < array.length - 1) {
        acuu.push(curr)
      }
      return acuu
    }, [])
  },

  /**
   * 求数组交集
   * _.intersection([2, 1], [4, 2], [1, 2]) => [2]
   * @param  {...[Array]} Array [数组群]
   * @return {[Array]}          [返回一个包含所有传入数组交集元素的新数组]
   */
  intersection: function(...arrays) {
    return arrays[0].reduce((acuu, curr) => (arrays.every(it => it.includes(curr)) && acuu.push(curr), acuu), [])
  },

  /**
   * 类似intersection,接受一个迭代器比较数组中的元素
   * _.intersectionBy([2.1, 1.2], [4.3, 2.4], Math.floor) => [2.1]
   * @param  {...[type]} args [待检查的数组和迭代器]
   * @return {[type]}         [返回一个包含所有传入数组交集元素的新数组]
   */
  intersectionBy: function(...args) {
    var iterator = this.iteratee2fn(args.pop())
    var newArgs = args.map(it => it.map(v => iterator(v)))
    return args[0].reduce((acuu, curr) => (newArgs.every(it => it.includes(iterator(curr))) && acuu.push(curr), acuu), [])
  },


  /**
   * 类似intersection，接受一个comparator调用比较arrays中的元素
   * @param  {...[type]} args [ 待检查的数组 & 比较器]
   * @return {[type]}         [返回一个包含所有传入数组交集元素的新数组]
   */
  intersectionWith: function(...args) {
    var comparator = args.pop()
    return args[0].reduce((acuu, curr) => (args.every(it => it.some(v => comparator(v, curr))) && acuu.push(curr), acuu), [])
  },

  /**
   * 数组转字符串用sep分开
   * @param  {[type]} array [要转换的数组]
   * @param  {String} sep   [分隔元素]
   * @return {[string]}       [返回连接字符串]
   */
  join: function(array, sep = ',') {
    return array.reduce((acuu, curr, i, arr) => (i == arr.length - 1 ? acuu += curr : acuu += curr + sep, acuu), '')
  },

  /**
   * 获取array中的最后一个元素
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  last: function(array) {
    return array[array.length - 1]
  },

  /**
   * 从右往左返回索引值
   * @param  {[type]} array     [description]
   * @param  {[type]} value     [description]
   * @param  {[type]} fromIndex [description]
   * @return {[type]}           [description]
   */
  lastIndexOf: function(array, value, fromIndex = array.length - 1) {
    for (i = fromIndex; i > -1; i--) {
      if (array[i] === value) {
        return i
      }
    }
    return -1
  },

  /**
   * 取array第几个元素，若是负数从最后一个开始数
   * @param  {[type]} array [description]
   * @param  {Number} n     [description]
   * @return {[type]}       [description]
   */
  nth: function(array, n = 0) {
    if (n >= 0) {
      return array[n]
    } else {
      return array[n + array.length]
    }
  },

  /**
   * 移出数组array中所有和values值相等的元素
   * @param  {[Array]}    array [description]
   * @param  {...[*]}   [description]
   * @return {[Array]}          [description]
   */
  pull: function(array, ...values) {
    return this.pullAllBy(array, values)
  },

  /**
   * 类似pull，接受一个数组
   * @param  {[Array]} array  [要修改的数组]
   * @param  {[Array]} values [要移除值的数组]
   * @return {[Array]}        [返回array]
   */
  pullAll(array, values) {
    return this.pullAllBy(array, values)
  },

  /**
   * 类似pullAll，不过接受一个iteratee调用array和values的每一个值进行比较
   * @param  {[Array]} array    [要修改的数组]
   * @param  {[Array]} values   [要移除值的数组]
   * @param  {[Array|Function|Object|string]} iteratee [迭代器]
   * @return {[Array]}          [返回 array]
   */
  pullAllBy(array, values, iteratee = this.identity) {
    var iteratee = this.iteratee2fn(iteratee)
    values.forEach(v => {
      for (var i = 0; i < array.length; i++) {
        if (iteratee(v) === iteratee(array[i])) {
          array.splice(i, 1)
          i--
        }
      }
    })
    return array
  },

  /**
   * 类似pullAll,区别是这个方法接受comparator调用array和values中的值进行比较
   * @param  {[Array]} array      [要修改的数组]
   * @param  {[Array]} values     [要移除值的数组]
   * @param  {[Function]} comparator [会传入两个参数：(arrVal, othVal)]
   * @return {[Array]}            [返回 array]
   */
  pullAllWith: function(array, values, comparator) {
    values.forEach(v => {
      for (var i = 0; i < array.length; i++) {
        if (comparator(v, array[i])) {
          array.splice(i, 1)
          i--
        }
      }
    })
    return array
  },

  /**
   * 筛选去除掉f为真的项
   * @param  {[type]} array [description]
   * @param  {[type]} f     [description]
   * @return {[type]}       [description]
   */
  remove: function(array, f) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if (f(array[i])) {
        result.push(array[i])
        array.splice(i, 1)
      }
    }
    return result
  },

  /**
   * 颠倒数组次序
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  reverse: function(array) {
    var l = array.length
    var temp
    for (var i = 0; i < l / 2; i++) {
      temp = array[i]
      array[i] = array[l - i - 1]
      array[l - i - 1] = temp
    }
    return array
  },

  /**
   * 二分搜索返回value应该插入的位置
   * @param  {[type]} array [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  sortedIndex: function(array, value) {
    return this.sortedIndexBy(array, value)
  },


  /**
   * 类似sortedIndex，不过接受一个iteratee，调用每一个array元素和value值比较来计算排序
   * @param  {[Array]} array    [要检查的排序数组]
   * @param  {[*]} value    [要评估的值]
   * @param  {[Array|Function|Object|string]} iteratee [会传入一个参数：(value)]
   * @return {[type]}          [返回 value值 应该在数组array中插入的索引位置 index]
   */
  sortedIndexBy: function(array, value, iteratee = this.identity) {
    var iteratee = this.iteratee2fn(iteratee)
    return sortIndex(array, 0, array.length - 1, value)

    function sortIndex(array, left, right, value) {
      if (left > right) {
        return left
      }
      var mid = parseInt((left + right) / 2)
      if (iteratee(array[mid]) >= iteratee(value)) {
        return sortIndex(array, left, mid - 1, value)
      }
      if (iteratee(array[mid]) < iteratee(value)) {
        return sortIndex(array, mid + 1, right, value)
      }
      return mid
    }
  },


  /**
   * 类似indexOf，不过是在已经排序的array上执行二分搜索
   * @param  {[Array]} array [要搜索的数组]
   * @param  {[*]} value [搜索的值]
   * @return {[number]}       [返回匹配值的索引位置，否则返回 -1]
   */
  sortedIndexOf(array, value) {
    var low = 0,
      high = array.length - 1
    var mid
    while (low < high) {
      mid = low + ((high - low) >> 1)
      if (array[mid] < value) {
        low = mid + 1
      } else {
        high = mid
      }
    }
    if (array[low] == value) {
      return low
    }
    return -1
  },

  /**
   * 类似sortedIndex,不过返回最后一个索引位置
   * _.sortedLastIndex([4, 5, 5, 5, 6], 5) => 4
   * @param  {[Array]} array [要检查的排序数组]
   * @param  {[*]} value [ 要评估的值]
   * @return {[number]}       [返回索引，不存在则返回-1]
   */
  sortedLastIndex: function(array, value) {
    return this.sortedLastIndexBy(array, value)
  },

  /**
   * 类似sortedLastIndex，不过调用一个iteratee，调用每一个数组元素和value值来比较
   * var objects = [{ 'x': 4 }, { 'x': 5 }]
   * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; }); => 1 
   * @param  {[Array]} array    [要检查的排序数组]
   * @param  {[*]} value    [要评估的值]
   * @param  {[Array|Function|Object|string]} iteratee [迭代函数，调用每个元素]
   * @return {[number]}          [返回value应该插入的位置索引]
   */
  sortedLastIndexBy: function(array, value, iteratee = this.identity) {
    var iterator = this.iteratee2fn(iteratee)
    var low = 0,
      high = array.length - 1
    var mid
    while (low + 1 < high) {
      mid = low + ((high - low) >> 1)
      if (iterator(array[mid]) <= iterator(value)) {
        low = mid
      } else {
        high = mid - 1
      }
    }

    if (iterator(array[high]) == iterator(value)) {
      return high + 1
    } else if (iterator(array[low]) == iterator(value)) {
      return low + 1
    }
    return -1
  },

  /**
   * 类似lastindexof，不过是在已经排序的数组上
   * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5) => 3
   * @param  {[Array]} array [要搜索的数组]
   * @param  {[*]} value [搜索的值]
   * @return {[number]}       [返回匹配值的索引位置，找不到返回-1]
   */
  sortedLastIndexOf: function(array, value) {
    var low = 0,
      high = array.length - 1
    var mid
    while (low + 1 < high) {
      mid = low + ((high - low) >> 1)
      if (array[mid] <= value) {
        low = mid
      } else {
        high = mid - 1
      }
    }

    if (array[high] == value) {
      return high
    } else if (array[low] == value) {
      return low
    }
    return -1
  },

  /**
   * 类似uniq，不过是在已经排过序的数组中进行
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  sortedUniq: function(array) {
    return Array.from(new Set(array))
  },

  /**
   * 返回一个新数组，除了第一个元素不要
   * _.tail([1, 2, 3]) => [2, 3]
   * @param  {[Array]} array [要检索的数组]
   * @return {[Array]}       [返回 array 数组的切片]
   */
  tail: function(array) {
    return array.reduce((acuu, curr, i) => (i > 0 ? acuu.push(curr) : void 0, acuu), [])
  },

  /**
   * 从数组第一个元素开始提取n个元素
   * @param  {[Array]} array [要检索的数组]
   * @param  {Number} n     [要提取的元素个数]
   * @return {[Array]}       [返回 array 数组的切片]
   */
  take: function(array, n = 1) {
    return array.reduce((acuu, curr, i) => i < n ? acuu.concat(curr) : acuu, [])
  },

  /**
   * 从数组的尾部开始提取n个元素
   * _.takeRight([1, 2, 3], 2) => [2, 3]
   * @param  {[Array]} array [要检索的数组]
   * @param  {Number} n     [要提取的元素个数]
   * @return {[Array]}       [返回 array 数组的切片]
   */
  takeRight(array, n = 1) {
    return array.reduce((acuu, curr, i) => (i >= array.length - n && acuu.push(curr), acuu), [])
  },

  /**
   * 从array数组的最后一个元素开始提取元素，直到 predicate 返回假值
   * @param  {[Array]} array     [要检索的数组]
   * @param  {[Array|Function|Object|string]} predicate [ 每次迭代调用的函数]
   * @return {[Array]}           [返回 array 数组的切片]
   */
  takeRightWhile: function(array, predicate = this.identity) {
    var predicate = this.iteratee2fn(predicate)
    var result = []
    for (var i = array.length - 1; i >= 0; i--) {
      if (predicate(array[i]) === false) {
        break
      }
      result.unshift(array[i])
    }
    return result
  },

  /**
   * 从array数组的起始元素开始提取元素,直到 predicate 返回假值
   * @param  {[Array]} array     [需要处理的数组]
   * @param  {[Array|Function|Object|string]} predicate [每次迭代调用的函数]
   * @return {[Array]}           [返回 array 数组的切片]
   */
  takeWhile: function(array, predicate = this.identity) {
    var predicate = this.iteratee2fn(predicate)
    var result = []
    for (var i = 0; i < array.length - 1; i++) {
      if (predicate(array[i]) === false) {
        break
      }
      result.push(array[i])
    }
    return result
  },

  /**
   * 数组并集，数组元素唯一，按顺序
   * _.union([2], [1, 2]) => [2, 1]
   * @param  {...[arrays]} array [一系列数组]
   * @return {array}          [结果数组]
   */
  union: function(...array) {
    return this.uniq(array.reduce((pre, next) => pre.concat(next)))
  },

  /**
   * 类似union，不过它接受一个iteratee函数，调用没一个数组的每个元素以产生唯一性标准
   * @param  {...[Array]} arrays [要检查的数组&迭代器]
   * @return {[Array]}           [返回一个新的联合数组]
   */
  unionBy: function(...arrays) {
    var iteratee = this.iteratee2fn(arrays.pop())
    return this.uniqBy(arrays.reduce((pre, next) => pre.concat(next)), iteratee)
  },

  /**
   * 类似union，不过它接受一个comparator函数，调用没一个数组的每个元素以产生唯一性标准
   * @param  {...[type]} arrays [description]
   * @return {[type]}           [description]
   */
  unionWith: function(...arrays) {
    var comparator = arrays.pop()
    return this.uniqWith(arrays.reduce((pre, next) => pre.concat(next)), comparator)
  },

  /**
   * 去除数组内重复的项
   * _.uniq([2, 1, 2]) => [2, 1]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  uniq: function(array) {
    return Array.from(new Set(array))
  },

  /**
   * 类似uniq，不过接受一个iteratee，调用没一个数组的每个元素产生唯一性计算标准
   * @param  {[Array]} array    [要检查的数组]
   * @param  {[Array|Function|Object|string]} iteratee [迭代函数，调用每个元素]
   * @return {[Array]}          [返回新的去重后的数组]
   */
  uniqBy: function(array, iteratee = this.identity) {
    var iteratee = this.iteratee2fn(iteratee)
    return array.reduce((acuu, curr) => (acuu.some(v => iteratee(v) == iteratee(curr)) ? void 0 : acuu.push(curr), acuu), [])
  },

  /**
   * 这个方法类似union， 除了它接受一个 comparator 调用比较arrays数组的每一个元素]
   * @param  {[Array]} array      [要检查的数组]
   * @param  {[Function]} comparator [比较函数，调用每个元素]
   * @return {[Array]}            [返回一个新的联合数组]
   */
  uniqWith: function(array, comparator) {
    return array.reduce((acuu, curr) => (!acuu.some(v => comparator(v, curr)) && acuu.push(curr), acuu), [])
  },

  /**
   * 返回数组的第n个元素包含输入数组所有元素数组的第n个元素
   * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]) => [['fred', 30, true], ['barney', 40, false]]
   * _.unzip(zipped) => [['fred', 'barney'], [30, 40], [true, false]]
   * @param  {[Array]} array [要处理的数组]
   * @return {[Array]}       [返回重组元素的新数组]
   */
  unzip: function(array) {
    return this.zip(...array)
  },

  /**
   * 类似unzip，接受一个iteratee指定重组值如何被组合
   * var zipped = _.zip([1, 2], [10, 20], [100, 200])=> [[1, 10, 100], [2, 20, 200]]
   * _.unzipWith(zipped, _.add) => [3, 30, 300]
   * @param  {[Array]} array    [要处理的分组元素数组]
   * @param  {[Function]} iteratee [这个函数用来组合重组的值]
   * @return {[Array]}          [返回重组元素的新数组]
   */
  unzipWith: function(array, iteratee = this.identity) {
    return this.unzip(array).reduce((acuu, curr) => (acuu.push(iteratee(...curr)), acuu), [])
  },

  /**
   * 给出array剔除values一系列值的数组
   * @param  {[type]}    array  [要检查的数组]
   * @param  {...[type]} values [一系列单个值]
   * @return {[type]}           [过滤值后的数组]
   */
  without: function(array, ...values) {
    return array.filter(ele => !values.some(curr => curr === ele))
  },

  /**
   * 求数组差集
   * _.xor([2, 1], [2, 3]) => [1, 3]
   * @param  {...[Array]} array [要检查的数组]
   * @return {[Array]}          [返回过滤值后的新数组]
   */
  xor: function(...array) {
    return array.reduce((a, b) => a.concat(b)).reduce(function(acuu, curr, i, arr) {
      var temp = arr.slice()
      temp.splice(i, 1)
      temp.includes(curr) ? void 0 : acuu.push(curr)
      return acuu
    }, [])
  },

  /**
   * 类似xor，不过接受一个迭代器，以生成比较值
   * @param  {...[Array]} args [要检查的数组，最后一个参数为迭代器]
   * @return {[Array]}         [返回过滤值后的新数组]
   */
  xorBy: function(...args) {
    var iteratee = this.iteratee2fn(args.pop())
    var iterArr = this.flatten(args).map(it => iteratee(it))
    return this.flatten(args).reduce((acuu, curr, i, arr) => {
      var temp = iterArr.slice()
      temp.splice(i, 1)
      temp.includes(iteratee(curr)) ? void 0 : acuu.push(curr)
      return acuu
    }, [])
  },

  /**
   * 和xor类似，接受一个comparator，以调研比较数组的元素。
   * @param  {...[Array]} args [要检查的数组，最后一个参数为比较器]
   * @return {[Array]}         [返回过滤值后的新数组]
   */
  xorWith: function(...args) {
    var comparator = args.pop()
    return this.flatten(args).reduce((acuu, curr, i, arr) => {
      var temp = arr.slice()
      temp.splice(i, 1)
      temp.some(v => comparator(v, curr)) ? void 0 : acuu.push(curr)
      return acuu
    }, [])
  },

  /**
   * 创建一个分组元素的数组，数组的第n个元素包含所有给定数组的第n个元素
   * @param  {...[type]} arg [description]
   * @return {[type]}          [description]
   */
  zip: function(...arg) {
    return arg[0].reduce((acuu, curr, i) => (acuu.push(arg.reduce((pre, next) => pre.concat(next[i]), [])), acuu), [])
  },

  /**
   * 类似zip，不过接受一个iteratee,来指定分组的值该如何被组合。该iteratee调用每个组的元素： (...group).
   * @param  {...[Array]} arg [要处理的数组,最后一个参数为iteratee]
   * @return {[Array]}        [返回分组元素的新数组]
   */
  zipWith: function(...arg) {
    var iteratee = this.iteratee2fn(arg.pop())
    return arg[0].reduce((acuu, curr, i) => (acuu.push(iteratee(...arg.reduce((pre, next) => (pre.push(next[i]), pre), []))), acuu), [])
  },
  /**
   * 第一组数组作为属性名，第二组为对应属性值
   * @param  {Array}  props  [description]
   * @param  {Array}  values [description]
   * @return {[type]}        [description]
   */
  zipObject: function(props = [], values = []) {
    var result = {}
    for (var i in props) {
      result[props[i]] = values[i]
    }
    return result
  },

  /**
   * 类似zipObject，但它支持属性路径
   * @param  {Array}  props  [description]
   * @param  {Array}  values [description]
   * @return {[type]}        [description]
   */
  zipObjectDeep(props = [], values = []) {
    var result = {}
    for (var i in props) {
      var path = props[i].split(/\.|(?=\[)/) //.map(curr => curr.indexOf('[')!=-1 && curr.indexOf(']')!=-1 ? curr.replace(/\[|\]/g,''):curr)
      var temp = result
      for (var j = 0; j < path.length; j++) {
        if (j != path.length - 1 && path[j + 1].indexOf('[') !== -1 && path[j + 1].indexOf(']') !== -1) {
          temp[path[j]] == undefined ? temp[path[j]] = [] : void 0
        } else if (path[j].indexOf('[') !== -1 && path[j].indexOf(']') !== -1) {
          path[j] = path[j].replace(/\[|\]/g, '')
          temp[path[j]] == undefined ? temp[path[j]] = {} : void 0
        } else {
          temp[path[j]] == undefined ? temp[path[j]] = {} : void 0
        }
        if (j == path.length - 1) {
          temp[path[j]] = values[i]
        }
        temp = temp[path[j]]
      }
    }
    return result
  },

  //Collection集合方法*******************************************************

  /**
   * 创建一个组成对象，key是iteratee调用每个元素返回的结果，value是出现的次数
   * _.countBy([6.1, 4.2, 6.3], Math.floor) => { '4': 1, '6': 2 }
   * @param  {[Array|Object]} collection [一个用来迭代的集合]
   * @param  {[Array|Function|Object|string]} iteratee   [一个迭代函数，用来转换key]
   * @return {[Object]}            [返回一个组成集合对象]
   */
  countBy: function(collection, iteratee = this.identity) {
    var iteratee = this.iteratee2fn(iteratee)
    var result = {}
    for (var key of collection) {
      if (result[iteratee(key)]) {
        result[iteratee(key)]++
      } else {
        result[iteratee(key)] = 1
      }
    }
    return result
  },

  /**
   * 通过predicat检查collection中的元素是否都返回真值。一旦predicate返回假值，停止迭代。
   * _.every([true, 1, null, 'yes'], Boolean) => false
   * @param  {[Array|Object]} collection [一个用来迭代的集合]
   * @param  {[Array|Function|Object|string]} predicate  [每次迭代调用的函数]
   * @return {[boolean]}            [是否都满足]
   */
  every: function(collection, predicate = this.identity) {
    var predicate = this.iteratee2fn(predicate)
    for (let key in collection) {
      if (predicate(collection[key], key, collection) === false) {
        return false
      }
    }
    return true
  },

  /**
   * 类似数组filter
   * @param  {[Array|Object]} collection [ 一个用来迭代的集合]
   * @param  {[Array|Function|Object|string]} predicate  [每次迭代调用的函数]
   * @return {[Array]}            [返回一个新的过滤后的数组]
   */
  filter: function(collection, predicate = this.identity) {
    var predicate = this.iteratee2fn(predicate)
    var result = []
    for (let key in collection) {
      if (predicate(collection[key], key, collection) === true) {
        result.push(collection[key])
      }
    }
    return result
  },

  /**
   * 遍历collection，返回predicate第一次返回真值的第一个元素
   * @param  {[Array|Object]} collection [一个用来迭代的集合]
   * @param  {[Array|Function|Object|string]} predicate  [ 每次迭代调用的函数]
   * @param  {Number} fromIndex  [开始搜索的索引位置]
   * @return {[*]}            [返回匹配元素，否则返回 undefined]
   */
  find: function(collection, predicate = this.identity, fromIndex = 0) {
    var predicate = this.iteratee2fn(predicate)
    for (var key in collection) {
      if (Array.isArray(collection)) {
        if (key < fromIndex) {
          continue
        }
      }
      if (predicate(collection[key], key, collection)) {
        return collection[key]
      }
    }
  },

  /**
   * 类似find，从右向左
   * _.findLast([1, 2, 3, 4], function(n) {return n % 2 == 1;}) => 3
   * @param  {[Array|Object]} collection [一个用来迭代的集合]
   * @param  {[Array|Function|Object|string]} predicate  [每次迭代调用的函数]
   * @param  {[number]} fromIndex  [开始搜索的索引位置]
   * @return {[*]}            [返回匹配元素，否则返回 undefined]
   */
  findLast: function(collection, predicate = this.identity, fromIndex = collection.length) {
    var predicate = this.iteratee2fn(predicate)
    var keys = Object.keys(collection)
    for (var i = fromIndex; i >= 0; i--) {
      if (predicate(collection[keys[i]], keys[i], collection)) {
        return collection[keys[i]]
      }
    }
  },

  /**
   * [创建一个扁平化数组，这个数组的值来自集合中每个值经iteratee跌倒后返回的结果]
   * @param  {[Array|Object]} collection [一个用来迭代遍历的集合]
   * @param  {[Array|Function|Object|string]} iteratee   [每次迭代调用的函数]
   * @return {[Array]}            [返回新扁平化数组]
   */
  flatMap(collection, iteratee = this.identity) {
    var iteratee = this.iteratee2fn(iteratee)
    var result = []
    for (var key in collection) {
      result = result.concat(iteratee(collection[key], key, collection))
    }
    return result
  },


  /**
   * 类似flatMap，不过会继续扁平化递归结果
   * @param  {[Array|Object]} collection [一个用来迭代遍历的集合]
   * @param  {[Array|Function|Object|string]} iteratee   [每次迭代调用的函数]
   * @return {[Array]}            [返回新扁平化数组]
   */
  flatMapDeep(collection, iteratee = this.identity) {
    var iteratee = this.iteratee2fn(iteratee)
    var result = []
    for (var key in collection) {
      result = result.concat(this.flattenDeep(iteratee(collection[key], key, collection)))
    }
    return result
  },

  /**
   * 类似flatMap,不过会根据指定的depth继续扁平化递归结果
   * @param  {[Array|Object]} collection [一个用来迭代的集合]
   * @param  {[Array|Function|Object|string]} iteratee   [每次迭代调用的函数]
   * @param  {Number} depth      [最大递归深度]
   * @return {[Array]}            [返回新扁平化数组]
   */
  flatMapDepth(collection, iteratee = this.identity, depth = 1) {
    var iteratee = this.iteratee2fn(iteratee)
    var result = []
    for (var key in collection) {
      result = result.concat(this.flattenDepth(iteratee(collection[key], key, collection), depth - 1))
    }
    return result
  },

  /**
   * 用iteratee遍历collection，如果返回false，迭代会中止
   * @param  {[type]} collection [description]
   * @param  {[type]} iteratee   [description]
   * @return {[type]}            [description]
   */
  forEach: function(collection, iteratee = _.identity) {
    iteratee = this.iteratee2fn(iteratee)
    for (let key in collection) {
      if (iteratee(collection[key], key, collection) === false) {
        break
      }
    }
    return collection
  },

  /**
   * [类似 _.forEach，不过是从右到左遍历集合中每一个元素的]
   * @param  {[Array|Object]} collection [用来迭代的集合]
   * @param  {[Function]} iteratee   [每次迭代调用的函数]
   * @return {[*]}            [返回集合 collection]
   */
  forEachRight(collection, iteratee = _.identity) {
    iteratee = this.iteratee2fn(iteratee)
    var keys = Object.keys(collection).reverse() //Object.keys返回属性顺序与手动遍历该对象属性时一致
    for (let key of keys) {
      if (iteratee(collection[key], key, collection) === false) {
        break
      }
    }
    return collection
  },

  /**
   * collection集合分组
   * _.groupBy([6.1, 4.2, 6.3], Math.floor) => { '4': [4.2], '6': [6.1, 6.3] }
   * @param  {[Array|Object]} collection [ 一个用来迭代的集合]
   * @param  {[Array|Function|Object|string]} iteratee   [这个迭代函数用来转换key]
   * @return {[Object]}            [返回一个组成聚合的对象]
   */
  groupBy: function(collection, iteratee) {
    if (typeof iteratee == 'function') {
      return forGroupBy(collection, iteratee)
    } else if (typeof iteratee == 'string') {
      return forGroupBy(collection, this.property(iteratee))
    }

    function forGroupBy(arr, f) {
      var result = {}
      for (let val of arr) {
        if (f(val) in result) {
          result[f(val)].push(val)
        } else {
          result[f(val)] = [val]
        }
      }
      return result
    }
  },

  /**
   * 检查 value(值) 是否在 collection(集合) 中
   * @param  {[Array|Object|string]} collection [要检索的集合]
   * @param  {[*]} value      [要检索的值]
   * @param  {Number} fromIndex  [要检索的 索引位置]
   * @return {[boolean]}            [如果找到 value 返回 true， 否则返回 false]
   */
  includes: function(collection, value, fromIndex = 0) {
    if (Object.prototype.toString.call(collection) == "[object Object]") {
      for (let key in collection) {
        if (collection[key] == value) {
          return true;
        }
      }
    } else {
      return collection.indexOf(value, fromIndex) == -1 ? false : true;
    }
  },

  /**
   * 调用path（路径）上的方法处理 collection(集合)中的每个元素，返回一个数组，包含每次调用方法得到的结果
   * @param  {[Array|Object]}    collection [用来迭代的集合]
   * @param  {[Array|Function|string]}    path       [description]
   * @param  {...[*]} args       [调用每个方法的参数]
   * @return {[Array]}               [返回的结果数组]
   */
  invokeMap: function(collection, path, ...args) {
    if (typeof path == "string") {
      return collection.map(x => x[path].call(x, args))
    } else if (typeof path == "function") {
      return collection.map(x => path.call(x, args))
    }
  },



  /**
   * 和groupBy一样，不过每个key对应的是生成key的最后一个元素
   * @param  {[Array|Object]} collection [用来迭代的集合]
   * @param  {[Array|Function|Object|string]} iteratee   [这个迭代函数用来转换key]
   * @return {[type]}            [返回一个组成聚合的对象]
   */
  keyBy: function(collection, iteratee = this.identity) {
    var iteratee = this.iteratee2fn(iteratee)
    var result = {}
    for (let key in collection) {
      result[iteratee(collection[key])] = collection[key]
    }
    return result
  },

  /**
   * 类似数组的map方法
   * @param  {[Array|Object]} collection [用来迭代的集合]
   * @param  {[Array|Function|Object|string]} iteratee   [每次迭代调用的函数]
   * @return {[Array]}            [返回新的映射后数组]
   */
  map: function(collection, iteratee = this.identity) {
    var arr = [],
      iteratee = this.iteratee2fn(iteratee)
    for (let [key, value] of Object.entries(collection)) {
      arr.push(iteratee(value, key, collection))
    }
    return arr
  },

  /**
   * 此方法类似于_.sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序
   * 如果没指定 orders（排序），所有值以升序排序。
   * @param  {[Array|Object]} collection [用来迭代的集合]
   * @param  {[Array[]|Function[]|Object[]|string[]]} iteratee   [排序的迭代函数]
   * @param  {[string[]]} orders     [iteratees迭代函数的排序顺序]
   * @return {[Array]}            [排序排序后的新数组]
   */
  orderBy(collection, iteratee, orders) {
    for (let i = iteratee.length - 1; i >= 0; i--) {
      collection.sort((a, b) => {
        if (typeof a[iteratee[i]] == "number") {
          return a[iteratee[i]] - b[iteratee[i]]
        } else {
          if (a[iteratee[i]] < b[iteratee[i]]) {
            return -1
          } else if (a[iteratee[i]] > b[iteratee[i]]) {
            return 1
          } else {
            return 0
          }
        }
      })
      if (orders != undefined && orders[i] == "desc") {
        collection.reverse()
      }
    }
    return collection
  },

  /**
   * 创建一个分成两组的元素数组,第一组是predicate为true的元素，第二组是false的
   * @param  {[Array|Object]} collection [用来迭代的集合]
   * @param  {[Array|Function|Object|string]} predicate  [每次迭代调用的函数]
   * @return {[Array]}            [返回元素分组后的数组]
   */
  partition: function(collection, predicate = this.identity) {
    var result = [
      [],
      []
    ]
    var predicate = this.iteratee2fn(predicate)
    for (let value of Object.values(collection)) {
      predicate(value) == true ? result[0].push(value) : result[1].push(value)
    }
    return result
  },

  /**
   * 类似数组reduce
   * @param  {[Array|Object]} collection  [用来迭代的集合]
   * @param  {[Function]} iteratee    [每次迭代调用的函数]
   * @param  {[*]} accumulator [初始值]
   * @return {[*]}             [返回累加后的值]
   */
  reduce: function(collection, iteratee = this.identity, accumulator) {
    var keys = Object.keys(collection)
    var result = accumulator !== undefined ? accumulator : collection[keys[0]]
    for (let i = accumulator !== undefined ? 0 : 1; i < keys.length; i++) {
      result = iteratee(result, collection[keys[i]], keys[i], collection)
    }
    return result
  },

  /**
   * 类似reduce，不过是从最后开始迭代
   * @param  {[Array|Object]} collection  [用来迭代的集合]
   * @param  {[Function]} iteratee    [每次迭代调用的函数]
   * @param  {[*]} accumulator [初始值]
   * @return {[*]}             [返回累加后的值]
   */
  reduceRight: function(collection, iteratee = this.identity, accumulator) {
    var keys = Object.keys(collection)
    var result = accumulator !== undefined ? accumulator : collection[keys[0]]
    for (let i = accumulator !== undefined ? keys.length - 1 : keys.length - 2; i >= 0; i--) {
      result = iteratee(result, collection[keys[i]], keys[i], collection)
    }
    return result
  },

  /**
   * 和filter相反，返回非真的collection元素
   * @param  {[Array|Object]} collection [用来迭代的集合]
   * @param  {[Array|Function|Object|string]} predicate  [每次迭代调用的函数]
   * @return {[Array]}            [返回过滤后的新数组]
   */
  reject: function(collection, predicate = this.identity) {
    var predicate = this.iteratee2fn(predicate)
    var result = []
    for (let key in collection) {
      if (predicate(collection[key], key, collection) !== true) {
        result.push(collection[key])
      }
    }
    return result
  },

  /**
   * 从collection（集合）中获得一个随机元素
   * @param  {[Array|Object]} collection [要取样的集合]
   * @return {[*]}            [返回随机元素]
   */
  sample: function(collection) {
    var keys = Object.keys(collection)
    return collection[keys[Math.floor(Math.random() * keys.length)]]
  },


  /**
   * 从collection（集合）中获得 n 个随机元素
   * @param  {[Array|Object]} collection [要取样的集合]
   * @param  {Number} n          [取样的元素个数]
   * @return {[Array]}            [返回随机元素]
   */
  sampleSize: function(collection, n = 1) {
    var arr = Object.values(collection)
    var result = []
    for (let i = 0; i < n; i++) {
      result.push(...arr.splice(Math.random() * arr.length | 0, 1))
    }
    return result
  },

  /**
   * 创建一个被打乱值的集合
   * 洗牌算法 Fisher-Yates shuffle
   * @param  {[Array|Object]} collection [要打乱的集合]
   * @return {[Array]}            [返回打乱的新数组]
   */
  shuffle: function(collection) {
    var set = Array.isArray(collection) ? collection : this.values(collection)
    var length = set.length
    var shuffled = new Array(length)
    for (var i = 0, rand; i < length; i++) {
      rand = Math.floor(Math.random() * (i + 1))
      if (rand !== i) {
        shuffled[i] = shuffled[rand]
      }
      shuffled[rand] = set[i]
    }
    return shuffled
  },

  /**
   * 返回集合长度
   * @param  {[Array|Object]} collection [要检查的集合]
   * @return {[number]}            [返回集合的长度]
   */
  size: function(collection) {
    return Object.keys(collection).length
  },

  /**
   * 通过predicate检查collection中的元素是否存在任意 truthy的元素,一旦 predicate返回 truthy,遍历就停止
   * @param  {[Array|Object]} collection [用来迭代的集合]
   * @param  {[Array|Function|Object|string]} predicate  [每次迭代调用的函数]
   * @return {[boolean]}            [一个都没有返回false，否则返回true]
   */
  some: function(collection, predicate = this.identity) {
    var predicate = this.iteratee2fn(predicate)
    for (let key in collection) {
      if (predicate(collection[key]) == true) {
        return true
      }
    }
    return false
  },

  /**
   * 以iteratee处理的结果升序排序
   *
   **************待优化****************
   * 
   * 这里用了插入排序，因为lodash里说了“This method performs a stable sort”
   * 原生sort方法里，如果数组元素小于10个，也是使用的插入排序，但大于10个后使用的快排
   * 不知道lodash/underscore用的何种方法保证排序效率的，源码解耦太强，还没仔细研究
   * @param  {[Array|Object]} collection [用来迭代的集合]
   * @param  {[type]} iteratee   [这个函数决定排序]
   * @return {[Array]}            [返回排序后的数组]
   */
  sortBy: function(collection, iteratee = this.identity) {
    var set = Object.values(collection)
    if(Array.isArray(iteratee)) {
      iteratee.forEach(it => sortByHelp(set,function(o){return o[it]}))
    }else{
      iteratee = this.iteratee2fn(iteratee)
      sortByHelp(set,iteratee)
    }
    return set
    
    function sortByHelp(ary,iteratee){
      for(let i = 1;i < set.length;i++) {
        for(let j = 0;j < i;j++) {
          if(iteratee(set[i]) < iteratee(set[j])){
            set.splice(j,0,set[i])
            set.splice(i+1,i)
          }
        }
      }
    }
  },

  //Object对象方法*******************************************************

    values: function(object) {
    return Object.values(object)
  },

  //辅助方法*******************************************************
  /**
   * 深度相等                                      
   * @param  {[type]}  o1 [description]
   * @param  {[type]}  o2 [description]
   * @return {Boolean}    [description]
   */
  isEqual: function(o1, o2) {
    if (o1 === o2) {
      return true
    }
    //不同类型直接不等
    if (typeof o1 != typeof o2) {
      return false
    }
    //NaN相等
    if (o1 !== o1 && o2 !== o2) {
      return true
    }
    //原始类型直接比
    if (typeof o1 != 'object' && typeof o1 != 'object') {
      return o1 === o2
    }
    //数组和对象如果属性名相同，但不等
    if (typeof o1.length != typeof o2.length) {
      return false
    }
    //返回属性名数组
    var keyArr1 = Object.getOwnPropertyNames(o1)
    var keyArr2 = Object.getOwnPropertyNames(o2)
      //长度不同直接不等
    if (keyArr1.length != keyArr2.length) {
      return false
    }
    //合并对象属性名
    for (var i = 0; i < keyArr2.length; i++) {
      keyArr1.push(keyArr2[i])
    }
    var keyArr = luciferchiu.uniq(keyArr1)
    var bool = true
    for (var i = 0; i < keyArr.length; i++) {
      if ((keyArr[i] in o1) && (keyArr[i] in o2)) {
        if (typeof o1[keyArr[i]] == 'object' && typeof o2[keyArr[i]] == 'object') {
          bool = luciferchiu.isEqual(o1[keyArr[i]], o2[keyArr[i]])
        } else if (o1[keyArr[i]] !== o2[keyArr[i]]) {
          return false
        }
      } else {
        return false
      }
    }
    return bool
  },

  /**
   * 返回接收到的所有参数的第一个参数
   * 通常作为迭代器的默认参数
   * @param  {...[type]} values [description]
   * @return {[type]}           [description]
   */
  identity: function(...values) {
    return values[0]
  },

  /**
   * 创建一个返回给定对象的 path 的值的函数。
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  property: function(path) {
    var realPath = path.split('.')
    return function(obj) {
      var result = obj
      for (var i = 0; i < realPath.length; i++) {
        result = result[realPath[i]]
      }
      return result
    }
  },
  /**
   * 返回一个函数比较所给对象和source
   * @param  {[type]} source [description]
   * @return {[type]}        [description]
   */
  matches: function(source) {
    return function(obj) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          if (!(luciferchiu.isEqual(source[key], obj[key]))) {
            return false
          }
        }
      }
      return true
    }
  },

  /**
   * 返回一个函数比较对象的path值是否为srcValue
   * @param  {[type]} path     [description]
   * @param  {[type]} srcValue [description]
   * @return {[type]}          [description]
   */
  matchesProperty: function(path, srcValue) {
    return function(obj) {
      if (luciferchiu.isEqual(obj[path], srcValue)) {
        return true
      }
      return false
    }
  },

  /**
   * 将json解析为js对象
   * @param  {[type]} jsonStr [description]
   * @return {[type]}         [description]
   */
  parseJson: function(jsonStr) {
    var i = 0
    var str = jsonStr
    return parseValue()

    function parseValue() {
      if (str[i] === '{') {
        return parseObject(str)
      } else if (str[i] === '[') {
        return parseArray(str)
      } else if (str[i] === 'n') {
        return parseNull()
      } else if (str[i] === 't') {
        return parseTrue()
      } else if (str[i] === 'f') {
        return parseFalse()
      } else if (str[i] === '"') {
        return parseString()
      } else {
        return parseNumber()
      }
    }

    function parseObject() {
      i++
      var result = {}
      while (str[i] != '}') {
        var key = parseString()
        i++
        var value = parseValue()
        result[key] = value
        if (str[i] === ',') {
          i++
        }
      }
      i++
      return result
    }

    function parseArray() {
      i++
      var result = []
      while (str[i] != ']') {
        result.push(parseValue())
        if (str[i] === ',') {
          i++
        }
      }
      i++
      return result
    }

    function parseString() {
      var result = ''
      i++
      while (str[i] != '"') {
        result += str[i++]
      }
      i++
      return result
    }

    function parseNull() {
      var content = str.substr(i, 4)
      if (content === 'null') {
        i += 4
        return null
      } else {
        throw new Error('Unexpected char:' + i)
      }
    }

    function parseTrue() {
      var content = str.substr(i, 4)
      if (content === 'true') {
        i += 4
        return true
      } else {
        throw new Error('Unexpected char:' + i)
      }
    }

    function parseFalse() {
      var content = str.substr(i, 5)
      if (content === 'false') {
        i += 5
        return false
      } else {
        throw new Error('Unexpected char:' + i)
      }
    }

    function parseNumber() {
      var numStr = ''
      while (isNumberChar(str[i])) {
        numStr += str[i++]
      }
      return parseFloat(numStr)
    }

    function isNumberChar(c) {
      var chars = {
        '-': true,
        '+': true,
        'e': true,
        'E': true,
        '.': true
      }
      if (chars[c]) {
        return true
      } else if (c >= '0' && c <= '9') {
        return true
      } else {
        return false
      }
    }
  },

  /**
   * 迭代object自身可枚举属性，如果返回false，iteratee会提前退出遍历
   * @param  {[type]} object   [description]
   * @param  {[type]} iteratee [description]
   * @return {[type]}          [description]
   */
  forOwn: function(object, iteratee) {
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        if (iteratee(object[key], key, object) == false) {
          break
        }
      }
    }
    return object
  },

  /**************************************************************************************************************
   * 下面是一些帮助函数
   * 非lodash原生函数，只是把经常复用的代码封装一下
   */
  iteratee2fn: function(iteratee) {
    var type = typeof iteratee
    switch (type) {
      case "function":
        return iteratee
      case "string":
        return this.property(iteratee)
      case "object":
        if (Array.isArray(iteratee)) {
          return this.matchesProperty(iteratee[0], iteratee[1])
        } else {
          return this.matches(iteratee)
        }
    }
  },
}


module.exports = luciferchiu