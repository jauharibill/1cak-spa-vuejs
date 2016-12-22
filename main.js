var vm = new Vue({
  el:"#wrapper",
  data:{
      trolldata:[],
      section:"lol",
      load:true,
      next:"",
      busy:true,
      keyword:"",
      host:"//bill.hol.es/project/1cak/", //this belongs your host
  },
  beforeCompile: function () {
    this.load = true;
      // this.scrolled();
      this.getData();
  },
  methods:{
    search:function(){
      this.load = true;
          this.$http.get(this.host+'connect.php?search='+this.keyword).then((response)=>{
            console.log(JSON.parse(response.body));

            trolldata = JSON.parse(response.body);
            page = trolldata.page;
            this.next = page.next;
            post = trolldata.posts; 
            for (var i = 0; i < post.length; i++) {
              this.$http.get('/connect.php?url='+post[i].url).then((response)=>{
                  if (response.status==200) {
                    console.log(response.status);
                  }
              });
            }
            this.trolldata = post;
            this.load = false;
          });
    },
    sortenString:function(data){
      return data.substr(0,30);
    },
    scrolled:function(){
      var vm = this;
      var lock = true;
      var section = this.section;
      var next = this.next;

          vm.$http.get(this.host+'connect.php?param='+section+'&next='+next).then((response)=>{

            trolldata = JSON.parse(response.body);
            page = trolldata.page;
            this.next = page.next;
            post = trolldata.posts; 
            for (var i = 0; i < post.length; i++) {
              this.$http.get('/connect.php?url='+post[i].url).then((response)=>{
                  if (response.status==200) {
                    console.log(response.status);
                  }
              });
            }
            this.trolldata.push(post);
            console.log(this.trolldata);
            this.load = false;
          });
  
    },
    setData:function(data){
      this.load = true;
      this.section = data;
      this.getData();
    },
    getData:function(){
          this.$http.get(this.host+'connect.php?section='+this.section).then((response)=>{
            console.log(JSON.parse(response.body));

            trolldata = JSON.parse(response.body);
            page = trolldata.page;
            this.next = page.next;
            post = trolldata.posts; 
            for (var i = 0; i < post.length; i++) {
              this.$http.get('/connect.php?url='+post[i].url).then((response)=>{
                  if (response.status==200) {
                    console.log(response.status);
                  }
              });
            }
            this.trolldata = post;
            this.load = false;
          });
         
    }
  }

});


      $(window).scroll(function(){
        if ($(window).scrollTop() == $(document).height()-$(window).height()){
          vm.scrolled();
        }
      });