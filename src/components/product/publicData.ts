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
          price: "499",
          introduce: "双屏显示器支架，支持升降",
        },
        {
          id: "102",
          name: "显示器支架",
          price: "499",
          introduce: "双屏显示器支架，支持升降",
        },
        {
          id: "103",
          name: "显示器支架",
          price: "499",
          introduce: "双屏显示器支架，支持升降",
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
          price: "499",
          introduce: "双屏显示器支架，支持升降",
        },
        {
          id: "202",
          name: "显示器支架",
          price: "499",
          introduce: "双屏显示器支架，支持升降",
        },
        {
          id: "203",
          name: "显示器支架",
          price: "499",
          introduce: "双屏显示器支架，支持升降",
        },
      ],
    },
  ];
export { menuList,productsList };
