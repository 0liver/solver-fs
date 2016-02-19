namespace Solver

open WebSharper
open MathParser

module Server =

    [<Rpc>]
    let DoSomething input =
        let AddDate (value: string) =
            value + " at " + (System.DateTime.Now).ToString()
        async {
            return AddDate ( input + ", Du, " )
        }

    [<Rpc>]
    let TellMeSomething input (key: int) =
        async {
            return sprintf "[%c] (%s)" (System.Convert.ToChar(key)) input
        }

    [<Rpc>]
    let Solve input =
        let solve (equation: string) =
            let compare (sides:string[]) =
                match sides.Length with
                | 0|1->false
                | _ -> // TODO: catch exceptions, return false
                    let parser = MathParser.MathParser()
                    let left = sides.[0]
                    let right = sides.[1]
                    parser.Parse(left) = parser.Parse(right)

            equation.Split([|'='|])
            |> compare

        let highlight result =
            match result with
            | true -> "color: green"
            | false -> "color: red"

        async {
            return highlight (solve input)
        }
