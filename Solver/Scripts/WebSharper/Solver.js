(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,console,jQuery,Concurrency,Remoting,AjaxRemotingProvider,Html,Client,Operators,List,Attr,Tags,EventsPervasives,String,Seq,Random,Operators1,Strings,getCaretCoordinates;
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
    },
    SolveOld:function()
    {
     var getDigits,x,arg10,arg101,arg00,input,insertSign,symbolPopup,arg102,arg103,x1,arg104,x2,arg105,x3,arg106,x4,arg107,x5,arg108,x6,arg109,x7,showPopup,x8,arg10a,arg002,btReload,signs,arg10b,arg10c,arg10d,arg10e,arg10f,arg1010,arg1011,arg1012,arg1013,arg1014,arg003,x9,arg004;
     getDigits=function()
     {
      var r,_,_1,_2,_3,_4,_5;
      r=function()
      {
       return Random.New().Next1(10);
      };
      _=r(null);
      _1=r(null);
      _2=r(null);
      _3=r(null);
      _4=r(null);
      _5=r(null);
      return Global.String(_)+Global.String(_1)+Global.String(_2)+"="+Global.String(_3)+Global.String(_4)+Global.String(_5);
     };
     arg10=List.ofArray([Attr.Attr().NewAttr("class","laaarge")]);
     arg101=getDigits(null);
     x=Operators.add(Tags.Tags().NewTag("input",arg10),List.ofArray([Attr.Attr().NewAttr("value",arg101)]));
     arg00=function(elm)
     {
      return function()
      {
       var arg001;
       arg001=Concurrency.Delay(function()
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("Solver:1",[elm.get_Value()]),function(_arg11)
        {
         elm["HtmlProvider@33"].SetStyle(elm.get_Body(),_arg11);
         return Concurrency.Return(null);
        });
       });
       return Concurrency.Start(arg001,{
        $:0
       });
      };
     };
     EventsPervasives.Events().OnKeyPress(arg00,x);
     input=x;
     insertSign=function(elm)
     {
      return function()
      {
       var a,cursorPos;
       a="Clicked: "+elm.get_Text();
       console?console.log(a):undefined;
       cursorPos=String(jQuery.data(input.Dom,"lastCursorPosition"))<<0;
       return input.set_Value(Strings.Substring(input.get_Value(),0,cursorPos)+elm.get_Text()+input.get_Value().substring(cursorPos));
      };
     };
     arg102=List.ofArray([Attr.Attr().NewAttr("style","position: absolute; display: none")]);
     arg103=List.ofArray([Tags.Tags().text("+")]);
     x1=Tags.Tags().NewTag("kbd",arg103);
     EventsPervasives.Events().OnClick(insertSign,x1);
     arg104=List.ofArray([Tags.Tags().text("-")]);
     x2=Tags.Tags().NewTag("kbd",arg104);
     EventsPervasives.Events().OnClick(insertSign,x2);
     arg105=List.ofArray([Tags.Tags().text("*")]);
     x3=Tags.Tags().NewTag("kbd",arg105);
     EventsPervasives.Events().OnClick(insertSign,x3);
     arg106=List.ofArray([Tags.Tags().text("/")]);
     x4=Tags.Tags().NewTag("kbd",arg106);
     EventsPervasives.Events().OnClick(insertSign,x4);
     arg107=List.ofArray([Tags.Tags().text("^")]);
     x5=Tags.Tags().NewTag("kbd",arg107);
     EventsPervasives.Events().OnClick(insertSign,x5);
     arg108=List.ofArray([Tags.Tags().text("(")]);
     x6=Tags.Tags().NewTag("kbd",arg108);
     EventsPervasives.Events().OnClick(insertSign,x6);
     arg109=List.ofArray([Tags.Tags().text(")")]);
     x7=Tags.Tags().NewTag("kbd",arg109);
     EventsPervasives.Events().OnClick(insertSign,x7);
     symbolPopup=Operators.add(Tags.Tags().NewTag("div",arg102),List.ofArray([x1,x2,x3,x4,x5,x6,x7]));
     showPopup=function(elm)
     {
      var cursorPos,elt,caretPos,arg20,copyOfStruct,arg201,copyOfStruct1;
      cursorPos=elm.Dom.selectionStart;
      jQuery.data(elm.Dom,"lastCursorPosition",cursorPos);
      elt=elm.Dom;
      caretPos=getCaretCoordinates(elt,cursorPos);
      if(console)
       {
        console.log(caretPos);
       }
      copyOfStruct=caretPos.top-25;
      arg20=String(copyOfStruct)+"px";
      symbolPopup["HtmlProvider@33"].SetCss(symbolPopup.get_Body(),"top",arg20);
      copyOfStruct1=caretPos.left-65;
      arg201=String(copyOfStruct1)+"px";
      symbolPopup["HtmlProvider@33"].SetCss(symbolPopup.get_Body(),"left",arg201);
      return symbolPopup["HtmlProvider@33"].SetCss(symbolPopup.get_Body(),"display","");
     };
     arg10a=List.ofArray([Attr.Attr().NewAttr("class","btn btn-primary btn-xs"),Attr.Attr().NewAttr("style","float: right;")]);
     x8=Operators.add(Tags.Tags().NewTag("button",arg10a),List.ofArray([Tags.Tags().text("Start over")]));
     arg002=function()
     {
      return function()
      {
       input["HtmlProvider@33"].SetStyle(input.get_Body(),"");
       return input.set_Value(getDigits(null));
      };
     };
     EventsPervasives.Events().OnClick(arg002,x8);
     btReload=x8;
     arg10b=List.ofArray([Tags.Tags().text("+")]);
     arg10c=List.ofArray([Tags.Tags().text("-")]);
     arg10d=List.ofArray([Tags.Tags().text("*")]);
     arg10e=List.ofArray([Tags.Tags().text("/")]);
     arg10f=List.ofArray([Tags.Tags().text("^")]);
     arg1010=List.ofArray([Tags.Tags().text("(")]);
     arg1011=List.ofArray([Tags.Tags().text(")")]);
     signs=List.ofArray([Tags.Tags().NewTag("kbd",arg10b),Tags.Tags().NewTag("kbd",arg10c),Tags.Tags().NewTag("kbd",arg10d),Tags.Tags().NewTag("kbd",arg10e),Tags.Tags().NewTag("kbd",arg10f),Tags.Tags().NewTag("kbd",arg1010),Tags.Tags().NewTag("kbd",arg1011),btReload]);
     arg1013=List.ofArray([Tags.Tags().text(" Use: ")]);
     arg1014=List.ofArray([Attr.Attr().NewAttr("style","position: relative")]);
     arg003=function(elm)
     {
      return function()
      {
       return showPopup(elm);
      };
     };
     EventsPervasives.Events().OnKeyUp(arg003,input);
     x9=input;
     arg004=function(elm)
     {
      return function(evt)
      {
       var _,a;
       _=evt.Y;
       a="["+Global.String(evt.X)+", "+Global.String(_)+"]";
       console?console.log(a):undefined;
       return showPopup(elm);
      };
     };
     EventsPervasives.Events().OnMouseUp(arg004,x9);
     arg1012=List.ofArray([Operators.add(Tags.Tags().NewTag("h4",arg1013),signs),Operators.add(Tags.Tags().NewTag("p",arg1014),List.ofArray([x9,symbolPopup]))]);
     return Tags.Tags().NewTag("div",arg1012);
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
  Operators1=Runtime.Safe(Global.WebSharper.Operators);
  Strings=Runtime.Safe(Global.WebSharper.Strings);
  return getCaretCoordinates=Runtime.Safe(Global.getCaretCoordinates);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
