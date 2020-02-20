import Vue from "vue";
import {
  Menu,
  MenuItem,
  Submenu,
  Row,
  Col,
  Input,
  Table,
  TableColumn,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Link,
  Select,
  Option,
  Pagination,
  Popover,
  Loading,
  RadioButton,
  RadioGroup
} from "element-ui";
import en from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
locale.use(en);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Submenu.name, Submenu);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Input.name, Input);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Button.name, Button);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Link.name, Link);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(Pagination.name, Pagination);
Vue.component(Popover.name, Popover);
Vue.component(RadioButton.name, RadioButton);
Vue.component(RadioGroup.name, RadioGroup);
Vue.use(Loading);
