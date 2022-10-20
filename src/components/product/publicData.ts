// 菜单数据
const menuList = [
  {
    value: "001",
    label: "电脑/办公",
    children: [
      {
        value: "00101",
        label: "电脑",
        children: [
          {
            value: "0010101",
            label: "电脑配件",
          },
          {
            value: "0010102",
            label: "外设产品",
          },
          {
            value: "0010103",
            label: "网络产品",
          },
        ],
      },
      {
        value: "00102",
        label: "家用电器",
        children: [
          {
            value: "0010201",
            label: "电视",
          },
          {
            value: "0010202",
            label: "空调",
          },
          {
            value: "0010203",
            label: "蒸烤箱",
          },
          {
            value: "0010204",
            label: "个人护理",
          },
        ],
      },
    ],
  },
  {
    value: "002",
    label: "家用电器",
    children: [
      {
        value: "00201",
        label: "电视",
      },
      {
        value: "00202",
        label: "空调",
      },
      {
        value: "00203",
        label: "蒸烤箱",
      },
      {
        value: "00204",
        label: "个人护理",
      },
    ],
  },
  {
    value: "003",
    label: "手机/数码",
    children: [
      {
        value: "basic",
        label: "Basic",
        children: [
          {
            value: "layout",
            label: "Layout",
          },
          {
            value: "color",
            label: "Color",
          },
          {
            value: "typography",
            label: "Typography",
          },
          {
            value: "icon",
            label: "Icon",
          },
          {
            value: "button",
            label: "Button",
          },
        ],
      },
      {
        value: "form",
        label: "Form",
        children: [
          {
            value: "radio",
            label: "Radio",
          },
          {
            value: "checkbox",
            label: "Checkbox",
          },
          {
            value: "input",
            label: "Input",
          },
          {
            value: "input-number",
            label: "InputNumber",
          },
          {
            value: "select",
            label: "Select",
          },
          {
            value: "cascader",
            label: "Cascader",
          },
          {
            value: "switch",
            label: "Switch",
          },
          {
            value: "slider",
            label: "Slider",
          },
          {
            value: "time-picker",
            label: "TimePicker",
          },
          {
            value: "date-picker",
            label: "DatePicker",
          },
          {
            value: "datetime-picker",
            label: "DateTimePicker",
          },
          {
            value: "upload",
            label: "Upload",
          },
          {
            value: "rate",
            label: "Rate",
          },
          {
            value: "form",
            label: "Form",
          },
        ],
      },
      {
        value: "data",
        label: "Data",
        children: [
          {
            value: "table",
            label: "Table",
          },
          {
            value: "tag",
            label: "Tag",
          },
          {
            value: "progress",
            label: "Progress",
          },
          {
            value: "tree",
            label: "Tree",
          },
          {
            value: "pagination",
            label: "Pagination",
          },
          {
            value: "badge",
            label: "Badge",
          },
        ],
      },
      {
        value: "notice",
        label: "Notice",
        children: [
          {
            value: "alert",
            label: "Alert",
          },
          {
            value: "loading",
            label: "Loading",
          },
          {
            value: "message",
            label: "Message",
          },
          {
            value: "message-box",
            label: "MessageBox",
          },
          {
            value: "notification",
            label: "Notification",
          },
        ],
      },
      {
        value: "navigation",
        label: "Navigation",
        children: [
          {
            value: "menu",
            label: "Menu",
          },
          {
            value: "tabs",
            label: "Tabs",
          },
          {
            value: "breadcrumb",
            label: "Breadcrumb",
          },
          {
            value: "dropdown",
            label: "Dropdown",
          },
          {
            value: "steps",
            label: "Steps",
          },
        ],
      },
      {
        value: "others",
        label: "Others",
        children: [
          {
            value: "dialog",
            label: "Dialog",
          },
          {
            value: "tooltip",
            label: "Tooltip",
          },
          {
            value: "popover",
            label: "Popover",
          },
          {
            value: "card",
            label: "Card",
          },
          {
            value: "carousel",
            label: "Carousel",
          },
          {
            value: "collapse",
            label: "Collapse",
          },
        ],
      },
    ],
  },
  {
    value: "004",
    label: "五金",
    children: [
      {
        value: "00401",
        label: "连接件",
        children: [
          {
            value: "0040101",
            label: "显式连接件",
          },
          {
            value: "0040102",
            label: "隐式连接件",
          },
        ],
      },
    ],
  },
];
// 菜单产品数据列表
const productsList = [
  {
    id: 1,
    pId: "0010101",
    content: [
      {
        id: "102",
        name: "克在连接件",
        src: require("@/static/images/hardware/hide/hi1.jpg"),
        introduce: "ledledled双屏显示器支架，支持升降",
      },
      {
        id: "101",
        name: "显示器支架",
        src: require("@/static/images/partPipe/pipe05.jpg"),
        introduce:
          "开关按钮开关按钮开关按钮双屏显示器支架，支持升降开关按钮开关按钮开关按钮双屏显示器支架，支持升降",
      },
      {
        id: "103",
        name: "显式连接件",
        src: require("@/static/images/hardware/obvious/ob1.jpg"),
        introduce: "卡扣双屏显示器支架卡扣卡扣，支持升降",
      },
      {
        id: "104",
        name: "克在连接件",
        src: require("@/static/images/hardware/hide/hi1.jpg"),
        introduce: "ledledled双屏显示器支架，支持升降",
      },
      {
        id: "105",
        name: "克在连接件",
        src: require("@/static/images/hardware/hide/hi1.jpg"),
        introduce: "ledledled双屏显示器支架，支持升降",
      },
      {
        id: "106",
        name: "克在连接件",
        src: require("@/static/images/hardware/hide/hi1.jpg"),
        introduce: "ledledled双屏显示器支架，支持升降",
      },
      {
        id: "107",
        name: "克在连接件",
        src: require("@/static/images/hardware/hide/hi1.jpg"),
        introduce: "ledledled双屏显示器支架，支持升降",
      },
    ],
  },
  {
    id: 2,
    pId: "0010102",
    content: [
      {
        id: "201",
        name: "显示器支架",
        src: require("@/static/images/partPipe.jpg"),
        introduce: "双屏显示器支架，支持升降",
      },
      {
        id: "202",
        name: "显示器支架",
        src: require("@/static/images/partPipe.jpg"),
        introduce: "双屏显示器支架，支持升降",
      },
      {
        id: "203",
        name: "显示器支架",
        src: require("@/static/images/partPipe.jpg"),
        introduce: "双屏显示器支架，支持升降",
      },
      {
        id: "204",
        name: "显示器支架",
        src: require("@/static/images/partPipe.jpg"),
        introduce: "双屏显示器支架，支持升降",
      },
      {
        id: "205",
        name: "显示器支架",
        src: require("@/static/images/partPipe.jpg"),
        introduce: "双屏显示器支架，支持升降",
      },
      {
        id: "206",
        name: "显示器支架",
        src: require("@/static/images/partPipe.jpg"),
        introduce: "双屏显示器支架，支持升降",
      },
      {
        id: "207",
        name: "显示器支架",
        src: require("@/static/images/partPipe.jpg"),
        introduce: "双屏显示器支架，支持升降",
      },
    ],
  },
];
//商品详情
const goods = [
  {
    id: "102",
    name: "克在连接件",
    bannerImgs: [
      require("@/static/images/hardware/hide/hi3.jpg"),
      require("@/static/images/hardware/hide/hi4.jpg"),
      require("@/static/images/hardware/hide/hi5.jpg"),
      require("@/static/images/hardware/hide/hi6.jpg"),
      require("@/static/images/hardware/hide/hi7.jpg"),
    ],
    specs: [
      {
        sid: 0,
        sname: "枪色",
      },
      {
        sid: 1,
        sname: "黑色",
      },
      {
        sid: 2,
        sname: "银色",
      },
    ],
    introduce:
      "双屏显示器支架，支持升降,可以帮助解决人们在家庭或商用办公场所操作电脑时所遇到的各种技术难题，它的人体工学设计，可以预防工作疲劳带来的健康问题，提高工作效率，带了生活和工作的理想空间。",
    introImgs: [
      require("@/static/images/hardware/hide/hi1.jpg"),
      require("@/static/images/hardware/hide/hi2.jpg"),
      require("@/static/images/hardware/hide/hi3.jpg"),
      require("@/static/images/hardware/hide/hi4.jpg"),
      require("@/static/images/hardware/hide/hi5.jpg"),
      require("@/static/images/hardware/hide/hi6.jpg"),
      require("@/static/images/hardware/hide/hi7.jpg"),
    ],
    video: require("@/static/images/hardware/hide/hiVideo.mp4"),
    evaluate: [
      {
        uid: 0,
        uname: "张三",
        headImg:
          "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
        star: 4,
        date: '2022/10/1',
        content: "配件很好，很不错！我不是水军，我是火军",
      },
      {
        uid: 1,
        uname: "弟弟",
        headImg:
          "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
        star: 2,
        date: '2022/10/1',
        content:
          "我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军",
      },
      {
        uid: 1,
        uname: "弟弟",
        headImg:
          "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
        star: 2,
        date: '2022/10/1',
        content:
          "我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军",
      },
    ],
    draw: require("@/static/images/hardware/hide/hiDraw.jpg")
  },
  {
    id: "101",
    name: "显示器支架",
    bannerImgs: [
      require("@/static/images/partPipe/pipe01.jpg"),
      require("@/static/images/partPipe/pipe02.jpg"),
      require("@/static/images/partPipe/pipe03.jpg"),
      require("@/static/images/partPipe/pipe04.jpg"),
    ],
    specs: [
      {
        sid: 0,
        sname: "银色三孔位",
      },
      {
        sid: 1,
        sname: "银色四孔位",
      },
      {
        sid: 2,
        sname: "黑色三孔位",
      },
      {
        sid: 3,
        sname: "黑色四孔位",
      },
    ],
    introduce:
      "双屏显示器支架，支持升降,可以帮助解决人们在家庭或商用办公场所操作电脑时所遇到的各种技术难题，它的人体工学设计，可以预防工作疲劳带来的健康问题，提高工作效率，带了生活和工作的理想空间。",
    introImgs: [
      require("@/static/images/partPipe/pipe01.jpg"),
      require("@/static/images/partPipe/pipe02.jpg"),
      require("@/static/images/partPipe/pipe03.jpg"),
      require("@/static/images/partPipe/pipe04.jpg"),
      require("@/static/images/partPipe/pipe05.jpg"),
    ],
    video: require("@/static/images/partPipe/installVideo.mp4"),
    evaluate: [
      {
        uid: 0,
        uname: "张三",
        headImg:
          "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
        star: 4,
        date: '2022/10/1',
        content: "配件很好，很不错！我不是水军，我是火军",
      },
      {
        uid: 1,
        uname: "弟弟",
        headImg:
          "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
        star: 2,
        date: '2022/10/1',
        content:
          "我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军",
      },
      {
        uid: 1,
        uname: "弟弟",
        headImg:
          "https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg",
        star: 2,
        date: '2022/10/1',
        content:
          "我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军",
      },
    ],
    draw: require("@/static/images/hardware/hide/hiDraw.jpg")
  },
];
//推荐栏商品
const lineImgs = [
  {
    id: '102',
    img: require("@/static/images/hardware/hide/hi7.jpg")
  },{
    id: '101',
    img: require("@/static/images/partPipe/pipe01.jpg")
  },{
    id: '103',
    img: require("@/static/images/hardware/obvious/obv01.png")
  }
];
export { menuList, productsList, goods,lineImgs };
