/**
 * 表格数据展开收起功能
 */
var collapseTableTemplate =
    `<div id="{{divId}}">
    <a v-show="collapsed" style="cursor: pointer;" @click="collapse(false)">
        <img src="./down.png" width="16" height="16"><br>
        <span>向下展开</span>
    </a>
    <a v-show="!collapsed" style="cursor: pointer;" @click="collapse(true)">
        <img src="./up.png" width="16" height="16"><br>
        <span>全部收起</span>
    </a>
    <span v-show="list.length==0">暂无数据</span>
</div>`;
Vue.component('collapse-table', {
    template: collapseTableTemplate,
    props:{
        list:{
            type: Array,
            default: []
        }
    },
    data(){
        return {
            divId: 'collapseDown',
            collapsed: true
        }
    },
    ready(){
        let _this = this;
        _this.collapsed = this.list.length > 10;
        _this.divId += String(Math.random()).substr(2);
        _this.$nextTick(function () {
            _this.collapse(_this.collapsed);
        })
    },
    methods:{
        collapse(n){
            this.collapsed = n;
            let div = $('#'+this.divId);
            let td = div.parent();
            td.addClass('align-center');
            td.attr('colspan', 100);
            let table = td.parent().parent().parent();
            let tbody = table.find('tbody');
            $(tbody).find('tr').show();
            if(this.collapsed) {
                $(tbody).find('tr:gt(9)').hide();
            }
            div.show();
            if(this.list.length <= 10){
                div.hide();
            }
        }
    },
    watch:{
        list: function(nv){
            this.collapsed = nv.length > 10;
            this.collapse(this.collapsed);
        }
    }
});
