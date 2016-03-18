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