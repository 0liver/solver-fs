(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Html,Client,Operators,List,Attr,Tags,T,Concurrency,Remoting,AjaxRemotingProvider,EventsPervasives,Solver,Client1,Random;
 Runtime.Define(Global,{
  Solver:{
   Client:{
    Main:function()
    {
     var input,arg10,x,output,arg101,arg00,arg102,x1,arg002,arg103,arg104,arg105;
     arg10=List.ofArray([Attr.Attr().NewAttr("value","")]);
     input=Operators.add(Tags.Tags().NewTag("input",arg10),Runtime.New(T,{
      $:0
     }));
     x=Runtime.New(T,{
      $:0
     });
     output=Tags.Tags().NewTag("h1",x);
     arg00=function()
     {
      return function(key)
      {
       var arg001;
       arg001=Concurrency.Delay(function()
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("Solver:1",[input.get_Value(),key.CharacterCode]),function(_arg11)
        {
         output.set_Text(_arg11);
         return Concurrency.Return(null);
        });
       });
       return Concurrency.Start(arg001,{
        $:0
       });
      };
     };
     EventsPervasives.Events().OnKeyPress(arg00,input);
     arg102=List.ofArray([Tags.Tags().text("Send")]);
     x1=Tags.Tags().NewTag("button",arg102);
     arg002=function()
     {
      return function()
      {
       return Client1.Start(input.get_Value(),function(d)
       {
        return output.set_Text(d);
       });
      };
     };
     EventsPervasives.Events().OnClick(arg002,x1);
     arg103=Runtime.New(T,{
      $:0
     });
     arg104=List.ofArray([Attr.Attr().NewAttr("class","text-muted")]);
     arg105=List.ofArray([Attr.Attr().NewAttr("class","jumbotron")]);
     arg101=List.ofArray([input,x1,Tags.Tags().NewTag("hr",arg103),Operators.add(Tags.Tags().NewTag("h4",arg104),List.ofArray([Tags.Tags().text("The server responded:")])),Operators.add(Tags.Tags().NewTag("div",arg105),List.ofArray([output]))]);
     return Tags.Tags().NewTag("div",arg101);
    },
    Solve:function()
    {
     var getDigits,x,arg10,arg101,arg001,input,x1,arg102,arg002,btReload,arg103,arg104,arg105,arg106,arg107,arg108,arg109,arg10a,arg10b,arg10c,arg10d,arg10e,arg10f,arg1010,arg1011,arg1012;
     getDigits=function()
     {
      var objectArg,r,_,_1,_2,_3,_4,_5;
      objectArg=Random.New();
      r=function(arg00)
      {
       return objectArg.Next1(arg00);
      };
      _=r(10);
      _1=r(10);
      _2=r(10);
      _3=r(10);
      _4=r(10);
      _5=r(10);
      return Global.String(_)+"  "+Global.String(_1)+"  "+Global.String(_2)+" = "+Global.String(_3)+"  "+Global.String(_4)+"  "+Global.String(_5);
     };
     arg10=List.ofArray([Attr.Attr().NewAttr("class","laaarge")]);
     arg101=getDigits(null);
     x=Operators.add(Tags.Tags().NewTag("input",arg10),List.ofArray([Attr.Attr().NewAttr("value",arg101)]));
     arg001=function(elm)
     {
      return function()
      {
       return Concurrency.Start(Concurrency.Delay(function()
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("Solver:2",[elm.get_Value()]),function(_arg11)
        {
         elm["HtmlProvider@33"].SetStyle(elm.get_Body(),_arg11);
         return Concurrency.Return(null);
        });
       }),{
        $:0
       });
      };
     };
     EventsPervasives.Events().OnKeyPress(arg001,x);
     input=x;
     arg102=List.ofArray([Attr.Attr().NewAttr("class","btn btn-primary btn-xs"),Attr.Attr().NewAttr("style","float: right;")]);
     x1=Operators.add(Tags.Tags().NewTag("button",arg102),List.ofArray([Tags.Tags().text("Start over")]));
     arg002=function()
     {
      return function()
      {
       return input.set_Value(getDigits(null));
      };
     };
     EventsPervasives.Events().OnClick(arg002,x1);
     btReload=x1;
     arg104=List.ofArray([Tags.Tags().text(" Use: ")]);
     arg105=List.ofArray([Tags.Tags().text("+")]);
     arg106=List.ofArray([Tags.Tags().text(" ")]);
     arg107=List.ofArray([Tags.Tags().text("-")]);
     arg108=List.ofArray([Tags.Tags().text(" ")]);
     arg109=List.ofArray([Tags.Tags().text("*")]);
     arg10a=List.ofArray([Tags.Tags().text(" ")]);
     arg10b=List.ofArray([Tags.Tags().text("/")]);
     arg10c=List.ofArray([Tags.Tags().text(" ")]);
     arg10d=List.ofArray([Tags.Tags().text("^")]);
     arg10e=List.ofArray([Tags.Tags().text(" ")]);
     arg10f=List.ofArray([Tags.Tags().text("(")]);
     arg1010=List.ofArray([Tags.Tags().text(" ")]);
     arg1011=List.ofArray([Tags.Tags().text(")")]);
     arg1012=List.ofArray([input]);
     arg103=List.ofArray([Operators.add(Tags.Tags().NewTag("h4",arg104),List.ofArray([Tags.Tags().NewTag("kbd",arg105),Tags.Tags().NewTag("span",arg106),Tags.Tags().NewTag("kbd",arg107),Tags.Tags().NewTag("span",arg108),Tags.Tags().NewTag("kbd",arg109),Tags.Tags().NewTag("span",arg10a),Tags.Tags().NewTag("kbd",arg10b),Tags.Tags().NewTag("span",arg10c),Tags.Tags().NewTag("kbd",arg10d),Tags.Tags().NewTag("span",arg10e),Tags.Tags().NewTag("kbd",arg10f),Tags.Tags().NewTag("span",arg1010),Tags.Tags().NewTag("kbd",arg1011),btReload])),Tags.Tags().NewTag("p",arg1012)]);
     return Tags.Tags().NewTag("div",arg103);
    },
    Start:function(input,k)
    {
     var arg00;
     arg00=Concurrency.Delay(function()
     {
      return Concurrency.Bind(AjaxRemotingProvider.Async("Solver:0",[input]),function(_arg1)
      {
       return Concurrency.Return(k(_arg1));
      });
     });
     return Concurrency.Start(arg00,{
      $:0
     });
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Operators=Runtime.Safe(Client.Operators);
  List=Runtime.Safe(Global.WebSharper.List);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  T=Runtime.Safe(List.T);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  Solver=Runtime.Safe(Global.Solver);
  Client1=Runtime.Safe(Solver.Client);
  return Random=Runtime.Safe(Global.WebSharper.Random);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
