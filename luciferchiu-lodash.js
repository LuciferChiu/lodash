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
    if (Array.isArray(iteratee)) {
      iteratee.forEach(it => sortByHelp(set, function(o) {
        return o[it]
      }))
    } else {
      iteratee = this.iteratee2fn(iteratee)
      sortByHelp(set, iteratee)
    }
    return set

    function sortByHelp(ary, iteratee) {
      for (let i = 1; i < set.length; i++) {
        for (let j = 0; j < i; j++) {
          if (iteratee(set[i]) < iteratee(set[j])) {
            set.splice(j, 0, set[i])
            set.splice(i + 1, i)
          }
        }
      }
    }
  },

  //Function函数方法*******************************************************

  /**
   * before的反向函数，创建一个函数，当被调用n次或更多次后马上出发func
   * @param  {[number]} n    [func 方法应该在调用多少次后才执行]
   * @param  {[Function]} func [用来限定的函数]
   * @return {[Function]}      [返回新的限定函数]
   */
  after: function(n, func) {
    var count = 0
    return function(...args) {
      count++
      if (count >= n) {
        return func.apply(this, ...args)
      }
    }
  },

  /**
   * 创建一个调用func的函数。调用func时最多接受 n个参数，忽略多出的参数
   * @param  {[Function]} func [需要被限制参数个数的函数]
   * @param  {[Number]} n    [限制的参数数量]
   * @return {[Function]}      [返回新的覆盖函数]
   */
  ary: function(func, n = fun.length) {
    return function(...args) {
      args.length = n
      return func.apply(this, args)
    }
  },

  /**
   * 创建一个调用func的函数，通过this绑定和创建函数的参数调用func，调用次数不超过 n 次。 之后再调用这个函数，将返回一次最后调用func的结果。
   * @param  {[number]} n    [限制调用func 的次数]
   * @param  {[Function]} func [限制执行的函数]
   * @return {[Function]}      [返回新的限定函数]
   */
  before: function(n, func) {
    var count = 0,
      last
    return function(...args) {
      count++
      if (count <= n) {
        last = func.apply(this, args)
      }
      return last
    }
  },


  /**
   * 创建一个调用func的函数，thisArg绑定func函数中的 this (愚人码头注 ，并且func函数会接收partials附加参数。 
   * @param  {[Function]}    func      [description]
   * @param  {[*]}    thisarg   [绑定的this对象]
   * @param  {...[*]} fixedArgs [附加的部分参数]
   * @return {[Function]}              [返回新的绑定函数]
   */
  bind: function(func, thisarg, ...fixedArgs) {
    var self = this
    if (fixedArgs.includes(self)) {
      return function(...restArgs) {
        fixedArgs.forEach((it, index) => it === self ? fixedArgs.splice(index, 1, restArgs.shift()) : void 0)
        return func.call(thisarg, ...fixedArgs)
      }
    } else {
      return function(...restArgs) {
        return func.call(thisarg, ...fixedArgs, ...restArgs)
      }
    }
  },


  /**
   * 创建一个在object[key]上的函数,通过接收partials附加参数 
   * @param  {[Object]}    object    [需要绑定函数的对象]
   * @param  {[string]}    key       [需要绑定函数对象的键]
   * @param  {...[*]} fixedArgs [附加的部分参数]
   * @return {[Function]}              [返回新的绑定函数]
   */
  bindKey: function(object, key, ...fixedArgs) {
    return this.bind(object[key], object, ...fixedArgs)
  },


  /**
   * 柯里化
   * @param  {[Function]} func  [用来柯里化的函数]
   * @param  {[number]} arity [需要提供给 func 的参数数量]
   * @return {[Function]}       [返回新的柯里化函数]
   */
  curry: function(func, arity = func.length) {
    var self = this
    return function(...args) {
      if (args.length < arity || args.includes(self)) {
        return self.curry(self.partial(func, ...args), arity - args.length)
      } else {
        return func(...args)
      }
    }
  },

  /**
   * 类似curry，不过接受参数的方式用的partialRight，也就是从右往左开始柯丽化
   * @param  {[Function]} func  [用来柯里化（curry）的函数]
   * @param  {[number]} arity [需要提供给 func 的参数数量]
   * @return {[Function]}       [返回新的柯里化（curry）函数]
   */
  curryRight: function(func, arity = func.length) {
    var self = this
    return function(...args) {
      if (args.length < arity || args.includes(self)) {
        return self.curryRight(self.partialRight(func, ...args), arity - args.length)
      } else {
        return func(...args)
      }
    }
  },

  /**
   * 创建一个函数。 该函数调用 func，并传入预设的 partials 参数
   * @param  {[Function]}    func     [需要预设的函数]
   * @param  {...[*]} partials [预设的参数]
   * @return {[Function]}             [返回预设参数的函数]
   */
  partial: function(func, ...partials) {
    var self = this
    if (partials.includes(this)) {
      return function(...placeArgs) {
        partials.forEach((it, index) => it === self ? partials.splice(index, 1, placeArgs.shift()) : void 0)
        return func(...partials)
      }
    } else {
      return func.bind(null, ...partials)
    }
  },

  /**
   * 我曹，这几个占位符要搞死我了。。。
   * 终于做到和lodash一样了，不容易不容易
   * @param  {[type]}    func     [description]
   * @param  {...[type]} partials [description]
   * @return {[type]}             [description]
   */
  partialRight: function(func, ...partials) {
    var self = this
    if (partials.includes(this)) {
      return function(...placeArgs) {
        partials.forEach((it, index) => it === self ? partials.splice(index, 1, placeArgs.shift()) : void 0)
        return func(...partials)
      }
    } else {
      return function(...restArgs) {
        return func.call(null, ...restArgs, ...partials)
      }
    }
  },


  /**
   * 防抖，从上一次被调用后，延迟wait毫秒还有再调用func方法
   * @param  {[Function]}  func             [要防抖动的函数]
   * @param  {Number}  wait             [需要延迟的毫秒数]
   * @param  {Boolean} options.leading  [指定在延迟开始前调用]
   * @param  {Number}  options.maxWait  [允许被延迟的最大值]
   * @param  {[boolean]}  options.trailing [指定在延迟结束后调用]
   * @return {[Function]}                   [返回新的 debounced（防抖动）函数]
   */
  debounce: function(func, wait = 0, {
    leading = false,
    maxWait = 0,
    trailing = true
  } = {}) {
    let self, xargs, timer, timeLast
    let firstInvoke = true

    function invokeFunc(...args) {
      func.call(self, ...args)
    }

    return function(...args) {
      let self = this
      const timeNow = +new Date()

      clearTimeout(timer)

      if (leading && firstInvoke) {
        firstInvoke = false
        invokeFunc(...args)
      }

      if (!timeLast) {
        timeLast = timeNow
      }

      if (maxWait != 0 && timeNow - timeLast >= maxWait) {
        invokeFunc(...args)
        timeLast = timeNow
      } else if (trailing) {
        timer = setTimeout(function() {
          invokeFunc(...args)
        }, wait)
      }
    }
  },

  /**
   * 创建一个节流函数，在 wait 秒内最多执行 func 一次的函数
   * 直接调用debounce的maxWait即可实现
   * @param  {[Function]}  func             [ 要节流的函数]
   * @param  {Number}  wait             [需要节流的毫秒]
   * @param  {boolean} options.leading  [指定调用在节流开始前]
   * @param  {[boolean]}  options.trailing [指定调用在节流结束后]
   * @return {[Function]}                   [返回节流的函数]
   */
  throttle: function(func, wait = 0, {
    leading = true,
    trailing = true
  } = {}) {
    return this.debounce(func, wait, {
      leading,
      maxWait: wait,
      trailing,

    })
  },

  //Math方法****************************************************

  /**
   * 加法
   * @param {[number]} augend [description]
   * @param {[number]} addend [description]
   * @return {number}  
   */
  add: function(augend, addend) {
    return augend + addend
  },

  /**
   * 向上取整
   * @param  {[number]} number    [待处理的数字]
   * @param  {Number} precision [向上取整的的精度]
   * @return {[number]}           [返回向上舍入的值]
   */
  ceil: function(number, precision = 0) {
    return Math.ceil(number * 10 ** precision) / 10 ** precision
  },

  /**
   * 相除
   * @param  {[number]} dividend [被除数]
   * @param  {[number]} divisor  [除数]
   * @return {[number]}          [结果]
   */
  divide: function(dividend, divisor) {
    return dividend / divisor
  },

  /**
   * 向下取整
   * @param  {[number]} number    [要向下取整的值]
   * @param  {Number} precision [向下取整的精度]
   * @return {[number]}           [取整结果]
   */
  floor: function(number, precision = 0) {
    return Math.floor(number * 10 ** precision) / 10 ** precision
  },

  /**
   * 计算array中的最大值
   * @param  {[Array]} array [description]
   * @return {[*]}       [description]
   */
  max: function(array) {
    return array.length === 0 || array === undefined ? undefined : Math.max(...array)
  },

  /**
   * 类似max，接受一个itratee来调用array中的元素，再比较
   * @param  {[Array]} array    [要迭代的数组]
   * @param  {[Function]} iteratee [调用每个元素的迭代函数]
   * @return {[*]}          [返回最大的值]
   */
  maxBy: function(array, iteratee = this.identity) {
    var iteratee = this.iteratee2fn(iteratee)
    return array.reduce((acuu, curr) => iteratee(acuu) > iteratee(curr) ? acuu : curr)
  },

  /**
   * 计算 array 的平均值
   * @param  {[Array]} array [要迭代的数组]
   * @return {[number]}       [返回平均值]
   */
  mean: function(array) {
    return this.meanBy(array)
  },

  /**
   * 迭代版求平均值
   * @param  {[Array]} array    [要迭代的数组]
   * @param  {[Function]} iteratee [调用每个元素的迭代函数]
   * @return {[number]}          [返回平均值]
   */
  meanBy: function(array, iteratee = this.identity) {
    return this.sumBy(array, iteratee) / array.length
  },

  /**
   * 计算 array 中的最小值
   * @param  {[Array]} array [要迭代的数组]
   * @return {[*]}       [返回最小的值]
   */
  min: function(array) {
    return minBy(array)
  },

  /**
   * 类似min，不过接收一个iteratee函数来生成排序标准
   * @param  {[Array]} array    [要迭代的数组]
   * @param  {[Function]} iteratee [调用每个元素的迭代函数]
   * @return {[*]}          [返回最小的值]
   */
  minBy: function(array, iteratee = this.identity) {
    iteratee = this.iteratee2fn(iteratee)
    return array.length === 0 || array === undefined ? undefined : array.reduce((acuu, curr) => iteratee(acuu) < iteratee(curr) ? acuu : curr)
  },

  /**
   * 乘法
   * @param  {[number]} multiplier   [相乘的第一个数]
   * @param  {[number]} multiplicand [相乘的第二个数]
   * @return {[number]}              [返回乘积]
   */
  multiply: function(multiplier, multiplicand) {
    return multiplier * multiplicand
  },

  /**
   * 四舍五入
   * @param  {[number]} number    [要四舍五入的数字]
   * @param  {number} precision [精度]
   * @return {[number]}           [返回四舍五入的数字]
   */
  round: function(number, precision = 0) {
    return Math.round(number * 10 ** pos) / 10 ** pos
  },

  /**
   * 减法
   * @param  {[number]} minuend    [被减数]
   * @param  {[number]} subtrahend [减数]
   * @return {[number]}            [差]
   */
  subtract: function(minuend, subtrahend) {
    return minuend - subtrahend
  },

  sum: function(array) {
    return array.reduce((acuu, curr) => acuu + curr)
  },

  sumBy: function(array, iteratee = this.identity) {
    iteratee = this.iteratee2fn(iteratee)
    return array.reduce((acuu, curr) => acuu + iteratee(curr), 0)
  },

  //Nubmer 方法*********************************************************

  /**
   * 返回限制在lower和upper之间的值
   * @param  {[number]} number [被限制的值]
   * @param  {[number]} lower  [下限]
   * @param  {[number]} upper  [上限]
   * @return {[number]}        [返回被限制的值]
   */
  clamp: function(number, lower, upper) {
    return Math.max(lower, Math.min(number, upper))
  },

  /**
   * 检查 n 是否在 start 与 end 之间，但不包括 end. 如果 end 没有指定，那么 start 设置为0。如果 start 大于 end，那么参数会交换以便支持负范围
   * @param  {[number]} number [要检查的值]
   * @param  {number} start  [开始范围]
   * @param  {[number]} end    [结束范围]
   * @return {[boolean]}        [ 如果number在范围内 ，那么返回true，否则返回 false]
   */
  inRange: function(number, start = 0, end) {
    if (end === undefined) {
      end = start
      start = 0
    }
    if (start > end) {
      [start, end] = [end, start]
    }
    return number < start ? false : number >= end ? false : true
  },

  /**
   * 产生一个包括 lower 与 upper 之间的数。 如果只提供一个参数返回一个0到提供数之间的数。 如果 floating 设为 true，或者 lower 或 upper 是浮点数，结果返回浮点数。 
   * @param  {number}  lower    [下限]
   * @param  {number}  upper    [上限]
   * @param  {boolean} floating [指定是否返回浮点数]
   * @return {[number]}           [返回随机数]
   */
  random: function(lower = 0, upper = 1, floating = false) {
    if (arguments.length === 1) {
      upper = lower
      lower = 0
    } else if (arguments.length === 2 && typeof arguments[1] !== 'number') {
      floating = upper
      upper = lower
      lower = 0
    }
    var result = Math.random() * (upper - lower + 1) + lower
    return floating ? result : Number.isInteger(lower) && Number.isInteger(upper) ? parseInt(result) : result
  },

  //Object对象方法*******************************************************

  /**
   * 分配来源对象的可枚举属性到目标对象上。
   * @param  {[Object]}    object  [目标对象]
   * @param  {...[Object]} sources [来源对象]
   * @return {[Object]}            [返回 object]
   */
  assign: function(object, ...sources) {
    var self = this
    sources.forEach(it => {
      this.forOwn(it, function(value, key) {
        object[key] = value
      })
    })
    return object
  },

  /**
   * 这个方法类似 _.assign， 除了它会遍历并继承来源对象的属性。 
   * @param  {[Object]}    object  [目标对象]
   * @param  {...[Object]} sources [来源对象]
   * @return {[Object]}            [返回 object]
   */
  assignIn: function(object, ...sources) {
    sources.forEach(function(it) {
      for (let key in it) {
        object[key] = it[key]
      }
    })
    return object
  },

  /**
   * 创建一个数组，值来自 object 的paths路径相应的值。
   * @param  {[Object]} object [要迭代的对象]
   * @param  {[string|string[]]} paths  [要获取的对象的元素路径，单独指定或者指定在数组中。]
   * @return {[Array]}        [返回选中值的数组]
   */
  at: function(object, paths) {
    var self = this
    return paths.map(x => self.get(object, x))
  },

  /**
   * 创建一个继承 prototype 的对象。 如果提供了 prototype，它的可枚举属性会被分配到创建的对象上。
   * @param  {[type]} prototype  [要继承的对象。]
   * @param  {[type]} properties [待分配的属性。]
   * @return {[type]}            [返回新对象。]
   */
  create: function(prototype, properties) {
    return Object.create(prototype, properties)
  },

  /**
   * 分配来源对象的可枚举属性到目标对象所有解析为 undefined 的属性上。 来源对象从左到右应用。 一旦设置了相同属性的值，后续的将被忽略掉。 
   * @param  {[Object]}    object  [目标对象]
   * @param  {...[Object]} sources [来源对象]
   * @return {[Object]}            [返回 object]
   */
  defaults: function(object, ...sources) {
    return sources.reduce((acuu, curr) => {
      for (let key in curr) {
        if (acuu[key] == undefined) {
          acuu[key] = curr[key]
        }
      }
      return acuu
    }, object)
  },

  /**
   * 这个方法类似 _.defaults，除了它会递归分配默认属性。
   * @param  {[Object]}    object  [目标对象]
   * @param  {...[Object]} sources [来源对象]
   * @return {[Object]}            [返回 object]
   */
  defaultsDeep: function(object, ...sources) {
    return sources.reduce((acuu, curr) => {
      for (var key in curr) {
        if (typeof curr[key] == "object") {
          this.defaultsDeep(acuu[key], curr[key])
        }
        if (acuu[key] == undefined) {
          acuu[key] = curr[key];
        }
      }
      return acuu;
    }, object)

  },

  /**
   * 这个方法类似 _.find 。 除了它返回最先被 predicate 判断为真值的元素 key，而不是元素本身。
   * @param  {[Object]} object    [需要检索的对象。]
   * @param  {[Function]} predicate [每次迭代时调用的函数。]
   * @return {[*]}           [返回匹配的 key，否则返回 undefined。]
   */
  findKey: function(object, predicate = _.identity) {
    var predicate = this.iteratee2fn(predicate)
    for (let key of Object.keys(object)) {
      if (predicate(object[key]) === true) {
        return key
      }
    }
    return undefined
  },

  /**
   * 这个方法类似_.findKey。 不过它是反方向开始遍历的。
   * @param  {[Object]} object    [需要检索的对象。]
   * @param  {[Function]} predicate [每次迭代时调用的函数。]
   * @return {[*]}           [返回匹配的 key，否则返回 undefined]
   */
  findLastKey: function(object, predicate = _.identity) {
    var predicate = this.iteratee2fn(predicate)
    var arr = Object.keys(object)
    for (let i = arr.length - 1; i >= 0; i--) {
      if (predicate(object[arr[i]]) === true) {
        return arr[i]
      }
    }
    return undefined
  },

  /**
   * 使用 iteratee 遍历对象的自身和继承的可枚举属性.如果返回 false，iteratee 会提前退出遍历。
   * @param  {[Object]} object   [要遍历的对象]
   * @param  {[Function]} iteratee [每次迭代时调用的函数]
   * @return {[Object]}          [返回 object]
   */
  forIn: function(object, iteratee = this.identity) {
    for (let key in object) {
      if (iteratee(object[key], key, object) === false) {
        break
      }
    }
    return object
  },

  /**
   * 这个方法类似 _.forIn。 除了它是反方向开始遍历object的。
   * @param  {[Object]} object   [要遍历的对象]
   * @param  {[Function]} iteratee [每次迭代时调用的函数]
   * @return {[Object]}          [返回 object]
   */
  forInRight: function(object, iteratee = this.identity) {
    var arr = []
    for (let key in object) {
      arr.push(key)
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      if (iteratee(object[arr[i]], arr[i], object) === false) {
        break
      }
    }
    return object
  },

  /**
   * 使用 iteratee 遍历自身的可枚举属性。 iteratee 会传入3个参数：(value, key, object)。 如果返回 false，iteratee 会提前退出遍历。
   * @param  {[Object]} object   [要遍历的对象]
   * @param  {[Function]} iteratee [每次迭代时调用的函数]
   * @return {[Object]}          [返回 object]
   */
  forOwn: function(object, iteratee = this.identity) {
    var arr = Object.keys(object)
    for (let key of arr) {
      if (iteratee(object[key], key, object) === false) {
        break
      }
    }
    return object
  },

  /**
   * 这个方法类似 _.forOwn。 除了它是反方向开始遍历object的。
   * @param  {[Object]} object   [ 要遍历的对象]
   * @param  {[Function]} iteratee [每次迭代时调用的函数]
   * @return {[Object]}          [返回 object]
   */
  forOwnRight: function(object, iteratee = this.identity) {
    var arr = Object.keys(object)
    for (let i = arr.length - 1; i >= 0; i--) {
      if (iteratee(object[arr[i]], arr[i], object) === false) {
        break
      }
    }
    return object
  },

  /**
   * 创建一个函数属性名称的数组，函数属性名称来自object对象自身可枚举属性
   * @param  {[Object]} object [要检查的对象]
   * @return {[Array]}        [返回函数名]
   */
  functions: function(object) {
    return Object.keys(object)
  },

  /**
   * 创建一个函数属性名称的数组，函数属性名称来自object对象自身和继承的可枚举属性。
   * @param  {[Object]} object [要检查的对象]
   * @return {[Array]}        [返回函数名]
   */
  functionsIn: function(object) {
    let result = []
    for (let key in object) {
      result.push(key)
    }
    return result
  },

  /**
   * 根据 object对象的path路径获取值
   * @param  {[Object]} object       [要检索的对象]
   * @param  {[Array|string]} path         [要获取属性的路径]
   * @param  {[*]} defaultValue [如果解析值是 undefined ，这值会被返回]
   * @return {[*]}              [返回解析的值]
   */
  get: function(object, path, defaultValue) {
    path = this.toPath(path)
    var result = path.reduce((acuu, curr) => acuu === undefined ? undefined : acuu[curr], object)
    return result === undefined ? defaultValue : result
  },

  /**
   * 检查 path 是否是object对象的直接属性。
   * @param  {[Object]}  object [要检索的对象]
   * @param  {[Array|string]}  path   [要检查的路径path]
   * @return {Boolean}        [如果path存在，那么返回 true ，否则返回 false]
   */
  has: function(object, path) {
    if (typeof path === 'string') {
      path = this.toPath(path)
    }
    var temp = object
    for (var i = 0; i < path.length; i++) {
      if (temp.hasOwnProperty(path[i])) temp = temp[path[i]]
      else return false
    }
    return true
  },

  /**
   * 检查 path 是否是object对象的直接或继承属性
   * @param  {[Object]}  object [要检索的对象]
   * @param  {[Array|string]}  path   [要检查的路径path]
   * @return {Boolean}        [如果path存在，那么返回 true ，否则返回 false]
   */
  hasIn: function(object, path) {
    if (typeof path === 'string') {
      path = this.toPath(path)
    }
    return path.reduce((acuu, curr) => acuu === undefined ? undefined : acuu[curr], object) !== undefined
  },

  /**
   * 创建一个object键值倒置后的对象。 如果 object 有重复的值，后面的值会覆盖前面的值
   * @param  {[Object]} object [要键值倒置对象]
   * @return {[Object]}        [返回新的键值倒置后的对象]
   */
  invert: function(object) {
    var result = {}
    for (keys in obj) {
      if (!result[obj[keys]]) {
        result[obj[keys]] = keys
      } else if (Array.isArray(result[obj[keys]])) {
        result[obj[keys]].push(keys)
      } else {
        result[obj[keys]] = [result[obj[keys]]]
        result[obj[keys]].push(keys)

      }

    }
    return result
  },

  /**
   * 这个方法类似 _.invert，除了倒置对象 是 collection（集合）中的每个元素经过 iteratee（迭代函数） 处理后返回的结果
   * @param  {[type]} obj      [要键值倒置对象]
   * @param  {[type]} iteratee [每次迭代时调用的函数]
   * @return {[type]}          [返回新的键值倒置后的对象]
   */
  invertBy: function(obj, iteratee = this.identity) {
    var result = {},theKey,iteratee = this.iteratee2fn(iteratee)
    for (keys in obj) {
      theKey = iteratee(obj[keys])
      if (!(theKey in result)) {
        result[theKey] = []
      }
      result[theKey].push(keys)
    }
    return result
  },


  /**
   * 调用object对象path上的方法
   * @param  {[Object]}    object [要检索的对象]
   * @param  {[Array|string]}    path   [用来调用的方法路径]
   * @param  {...[*]} args   [调用的方法的参数]
   * @return {[*]}           [返回调用方法的结果]
   */
  invoke: function(object,path,...args){
    var path = this.toPath(path)
    return path.reduce((acuu, curr) => {
      if(acuu === undefined){
        return undefined
      }else if(typeof acuu[curr] ==='function'){
        return acuu[curr](...args)
      }else{
        return acuu[curr]
      }
    }, object)
  },

  /**
   * 创建一个 object 的自身可枚举属性名为数组
   * @param  {[Object]} object [要检索的对象]
   * @return {[Array]}        [返回包含属性名的数组]
   */
  keys: function(object){
    return Object.keys(object)
  },

  /**
   * 创建一个 object 自身 和 继承的可枚举属性名为数组
   * @param  {[Object]} object [ 要检索的对象]
   * @return {[Array]}        [返回包含属性名的数组]
   */
  keysIn: function(object) {
    var result = []
    for(let key in object){
      result.push(key)
    }
    return result
  },

  /**
   * 反向版 _.mapValues。 这个方法创建一个对象，对象的值与object相同，并且 key 是通过 iteratee 运行 object 中每个自身可枚举属性名字符串 产生的。
   * @param  {[Object]} object   [要遍历的对象]
   * @param  {[Function]} iteratee [iteratee调用三个参数： (value, key, object)]
   * @return {[Object]}          [返回映射后的新对象]
   */
  mapKeys(object,iteratee=this.identity) {
    var result = {}
    iteratee = this.iteratee2fn(iteratee)
    for(let key in object){
      result[iteratee(object[key],key,object)] = object[key]
    }
    return result
  },

  /**
   * 创建一个对象，这个对象的key与object对象相同，值是通过 iteratee 运行 object 中每个自身可枚举属性名字符串产生的。
   * @param  {[Object]} object   [要遍历的对象]
   * @param  {[Function]} iteratee [iteratee调用三个参数： (value, key, object)]
   * @return {[Object]}          [返回映射后的新对象]
   */
  mapValues: function(object,iteratee = this.identity) {
    var result = {}
    iteratee = this.iteratee2fn(iteratee)
    for(let key in object){
      result[key] = iteratee(object[key])
    }
    return result
  },

  /**
   * 该方法类似_.assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。
   * @param  {[Object]}    object  [目标对象]
   * @param  {...[Object]} sources [来源对象]
   * @return {[Object]}            [返回 object]
   */
  merge: function(object,...sources){
    var self = this
    return sources.reduce((acuu,curr)=>{
      return Object.keys(curr).reduce((x,y) =>{
        if(typeof curr[y] !== 'object') x[y] = curr[y]
          self.merge(x[y],curr[y])
        return x
      },acuu)
    },object)
  },

  /**
   * 该方法类似_.merge，除了它接受一个 customizer，调用以产生目标对象和来源对象属性的合并值。
   * @param  {[Object]}    object [目标对象]
   * @param  {...[Object & Function]} args   [来源对象 & customizer(这个函数定制合并值) ]
   * @return {[Object]}           [返回 object]
   */
  mergeWith: function(object,...args) {
    var customizer = args.pop()
    for(let i = 0;i < args.length;i++){
      for(let key in args[i]){
        if(!object[key]){
          object[key] = args[i][key];
        } 
        else {
          object[key] = customizer(object[key],args[i][key],key,object,args[i])
        }
      }
    }
    return object
  },

  /**
   * 反向版 _.pick; 这个方法一个对象，这个对象由忽略属性之外的object自身和继承的可枚举属性组成。
   * @param  {[Object]} object [来源对象]
   * @param  {...[string|string[]]} props  [要被忽略的属性]
   * @return {[Object]}        [返回新对象]
   */
  omit: function(object,props) {
    var result = {}
    for(let key in object) {
      if(!props.includes(key)){
        result[key] = object[key]
      }
    }
    return result
  },

  /**
   * 反向版 _.pickBy；这个方法一个对象，这个对象忽略 predicate（断言函数）判断不是真值的属性后，object自身和继承的可枚举属性组成
   * @param  {[Object]} object    [来源对象]
   * @param  {[Function]} predicate [调用每一个属性的函数]
   * @return {[Object]}           [返回新对象]
   */
  omitBy: function(object,predicate = this.identity) {
    var result = {}
    predicate = this.iteratee2fn(predicate)
    for(let key in object) {
      if(!predicate(object[key],key)){
        result[key] = object[key]
      }
    }
    return result
  },

  /**
   * [创建一个从 object 中选中的属性的对象]
   * @param  {[Object]} object [来源对象 ]
   * @param  {...(string|string[])} props  [要被忽略的属性]
   * @return {[Object]}        [返回新对象]
   */
  pick: function(object,props) {
    var result = {}
    for(let key in object) {
      if(props.includes(key)){
        result[key] = object[key]
      }
    }
    return result
  },

  /**
   * 创建一个对象，这个对象组成为从 object 中经 predicate 判断为真值的属性。
   * @param  {[Object]} object    [来源对象]
   * @param  {[Function]} predicate [调用每一个属性的函数]
   * @return {[Object]}           [返回新对象]
   */
  pickBy: function(object,predicate = this.identity){
    var result = {}
    predicate = this.iteratee2fn(predicate)
    for(let key in object) {
      if(predicate(object[key],key)){
        result[key] = object[key]
      }
    }
    return result
  },

  /**
   * 这个方法类似 _.get， 除了如果解析到的值是一个函数的话，就绑定 this 到这个函数并返回执行后的结果。
   * @param  {[Object]} object       [要检索的对象]
   * @param  {[Array|string]} parh         [要解析的属性路径]
   * @param  {[*]} defaultValue [如果值解析为 undefined，返回这个值]
   * @return {[*]}              [返回解析后的值]
   */
  result: function(object,path,defaultValue){
    var value = this.get(object, path, defaultValue)
    return value === undefined ? defaultValue : typeof value === 'function' ? value.bind(this)() : value
  },

  /**
   * 设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建
   * @param {[Object]} object [要修改的对象]
   * @param {[Array|string]} path   [要设置的对象路径]
   * @param {[*]} value  [要设置的值]
   * @return {[Object]} [返回 object]
   */
  set: function(object,path,value){
    var path = this.toPath(path)
    path.reduce((acuu,curr,i,arr) => {
      if(acuu[curr] == undefined && i!==arr.length-1){
        acuu[curr] = {}
      }else if(i === arr.length-1){
        acuu[curr] = value
      }
      return acuu[curr]
    },object)
    return object
  },

  /**
   * 创建一个object对象自身可枚举属性的键值对数组
   * @param  {[Object]} object [要检索的对象]
   * @return {[Array]}        [返回键值对的数组]
   */
  toPairs: function(object) {
    return Object.entries(object)
  },

  /**
   * 创建一个object对象自身和继承的可枚举属性的键值对数组。
   * @param  {[Object]} object [要检索的对象]
   * @return {[Array]}        [返回键值对的数组]
   */
  toPairsIn: function(object) {
    let result = []
    for(let key in object){
      result.push([key,object[key]])
    }
    return result
  },

  transform: function(object,iteratee=this.identity,accumulator){

  },

  /**
   * 移除object对象 path 路径上的属性
   * @param  {[Object]} object [要修改的对象]
   * @param  {[Array|string]} path   [要移除的对象路径]
   * @return {[boolean]}        [如果移除成功，那么返回 true ，否则返回 false]
   */
  unset: function(object,path){
    var path = this.toPath(path)
    var temp = object
    return path.reduce((acuu,curr,i,arr) => {
      try{
        if(i === arr.length-1){
          if(acuu[curr] !== undefined){
            delete acuu[curr]
            return true
          }else{
            return false
          }
        }else{
          return acuu[curr]
        }
      }catch(e){
        return false
      }
    },object)
  },

  /**
   * 该方法类似_.set，除了接受updater以生成要设置的值。使用 _.updateWith来自定义生成的新path。
   * @param  {[Object]} object  [要修改的对象。]
   * @param  {[Array|string]} path    [要设置属性的路径。]
   * @param  {[Function]} updater [用来生成设置值的函数。]
   * @return {[Object]}         [返回 object 。]
   */
  update: function(object,path,updater){
    var path = this.toPath(path)
    path.reduce((acuu,curr,i,arr) => {
      if(acuu[curr] == undefined && i!==arr.length-1){
        acuu[curr] = {}
      }else if(i === arr.length-1){
        acuu[curr] = updater(acuu[curr])
      }
      return acuu[curr]
    },object)
    return object
  },

  /**
   * 创建 object 自身和继承的可枚举属性的值为数组 
   * @param  {[Object]} object [要检索的对象]
   * @return {[Array]}        [返回对象属性的值的数组]
   */
  values: function(object) {
    return Object.values(object)
  },

  /**
   * 创建 object 自身和继承的可枚举属性的值为数组 
   * @param  {[Object]} object [要检索的对象]
   * @return {[Array]}        [返回对象属性的值的数组]
   */
  values: function(object) {
    let result = []
    for(let key in object){
      result.push(object[key])
    }
    return result
  },

  //String方法 **********************************************************

  /**
   * 转换字符串string为 驼峰写法
   * @param  {string} string [要转换的字符串]
   * @return {[string]}        [返回驼峰写法的字符串]
   */
  camelCase: function(string = '') {
    return string.match(/\w+/g).reduce((a, b, i) => i == 0 ? a + b.toLowerCase() : a + b.slice(0, 1).toUpperCase() + b.slice(1).toLowerCase(), "")
  },

  /**
   * 转换字符串string首字母为大写，剩下为小写。
   * @param  {String} string [要大写开头的字符串]
   * @return {[string]}        [返回大写开头的字符串]
   */
  capitalize: function(string = '') {
    return string.replace(/^(\w)(.*)/g, (m, a, b) => a.toUpperCase() + b.toLowerCase())
  },

  /**
   * 转换字符串string中拉丁语-1补充字母 和 拉丁语扩展字母-A 为基本的拉丁字母，并且去除组合变音标记。
   * 这一题偷懒了，拉丁文实在太多，直接抄的源码里的哈哈哈
   * @param  {String} string [要处理的字符串]
   * @return {[string]}        [返回处理后的字符串]
   */
  deburr: function(string = '') {
    var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g
    var deburredLetters = {
      // Latin-1 Supplement block.
      '\xc0': 'A',
      '\xc1': 'A',
      '\xc2': 'A',
      '\xc3': 'A',
      '\xc4': 'A',
      '\xc5': 'A',
      '\xe0': 'a',
      '\xe1': 'a',
      '\xe2': 'a',
      '\xe3': 'a',
      '\xe4': 'a',
      '\xe5': 'a',
      '\xc7': 'C',
      '\xe7': 'c',
      '\xd0': 'D',
      '\xf0': 'd',
      '\xc8': 'E',
      '\xc9': 'E',
      '\xca': 'E',
      '\xcb': 'E',
      '\xe8': 'e',
      '\xe9': 'e',
      '\xea': 'e',
      '\xeb': 'e',
      '\xcc': 'I',
      '\xcd': 'I',
      '\xce': 'I',
      '\xcf': 'I',
      '\xec': 'i',
      '\xed': 'i',
      '\xee': 'i',
      '\xef': 'i',
      '\xd1': 'N',
      '\xf1': 'n',
      '\xd2': 'O',
      '\xd3': 'O',
      '\xd4': 'O',
      '\xd5': 'O',
      '\xd6': 'O',
      '\xd8': 'O',
      '\xf2': 'o',
      '\xf3': 'o',
      '\xf4': 'o',
      '\xf5': 'o',
      '\xf6': 'o',
      '\xf8': 'o',
      '\xd9': 'U',
      '\xda': 'U',
      '\xdb': 'U',
      '\xdc': 'U',
      '\xf9': 'u',
      '\xfa': 'u',
      '\xfb': 'u',
      '\xfc': 'u',
      '\xdd': 'Y',
      '\xfd': 'y',
      '\xff': 'y',
      '\xc6': 'Ae',
      '\xe6': 'ae',
      '\xde': 'Th',
      '\xfe': 'th',
      '\xdf': 'ss',
      // Latin Extended-A block.
      '\u0100': 'A',
      '\u0102': 'A',
      '\u0104': 'A',
      '\u0101': 'a',
      '\u0103': 'a',
      '\u0105': 'a',
      '\u0106': 'C',
      '\u0108': 'C',
      '\u010a': 'C',
      '\u010c': 'C',
      '\u0107': 'c',
      '\u0109': 'c',
      '\u010b': 'c',
      '\u010d': 'c',
      '\u010e': 'D',
      '\u0110': 'D',
      '\u010f': 'd',
      '\u0111': 'd',
      '\u0112': 'E',
      '\u0114': 'E',
      '\u0116': 'E',
      '\u0118': 'E',
      '\u011a': 'E',
      '\u0113': 'e',
      '\u0115': 'e',
      '\u0117': 'e',
      '\u0119': 'e',
      '\u011b': 'e',
      '\u011c': 'G',
      '\u011e': 'G',
      '\u0120': 'G',
      '\u0122': 'G',
      '\u011d': 'g',
      '\u011f': 'g',
      '\u0121': 'g',
      '\u0123': 'g',
      '\u0124': 'H',
      '\u0126': 'H',
      '\u0125': 'h',
      '\u0127': 'h',
      '\u0128': 'I',
      '\u012a': 'I',
      '\u012c': 'I',
      '\u012e': 'I',
      '\u0130': 'I',
      '\u0129': 'i',
      '\u012b': 'i',
      '\u012d': 'i',
      '\u012f': 'i',
      '\u0131': 'i',
      '\u0134': 'J',
      '\u0135': 'j',
      '\u0136': 'K',
      '\u0137': 'k',
      '\u0138': 'k',
      '\u0139': 'L',
      '\u013b': 'L',
      '\u013d': 'L',
      '\u013f': 'L',
      '\u0141': 'L',
      '\u013a': 'l',
      '\u013c': 'l',
      '\u013e': 'l',
      '\u0140': 'l',
      '\u0142': 'l',
      '\u0143': 'N',
      '\u0145': 'N',
      '\u0147': 'N',
      '\u014a': 'N',
      '\u0144': 'n',
      '\u0146': 'n',
      '\u0148': 'n',
      '\u014b': 'n',
      '\u014c': 'O',
      '\u014e': 'O',
      '\u0150': 'O',
      '\u014d': 'o',
      '\u014f': 'o',
      '\u0151': 'o',
      '\u0154': 'R',
      '\u0156': 'R',
      '\u0158': 'R',
      '\u0155': 'r',
      '\u0157': 'r',
      '\u0159': 'r',
      '\u015a': 'S',
      '\u015c': 'S',
      '\u015e': 'S',
      '\u0160': 'S',
      '\u015b': 's',
      '\u015d': 's',
      '\u015f': 's',
      '\u0161': 's',
      '\u0162': 'T',
      '\u0164': 'T',
      '\u0166': 'T',
      '\u0163': 't',
      '\u0165': 't',
      '\u0167': 't',
      '\u0168': 'U',
      '\u016a': 'U',
      '\u016c': 'U',
      '\u016e': 'U',
      '\u0170': 'U',
      '\u0172': 'U',
      '\u0169': 'u',
      '\u016b': 'u',
      '\u016d': 'u',
      '\u016f': 'u',
      '\u0171': 'u',
      '\u0173': 'u',
      '\u0174': 'W',
      '\u0175': 'w',
      '\u0176': 'Y',
      '\u0177': 'y',
      '\u0178': 'Y',
      '\u0179': 'Z',
      '\u017b': 'Z',
      '\u017d': 'Z',
      '\u017a': 'z',
      '\u017c': 'z',
      '\u017e': 'z',
      '\u0132': 'IJ',
      '\u0133': 'ij',
      '\u0152': 'Oe',
      '\u0153': 'oe',
      '\u0149': "'n",
      '\u017f': 's'
    }
    var deburrLetter = function(key) {
      return deburredLetters[key]
    }
    var reComboMark = RegExp('[' + '\\u0300-\\u036f' + '\\ufe20-\\ufe2f' + '\\u20d0-\\u20ff' + ']', 'g')
    return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '')
  },

  /**
   * 检查字符串string是否以给定的target字符串结尾
   * @param  {String} string   [要检索的字符串]
   * @param  {[string]} target   [要检索字符]
   * @param  {[number]} position [检索的位置]
   * @return {[boolean]}          [如果字符串string以target字符串结尾，那么返回 true，否则返回 false]
   */
  endsWith: function(string = '', target, position = string.length) {
    var str = string.slice(0, position)
    return new RegExp(target + '$', 'g').test(str)
  },

  /**
   * 转义string中的 "&", "<", ">", '"', "'", 和 "`" 字符为HTML实体字符。
   * @param  {string} string [ 要转义的字符串]
   * @return {[string]}        [返回转义后的字符串]
   */
  escape: function(string = '') {
    var reg = /[&<>"']/g
    var symbol = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&apos;",
    }
    return string.replace(reg, it => symbol[it])
  },

  /**
   * 转义 RegExp 字符串中特殊的字符 "^", "$", "", ".", "*", "+", "?", "(", ")", "[", "]", "{", "}", 和 "|" in .
   * @param  {string} string [要转义的字符串]
   * @return {[string]}        [返回转义后的字符串]
   */
  escapeRegExp: function(string = '') {
    var reg = /[\^\$\.\*\+\?\(\)\[\]\{\}\|]/g
    return string.replace(reg, it => '\\' + it)
  },

  /**
   * 要转换的字符串
   * @param  {string} str [要转换的字符串]
   * @return {string}     [返回转换后的字符串]
   */
  kebabCase: function(str = '') {
    return this.lowerCase(str).replace(/ /g, "-")
  },

  /**
   * 转换字符串string以空格分开单词，并转换为小写
   * @param  {String} str [要转换的字符串]
   * @return {[string]}     [返回转换后的字符串]
   */
  lowerCase: function(str = '') {
    var words_arr = this.getWords(str);
    words_str = words_arr.join(" ");
    re = /[a-z][A-Z]/g;
    return words_str.replace(re, m => (m.slice(0, 1) + " " + m.slice(1))).toLowerCase();
  },

  /**
   * 去除空格，下划线等
   * @param  {[string]} str [原字符串]
   * @return {[array]}     [字符串的数组]
   */
  getWords: function(str) {
    input_str = str;
    re = /[A-Za-z0-9]+/g;
    return words = input_str.match(re, input_str);
  },

  /**
   * 转换字符串string的首字母为小写
   * @param  {string} str [要转换的字符串]
   * @return {string}     [返回转换后的字符串]
   */
  lowerFirst: function(str = '') {
    return str[0].toLowerCase() + str.slice(1)
  },

  /**
   * 如果string字符串长度小于 length 则从左侧和右侧填充字符。 如果没法平均分配，则截断超出的长度。
   * @param  {String} str    [要填充的字符串]
   * @param  {Number} length [填充的长度]
   * @param  {String} chars  [填充字符]
   * @return {[string]}        [返回填充后的字符串]
   */
  pad: function(str = '', length = 0, chars = ' ') {
    if (length === str.length) return str
    let left = Math.floor((length - str.length - chars.length) / 2)
    let right = length - str.length - chars.length - left
    let result = chars.repeat(left) + str + chars.repeat(right)
    return result.slice(0, length)
  },

  /**
   * 如果string字符串长度小于 length 则在右侧填充字符。 如果超出length长度则截断超出的部分。
   * @param  {String} str    [要填充的字符串]
   * @param  {Number} length [填充的长度]
   * @param  {String} chars  [填充字符]
   * @return {[string]}        [返回填充后的字符串]
   */
  padEnd: function(str = '', length = 0, chars = ' ') {
    if (length === str.length) return str
    let count = length - str.length - chars.length + 1
    return (str + chars.repeat(count)).slice(0, length)
  },

  /**
   * 如果string字符串长度小于 length 则在左侧填充字符。 如果超出length长度则截断超出的部分。
   * @param  {String} str    [要填充的字符串]
   * @param  {Number} length [填充的长度]
   * @param  {String} chars  [ 填充字符]
   * @return {[string]}        [返回填充后的字符串]
   */
  padStart: function(str = '', length = 0, chars = ' ') {
    if (length === str.length) return str
    let count = length - str.length - chars.length + 1
    return chars.repeat(count).slice(0, length - str.length) + str
  },

  /**
   * 转换string字符串为指定基数的整数。
   * @param  {[type]} str   [要转换的字符串]
   * @param  {Number} radix [转换基数]
   * @return {[type]}       [返回转换后的整数]
   */
  parseInt: function(string, radix = 10) {
    if (typeof string !== "string" && typeof string !== "number") return NaN;
    //如果radix不是数字，或者string是小数，则返回NaN
    if ((typeof radix !== "number" || /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/.test(radix) || radix > 36 || radix < 2)) return NaN;
    string = String(string)
      //如果 string 以 0 开头，那么 ES5 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。
    var rexp = (radix == 10) ? /(-?)([0]?)([0-9]+)/ : /(-?)([0]?[Xx]?)([0-9a-fA-F]+)/,
      a = string.match(rexp),
      sign = a[1],
      rawRadix = a[2],
      rawNum = a[3],
      result = 0,
      strArr = rawNum.split(''),
      len = strArr.length,
      numArr = [];
    if (a && !radix) {
      if (rawRadix.toUpperCase() === "0X") {
        radix = 16;
      } else if (rawRadix === "0") {
        radix = 8;
      } else {
        radix = 10;
      }
    }
    for (var i = 0; i < len; i++) {
      var num;
      var charCode = strArr[i].toUpperCase().charCodeAt(0);
      if (radix <= 36 && radix >= 11) {
        if (charCode >= 65 && charCode <= 90) {
          num = charCode - 55;
        } else {
          num = charCode - 48;
        }
      } else {
        num = charCode - 48;
      }
      if (num < radix) {
        numArr.push(num);
      } else {
        return NaN
      };
    }
    if (numArr.length > 0) {
      numArr.forEach(function(item, j) {
        result += item * Math.pow(radix, numArr.length - j - 1);
      })
    }
    if (sign === "-") {
      result = -result;
    }
    return result
  },

  /**
   * 重复 N 次给定字符串n
   * 没有什么比原生更强啊，哈哈哈哈哈，偷个懒偷个懒
   * @param  {String} str [要重复的字符串]
   * @param  {Number} n   [重复的次数]
   * @return {[type]}     [返回重复的字符串]
   */
  repeat: function(str = '', n = 1) {
    return str.repeat(n)
  },

  /**
   * 替换string字符串中匹配的pattern为给定的replacement 。
   * @param  {String} str         [待替换的字符串]
   * @param  {[RegExp|string]} pattern     [要匹配的内容]
   * @param  {[Function|string]} replacement [替换的内容]
   * @return {[type]}             [返回替换后的字符串]
   */
  replace: function(str = '', pattern, replacement) {
    var result = [],
      start = 0
    for (var i = 0; i < str.length; i++) {
      if (str[i] === pattern[0]) {
        if (str.slice(i, i + pattern.length) === pattern) {
          result.push(str.slice(start, i))
          result.push(replacement)
          i = i + pattern.length - 1
          start = i + 1
        }
      }
    }
    result.push(str.slice(start, str.length))
    result = result.join("")
    return result
  },

  /**
   * 转换字符串string为 snake_case,就是加个下划线
   * @param  {string} str [要转换的字符串]
   * @return {[string]}     [返回转换后的字符串]
   */
  snakeCase: function(str = '') {
    return this.lowerCase(str).replace(/ /g, '_')
  },

  /**
   * 根据separator 拆分字符串string
   * @param  {String} str       [根据separator 拆分字符串string。 ]
   * @param  {[type]} separator [要拆分的字符串]
   * @param  {[type]} limit     [拆分的分隔符]
   * @return {[type]}           [限制结果的数量]
   */
  split: function(str = '', separator, limit) {
    var result = str.replace(new RegExp(separator, 'g'), '')
    var arr = [...result]
    arr.length = limit
    return arr
  },

  /**
   * 转换 string 字符串为 start case,也就是首字母大写
   * @param  {string} str [要转换的字符串]
   * @return {[string]}     [返回转换后的字符串]
   */
  startCase: function(str = '') {
    return this.lowerCase(str).replace(/\b\w(?=\w+)/g, it => it.toUpperCase())
  },

  /**
   * 检查字符串string是否以 target 开头
   * @param  {String} str      [要检索的字符串]
   * @param  {[string]} target   [要检查的字符串]
   * @param  {Number} position [检索的位置]
   * @return {[boolean]}          [如果string以 target，那么返回true，否则返回 false ]
   */
  startsWith: function(str = '', target, position = 0) {
    return str[position] === target
  },

  /**
   * 转换整个string字符串的字符为小写
   * @param  {String} str [ 要转换的字符串]
   * @return {[string]}     [返回小写的字符串]
   */
  toLower: function(str = '') {
    return str.toLowerCase()
  },

  /**
   * 转换整个string字符串的字符为大写
   * @param  {String} str [要转换的字符串]
   * @return {[type]}     [返回大写的字符串]
   */
  toUpper: function(str = '') {
    return str.toUpperCase()
  },

  /**
   * 从string字符串中移除前面和后面的 空格 或 指定的字符
   * @param  {String} str   [要处理的字符串]
   * @param  {[type]} chars [要移除的字符]
   * @return {[type]}       [返回处理后的字符串]
   */
  trim: function(str = '', chars) {
    if (chars === undefined) {
      return str.trim()
    } else {
      return [...chars].reduce((acuu, curr) => acuu.replace(new RegExp(curr, 'g'), ''), str)
    }
  },

  /**
   * 从string字符串中移除后面的 空格 或 指定的字符。
   * @param  {string} str   [要处理的字符串]
   * @param  {[string]} chars [要移除的字符]
   * @return {[string]}       [返回处理后的字符串]
   */
  trimEnd: function(str = '', chars) {
    let realStr = str.trim()
    if (chars === undefined) {
      return str.replace(new RegExp(realStr + '\\s+', 'g'), realStr)
    } else {
      return str.replace(new RegExp(`[${chars}]*$`, 'g'), "")
    }
  },

  /**
   * 从string字符串中移除前面的 空格 或 指定的字符
   * @param  {String} str   [要处理的字符串]
   * @param  {[string]} chars [要移除的字符]
   * @return {[string]}       [返回处理后的字符串]
   */
  trimStart: function(str = '', chars) {
    let realStr = str.trim()
    if (chars === undefined) {
      return str.replace(new RegExp('\\s+' + realStr, 'g'), realStr)
    } else {
      return str.replace(new RegExp(`^[${chars}]*`, 'g'), "")
    }
  },

  /**
   * 截断string字符串，如果字符串超出了限定的最大值。 被截断的字符串后面会以 omission 代替，omission 默认是 "..."
   * @param  {String} str               [要截断的字符串]
   * @param  {Number} options.length    [选项对象]
   * @param  {String} options.omission  [允许的最大长度]
   * @param  {Object} options.separator               } [超出后的代替字符]
   * @return {[type]}                   [截断点]
   */
  truncate: function(str = '', {
    length = 30,
    omission = '...',
    separator
  } = {}) {
    if (separator == undefined && str.length > length) {
      return str.substr(0, length - omission.length) + omission
    } else if (str.length > length) {
      var new_str = str.substr(0, length - omission.length);
      return new_str.substr(0, new_str.lastIndexOf(...new_str.match(new RegExp(separator, "g")).slice(-1))) + omission;
    } else {
      return str
    }
  },

  /**
   * _.escape的反向版。 这个方法转换string字符串中的 HTML 实体 &amp;, &lt;, &gt;, &quot;, &#39;, 和 &#96; 为对应的字符。 
   * @param  {String} str [要转换的字符串]
   * @return {[string]}     [返回转换后的字符串]
   */
  unescape: function(str = '') {
    var arr = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&apos;": "'"
    }
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, it => arr[it])
  },

  /**
   * 转换字符串string为 空格 分隔的大写单词。
   * @param  {String} str [ 要转换的字符串]
   * @return {[type]}     [返回大写单词]
   */
  upperCase: function(str = '') {
    return this.lowerCase(str).toUpperCase()
  },

  /**
   * 转换字符串string的首字母为大写。
   * @param  {String} str [要转换的字符串]
   * @return {[string]}     [返回转换后的字符串]
   */
  upperFirst: function(str = '') {
    return str[0].toUpperCase() + str.slice(1)
  },

  /**
   * 拆分字符串string中的词为数组 。
   * @param  {String} str     [要拆分的字符串。]
   * @param  {[RegExp|string]} pattern [匹配模式。]
   * @return {[Array]}         [返回拆分string后的数组。]
   */
  words: function(str = '', pattern) {
    if (pattern === undefined) {
      return str.match(/\w+/g)
    } else {
      return str.match(pattern)
    }
  },

  //辅助方法**************************************************************

  /**
   * 转化 value 为属性路径的数组
   * @param  {[*]} value [要转换的值]
   * @return {[Array]}       [返回包含属性路径的数组。]
   */
  toPath: function(value) {
    if(Array.isArray(value)){
      return value
    }
    //这个正则主要处理这种情况["["]，即"[","]"做属性key的情况
    var path = value.split(/\.|(?=\[[^\[\]"]\])/g)
    return path.map(it => {
      return it.replace(/^\[|\]$/g, '').replace(/"/g, '')
    })
  },

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