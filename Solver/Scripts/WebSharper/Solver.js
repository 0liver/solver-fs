(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,Random,Html,Client,Operators,List,Attr,Tags,Concurrency,Remoting,AjaxRemotingProvider,EventsPervasives,console,String,jQuery,Strings,getCaretCoordinates;
 Runtime.Define(Global,{
  Solver:{
   Client:{
    Solve:function()
    {
     var getDigits,x,arg10,arg101,arg00,input,insertSign,symbolPopup,arg102,arg103,x1,arg104,x2,arg105,x3,arg106,x4,arg107,x5,arg108,x6,arg109,x7,showPopup,x8,arg10a,arg001,btReload,signs,arg10b,arg10c,arg10d,arg10e,arg10f,arg1010,arg1011,arg1012,arg1013,arg1014,arg002,x9,arg003;
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
       return Concurrency.Start(Concurrency.Delay(function()
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("Solver:0",[elm.get_Value()]),function(_arg11)
        {
         elm["HtmlProvider@33"].SetStyle(elm.get_Body(),_arg11);
         return Concurrency.Return(null);
        });
       }),{
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
       if(console)
        {
         console.log(a);
        }
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
     arg001=function()
     {
      return function()
      {
       input["HtmlProvider@33"].SetStyle(input.get_Body(),"");
       return input.set_Value(getDigits(null));
      };
     };
     EventsPervasives.Events().OnClick(arg001,x8);
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
     arg002=function(elm)
     {
      return function()
      {
       return showPopup(elm);
      };
     };
     EventsPervasives.Events().OnKeyUp(arg002,input);
     x9=input;
     arg003=function(elm)
     {
      return function(evt)
      {
       var _,a;
       _=evt.Y;
       a="["+Global.String(evt.X)+", "+Global.String(_)+"]";
       if(console)
        {
         console.log(a);
        }
       return showPopup(elm);
      };
     };
     EventsPervasives.Events().OnMouseUp(arg003,x9);
     arg1012=List.ofArray([Operators.add(Tags.Tags().NewTag("h4",arg1013),signs),Operators.add(Tags.Tags().NewTag("p",arg1014),List.ofArray([x9,symbolPopup]))]);
     return Tags.Tags().NewTag("div",arg1012);
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  Random=Runtime.Safe(Global.WebSharper.Random);
  Html=Runtime.Safe(Global.WebSharper.Html);
  Client=Runtime.Safe(Html.Client);
  Operators=Runtime.Safe(Client.Operators);
  List=Runtime.Safe(Global.WebSharper.List);
  Attr=Runtime.Safe(Client.Attr);
  Tags=Runtime.Safe(Client.Tags);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  EventsPervasives=Runtime.Safe(Client.EventsPervasives);
  console=Runtime.Safe(Global.console);
  String=Runtime.Safe(Global.String);
  jQuery=Runtime.Safe(Global.jQuery);
  Strings=Runtime.Safe(Global.WebSharper.Strings);
  return getCaretCoordinates=Runtime.Safe(Global.getCaretCoordinates);
 });
 Runtime.OnLoad(function()
 {
  return;
 });
}());
