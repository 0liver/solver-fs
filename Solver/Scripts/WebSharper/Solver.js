(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,jQuery,String,List,Html,Client,Attr,Tags,EventsPervasives,window,Strings,Concurrency,Remoting,AjaxRemotingProvider,Seq,Operators,Random,Operators1;
 Runtime.Define(Global,{
  Solver:{
   Client:{
    Solve:function()
    {
     var showPopup,sym,dig,symbolPopup,insertSymbol,symbols,symbolButtons,arg101,input,arg102,digitSpans,fillDigits,arg103;
     showPopup=function(elm)
     {
      return function(evt)
      {
       var position,copyOfStruct,copyOfStruct1;
       position=jQuery(elm.Dom).offset();
       copyOfStruct=position.top-21;
       copyOfStruct1=position.left-70;
       jQuery("#symbol-popup").data("target",elm.Dom).css("top",String(copyOfStruct)+"px").css("left",String(copyOfStruct1)+"px").show();
       return evt.Event.stopPropagation();
      };
     };
     sym=function()
     {
      var arg10,x;
      arg10=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
      x=Tags.Tags().NewTag("a",arg10);
      EventsPervasives.Events().OnClick(showPopup,x);
      return x;
     };
     dig=function()
     {
      var arg10;
      arg10=List.ofArray([Attr.Attr().NewAttr("class","digit")]);
      return Tags.Tags().NewTag("span",arg10);
     };
     jQuery(function()
     {
      return jQuery(window.document).on("click",function()
      {
       return jQuery("#symbol-popup").fadeOut();
      });
     });
     insertSymbol=function(elm)
     {
      return function()
      {
       var txt,arg00,target;
       txt=Strings.Trim(elm.Dom.textContent);
       arg00=jQuery("#symbol-popup").data("target");
       target=jQuery(arg00);
       target.text(txt).prev(".symbol:empty").remove().end().next(".symbol:empty").remove().end();
       if(txt.length>0)
        {
         target.before(sym(null).Dom).after(sym(null).Dom);
        }
       return Concurrency.Start(Concurrency.Delay(function()
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("Solver:0",[jQuery("#equation").text()]),function(_arg1)
        {
         var eq;
         eq=jQuery("#equation").removeAttr("class");
         if(_arg1)
          {
           eq.addClass("success");
           return Concurrency.Return(null);
          }
         else
          {
           eq.addClass("failure");
           return Concurrency.Return(null);
          }
        });
       }),{
        $:0
       });
      };
     };
     symbols=[["+","plus"],["\u2212","minus"],["×","times"],["÷","divide"],["^","power"],["(","left parenthesis"],[")","right parenthesis"],[" ","no symbol: treat adjacent digits as one number"]];
     symbolButtons=Seq.map(function(tupledArg)
     {
      var symbol,hint,arg10,x;
      symbol=tupledArg[0];
      hint=tupledArg[1];
      arg10=List.ofArray([Tags.Tags().text(symbol),Attr.Attr().NewAttr("title",hint)]);
      x=Tags.Tags().NewTag("kbd",arg10);
      EventsPervasives.Events().OnClick(insertSymbol,x);
      return x;
     },symbols);
     arg101=List.ofArray([Attr.Attr().NewAttr("id","symbol-popup")]);
     symbolPopup=Operators.add(Tags.Tags().NewTag("div",arg101),symbolButtons);
     arg102=List.ofArray([Attr.Attr().NewAttr("id","equation")]);
     input=Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([sym(null),dig(null),sym(null),dig(null),sym(null),dig(null),sym(null),Operators.add(sym(null),List.ofArray([Tags.Tags().text("=")])),sym(null),dig(null),sym(null),dig(null),sym(null),dig(null),sym(null)]));
     digitSpans=jQuery(input.Dom).find(".digit");
     fillDigits=Seq.iter(function(i)
     {
      return jQuery(digitSpans.get(i-1)).text(Global.String(Random.New().Next1(10)));
     },Seq.toList(Operators1.range(1,6)));
     jQuery(function()
     {
      return fillDigits;
     });
     arg103=List.ofArray([input,symbolPopup]);
     return Tags.Tags().NewTag("div",arg103);
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  jQuery=Runtime.Safe(Global.jQuery);
  String=Runtime.Safe(Global.String);
  List=Runtime.Safe(Global.WebSharper.List);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  window=Runtime.Safe(Global.window);
  Strings=Runtime.Safe(Global.WebSharper.Strings);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Operators=Runtime.Safe(Client.Operators);
  Random=Runtime.Safe(Global.WebSharper.Random);
  return Operators1=Runtime.Safe(Global.WebSharper.Operators);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
