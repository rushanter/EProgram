// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'

Page({
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },
  onLoad: function(options) {
    this._getData()
  },
  _getData() {
    // 1.请求分类数据
    this._getCategory()
  },
  _getCategory() {
    getCategory().then(res => {
      // 1.获取categories
      const categories = res.data
      // 2.初始化每个类别的子数据
      const categoryData = {}
      for (let i = 0; i < categories.length; i++) {
        categoryData[i] = {
          // subcategories: [],
          categoryDetail: []
          // categoryDetail: {
          //   'pop': [],
          //   'new': [],
          //   'sell': []
          // }
        }
      }
      // 3.修改data中的数据
      this.setData({
        categories: categories,
        categoryData: categoryData
      })
      // 4.请求第一个类别的数据
      // this._getSubcategory(0)
      // 5.请求第一个类别的详情数据
      this._getCategoryDetail(0)
    })
  },
  _getSubcategory(currentIndex) {
    // 1.获取对应的type
    const type = this.data.categories[currentIndex].type;

    // 2.请求的数据
    getSubcategory(type).then(res => {
      console.log(res)
      console.log("++++++++++++++++++")
      const tempCategoryData = res.data;
      tempCategoryData[currentIndex].subcategories = res.data;
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },
  _getCategoryDetail(currentIndex) {
    // 1.获取对应的type
    const type = this.data.categories[currentIndex].type;

    // 2.请求数据类别的数据
    this._getRealCategoryDetail(currentIndex, type);
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');
  },
  _getRealCategoryDetail(index, type) {
    getCategoryDetail(type).then(res => {
      // 1.获取categoryData

      const categoryData = this.data.categoryData;

      // 2.修改数据
      categoryData[index].categoryDetail = res.data;

      //   // 3.修改data中的数据
      this.setData({
        categoryData: categoryData
      })
    })
  },
  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })

    // 2.请求对应currentIndex的数据
    // this._getSubcategory(currentIndex);

    // 3.请求对应的currentIndex的详情数据
    this._getCategoryDetail(currentIndex)
  }
})