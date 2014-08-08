/**
 * 
 * @authors maxyu (yubiaobin1986@gmail.com)
 * @date    2014-07-15 17:14:09
 * @version $Id$
 */





// Backbone框架控制首页数据读取脚本


    // 定义基础的模型类
    var GameListModel = Backbone.Model.extend({
        defaults : {
            title     :    '',
            content   :    '',
            goodCount :    '',
            imgUrl    :    '',
            logolink  :    '',
        }
    });


    // 创建集合模型类
    var GameLists = Backbone.Collection.extend({
        model       :  GameListModel, 
        url         :  function(){
            return "http://115.29.201.207:8008/pastjson" 
            // return "data15.json"
        },
        parse       :  function(response){
            return response.data;

        },
        initialize  : function(){       
            this.listenTo(this, 'add', function(){
                console.log("add")
            });     
            
            this.listenTo(this, 'reset', function(){
                console.log("reset")
            });    
        }
    });
    // 实例化
    var listData = new GameLists;


    // 创建单个item的view对象
    var GameListItemView = Backbone.View.extend({
        tagName     :  "li",
        template    :  _.template($('#GameListItemView_template').html()),
        initialize  : function(){

            this.listenTo(this, 'add', this.render);
            this.listenTo(this, 'reset', this.render);
            this.listenTo(this, 'all', this.render);

            this.render();
        },
        render      : function(){
            this.$el.html(this.template(this.model.toJSON()));
            // alert("数据填充完毕！");
            return this;
        }
    });

    // 创建首页的View对象
    var IndexListView = Backbone.View.extend({
        el             :   $("#gtgame_index_data"),
        initialize     :   function() {

            this.listenTo(this, 'add', this.render);
            this.listenTo(this, 'reset', this.render);
            this.listenTo(this, 'all', this.render);

            listData.fetch({
                success:function(model,response){
                        listData.each(function (object) {
                            // alert("fetch成功");   
                            console.log(object.toJSON());
                            var view = new GameListItemView({model: object});
                            this.$("#gtgame_index_data").append(view.render().el);
                        });
                        console.log(listData.toJSON());
                        console.log(model.at(0).get('title'));
                    },error:function(){
                        //当返回格式不正确或者是非json数据时，会执行此方法
                        alert('数据未成功加载,请检查你的网络设置');
                    }
            });
        },
        render      : function(){
            return this;
        }
    })

    // 实例化View对象
    var gtgame_index = new IndexListView;












    // 首页幻灯片控制脚本
    var bullets = document.getElementById('control-position').getElementsByTagName('li');
    var banner = Swipe(document.getElementById('mySwipe'), {
        auto: 2000,
        continuous: true,
        disableScroll:true,
        callback: function(pos) {
            var i = bullets.length;
            while (i--) {
              bullets[i].className = ' ';
            }
            bullets[pos].className = 'cur';
        }
    });




 
    // 页面传值发送功能模块 
    var target1 = $('.js-index-list-href');
        target1.click(function(){
        // e.preventDefault(); 
        var targetURL = $(this).attr('href');
        // alert(targetURL);
        var link = encodeURIComponent(targetURL);
        // alert(link);
        var ref = window.open('game_detail.html?'+link, '_blank', 'location=no');     
        return false;     
    })     




