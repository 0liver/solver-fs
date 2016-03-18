namespace Solver

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open WebSharper.Html.Client
open WebSharper.Core.Resources

module ClientResources =
    [<assembly:System.Web.UI.WebResource("/scripts/getCaretPosition.js", "application/javascript")>]
    [<assembly:System.Web.UI.WebResource("/content/style.css", "style/css")>]
    do ()

    type CaretPosition() =
        inherit BaseResource("/scripts/getCaretPosition.js")

    type CustomStyles() =
        inherit BaseResource("/content/style.css")

//[<Require(typeof<ClientResources.CaretPosition>)>]
[<Require(typeof<ClientResources.CustomStyles>)>]
[<JavaScript>]
module Client =

    [<InlineAttribute "$elt.selectionStart">]
    let cursorPosition elt = X<int>

    type Position =
        { top: int;
          left:int }

    [<InlineAttribute "getCaretCoordinates($elt, $idx)">]
    let caretPosition elt idx = X<Position>
    
    type Window with
        [<Inline "$0.getCaretCoordinates($elt, $idx)">]
        member this.CaretPosition (elm:Element) (idx:int) =  X<string>

    let SolveOld () =
        let getDigits () =
            let r () = System.Random().Next(10)
            // TODO: don't allow two zeros on either side of the = sign
            sprintf "%d%d%d=%d%d%d" (r()) (r()) (r()) (r()) (r()) (r())
            
        let input =
            Input [Attr.Class "laaarge"] -< [Value (getDigits ())]
            |>! OnKeyPress (fun elm _ ->
                async {
                    let! data = Server.Solve elm.Value
                    elm.SetStyle data
                }
                |> Async.Start
            )

        let insertSign (elm:Element) (evt:Events.MouseEvent) =
            JavaScript.Console.Log ("Clicked: " + elm.Text)
            let cursorPos = int ( JQuery.Data(input.Dom, "lastCursorPosition").ToString() )
            input.Value <- input.Value.Substring(0, cursorPos) + elm.Text + input.Value.Substring(cursorPos)
            // trigger post to server using .change()?

        let symbolPopup =
            Div [Attr.Style "position: absolute; display: none"] -< [
                Kbd [Text "+"] |>! OnClick insertSign
                Kbd [Text "-"] |>! OnClick insertSign
                Kbd [Text "*"] |>! OnClick insertSign
                Kbd [Text "/"] |>! OnClick insertSign
                Kbd [Text "^"] |>! OnClick insertSign
                Kbd [Text "("] |>! OnClick insertSign
                Kbd [Text ")"] |>! OnClick insertSign
            ]
        
        let showPopup (elm:Element) =
            let cursorPos = cursorPosition elm.Dom
            JQuery.Data(elm.Dom, "lastCursorPosition", cursorPos)
            let caretPos = 
                cursorPos
                |> caretPosition elm.Dom
            caretPos
            |> JavaScript.Console.Log
            
            symbolPopup.SetCss("top", (caretPos.top - 25).ToString() + "px")
            symbolPopup.SetCss("left", (caretPos.left - 65).ToString() + "px")
            symbolPopup.SetCss("display", "")

        let btReload =
            Button [Attr.Class "btn btn-primary btn-xs"; Attr.Style "float: right;"] -< [Text "Start over"]
            |>! OnClick (fun _ _ ->
                input.SetStyle ""
                input.Value <- getDigits ()
            )

        let signs = [
                Kbd [Text "+"]
                Kbd [Text "-"]
                Kbd [Text "*"]
                Kbd [Text "/"]
                Kbd [Text "^"]
                Kbd [Text "("]
                Kbd [Text ")"]
                btReload
            ]

        Div [
            H4 [Text " Use: "] -< signs
            P [Attr.Style "position: relative"] -< [
                input
                |>! OnKeyUp (fun elm evt -> showPopup elm)
                |>! OnMouseUp (fun elm evt ->
                    JavaScript.Console.Log ( sprintf "[%d, %d]" evt.X evt.Y )
                    showPopup elm
                )
                symbolPopup
            ]
        ]

    let Solve () =

        let validate () = 
            async {
                let! isSolution = Server.IsSolution (JQuery.Of("#equation").Text())
                let eq = JQuery.Of("#equation").RemoveAttr("class")
                match isSolution with
                | true -> eq.AddClass("success") |> ignore
                | false -> eq.AddClass("failure") |> ignore
            }
            |> Async.Start
    
        let symbolPopup =

            let getTarget () = JQuery.Of("#symbol-popup").Data("target") :?> Dom.Element

            let insertSymbol (elm:Element) (evt:Events.MouseEvent) =
                JavaScript.Console.Log ("Clicked: " + elm.Text)
                getTarget().TextContent <- elm.Dom.TextContent
                JQuery.Of("#symbol-popup").FadeOut() |> ignore
                validate()

            Div [Attr.Id "symbol-popup"; Attr.Style "position: absolute; display: none"] -< [
                Kbd [Text "+"] |>! OnClick insertSymbol
                Kbd [Text "-"] |>! OnClick insertSymbol
                Kbd [Text "*"] |>! OnClick insertSymbol
                Kbd [Text "/"] |>! OnClick insertSymbol
                Kbd [Text "^"] |>! OnClick insertSymbol
                Kbd [Text "("] |>! OnClick insertSymbol
                Kbd [Text ")"] |>! OnClick insertSymbol
            ]
        
        let showPopup (elm:Element) (evt:Events.MouseEvent) =
            let position = JQuery.Of(elm.Dom).Offset()
            JQuery.Of("#symbol-popup")
                .Data("target", elm.Dom)
                .Css("top", (position.Top - 21.0).ToString() + "px")
                .Css("left", position.Left.ToString() + "px")
                .Show() |> ignore

        let input = 
            Div [Attr.Id "equation"] -< [
                A [Attr.Class "symbol"] |>! OnClick showPopup
                Span [Attr.Class "digit"]
                A [Attr.Class "symbol"]|>! OnClick showPopup
                Span [Attr.Class "digit"]
                A [Attr.Class "symbol"]|>! OnClick showPopup
                Span [Attr.Class "digit"]
                A [Attr.Class "symbol"]|>! OnClick showPopup
                A [Attr.Class "symbol"; Text "="] |>! OnClick showPopup
                A [Attr.Class "symbol"]|>! OnClick showPopup
                Span [Attr.Class "digit"]
                A [Attr.Class "symbol"]|>! OnClick showPopup
                Span [Attr.Class "digit"]
                A [Attr.Class "symbol"]|>! OnClick showPopup
                Span [Attr.Class "digit"]
                A [Attr.Class "symbol"]|>! OnClick showPopup
            ]
        let getDigit () =
            let r () = System.Random().Next(10)
            // TODO: don't allow two zeros on either side of the = sign
            sprintf "%d" (r())

        let fillDigits =
            let digitSpans = JQuery.Of(input.Dom).Find(".digit")
            [1..6]
            |> List.iter (fun i -> JQuery.Of(digitSpans.Get(i - 1)).Text(getDigit()) |> ignore)

        JQuery.Of(fun () -> fillDigits) |> ignore
        Div[
            input
            symbolPopup
        ]