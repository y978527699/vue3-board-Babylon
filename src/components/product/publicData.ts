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
];
// 菜单产品数据列表
const productsList = [
    {
      id: 1,
      pId: "0010101",
      content: [
        {
          id: "101",
          name: "显示器支架",
          src: require("@/static/images/LED.jpg"),
          introduce: "ledledled双屏显示器支架，支持升降",
        },
        {
          id: "102",
          name: "开关按钮",
          src: require("@/static/images/btnOpen.jpg"),
          introduce: "开关按钮开关按钮开关按钮双屏显示器支架，支持升降开关按钮开关按钮开关按钮双屏显示器支架，支持升降",
        },
        {
          id: "103",
          name: "卡扣",
          src: require("@/static/images/kakou.jpg"),
          introduce: "卡扣双屏显示器支架卡扣卡扣，支持升降",
        },
        {
          id: "104",
          name: "滑轨",
          src: require("@/static/images/mat4.png"),
          introduce: "滑轨滑轨卡扣双屏显示器支架卡扣卡扣，支持升降",
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
    id: "101",
    name: "显示器支架",
    bannerImgs: [
      require("@/static/images/bannerImgs/xsq1.png"),
      require("@/static/images/bannerImgs/xsq2.png"),
      require("@/static/images/bannerImgs/xsq3.png"),
      require("@/static/images/bannerImgs/xsq4.png"),
      require("@/static/images/bannerImgs/xsq5.png"),
    ],
    specs: [
      {
        sid: 0,
        sname: '银色三孔位'
      },{
        sid: 1,
        sname: '银色四孔位'
      },{
        sid: 2,
        sname: '黑色三孔位'
      },{
        sid: 3,
        sname: '黑色四孔位'
      }
    ],
    introduce: "双屏显示器支架，支持升降,可以帮助解决人们在家庭或商用办公场所操作电脑时所遇到的各种技术难题，它的人体工学设计，可以预防工作疲劳带来的健康问题，提高工作效率，带了生活和工作的理想空间。",
    introImgs: ['data:image/jpeg;base64,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','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcbu01.alicdn.com%2Fimg%2Fibank%2F2019%2F205%2F348%2F10710843502_2030431253.jpg&refer=http%3A%2F%2Fcbu01.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668237444&t=17c3e7f8a1208875998a04cea775a5c1','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi02.c.aliimg.com%2Fimg%2Fibank%2F2015%2F658%2F788%2F2256887856_833799647.jpg&refer=http%3A%2F%2Fi02.c.aliimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668237461&t=ed7334041bca10f308c2cf658a8cd1af','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fm.360buyimg.com%2Fn12%2Fjfs%2Ft1087%2F327%2F629289886%2F84256%2F15aea1c%2F55375451Nac1fc11e.jpg%21q70.jpg&refer=http%3A%2F%2Fm.360buyimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668237480&t=c3dc2c0f65c6ea9f5a7bb40661b5f98a','https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.99114.com%2Fgroup10%2FM00%2FE2%2F02%2FrBADs1n8i3CASkGxAADGyM079kA231.jpg&refer=http%3A%2F%2Fimg1.99114.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668237494&t=71da72b9f75d078091a7156a96628d69'],
    video: require("@/static/images/bannerImgs/installVideo.mp4"),
    evaluate: [
      {
        uid: 0,
        uname: '张三',
        headImg: 'https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg',
        star: 4,
        content: '配件很好，很不错！我不是水军，我是火军'
      },
      {
        uid: 1,
        uname: '弟弟',
        headImg: 'https://www.meishujixun.com/uploads/58a72efc485a5d8ac0db25b1d8250546.jpg',
        star: 2,
        content: '我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军我不是水军'
      }
    ]
  },{}
]
export { menuList,productsList,goods };
