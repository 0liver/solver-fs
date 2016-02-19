namespace Solver

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open WebSharper.Html.Client
open WebSharper.Core.Resources

module ClientResources =
    [<assembly:System.Web.UI.WebResource("/scripts/getCaretPosition.js", "application/javascript")>]
    do ()

    type CaretPosition() =
        inherit BaseResource("/scripts/getCaretPosition.js")

[<Require(typeof<ClientResources.CaretPosition>)>]
[<JavaScript>]
module Client =

    let Start input k =
        async {
            let! data = Server.DoSomething input
            return k data
        }
        |> Async.Start

    let Main () =
        let input = Input [Attr.Value ""] -< []
        let output = H1 []
        Div [
            input
            |>! OnKeyPress (fun _ key ->
                async {
                    let! data = Server.TellMeSomething input.Value key.CharacterCode
                    output.Text <- data
                }
                |> Async.Start
            )
            Button [Text "Send"]
            |>! OnClick (fun _ _ ->
                Start input.Value (fun d -> output.Text <- d)
            )
            HR []
            H4 [Attr.Class "text-muted"] -< [Text "The server responded:"]
            Div [Attr.Class "jumbotron"] -< [output]
        ]
    
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

    let Solve () =
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
                Span [Text " "]
                Kbd [Text "-"] |>! OnClick insertSign
                Span [Text " "]
                Kbd [Text "*"] |>! OnClick insertSign
                Span [Text " "]
                Kbd [Text "/"] |>! OnClick insertSign
                Span [Text " "]
                Kbd [Text "^"] |>! OnClick insertSign
                Span [Text " "]
                Kbd [Text "("] |>! OnClick insertSign
                Span [Text " "]
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
                Span [Text " "]
                Kbd [Text "-"]
                Span [Text " "]
                Kbd [Text "*"]
                Span [Text " "]
                Kbd [Text "/"]
                Span [Text " "]
                Kbd [Text "^"]
                Span [Text " "]
                Kbd [Text "("]
                Span [Text " "]
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
