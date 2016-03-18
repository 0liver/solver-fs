namespace Solver

open WebSharper
open WebSharper.JavaScript
open WebSharper.JQuery
open WebSharper.Html.Client
open WebSharper.Core.Resources

module ClientResources =
    [<assembly:System.Web.UI.WebResource("/content/style.css", "text/css")>]
    do ()

    type CustomStyles() =
        inherit BaseResource("/content/style.css")

[<Require(typeof<ClientResources.CustomStyles>)>]
[<JavaScript>]
module Client =

    let Solve () =
    
        let validate () = 
            async {
                let! isSolution = Server.IsSolution (JQuery.Of("#equation").Text())
                let eq = JQuery.Of("#equation").RemoveAttr("class")
                match isSolution with
                | true -> eq.AddClass("success").Ignore
                | false -> eq.AddClass("failure").Ignore
            }
            |> Async.Start

        let showPopup (elm:Element) (evt:Events.MouseEvent) =
            let position = JQuery.Of(elm.Dom).Offset()
            JQuery.Of("#symbol-popup")
                .Data("target", elm.Dom)
                .Css("top", (position.Top - 21.0).ToString() + "px")
                .Css("left", (position.Left - 70.0).ToString() + "px")
                .Show().Ignore
            // keep popup open despite document.click handler that wants to close it
            evt.Event.StopPropagation()

        let sym () =
            A [Attr.Class "symbol"] |>! OnClick showPopup

        let dig () =
            Span [Attr.Class "digit"]


        let symbolPopup =

            let hidePopup () =
                JQuery.Of("#symbol-popup").FadeOut().Ignore

            let hidePopupOnDocumentClick () =
                JQuery.Of(JS.Window.Document).On("click", fun _ _ -> hidePopup()).Ignore

            JQuery.Of(hidePopupOnDocumentClick).Ignore

            let getTarget () =
                JQuery.Of("#symbol-popup").Data("target") :?> (* cast to *) Dom.Element
                |> JQuery.Of

            let insertSymbol (elm:Element) (evt:Events.MouseEvent) =
                let txt = elm.Dom.TextContent.Trim()
                let target = getTarget()
                target
                    .Text(txt)
                    .Prev(".symbol:empty").Remove().End()
                    .Next(".symbol:empty").Remove().End().Ignore
                if txt.Length > 0 then (target
                    .Before(sym().Dom)
                    .After(sym().Dom).Ignore)
                validate()

            let symbols = [|
                ("+", "plus");
                ("−" (* "&#8722;" *), "minus");
                ("×" (* "&#215;"  *), "times");
                ("÷" (* "&#247;" *), "divide");
                ("^", "power");
                ("(", "left parenthesis");
                (")", "right parenthesis");
                ("\xa0", "no symbol: treat adjacent digits as one number")
            |]

            let makeButton (symbol, hint) =
                Kbd [Text symbol; Attr.Title hint] |>! OnClick insertSymbol

            let symbolButtons =
                symbols |> Seq.map makeButton

            Div [Attr.Id "symbol-popup"] -< symbolButtons

        let input =
            Div [Attr.Id "equation"] -< [
                sym()
                dig()
                sym()
                dig()
                sym()
                dig()
                sym()
                sym() -< [Text "="]
                sym()
                dig()
                sym()
                dig()
                sym()
                dig()
                sym()
            ]


        let getDigit () =
            let r () = System.Random().Next(10)
            // TODO: don't allow two zeros on either side of the = sign
            sprintf "%d" (r())


        let fillDigits =
            let digitSpans = JQuery.Of(input.Dom).Find(".digit")
            [1..6]
            |> List.iter (fun i -> JQuery.Of(digitSpans.Get(i - 1)).Text(getDigit()).Ignore)


        // set up DOM ready handler
        JQuery.Of(fun () -> fillDigits).Ignore


        // return this element
        Div [
            input
            symbolPopup
        ]