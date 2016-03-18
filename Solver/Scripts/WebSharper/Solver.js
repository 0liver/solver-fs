(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,console,jQuery,Concurrency,Remoting,AjaxRemotingProvider,Html,Client,Operators,List,Attr,Tags,EventsPervasives,String,Seq,Random,Operators1;
 Runtime.Define(Global,{
  Solver:{
   Client:{
    Solve:function()
    {
     var insertSymbol,symbolPopup,arg10,arg101,x,arg102,x1,arg103,x2,arg104,x3,arg105,x4,arg106,x5,arg107,x6,showPopup,input,arg108,arg109,x7,arg10a,arg10b,x8,arg10c,arg10d,x9,arg10e,arg10f,xa,arg1010,xb,arg1011,xc,arg1012,arg1013,xd,arg1014,arg1015,xe,arg1016,arg1017,xf,digitSpans,fillDigits,arg1018;
     insertSymbol=function(elm)
     {
      return function()
      {
       var a;
       a="Clicked: "+elm.get_Text();
       if(console)
        {
         console.log(a);
        }
       jQuery("#symbol-popup").data("target").textContent=elm.Dom.textContent;
       jQuery("#symbol-popup").fadeOut();
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
     arg10=List.ofArray([Attr.Attr().NewAttr("id","symbol-popup"),Attr.Attr().NewAttr("style","position: absolute; display: none")]);
     arg101=List.ofArray([Tags.Tags().text("+")]);
     x=Tags.Tags().NewTag("kbd",arg101);
     EventsPervasives.Events().OnClick(insertSymbol,x);
     arg102=List.ofArray([Tags.Tags().text("-")]);
     x1=Tags.Tags().NewTag("kbd",arg102);
     EventsPervasives.Events().OnClick(insertSymbol,x1);
     arg103=List.ofArray([Tags.Tags().text("*")]);
     x2=Tags.Tags().NewTag("kbd",arg103);
     EventsPervasives.Events().OnClick(insertSymbol,x2);
     arg104=List.ofArray([Tags.Tags().text("/")]);
     x3=Tags.Tags().NewTag("kbd",arg104);
     EventsPervasives.Events().OnClick(insertSymbol,x3);
     arg105=List.ofArray([Tags.Tags().text("^")]);
     x4=Tags.Tags().NewTag("kbd",arg105);
     EventsPervasives.Events().OnClick(insertSymbol,x4);
     arg106=List.ofArray([Tags.Tags().text("(")]);
     x5=Tags.Tags().NewTag("kbd",arg106);
     EventsPervasives.Events().OnClick(insertSymbol,x5);
     arg107=List.ofArray([Tags.Tags().text(")")]);
     x6=Tags.Tags().NewTag("kbd",arg107);
     EventsPervasives.Events().OnClick(insertSymbol,x6);
     symbolPopup=Operators.add(Tags.Tags().NewTag("div",arg10),List.ofArray([x,x1,x2,x3,x4,x5,x6]));
     showPopup=function(elm)
     {
      return function()
      {
       var position,copyOfStruct,copyOfStruct1;
       position=jQuery(elm.Dom).offset();
       copyOfStruct=position.top-21;
       copyOfStruct1=position.left;
       jQuery("#symbol-popup").data("target",elm.Dom).css("top",String(copyOfStruct)+"px").css("left",String(copyOfStruct1)+"px").show();
       return;
      };
     };
     arg108=List.ofArray([Attr.Attr().NewAttr("id","equation")]);
     arg109=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
     x7=Tags.Tags().NewTag("a",arg109);
     EventsPervasives.Events().OnClick(showPopup,x7);
     arg10a=List.ofArray([Attr.Attr().NewAttr("class","digit")]);
     arg10b=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
     x8=Tags.Tags().NewTag("a",arg10b);
     EventsPervasives.Events().OnClick(showPopup,x8);
     arg10c=List.ofArray([Attr.Attr().NewAttr("class","digit")]);
     arg10d=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
     x9=Tags.Tags().NewTag("a",arg10d);
     EventsPervasives.Events().OnClick(showPopup,x9);
     arg10e=List.ofArray([Attr.Attr().NewAttr("class","digit")]);
     arg10f=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
     xa=Tags.Tags().NewTag("a",arg10f);
     EventsPervasives.Events().OnClick(showPopup,xa);
     arg1010=List.ofArray([Attr.Attr().NewAttr("class","symbol"),Tags.Tags().text("=")]);
     xb=Tags.Tags().NewTag("a",arg1010);
     EventsPervasives.Events().OnClick(showPopup,xb);
     arg1011=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
     xc=Tags.Tags().NewTag("a",arg1011);
     EventsPervasives.Events().OnClick(showPopup,xc);
     arg1012=List.ofArray([Attr.Attr().NewAttr("class","digit")]);
     arg1013=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
     xd=Tags.Tags().NewTag("a",arg1013);
     EventsPervasives.Events().OnClick(showPopup,xd);
     arg1014=List.ofArray([Attr.Attr().NewAttr("class","digit")]);
     arg1015=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
     xe=Tags.Tags().NewTag("a",arg1015);
     EventsPervasives.Events().OnClick(showPopup,xe);
     arg1016=List.ofArray([Attr.Attr().NewAttr("class","digit")]);
     arg1017=List.ofArray([Attr.Attr().NewAttr("class","symbol")]);
     xf=Tags.Tags().NewTag("a",arg1017);
     EventsPervasives.Events().OnClick(showPopup,xf);
     input=Operators.add(Tags.Tags().NewTag("div",arg108),List.ofArray([x7,Tags.Tags().NewTag("span",arg10a),x8,Tags.Tags().NewTag("span",arg10c),x9,Tags.Tags().NewTag("span",arg10e),xa,xb,xc,Tags.Tags().NewTag("span",arg1012),xd,Tags.Tags().NewTag("span",arg1014),xe,Tags.Tags().NewTag("span",arg1016),xf]));
     digitSpans=jQuery(input.Dom).find(".digit");
     fillDigits=Seq.iter(function(i)
     {
      jQuery(digitSpans.get(i-1)).text(Global.String(Random.New().Next1(10)));
     },Seq.toList(Operators1.range(1,6)));
     jQuery(function()
     {
      return fillDigits;
     });
     arg1018=List.ofArray([input,symbolPopup]);
     return Tags.Tags().NewTag("div",arg1018);
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  console=Runtime.Safe(Global.console);
  jQuery=Runtime.Safe(Global.jQuery);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Operators=Runtime.Safe(Client.Operators);
  List=Runtime.Safe(Global.WebSharper.List);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  String=Runtime.Safe(Global.String);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Random=Runtime.Safe(Global.WebSharper.Random);
  return Operators1=Runtime.Safe(Global.WebSharper.Operators);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
