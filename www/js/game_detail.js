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
            return "http://115.29.201.207:8008/pwsts/" + this.id; 
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


            // 页面传值接受功能模块
            var link = window.location.href;
            var substr = link.match(/(\?.*)/)[0];
            var substr2 = substr.substring(1);
            var substr3 = substr2.match(/(\=.*)/)[0].substring(1);
            // alert(substr3)
            var sub_link = decodeURIComponent(substr3);
            // $('iframe').attr('src', sub_link);
            // alert(sub_link);

            

            this.id = sub_link; 
        }
    });
    // 实例化
    var listData = new GameLists;


    // 创建单个item的view对象
    var GameListItemView = Backbone.View.extend({
        tagName     :  "div",
        template    :  _.template($('#GameDetailItemView_template').html()),
        initialize  : function(){

            this.listenTo(this, 'add', this.render);
            this.listenTo(this, 'reset', this.render);
            this.listenTo(this, 'all', this.render);

            this.render();
        },
        render      : function(){

            var tmp_data = this.model.toJSON();
            tmp_data["uuid"] = device.uuid;

            // alert(tmp_data)

            this.$el.html(this.template(tmp_data));
            // alert("数据填充完毕！");
            return this;





/*            
        try{
            var tmp_data = this.model.toJSON();
                    tmp_data["uuid"] = device.uuid;
                    this.$el.html(this.template(tmp_data));
                    // alert("数据填充完毕！");
                    return this;
        }
        catch (e){
            alert(e.message); 
            alert(e.description) 
            alert(e.number) 
            alert(e.name) 
        }
*/
            
        }
    });

    // 创建首页的View对象
    var IndexListView = Backbone.View.extend({
        el             :   $("#gtgame_detail_data"),
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
                            this.$("#gtgame_detail_data").append(view.render().el);
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




    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

        // alert("该用户设备终端号（uuid）为 " + device.uuid);

    }

