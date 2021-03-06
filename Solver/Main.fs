namespace Solver

open WebSharper
open WebSharper.Sitelets

type EndPoint =
    | [<EndPoint "/">] Solve

module Templating =
    open WebSharper.Html.Server

    type Page =
        {
            Title : string
            MenuBar : list<Element>
            Body : list<Element>
        }

    let MainTemplate =
        Content.Template<Page>("~/Main.html")
            .With("title", fun x -> x.Title)
            .With("menubar", fun x -> x.MenuBar)
            .With("body", fun x -> x.Body)

    // Compute a menubar where the menu item for the given endpoint is active
    let MenuBar (ctx: Context<EndPoint>) endpoint =
        let ( => ) txt act =
             LI [if endpoint = act then yield Attr.Class "active"] -< [
                A [Attr.HRef (ctx.Link act)] -< [Text txt]
             ]
        [
            LI ["Solve" => EndPoint.Solve]
        ]

    let Main ctx endpoint title body : Async<Content<EndPoint>> =
        Content.WithTemplate MainTemplate
            {
                Title = title
                MenuBar = MenuBar ctx endpoint
                Body = body
            }

module Site =
    open WebSharper.Html.Server

    let SolvePage ctx =
        Templating.Main ctx EndPoint.Solve "Solve" [
            H1 [Text "Solve me!"]
            Div [ClientSide <@ Client.Solve() @>]
        ]

    [<Website>]
    let Main =
        Application.MultiPage (fun ctx endpoint ->
            match endpoint with
            | EndPoint.Solve -> SolvePage ctx
        )
