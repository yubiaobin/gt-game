/**
 * 
 * @authors maxyu (yubiaobin1986@gmail.com)
 * @date    2014-07-15 17:14:09
 * @version $Id$
 */



	// 定义基础的模型类
    var ClassicListModel = Backbone.Model.extend({
        defaults : {
            title     :    '',
            content   :    '',
            goodCount :    '',
            imgUrl    :    ''
        }
    });


    // 创建集合模型类
    var ClassicLists = Backbone.Collection.extend({
        model       :  ClassicListModel, 
        url         :  function(){
            return "http://115.29.201.207:8008/remen"
            // return "data25.json"
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
    var classicData = new ClassicLists;


    // 创建单个item的view对象
    var ClassicListItemView = Backbone.View.extend({
        tagName     :  "li",
        template    :  _.template($('#ClassicListItemView_template').html()),
        initialize  : function(){
            this.listenTo(this, 'add', this.render);
            this.listenTo(this, 'reset', this.render);
            this.listenTo(this, 'all', this.render);
            this.render();
        },
        render      : function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    // 创建首页的View对象
    var ClassicListView = Backbone.View.extend({
        el             :   $("#gtgame_classic_data"),
        initialize     :   function() {
            this.listenTo(this, 'add', this.render);
            this.listenTo(this, 'reset', this.render);
            this.listenTo(this, 'all', this.render);
            classicData.fetch({
                success  :  function(model,response){
                        classicData.each(function (object) {
                            // alert("获取数据成功");
                            console.log(object.toJSON());
                            var view = new ClassicListItemView({model: object});
                            this.$("#gtgame_classic_data").append(view.render().el);
                        });
                        console.log(classicData.toJSON());
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
    var gtgame_classic = new ClassicListView;



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
