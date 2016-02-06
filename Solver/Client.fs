namespace Solver

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client

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

    let Solve () =
        let getDigits () =
            let r () = System.Random().Next(10)
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
        let btReload =
            Button [Attr.Class "btn btn-primary btn-xs"; Attr.Style "float: right;"] -< [Text "Start over"]
            |>! OnClick (fun _ _ ->
                input.Value <- getDigits ()
            )
        
        Div [
            H4 [Text " Use: "] -< [
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
            P [
                input
            ]
        ]
